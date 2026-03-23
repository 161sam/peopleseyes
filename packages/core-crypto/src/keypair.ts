/**
 * Ephemere Keypairs für P2P-Nachrichtensignierung.
 *
 * Keypairs werden bei jedem App-Start neu generiert.
 * Sie dienen der Nachrichtenintegrität, NICHT der Nutzer-Identifikation.
 *
 * Verwendete Algorithmen:
 * - Signierung: ECDSA P-256 (Web Crypto Standard)
 * - Hashing: SHA-256
 *
 * Alle Operationen nutzen die native Web Crypto API (SubtleCrypto).
 * Kein externer Krypto-Code – auditierbar und sandboxed.
 */

export interface EphemeralKeypair {
  readonly publicKey: CryptoKey;
  readonly privateKey: CryptoKey;
  /** Öffentlicher Schlüssel als Base64-String für P2P-Transport */
  readonly publicKeyBase64: string;
}

const ECDSA_PARAMS: EcKeyGenParams = {
  name: 'ECDSA',
  namedCurve: 'P-256',
};

const SIGN_PARAMS: EcdsaParams = {
  name: 'ECDSA',
  hash: { name: 'SHA-256' },
};

/**
 * Erzeugt ein neues ephemeres ECDSA-Keypair.
 * Wird beim App-Start einmalig aufgerufen.
 */
export async function generateEphemeralKeypair(): Promise<EphemeralKeypair> {
  const keyPair = await crypto.subtle.generateKey(ECDSA_PARAMS, true, ['sign', 'verify']);

  const publicKeyBuffer = await crypto.subtle.exportKey('spki', keyPair.publicKey);
  const publicKeyBase64 = bufferToBase64(publicKeyBuffer);

  return {
    publicKey: keyPair.publicKey,
    privateKey: keyPair.privateKey,
    publicKeyBase64,
  };
}

/**
 * Signiert eine Nachricht mit dem privaten Schlüssel.
 * Gibt die Signatur als Base64-String zurück.
 */
export async function signMessage(
  message: string,
  privateKey: CryptoKey,
): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const signature = await crypto.subtle.sign(SIGN_PARAMS, privateKey, data);
  return bufferToBase64(signature);
}

/**
 * Verifiziert eine Nachrichtensignatur.
 * Gibt true zurück wenn die Signatur gültig ist.
 */
export async function verifySignature(
  message: string,
  signatureBase64: string,
  publicKeyBase64: string,
): Promise<boolean> {
  try {
    const publicKey = await importPublicKey(publicKeyBase64);
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const signature = base64ToBuffer(signatureBase64);

    return await crypto.subtle.verify(SIGN_PARAMS, publicKey, signature, data);
  } catch {
    return false;
  }
}

/**
 * Importiert einen öffentlichen Schlüssel aus Base64.
 */
export async function importPublicKey(base64: string): Promise<CryptoKey> {
  const buffer = base64ToBuffer(base64);
  return crypto.subtle.importKey('spki', buffer, ECDSA_PARAMS, true, ['verify']);
}

/**
 * Erzeugt einen SHA-256 Hash eines Strings.
 * Verwendet für Nachrichten-IDs und Deduplizierung.
 */
export async function sha256(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return bufferToBase64(hashBuffer);
}

// ─── Hilfsfunktionen ─────────────────────────────────────────────────────────

function bufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

function base64ToBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}
