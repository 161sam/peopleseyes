/**
 * Lokaler Report-Store – IndexedDB
 *
 * Alle Meldungen bleiben primär lokal. Nur CellAggregates
 * werden via P2P geteilt, niemals Roh-Reports.
 */

import type { Report, CellAggregate } from '@peopleseyes/core-model';
import {
  aggregateReportsForCell,
  deduplicateReports,
  isLikelySpam,
  validateReport,
} from '@peopleseyes/core-logic';
import { p2pSync } from './p2p-sync.js';

const DB_NAME = 'peopleseyes';
const DB_VERSION = 1;
const STORE_REPORTS = 'reports';

/** Öffnet die IndexedDB – erstellt Schema beim ersten Aufruf */
async function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_REPORTS)) {
        const store = db.createObjectStore(STORE_REPORTS, { keyPath: 'id' });
        store.createIndex('cellId', 'position.cellId', { unique: false });
        store.createIndex('reportedAtMinute', 'reportedAtMinute', { unique: false });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export class LocalReportStore {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    this.db = await openDb();
    // IMP-04: automatisches Pruning beim Start – Reports älter als 48h entfernen
    await this.pruneOldReports().catch(err => console.warn('Pruning fehlgeschlagen:', err));
  }

  /** Speichert einen Report lokal und veröffentlicht das Aggregate via P2P */
  async addReport(report: Report): Promise<void> {
    if (!this.db) throw new Error('Store nicht initialisiert');

    const existing = await this.getAllReports();

    // Spam-Check
    if (isLikelySpam(report, existing)) {
      throw new Error('Meldung wurde als möglicher Spam erkannt. Bitte warte kurz.');
    }

    // Lokal speichern
    await new Promise<void>((resolve, reject) => {
      const tx = this.db!.transaction(STORE_REPORTS, 'readwrite');
      tx.objectStore(STORE_REPORTS).put(report);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });

    // Aggregate berechnen und via P2P teilen
    const cellReports = existing
      .filter(r => r.position.cellId === report.position.cellId)
      .concat(report);

    const aggregate = aggregateReportsForCell(report.position.cellId, cellReports);
    await p2pSync.publishCellAggregate(aggregate);
  }

  /** Lädt alle lokalen Reports – ungültige Einträge werden verworfen (Fehler 5 fix) */
  async getAllReports(): Promise<Report[]> {
    if (!this.db) return [];

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(STORE_REPORTS, 'readonly');
      const req = tx.objectStore(STORE_REPORTS).getAll();
      req.onsuccess = () => {
        const now = Date.now();
        const valid = (req.result as unknown[]).filter(
          (item): item is Report => validateReport(item, now),
        );
        resolve(deduplicateReports(valid));
      };
      req.onerror = () => reject(req.error);
    });
  }

  /** Lädt Reports für eine bestimmte Zelle – ungültige Einträge werden verworfen */
  async getReportsForCell(cellId: string): Promise<Report[]> {
    if (!this.db) return [];

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(STORE_REPORTS, 'readonly');
      const index = tx.objectStore(STORE_REPORTS).index('cellId');
      const req = index.getAll(IDBKeyRange.only(cellId));
      req.onsuccess = () => {
        const now = Date.now();
        resolve(
          (req.result as unknown[]).filter((item): item is Report => validateReport(item, now)),
        );
      };
      req.onerror = () => reject(req.error);
    });
  }

  /** Berechnet aktuelle CellAggregates für alle Zellen */
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

  /** Löscht Reports die älter als maxAgeMs sind.
   * WARN-03 fix: Alle Deletes in einer einzigen Transaktion statt N parallelen.
   */
  async pruneOldReports(maxAgeMs: number = 48 * 60 * 60 * 1000): Promise<number> {
    if (!this.db) return 0;
    const cutoff = Date.now() - maxAgeMs;
    const all = await this.getAllReports();
    const toDelete = all.filter(r => r.reportedAtMinute < cutoff);
    if (toDelete.length === 0) return 0;

    await new Promise<void>((resolve, reject) => {
      const tx = this.db!.transaction(STORE_REPORTS, 'readwrite');
      const store = tx.objectStore(STORE_REPORTS);
      for (const r of toDelete) store.delete(r.id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });

    return toDelete.length;
  }
}

export const localReportStore = new LocalReportStore();
