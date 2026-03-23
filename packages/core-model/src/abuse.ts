/**
 * Abuse-Reporting – Flagging verdächtiger Meldungen.
 *
 * Nutzer können eine Meldung als verdächtig markieren.
 * Flags werden lokal aggregiert und senken den CellAggregate-Score.
 * Es gibt keine zentrale Meldestelle – alles läuft über P2P.
 */

export enum AbuseReason {
  /** Meldung scheint erfunden */
  LikelyFalse = 'likely_false',
  /** Meldung enthält Personendaten */
  ContainsPersonalData = 'contains_personal_data',
  /** Meldung ist politisch motivierter Spam */
  PoliticalSpam = 'political_spam',
  /** Meldung ist ein Duplikat */
  Duplicate = 'duplicate',
  /** Sonstiger Grund */
  Other = 'other',
}

export interface AbuseFlag {
  /** ID des gemeldeten Reports */
  readonly reportId: string;
  readonly reason: AbuseReason;
  /** Timestamp auf Stundengenauigkeit */
  readonly flaggedAtHour: number;
  /** Zell-ID des gemeldeten Reports (für Aggregate-Update) */
  readonly cellId: string;
}
