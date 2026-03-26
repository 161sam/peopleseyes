/**
 * Converts between PeoplesEyes-internal types and CERF.
 *
 * This file is the bridge between the two projects.
 * Other projects (Firewatch, Iceout) implement their own converters.
 */
import type { CerfReport, CerfAgencyGroup, CerfActivityType, CerfJurisdiction } from './types.js';
import { CERF_VERSION } from './types.js';

/** Maps PeoplesEyes AuthorityCategory string values to CerfAgencyGroup */
export const AUTHORITY_TO_CERF_GROUP: Record<string, CerfAgencyGroup> = {
  'bundespolizei_bahn':                     'federal_border',
  'bundespolizei_flughafen':                'federal_border',
  'bundespolizei_grenze':                   'federal_border',
  'bundespolizei_mobil':                    'federal_border',
  'landespolizei_schwerpunktkontrolle':      'local_police',
  'landespolizei_razzia':                   'local_police',
  'landespolizei_allgemein':                'local_police',
  'auslaenderbehörde_unterkuenfte':         'immigration',
  'auslaenderbehörde_vorführung':           'immigration',
  'auslaenderbehörde_abschiebung':          'immigration',
  'frontex_patrouille':                     'federal_border',
  'frontex_operation':                      'federal_border',
  'gemeinsam_bund_land':                    'joint_operation',
  'gemeinsam_mit_frontex':                  'joint_operation',
  'unbekannt':                              'unknown',
};

/** Maps PeoplesEyes ObservedActivityType string values to CerfActivityType */
export const ACTIVITY_TO_CERF_TYPE: Record<string, CerfActivityType> = {
  'identitaetskontrolle':   'id_check',
  'stationaere_kontrolle':  'checkpoint',
  'patrouille':             'patrol',
  'fahrzeugkontrolle':      'vehicle_stop',
  'zugriff':                'arrest',
  'transport':              'transport',
  'durchsuchung_gebaeude':  'search',
  'sonstiges':              'other',
};

export interface AggregateToCerfInput {
  cellId: string;
  dominantAuthorityCategory: string;
  dominantActivityType: string;
  lastUpdatedHour: number;
  aggregateScore: number;
  reportCount: number;
  source?: string;
  signature?: string;
  signerPublicKey?: string;
}

/**
 * Converts a PeoplesEyes CellAggregate into a CerfReport object.
 * Confidence is derived from aggregateScore.
 */
export function aggregateToCerf(
  agg: AggregateToCerfInput,
  jurisdiction: CerfJurisdiction = 'EU',
): CerfReport {
  const confidence =
    agg.aggregateScore >= 0.7 ? 'direct' :
    agg.aggregateScore >= 0.3 ? 'indirect' : 'uncertain';

  return {
    cerf: CERF_VERSION,
    reportedAtHour: agg.lastUpdatedHour,
    jurisdiction,
    h3Cell: agg.cellId,
    agencyGroup: AUTHORITY_TO_CERF_GROUP[agg.dominantAuthorityCategory] ?? 'unknown',
    activityType: ACTIVITY_TO_CERF_TYPE[agg.dominantActivityType] ?? 'other',
    confidence,
    verifiedBy: null,
    source: agg.source ?? 'peopleseyes',
    ...(agg.signature !== undefined ? { signature: agg.signature } : {}),
    ...(agg.signerPublicKey !== undefined ? { signerPublicKey: agg.signerPublicKey } : {}),
  };
}
