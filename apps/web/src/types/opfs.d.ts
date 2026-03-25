/**
 * OPFS-API-Ergänzungen für TypeScript DOM lib (Stand TS 5.9).
 *
 * Die TypeScript DOM lib enthält noch nicht alle OPFS-Methoden:
 * - FileSystemDirectoryHandle: entries(), keys(), values(), [Symbol.asyncIterator]
 * - FileSystemFileHandle: remove()
 *
 * Diese Deklarationen erweitern die eingebauten Interfaces entsprechend
 * der WHATWG File System Standard-Spezifikation:
 * https://fs.spec.whatwg.org/
 */

interface FileSystemDirectoryHandle {
  /** Gibt einen AsyncIterator über alle [name, handle]-Paare zurück. */
  entries(): AsyncIterableIterator<[string, FileSystemHandle]>;
  /** Gibt einen AsyncIterator über alle Dateinamen zurück. */
  keys(): AsyncIterableIterator<string>;
  /** Gibt einen AsyncIterator über alle FileSystemHandle-Einträge zurück. */
  values(): AsyncIterableIterator<FileSystemHandle>;
  [Symbol.asyncIterator](): AsyncIterableIterator<[string, FileSystemHandle]>;
}

interface FileSystemFileHandle {
  /**
   * Löscht die Datei dieses Handles.
   * Entspricht removeEntry() auf dem Eltern-DirectoryHandle.
   */
  remove(): Promise<void>;
}
