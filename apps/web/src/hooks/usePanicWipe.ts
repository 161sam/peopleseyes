/**
 * Panic-Button: sofortiges Löschen aller lokalen Daten.
 *
 * Aktivierung: 5 schnelle Taps (< 2 Sekunden) auf ein beliebiges Element
 * das den zurückgegebenen Handler verwendet.
 *
 * Löscht:
 * - OPFS reports/-Verzeichnis (verschlüsselte Report-Dateien)
 * - OPFS pe_salt (Salt für Schlüsselableitung)
 * - sessionStorage (Offline-Queue, temporäre Daten)
 * - localStorage (Einstellungen)
 * - IndexedDB 'peopleseyes' (Legacy-Daten, Fallback)
 *
 * Nach dem Wipe: harter Reload damit React-State und GUN-Instanz
 * ebenfalls zurückgesetzt werden.
 */

import { useRef, useCallback, useState } from 'react';

const TAP_WINDOW_MS = 2000;
const REQUIRED_TAPS = 5;

/**
 * Löscht alle lokalen Daten des Browsers für PeoplesEyes.
 * Gibt eine Promise zurück die nach dem Löschen auflöst.
 */
async function wipeAllLocalData(): Promise<void> {
  // 1. SessionStorage
  try { sessionStorage.clear(); } catch { /* ignorieren */ }

  // 2. localStorage
  try { localStorage.clear(); } catch { /* ignorieren */ }

  // 3. IndexedDB – alle bekannten Datenbanken (Legacy-Fallback)
  const dbsToDelete = ['peopleseyes'];
  await Promise.allSettled(
    dbsToDelete.map(
      name =>
        new Promise<void>(resolve => {
          const req = indexedDB.deleteDatabase(name);
          req.onsuccess = () => resolve();
          req.onerror = () => resolve();
          req.onblocked = () => resolve();
        }),
    ),
  );

  // 4. OPFS – verschlüsselte Report-Dateien + Salt löschen
  try {
    if ('storage' in navigator && typeof navigator.storage.getDirectory === 'function') {
      const root = await navigator.storage.getDirectory();
      await Promise.allSettled([
        root.removeEntry('reports', { recursive: true }),
        root.removeEntry('pe_salt'),
      ]);
    }
  } catch { /* ignorieren */ }

  // 5. Cache Storage (Service Worker Caches)
  try {
    if ('caches' in globalThis) {
      const keys = await caches.keys();
      await Promise.allSettled(keys.map(k => caches.delete(k)));
    }
  } catch { /* ignorieren */ }
}

export interface UsePanicWipeOptions {
  /** Wird aufgerufen bevor wipeAllLocalData() läuft. Wartet auf die zurückgegebene Promise. */
  onBeforeWipe?: () => Promise<void>;
}

interface UsePanicWipeReturn {
  /** An onClick / onTouchStart binden */
  onTap: () => void;
  /** Anzahl bisheriger Taps im aktuellen Fenster (für optionale visuelle Rückmeldung) */
  tapCount: number;
  /** Wird kurz true bevor der Wipe ausgeführt wird */
  isWiping: boolean;
}

export function usePanicWipe(options?: UsePanicWipeOptions): UsePanicWipeReturn {
  const tapsRef = useRef<number[]>([]);
  const [tapCount, setTapCount] = useState(0);
  const [isWiping, setIsWiping] = useState(false);

  const onTap = useCallback(() => {
    const now = Date.now();
    // Alte Taps außerhalb des Zeitfensters entfernen
    tapsRef.current = tapsRef.current.filter(t => now - t < TAP_WINDOW_MS);
    tapsRef.current.push(now);

    const count = tapsRef.current.length;
    setTapCount(count);

    if (count >= REQUIRED_TAPS) {
      tapsRef.current = [];
      setTapCount(0);
      setIsWiping(true);

      const run = async () => {
        // Schritt 1: Alert senden (falls konfiguriert)
        if (options?.onBeforeWipe) {
          try {
            await options.onBeforeWipe();
          } catch {
            // Alert-Fehler dürfen den Wipe nicht blockieren
          }
        }
        // Schritt 2: 2 Sekunden warten (Nutzer sieht "Alert wird gesendet…")
        await new Promise<void>(resolve => setTimeout(resolve, 2000));
        // Schritt 3: Daten löschen
        await wipeAllLocalData();
        // Schritt 4: Harter Reload
        window.location.reload();
      };

      void run();
    }
  }, [options]);

  return { onTap, tapCount, isWiping };
}
