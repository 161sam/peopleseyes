import type { AuthorityCategory, AuthorityVisibility } from './authority.js';
import type { AnonymizedPosition, H3CellId } from './geo.js';

/**
 * Wie sicher ist die Beobachtung?
 * Wird vom Melder selbst angegeben – kein automatisches Scoring.
 */
export enum ObservationConfidence {
  /** "Ich habe es selbst direkt gesehen" */
  Direkt = 'direkt',
  /** "Ich habe es aus einer zuverlässigen Quelle" */
  Weitergeleitet = 'weitergeleitet',
  /** "Ich bin nicht sicher" */
  Unsicher = 'unsicher',
}

/**
 * Aktivitäts-Typ – was wurde beobachtet?
 * Beschreibt den Vorgang, nicht die Person.
 */
export enum ObservedActivityType {
  /** Dokumentenkontrolle / Identitätsprüfung */
  Identitaetskontrolle = 'identitaetskontrolle',
  /** Stationäre Kontrolle (Checkpoint) */
  StationaereKontrolle = 'stationaere_kontrolle',
  /** Mobile Streife, Fußpatrouille */
  Patrouille = 'patrouille',
  /** Fahrzeugkontrolle */
  Fahrzeugkontrolle = 'fahrzeugkontrolle',
  /** Zugriff / Festnahme beobachtet */
  Zugriff = 'zugriff',
  /** Transport von Personen (Fahrzeuge, Busse) */
  Transport = 'transport',
  /** Durchsuchung Gebäude / Unterkunft */
  DurchsuchungGebaeude = 'durchsuchung_gebaeude',
  /** Nicht eindeutig kategorisierbar */
  Sonstiges = 'sonstiges',
}

/**
 * Unveränderliche Kern-Daten einer Meldung.
 * Alle Felder sind readonly – Reports sind immutable nach Erstellung.
 */
export interface Report {
  /**
   * Lokale UUID (v4), generiert auf dem Gerät des Melders.
   * Wird für P2P-Deduplizierung verwendet.
   */
  readonly id: string;

  /** Anonymisierte Position – niemals Rohdaten */
  readonly position: AnonymizedPosition;

  readonly authorityCategory: AuthorityCategory;
  readonly authorityVisibility: AuthorityVisibility;
  readonly activityType: ObservedActivityType;
  readonly confidence: ObservationConfidence;

  /**
   * Unix-Timestamp in Millisekunden, auf Minutengenauigkeit gerundet.
   * Nicht das exakte Ereigniszeitpunkt.
   */
  readonly reportedAtMinute: number;

  /**
   * Freitext-Beschreibung (optional, max. 280 Zeichen).
   * Nutzer werden darauf hingewiesen, keine Personendaten einzutragen.
   */
  readonly description?: string;

  /**
   * Anzahl unabhängiger Meldungen für dieselbe Zelle + Stunde.
   * Wird lokal zusammengeführt – kein Serverwert.
   */
  readonly localConfirmationCount: number;
}

/**
 * Aggregierte Zelldaten für die Kartenansicht.
 * Wird aus mehreren Reports derselben Zelle berechnet.
 */
export interface CellAggregate {
  readonly cellId: H3CellId;
  readonly reportCount: number;
  readonly dominantActivityType: ObservedActivityType;
  readonly dominantAuthorityCategory: AuthorityCategory;
  /** Zuletzt aktualisiert (Stunden-Timestamp) */
  readonly lastUpdatedHour: number;
  /**
   * Confidence-Score 0–1, berechnet aus Anzahl + Übereinstimmung.
   * Rein lokal/clientseitig – kein Server-Wert.
   */
  readonly aggregateScore: number;
  /**
   * Datenquelle dieses Aggregats.
   * 'peopleseyes' → lokale Nutzer-Meldung aus dieser App
   * 'manual'      → direkte Nutzer-Meldung (älterer Wert, gleichwertig zu 'peopleseyes')
   * 'external'    → aus einem externen CERF-Feed importiert
   */
  readonly source?: 'peopleseyes' | 'manual' | 'external';

  /**
   * CERF-Jurisdiktion wenn source === 'external'.
   * Wird für Layer-Unterscheidung auf der Karte genutzt.
   */
  readonly cerfJurisdiction?: 'EU' | 'US' | 'global';

  /**
   * Verifikationsstatus wenn source === 'external'.
   */
  readonly cerfVerifiedBy?: null | 'community' | 'ngo';

  /** Optionale ECDSA-Signatur für P2P-Integrität */
  readonly signature?: string;
  /** Öffentlicher Schlüssel des signierenden Peers */
  readonly signerPublicKey?: string;
}

/**
 * Metadaten eines Reports für P2P-Sync.
 * Enthält keine inhaltlichen Daten, nur Synchronisations-Infos.
 */
export interface ReportSyncMeta {
  readonly id: string;
  readonly reportedAtMinute: number;
  readonly cellId: H3CellId;
  /** Versionsnummer für Konfliktlösung */
  readonly version: number;
}
