# PeoplesEyes

Zivilgesellschaftliches Crowdsourcing-Tool zur anonymen Dokumentation von Behördenaktivitäten in EU/Deutschland.

Inspiriert von [Firewatch](https://github.com/severian42/Firewatch) und [ICEOUT](https://iceout.org) – von Grund auf neu entwickelt für den EU/D-Kontext mit Privacy-by-Design und Local-first-Architektur.

---

## Ziel

PeoplesEyes ermöglicht es Menschen, Sichtungen von Behördeneinsätzen (Bundespolizei, Landespolizei, Ausländerbehörden, Frontex) anonym zu melden, auf einer Karte zu sehen und ihre Rechte offline abzurufen.

**Was PeoplesEyes nicht ist:**
- Kein Aufruf zu Blockaden oder Behinderung von Behörden
- Kein Tool zum Doxing von Einzelpersonen
- Kein Ersatz für anwaltliche Beratung

---

## Architektur

```
peopleseyes/
├── packages/
│   ├── core-model/     # TypeScript-Interfaces, Enums, Datenmodell, Abuse-Typen
│   ├── core-logic/     # Algorithmen: H3-Geo, Consensus, Scoring, Abuse-Penalty
│   ├── core-i18n/      # Übersetzungen: DE, EN, TR, UK, AR, FA (inkl. RTL)
│   └── core-crypto/    # Ephemere Keypairs (ECDSA P-256), EXIF-Stripping
├── apps/
│   ├── web/            # React 18 + Vite + MapLibre + GUN.js PWA
│   ├── mobile/         # React Native / Expo (Android + iOS)
│   └── kiosk/          # React PWA im Kiosk-Modus für InfoTerminals
└── turbo.json          # Turborepo Build-Pipeline
```

### Datenprinzipien

| Prinzip | Umsetzung |
|---|---|
| Keine Rohdaten außerhalb des Geräts | GPS → H3-Zell-ID lokal; nur anonymisierte `CellId` wird geteilt |
| Kein Account, keine Identität | Ephemere Peer-ID, bei jedem App-Start neu generiert |
| Kein zentraler Server | P2P-Sync via GUN.js, dezentrale Relay-Bootstrap |
| Keine Analytics | Kein Tracking, kein Crash-Reporting an externe Server |
| EXIF-frei | Web: Canvas-Reprojection · Mobile: `expo-image-manipulator` Re-Encode |

---

## Setup

```bash
# Voraussetzungen: Node >= 20, pnpm >= 9
corepack enable

git clone https://github.com/<org>/peopleseyes.git
cd peopleseyes

pnpm install
pnpm build        # alle packages kompilieren
pnpm dev          # alle apps im Watch-Modus starten
```

### Web-App starten

```bash
cd apps/web
pnpm dev
# → http://localhost:5173
```

### Android-App starten

```bash
cd apps/mobile
pnpm android      # Android Studio + Emulator oder echtes Gerät erforderlich
```

### iOS-App starten

```bash
cd apps/mobile
pnpm ios          # Xcode 15+ + macOS erforderlich
```

### Kiosk-Terminal starten

```bash
cd apps/kiosk
pnpm dev
# → http://localhost:5174?profile=beratungsstelle-berlin
```

---

## Pakete

### `@peopleseyes/core-model`

Alle Typen, Interfaces und Enums. Keine Logik, keine externen Abhängigkeiten.

Zentrale Typen:
- `Report` – eine Sichtungsmeldung (immutable nach Erstellung)
- `CellAggregate` – aggregierte Zelldaten für die Kartenansicht
- `AuthorityCategory` – Enum der EU/D-Behörden (14 Kategorien)
- `ObservedActivityType` – Enum der beobachtbaren Aktivitäten (8 Typen)
- `AbuseFlag` / `AbuseReason` – Flagging verdächtiger Meldungen
- `UserSettings` – lokale Nutzereinstellungen (Locale, Auflösung, AppMode)
- `AnonymizedPosition` – H3-Zell-ID + Stunden-Timestamp, nie Rohdaten

### `@peopleseyes/core-logic`

Algorithmen ohne Browser- oder Native-Abhängigkeiten. Läuft in Web, Mobile und Tests identisch.

- `anonymizePosition(lat, lng, resolution)` – GPS → H3-Zell-ID (h3-js, Resolution 7 ≈ 5 km²)
- `getCellBoundary(cellId)` – H3-Zell-Polygon für MapLibre / react-native-maps
- `aggregateReportsForCell(cellId, reports)` – berechnet `CellAggregate` mit 2h-Zeitfenster
- `computeAggregateScore(reports)` – Confidence-Score 0–1 aus Anzahl + Kategorien-Übereinstimmung
- `isLikelySpam(report, existing)` – heuristischer Rate-Limit-Filter (max. 10/Zelle/Stunde)
- `deduplicateReports(reports)` – P2P-Deduplizierung per ID
- `createReport(draft)` – Factory mit Validierung, erzeugt immutables Report-Objekt
- `validateReport(unknown)` – Type Guard für P2P-Empfang
- `computeAbusePenalty(reportId, flags)` – Abuse-Penalty 0–1 für Score-Absenkung
- `createAbuseFlag(reportId, reason, cellId)` – Factory für AbuseFlag

### `@peopleseyes/core-i18n`

Vollständig typisierte Übersetzungen mit RTL-Erkennung. Alle 6 Locales aktiv.

```typescript
import { getTranslations, isRtlLocale } from '@peopleseyes/core-i18n';

const t = getTranslations('de');
console.log(t.rights.topics.silence.title); // "Schweigerecht"

isRtlLocale('ar'); // true
isRtlLocale('de'); // false
```

Unterstützte Locales: `de` · `en` · `tr` · `uk` · `ar` · `fa`

RTL-Sprachen (automatisches `dir="rtl"` im Web, `I18nManager.forceRTL()` in React Native): `ar`, `fa`

### `@peopleseyes/core-crypto`

Ausschließlich Web Crypto API – kein externer Krypto-Code, vollständig auditierbar.

- `generateEphemeralKeypair()` – ECDSA P-256, ephemer (kein Persist)
- `signMessage(msg, privateKey)` – Signiert P2P-Nachrichten
- `verifySignature(msg, sig, pubKey)` – Verifiziert empfangene Nachrichten
- `sha256(input)` – Hashing für Deduplizierung und Nachrichts-IDs
- `stripExifFromImage(blob)` – Web: Canvas-Reprojection entfernt GPS + Gerätedaten

---

## Apps

### `apps/web` – React PWA

React 18 + TypeScript + Vite + TailwindCSS. Läuft im Browser und ist als PWA installierbar.

Kernfeatures:
- **MapLibre-GL Karte** mit H3-Hexagon-Overlays, Score-Farbskala und Klick-Details
- **5-Schritt Report-Formular** (Behörde → Aktivität → Confidence → Beschreibung → Bestätigen)
- **P2P-Sync via GUN.js** – teilt nur anonymisierte `CellAggregate`-Objekte, nie Rohdaten
- **Viewport-Filterung** – GUN abonniert nur Zellen im sichtbaren Kartenausschnitt
- **IndexedDB-Store** mit Spam-Filter, Deduplizierung und automatischem Pruning
- **Rechte-Screen** – alle 5 Rechtsthemen offline verfügbar, vollständig aus `core-i18n`
- **Settings** – Sprache (6), Meldungs-Auflösung, Evidence-Persistenz
- **RTL-Support** – `dir="rtl"` bei AR/FA automatisch gesetzt

### `apps/mobile` – React Native / Expo (Android + iOS)

Expo Bare Workflow für Android und iOS. Teilt alle `core-*` Pakete mit der Web-App.

Kernfeatures:
- **SQLite via expo-sqlite** – ersetzt IndexedDB, nativ und performant
- **Kamera + Audio** via expo-camera / expo-av mit nativer Permission-Verwaltung
- **EXIF-Strip nativ** via `expo-image-manipulator` Re-Encoding (HEIC → JPEG auf iOS)
- **Lokale Push-Notifications** – kein FCM/APNs-Server, nur geräteseitig ausgelöst
- **Viewport-basierter P2P-Sync** mit automatischer Reconnect-Logik
- **iOS Privacy Manifest** (`PrivacyInfo.xcprivacy`) – Pflichtdatei seit iOS 17
- **RTL** via `I18nManager.forceRTL()` + automatischer Neustart bei Locale-Wechsel
- **Locale-Erkennung** via `expo-localization` (kein `navigator.languages`)

App Store Submission Checklist: `apps/mobile/APPSTORE_CHECKLIST.md`

### `apps/kiosk` – InfoTerminal PWA

Eigenständige Vite-App für den öffentlichen Kiosk-Betrieb. PWA mit `display: fullscreen`.

Kernfeatures:
- **JSON-Profil-System** – Terminal-Verhalten komplett über eine JSON-Datei konfigurierbar
- **3 Lade-Strategien**: eingebettetes `window.__PE_KIOSK_PROFILE__` → URL-Parameter → Fallback
- **Inaktivitäts-Timer** mit konfigurierbarem Countdown-Overlay (10s Vorwarnung)
- **Nur erlaubte Tabs** – pro Profil konfigurierbar: `map`, `rights`, `report`, `emergency`
- **Notfallkontakte-Screen** mit Tel-Links, profil-definiert
- **Branding** – Organisationsname, Accent-Color, Logo-URL pro Profil

Deployment-Anleitung (Chrome, Scalefusion, AirDroid, iOS): `apps/kiosk/DEPLOYMENT.md`

Mitgelieferte Beispielprofile (`apps/kiosk/src/profiles/`):
- `beratungsstelle-berlin.json` – Beratungsstelle, kein Melden, 2 min Timeout
- `public-terminal-hamburg.json` – Öffentliches Terminal, Melden erlaubt
- `minimal.json` – Nur Rechte + Notfall, 60s Timeout

---

## Threat Model

### Angreifer-Modell

| Angreifer | Ziel | Gegenmaßnahme |
|---|---|---|
| Staatliche Stellen | Meldende Personen identifizieren | Ephemere Peer-IDs, keine Accounts, kein Server |
| Data Brokers | Bewegungsprofile erstellen | Nur H3-Zellen (~5 km²), kein Raw-GPS je übertragen |
| Trolle / Sybil-Angriffe | Falschmeldungen fluten | Rate-Limit + Abuse-Scoring + Confidence-Decay |
| App-Store-Sperren | App unzugänglich machen | PWA unabhängig von Stores installierbar |
| Netzwerk-Überwachung | Kommunikation beobachten | P2P TLS, Tor-kompatibel (kein WebRTC-Zwang) |
| Manipulierte P2P-Daten | Falsche Aggregate einschleusen | `validateReport()` Type Guard + Timestamp-Plausibilität |

### Nicht-Ziele (bewusste Entscheidungen)

- Keine Ende-zu-Ende-verschlüsselten privaten Nachrichten zwischen Nutzern
- Keine Anonymität gegenüber dem eigenen Gerät (nur gegenüber Dritten und Servern)

---

## Rechtliche Hinweise

PeoplesEyes ist ein Informations- und Dokumentationswerkzeug.

- Falschmeldungen können nach §§ 185 ff. StGB strafbar sein
- Das Filmen von Behördeneinsätzen ist im öffentlichen Raum grundsätzlich erlaubt (Art. 5 GG)
- DSGVO-Compliance: Keine personenbezogenen Daten werden verarbeitet oder an Server übertragen
- Für rechtliche Beratung und Prüfung: [GFF](https://freiheitsrechte.org) · [RAV](https://rav.de) · [Digitalcourage](https://digitalcourage.de)

---

## Vor dem ersten öffentlichen Release

- [ ] Juristischer Kurzcheck der Rechtstexte (GFF / RAV)
- [ ] Security Audit: `core-crypto` + P2P-Protokoll durch externe Person
- [ ] Selbst gehosteter GUN-Relay-Server statt öffentlicher Bootstrap-Relays
- [ ] Privacy Policy Seite (für App Store Pflicht)
- [ ] Closed Beta mit vertrauenswürdigen NGOs und Beratungsstellen
- [ ] Crash-Monitoring ohne personenbezogene Daten (z.B. Sentry anonymous mode)

---

## Beitragen

Beiträge willkommen – besonders:

- **Rechtstexte** – juristische Prüfung und Ergänzung für weitere EU-Länder (AT, CH, FR, NL …)
- **Security Review** – P2P-Protokoll, Crypto-Code, Threat-Model-Erweiterung
- **Accessibility** – Screen Reader, Kontrast, Tastaturnavigation
- **Weitere Sprachen** – über `SupportedLocale` in `core-model/src/settings.ts` erweiterbar
- **Kiosk-Profile** – neue Beispielprofile für verschiedene Beratungsstellen und Orte

Bitte keine Echtkoordinaten, Personendaten oder Behörden-Interna in Issues oder PRs.

---

## Roadmap

| Phase | Inhalt | Status |
|---|---|---|
| **1** | Monorepo · core-model · core-logic · core-i18n · core-crypto | ✅ Abgeschlossen |
| **2** | Web-App: MapLibre-Karte · Report-Formular · P2P-Sync (GUN.js) · Settings · Rights | ✅ Abgeschlossen |
| **3** | Android: React Native / Expo · Kamera · EXIF-Strip nativ · SQLite · Notifications | ✅ Abgeschlossen |
| **4** | 6 Locales (DE/EN/TR/UK/AR/FA) · RTL-Support · Abuse-Reporting · P2P-Viewport-Filter | ✅ Abgeschlossen |
| **5** | Kiosk-Plugin · JSON-Profile · Inaktivitäts-Timer · MDM-Deployment-Doku | ✅ Abgeschlossen |
| **6** | iOS-Target · RTL (AR/FA) · Privacy Manifest · HEIC · PWA-Fallback · App Store Checklist | ✅ Abgeschlossen |

---

## Lizenz

MIT License – siehe [LICENSE](./LICENSE)

---

*"Wer aufhört zu schauen, hört auf zu wissen."*
