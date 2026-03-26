/**
 * Unit-Tests für @peopleseyes/core-logic
 *
 * Abgedeckte Module:
 * - geo.ts          – anonymizePosition, floorToHour, floorToMinute, isCellInBoundingBox
 * - consensus.ts    – isLikelySpam, deduplicateReports, computeAggregateScore, aggregateReportsForCell
 * - report-factory  – createReport, validateReport, validateCellAggregate
 * - abuse.ts        – computeAbusePenalty, isDuplicateFlag, createAbuseFlag
 */

import { describe, it, expect } from 'vitest';
import {
  anonymizePosition,
  floorToHour,
  floorToMinute,
  isCellInBoundingBox,
  getCellCenter,
  isLikelySpam,
  deduplicateReports,
  computeAggregateScore,
  aggregateReportsForCell,
  createReport,
  validateReport,
  validateCellAggregate,
  computeAbusePenalty,
  isDuplicateFlag,
  createAbuseFlag,
  scoreToColor,
} from './index.js';
import {
  H3Resolution,
  ObservationConfidence,
  ObservedActivityType,
  AuthorityCategory,
  AuthorityVisibility,
  AbuseReason,
} from '@peopleseyes/core-model';
import type { Report, CellAggregate, AbuseFlag } from '@peopleseyes/core-model';

// ─── Hilfsfunktionen ─────────────────────────────────────────────────────────

/** Erzeugt einen minimalen validen Report für Tests */
function makeReport(overrides: Partial<Report> = {}): Report {
  const base = createReport({
    lat: 52.52,
    lng: 13.405,
    authorityCategory: AuthorityCategory.BundespolizeiBahn,
    authorityVisibility: AuthorityVisibility.EindeutigErkennbar,
    activityType: ObservedActivityType.Identitaetskontrolle,
    confidence: ObservationConfidence.Direkt,
    resolution: H3Resolution.Viertel,
  });
  return { ...base, ...overrides };
}

const NOW = Date.now();

// ─── geo.ts ──────────────────────────────────────────────────────────────────

describe('floorToHour', () => {
  it('rundet auf volle Stunde ab', () => {
    const ts = new Date('2024-06-15T14:37:22.000Z').getTime();
    const floored = floorToHour(ts);
    expect(new Date(floored).getUTCMinutes()).toBe(0);
    expect(new Date(floored).getUTCSeconds()).toBe(0);
    expect(new Date(floored).getUTCHours()).toBe(14);
  });

  it('lässt bereits gerundete Timestamps unverändert', () => {
    const ts = new Date('2024-06-15T14:00:00.000Z').getTime();
    expect(floorToHour(ts)).toBe(ts);
  });
});

describe('floorToMinute', () => {
  it('rundet auf volle Minute ab', () => {
    const ts = new Date('2024-06-15T14:37:45.123Z').getTime();
    const floored = floorToMinute(ts);
    expect(new Date(floored).getUTCSeconds()).toBe(0);
    expect(new Date(floored).getUTCMilliseconds()).toBe(0);
    expect(new Date(floored).getUTCMinutes()).toBe(37);
  });
});

describe('anonymizePosition', () => {
  it('enthält keine Rohdaten – nur cellId und timestampHour', () => {
    const pos = anonymizePosition(52.52, 13.405, H3Resolution.Viertel, NOW);
    expect(pos).not.toHaveProperty('lat');
    expect(pos).not.toHaveProperty('lng');
    expect(pos).not.toHaveProperty('latitude');
    expect(pos).not.toHaveProperty('longitude');
    expect(typeof pos.cellId).toBe('string');
    expect(pos.cellId.length).toBeGreaterThan(0);
  });

  it('erzeugt denselben cellId für nahe beieinander liegende Koordinaten (selbe H3-Zelle)', () => {
    // 52.520 und 52.521 liegen bei Resolution 7 in derselben ~5km²-Zelle
    const pos1 = anonymizePosition(52.520, 13.405, H3Resolution.Viertel, NOW);
    const pos2 = anonymizePosition(52.521, 13.405, H3Resolution.Viertel, NOW);
    expect(pos1.cellId).toBe(pos2.cellId);
  });

  it('erzeugt verschiedene cellIds für weit entfernte Koordinaten', () => {
    const berlin = anonymizePosition(52.52, 13.405, H3Resolution.Viertel, NOW);
    const münchen = anonymizePosition(48.137, 11.576, H3Resolution.Viertel, NOW);
    expect(berlin.cellId).not.toBe(münchen.cellId);
  });

  it('rundet timestampHour auf volle Stunde ab', () => {
    const ts = new Date('2024-06-15T14:37:00.000Z').getTime();
    const pos = anonymizePosition(52.52, 13.405, H3Resolution.Viertel, ts);
    expect(pos.timestampHour).toBe(floorToHour(ts));
    expect(new Date(pos.timestampHour).getUTCMinutes()).toBe(0);
  });
});

