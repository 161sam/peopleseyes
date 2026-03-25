/**
 * AES-GCM Verschlüsselung für lokalen OPFS-Speicher.
 *
 * Sicherheitsentscheidungen:
 * - Ausschließlich SubtleCrypto (Web Crypto API) – kein externer Krypto-Code,
 *   vollständig auditierbar und in der Browser-Sandbox.
 * - IV (12 Byte) wird pro Verschlüsselungsvorgang frisch generiert (crypto.getRandomValues)
 *   und dem Ciphertext vorangestellt: [12B iv | ciphertext + 16B GCM-Tag].
 *   Der IV ist kein Geheimnis – er muss nur pro Verschlüsselung einmalig sein.
 * - AES-GCM-Tag (128 Bit) garantiert Authentizität und Integrität.
 *   Bei falschem Schlüssel schlägt die GCM-Tag-Prüfung fehl → EncryptionError.
 * - extractable: false am CryptoKey verhindert Schlüsselexport aus dem Browser-Speicher.
 */

const IV_LENGTH = 12; // Byte – AES-GCM empfohlene IV-Länge (NIST SP 800-38D)
const TAG_LENGTH = 128; // Bit – maximale GCM-Tag-Länge

/**
 * Typisierter Fehler für Krypto-Operationen.
 *
 * Ermöglicht gezieltes Fehlerhandling im Store (DECRYPT_FAILED → Datei überspringen)
 * ohne string-Vergleiche auf Error-Messages.
 */
export class EncryptionError extends Error {
  constructor(
    public readonly code: 'DECRYPT_FAILED' | 'ENCRYPT_FAILED',
    cause?: unknown,
  ) {
    super(
      code === 'DECRYPT_FAILED'
        ? 'Entschlüsselung fehlgeschlagen – falscher Schlüssel oder korrupte Daten'
        : 'Verschlüsselung fehlgeschlagen',
    );
    this.name = 'EncryptionError';
    if (cause instanceof Error) this.cause = cause;
  }
}

/**
 * Verschlüsselt einen String mit AES-GCM-256.
 *
 * Ausgabe-Format: [12 Byte IV | Ciphertext + 16 Byte GCM-Tag]
 *
 * @param key       AES-GCM-256 CryptoKey mit usage ['encrypt']
 * @param plaintext Klartext-String (z.B. JSON.stringify(report))
 * @returns         Byte-Array mit vorangestelltem IV (garantiert ArrayBuffer-backed)
 * @throws EncryptionError(ENCRYPT_FAILED) bei SubtleCrypto-Fehler
 */
export async function encryptRecord(key: CryptoKey, plaintext: string): Promise<Uint8Array<ArrayBuffer>> {
  try {
    const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
    const encoded = new TextEncoder().encode(plaintext);

    const ciphertext = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv, tagLength: TAG_LENGTH },
      key,
      encoded,
    );

    // [IV | Ciphertext+Tag] zusammenfügen – result ist stets ArrayBuffer-backed
    const result = new Uint8Array(IV_LENGTH + ciphertext.byteLength);
    result.set(iv, 0);
    result.set(new Uint8Array(ciphertext), IV_LENGTH);
    return result as Uint8Array<ArrayBuffer>;
  } catch (err) {
    throw new EncryptionError('ENCRYPT_FAILED', err);
  }
}

/**
 * Entschlüsselt ein mit encryptRecord() erzeugtes Byte-Array.
 *
 * Erwartet Format: [12 Byte IV | Ciphertext + 16 Byte GCM-Tag]
 *
 * Wirft EncryptionError(DECRYPT_FAILED) wenn:
 * - Der Schlüssel nicht passt (GCM-Tag-Verifikation schlägt fehl)
 * - Die Daten korrupt oder zu kurz sind
 *
 * @param key  AES-GCM-256 CryptoKey mit usage ['decrypt']
 * @param data Verschlüsseltes Byte-Array [IV | Ciphertext]
 * @returns    Entschlüsselter Klartext-String
 * @throws EncryptionError(DECRYPT_FAILED) bei falschem Schlüssel oder korrupten Daten
 */
export async function decryptRecord(key: CryptoKey, data: Uint8Array): Promise<string> {
  try {
    if (data.length <= IV_LENGTH) {
      throw new RangeError(
        `Daten zu kurz: ${data.length} Byte, mindestens ${IV_LENGTH + 1} erwartet`,
      );
    }

    // Kopiere in neue Uint8Array<ArrayBuffer> (vermeidet Shared/generic ArrayBufferLike)
    const copy = new Uint8Array(data);
    const iv = copy.subarray(0, IV_LENGTH);
    const ciphertext = copy.subarray(IV_LENGTH);

    const plainBuffer = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv, tagLength: TAG_LENGTH },
      key,
      ciphertext,
    );

    return new TextDecoder().decode(plainBuffer);
  } catch (err) {
    throw new EncryptionError('DECRYPT_FAILED', err);
  }
}
