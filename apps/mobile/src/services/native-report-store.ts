/**
 * Nativer Report-Store via expo-sqlite.
 *
 * Ersetzt den IndexedDB-Store der Web-App für React Native.
 * expo-sqlite verwendet SQLite, das auf Android/iOS nativ verfügbar ist.
 *
 * Privacy-Prinzipien identisch mit Web:
 * - Rohe GPS-Koordinaten werden nie gespeichert
 * - Nur H3-Zell-IDs + aggregierte Daten
 * - Kein Sync ohne explizite Nutzer-Aktion
 */

import * as SQLite from 'expo-sqlite';
import type { Report, CellAggregate } from '@peopleseyes/core-model';
import {
  aggregateReportsForCell,
  deduplicateReports,
  isLikelySpam,
} from '@peopleseyes/core-logic';

const DB_NAME = 'peopleseyes.db';

const CREATE_REPORTS_TABLE = `
  CREATE TABLE IF NOT EXISTS reports (
    id TEXT PRIMARY KEY NOT NULL,
    cell_id TEXT NOT NULL,
    authority_category TEXT NOT NULL,
    authority_visibility TEXT NOT NULL,
    activity_type TEXT NOT NULL,
    confidence TEXT NOT NULL,
    reported_at_minute INTEGER NOT NULL,
    description TEXT,
    local_confirmation_count INTEGER NOT NULL DEFAULT 1,
    position_json TEXT NOT NULL
  );
`;

const CREATE_INDEX = `
  CREATE INDEX IF NOT EXISTS idx_reports_cell_id ON reports(cell_id);
`;

export class NativeReportStore {
  private db: SQLite.SQLiteDatabase | null = null;

  async init(): Promise<void> {
    this.db = await SQLite.openDatabaseAsync(DB_NAME);
    await this.db.execAsync(CREATE_REPORTS_TABLE);
    await this.db.execAsync(CREATE_INDEX);
    // IMP-04: automatisches Pruning beim Start
    await this.pruneOldReports().catch(err => console.warn('Pruning fehlgeschlagen:', err));
  }

  private ensureDb(): SQLite.SQLiteDatabase {
    if (!this.db) throw new Error('NativeReportStore nicht initialisiert');
    return this.db;
  }

  async addReport(report: Report): Promise<void> {
    const db = this.ensureDb();
    const existing = await this.getAllReports();

    if (isLikelySpam(report, existing)) {
      throw new Error('Meldung als möglicher Spam erkannt. Bitte warte kurz.');
    }

    await db.runAsync(
      `INSERT OR REPLACE INTO reports
        (id, cell_id, authority_category, authority_visibility, activity_type,
         confidence, reported_at_minute, description, local_confirmation_count, position_json)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        report.id,
        report.position.cellId,
        report.authorityCategory,
        report.authorityVisibility,
        report.activityType,
        report.confidence,
        report.reportedAtMinute,
        report.description ?? null,
        report.localConfirmationCount,
        JSON.stringify(report.position),
      ],
    );
  }

  async getAllReports(): Promise<Report[]> {
    const db = this.ensureDb();
    const rows = await db.getAllAsync<{
      id: string;
      cell_id: string;
      authority_category: string;
      authority_visibility: string;
      activity_type: string;
      confidence: string;
      reported_at_minute: number;
      description: string | null;
      local_confirmation_count: number;
      position_json: string;
    }>('SELECT * FROM reports ORDER BY reported_at_minute DESC');

    return deduplicateReports(
      rows.map(row => ({
        id: row.id,
        position: JSON.parse(row.position_json) as Report['position'],
        authorityCategory: row.authority_category as Report['authorityCategory'],
        authorityVisibility: row.authority_visibility as Report['authorityVisibility'],
        activityType: row.activity_type as Report['activityType'],
        confidence: row.confidence as Report['confidence'],
        reportedAtMinute: row.reported_at_minute,
        ...(row.description ? { description: row.description } : {}),
        localConfirmationCount: row.local_confirmation_count,
      })),
    );
  }

  async getReportsForCell(cellId: string): Promise<Report[]> {
    const db = this.ensureDb();
    const rows = await db.getAllAsync<{ position_json: string } & Record<string, unknown>>(
      'SELECT * FROM reports WHERE cell_id = ?',
      [cellId],
    );

    return rows.map(row => ({
      id: row['id'] as string,
      position: JSON.parse(row.position_json) as Report['position'],
      authorityCategory: row['authority_category'] as Report['authorityCategory'],
      authorityVisibility: row['authority_visibility'] as Report['authorityVisibility'],
      activityType: row['activity_type'] as Report['activityType'],
      confidence: row['confidence'] as Report['confidence'],
      reportedAtMinute: row['reported_at_minute'] as number,
      ...((row['description'] as string | null) ? { description: row['description'] as string } : {}),
      localConfirmationCount: row['local_confirmation_count'] as number,
    }));
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

  async pruneOldReports(maxAgeMs: number = 48 * 60 * 60 * 1000): Promise<number> {
    const db = this.ensureDb();
    const cutoff = Date.now() - maxAgeMs;
    const result = await db.runAsync(
      'DELETE FROM reports WHERE reported_at_minute < ?',
      [cutoff],
    );
    return result.changes;
  }

  async close(): Promise<void> {
    await this.db?.closeAsync();
    this.db = null;
  }
}

export const nativeReportStore = new NativeReportStore();
