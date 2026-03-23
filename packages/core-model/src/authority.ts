/**
 * Behörden-Klassifizierung für EU/D.
 *
 * Formulierung bewusst deskriptiv-neutral (was beobachtet wurde),
 * nicht wertend. Keine Schlussfolgerungen über Absichten.
 */

export enum AuthorityCategory {
  /** Bundespolizei – Bahn, Flughäfen, Grenzübergänge */
  BundespolizeiBahn = 'bundespolizei_bahn',
  BundespolizeiFlughafen = 'bundespolizei_flughafen',
  BundespolizeiGrenze = 'bundespolizei_grenze',
  BundespolizeiMobil = 'bundespolizei_mobil',

  /** Landespolizei */
  LandespolizeiSchwerpunktkontrolle = 'landespolizei_schwerpunktkontrolle',
  LandespolizeiRazzia = 'landespolizei_razzia',
  LandespolizeiAllgemein = 'landespolizei_allgemein',

  /** Ausländerbehörde / ABH */
  AuslaenderbehördeUnterkuenfte = 'auslaenderbehörde_unterkuenfte',
  AuslaenderbehördeVorführung = 'auslaenderbehörde_vorführung',
  AuslaenderbehördeAbschiebung = 'auslaenderbehörde_abschiebung',

  /** Frontex / EU-Grenzschutz */
  FrontexPatrouille = 'frontex_patrouille',
  FrontexOperation = 'frontex_operation',

  /** Gemeinsame Einsätze */
  GemeinsameBundLand = 'gemeinsam_bund_land',
  GemeinsameMitFrontex = 'gemeinsam_mit_frontex',

  /** Nicht eindeutig zuordenbar */
  Unbekannt = 'unbekannt',
}

/** Sichtbarkeit / Erkennungsgrad der Behörde */
export enum AuthorityVisibility {
  /** Klar erkennbar an Uniform/Fahrzeug */
  EindeutigErkennbar = 'eindeutig_erkennbar',
  /** Zivil, aber durch Kontext identifizierbar */
  Zivil = 'zivil',
  /** Nicht sicher bestimmbar */
  Unklar = 'unklar',
}