describe('isCellInBoundingBox', () => {
  it('gibt true zurück wenn Zellmittelpunkt innerhalb der BBox liegt', () => {
    const pos = anonymizePosition(52.52, 13.405, H3Resolution.Viertel, NOW);
    expect(isCellInBoundingBox(pos.cellId, {
      north: 53.0, south: 52.0, east: 14.0, west: 13.0,
    })).toBe(true);
  });

  it('gibt false zurück wenn Zellmittelpunkt außerhalb der BBox liegt', () => {
    const pos = anonymizePosition(52.52, 13.405, H3Resolution.Viertel, NOW);
    expect(isCellInBoundingBox(pos.cellId, {
      north: 50.0, south: 48.0, east: 12.0, west: 11.0,
    })).toBe(false);
  });
});

// ─── consensus.ts ────────────────────────────────────────────────────────────

describe('deduplicateReports', () => {
  it('entfernt doppelte Reports anhand der ID', () => {
    const r = makeReport({ id: 'dup-1' });
    const result = deduplicateReports([r, r, r]);
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('dup-1');
  });

  it('behält Reports mit verschiedenen IDs', () => {
    const r1 = makeReport({ id: 'a' });
    const r2 = makeReport({ id: 'b' });
    expect(deduplicateReports([r1, r2])).toHaveLength(2);
  });

  it('gibt leeres Array bei leerem Input zurück', () => {
    expect(deduplicateReports([])).toEqual([]);
  });
});

describe('isLikelySpam', () => {
  it('gibt false zurück wenn unter dem Rate-Limit (< 10/Zelle/Stunde)', () => {
    const existing = Array.from({ length: 5 }, (_, i) => makeReport({ id: `r${i}` }));
    expect(isLikelySpam(makeReport({ id: 'new' }), existing)).toBe(false);
  });

  it('gibt true zurück wenn Rate-Limit erreicht (>= 10/Zelle/Stunde)', () => {
    const existing = Array.from({ length: 10 }, (_, i) => makeReport({ id: `r${i}` }));
    expect(isLikelySpam(makeReport({ id: 'new' }), existing)).toBe(true);
  });

  it('zählt nur Reports aus derselben Zelle', () => {
    const otherCell = createReport({
      lat: 48.137, lng: 11.576,  // München – andere Zelle
      authorityCategory: AuthorityCategory.BundespolizeiBahn,
      authorityVisibility: AuthorityVisibility.EindeutigErkennbar,
      activityType: ObservedActivityType.Identitaetskontrolle,
      confidence: ObservationConfidence.Direkt,
    });
    const manyOtherCell = Array.from({ length: 10 }, () => otherCell);
    // Neue Meldung in Berlin-Zelle: andere Zelle-Reports zählen nicht
    expect(isLikelySpam(makeReport(), manyOtherCell)).toBe(false);
  });

  it('ignoriert Reports die älter als 1 Stunde sind', () => {
    const oldTs = NOW - 2 * 60 * 60 * 1000; // 2h ago
    const old = Array.from({ length: 10 }, (_, i) =>
      makeReport({ id: `old${i}`, reportedAtMinute: floorToMinute(oldTs) }),
    );
    expect(isLikelySpam(makeReport({ id: 'new' }), old)).toBe(false);
  });
});

