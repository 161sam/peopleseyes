import { useEffect, useRef, useCallback } from 'react';
import type { ResetBehavior, KioskTab } from '../kiosk-profile.js';

interface UseInactivityResetOptions {
  timeoutSec: number | null;
  behavior: ResetBehavior;
  tabs: readonly KioskTab[];
  onReset: (targetTab: KioskTab | null) => void;
}

/**
 * Überwacht Nutzerinteraktionen und löst nach Inaktivität einen Reset aus.
 *
 * Events die als "aktiv" gewertet werden:
 * - Mausbewegung, Klick, Touch, Scrollen, Tastendruck
 *
 * Der Hook registriert globale Event-Listener und räumt sie beim
 * Unmount auf.
 */
export function useInactivityReset({
  timeoutSec,
  behavior,
  tabs,
  onReset,
}: UseInactivityResetOptions): void {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resolveTarget = useCallback((): KioskTab | null => {
    switch (behavior) {
      case 'home':   return tabs[0] ?? null;
      case 'map':    return tabs.includes('map') ? 'map' : (tabs[0] ?? null);
      case 'rights': return tabs.includes('rights') ? 'rights' : (tabs[0] ?? null);
      case 'reload': return null; // Signalisiert vollständigen Reload
    }
  }, [behavior, tabs]);

  const resetTimer = useCallback(() => {
    if (!timeoutSec) return;
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      const target = resolveTarget();
      if (behavior === 'reload') {
        window.location.reload();
      } else {
        onReset(target);
      }
    }, timeoutSec * 1000);
  }, [timeoutSec, resolveTarget, behavior, onReset]);

  useEffect(() => {
    if (!timeoutSec) return;

    const EVENTS = [
      'mousemove', 'mousedown', 'keydown',
      'touchstart', 'touchmove', 'scroll', 'wheel',
    ] as const;

    const handler = () => resetTimer();
    EVENTS.forEach(e => window.addEventListener(e, handler, { passive: true }));
    resetTimer(); // Initiales Starten des Timers

    return () => {
      EVENTS.forEach(e => window.removeEventListener(e, handler));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [resetTimer, timeoutSec]);
}
