/**
 * Lokaler Report-Store – OPFS + AES-GCM
 *
 * Alle Meldungen bleiben primär lokal, verschlüsselt mit einem PIN-abgeleiteten
 * AES-GCM-256-Schlüssel. Nur CellAggregates werden via P2P geteilt,
 * niemals Roh-Reports.
 *
 * Verzeichnisstruktur im OPFS-Root:
 *   pe_salt          ← 16-Byte-Salt für PBKDF2 (Klartext, kein Geheimnis)
 *   reports/
 *     <report.id>    ← je eine Datei, Inhalt: encryptRecord(JSON.stringify(report))
 *
 * Sicherheitsentscheidungen:
 * - Kein IndexedDB mehr – IndexedDB-Daten liegen unverschlüsselt auf der Gerätedisk,
 *   bei Gerätebeschlagnahmung sind alle Reports lesbar. OPFS + AES-GCM schützt dagegen.
 * - OPFS ist per Same-Origin-Policy nur für diesen Origin zugänglich.
 * - Jeder Report ist eine eigene Datei (nicht ein Archiv) → kein Known-Plaintext-
 *   Angriff über Dateilängen-Muster möglich.
 * - Defekte oder nicht entschlüsselbare Dateien werden übersprungen + console.warn,
 *   niemals throw → kein Totalausfall bei einzeln korrupten Einträgen.
 * - Feature-Detection: fällt OPFS nicht verfügbar, läuft der Store ohne Persistenz
 *   (Reports gehen nach Reload verloren) mit expliziter Konsolwarnung.
 */

import type { Report, CellAggregate } from '@peopleseyes/core-model';
import {
  aggregateReportsForCell,
  deduplicateReports,
  isLikelySpam,
  validateReport,
} from '@peopleseyes/core-logic';
import { encryptRecord, decryptRecord, EncryptionError } from '@peopleseyes/core-crypto';
import { reEncryptAllReports } from './storage-key.js';
import { p2pSync } from './p2p-sync.js';

const REPORTS_DIR = 'reports';

/** Prüft ob OPFS im aktuellen Kontext verfügbar ist. */
function isOpfsAvailable(): boolean {
  return (
    'storage' in navigator &&
    typeof (navigator.storage as { getDirectory?: unknown }).getDirectory === 'function'
  );
}

export class LocalReportStore {
  private key: CryptoKey | null = null;
  private reportsDir: FileSystemDirectoryHandle | null = null;
  private opfsReady = false;

  /**
   * Initialisiert den Store mit einem PIN-abgeleiteten AES-GCM-Schlüssel.
   *
   * Muss vor allen anderen Methoden aufgerufen werden.
   * Idempotent: zweiter Aufruf bei bereits initialisiertem Store ist ein No-op.
   *
   * @param key AES-GCM-256 CryptoKey (extractable: false, nur im RAM)
   */
  async init(key: CryptoKey): Promise<void> {
    if (this.key) return;

    if (!isOpfsAvailable()) {
      console.warn(
        '[LocalReportStore] OPFS nicht verfügbar – kein verschlüsselter Speicher möglich. ' +
          'Gerätedaten werden nach Reload nicht persistiert. ' +
          'Unterstützte Browser: Chrome 102+, Firefox 111+, Safari 15.2+.',
      );
      this.key = key;
      return;
    }

    this.key = key;
    this.opfsReady = true;

    const root = await navigator.storage.getDirectory();
    this.reportsDir = await root.getDirectoryHandle(REPORTS_DIR, { create: true });

    // IMP-04: automatisches Pruning beim Start – Reports älter als 48h entfernen
    await this.pruneOldReports().catch(err =>
      console.warn('[LocalReportStore] Pruning beim Start fehlgeschlagen:', err),
    );
  }

  /**
   * Unlock-Probe: versucht die erste vorhandene Report-Datei zu entschlüsseln.
   *
   * Gibt true zurück wenn:
   * - OPFS nicht verfügbar (kann nicht verifizieren → optimistisch akzeptieren)
   * - Kein reports/-Verzeichnis vorhanden (erster Start nach PIN-Setup)
   * - Keine Dateien im reports/-Verzeichnis
   * - Erste Datei erfolgreich entschlüsselt
   *
   * Gibt false zurück wenn die Entschlüsselung mit EncryptionError(DECRYPT_FAILED) fehlschlägt.
   * Löst keine Datenlöschung aus.
   *
   * Wird von useStoragePin vor init() aufgerufen um den PIN zu validieren.
   */
  async tryUnlock(key: CryptoKey): Promise<boolean> {
    if (!isOpfsAvailable()) return true;

    try {
      const root = await navigator.storage.getDirectory();
      const dir = await root.getDirectoryHandle(REPORTS_DIR).catch(() => null);
      if (!dir) return true;

      for await (const [, handle] of dir.entries()) {
        if (handle.kind !== 'file') continue;
        const file = await (handle as FileSystemFileHandle).getFile();
        const buffer = await file.arrayBuffer();
        await decryptRecord(key, new Uint8Array(buffer));
        return true;
      }

      return true;
    } catch (err) {
      if (err instanceof EncryptionError && err.code === 'DECRYPT_FAILED') {
        return false;
      }
      throw err;
    }
  }

