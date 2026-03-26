/**
 * PIN-Verwaltung für den verschlüsselten OPFS-Speicher.
 *
 * Zustands-Maschine:
 *   'loading'  → prüft OPFS auf vorhandenen Salt (pe_salt)
 *   'setup'    → kein Salt: erster Start, neuen PIN wählen
 *   'locked'   → Salt vorhanden: PIN eingeben
 *   'unlocked' → CryptoKey abgeleitet + Store initialisiert
 *
 * Sicherheitsentscheidungen:
 * - Unlock-Probe via tryUnlock() – falscher PIN → "Falscher PIN", kein Datenverlust
 * - CryptoKey wird nie in useState serialisiert oder localStorage gespeichert
 * - PIN selbst wird nie gespeichert (nur der abgeleitete CryptoKey im RAM)
 * - Zustandsübergänge nur vorwärts (loading → setup/locked → unlocked)
 */

import { useState, useEffect, useCallback } from 'react';
import {
  deriveStorageKey,
  loadSaltFromOpfs,
  generateAndStoreSalt,
  changeStoragePin,
} from '../services/storage-key.js';
import { localReportStore } from '../services/local-report-store.js';

export type PinState = 'loading' | 'setup' | 'locked' | 'unlocked';

export interface UseStoragePinReturn {
  pinState: PinState;
  /** Abgeleiteter CryptoKey nach erfolgreichem Unlock (null wenn gesperrt/loading) */
  storageKey: CryptoKey | null;
  /** Fehlermeldung beim PIN-Eingabe (z.B. "Falscher PIN") */
  pinError: string | null;
  /** PIN bestätigen – Unlock (locked) oder Setup-Abschluss (setup) */
  submitPin: (pin: string) => Promise<void>;
  /** PIN wechseln (alle Reports werden re-verschlüsselt) – nur im 'unlocked' Zustand */
  changePin: (newPin: string) => Promise<void>;
  /** PIN zurücksetzen: löscht alle OPFS-Daten und wechselt in den 'setup'-Zustand */
  forgotPin: () => Promise<void>;
}

export function useStoragePin(): UseStoragePinReturn {
  const [pinState, setPinState] = useState<PinState>('loading');
  const [storageKey, setStorageKey] = useState<CryptoKey | null>(null);
  const [pinError, setPinError] = useState<string | null>(null);
  const [salt, setSalt] = useState<Uint8Array<ArrayBuffer> | null>(null);

  // Beim Mount: Salt-Existenz prüfen → Initialzustand bestimmen
  useEffect(() => {
    let mounted = true;

    void loadSaltFromOpfs()
      .then(existingSalt => {
        if (!mounted) return;
        if (existingSalt) {
          setSalt(existingSalt);
          setPinState('locked');
        } else {
          setPinState('setup');
        }
      })
      .catch(() => {
        if (mounted) setPinState('setup');
      });

    return () => {
      mounted = false;
    };
  }, []);

  const submitPin = useCallback(
    async (pin: string) => {
      setPinError(null);

      try {
        if (pinState === 'setup') {
          // Erster Start: neuen Salt generieren, Schlüssel ableiten, Store initialisieren
          const newSalt = await generateAndStoreSalt();
          setSalt(newSalt);
          const key = await deriveStorageKey(pin, newSalt);
          await localReportStore.init(key);
          setStorageKey(key);
          setPinState('unlocked');
        } else if (pinState === 'locked' && salt) {
          // Folgestarts: Schlüssel ableiten + Unlock-Probe
          const key = await deriveStorageKey(pin, salt);
          const valid = await localReportStore.tryUnlock(key);
          if (valid) {
            await localReportStore.init(key);
            setStorageKey(key);
            setPinState('unlocked');
          } else {
            setPinError('Falscher PIN. Bitte erneut versuchen.');
          }
        }
      } catch (err) {
        console.error('[useStoragePin] Fehler beim Entsperren:', err);
        setPinError('Interner Fehler. Bitte App neu laden.');
      }
    },
    [pinState, salt],
  );

  const changePin = useCallback(
    async (newPin: string) => {
      if (!storageKey) return;
      // changeStoragePin generiert neuen Salt, leitet neuen Key ab und re-encryptet alle
      // OPFS-Report-Dateien atomisch. Danach internen Store-Key + Context aktualisieren.
      const newKey = await changeStoragePin(storageKey, newPin);
      localReportStore.updateKey(newKey);
      setStorageKey(newKey);
    },
    [storageKey],
  );

  const forgotPin = useCallback(async () => {
    try {
      const root = await navigator.storage.getDirectory();
      for await (const [name] of root.entries()) {
        await root.removeEntry(name, { recursive: true }).catch(() => {/* best-effort */});
      }
    } catch (err) {
      console.warn('[useStoragePin] OPFS-Wipe fehlgeschlagen:', err);
    }
    setSalt(null);
    setStorageKey(null);
    setPinError(null);
    setPinState('setup');
  }, []);

  return { pinState, storageKey, pinError, submitPin, changePin, forgotPin };
}
