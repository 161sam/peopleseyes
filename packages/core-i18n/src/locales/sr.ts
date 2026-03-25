import { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';
import type { Translations } from '../schema.js';

export const sr: Translations = {
  app: { name: 'PeoplesEyes', tagline: 'Posmatramo zajedno. Dokumentujemo bezbedno.' },

  nav: { map: 'Mapa', report: 'Prijavi', rights: 'Prava', evidence: 'Dokazi', settings: 'Podešavanja' },

  map: {
    title: 'Aktuelna zapažanja',
    noReports: 'Nema aktuelnih prijava u ovoj oblasti.',
    loading: 'Učitavanje mape…',
    zoomIn: 'Zumiraj za detalje',
    reportHere: 'Prijavi ovde',
    lastUpdated: 'Poslednje ažuriranje',
    reportsInArea: 'Prijave u ovoj oblasti',
  },

  report: {
    title: 'Prijavi zapažanje',
    subtitle: 'Tvoja prijava je anonimna. Sirovi podaci o lokaciji ne napuštaju uređaj.',
    step: {
      authority: 'Koja vlast?',
      activity: 'Šta je zapaženo?',
      confidence: 'Koliko si siguran/na?',
      description: 'Opcioni opis',
      confirm: 'Potvrdi',
    },
    authorityLabel: 'Vlast',
    activityLabel: 'Aktivnost',
    confidenceLabel: 'Sigurnost',
    descriptionLabel: 'Opis (opciono)',
    descriptionPlaceholder: 'Kratak, činjenički opis zapaženog…',
    descriptionHint: 'Ne unosi lične podatke, imena ni registarske tablice. Maks. 280 znakova.',
    submitButton: 'Prijavi anonimno',
    cancelButton: 'Otkaži',
    successMessage: 'Prijava je anonimno poslata.',
    searchAuthority: 'Pretraži vlast…',
    groupFederal: 'Savezna policija',
    groupState: 'Zemaljska policija',
    groupImmigration: 'Zavod za strance',
    groupFrontex: 'Fronteks / Zajednička',
    unknownAuthority: 'Nije jasno prepoznatljivo →',
    activityGroupControl: 'Kontrola',
    activityGroupOperation: 'Operacija',
    legalDisclaimer:
      'Ova aplikacija služi za dokumentaciju i informisanje. Lažne prijave mogu imati pravne posledice. Prijavljuj samo ono što si zaista video/la.',
  },

  authority: {
    [AuthorityCategory.BundespolizeiBahn]: 'Savezna policija (Železnica / Stanica)',
    [AuthorityCategory.BundespolizeiFlughafen]: 'Savezna policija (Aerodrom)',
    [AuthorityCategory.BundespolizeiGrenze]: 'Savezna policija (Granični prelaz)',
    [AuthorityCategory.BundespolizeiMobil]: 'Savezna policija (mobilna)',
    [AuthorityCategory.LandespolizeiSchwerpunktkontrolle]: 'Zemaljska policija – Pojačana kontrola',
    [AuthorityCategory.LandespolizeiRazzia]: 'Zemaljska policija – Racija / Velika operacija',
    [AuthorityCategory.LandespolizeiAllgemein]: 'Zemaljska policija (opšta)',
    [AuthorityCategory.AuslaenderbehördeUnterkuenfte]: 'Zavod za strance – Smeštaj',
    [AuthorityCategory.AuslaenderbehördeVorführung]: 'Zavod za strance – Pozivanje',
    [AuthorityCategory.AuslaenderbehördeAbschiebung]: 'Zavod za strance – Deportacija',
    [AuthorityCategory.FrontexPatrouille]: 'Fronteks – Patrola',
    [AuthorityCategory.FrontexOperation]: 'Fronteks – Operacija',
    [AuthorityCategory.GemeinsameBundLand]: 'Zajednička savezno-zemaljska operacija',
    [AuthorityCategory.GemeinsameMitFrontex]: 'Zajednička operacija sa Fronteksom',
    [AuthorityCategory.Unbekannt]: 'Nije jasno prepoznatljivo',
  },

  activity: {
    [ObservedActivityType.Identitaetskontrolle]: 'Kontrola identiteta / dokumenata',
    [ObservedActivityType.StationaereKontrolle]: 'Fiksna kontrolna tačka',
    [ObservedActivityType.Patrouille]: 'Patrola',
    [ObservedActivityType.Fahrzeugkontrolle]: 'Kontrola vozila',
    [ObservedActivityType.Zugriff]: 'Hapšenje / privođenje zapaženo',
    [ObservedActivityType.Transport]: 'Transport lica (vozilo / autobus)',
    [ObservedActivityType.DurchsuchungGebaeude]: 'Pretres zgrade / smeštaja',
    [ObservedActivityType.Sonstiges]: 'Ostalo',
  },

  confidence: {
    [ObservationConfidence.Direkt]: 'Video/la sam to lično',
    [ObservationConfidence.Weitergeleitet]: 'Preneto iz pouzdanog izvora',
    [ObservationConfidence.Unsicher]: 'Nesigurno – moglo bi biti nešto drugo',
  },

  rights: {
    title: 'Tvoja prava',
    disclaimer:
      'Sledeće informacije su opšte prirode i ne zamenjuju pravni savet. U konkretnim situacijama, kontaktiraj pravni savetodavni centar.',
    topics: {
      identityControl: {
        title: 'Kontrola identiteta',
        summary: 'Policija može proveriti identitet ako postoji konkretan razlog.',
        keyPoints: [
          'Možeš pitati: „Da li sam dužan/na da se legitimišem?"',
          'Lična karta ili pasoš sa fotografijom su dovoljni.',
          'Ne moraš otkrivati poreklo ni razlog prisustva.',
          'Bez dokumenta: policija te može zadržati radi utvrđivanja identiteta, najviše nekoliko sati.',
          'Zabeleži: datum, vreme, mesto, broj značke, svedoci.',
        ],
      },
      search: {
        title: 'Pretres',
        summary: 'Pretres osobe ili stana u principu zahteva sudski nalog.',
        keyPoints: [
          'Pitaj: „Imate li nalog za pretres?"',
          'Traži da vidiš nalog i pažljivo ga pročitaj.',
          'Možeš prigovoriti – to neće zaustaviti pretres, ali je važno za kasnija pravna sredstva.',
          'Zabeleži sve što se pretresa i oduzima.',
          'Zahtevaj potvrdu za oduzete predmete.',
        ],
      },
      arrest: {
        title: 'Hapšenje / saslušanje',
        summary: 'Imaš pravo da ćutiš – ovo pravo uvek važi.',
        keyPoints: [
          'Jasno izjavi: „Želim da razgovaram sa advokatom."',
          'Ne moraš davati informacije osim ličnih podataka.',
          'Zahtevaj pismeni razlog hapšenja.',
          'Mora ti biti omogućeno da se pojaviš pred sudijom najkasnije sledećeg dana.',
          'Odmah kontaktiraj: pravnu pomoć ili advokata od poverenja.',
        ],
      },
      recording: {
        title: 'Snimanje policije',
        summary: 'Snimanje policijskih akcija na javnom mestu je u principu dozvoljeno.',
        keyPoints: [
          'Snimanje službenih radnji na javnom mestu pokriveno je slobodom izražavanja (čl. 5 GG).',
          'Prepoznatljiva lica privatnih osoba u pozadini treba zamagliti (GDPR).',
          'Policajci nemaju opšte pravo da te spreče u snimanju ili da ti oduzmu telefon.',
          'Oduzimanje telefona zahteva sudski nalog.',
          'Brzo otpremi snimke na cloud ili podeli ih s osobom od poverenja.',
        ],
      },
      silence: {
        title: 'Pravo na ćutanje',
        summary: 'Imaš pravo da odbiješ odgovaranje na pitanja. Mirno ga koristi.',
        keyPoints: [
          'Reci: „Koristim pravo na ćutanje i tražim advokata."',
          'Ćutanje ne sme biti korišćeno protiv tebe.',
          'Ne daj nikakve izjave o predmetu – ni naizgled bezopasne.',
          'Kontakti za hitne slučajeve: GFF (Društvo za građanska prava), RAV (Republikansko udruženje advokata).',
        ],
      },
    },
  },

  evidence: {
    title: 'Obezbeđivanje dokaza',
    empty: 'Nema sačuvanih snimaka.',
    recordVideo: 'Snimi video',
    recordAudio: 'Snimi audio',
    takePhoto: 'Uslikaj',
    exifWarning: 'GPS podaci i informacije o uređaju se automatski uklanjaju iz svih snimaka.',
    deleteConfirm: 'Trajno obrisati snimak?',
    storageWarning: 'Snimci su sačuvani samo lokalno na tvom uređaju. Napravi rezervnu kopiju važnih snimaka na bezbednom mestu.',
  },

  settings: {
    title: 'Podešavanja',
    language: 'Jezik',
    reportResolution: 'Preciznost prijave',
    reportResolutionHint: 'Grublja rezolucija povećava anonimnost. Podrazumevano: nivo kvarta (~5 km²).',
    persistEvidence: 'Čuvaj snimke lokalno',
    persistEvidenceHint: 'Isključeno: snimci se čuvaju samo u memoriji i brišu se pri ponovnom pokretanju.',
    notifications: 'Obaveštenja za obližnje prijave',
    notificationsHint: 'Zahteva pristup lokaciji. Lokacija se koristi samo lokalno.',
    about: 'O PeoplesEyes',
    sourceCode: 'Izvorni kod (GitHub)',
    legalNotice: 'Pravna napomena',
  },

  errors: {
    locationDenied: 'Pristup lokaciji odbijen. Dozvoli pristup u podešavanjima pregledača.',
    locationUnavailable: 'Lokacija nije mogla biti utvrđena.',
    reportFailed: 'Prijava nije mogla biti poslata. Pokušaj ponovo.',
    syncFailed: 'Sinhronizacija nije uspela. Proveri vezu.',
    storageFull: 'Memorija uređaja je puna. Obriši starije snimke.',
  },

  common: {
    yes: 'Da', no: 'Ne', cancel: 'Otkaži', confirm: 'Potvrdi',
    back: 'Nazad', next: 'Dalje', loading: 'Učitavanje…',
    unknown: 'Nepoznato', offline: 'Van mreže', online: 'Na mreži',
  },
};
