/**
 * iOS PWA-Fallback-Dokumentation und Test-Skript.
 *
 * Safari auf iOS hat bekannte Einschränkungen gegenüber Chrome/Firefox:
 *
 * ✅ Was funktioniert:
 * - Installation als Home-Screen-App (Add to Home Screen)
 * - Offline-Caching via Service Worker (seit iOS 11.3)
 * - Standalone-Modus ohne Browser-Chrome (display: standalone)
 * - Push-ähnliche Benachrichtigungen via Web Push (seit iOS 16.4)
 *
 * ⚠️  Bekannte Einschränkungen auf iOS:
 * - Background-Sync: nicht unterstützt → Reports werden sofort gesendet
 * - Camera API: funktioniert, aber getUserMedia braucht HTTPS (immer)
 * - IndexedDB: funktioniert, aber max. 50MB Quota in Safari
 * - Service Worker Update: aggressiver Cache auf iOS → hard refresh nötig
 * - Web Push: nur seit iOS 16.4, muss explizit aktiviert werden
 *
 * Test-Checkliste für iOS:
 */

export const IOS_PWA_TEST_CHECKLIST = [
  {
    category: 'Installation',
    items: [
      'Safari öffnen → Share-Sheet → "Zum Home-Bildschirm" – App erscheint auf Homescreen',
      'App aus Homescreen starten – kein Browser-Chrome sichtbar',
      'iOS 16.4+: Web Push Permission-Dialog erscheint beim ersten Start',
    ],
  },
  {
    category: 'Offline-Verhalten',
    items: [
      'App laden, dann Flugmodus aktivieren',
      'Karte zeigt gecachte Tiles',
      'Rechte-Screen vollständig offline verfügbar',
      'Report-Formular ausfüllbar (lokale Speicherung funktioniert)',
      'Meldung im Offline-Modus: LocalStore schreibt, P2P-Sync pausiert',
    ],
  },
  {
    category: 'Kamera & Media',
    items: [
      'Foto aufnehmen: Permission-Dialog erscheint',
      'HEIC → JPEG Konvertierung: Bild wird korrekt gespeichert',
      'EXIF-Strip: GPS-Koordinaten sind nicht in gespeichertem Bild',
      'Audio aufnehmen: Mikrofon-Dialog erscheint',
      'Video aufnehmen: Kamera-Dialog erscheint',
    ],
  },
  {
    category: 'Standort',
    items: [
      'Standort-Permission-Dialog erscheint',
      'Karte zentriert sich auf Nutzerposition',
      'Ablehnen: App zeigt Deutschland-Übersicht ohne Fehler',
    ],
  },
  {
    category: 'Sprache & RTL',
    items: [
      'iOS auf Arabisch umstellen → App-UI wechselt zu RTL',
      'iOS auf Persisch umstellen → App-UI wechselt zu RTL',
      'Zurück auf Deutsch → RTL wird aufgehoben',
    ],
  },
  {
    category: 'Performance',
    items: [
      'Kaltstart unter 3 Sekunden (iPhone SE oder neuer)',
      'Kartenrendering flüssig beim Scrollen',
      'Kein Memory-Leak nach 10 Minuten Nutzung',
    ],
  },
] as const;

/**
 * Konfiguration die den iOS-Problemen entgegenwirkt.
 * Wird in vite.config.ts der web-App genutzt.
 */
export const IOS_WORKBOX_CONFIG = {
  // Kürzere Cache-Dauer als auf Desktop – iOS Safari aggressive Caching vermeiden
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB pro Datei max
  // skipWaiting: false auf iOS – neuer SW erst nach Browser-Close aktiv
  skipWaiting: false,
  clientsClaim: false,
} as const;
