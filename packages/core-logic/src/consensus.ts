import type { Report, CellAggregate } from '@peopleseyes/core-model';
import { ObservationConfidence, ObservedActivityType, AuthorityCategory } from '@peopleseyes/core-model';

/**
 * Gewichtung der Confidence-Level für Score-Berechnung.
 */
const CONFIDENCE_WEIGHT: Record<ObservationConfidence, number> = {
  [ObservationConfidence.Direkt]: 1.0,
  [ObservationConfidence.Weitergeleitet]: 0.6,
  [ObservationConfidence.Unsicher]: 0.3,
};

/**
 * Zeitfenster in dem Reports zur selben Zelle zusammengefasst werden (ms).
 * Standard: 2 Stunden.
 */
const AGGREGATION_WINDOW_MS = 2 * 60 * 60 * 1000;

/**
 * Maximaler Score (bei vielen übereinstimmenden Reports).
 * Wird auf 1.0 normalisiert.
 */
const MAX_SCORE_REPORTS = 5;

/**
 * Berechnet einen Aggregate-Score für eine Gruppe von Reports.
 *
 * Formel:
 *   rawScore = Σ(confidence_weight_i) / MAX_SCORE_REPORTS
 *   categoryBonus = übereinstimmende Kategorie-Angaben / total
 *   aggregateScore = clamp(rawScore * (0.7 + 0.3 * categoryBonus), 0, 1)
 */
export function computeAggregateScore(reports: readonly Report[]): number {
  if (reports.length === 0) return 0;

  const rawScore = reports.reduce(
    (sum, r) => sum + CONFIDENCE_WEIGHT[r.confidence],
    0,
  ) / MAX_SCORE_REPORTS;

  // Bonus wenn Reports dieselbe Kategorie angeben (Übereinstimmung)
  const categoryCounts = new Map<AuthorityCategory, number>();
  for (const r of reports) {
    categoryCounts.set(r.authorityCategory, (categoryCounts.get(r.authorityCategory) ?? 0) + 1);
  }
  const maxCategoryCount = Math.max(...categoryCounts.values());
  const categoryBonus = maxCategoryCount / reports.length;

  return Math.min(rawScore * (0.7 + 0.3 * categoryBonus), 1.0);
}

/**
 * Bestimmt den dominanten Wert aus einem Array (häufigster Wert).
 */
/** IMP-01 fix: wirft wenn values leer – Aufrufer muss vorher prüfen. */
function dominant<T>(values: readonly T[]): T {
  if (values.length === 0) throw new Error('dominant() called with empty array');
  const counts = new Map<T, number>();
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);
  // Non-null assertion safe: values.length > 0 garantiert mindestens einen Eintrag
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]![0];
}

/**
 * Aggregiert mehrere Reports derselben Zelle zu einem CellAggregate.
 *
 * @param cellId  - H3-Zell-ID
 * @param reports - Reports für diese Zelle (gefiltert und dedupliziert)
 * @param nowMs   - Aktueller Zeitstempel für Fenster-Filterung
 */
export function aggregateReportsForCell(
  cellId: string,
  reports: readonly Report[],
  nowMs: number = Date.now(),
): CellAggregate {
  // Nur Reports innerhalb des Zeitfensters berücksichtigen
  const recent = reports.filter(
    r => nowMs - r.reportedAtMinute <= AGGREGATION_WINDOW_MS,
  );

  if (recent.length === 0) {
    return {
      cellId,
      reportCount: 0,
      dominantActivityType: ObservedActivityType.Sonstiges,
      dominantAuthorityCategory: AuthorityCategory.Unbekannt,
      lastUpdatedHour: Math.floor(nowMs / 3_600_000) * 3_600_000,
      aggregateScore: 0,
    };
  }

  return {
    cellId,
    reportCount: recent.length,
    dominantActivityType: dominant(recent.map(r => r.activityType)),
    dominantAuthorityCategory: dominant(recent.map(r => r.authorityCategory)),
    lastUpdatedHour: Math.floor(nowMs / 3_600_000) * 3_600_000,
    aggregateScore: computeAggregateScore(recent),
  };
}

/**
 * Prüft ob ein Report als potenzielle Spam-Meldung einzustufen ist.
 *
 * Heuristiken (clientseitig):
 * - Zu viele Reports aus derselben Zelle in kurzer Zeit
 * - Ungewöhnlich viele Reports mit gleichem Timestamp
 */
export function isLikelySpam(
  newReport: Report,
  existingReports: readonly Report[],
  maxReportsPerCellPerHour: number = 10,
): boolean {
  const oneHourAgo = newReport.reportedAtMinute - 60 * 60 * 1000;

  const recentSameCell = existingReports.filter(
    r =>
      r.position.cellId === newReport.position.cellId &&
      r.reportedAtMinute >= oneHourAgo,
  );

  return recentSameCell.length >= maxReportsPerCellPerHour;
}

/**
 * Dedupliziert Reports anhand der ID.
 * Relevant für P2P-Sync wo dieselbe Meldung mehrfach ankommen kann.
 */
export function deduplicateReports(reports: readonly Report[]): Report[] {
  const seen = new Set<string>();
  return reports.filter(r => {
    if (seen.has(r.id)) return false;
    seen.add(r.id);
    return true;
  });
}