describe('computeAggregateScore', () => {
  it('gibt 0 zurück bei leerem Array', () => {
    expect(computeAggregateScore([])).toBe(0);
  });

  it('gibt Wert zwischen 0 und 1 zurück', () => {
    const reports = Array.from({ length: 3 }, () => makeReport());
    const score = computeAggregateScore(reports);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(1);
  });

  it('direkte Sichtung hat höheren Score als unsichere', () => {
    const direkt = [makeReport({ confidence: ObservationConfidence.Direkt })];
    const unsicher = [makeReport({ confidence: ObservationConfidence.Unsicher })];
    expect(computeAggregateScore(direkt)).toBeGreaterThan(computeAggregateScore(unsicher));
  });

  it('mehr übereinstimmende Kategorie-Angaben erhöhen den Score', () => {
    // 5 Reports – alle identische Kategorie (maximaler Kategorie-Bonus)
    const homogen = Array.from({ length: 5 }, () =>
      makeReport({ authorityCategory: AuthorityCategory.BundespolizeiBahn }),
    );
    // 5 Reports – jede eine andere Kategorie (minimaler Kategorie-Bonus = 1/5)
    const categories = [
      AuthorityCategory.BundespolizeiBahn,
      AuthorityCategory.LandespolizeiAllgemein,
      AuthorityCategory.AuslaenderbehördeAbschiebung,
      AuthorityCategory.FrontexPatrouille,
      AuthorityCategory.GemeinsameBundLand,
    ] as const;
    const heterogen = categories.map(c => makeReport({ authorityCategory: c }));
    // homogen score = min(1.0 * (0.7 + 0.3 * 1.0), 1) = 1.0
    // heterogen score = min(1.0 * (0.7 + 0.3 * 0.2), 1) = 0.76
    expect(computeAggregateScore(homogen)).toBeGreaterThan(computeAggregateScore(heterogen));
  });
});

describe('aggregateReportsForCell', () => {
  it('gibt leeres Aggregate bei keinen Reports zurück', () => {
    const agg = aggregateReportsForCell('testcell', [], NOW);
    expect(agg.reportCount).toBe(0);
    expect(agg.aggregateScore).toBe(0);
    expect(agg.cellId).toBe('testcell');
  });

  it('filtert Reports außerhalb des 2h-Zeitfensters heraus', () => {
    const oldReport = makeReport({
      reportedAtMinute: floorToMinute(NOW - 3 * 60 * 60 * 1000), // 3h alt
    });
    const freshReport = makeReport({
      reportedAtMinute: floorToMinute(NOW - 30 * 60 * 1000), // 30min alt
    });
    const pos = anonymizePosition(52.52, 13.405, H3Resolution.Viertel, NOW);
    const cellId = pos.cellId;

    const reports = [
      { ...oldReport, position: pos },
      { ...freshReport, position: pos },
    ];

    const agg = aggregateReportsForCell(cellId, reports, NOW);
    // Nur der frische Report soll gezählt werden
    expect(agg.reportCount).toBe(1);
  });

  it('setzt dominantAuthorityCategory auf häufigste Kategorie', () => {
    const pos = anonymizePosition(52.52, 13.405, H3Resolution.Viertel, NOW);
    const reports = [
      makeReport({ position: pos, authorityCategory: AuthorityCategory.BundespolizeiBahn }),
      makeReport({ position: pos, authorityCategory: AuthorityCategory.BundespolizeiBahn }),
      makeReport({ position: pos, authorityCategory: AuthorityCategory.FrontexPatrouille }),
    ];
    const agg = aggregateReportsForCell(pos.cellId, reports, NOW);
    expect(agg.dominantAuthorityCategory).toBe(AuthorityCategory.BundespolizeiBahn);
  });
});

// ─── report-factory.ts ───────────────────────────────────────────────────────

