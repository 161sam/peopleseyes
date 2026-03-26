import { ObservedActivityType, AuthorityCategory } from '@peopleseyes/core-model';

/**
 * Priorisierte Behörden-Vorschläge pro Aktivitätstyp.
 * Basiert auf statistischen Mustern aus DE/EU-Meldedaten.
 * Reihenfolge: wahrscheinlichste Behörde zuerst.
 * AuthorityCategory.Unbekannt ist immer implizit verfügbar (nicht in der Liste).
 */
export const ACTIVITY_TO_AUTHORITY_HINTS: Record<
  ObservedActivityType,
  readonly AuthorityCategory[]
> = {
  [ObservedActivityType.StationaereKontrolle]: [
    AuthorityCategory.BundespolizeiGrenze,
    AuthorityCategory.BundespolizeiBahn,
    AuthorityCategory.LandespolizeiSchwerpunktkontrolle,
    AuthorityCategory.GemeinsameBundLand,
  ],
  [ObservedActivityType.Identitaetskontrolle]: [
    AuthorityCategory.BundespolizeiBahn,
    AuthorityCategory.BundespolizeiMobil,
    AuthorityCategory.LandespolizeiAllgemein,
    AuthorityCategory.AuslaenderbehördeVorführung,
  ],
  [ObservedActivityType.Fahrzeugkontrolle]: [
    AuthorityCategory.LandespolizeiAllgemein,
    AuthorityCategory.BundespolizeiGrenze,
    AuthorityCategory.BundespolizeiMobil,
  ],
  [ObservedActivityType.Patrouille]: [
    AuthorityCategory.BundespolizeiBahn,
    AuthorityCategory.BundespolizeiFlughafen,
    AuthorityCategory.LandespolizeiAllgemein,
    AuthorityCategory.FrontexPatrouille,
  ],
  [ObservedActivityType.Zugriff]: [
    AuthorityCategory.LandespolizeiRazzia,
    AuthorityCategory.AuslaenderbehördeAbschiebung,
    AuthorityCategory.GemeinsameBundLand,
    AuthorityCategory.BundespolizeiMobil,
  ],
  [ObservedActivityType.Transport]: [
    AuthorityCategory.AuslaenderbehördeAbschiebung,
    AuthorityCategory.AuslaenderbehördeVorführung,
    AuthorityCategory.GemeinsameBundLand,
    AuthorityCategory.GemeinsameMitFrontex,
  ],
  [ObservedActivityType.DurchsuchungGebaeude]: [
    AuthorityCategory.LandespolizeiRazzia,
    AuthorityCategory.AuslaenderbehördeUnterkuenfte,
    AuthorityCategory.GemeinsameBundLand,
  ],
  [ObservedActivityType.Sonstiges]: [
    AuthorityCategory.LandespolizeiAllgemein,
    AuthorityCategory.BundespolizeiMobil,
    AuthorityCategory.Unbekannt,
  ],
};
