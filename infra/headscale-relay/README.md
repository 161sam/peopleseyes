# PeoplesEyes – Headscale-Relay (Privater GUN-Relay via WireGuard-Mesh)

Privater GUN-Relay-Modus für technisch versierte Nutzer und NGO-Betreiber.
Headscale ist ein selbst gehosteter Tailscale-Kontrollserver, der ein verschlüsseltes WireGuard-Mesh-Netzwerk aufspannt.

## Warum Headscale statt öffentlichem Relay?

| Eigenschaft | Öffentlicher Relay | Headscale-Relay |
|---|---|---|
| Sichtbarkeit im Netz | Öffentliche IP, blockierbar | WireGuard-Traffic zu unauffälligem VPS |
| Client-IP am Relay | Echte IP sichtbar | Nur Tailscale-IP (100.64.x.x) |
| Zugang | Jeder | Nur Peers mit gültigem Authkey |
| Onboarding-Aufwand | Keine Installation | tailscaled + Authkey auf Gerät |
| Fallback | – | Öffentliche Bootstrap-Relays |

## Voraussetzungen

- VPS mit öffentlicher IP
- Docker + Docker Compose
- Domain für Headscale
- TLS-Zertifikat

## Server-Setup

### 1. Repository klonen

```bash
git clone … && cd infra/headscale-relay/
```

### 2. Konfiguration anpassen

```bash
sed -i 's/hs.YOUR_DOMAIN/hs.deine-domain.org/g' headscale/config.yaml
echo "TAILSCALE_IP=100.64.0.1" > .env
```

### 3. Dienste starten

```bash
docker compose up -d
docker compose logs -f headscale
```

### 4. Namespace und Authkey erstellen

```bash
docker compose exec headscale headscale namespaces create peopleseyes
docker compose exec headscale headscale preauthkeys create \
  --namespace peopleseyes \
  --reusable \
  --expiration 30d
```

### 5. Host selbst als Node registrieren

```bash
apt install -y tailscale
tailscale up \
  --login-server=https://hs.deine-domain.org \
  --authkey=<AUTHKEY> \
  --hostname=gun-relay-host
```

### 6. Relay neu starten

```bash
docker compose restart gun-relay
docker compose exec gun-relay wget -qO- http://100.64.0.1:8765/gun
```

## App-Konfiguration

```bash
VITE_GUN_RELAYS=ws://100.64.0.1:8765/gun,https://relay.deine-domain.org/gun
```

Die App priorisiert den Headscale-Relay und fällt auf öffentliche Relays zurück.
