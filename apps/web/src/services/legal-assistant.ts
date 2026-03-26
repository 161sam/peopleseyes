/**
 * KI-Rechtshilfe — direkte Anthropic-API-Anfrage aus dem Browser.
 * Der API-Key wird verschlüsselt im OPFS-Store gespeichert (AES-GCM via StorageKeyContext).
 */

import { encryptRecord, decryptRecord } from '@peopleseyes/core-crypto';

export interface LegalAssistantMessage {
  readonly role: 'user' | 'assistant';
  readonly content: string;
}

export interface LegalAssistantConfig {
  apiKey: string;
  locale: string;
  activeRightsTopic?: string | undefined;
}

const SYSTEM_PROMPTS: Record<string, string> = {
  de: 'Du bist ein Rechtsinformations-Assistent für PeoplesEyes, ein Bürgerrechts-Tool für Deutschland/EU.\n\nDu gibst allgemeine Informationen zu Rechten bei Polizeikontakten, Kontrollen und Behördeneinsätzen.\nDu bist KEIN Rechtsanwalt und gibst KEINE Rechtsberatung.\nAntworte immer kurz (max. 3 Sätze), praktisch und auf Deutsch.\nVerweise bei komplexen Fragen auf GFF, RAV oder einen Anwalt.\nGib niemals Ratschläge die zu Konfrontationen führen könnten.',
  en: 'You are a legal information assistant for PeoplesEyes, a civil rights tool for Germany/EU.\n\nYou provide general information about rights during police contacts, checks, and authority operations.\nYou are NOT a lawyer and do NOT provide legal advice.\nAlways answer briefly (max. 3 sentences), practically, and in English.\nFor complex questions, refer to GFF, RAV, or a lawyer.\nNever give advice that could lead to confrontations.',
};

function buildSystemPrompt(locale: string, activeRightsTopic?: string): string {
  const base = SYSTEM_PROMPTS[locale] ?? SYSTEM_PROMPTS['en'];
  const context = activeRightsTopic
    ? `\n\nKontext: Nutzer liest gerade über: ${activeRightsTopic}`
    : '';
  return base + context;
}

/**
 * Sendet eine Anfrage an die Anthropic API direkt aus dem Browser.
 * Throws 'API_KEY_INVALID' | 'RATE_LIMIT' | 'NETWORK_ERROR' on failure.
 */
export async function queryLegalAssistant(
  messages: LegalAssistantMessage[],
  config: LegalAssistantConfig,
): Promise<string> {
  const systemPrompt = buildSystemPrompt(config.locale, config.activeRightsTopic);

  let response: Response;
  try {
    response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'anthropic-version': '2023-06-01',
        'x-api-key': config.apiKey,
        'content-type': 'application/json',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        system: systemPrompt,
        messages: messages.map(m => ({ role: m.role, content: m.content })),
      }),
    });
  } catch {
    throw new Error('NETWORK_ERROR');
  }

  if (response.status === 401) throw new Error('API_KEY_INVALID');
  if (response.status === 429) throw new Error('RATE_LIMIT');

  if (!response.ok) {
    throw new Error('NETWORK_ERROR');
  }

  const data = (await response.json()) as {
    content: Array<{ type: string; text: string }>;
  };

  const text = data.content.find(c => c.type === 'text')?.text ?? '';
  return text;
}

const LEGAL_API_KEY_OPFS_FILE = 'pe_legal_api_key';

/** Speichert den API-Key verschlüsselt im OPFS-Store. */
export async function saveLegalApiKey(apiKey: string, storageKey: CryptoKey): Promise<void> {
  const root = await navigator.storage.getDirectory();
  const encrypted = await encryptRecord(storageKey, apiKey);
  const fileHandle = await root.getFileHandle(LEGAL_API_KEY_OPFS_FILE, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(encrypted);
  await writable.close();
}

/** Liest und entschlüsselt den API-Key aus dem OPFS-Store. Gibt null zurück wenn nicht vorhanden. */
export async function loadLegalApiKey(storageKey: CryptoKey): Promise<string | null> {
  try {
    const root = await navigator.storage.getDirectory();
    const fileHandle = await root.getFileHandle(LEGAL_API_KEY_OPFS_FILE);
    const file = await fileHandle.getFile();
    const buffer = await file.arrayBuffer();
    return await decryptRecord(storageKey, new Uint8Array(buffer));
  } catch {
    return null;
  }
}

/** Löscht den API-Key aus dem OPFS-Store. */
export async function deleteLegalApiKey(): Promise<void> {
  try {
    const root = await navigator.storage.getDirectory();
    const fileHandle = await root.getFileHandle(LEGAL_API_KEY_OPFS_FILE);
    await fileHandle.remove();
  } catch {
    // Datei nicht vorhanden – kein Fehler
  }
}
