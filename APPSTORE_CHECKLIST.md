# PeoplesEyes – App Store Submission Checklist

Vollständige Checkliste für den ersten Release auf Google Play und Apple App Store.

---

## Google Play (Android)

### Voraussetzungen
- [ ] Entwicklerkonto registriert (einmalig 25 USD)
- [ ] App Signing Keystore erstellt und sicher verwahrt
- [ ] `expo build:android` oder `eas build --platform android` ausgeführt

### Build erstellen
```bash
# EAS Build (empfohlen)
npm install -g eas-cli
eas login
eas build --platform android --profile production
```

### Play Console – App einrichten
- [ ] Neue App erstellen → App-Name: "PeoplesEyes"
- [ ] Standardsprache: Deutsch
- [ ] App-Kategorie: Soziales / Utilities
- [ ] Content-Rating-Fragebogen ausfüllen:
  - Gewalt: Nein
  - Sexuelle Inhalte: Nein
  - Kontroverse Themen: **Ja – politisch/gesellschaftlich sensitiv**
  - Zielgruppe: 16+ (empfohlen wegen politischem Kontext)

### Datensicherheit (Play Console → Datensicherheit)
- [ ] Daten erfasst: **Nein** (keine personenbezogenen Daten)
- [ ] Daten geteilt: Teilweise – anonymisierte Standort-Zellen via P2P
- [ ] Datenverschlüsselung: Ja (TLS + ECDSA)
- [ ] Nutzer kann Datenlöschung beantragen: Ja (lokale Daten, jederzeit löschbar)

### Store-Listing
- [ ] Kurzbeschreibung (80 Zeichen): "Anonyme Meldung von Behördenaktivitäten. Privat, dezentral, open source."
- [ ] Vollständige Beschreibung (4000 Zeichen): siehe `STORE_DESCRIPTION.md`
- [ ] Screenshots: Handy (mind. 2), Tablet optional
- [ ] Feature Graphic: 1024×500 px
- [ ] App-Icon: 512×512 px PNG (kein Alpha)

### Technisch
- [ ] Target SDK: 34+ (Pflicht ab Nov 2024)
- [ ] 64-bit Support: ✅ (React Native standard)
- [ ] Permissions Review: Kamera, Mikrofon, Standort – alle begründet

---

## Apple App Store (iOS)

### Voraussetzungen
- [ ] Apple Developer Account (99 USD/Jahr)
- [ ] Xcode 15+ installiert (macOS Sonoma empfohlen)
- [ ] App Identifier in Apple Developer Portal erstellt
- [ ] Provisioning Profile + Code Signing Certificate erstellt

### Build erstellen
```bash
eas build --platform ios --profile production
# Oder lokal:
expo run:ios --configuration Release
```

### App Store Connect – App einrichten
- [ ] Neue App erstellen → Bundle ID: `org.peopleseyes.app`
- [ ] Primäre Sprache: Deutsch
- [ ] Kategorie: Soziales / Dienstprogramme
- [ ] Altersfreigabe: 4+ (keine bedenklichen Inhalte)

### Privacy Nutrition Label (App Store Connect → App-Datenschutz)
- [ ] **Daten, die nicht mit dir verknüpft sind**: Standort (grob, für Kartenfunktion)
- [ ] **Nicht erfasste Daten**: alle anderen Kategorien
- [ ] Kein Tracking: ✅

### Export Compliance
- [ ] Verwendet die App Verschlüsselung? **Ja**
- [ ] Exempt from EAR? **Ja** (EAR99 – Standard-HTTPS/TLS, keine Sondernutzung)
- [ ] `ITSAppUsesNonExemptEncryption = true` in Info.plist ✅ (bereits gesetzt)

### Review Notes für App-Prüfer
```
PeoplesEyes ist ein zivilgesellschaftliches Dokumentationswerkzeug.
Die App ermöglicht die anonyme Meldung von Behördenaktivitäten 
(Polizeikontrollen, Frontex-Einsätze etc.) in EU/Deutschland.

Alle Daten verbleiben lokal auf dem Gerät. Es gibt:
- Keine Server-seitige Datenspeicherung
- Keine Nutzerkonten oder Authentifizierung
- Keine Analytics oder externe Tracking-Dienste
- P2P-Sync überträgt nur aggregierte, anonymisierte Zell-Daten

Demo-Zugangsdaten: nicht erforderlich (keine Anmeldung)
Testumgebung: Standard-iOS-Simulator ausreichend
```

### Technisch
- [ ] Minimum iOS Version: 16.0 (Web Push, moderne APIs)
- [ ] Privacy Manifest (PrivacyInfo.xcprivacy) ✅ vorhanden
- [ ] Alle NSUsageDescription Strings gesetzt ✅
- [ ] ATS (App Transport Security): HTTPS überall ✅
- [ ] Background Modes: Keine (kein Background-Recording)

---

## Gemeinsam (beide Stores)

### Vor dem ersten Release
- [ ] Security Audit: `core-crypto` Funktionen von zweiter Person geprüft
- [ ] Privacy Policy URL: muss gehostet sein (z.B. GitHub Pages)
- [ ] Terms of Service (optional, empfohlen)
- [ ] Support-E-Mail-Adresse hinterlegen
- [ ] Crash-Reporting OHNE personenbezogene Daten (z.B. Sentry mit anonymem Modus)

### Versionierung
- Semantic Versioning: `MAJOR.MINOR.PATCH`
- Android: `versionCode` inkrementieren bei jedem Upload
- iOS: `buildNumber` inkrementieren bei jedem Upload
- Initial Release: v0.1.0 (Beta) → intern testen bevor Public Release

### Empfohlene Release-Strategie
1. **Internal Testing**: Nur Entwickler (bis zu 100 Tester bei Google, 25 bei Apple)
2. **Closed Beta**: Vertrauenswürdige Organisationen und NGOs (Feedback sammeln)
3. **Open Beta**: Breitere Öffentlichkeit, Bugs beheben
4. **Public Release**: Erst nach juristischem Check durch GFF/RAV

---

## Store-Beschreibung (Kurzversion)

```
PeoplesEyes – Gemeinsam beobachten. Sicher dokumentieren.

PeoplesEyes ist ein dezentrales, datenschutzfreundliches Werkzeug zur
anonymen Dokumentation von Behördenaktivitäten in EU/Deutschland.

✓ Anonym melden: Sichtungen von Bundespolizei, Landespolizei,
  Ausländerbehörde und Frontex auf einer gemeinsamen Karte
✓ Deine Rechte: Offline-Rechtstexte für Kontrollen, Durchsuchungen,
  Festnahmen und mehr – in 6 Sprachen
✓ Beweissicherung: Fotos, Videos und Audio aufnehmen – GPS-Daten
  werden automatisch entfernt
✓ Privatsphäre: Kein Account, kein Server, kein Tracking.
  Alle Daten bleiben auf deinem Gerät.

Open Source. Kostenlos. Für alle.
```