describe('createReport', () => {
  it('enthält keine Rohdaten (lat/lng) im zurückgegebenen Objekt', () => {
    const report = createReport({
      lat: 52.52, lng: 13.405,
      authorityCategory: AuthorityCategory.BundespolizeiBahn,
      authorityVisibility: AuthorityVisibility.EindeutigErkennbar,
      activityType: ObservedActivityType.Identitaetskontrolle,
      confidence: ObservationConfidence.Direkt,
    });
    const str = JSON.stringify(report);
    expect(str).not.toContain('52.52');
    expect(str).not.toContain('13.405');
  });

  it('wirft bei Beschreibung > 280 Zeichen', () => {
    expect(() => createReport({
      lat: 52.52, lng: 13.405,
      authorityCategory: AuthorityCategory.BundespolizeiBahn,
      authorityVisibility: AuthorityVisibility.EindeutigErkennbar,
      activityType: ObservedActivityType.Identitaetskontrolle,
      confidence: ObservationConfidence.Direkt,
      description: 'x'.repeat(281),
    })).toThrow();
  });

  it('erzeugt eindeutige IDs bei mehrfachem Aufruf', () => {
    const draft = {
      lat: 52.52, lng: 13.405,
      authorityCategory: AuthorityCategory.BundespolizeiBahn,
      authorityVisibility: AuthorityVisibility.EindeutigErkennbar,
      activityType: ObservedActivityType.Identitaetskontrolle,
      confidence: ObservationConfidence.Direkt,
    };
    const ids = new Set(Array.from({ length: 20 }, () => createReport(draft).id));
    expect(ids.size).toBe(20);
  });

  it('rundet reportedAtMinute auf volle Minute', () => {
    const ts = new Date('2024-06-15T14:37:45.123Z').getTime();
    const report = createReport({
      lat: 52.52, lng: 13.405,
      authorityCategory: AuthorityCategory.BundespolizeiBahn,
      authorityVisibility: AuthorityVisibility.EindeutigErkennbar,
      activityType: ObservedActivityType.Identitaetskontrolle,
      confidence: ObservationConfidence.Direkt,
    }, ts);
    expect(new Date(report.reportedAtMinute).getUTCSeconds()).toBe(0);
    expect(new Date(report.reportedAtMinute).getUTCMilliseconds()).toBe(0);
  });

  it('ist nach Erstellung eingefroren (immutable)', () => {
    const report = createReport({
      lat: 52.52, lng: 13.405,
      authorityCategory: AuthorityCategory.BundespolizeiBahn,
      authorityVisibility: AuthorityVisibility.EindeutigErkennbar,
      activityType: ObservedActivityType.Identitaetskontrolle,
      confidence: ObservationConfidence.Direkt,
    });
    expect(Object.isFrozen(report)).toBe(true);
  });
});

describe('validateReport', () => {
  it('gibt true für einen validen Report zurück', () => {
    // NOW zum Zeitpunkt der Test-Erstellung verwenden, damit der
    // Report nicht als "zukünftig" eingestuft wird.
    const now = Date.now();
    const report = createReport({
      lat: 52.52, lng: 13.405,
      authorityCategory: AuthorityCategory.BundespolizeiBahn,
      authorityVisibility: AuthorityVisibility.EindeutigErkennbar,
      activityType: ObservedActivityType.Identitaetskontrolle,
      confidence: ObservationConfidence.Direkt,
    }, now);
    expect(validateReport(report, now)).toBe(true);
  });

  it('gibt false für null/undefined zurück', () => {
    expect(validateReport(null, NOW)).toBe(false);
    expect(validateReport(undefined, NOW)).toBe(false);
    expect(validateReport('string', NOW)).toBe(false);
  });

  it('gibt false für fehlende Pflichtfelder zurück', () => {
    const { id: _id, ...withoutId } = makeReport();
    expect(validateReport(withoutId, NOW)).toBe(false);
  });

  it('lehnt Reports mit ungültigem authorityCategory ab', () => {
    const r = { ...makeReport(), authorityCategory: 'ungültig_kategorie' };
    expect(validateReport(r, NOW)).toBe(false);
  });

  it('lehnt veraltete Reports ab (> 24h)', () => {
    const oldTs = NOW - 25 * 60 * 60 * 1000;
    const old = makeReport({ reportedAtMinute: oldTs });
    expect(validateReport(old, NOW)).toBe(false);
  });

  it('lehnt Reports aus der Zukunft ab (> 5min ahead)', () => {
    const futureTs = NOW + 10 * 60 * 1000;
    const future = makeReport({ reportedAtMinute: futureTs });
    expect(validateReport(future, NOW)).toBe(false);
  });
});

