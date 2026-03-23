import { useState, useEffect } from 'react';
import type { UserSettings } from '@peopleseyes/core-model';
import { DEFAULT_USER_SETTINGS } from '@peopleseyes/core-model';

const SETTINGS_KEY = 'pe:user-settings';

function loadSettings(): UserSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_USER_SETTINGS;
    return { ...DEFAULT_USER_SETTINGS, ...(JSON.parse(raw) as Partial<UserSettings>) };
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
