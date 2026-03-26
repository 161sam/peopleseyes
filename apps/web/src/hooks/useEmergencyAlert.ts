/**
 * Emergency Alert Hook
 *
 * Verwaltet Notfallkontakte und den Alert-Versand per SMS/Web Share API.
 * Privacy-Regel: Nur H3-Zell-IDs (~5 km² Auflösung), niemals GPS-Koordinaten.
 */

import { useCallback } from 'react';
import type { EmergencyContact } from '@peopleseyes/core-model';
import { useUserSettings } from './useUserSettings.js';

export interface EmergencyAlertState {
  contacts: readonly EmergencyContact[];
  message: string;
  addContact(contact: Omit<EmergencyContact, 'id'>): void;
  removeContact(id: string): void;
  updateMessage(msg: string): void;
  sendAlert(cellId: string | null): Promise<void>;
}

function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

export function useEmergencyAlert(): EmergencyAlertState {
  const { settings, updateSettings } = useUserSettings();

  const contacts = settings.emergencyContacts;
  const message = settings.emergencyMessage;

  const addContact = useCallback(
    (contact: Omit<EmergencyContact, 'id'>) => {
      if (contacts.length >= 3) return;
      const newContact: EmergencyContact = { ...contact, id: generateId() };
      updateSettings({ emergencyContacts: [...contacts, newContact] });
    },
    [contacts, updateSettings],
  );

  const removeContact = useCallback(
    (id: string) => {
      updateSettings({ emergencyContacts: contacts.filter(c => c.id !== id) });
    },
    [contacts, updateSettings],
  );

  const updateMessage = useCallback(
    (msg: string) => {
      updateSettings({ emergencyMessage: msg });
    },
    [updateSettings],
  );

  const sendAlert = useCallback(
    async (cellId: string | null): Promise<void> => {
      if (contacts.length === 0) return;

      const text = `${message} H3-Bereich: ${cellId ?? 'Unbekannt'} — PeoplesEyes`;

      // Web Share API (mobil bevorzugt)
      if (typeof navigator !== 'undefined' && 'share' in navigator) {
        try {
          await navigator.share({ text });
          return;
        } catch {
          // Fallback auf sms:-Links
        }
      }

      // Fallback: sms:-Links für jeden Kontakt sequenziell öffnen
      for (const contact of contacts) {
        const smsUrl = `sms:${contact.phone}?body=${encodeURIComponent(text)}`;
        window.open(smsUrl, '_blank');
        // Kurze Pause zwischen mehreren Öffnungen
        if (contacts.length > 1) {
          await new Promise<void>(resolve => setTimeout(resolve, 500));
        }
      }
    },
    [contacts, message],
  );

  return { contacts, message, addContact, removeContact, updateMessage, sendAlert };
}