describe('validateCellAggregate', () => {
  const validAgg: CellAggregate = {
    cellId: 'testcell123',
    reportCount: 5,
    dominantActivityType: ObservedActivityType.Identitaetskontrolle,
    dominantAuthorityCategory: AuthorityCategory.BundespolizeiBahn,
    lastUpdatedHour: NOW - 30 * 60 * 1000,  // vor 30min
    aggregateScore: 0.75,
  };

  it('gibt true für ein valides CellAggregate zurück', () => {
    expect(validateCellAggregate(validAgg, NOW)).toBe(true);
  });

  it('gibt false bei null/non-object zurück', () => {
    expect(validateCellAggregate(null, NOW)).toBe(false);
    expect(validateCellAggregate(42, NOW)).toBe(false);
    expect(validateCellAggregate('string', NOW)).toBe(false);
  });

  it('lehnt aggregateScore > 1 ab (Score-Inflation-Schutz)', () => {
    expect(validateCellAggregate({ ...validAgg, aggregateScore: 1.5 }, NOW)).toBe(false);
  });

  it('lehnt aggregateScore < 0 ab', () => {
    expect(validateCellAggregate({ ...validAgg, aggregateScore: -0.1 }, NOW)).toBe(false);
  });

  it('lehnt negativen reportCount ab', () => {
    expect(validateCellAggregate({ ...validAgg, reportCount: -1 }, NOW)).toBe(false);
  });

  it('lehnt zu großen reportCount ab (> 10000)', () => {
    expect(validateCellAggregate({ ...validAgg, reportCount: 99999 }, NOW)).toBe(false);
  });

  it('lehnt unbekannte dominantActivityType-Werte ab', () => {
    expect(validateCellAggregate(
      { ...validAgg, dominantActivityType: 'xss_payload<script>' }, NOW,
    )).toBe(false);
  });

  it('lehnt unbekannte dominantAuthorityCategory-Werte ab', () => {
    expect(validateCellAggregate(
      { ...validAgg, dominantAuthorityCategory: 'fakeauth' }, NOW,
    )).toBe(false);
  });

  it('lehnt Aggregates älter als 2h ab', () => {
    const oldAgg = { ...validAgg, lastUpdatedHour: NOW - 3 * 60 * 60 * 1000 };
    expect(validateCellAggregate(oldAgg, NOW)).toBe(false);
  });

  it('lehnt leere cellId ab', () => {
    expect(validateCellAggregate({ ...validAgg, cellId: '' }, NOW)).toBe(false);
  });

  it('akzeptiert source: "external" mit gültigem cerfJurisdiction', () => {
    expect(validateCellAggregate(
      { ...validAgg, source: 'external', cerfJurisdiction: 'US' }, NOW,
    )).toBe(true);
  });

  it('lehnt ungültige source-Werte ab', () => {
    expect(validateCellAggregate({ ...validAgg, source: 'invalid_value' }, NOW)).toBe(false);
  });

  it('akzeptiert fehlendes source-Feld (backward compatibility)', () => {
    const { ...aggWithoutSource } = validAgg;
    expect(validateCellAggregate(aggWithoutSource, NOW)).toBe(true);
  });

  it('akzeptiert cerfVerifiedBy: ngo', () => {
    expect(validateCellAggregate(
      { ...validAgg, source: 'external', cerfVerifiedBy: 'ngo' }, NOW,
    )).toBe(true);
  });

  it('akzeptiert cerfVerifiedBy: community', () => {
    expect(validateCellAggregate(
      { ...validAgg, source: 'external', cerfVerifiedBy: 'community' }, NOW,
    )).toBe(true);
  });

  it('lehnt ungültigen cerfVerifiedBy-Wert ab', () => {
    expect(validateCellAggregate({ ...validAgg, cerfVerifiedBy: 'fake_authority' }, NOW)).toBe(false);
  });
});

// ─── abuse.ts ────────────────────────────────────────────────────────────────

