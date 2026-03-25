/**
 * Standort-Hook für React Native.
 *
 * Fehler 8 fix: startWatch war eine instabile closure die bei jedem Render
 * neu erzeugt wurde. Jetzt als useCallback mit stabiler Referenz, damit
 * - requestPermission immer die aktuelle Version aufruft
 * - useEffect bei resolution-Änderungen den Watch korrekt neu startet
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import * as Location from 'expo-location';
import type { AnonymizedPosition } from '@peopleseyes/core-model';
import { H3Resolution } from '@peopleseyes/core-model';
import { anonymizePosition } from '@peopleseyes/core-logic';

interface NativeLocationState {
  position: AnonymizedPosition | null;
  /** Nur für Map-Centering – wird nie gespeichert oder übertragen */
  rawCoords: { lat: number; lng: number } | null;
  permissionStatus: 'undetermined' | 'granted' | 'denied';
  isLoading: boolean;
  error: string | null;
}

export function useNativeLocation(
  resolution: H3Resolution = H3Resolution.Viertel,
): NativeLocationState & { requestPermission: () => Promise<void> } {
  const [state, setState] = useState<NativeLocationState>({
    position: null,
    rawCoords: null,
    permissionStatus: 'undetermined',
    isLoading: false,
    error: null,
  });
  // Ref für aktive Subscription — damit stopWatch immer die richtige Instanz hält
  const watchRef = useRef<Location.LocationSubscription | null>(null);
  // Ref auf resolution damit startWatch immer den aktuellen Wert sieht
  // ohne in deps zu erscheinen
  const resolutionRef = useRef(resolution);
  resolutionRef.current = resolution;

  /** Stoppt den aktuellen Watcher */
  const stopWatch = useCallback(() => {
    if (watchRef.current) {
      watchRef.current.remove();
      watchRef.current = null;
    }
  }, []);

  /**
   * Startet einen neuen GPS-Watcher.
   * Fehler 8 fix: stabile useCallback-Referenz, damit requestPermission
   * und der resolution-useEffect dieselbe Funktion aufrufen.
   */
  const startWatch = useCallback(async () => {
    stopWatch(); // Vorherigen Watcher zuerst stoppen
    setState(s => ({ ...s, isLoading: true }));

    try {
      watchRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          distanceInterval: 100,
          timeInterval: 30_000,
        },
        ({ coords }) => {
          setState(s => ({
            ...s,
            position: anonymizePosition(
              coords.latitude,
              coords.longitude,
              resolutionRef.current,
            ),
            rawCoords: { lat: coords.latitude, lng: coords.longitude },
            isLoading: false,
            error: null,
          }));
        },
      );
    } catch {
      setState(s => ({
        ...s,
        error: 'Standort konnte nicht gestartet werden.',
        isLoading: false,
      }));
    }
  }, [stopWatch]);

  const requestPermission = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setState(s => ({
      ...s,
      permissionStatus: status === 'granted' ? 'granted' : 'denied',
    }));

    if (status === 'granted') {
      await startWatch();
    } else {
      setState(s => ({
        ...s,
        error: 'Standortzugriff verweigert. Du kannst trotzdem melden.',
        isLoading: false,
      }));
    }
  }, [startWatch]);

  // Mount: Berechtigung prüfen (nicht anfragen)
  useEffect(() => {
    let mounted = true;
    void Location.getForegroundPermissionsAsync().then(({ status }) => {
      if (!mounted) return;
      if (status === 'granted') {
        setState(s => ({ ...s, permissionStatus: 'granted' }));
        void startWatch();
      } else {
        setState(s => ({
          ...s,
          permissionStatus: status === 'denied' ? 'denied' : 'undetermined',
        }));
      }
    });
    return () => {
      mounted = false;
      stopWatch();
    };
  }, [startWatch, stopWatch]);

  // Fehler 8 fix: Bei resolution-Änderung Watch neu starten damit die neue
  // Auflösung sofort in anonymizePosition greift
  useEffect(() => {
    if (state.permissionStatus === 'granted') {
      void startWatch();
    }
    // Nur bei resolution-Änderung neu starten, nicht beim ersten Mount
    // (der erste Mount wird im useEffect oben behandelt)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolution]);

  return { ...state, requestPermission };
}
