/**
 * Nativer Report-Store via expo-sqlite.
 *
 * Fehler 7 fix: PRAGMA user_version-basierte Schema-Migration.
 *   Schema v1 → v2: (zukünftige Änderungen hier dokumentieren)
 *   Bei unbekannter version wird die DB zurückgesetzt statt abzustürzen.
 *
 * Fehler 7b fix: validateReport() filtert Rows die nach einem Schema-Upgrade
 *   mit alten Enum-Werten nicht mehr valide sind.
 */

import * as SQLite from 'expo-sqlite';
import type { Report, CellAggregate } from '@peopleseyes/core-model';
import {
  aggregateReportsForCell,
  deduplicateReports,
  isLikelySpam,
  validateReport,
} from '@peopleseyes/core-logic';

const DB_NAME = 'peopleseyes.db';
/** Aktuelle Schema-Version — bei jeder Migration inkrementieren */
const CURRENT_SCHEMA_VERSION = 1;

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
    await this.runMigrations(this.db);
    // Automatisches Pruning beim Start
    await this.pruneOldReports().catch(err => console.warn('Pruning fehlgeschlagen:', err));
  }

  /**
   * Führt Schema-Migrationen aus basierend auf PRAGMA user_version.
   *
   * Fehler 7 fix: ohne diese Prüfung würden App-Updates die das Schema ändern
   * zu inkonsistenten Daten oder Abstürzen führen.
   */
  private async runMigrations(db: SQLite.SQLiteDatabase): Promise<void> {
    const versionRow = await db.getFirstAsync<{ user_version: number }>(
      'PRAGMA user_version;',
    );
    const currentVersion = versionRow?.user_version ?? 0;

    if (currentVersion === CURRENT_SCHEMA_VERSION) {
      // Schema ist aktuell – nichts zu tun
      return;
    }

    if (currentVersion === 0) {
      // Erstinstallation: Schema anlegen
      await db.execAsync(CREATE_REPORTS_TABLE);
      await db.execAsync(CREATE_INDEX);
      await db.execAsync(`PRAGMA user_version = ${CURRENT_SCHEMA_VERSION};`);
      return;
    }

    if (currentVersion > CURRENT_SCHEMA_VERSION) {
      // Datenbank stammt aus einer neueren App-Version — DB zurücksetzen
      // um Datenfehler zu vermeiden (z.B. nach App-Downgrade)
      console.warn(
        `[NativeReportStore] DB-Version ${currentVersion} > App-Version ${CURRENT_SCHEMA_VERSION}. Datenbank wird zurückgesetzt.`,
      );
      await db.execAsync('DROP TABLE IF EXISTS reports;');
      await db.execAsync(CREATE_REPORTS_TABLE);
      await db.execAsync(CREATE_INDEX);
      await db.execAsync(`PRAGMA user_version = ${CURRENT_SCHEMA_VERSION};`);
      return;
    }

    // Zukünftige Migrationen hier als if-Kette ergänzen:
    // if (currentVersion < 2) { await db.execAsync('ALTER TABLE reports ADD COLUMN ...'); }
    // if (currentVersion < 3) { ... }
    await db.execAsync(`PRAGMA user_version = ${CURRENT_SCHEMA_VERSION};`);
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

    const now = Date.now();
    const mapped = rows.map(row => {
      try {
        return {
          id: row.id,
          position: JSON.parse(row.position_json) as Report['position'],
          authorityCategory: row.authority_category as Report['authorityCategory'],
          authorityVisibility: row.authority_visibility as Report['authorityVisibility'],
          activityType: row.activity_type as Report['activityType'],
          confidence: row.confidence as Report['confidence'],
          reportedAtMinute: row.reported_at_minute,
          ...(row.description ? { description: row.description } : {}),
          localConfirmationCount: row.local_confirmation_count,
        };
      } catch {
        return null;
      }
    });

    // Fehler 7b fix: validateReport filtert Rows mit veralteten Enum-Werten
    // (z.B. nach Schema-Änderungen oder App-Upgrades mit neuen Enum-Werten)
    return deduplicateReports(
      mapped.filter((r): r is Report => r !== null && validateReport(r, now)),
    );
  }

  async getReportsForCell(cellId: string): Promise<Report[]> {
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
    }>('SELECT * FROM reports WHERE cell_id = ?', [cellId]);

    const now = Date.now();
    return rows
      .map(row => {
        try {
          return {
            id: row.id,
            position: JSON.parse(row.position_json) as Report['position'],
            authorityCategory: row.authority_category as Report['authorityCategory'],
            authorityVisibility: row.authority_visibility as Report['authorityVisibility'],
            activityType: row.activity_type as Report['activityType'],
            confidence: row.confidence as Report['confidence'],
            reportedAtMinute: row.reported_at_minute,
            ...(row.description ? { description: row.description } : {}),
            localConfirmationCount: row.local_confirmation_count,
          };
        } catch {
          return null;
        }
      })
      .filter((r): r is Report => r !== null && validateReport(r, now));
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
