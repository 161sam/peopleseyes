import type { AbuseFlag } from '@peopleseyes/core-model';
import { floorToHour } from './geo.js';

/** Maximale Flags pro Report bevor Score auf 0 sinkt */
const MAX_FLAGS_BEFORE_ZERO = 3;

/**
 * Berechnet einen Abuse-Penalty (0–1) für eine Report-ID.
 * Je mehr Flags, desto höher die Penalty.
 * Bei >= MAX_FLAGS_BEFORE_ZERO: Penalty = 1.0 (Score wird 0).
 */
export function computeAbusePenalty(
  reportId: string,
  flags: readonly AbuseFlag[],
): number {
  const reportFlags = flags.filter(f => f.reportId === reportId);
  if (reportFlags.length === 0) return 0;
  return Math.min(reportFlags.length / MAX_FLAGS_BEFORE_ZERO, 1.0);
}

/**
 * Prüft ob ein Flag als Duplikat gilt
 * (dieselbe Kombination aus reportId + reason in den letzten 24h).
 */
export function isDuplicateFlag(
  newFlag: AbuseFlag,
  existingFlags: readonly AbuseFlag[],
): boolean {
  const yesterday = floorToHour(Date.now() - 24 * 60 * 60 * 1000);
  return existingFlags.some(
    f =>
      f.reportId === newFlag.reportId &&
      f.reason === newFlag.reason &&
      f.flaggedAtHour >= yesterday,
  );
}

/**
 * Erzeugt ein valides AbuseFlag-Objekt.
 */
export function createAbuseFlag(
  reportId: string,
  reason: AbuseFlag['reason'],
  cellId: string,
  nowMs: number = Date.now(),
): AbuseFlag {
  return Object.freeze({
    reportId,
    reason,
    flaggedAtHour: floorToHour(nowMs),
    cellId,
  });
}
