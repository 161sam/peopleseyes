/**
 * Kiosk-Report-Store – IndexedDB (identische Logik wie apps/web).
 *
 * Eigenständige Kopie damit der Kiosk keine cross-app relativen Pfade
 * zu apps/web benötigt. Teilt nur @peopleseyes/* workspace-Pakete.
 *
 * CRIT-01/02 fix: Reports werden jetzt tatsächlich gespeichert und
 * CellAggregates via P2P veröffentlicht.
 */

import type { Report, CellAggregate } from '@peopleseyes/core-model';
import {
  aggregateReportsForCell,
  deduplicateReports,
  isLikelySpam,
  validateReport,
} from '@peopleseyes/core-logic';
import { kioskP2pSync } from './kiosk-p2p-sync.js';

const DB_NAME = 'peopleseyes';
const DB_VERSION = 1;
const STORE_REPORTS = 'reports';

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

export class KioskReportStore {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    this.db = await openDb();
    await this.pruneOldReports().catch(err =>
      console.warn('Kiosk-Pruning fehlgeschlagen:', err),
    );
  }

  async addReport(report: Report): Promise<void> {
    if (!this.db) throw new Error('KioskReportStore nicht initialisiert');

    const existing = await this.getAllReports();

    if (isLikelySpam(report, existing)) {
      throw new Error('Meldung als möglicher Spam erkannt.');
    }

    await new Promise<void>((resolve, reject) => {
      const tx = this.db!.transaction(STORE_REPORTS, 'readwrite');
      tx.objectStore(STORE_REPORTS).put(report);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });

    // Aggregate berechnen und P2P veröffentlichen
    const cellReports = existing
      .filter(r => r.position.cellId === report.position.cellId)
      .concat(report);

    const aggregate = aggregateReportsForCell(report.position.cellId, cellReports);
    kioskP2pSync.publishCellAggregate(aggregate);
  }

  async getAllReports(): Promise<Report[]> {
    if (!this.db) return [];
    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(STORE_REPORTS, 'readonly');
      const req = tx.objectStore(STORE_REPORTS).getAll();
      req.onsuccess = () => resolve(deduplicateReports(req.result as Report[]));
      req.onerror = () => reject(req.error);
    });
  }

  async computeAllAggregates(): Promise<CellAggregate[]> {
    const all = await this.getAllReports();
    const byCellId = new Map<string, Report[]>();
    for (const r of all) {
      const arr = byCellId.get(r.position.cellId) ?? [];
      arr.push(r);
      byCellId.set(r.position.cellId, arr);
    }
    return [...byCellId.entries()].map(([cellId, reports]) =>
      aggregateReportsForCell(cellId, reports),
    );
  }

  async pruneOldReports(maxAgeMs = 48 * 60 * 60 * 1000): Promise<number> {
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

export const kioskReportStore = new KioskReportStore();
