import { useState, useEffect } from 'react';
import { anonymizePosition } from '@peopleseyes/core-logic';
import { H3Resolution } from '@peopleseyes/core-model';
import type { AnonymizedPosition } from '@peopleseyes/core-model';

interface GeolocationState {
  position: AnonymizedPosition | null;
  /** Rohe Koordinaten – nur für Map-Centering, niemals gespeichert */
  rawCoords: { lat: number; lng: number } | null;
  error: string | null;
  isLoading: boolean;
}

export function useGeolocation(resolution: H3Resolution = H3Resolution.Viertel): GeolocationState {
  const [state, setState] = useState<GeolocationState>({
    position: null,
    rawCoords: null,
    error: null,
    isLoading: false,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState(s => ({ ...s, error: 'Geolocation nicht unterstützt' }));
      return;
    }

    setState(s => ({ ...s, isLoading: true }));

    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        const { latitude: lat, longitude: lng } = coords;
        setState({
          position: anonymizePosition(lat, lng, resolution),
          rawCoords: { lat, lng },
          error: null,
          isLoading: false,
        });
      },
      err => {
        setState(s => ({
          ...s,
          error: err.code === 1 ? 'Standortzugriff verweigert' : 'Standort nicht verfügbar',
          isLoading: false,
        }));
      },
      { enableHighAccuracy: false, maximumAge: 30_000, timeout: 10_000 },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [resolution]);

  return state;
}
