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
      const newSalt = await generateAndStoreSalt();
      const newKey = await deriveStorageKey(newPin, newSalt);
      await localReportStore.reEncryptAll(storageKey, newKey);
      setSalt(newSalt);
      setStorageKey(newKey);
    },
    [storageKey],
  );

  return { pinState, storageKey, pinError, submitPin, changePin };
}
