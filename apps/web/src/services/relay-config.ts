/// <reference types="vite/client" />

/**
 * Relay-Konfiguration und priorisierte Fallback-Kette.
 *
 * Priorität:
 * 1. Headscale-Relay
 * 2. Benutzerdefinierte Relays
 * 3. Öffentliche Bootstrap-Relays
 */

const PUBLIC_BOOTSTRAP_RELAYS = [
  'https://gun-manhattan.herokuapp.com/gun',
  'https://peer.wallie.io/gun',
] as const;

const PROBE_TIMEOUT_MS = 3000;

export interface RelayProbeResult {
  url: string;
  reachable: boolean;
  latencyMs: number;
}

async function probeRelay(relayUrl: string): Promise<RelayProbeResult> {
  const start = Date.now();
  const healthUrl = relayUrl
    .replace(/\/gun$/, '/health')
    .replace(/^ws:\/\//, 'http://')
    .replace(/^wss:\/\//, 'https://');

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), PROBE_TIMEOUT_MS);

    const response = await fetch(healthUrl, {
      method: 'HEAD',
      signal: controller.signal,
      credentials: 'omit',
      mode: 'no-cors',
    });

    clearTimeout(timeoutId);
    return {
      url: relayUrl,
      reachable: response.type === 'opaque' || response.ok,
      latencyMs: Date.now() - start,
    };
  } catch {
    return { url: relayUrl, reachable: false, latencyMs: PROBE_TIMEOUT_MS };
  }
}

function readRelayEnv(): {
  headscaleRelay: string | null;
  customRelays: string[];
  proxyUrl: string | null;
} {
  const headscaleRelay = import.meta.env['VITE_GUN_HEADSCALE_RELAY'] as string | undefined;
  const customRelaysRaw = import.meta.env['VITE_GUN_RELAYS'] as string | undefined;
  const proxyUrl = import.meta.env['VITE_GUN_PROXY'] as string | undefined;

  return {
    headscaleRelay: headscaleRelay?.trim() || null,
    customRelays: customRelaysRaw
      ? customRelaysRaw.split(',').map(value => value.trim()).filter(Boolean)
      : [],
    proxyUrl: proxyUrl?.trim() || null,
  };
}

export interface ResolvedRelayConfig {
  peers: string[];
  proxyUrl: string | null;
  probeResults: RelayProbeResult[];
}

export async function resolveRelayConfig(): Promise<ResolvedRelayConfig> {
  const env = readRelayEnv();
  const candidates: Array<{ url: string; priority: number }> = [];

  if (env.headscaleRelay) {
    candidates.push({ url: env.headscaleRelay, priority: 1 });
  }

  for (const url of env.customRelays) {
    candidates.push({ url, priority: 2 });
  }

  let probeResults: RelayProbeResult[] = [];

  if (candidates.length > 0) {
    probeResults = await Promise.all(candidates.map(candidate => probeRelay(candidate.url)));

    const reachable = probeResults
      .filter(result => result.reachable)
      .map(result => {
        const candidate = candidates.find(entry => entry.url === result.url);
        return { ...result, priority: candidate?.priority ?? Number.MAX_SAFE_INTEGER };
      })
      .sort((a, b) => a.priority - b.priority || a.latencyMs - b.latencyMs);

    if (reachable.length > 0) {
      return {
        peers: [...reachable.map(result => result.url), ...PUBLIC_BOOTSTRAP_RELAYS],
        proxyUrl: env.proxyUrl,
        probeResults,
      };
    }
  }

  return {
    peers: [...PUBLIC_BOOTSTRAP_RELAYS],
    proxyUrl: env.proxyUrl,
    probeResults,
  };
}
