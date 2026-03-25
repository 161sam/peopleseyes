import { useState } from 'react';
import type { UserSettings } from '@peopleseyes/core-model';
import { DEFAULT_USER_SETTINGS } from '@peopleseyes/core-model';

const SETTINGS_KEY = 'pe:user-settings';

const VALID_LOCALES = new Set(['de', 'en', 'tr', 'ar', 'uk', 'fa']);
const VALID_RESOLUTIONS = new Set([6, 7, 8]);

/**
 * Bereinigt aus localStorage geladene Settings gegen ungültige Werte.
 *
 * HIGH-01 fix: Ein injizierter Wert wie { reportResolution: 15 } würde
 * sonst ungefiltert an anonymizePosition() übergeben und dort einen
 * H3-Fehler auslösen.
 */
function sanitizeSettings(raw: Partial<UserSettings>): Partial<UserSettings> {
  // Mutable Hilfsobjekt – wird am Ende als Partial<UserSettings> zurückgegeben
  type MutablePartial = {
    -readonly [K in keyof UserSettings]?: UserSettings[K];
  };
  const clean: MutablePartial = {};

  if (raw.locale !== undefined && VALID_LOCALES.has(raw.locale)) {
    clean.locale = raw.locale;
  }
  if (raw.reportResolution !== undefined && VALID_RESOLUTIONS.has(raw.reportResolution)) {
    clean.reportResolution = raw.reportResolution;
  }
  if (typeof raw.persistEvidence === 'boolean') {
    clean.persistEvidence = raw.persistEvidence;
  }
  if (raw.appMode !== undefined &&
      ['standard', 'readonly', 'kiosk'].includes(raw.appMode as string)) {
    clean.appMode = raw.appMode;
  }
  if (raw.notifications !== undefined &&
      typeof raw.notifications === 'object' &&
      typeof raw.notifications.nearbyReports === 'boolean' &&
      [1, 2, 3].includes(raw.notifications.radiusCells)) {
    clean.notifications = raw.notifications;
  }
  return clean;
}

function loadSettings(): UserSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_USER_SETTINGS;
    const parsed = JSON.parse(raw) as Partial<UserSettings>;
    return { ...DEFAULT_USER_SETTINGS, ...sanitizeSettings(parsed) };
  } catch {
    return DEFAULT_USER_SETTINGS;
  }
}

function saveSettings(settings: UserSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    console.warn('Settings konnten nicht gespeichert werden');
  }
}

export function useUserSettings() {
  const [settings, setSettings] = useState<UserSettings>(loadSettings);

  const updateSettings = (patch: Partial<UserSettings>) => {
    setSettings(prev => {
      const next = { ...prev, ...patch };
      saveSettings(next);
      return next;
    });
  };

  return { settings, updateSettings };
}
