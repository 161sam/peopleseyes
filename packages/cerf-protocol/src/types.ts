/**
 * CERF – Civic Enforcement Report Format
 * Version 0.1.0
 *
 * Open protocol for anonymized enforcement reports.
 * Developed as an interoperability layer between PeoplesEyes (EU),
 * Firewatch and Iceout (USA), and comparable tools worldwide.
 *
 * Design principles:
 * - Minimal required schema, optional extensions
 * - Jurisdiction-agnostic (EU, USA, global)
 * - Privacy-by-default: no raw GPS, only H3 cells
 * - Cryptographically verifiable via ECDSA P-256
 */

/** Protocol version for migration compatibility */
export const CERF_VERSION = '0.1.0' as const;

/**
 * Geographic jurisdiction of the report.
 * Determines which agencyGroup values are meaningful.
 */
export type CerfJurisdiction = 'EU' | 'US' | 'global';

/**
 * Agency group — abstracted across jurisdictions.
 *
 * EU mapping:          US mapping:
 * federal_border  → Bundespolizei / Frontex    → CBP / Border Patrol
 * federal_other   → Federal agencies general   → ICE / FBI
 * local_police    → State police               → Local PD / Sheriff
 * immigration     → Ausländerbehörde           → ICE Enforcement
 * joint_operation → Joint operation            → Joint Task Force
 * unknown         → Unknown                    → Unknown
 */
export type CerfAgencyGroup =
  | 'federal_border'
  | 'federal_other'
  | 'local_police'
  | 'immigration'
  | 'joint_operation'
  | 'unknown';

/**
 * Activity type — jurisdiction-agnostic.
 *
 * checkpoint     → Stationäre Kontrolle / ICE Checkpoint
 * patrol         → Patrouille / Mobile patrol
 * id_check       → Identitätskontrolle / ID Check
 * arrest         → Zugriff / Arrest
 * transport      → Personentransport
 * search         → Durchsuchung / Raid
 * vehicle_stop   → Fahrzeugkontrolle / Traffic Stop
 * other          → Other
 */
export type CerfActivityType =
  | 'checkpoint'
  | 'patrol'
  | 'id_check'
  | 'arrest'
  | 'transport'
  | 'search'
  | 'vehicle_stop'
  | 'other';

/**
 * Confidence level of the report.
 * direct     → Reporter observed it themselves
 * indirect   → Passed on from a trusted person
 * uncertain  → Uncertain
 */
export type CerfConfidence = 'direct' | 'indirect' | 'uncertain';

/**
 * Verification status.
 * null        → Unverified (default for crowd reports)
 * community   → Confirmed by community moderators
 * ngo         → Signed by a trusted NGO/RRN
 */
export type CerfVerificationStatus = null | 'community' | 'ngo';

/**
 * A CERF-compliant report.
 * Required fields are kept minimal for maximum interoperability.
 */
export interface CerfReport {
  /** Protocol version */
  readonly cerf: typeof CERF_VERSION;

  /**
   * Unix timestamp in milliseconds, rounded to the full hour.
   * NEVER exact timestamp — prevents temporal re-identification.
   */
  readonly reportedAtHour: number;

  /** Geographic jurisdiction */
  readonly jurisdiction: CerfJurisdiction;

  /**
   * H3 cell ID (h3-js format).
   * Resolution 7 ≈ 5 km² recommended. Never raw GPS.
   */
  readonly h3Cell: string;

  /** Agency group */
  readonly agencyGroup: CerfAgencyGroup;

  /** Observed activity */
  readonly activityType: CerfActivityType;

  /** Confidence level of the reporter */
  readonly confidence: CerfConfidence;

  /** Verification status */
  readonly verifiedBy: CerfVerificationStatus;

  /**
   * Source tool that generated this report.
   * Known values: 'peopleseyes' | 'firewatch' | 'iceout' | 'manual'
   * Open for new implementations.
   */
  readonly source: string;

  /**
   * ECDSA-P256-SHA256 signature over all required fields except signature/signerPublicKey.
   * Signature input: cerf|reportedAtHour|jurisdiction|h3Cell|agencyGroup|activityType|confidence|source
   * Base64-encoded.
   */
  readonly signature?: string;

  /**
   * SPKI-encoded public key of the signer as Base64.
   * Ephemeral — does not identify a person, only the session/instance.
   */
  readonly signerPublicKey?: string;

  /**
   * Optional extension fields for tool-specific data.
   * MUST NOT contain personal data.
   * Ignored during validation, not rejected.
   */
  readonly extensions?: Record<string, unknown>;
}

/**
 * A CERF feed is an array of CerfReports.
 * Minimal feed format for HTTP endpoints.
 */
export interface CerfFeed {
  readonly cerf: typeof CERF_VERSION;
  readonly generatedAt: number;         // Unix timestamp ms
  readonly source: string;              // Feed source
  readonly jurisdiction: CerfJurisdiction;
  readonly reports: readonly CerfReport[];
}
