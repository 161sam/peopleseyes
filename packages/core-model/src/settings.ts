/**
 * Nutzereinstellungen – ausschließlich lokal gespeichert.
 * Kein Account, kein Backend, keine Synchronisation dieser Daten.
 */

export type SupportedLocale =
  | 'de' | 'en' | 'tr' | 'ar' | 'uk' | 'fa'
  | 'fr' | 'es' | 'pl' | 'ro' | 'sr' | 'sq' | 'bs'
  | 'so' | 'am' | 'ti' | 'ps' | 'ku' | 'ru' | 'sw';

export enum AppMode {
  /** Vollständige App – Melden + Karte + Info */
  Standard = 'standard',
  /** Nur Lesen + Info – für Kiosk-Betrieb */
  ReadOnly = 'readonly',
  /** Kiosk-Modus – reduziertes UI, kein Melden */
  Kiosk = 'kiosk',
}

export interface NotificationPreferences {
  /** Benachrichtigung bei neuen Reports in Nähe */
  readonly nearbyReports: boolean;
  /** Radius in H3-Zellen (1 = direkte Nachbarzellen) */
  readonly radiusCells: 1 | 2 | 3;
}

export interface EmergencyContact {
  readonly id: string;      // UUID v4
  readonly name: string;    // Anzeigename
  readonly phone: string;   // Internationale Nummer, z.B. +49151...
}

export interface UserSettings {
  readonly locale: SupportedLocale;
  readonly appMode: AppMode;
  readonly notifications: NotificationPreferences;
  /**
   * Maximale H3-Auflösung die der Nutzer meldet.
   * Sicherheitsbewusste Nutzer können auf gröbere Auflösung setzen.
   */
  readonly reportResolution: 6 | 7 | 8;
  /**
   * Ob Beweise (Fotos/Videos) lokal gespeichert werden sollen.
   * False = nur RAM, nach App-Close weg.
   */
  readonly persistEvidence: boolean;
  /** Kontakte die beim Panic-Button-Alert benachrichtigt werden (max. 3) */
  readonly emergencyContacts: readonly EmergencyContact[];
  /** Nachrichtentext der beim Alert gesendet wird */
  readonly emergencyMessage: string;
}

export const DEFAULT_USER_SETTINGS: UserSettings = {
  locale: 'de',
  appMode: AppMode.Standard,
  notifications: {
    nearbyReports: false,
    radiusCells: 1,
  },
  reportResolution: 7,
  persistEvidence: false,
  emergencyContacts: [],
  emergencyMessage: 'Ich brauche Hilfe. Hier ist mein ungefährer Standort:',
};
