# PeoplesEyes InfoTerminal – Deployment-Anleitung

Dieses Dokument beschreibt, wie das PeoplesEyes InfoTerminal auf
öffentlichen Geräten (Tablets, Mini-PCs, Touchscreens) im Kiosk-Modus
betrieben werden kann.

---

## Option A: Browser-Kiosk-Modus (empfohlen für Desktops/Raspberry Pi)

### Chrome / Chromium

```bash
chromium-browser \
  --kiosk \
  --no-first-run \
  --disable-infobars \
  --disable-session-crashed-bubble \
  --disable-restore-session-state \
  --noerrdialogs \
  --incognito \
  "https://kiosk.peopleseyes.org?profile=beratungsstelle-berlin"
```

Flags erklärt:
- `--kiosk` – Vollbildmodus, kein Browser-Chrome, kein Escape
- `--incognito` – Kein persistenter Verlauf zwischen Sitzungen
- `--noerrdialogs` – Keine Fehler-Popups die den Screen blockieren

### Autostart auf Raspberry Pi (systemd)

```ini
# /etc/systemd/system/peopleseyes-kiosk.service
[Unit]
Description=PeoplesEyes InfoTerminal
After=network-online.target graphical.target

[Service]
User=pi
Environment=DISPLAY=:0
ExecStartPre=/bin/sleep 5
ExecStart=/usr/bin/chromium-browser \
  --kiosk \
  --no-first-run \
  --disable-infobars \
  --noerrdialogs \
  --incognito \
  "https://kiosk.peopleseyes.org?profile=PROFIL-ID"
Restart=always
RestartSec=10

[Install]
WantedBy=graphical.target
```

```bash
sudo systemctl enable peopleseyes-kiosk
sudo systemctl start peopleseyes-kiosk
```

---

## Option B: Android Tablet via MDM (Scalefusion / AirDroid)

### Scalefusion

1. **App hinzufügen**: Im Scalefusion-Dashboard → Apps → Browser hinzufügen
2. **Kiosk-Profil erstellen**: Policies → Kiosk → Single-App-Kiosk
3. **URL setzen**: `https://kiosk.peopleseyes.org?profile=PROFIL-ID`
4. **Einstellungen**:
   - `Disable Hardware Buttons`: ✅ (Verhindert Home/Back)
   - `Auto-Relaunch`: ✅ (bei App-Absturz neu starten)
   - `Screen Timeout`: deaktivieren oder auf 1h setzen

### AirDroid Business

1. Policy Center → Kiosk Mode → Single-App
2. Browser URL: `https://kiosk.peopleseyes.org?profile=PROFIL-ID`
3. Allow-Listed URLs: `https://kiosk.peopleseyes.org`, `https://tiles.openfreemap.org`

---

## Option C: iOS iPad via Apple Configurator (Guided Access)

1. **Einstellungen** → Bedienungshilfen → Geführter Zugriff → aktivieren
2. **App öffnen**: Safari → `https://kiosk.peopleseyes.org?profile=PROFIL-ID`
3. **Geführten Zugriff starten**: 3× Seitentaste drücken
4. Bereiche die gesperrt werden sollen einkreisen (Adressleiste etc.)
5. **Starten** antippen

Für dauerhaften Kiosk-Betrieb: Apple Configurator 2 + MDM-Profil mit
`com.apple.webbrowser` Payload empfohlen.

---

## Profil-Konfiguration

### URL-Parameter

| Parameter | Beschreibung | Beispiel |
|---|---|---|
| `?profile=<id>` | Lädt `/profiles/<id>.json` vom Server | `?profile=berlin` |
| `?profile-url=<url>` | Lädt externes Profil-JSON (CORS nötig) | `?profile-url=https://…/mein-profil.json` |

### Profil direkt einbetten (Server-Side)

Für maximale Zuverlässigkeit (kein Netzwerk-Fetch nötig) das Profil
direkt in die HTML-Datei einbetten:

```html
<script>
window.__PE_KIOSK_PROFILE__ = {
  "id": "mein-terminal",
  "name": "Mein InfoTerminal",
  "schemaVersion": "1",
  "tabs": ["map", "rights", "emergency"],
  "locale": "de",
  "mapCenter": { "lat": 52.52, "lng": 13.40, "zoom": 11 },
  "inactivityTimeoutSec": 120,
  "resetBehavior": "map",
  "allowReporting": false,
  "emergencyContacts": [
    { "label": "Meine Organisation", "phone": "030-…", "url": "https://…" }
  ],
  "branding": {
    "organizationName": "Meine Organisation e.V.",
    "accentColor": "#22c55e"
  }
};
</script>
```

---

## Netzwerk-Anforderungen

| Domain | Zweck | Offline möglich? |
|---|---|---|
| `kiosk.peopleseyes.org` | App-Shell | ✅ nach erstem Besuch (PWA) |
| `tiles.openfreemap.org` | Kartenkacheln | ✅ gecacht (bis 14 Tage) |
| GUN-Relays | P2P-Sync | ✅ Offline-Betrieb möglich |

Das Terminal funktioniert vollständig offline sobald die App einmal
geladen und gecacht wurde. Bei Netzwerkausfall werden nur keine neuen
P2P-Meldungen empfangen.

---

## Hardening-Empfehlungen

- **Dedizierter Browser-User** ohne sudo-Rechte (`adduser kiosk-user`)
- **Bildschirmschoner deaktivieren** (`xset s off && xset -dpms`)
- **Automatische Updates** für das OS aktivieren
- **Logs** auf `/var/log/peopleseyes-kiosk.log` umleiten
- **Watchdog** via systemd `Restart=always` + `RestartSec=10`
- **WLAN-Reconnect** sicherstellen (`NetworkManager` Autoconnect)