  /**
   * Speichert einen neuen Report verschlüsselt in OPFS und veröffentlicht das
   * Aggregate via P2P.
   */
  async addReport(report: Report): Promise<void> {
    if (!this.key) throw new Error('Store nicht initialisiert');

    const existing = await this.getAllReports();

    if (isLikelySpam(report, existing)) {
      throw new Error('Meldung wurde als möglicher Spam erkannt. Bitte warte kurz.');
    }

    if (this.opfsReady && this.reportsDir) {
      const encrypted = await encryptRecord(this.key, JSON.stringify(report));
      const fileHandle = await this.reportsDir.getFileHandle(report.id, { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(encrypted);
      await writable.close();
    }

    const cellReports = existing
      .filter(r => r.position.cellId === report.position.cellId)
      .concat(report);

    const aggregate = aggregateReportsForCell(report.position.cellId, cellReports);
    await p2pSync.publishCellAggregate(aggregate);
  }

  /**
   * Lädt alle lokalen Reports aus OPFS – entschlüsselt jede Datei einzeln.
   *
   * Dateien die nicht entschlüsselt oder validiert werden können →
   * überspringen + console.warn, niemals throw (kein Datenverlust bei Einzelfehlern).
   */
  async getAllReports(): Promise<Report[]> {
    if (!this.key || !this.opfsReady || !this.reportsDir) return [];

    const reports: Report[] = [];
    const now = Date.now();

    for await (const [name, handle] of this.reportsDir.entries()) {
      if (handle.kind !== 'file') continue;
      try {
        const file = await (handle as FileSystemFileHandle).getFile();
        const buffer = await file.arrayBuffer();
        const plaintext = await decryptRecord(this.key, new Uint8Array(buffer));
        const parsed = JSON.parse(plaintext) as unknown;
        if (validateReport(parsed, now)) {
          reports.push(parsed as Report);
        }
      } catch (err) {
        console.warn(
          `[LocalReportStore] Datei "${name}" konnte nicht verarbeitet werden:`,
          err,
        );
      }
    }

    return deduplicateReports(reports);
  }

  /** Lädt Reports für eine bestimmte H3-Zelle. */
  async getReportsForCell(cellId: string): Promise<Report[]> {
    const all = await this.getAllReports();
    return all.filter(r => r.position.cellId === cellId);
  }

  /** Berechnet aktuelle CellAggregates für alle Zellen mit lokalen Reports. */
  async computeAllAggregates(): Promise<CellAggregate[]> {
    const all = await this.getAllReports();
    const byCellId = new Map<string, Report[]>();

    for (const r of all) {
      const cell = r.position.cellId;
      const arr = byCellId.get(cell) ?? [];
      arr.push(r);
      byCellId.set(cell, arr);
    }

    return [...byCellId.entries()].map(([cellId, reports]) =>
      aggregateReportsForCell(cellId, reports),
    );
  }

  /**
   * Erhöht localConfirmationCount des Reports um 1 und schreibt die Datei neu.
   * Fehler werden gewarnt, nicht geworfen.
   */
  async confirmReport(reportId: string): Promise<void> {
    if (!this.key || !this.opfsReady || !this.reportsDir) return;

    try {
      const fileHandle = await this.reportsDir.getFileHandle(reportId);
      const file = await fileHandle.getFile();
      const buffer = await file.arrayBuffer();
      const plaintext = await decryptRecord(this.key, new Uint8Array(buffer));
      const report = JSON.parse(plaintext) as Report;

      const updated: Report = {
        ...report,
        localConfirmationCount: report.localConfirmationCount + 1,
      };

      const encrypted = await encryptRecord(this.key, JSON.stringify(updated));
      const writable = await fileHandle.createWritable();
      await writable.write(encrypted);
      await writable.close();
    } catch (err) {
      console.warn(`[LocalReportStore] confirmReport fehlgeschlagen für "${reportId}":`, err);
    }
  }

  /**
   * Löscht Report-Dateien die älter als maxAgeMs sind.
   * Löscht via FileSystemFileHandle.remove() (kein Verzeichnis-Delete).
   * IMP-04: automatisch beim init() aufgerufen.
   */
  async pruneOldReports(maxAgeMs: number = 48 * 60 * 60 * 1000): Promise<number> {
    if (!this.key || !this.opfsReady || !this.reportsDir) return 0;

    const cutoff = Date.now() - maxAgeMs;
    const toDelete: FileSystemFileHandle[] = [];

    for await (const [, handle] of this.reportsDir.entries()) {
      if (handle.kind !== 'file') continue;
      const fileHandle = handle as FileSystemFileHandle;
      try {
        const file = await fileHandle.getFile();
        const buffer = await file.arrayBuffer();
        const plaintext = await decryptRecord(this.key, new Uint8Array(buffer));
        const report = JSON.parse(plaintext) as Partial<Report>;
        if (typeof report.reportedAtMinute === 'number' && report.reportedAtMinute < cutoff) {
          toDelete.push(fileHandle);
        }
      } catch {
        // Korrupte Datei nicht automatisch löschen – überspringen
      }
    }

    let deleted = 0;
    for (const fileHandle of toDelete) {
      try {
        await fileHandle.remove();
        deleted++;
      } catch (err) {
        console.warn('[LocalReportStore] Löschen fehlgeschlagen:', err);
      }
    }

    return deleted;
  }

  /**
   * Re-verschlüsselt alle Reports mit einem neuen Schlüssel (PIN-Wechsel).
   * Delegiert an reEncryptAllReports() aus storage-key.ts.
   * Aktualisiert den internen Schlüssel nach erfolgreichem Re-Encrypt.
   */
  async reEncryptAll(oldKey: CryptoKey, newKey: CryptoKey): Promise<void> {
    await reEncryptAllReports(oldKey, newKey);
    this.key = newKey;
  }

  /**
   * Aktualisiert nur den internen Schlüssel ohne Re-Encryption.
   * Wird aufgerufen nachdem changeStoragePin() die OPFS-Dateien bereits
   * neu verschlüsselt hat.
   */
  updateKey(newKey: CryptoKey): void {
    this.key = newKey;
  }
}

export const localReportStore = new LocalReportStore();
