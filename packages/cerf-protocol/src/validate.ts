import type { CerfReport, CerfFeed } from './types.js';
import { CERF_VERSION } from './types.js';

const VALID_JURISDICTIONS = new Set(['EU', 'US', 'global']);
const VALID_AGENCY_GROUPS = new Set([
  'federal_border', 'federal_other', 'local_police',
  'immigration', 'joint_operation', 'unknown',
]);
const VALID_ACTIVITY_TYPES = new Set([
  'checkpoint', 'patrol', 'id_check', 'arrest',
  'transport', 'search', 'vehicle_stop', 'other',
]);
const VALID_CONFIDENCES = new Set(['direct', 'indirect', 'uncertain']);
const VALID_VERIFIED_BY = new Set([null, 'community', 'ngo']);

/** Maximum age of a report: 24 hours */
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

/** Maximum age of a feed: 5 minutes */
const MAX_FEED_AGE_MS = 5 * 60 * 1000;

/**
 * Checks whether a value is a valid CerfReport object.
 * Rejects reports older than 24h.
 * Accepts missing optional fields (signature, extensions).
 */
export function validateCerfReport(
  value: unknown,
  nowMs: number = Date.now(),
): value is CerfReport {
  if (typeof value !== 'object' || value === null) return false;
  const r = value as Record<string, unknown>;

  if (r['cerf'] !== CERF_VERSION) return false;
  if (typeof r['reportedAtHour'] !== 'number' || r['reportedAtHour'] <= 0) return false;
  if (nowMs - (r['reportedAtHour'] as number) > MAX_AGE_MS) return false;
  if (!VALID_JURISDICTIONS.has(r['jurisdiction'] as string)) return false;
  if (typeof r['h3Cell'] !== 'string' || r['h3Cell'].length === 0) return false;
  if (!VALID_AGENCY_GROUPS.has(r['agencyGroup'] as string)) return false;
  if (!VALID_ACTIVITY_TYPES.has(r['activityType'] as string)) return false;
  if (!VALID_CONFIDENCES.has(r['confidence'] as string)) return false;
  if (!VALID_VERIFIED_BY.has(r['verifiedBy'] as null | string)) return false;
  if (typeof r['source'] !== 'string' || r['source'].length === 0) return false;

  return true;
}

/**
 * Builds the deterministic signature-input string for a CerfReport.
 * Identical for signer and verifier.
 */
export function cerfSignatureInput(
  r: Omit<CerfReport, 'signature' | 'signerPublicKey' | 'extensions'>,
): string {
  return [
    r.cerf,
    r.reportedAtHour,
    r.jurisdiction,
    r.h3Cell,
    r.agencyGroup,
    r.activityType,
    r.confidence,
    r.source,
  ].join('|');
}

/**
 * Checks whether a CERF feed is valid.
 * Rejects feeds older than 5 minutes.
 */
export function validateCerfFeed(value: unknown, nowMs: number = Date.now()): value is CerfFeed {
  if (typeof value !== 'object' || value === null) return false;
  const f = value as Record<string, unknown>;
  if (f['cerf'] !== CERF_VERSION) return false;
  if (typeof f['generatedAt'] !== 'number') return false;
  if (nowMs - (f['generatedAt'] as number) > MAX_FEED_AGE_MS) return false;
  if (typeof f['source'] !== 'string') return false;
  if (!VALID_JURISDICTIONS.has(f['jurisdiction'] as string)) return false;
  if (!Array.isArray(f['reports'])) return false;
  return true;
}