describe('computeAbusePenalty', () => {
  it('gibt 0 zurück wenn keine Flags vorhanden', () => {
    expect(computeAbusePenalty('report-1', [])).toBe(0);
  });

  it('steigt mit Anzahl der Flags', () => {
    const flags = [1, 2].map(i =>
      createAbuseFlag('report-1', AbuseReason.PoliticalSpam, 'cell-x', NOW - i * 1000),
    );
    const p1 = computeAbusePenalty('report-1', flags.slice(0, 1));
    const p2 = computeAbusePenalty('report-1', flags);
    expect(p2).toBeGreaterThan(p1);
  });

  it('erreicht Maximum (1.0) bei MAX_FLAGS_BEFORE_ZERO Flags', () => {
    // MAX_FLAGS_BEFORE_ZERO = 3
    const flags = [1, 2, 3].map(i =>
      createAbuseFlag('report-1', AbuseReason.PoliticalSpam, 'cell-x', NOW - i * 1000),
    );
    expect(computeAbusePenalty('report-1', flags)).toBe(1.0);
  });

  it('ignoriert Flags für andere Report-IDs', () => {
    const flags: AbuseFlag[] = [
      createAbuseFlag('other-report', AbuseReason.PoliticalSpam, 'cell-x', NOW),
    ];
    expect(computeAbusePenalty('report-1', flags)).toBe(0);
  });
});

describe('isDuplicateFlag', () => {
  it('gibt true zurück bei gleicher reportId + reason in den letzten 24h', () => {
    const existing = createAbuseFlag('r1', AbuseReason.PoliticalSpam, 'cell-x', NOW - 60_000);
    const newFlag = createAbuseFlag('r1', AbuseReason.PoliticalSpam, 'cell-x', NOW);
    expect(isDuplicateFlag(newFlag, [existing])).toBe(true);
  });

  it('gibt false zurück bei verschiedener reason', () => {
    const existing = createAbuseFlag('r1', AbuseReason.PoliticalSpam, 'cell-x', NOW - 60_000);
    const newFlag = createAbuseFlag('r1', AbuseReason.Other, 'cell-x', NOW);
    expect(isDuplicateFlag(newFlag, [existing])).toBe(false);
  });

  it('gibt false zurück wenn existierender Flag älter als 24h ist', () => {
    const oldFlag = createAbuseFlag('r1', AbuseReason.PoliticalSpam, 'cell-x', NOW - 25 * 60 * 60 * 1000);
    const newFlag = createAbuseFlag('r1', AbuseReason.PoliticalSpam, 'cell-x', NOW);
    expect(isDuplicateFlag(newFlag, [oldFlag])).toBe(false);
  });
});

describe('createAbuseFlag', () => {
  it('erzeugt ein eingefriorenes Objekt mit korrekten Werten', () => {
    const flag = createAbuseFlag('report-1', AbuseReason.PoliticalSpam, 'cell-x', NOW);
    expect(Object.isFrozen(flag)).toBe(true);
    expect(flag.reportId).toBe('report-1');
    expect(flag.reason).toBe(AbuseReason.PoliticalSpam);
    expect(flag.cellId).toBe('cell-x');
    // flaggedAtHour muss auf volle Stunde gerundet sein
    expect(flag.flaggedAtHour % 3_600_000).toBe(0);
  });
});

// ─── display.ts ──────────────────────────────────────────────────────────────

describe('scoreToColor', () => {
  it('gibt rot für Score >= 0.8 zurück', () => {
    expect(scoreToColor(0.8)).toBe('#E24B4A');
    expect(scoreToColor(1.0)).toBe('#E24B4A');
  });

  it('gibt amber für Score >= 0.5 zurück', () => {
    expect(scoreToColor(0.5)).toBe('#EF9F27');
    expect(scoreToColor(0.79)).toBe('#EF9F27');
  });

  it('gibt grün für Score >= 0.2 zurück', () => {
    expect(scoreToColor(0.2)).toBe('#1D9E75');
    expect(scoreToColor(0.49)).toBe('#1D9E75');
  });

  it('gibt blau für Score < 0.2 zurück', () => {
    expect(scoreToColor(0.0)).toBe('#378ADD');
    expect(scoreToColor(0.19)).toBe('#378ADD');
  });

  it('liefert konsistente Hex-Strings', () => {
    [0, 0.1, 0.2, 0.5, 0.8, 1.0].forEach(s => {
      expect(scoreToColor(s)).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });
});
