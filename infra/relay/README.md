# PeoplesEyes GUN-Relay – Setup

Eigenständiger GUN.js-Relay für PeoplesEyes. Ersetzt die öffentlichen
Bootstrap-Relays durch einen selbst kontrollierten Server.

---

## Voraussetzungen

- Server mit öffentlicher IP (VPS, Hetzner, Netcup, …)
- Docker + Docker Compose
- Domain die auf den Server zeigt (z.B. `relay.peopleseyes.org`)

---

## Setup

### 1. Repository klonen / Verzeichnis kopieren

```bash
scp -r infra/relay/ user@server:~/peopleseyes-relay
cd ~/peopleseyes-relay
```

### 2. Domain in Nginx-Konfiguration eintragen

```bash
sed -i 's/YOUR_DOMAIN/relay.deine-domain.org/g' nginx/nginx.conf
```

### 3. TLS-Zertifikat mit certbot holen

```bash
# certbot installieren (Ubuntu/Debian)
apt install certbot

# Zertifikat holen (HTTP-Challenge)
certbot certonly --webroot -w ./webroot -d relay.deine-domain.org

# Zertifikate ins certs/-Verzeichnis kopieren
cp /etc/letsencrypt/live/relay.deine-domain.org/fullchain.pem certs/
cp /etc/letsencrypt/live/relay.deine-domain.org/privkey.pem certs/

# Berechtigungen setzen (Nginx läuft als root im Container)
chmod 644 certs/fullchain.pem certs/privkey.pem
```

### 4. Relay starten

```bash
docker compose up -d

# Logs prüfen
docker compose logs -f
```

### 5. GUN-Relay-URL in PeoplesEyes eintragen

In `apps/web/src/services/p2p-sync.ts` und `apps/mobile/src/services/mobile-p2p-sync.ts`:

```typescript
const BOOTSTRAP_RELAYS = [
  'https://relay.deine-domain.org/gun',  // ← eigener Relay (Priorität)
  'https://gun-manhattan.herokuapp.com/gun', // Fallback
];
```

---

## Zertifikat erneuern

certbot erneuert automatisch. Nginx muss danach neu geladen werden:

```bash
# Cronjob einrichten
echo "0 0 1 * * cp /etc/letsencrypt/live/relay.deine-domain.org/*.pem ~/peopleseyes-relay/certs/ && docker compose -f ~/peopleseyes-relay/docker-compose.yml exec nginx nginx -s reload" | crontab -
```

---

## Health-Check

```bash
curl https://relay.deine-domain.org/health
# → ok

# WebSocket testen
curl -i -N -H "Connection: Upgrade" -H "Upgrade: websocket" \
  -H "Sec-WebSocket-Key: test" -H "Sec-WebSocket-Version: 13" \
  https://relay.deine-domain.org/gun
```

---

## Datenschutz

- Nginx schreibt **keine Access-Logs** (`access_log off`)
- Client-IP wird **nicht** an GUN weitergeleitet (Header werden entfernt)
- GUN speichert keine Nutzer-Identitäten (radisk und localStorage deaktiviert)
- Der Relay sieht nur anonymisierte CellAggregate-Objekte, keine Rohdaten
