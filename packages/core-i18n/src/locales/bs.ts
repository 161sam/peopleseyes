import { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';
import type { Translations } from '../schema.js';

export const bs: Translations = {
  app: { name: 'PeoplesEyes', tagline: 'Posmatramo zajedno. Bezbedno dokumentujemo.' },

  nav: { map: 'Mapa', report: 'Prijavi', rights: 'Prava', evidence: 'Dokazi', settings: 'Postavke' },

  map: {
    title: 'Aktualna zapažanja',
    noReports: 'Nema aktualnih prijava u ovom području.',
    loading: 'Učitavanje karte…',
    zoomIn: 'Zumiraj za detalje',
    reportHere: 'Prijavi ovdje',
    lastUpdated: 'Zadnje ažuriranje',
    reportsInArea: 'Prijave u ovom području',
  },

  report: {
    title: 'Prijavi zapažanje',
    subtitle: 'Tvoja prijava je anonimna. Sirovi podaci o lokaciji ne napuštaju uređaj.',
    step: {
      authority: 'Koja vlast?',
      activity: 'Šta je zapaženo?',
      confidence: 'Koliko si siguran/na?',
      description: 'Opcijski opis',
      confirm: 'Potvrdi',
    },
    authorityLabel: 'Vlast',
    activityLabel: 'Aktivnost',
    confidenceLabel: 'Sigurnost',
    descriptionLabel: 'Opis (opcijski)',
    descriptionPlaceholder: 'Kratki, činjenički opis zapaženog…',
    descriptionHint: 'Ne unosi lične podatke, imena ni registarskie tablice. Maks. 280 znakova.',
    submitButton: 'Prijavi anonimno',
    cancelButton: 'Odustani',
    successMessage: 'Prijava je anonimno poslana.',
    searchAuthority: 'Pretraži vlast…',
    groupFederal: 'Savezna policija',
    groupState: 'Zemaljska policija',
    groupImmigration: 'Ured za strance',
    groupFrontex: 'Fronteks / Zajednička',
    unknownAuthority: 'Nije jasno prepoznatljivo →',
    activityGroupControl: 'Kontrola',
    activityGroupOperation: 'Operacija',
    legalDisclaimer:
      'Ova aplikacija služi za dokumentaciju i informisanje. Lažne prijave mogu imati pravne posljedice. Prijavljuj samo ono što si zaista vidio/la.',
  },

  authority: {
    [AuthorityCategory.BundespolizeiBahn]: 'Savezna policija (Željeznica / Stanica)',
    [AuthorityCategory.BundespolizeiFlughafen]: 'Savezna policija (Aerodrom)',
    [AuthorityCategory.BundespolizeiGrenze]: 'Savezna policija (Granični prelaz)',
    [AuthorityCategory.BundespolizeiMobil]: 'Savezna policija (mobilna)',
    [AuthorityCategory.LandespolizeiSchwerpunktkontrolle]: 'Zemaljska policija – Pojačana kontrola',
    [AuthorityCategory.LandespolizeiRazzia]: 'Zemaljska policija – Racija / Velika operacija',
    [AuthorityCategory.LandespolizeiAllgemein]: 'Zemaljska policija (opća)',
    [AuthorityCategory.AuslaenderbehördeUnterkuenfte]: 'Ured za strance – Smještaj',
    [AuthorityCategory.AuslaenderbehördeVorführung]: 'Ured za strance – Pozivanje',
    [AuthorityCategory.AuslaenderbehördeAbschiebung]: 'Ured za strance – Deportacija',
    [AuthorityCategory.FrontexPatrouille]: 'Fronteks – Patrola',
    [AuthorityCategory.FrontexOperation]: 'Fronteks – Operacija',
    [AuthorityCategory.GemeinsameBundLand]: 'Zajednička savezno-zemaljska operacija',
    [AuthorityCategory.GemeinsameMitFrontex]: 'Zajednička operacija s Fronteksom',
    [AuthorityCategory.Unbekannt]: 'Nije jasno prepoznatljivo',
  },

  activity: {
    [ObservedActivityType.Identitaetskontrolle]: 'Kontrola identiteta / dokumenata',
    [ObservedActivityType.StationaereKontrolle]: 'Fiksna kontrolna točka',
    [ObservedActivityType.Patrouille]: 'Patrola',
    [ObservedActivityType.Fahrzeugkontrolle]: 'Kontrola vozila',
    [ObservedActivityType.Zugriff]: 'Hapšenje / privođenje zapaženo',
    [ObservedActivityType.Transport]: 'Transport lica (vozilo / autobus)',
    [ObservedActivityType.DurchsuchungGebaeude]: 'Pretres zgrade / smještaja',
    [ObservedActivityType.Sonstiges]: 'Ostalo',
  },

  confidence: {
    [ObservationConfidence.Direkt]: 'Vidio/la sam to lično',
    [ObservationConfidence.Weitergeleitet]: 'Preneseno iz pouzdanog izvora',
    [ObservationConfidence.Unsicher]: 'Nesigurno – moglo bi biti nešto drugo',
  },

  rights: {
    title: 'Tvoja prava',
    disclaimer:
      'Sljedeće informacije su opće prirode i ne zamjenjuju pravni savjet. U konkretnim situacijama, kontaktiraj pravni savjetodavni centar.',
    topics: {
      identityControl: {
        title: 'Kontrola identiteta',
        summary: 'Policija može provjeriti identitet ako postoji konkretan razlog.',
        keyPoints: [
          'Možeš pitati: „Da li sam dužan/na da se legitimišem?"',
          'Lična karta ili pasoš sa fotografijom su dovoljni.',
          'Ne moraš otkrivati porijeklo ni razlog prisustva.',
          'Bez dokumenta: policija te može zadržati radi utvrđivanja identiteta, najviše nekoliko sati.',
          'Zabilježi: datum, vrijeme, mjesto, broj značke, svjedoci.',
        ],
      },
      search: {
        title: 'Pretres',
        summary: 'Pretres osobe ili stana u principu zahtijeva sudski nalog.',
        keyPoints: [
          'Pitaj: „Imate li nalog za pretres?"',
          'Traži da vidiš nalog i pažljivo ga pročitaj.',
          'Možeš prigovoriti – to neće zaustaviti pretres, ali je važno za kasnija pravna sredstva.',
          'Zabilježi sve što se pretresa i oduzima.',
          'Zahtijevaj potvrdu za oduzete predmete.',
        ],
      },
      arrest: {
        title: 'Hapšenje / saslušanje',
        summary: 'Imaš pravo da šutiš – ovo pravo uvijek važi.',
        keyPoints: [
          'Jasno izjavi: „Želim razgovarati s advokatom."',
          'Ne moraš davati informacije osim ličnih podataka.',
          'Zahtijevaj pismeni razlog hapšenja.',
          'Mora ti biti omogućeno da se pojaviš pred sudijom najkasnije sljedećeg dana.',
          'Odmah kontaktiraj: pravnu pomoć ili advokata od povjerenja.',
        ],
      },
      recording: {
        title: 'Snimanje policije',
        summary: 'Snimanje policijskih akcija na javnom mjestu je u principu dozvoljeno.',
        keyPoints: [
          'Snimanje službenih radnji na javnom mjestu pokriveno je slobodom izražavanja (čl. 5 GG).',
          'Prepoznatljiva lica privatnih osoba u pozadini treba zamagliti (GDPR).',
          'Policajci nemaju opće pravo da te spriječe u snimanju ili da ti oduzmu telefon.',
          'Oduzimanje telefona zahtijeva sudski nalog.',
          'Brzo otpremi snimke u cloud ili ih podijeli s osobom od povjerenja.',
        ],
      },
      silence: {
        title: 'Pravo na šutnju',
        summary: 'Imaš pravo da odbiješ odgovaranje na pitanja. Mirno ga koristi.',
        keyPoints: [
          'Reci: „Koristim pravo na šutnju i tražim advokata."',
          'Šutnja ne smije biti korištena protiv tebe.',
          'Ne daj nikakve izjave o predmetu – ni naizgled bezopasne.',
          'Kontakti za hitne slučajeve: GFF (Društvo za građanska prava), RAV (Republikansko udruženje advokata).',
        ],
      },
    },
  },

  evidence: {
    title: 'Osiguranje dokaza',
    empty: 'Nema sačuvanih snimaka.',
    recordVideo: 'Snimi video',
    recordAudio: 'Snimi audio',
    takePhoto: 'Uslikaj',
    exifWarning: 'GPS podaci i informacije o uređaju se automatski uklanjaju iz svih snimaka.',
    deleteConfirm: 'Trajno obrisati snimak?',
    storageWarning: 'Snimci su sačuvani samo lokalno na tvom uređaju. Napravi kopiju važnih snimaka na sigurnom mjestu.',
  },

  settings: {
    title: 'Postavke',
    language: 'Jezik',
    reportResolution: 'Preciznost prijave',
    reportResolutionHint: 'Grublja rezolucija povećava anonimnost. Podrazumijevano: nivo kvarta (~5 km²).',
    persistEvidence: 'Čuvaj snimke lokalno',
    persistEvidenceHint: 'Isključeno: snimci se čuvaju samo u memoriji i brišu se pri ponovnom pokretanju.',
    notifications: 'Obavijesti za obližnje prijave',
    notificationsHint: 'Zahtijeva pristup lokaciji. Lokacija se koristi samo lokalno.',
    about: 'O PeoplesEyes',
    sourceCode: 'Izvorni kod (GitHub)',
    legalNotice: 'Pravna napomena',
  },

  errors: {
    locationDenied: 'Pristup lokaciji odbijen. Dozvoli pristup u postavkama preglednika.',
    locationUnavailable: 'Lokacija nije mogla biti utvrđena.',
    reportFailed: 'Prijava nije mogla biti poslana. Pokušaj ponovo.',
    syncFailed: 'Sinhronizacija nije uspjela. Provjeri vezu.',
    storageFull: 'Memorija uređaja je puna. Obriši starije snimke.',
  },

  common: {
    yes: 'Da', no: 'Ne', cancel: 'Odustani', confirm: 'Potvrdi',
    back: 'Nazad', next: 'Dalje', loading: 'Učitavanje…',
    unknown: 'Nepoznato', offline: 'Van mreže', online: 'Na mreži',
  },
};
