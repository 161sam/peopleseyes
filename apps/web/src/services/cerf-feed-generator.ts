/**
 * Generiert einen CERF-konformen Feed aus den lokalen CellAggregates.
 *
 * Der Feed wird im Cache-Storage gecacht und via Service Worker ausgeliefert.
 * Endpunkt (via Service Worker Route): GET /cerf-feed.json
 *
 * Privacy: Der Feed enthält nur bereits aggregierte und anonymisierte Daten
 * (H3-Zellen, keine GPS, keine Nutzeridentitäten) — identisch mit dem was
 * bereits via GUN.js P2P geteilt wird.
 */

import { aggregateToCerf, CERF_VERSION } from '@cerf/protocol';
import type { CellAggregate } from '@peopleseyes/core-model';
import type { CerfFeed } from '@cerf/protocol';

export function generateCerfFeed(aggregates: CellAggregate[]): CerfFeed {
  return {
    cerf: CERF_VERSION,
    generatedAt: Date.now(),
    source: 'peopleseyes',
    jurisdiction: 'EU',
    reports: aggregates
      .filter(a => a.source === 'peopleseyes' || a.source === 'manual')  // keine re-exported externen Daten
      .map(a => aggregateToCerf(a, 'EU')),
  };
}
