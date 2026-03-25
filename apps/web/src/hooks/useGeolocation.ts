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

/**
 * Menschenlesbare Fehlermeldungen für alle drei Geolocation-Fehlercodes.
 * BUG-01 fix: bisher wurden code 2 (POSITION_UNAVAILABLE) und code 3
 * (TIMEOUT) identisch behandelt – der Nutzer konnte nicht unterscheiden ob
 * er warten oder Berechtigungen prüfen soll.
 */
const GEOLOCATION_ERROR_MESSAGES: Record<number, string> = {
  1: 'Standortzugriff verweigert. Bitte Berechtigung in den Browsereinstellungen erlauben.',
  2: 'Standort nicht verfügbar – GPS-Signal fehlt oder Gerät nicht unterstützt.',
  3: 'Standortabfrage hat zu lange gedauert. Bitte erneut versuchen.',
};

export function useGeolocation(resolution: H3Resolution = H3Resolution.Viertel): GeolocationState {
  const [state, setState] = useState<GeolocationState>({
    position: null,
    rawCoords: null,
    error: null,
    isLoading: false,
  });

  useEffect(() => {
    // BUG-03 fix: mounted-Guard verhindert State-Update auf unmountete Komponente
    let mounted = true;

    if (!navigator.geolocation) {
      setState(s => ({ ...s, error: 'Geolocation wird von diesem Browser nicht unterstützt.' }));
      return;
    }

    setState(s => ({ ...s, isLoading: true }));

    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        if (!mounted) return;
        const { latitude: lat, longitude: lng } = coords;
        setState({
          position: anonymizePosition(lat, lng, resolution),
          rawCoords: { lat, lng },
          error: null,
          isLoading: false,
        });
      },
      err => {
        if (!mounted) return;
        setState(s => ({
          ...s,
          error: GEOLOCATION_ERROR_MESSAGES[err.code] ?? 'Unbekannter Standortfehler.',
          isLoading: false,
        }));
      },
      { enableHighAccuracy: false, maximumAge: 30_000, timeout: 10_000 },
    );

    return () => {
      mounted = false;
      navigator.geolocation.clearWatch(watchId);
    };
  }, [resolution]);

  return state;
}
