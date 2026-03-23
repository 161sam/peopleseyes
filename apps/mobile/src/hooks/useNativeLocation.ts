import { useState, useEffect, useRef } from 'react';
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
  const watchRef = useRef<Location.LocationSubscription | null>(null);

  const startWatch = async () => {
    setState(s => ({ ...s, isLoading: true }));

    watchRef.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Balanced,
        distanceInterval: 100, // Update erst ab 100m Bewegung
        timeInterval: 30_000,
      },
      ({ coords }) => {
        setState(s => ({
          ...s,
          position: anonymizePosition(coords.latitude, coords.longitude, resolution),
          rawCoords: { lat: coords.latitude, lng: coords.longitude },
          isLoading: false,
          error: null,
        }));
      },
    );
  };

  const requestPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setState(s => ({ ...s, permissionStatus: status === 'granted' ? 'granted' : 'denied' }));

    if (status === 'granted') {
      await startWatch();
    } else {
      setState(s => ({
        ...s,
        error: 'Standortzugriff verweigert. Du kannst trotzdem melden.',
        isLoading: false,
      }));
    }
  };

  useEffect(() => {
    // Beim ersten Mount: Berechtigung prüfen (nicht anfragen)
    void Location.getForegroundPermissionsAsync().then(({ status }) => {
      if (status === 'granted') {
        setState(s => ({ ...s, permissionStatus: 'granted' }));
        void startWatch();
      } else {
        setState(s => ({ ...s, permissionStatus: status === 'denied' ? 'denied' : 'undetermined' }));
      }
    });

    return () => {
      watchRef.current?.remove();
    };
  }, []);

  return { ...state, requestPermission };
}
