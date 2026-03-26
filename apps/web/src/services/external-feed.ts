/**
 * Lädt externe CERF-kompatible Feeds und konvertiert sie in CellAggregates.
 *
 * Feeds werden gecacht (5-Minuten-TTL in localStorage).
 * Alle eingehenden Daten werden durch validateCerfReport() geprüft.
 * Nicht-verifizierbare Einträge werden als unverified akzeptiert,
 * aber im CellAggregate mit source: 'external' markiert.
 */

import {
  validateCerfFeed,
  validateCerfReport,
  ACTIVITY_TO_CERF_TYPE,
  AUTHORITY_TO_CERF_GROUP,
} from '@cerf/protocol';
import type {
  CerfAgencyGroup,
  CerfActivityType,
  CerfConfidence,
  CerfVerificationStatus,
} from '@cerf/protocol';
import type { CellAggregate } from '@peopleseyes/core-model';
import { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';

// ─── Reverse mappings: CERF → PeoplesEyes ────────────────────────────────────

// Invert AUTHORITY_TO_CERF_GROUP — pick first (most specific) match per group
const CERF_GROUP_TO_AUTHORITY: Record<CerfAgencyGroup, AuthorityCategory> = {
  federal_border:  AuthorityCategory.BundespolizeiBahn,
  federal_other:   AuthorityCategory.BundespolizeiMobil,
  local_police:    AuthorityCategory.LandespolizeiAllgemein,
  immigration:     AuthorityCategory.AuslaenderbehördeAbschiebung,
  joint_operation: AuthorityCategory.GemeinsameBundLand,
  unknown:         AuthorityCategory.Unbekannt,
};

// Invert ACTIVITY_TO_CERF_TYPE
const CERF_TYPE_TO_ACTIVITY: Record<CerfActivityType, ObservedActivityType> = {
  id_check:      ObservedActivityType.Identitaetskontrolle,
  checkpoint:    ObservedActivityType.StationaereKontrolle,
  patrol:        ObservedActivityType.Patrouille,
  vehicle_stop:  ObservedActivityType.Fahrzeugkontrolle,
  arrest:        ObservedActivityType.Zugriff,
  transport:     ObservedActivityType.Transport,
  search:        ObservedActivityType.DurchsuchungGebaeude,
  other:         ObservedActivityType.Sonstiges,
};

const CERF_CONFIDENCE_TO_SCORE: Record<CerfConfidence, number> = {
  direct:   0.8,
  indirect: 0.5,
  uncertain: 0.2,
};

// Suppress unused-import warnings — these mappings are imported for documentation
void ACTIVITY_TO_CERF_TYPE;
void AUTHORITY_TO_CERF_GROUP;

// ─── Cache TTL ────────────────────────────────────────────────────────────────

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

interface CachedFeedEntry {
  ts: number;
  data: CellAggregate[];
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FeedConfig {
  url: string;
  label: string;       // e.g. "Iceout (USA)" — for UI display
  jurisdiction: 'EU' | 'US' | 'global';
  enabled: boolean;
}

export const DEFAULT_EXTERNAL_FEEDS: FeedConfig[] = [
  {
    url: 'https://firewatch-ice.vercel.app/api/cerf-feed.json',
    label: 'Firewatch (USA)',
    jurisdiction: 'US',
    enabled: false,  // opt-in, not automatically active
  },
  {
    url: 'https://iceout.org/api/cerf-feed.json',
    label: 'Iceout / People Over Papers (USA)',
    jurisdiction: 'US',
    enabled: false,
  },
];

// ─── Feed loader ──────────────────────────────────────────────────────────────

/**
 * Fetches a single external CERF feed and converts it to CellAggregates.
 * Returns an empty array on any error — external feeds are non-critical.
 */
export async function fetchExternalFeed(config: FeedConfig): Promise<CellAggregate[]> {
  const cacheKey = `pe:cerf-cache:${config.url}`;

  // 1. Check cache
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached !== null) {
      const entry = JSON.parse(cached) as CachedFeedEntry;
      if (Date.now() - entry.ts < CACHE_TTL_MS) {
        return entry.data;
      }
    }
  } catch {
    // malformed cache entry — proceed to fetch
  }

  // 2. Fetch
  try {
    const response = await fetch(config.url, {
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return [];

    const raw: unknown = await response.json();

    // 3. Validate feed envelope
    if (!validateCerfFeed(raw)) return [];

    // 4. Filter valid reports
    const nowMs = Date.now();
    const validReports = raw.reports.filter(r => validateCerfReport(r, nowMs));

    // 5. Convert to CellAggregates
    const aggregates: CellAggregate[] = validReports.map(report => {
      const authority = CERF_GROUP_TO_AUTHORITY[report.agencyGroup] ?? AuthorityCategory.Unbekannt;
      const activity = CERF_TYPE_TO_ACTIVITY[report.activityType] ?? ObservedActivityType.Sonstiges;
      const score = CERF_CONFIDENCE_TO_SCORE[report.confidence] ?? 0.2;
      const verifiedBy = report.verifiedBy as CerfVerificationStatus;

      const agg: CellAggregate = {
        cellId: report.h3Cell,
        reportCount: 1,
        dominantActivityType: activity,
        dominantAuthorityCategory: authority,
        lastUpdatedHour: report.reportedAtHour,
        aggregateScore: score,
        source: 'external',
        cerfJurisdiction: config.jurisdiction,
        ...(verifiedBy !== undefined ? { cerfVerifiedBy: verifiedBy } : {}),
      };
      return agg;
    });

    // 6. Cache result
    try {
      const entry: CachedFeedEntry = { ts: Date.now(), data: aggregates };
      localStorage.setItem(cacheKey, JSON.stringify(entry));
    } catch {
      // storage full or unavailable — ignore
    }

    return aggregates;
  } catch {
    // network error, parse error, timeout — never throw
    return [];
  }
}

/**
 * Loads all enabled feeds in parallel and merges the results.
 * Deduplicates by cellId — entries appearing first win.
 */
export async function loadAllEnabledFeeds(
  configs: FeedConfig[] = DEFAULT_EXTERNAL_FEEDS,
): Promise<CellAggregate[]> {
  const enabled = configs.filter(c => c.enabled);
  if (enabled.length === 0) return [];

  const results = await Promise.all(enabled.map(fetchExternalFeed));
  const merged = results.flat();

  // Deduplicate by cellId — keep first occurrence
  const seen = new Set<string>();
  return merged.filter(agg => {
    if (seen.has(agg.cellId)) return false;
    seen.add(agg.cellId);
    return true;
  });
}
