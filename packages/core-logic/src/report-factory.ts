import type { Report, CellAggregate } from '@peopleseyes/core-model';
import {
  AuthorityCategory,
  AuthorityVisibility,
  ObservationConfidence,
  ObservedActivityType,
  H3Resolution,
} from '@peopleseyes/core-model';
import { anonymizePosition, floorToMinute } from './geo.js';

/** Eingabe-Daten vom Nutzer für eine neue Meldung */
export interface ReportDraft {
  readonly lat: number;
  readonly lng: number;
  readonly authorityCategory: AuthorityCategory;
  readonly authorityVisibility: AuthorityVisibility;
  readonly activityType: ObservedActivityType;
  readonly confidence: ObservationConfidence;
  readonly description?: string;
  readonly resolution?: H3Resolution;
}

function generateId(): string {
  const c = globalThis as { crypto?: { randomUUID?: () => string } };
  if (c.crypto?.randomUUID) return c.crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Erzeugt einen validen, immutable Report aus einem Draft.
 *
 * - Koordinaten werden sofort anonymisiert
 * - Timestamp wird auf Minutengenauigkeit gerundet
 * - ID wird generiert (crypto.randomUUID)
 */
export function createReport(draft: ReportDraft, nowMs: number = Date.now()): Report {
  if (draft.description !== undefined && draft.description.length > 280) {
    throw new Error('Beschreibung darf maximal 280 Zeichen haben');
  }

  const resolution = draft.resolution ?? H3Resolution.Viertel;

  return Object.freeze({
    id: generateId(),
    position: anonymizePosition(draft.lat, draft.lng, resolution, nowMs),
    authorityCategory: draft.authorityCategory,
    authorityVisibility: draft.authorityVisibility,
    activityType: draft.activityType,
    confidence: draft.confidence,
    reportedAtMinute: floorToMinute(nowMs),
    ...(draft.description !== undefined ? { description: draft.description } : {}),
    localConfirmationCount: 1,
  });
}

/** Maximales Alter eines akzeptierten Reports: 24 Stunden */
const MAX_REPORT_AGE_MS = 24 * 60 * 60 * 1000;
/** Maximale Toleranz für Zukunfts-Timestamps: 5 Minuten */
const MAX_FUTURE_DRIFT_MS = 5 * 60 * 1000;

/**
 * Validiert ob ein empfangenes Report-Objekt (z.B. aus P2P) valide ist.
 * Schützt vor manipulierten oder malformen Nachrichten.
 *
 * WARN-04 fix: Timestamps außerhalb [now-24h, now+5min] werden abgelehnt.
 */
export function validateReport(value: unknown, nowMs: number = Date.now()): value is Report {
  if (typeof value !== 'object' || value === null) return false;
  const r = value as Record<string, unknown>;

  if (
    typeof r['id'] !== 'string' || r['id'].length === 0 ||
    typeof r['position'] !== 'object' || r['position'] === null ||
    typeof (r['position'] as Record<string, unknown>)['cellId'] !== 'string' ||
    typeof r['reportedAtMinute'] !== 'number' ||
    typeof r['localConfirmationCount'] !== 'number' ||
    !Object.values(AuthorityCategory).includes(r['authorityCategory'] as AuthorityCategory) ||
    !Object.values(ObservedActivityType).includes(r['activityType'] as ObservedActivityType) ||
    !Object.values(ObservationConfidence).includes(r['confidence'] as ObservationConfidence)
  ) return false;

  // Timestamp-Bounds: nicht zu alt, nicht in der Zukunft
  const ts = r['reportedAtMinute'] as number;
  if (ts <= 0) return false;
  if (ts < nowMs - MAX_REPORT_AGE_MS) return false;
  if (ts > nowMs + MAX_FUTURE_DRIFT_MS) return false;

  return true;
}

/** Maximales Alter eines akzeptierten CellAggregate (2 Stunden) */
const MAX_AGGREGATE_AGE_MS = 2 * 60 * 60 * 1000;
/** Maximale plausible Meldungsanzahl pro Zelle */
const MAX_PLAUSIBLE_REPORT_COUNT = 10_000;

/**
 * Validiert ein empfangenes CellAggregate-Objekt aus dem P2P-Netz.
 *
 * Schützt vor:
 * - Injizierten Enum-Werten außerhalb des bekannten Wertebereichs
 * - Score-Inflation (aggregateScore > 1)
 * - Negativen oder übermäßig großen Zählwerten
 * - Veralteten Aggregaten (älter als MAX_AGGREGATE_AGE_MS)
 * - Leerem oder malformem cellId-String
 *
 * SEC-02 fix: Ersetzt den unsicheren `data as CellAggregate`-Cast in p2p-sync.ts.
 */
export function validateCellAggregate(
  value: unknown,
  nowMs: number = Date.now(),
): value is CellAggregate {
  if (typeof value !== 'object' || value === null) return false;
  const a = value as Record<string, unknown>;

  if (
    typeof a['cellId'] !== 'string' || a['cellId'].length === 0 ||
    typeof a['reportCount'] !== 'number' ||
    a['reportCount'] < 0 ||
    a['reportCount'] > MAX_PLAUSIBLE_REPORT_COUNT ||
    typeof a['aggregateScore'] !== 'number' ||
    a['aggregateScore'] < 0 ||
    a['aggregateScore'] > 1 ||
    typeof a['lastUpdatedHour'] !== 'number' ||
    a['lastUpdatedHour'] <= 0 ||
    !Object.values(ObservedActivityType).includes(
      a['dominantActivityType'] as ObservedActivityType,
    ) ||
    !Object.values(AuthorityCategory).includes(
      a['dominantAuthorityCategory'] as AuthorityCategory,
    )
  ) return false;

  // Aggregate älter als 2h ablehnen
  if (nowMs - (a['lastUpdatedHour'] as number) > MAX_AGGREGATE_AGE_MS) return false;

  return true;
}
