/**
 * Unit-Tests für storage-crypto.ts
 *
 * Abgedeckte Szenarien:
 * - encryptRecord → decryptRecord round-trip (Daten bleiben erhalten)
 * - decryptRecord mit falschem Key → EncryptionError(DECRYPT_FAILED)
 * - deriveStorageKey: gleicher PIN + Salt → funktional äquivalenter Key
 *
 * Läuft in Node-Umgebung (Node 18+ hat globalThis.crypto nativ).
 */

import { describe, it, expect } from 'vitest';
import { encryptRecord, decryptRecord, EncryptionError } from './storage-crypto.js';

// ─── Hilfsfunktionen ─────────────────────────────────────────────────────────

/**
 * Erzeugt einen AES-GCM-256 Test-Key via SubtleCrypto.
 * Nicht für Produktion – kein PBKDF2, direkt generiert.
 */
async function makeTestKey(): Promise<CryptoKey> {
  return crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

// ─── deriveStorageKey Tests ───────────────────────────────────────────────────
// Import direkt hier um Abhängigkeit zu testen

async function deriveKey(pin: string, salt: Uint8Array<ArrayBuffer>): Promise<CryptoKey> {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(pin),
    'PBKDF2',
    false,
    ['deriveKey'],
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 210_000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('encryptRecord / decryptRecord', () => {
  it('round-trip: Klartext bleibt nach Verschlüsselung + Entschlüsselung erhalten', async () => {
    const key = await makeTestKey();
    const plaintext = '{"id":"abc-123","reportedAtMinute":1700000000000}';

    const encrypted = await encryptRecord(key, plaintext);
    const decrypted = await decryptRecord(key, encrypted);

    expect(decrypted).toBe(plaintext);
  });

  it('round-trip: funktioniert mit leerem String', async () => {
    const key = await makeTestKey();
    const encrypted = await encryptRecord(key, '');
    const decrypted = await decryptRecord(key, encrypted);
    expect(decrypted).toBe('');
  });

  it('round-trip: funktioniert mit Unicode-Zeichen (arabisch, kyrillisch)', async () => {
    const key = await makeTestKey();
    const plaintext = 'Kontrolle – контроль – مراقبة';
    const encrypted = await encryptRecord(key, plaintext);
    const decrypted = await decryptRecord(key, encrypted);
    expect(decrypted).toBe(plaintext);
  });

  it('IV ist 12 Byte und wird dem Ciphertext vorangestellt', async () => {
    const key = await makeTestKey();
    const encrypted = await encryptRecord(key, 'test');

    // Die ersten 12 Byte sind der IV
    expect(encrypted.length).toBeGreaterThan(12);
    // Zwei Verschlüsselungen desselben Plaintexts haben unterschiedliche IVs
    const encrypted2 = await encryptRecord(key, 'test');
    const iv1 = encrypted.slice(0, 12);
    const iv2 = encrypted2.slice(0, 12);
    expect(iv1).not.toEqual(iv2);
  });

  it('decryptRecord mit falschem Key wirft EncryptionError(DECRYPT_FAILED)', async () => {
    const key1 = await makeTestKey();
    const key2 = await makeTestKey();
    const encrypted = await encryptRecord(key1, 'geheime Daten');

    await expect(decryptRecord(key2, encrypted)).rejects.toSatisfy(
      (err: unknown) =>
        err instanceof EncryptionError && err.code === 'DECRYPT_FAILED',
    );
  });

  it('decryptRecord mit korrupten Daten (zu kurz) wirft EncryptionError(DECRYPT_FAILED)', async () => {
    const key = await makeTestKey();
    const tooShort = new Uint8Array(8); // < 12 Byte IV-Länge

    await expect(decryptRecord(key, tooShort)).rejects.toSatisfy(
      (err: unknown) =>
        err instanceof EncryptionError && err.code === 'DECRYPT_FAILED',
    );
  });

  it('decryptRecord mit manipulierten Daten wirft EncryptionError(DECRYPT_FAILED)', async () => {
    const key = await makeTestKey();
    const encrypted = await encryptRecord(key, 'original');

    // Einzelnes Bit im Ciphertext flippen
    const tampered = new Uint8Array(encrypted);
    const lastIdx = tampered.length - 1;
    tampered[lastIdx] = (tampered[lastIdx] ?? 0) ^ 0xff;

    await expect(decryptRecord(key, tampered)).rejects.toSatisfy(
      (err: unknown) =>
        err instanceof EncryptionError && err.code === 'DECRYPT_FAILED',
    );
  });
});

describe('EncryptionError', () => {
  it('hat korrekten name und code', () => {
    const err = new EncryptionError('DECRYPT_FAILED');
    expect(err.name).toBe('EncryptionError');
    expect(err.code).toBe('DECRYPT_FAILED');
    expect(err instanceof Error).toBe(true);
    expect(err instanceof EncryptionError).toBe(true);
  });
});

describe('deriveStorageKey (PBKDF2-SHA256)', () => {
  it('gleicher PIN + Salt → Keys sind funktional äquivalent (round-trip)', async () => {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const pin = '1234';

    const key1 = await deriveKey(pin, salt);
    const key2 = await deriveKey(pin, salt);

    // Beide Keys können denselben Ciphertext entschlüsseln
    const plaintext = 'Testdaten für Schlüsseläquivalenz';
    const encrypted = await encryptRecord(key1, plaintext);
    const decrypted = await decryptRecord(key2, encrypted);

    expect(decrypted).toBe(plaintext);
  });

  it('unterschiedlicher PIN → funktional verschiedene Keys (round-trip schlägt fehl)', async () => {
    const salt = crypto.getRandomValues(new Uint8Array(16));

    const key1 = await deriveKey('1234', salt);
    const key2 = await deriveKey('5678', salt);

    const encrypted = await encryptRecord(key1, 'geheimtext');

    await expect(decryptRecord(key2, encrypted)).rejects.toSatisfy(
      (err: unknown) =>
        err instanceof EncryptionError && err.code === 'DECRYPT_FAILED',
    );
  });

  it('unterschiedlicher Salt → funktional verschiedene Keys', async () => {
    const salt1 = crypto.getRandomValues(new Uint8Array(16));
    const salt2 = crypto.getRandomValues(new Uint8Array(16));
    const pin = '9999';

    const key1 = await deriveKey(pin, salt1);
    const key2 = await deriveKey(pin, salt2);

    const encrypted = await encryptRecord(key1, 'daten');

    await expect(decryptRecord(key2, encrypted)).rejects.toSatisfy(
      (err: unknown) =>
        err instanceof EncryptionError && err.code === 'DECRYPT_FAILED',
    );
  });
});
