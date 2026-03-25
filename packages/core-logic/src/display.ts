/**
 * Darstellungs-Hilfsfunktionen für CellAggregates.
 *
 * FEAT-06 / MED-05 fix: scoreToColor war dreifach dupliziert
 * (apps/web, apps/mobile, apps/kiosk). Einheitliche Quelle
 * verhindert divergierende Farbskalen.
 */

/**
 * Liefert eine Hex-Farbe für einen aggregateScore (0–1).
 *
 * Farbskala:
 *   ≥ 0.8  → #E24B4A  rot    – hohe Aktivität
 *   ≥ 0.5  → #EF9F27  amber  – mittlere Aktivität
 *   ≥ 0.2  → #1D9E75  grün   – niedrige Aktivität
 *   < 0.2  → #378ADD  blau   – einzelne/unsichere Meldung
 */
export function scoreToColor(score: number): string {
  if (score >= 0.8) return '#E24B4A';
  if (score >= 0.5) return '#EF9F27';
  if (score >= 0.2) return '#1D9E75';
  return '#378ADD';
}
