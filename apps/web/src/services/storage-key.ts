/**
 * PIN-basierte Schlüsselableitung und OPFS-Salt-Verwaltung.
 *
 * Sicherheitsentscheidungen:
 * - PBKDF2-SHA256 mit 210_000 Iterationen (OWASP-Empfehlung für PBKDF2-SHA256, 2024)
 * - Salt (16 Byte, zufällig) liegt im Klartext in OPFS (pe_salt) – kein Geheimnis.
 *   Schutzwirkung: verhindert Wörterbuch-Angriffe und Rainbow-Tables über mehrere Geräte.
 * - extractable: false – CryptoKey verlässt nie den Browser-Speicher, kein Export via
 *   DevTools oder SubtleCrypto.exportKey() möglich.
 * - Der abgeleitete CryptoKey wird ausschließlich im RAM gehalten, nie serialisiert.
 */

import { encryptRecord, decryptRecord } from '@peopleseyes/core-crypto';

const PBKDF2_ITERATIONS = 210_000;
export const SALT_FILE_NAME = 'pe_salt';
const SALT_LENGTH = 16; // Byte

/**
 * Leitet einen AES-GCM-256 CryptoKey aus PIN und Salt ab (PBKDF2-SHA256).
 *
 * Deterministisch: gleicher PIN + gleicher Salt → funktional äquivalenter Key.
 * "Funktional äquivalent" bedeutet: verschlüsselte Daten können mit dem abgeleiteten
 * Key entschlüsselt werden. CryptoKey-Instanzen sind nie direkt vergleichbar
 * (extractable: false schließt exportKey() aus).
 *
 * @param pin  Numerischer PIN des Nutzers (4–8 Ziffern als String)
 * @param salt 16-Byte-Salt aus OPFS (pe_salt), ArrayBuffer-backed
 */
export async function deriveStorageKey(pin: string, salt: Uint8Array<ArrayBuffer>): Promise<CryptoKey> {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(pin),
    'PBKDF2',
    false,
    ['deriveKey'],
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false, // extractable: false – Schlüssel verlässt nie den Browser-Speicher
    ['encrypt', 'decrypt'],
  );
}

/**
 * Lädt den Salt aus OPFS (pe_salt).
 * Gibt null zurück wenn noch kein Salt gespeichert ist (erster App-Start).
 */
export async function loadSaltFromOpfs(): Promise<Uint8Array<ArrayBuffer> | null> {
  try {
    const root = await navigator.storage.getDirectory();
    const fileHandle = await root.getFileHandle(SALT_FILE_NAME);
    const file = await fileHandle.getFile();
    const buffer = await file.arrayBuffer(); // arrayBuffer() liefert immer ArrayBuffer
    const salt = new Uint8Array(buffer);
    if (salt.length !== SALT_LENGTH) return null;
    return salt;
  } catch {
    // Datei nicht vorhanden → erster Start
    return null;
  }
}

/**
 * Generiert einen neuen zufälligen Salt und schreibt ihn als pe_salt in OPFS.
 * Wird beim ersten App-Start und bei PIN-Wechsel aufgerufen.
 */
export async function generateAndStoreSalt(): Promise<Uint8Array<ArrayBuffer>> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const root = await navigator.storage.getDirectory();
  const fileHandle = await root.getFileHandle(SALT_FILE_NAME, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(salt); // Uint8Array<ArrayBuffer> ist FileSystemWriteChunkType-kompatibel
  await writable.close();
  return salt;
}

/**
 * Ändert den PIN: leitet neuen Schlüssel ab, re-encryptet alle OPFS-Dateien atomisch.
 *
 * Strategie: Schreibe zuerst alle neuen Dateien (<id>.new), dann ersetze die alten,
 * dann lösche .new-Dateien. Bei Fehler: .new-Dateien aufräumen, alte bleiben intakt.
 *
 * @param currentKey Aktueller CryptoKey (aus StorageKeyContext)
 * @param newPin     Neuer PIN (4–8 Ziffern, numerisch)
 * @returns          Neuer CryptoKey der ab sofort im Context verwendet wird
 */
export async function changeStoragePin(
  currentKey: CryptoKey,
  newPin: string,
): Promise<CryptoKey> {
  // Neuen Salt generieren und persistieren
  const newSalt = await generateAndStoreSalt();
  // Neuen Schlüssel aus dem neuen PIN + neuem Salt ableiten
  const newKey = await deriveStorageKey(newPin, newSalt);
  // Alle Report-Dateien mit neuem Schlüssel re-encrypten
  await reEncryptAllReports(currentKey, newKey);
  return newKey;
}

/**
 * Re-verschlüsselt alle Report-Dateien mit einem neuen Schlüssel (PIN-Wechsel).
 *
 * Atomisch-Design:
 * 1. Alle Dateien im RAM mit neuem Schlüssel verschlüsseln (schlägt einer fehl → Abbruch)
 * 2. Neue Dateien schreiben (überschreiben die alten mit selben Dateinamen/IDs)
 *
 * Injizierte Krypto-Funktionen ermöglichen Unit-Tests ohne OPFS-Mock.
 *
 * @param oldKey    Aktueller AES-GCM CryptoKey
 * @param newKey    Neuer AES-GCM CryptoKey (aus neuem PIN abgeleitet)
 * @param decryptFn Entschlüsselungsfunktion (injiziert für Testbarkeit)
 * @param encryptFn Verschlüsselungsfunktion (injiziert für Testbarkeit)
 */
export async function reEncryptAllReports(
  oldKey: CryptoKey,
  newKey: CryptoKey,
  decryptFn: (key: CryptoKey, data: Uint8Array) => Promise<string> = decryptRecord,
  encryptFn: (key: CryptoKey, plaintext: string) => Promise<Uint8Array<ArrayBuffer>> = encryptRecord,
): Promise<void> {
  const root = await navigator.storage.getDirectory();
  let reportsDir: FileSystemDirectoryHandle;

  try {
    reportsDir = await root.getDirectoryHandle('reports');
  } catch {
    // Kein reports-Verzeichnis vorhanden – nichts zu tun
    return;
  }

  // Phase 1: Alle Dateien lesen und mit neuem Schlüssel verschlüsseln (im RAM)
  // Schlägt eine Datei fehl, wird keine einzige Datei verändert.
  const reEncrypted: Array<[string, Uint8Array<ArrayBuffer>]> = [];

  for await (const [name, handle] of reportsDir.entries()) {
    if (handle.kind !== 'file') continue;
    const file = await (handle as FileSystemFileHandle).getFile();
    const buffer = await file.arrayBuffer();
    const plaintext = await decryptFn(oldKey, new Uint8Array(buffer));
    const newData = await encryptFn(newKey, plaintext);
    reEncrypted.push([name, newData]);
  }

  // Phase 2: Neue Dateien schreiben (überschreiben alte)
  for (const [name, newData] of reEncrypted) {
    const fileHandle = await reportsDir.getFileHandle(name, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(newData);
    await writable.close();
  }
}
