/**
 * Kiosk-Konfigurationsschema für PeoplesEyes InfoTerminal.
 *
 * Ein Terminal-Profil wird als JSON-Datei bereitgestellt und
 * steuert vollständig das Verhalten des Kiosk-Modus:
 * - Welche Tabs sichtbar sind
 * - Sprache und Startposition der Karte
 * - Inaktivitäts-Timeout und Reset-Verhalten
 * - Optionale Branding-Anpassungen
 *
 * Die Datei kann via URL-Parameter geladen werden:
 *   https://kiosk.peopleseyes.org?profile=beratungsstelle-berlin
 * Oder direkt eingebettet als `window.__PE_KIOSK_PROFILE__`.
 */

import type { SupportedLocale } from '@peopleseyes/core-model';

/** Sichtbare Tabs im Kiosk-Modus */
export type KioskTab = 'map' | 'rights' | 'report' | 'emergency';

/** Startzoom-Level der Karte (1–18) */
export type MapZoomLevel = 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

/** Verhalten beim Inaktivitäts-Reset */
export type ResetBehavior =
  | 'home'          // Zurück zum ersten Tab
  | 'map'           // Immer zur Karte
  | 'rights'        // Immer zu den Rechten
  | 'reload';       // Vollständiger Seiten-Reload

/** Kontakt-Eintrag für den Notfall-Screen */
export interface KioskEmergencyContact {
  readonly label: string;
  readonly phone?: string;
  /** Optional: URL für weitere Infos */
  readonly url?: string;
}

/** Branding-Anpassungen (alle optional) */
export interface KioskBranding {
  /** Anzeigename der Organisation (erscheint in der Fußzeile) */
  readonly organizationName?: string;
  /** Farbe der Akzentfarbe (CSS-Hex, z.B. "#3b82f6") */
  readonly accentColor?: string;
  /** URL eines Logos (SVG empfohlen, max. 200×60 px) */
  readonly logoUrl?: string;
}

/** Vollständiges Kiosk-Profil */
export interface KioskProfile {
  /** Maschinenlesbarer Profilname (kebab-case) */
  readonly id: string;
  /** Anzeigename des Profils */
  readonly name: string;
  /** Schemaversion – aktuell "1" */
  readonly schemaVersion: '1';

  /** Anzuzeigende Tabs (Reihenfolge bestimmt die Navigationsreihenfolge) */
  readonly tabs: readonly KioskTab[];

  /** Sprache der UI */
  readonly locale: SupportedLocale;

  /** Kartenstart-Koordinaten */
  readonly mapCenter: {
    readonly lat: number;
    readonly lng: number;
    readonly zoom: MapZoomLevel;
  };

  /**
   * Inaktivitäts-Timeout in Sekunden.
   * Nach dieser Zeit ohne Nutzerinteraktion wird resetBehavior ausgelöst.
   * Minimum: 30s. null = kein Timeout.
   */
  readonly inactivityTimeoutSec: number | null;

  /** Verhalten beim Timeout-Reset */
  readonly resetBehavior: ResetBehavior;

  /** Ob Meldungen abgegeben werden dürfen (false = nur lesen) */
  readonly allowReporting: boolean;

  /** Notfallkontakte für den Notfall-Tab (leer = Tab wird versteckt) */
  readonly emergencyContacts: readonly KioskEmergencyContact[];

  /** Optionales Branding */
  readonly branding?: KioskBranding;
}

/** Validiert ein KioskProfile-Objekt (Laufzeit-Prüfung für geladene JSONs) */
export function validateKioskProfile(value: unknown): value is KioskProfile {
  if (typeof value !== 'object' || value === null) return false;
  const p = value as Record<string, unknown>;

  const VALID_TABS = new Set<string>(['map', 'rights', 'report', 'emergency']);
  const tabsValid =
    Array.isArray(p['tabs']) &&
    (p['tabs'] as unknown[]).length > 0 &&
    (p['tabs'] as unknown[]).every(t => typeof t === 'string' && VALID_TABS.has(t));

  // WARN-02 fix: mapCenter-Koordinaten auf valide Bereiche prüfen.
  // Ein Profil mit lat:NaN oder lat:999 würde MapLibre zum Absturz bringen.
  const mc = p['mapCenter'] as Record<string, unknown> | null | undefined;
  const mapCenterValid =
    typeof mc === 'object' &&
    mc !== null &&
    typeof mc['lat'] === 'number' && isFinite(mc['lat']) &&
    mc['lat'] >= -90 && mc['lat'] <= 90 &&
    typeof mc['lng'] === 'number' && isFinite(mc['lng']) &&
    mc['lng'] >= -180 && mc['lng'] <= 180 &&
    typeof mc['zoom'] === 'number' &&
    mc['zoom'] >= 1 && mc['zoom'] <= 18;

  // inactivityTimeoutSec muss null oder eine Zahl >= 30 sein
  const timeoutValid =
    p['inactivityTimeoutSec'] === null ||
    (typeof p['inactivityTimeoutSec'] === 'number' && p['inactivityTimeoutSec'] >= 30);

  return (
    typeof p['id'] === 'string' && p['id'].length > 0 &&
    typeof p['name'] === 'string' &&
    p['schemaVersion'] === '1' &&
    tabsValid &&
    typeof p['locale'] === 'string' &&
    mapCenterValid &&
    Array.isArray(p['emergencyContacts']) &&
    timeoutValid &&
    typeof p['allowReporting'] === 'boolean'
  );
}
