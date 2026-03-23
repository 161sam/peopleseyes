import type { KioskProfile } from '../kiosk-profile.js';
import { validateKioskProfile } from '../kiosk-profile.js';

/** Standard-Profil wenn kein externes Profil geladen werden konnte */
const FALLBACK_PROFILE: KioskProfile = {
  id: 'default',
  name: 'PeoplesEyes Kiosk',
  schemaVersion: '1',
  tabs: ['map', 'rights', 'emergency'],
  locale: 'de',
  mapCenter: { lat: 51.3, lng: 10.0, zoom: 7 },
  inactivityTimeoutSec: 120,
  resetBehavior: 'map',
  allowReporting: false,
  emergencyContacts: [
    { label: 'GFF – Gesellschaft für Freiheitsrechte', url: 'https://freiheitsrechte.org' },
    { label: 'RAV – Republikanischer Anwältinnenverein', url: 'https://rav.de' },
    { label: 'Digitalcourage e.V.', url: 'https://digitalcourage.de' },
  ],
};

/**
 * WARN-06 fix: Validiert ob eine profile-url sicher geladen werden darf.
 * Erlaubt nur HTTPS-URLs mit nicht-privaten Hosts.
 */
function isSafeProfileUrl(raw: string): boolean {
  try {
    const url = new URL(raw);
    // Nur HTTPS
    if (url.protocol !== 'https:') return false;
    const host = url.hostname.toLowerCase();
    // Keine localhost / private Ranges / file:// etc.
    const blocked = ['localhost', '127.', '0.', '10.', '192.168.', '172.', '::1', '[::'];
    if (blocked.some(b => host.startsWith(b))) return false;
    return true;
  } catch {
    return false;
  }
}

/**
 * Lädt das Kiosk-Profil in folgender Priorität:
 *
 * 1. `window.__PE_KIOSK_PROFILE__` – direkt eingebettetes Objekt (MDM-Deployment)
 * 2. URL-Parameter `?profile=<id>` → lädt `/profiles/<id>.json`
 * 3. URL-Parameter `?profile-url=<url>` → lädt externes JSON (CORS erforderlich)
 * 4. Fallback-Profil (eingebaut)
 */
export async function loadKioskProfile(): Promise<KioskProfile> {
  // 1. Direkt eingebettet (höchste Priorität – MDM/Server-Side-Injection)
  const embedded = (window as unknown as Record<string, unknown>)['__PE_KIOSK_PROFILE__'];
  if (embedded && validateKioskProfile(embedded)) {
    const profile = embedded as KioskProfile;
    console.warn('[Kiosk] Profil aus window.__PE_KIOSK_PROFILE__ geladen:', profile.id);
    return profile;
  }

  const params = new URLSearchParams(window.location.search);

  // 2. Profil-ID aus URL-Parameter → lokale JSON-Datei
  const profileId = params.get('profile');
  if (profileId && /^[a-z0-9-]+$/.test(profileId)) {
    try {
      const res = await fetch(`/profiles/${profileId}.json`);
      if (res.ok) {
        const data: unknown = await res.json();
        if (validateKioskProfile(data)) {
          console.warn('[Kiosk] Profil geladen:', profileId);
          return data;
        }
      }
    } catch {
      console.error('[Kiosk] Profil konnte nicht geladen werden:', profileId);
    }
  }

  // 3. Externe URL – nur HTTPS, keine privaten IP-Ranges
  const profileUrl = params.get('profile-url');
  if (profileUrl && isSafeProfileUrl(profileUrl)) {
    try {
      const res = await fetch(profileUrl);
      if (res.ok) {
        const data: unknown = await res.json();
        if (validateKioskProfile(data)) {
          console.warn('[Kiosk] Externes Profil geladen:', profileUrl);
          return data;
        }
      }
    } catch {
      console.error('[Kiosk] Externes Profil konnte nicht geladen werden:', profileUrl);
    }
  }

  // 4. Fallback
  console.warn('[Kiosk] Fallback-Profil wird verwendet');
  return FALLBACK_PROFILE;
}
