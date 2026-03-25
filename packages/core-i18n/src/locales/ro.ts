import { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';
import type { Translations } from '../schema.js';

export const ro: Translations = {
  app: { name: 'PeoplesEyes', tagline: 'Observăm împreună. Documentăm în siguranță.' },

  nav: { map: 'Hartă', report: 'Raportează', rights: 'Drepturi', evidence: 'Dovezi', settings: 'Setări' },

  map: {
    title: 'Observații actuale',
    noReports: 'Nicio raportare actuală în această zonă.',
    loading: 'Se încarcă harta…',
    zoomIn: 'Mărește pentru detalii',
    reportHere: 'Raportează aici',
    lastUpdated: 'Ultima actualizare',
    reportsInArea: 'Raportări în această zonă',
  },

  report: {
    title: 'Raportează o observație',
    subtitle: 'Raportul tău este anonim. Datele brute de localizare nu părăsesc dispozitivul.',
    step: {
      authority: 'Ce autoritate?',
      activity: 'Ce s-a observat?',
      confidence: 'Cât de sigur/ă ești?',
      description: 'Descriere opțională',
      confirm: 'Confirmă',
    },
    authorityLabel: 'Autoritate',
    activityLabel: 'Activitate',
    confidenceLabel: 'Certitudine',
    descriptionLabel: 'Descriere (opțională)',
    descriptionPlaceholder: 'Scurtă descriere obiectivă a ceea ce ai observat…',
    descriptionHint: 'Nu include date personale, nume sau numere de înmatriculare. Max. 280 caractere.',
    submitButton: 'Raportează anonim',
    cancelButton: 'Anulează',
    successMessage: 'Raportul a fost transmis anonim.',
    searchAuthority: 'Caută autoritate…',
    groupFederal: 'Poliția Federală',
    groupState: 'Poliția de Land',
    groupImmigration: 'Oficiul pentru Străini',
    groupFrontex: 'Frontex / Comun',
    unknownAuthority: 'Neidentificabil clar →',
    activityGroupControl: 'Control',
    activityGroupOperation: 'Operațiune',
    legalDisclaimer:
      'Această aplicație este destinată documentării și informării. Raportările false pot avea consecințe juridice. Raportează doar ceea ce ai observat cu adevărat.',
  },

  authority: {
    [AuthorityCategory.BundespolizeiBahn]: 'Poliția Federală (Tren / Gară)',
    [AuthorityCategory.BundespolizeiFlughafen]: 'Poliția Federală (Aeroport)',
    [AuthorityCategory.BundespolizeiGrenze]: 'Poliția Federală (Punct de trecere a frontierei)',
    [AuthorityCategory.BundespolizeiMobil]: 'Poliția Federală (mobilă)',
    [AuthorityCategory.LandespolizeiSchwerpunktkontrolle]: 'Poliția de Land – Control intensiv',
    [AuthorityCategory.LandespolizeiRazzia]: 'Poliția de Land – Razie / Operațiune mare',
    [AuthorityCategory.LandespolizeiAllgemein]: 'Poliția de Land (generală)',
    [AuthorityCategory.AuslaenderbehördeUnterkuenfte]: 'Oficiul pentru Străini – Cazare',
    [AuthorityCategory.AuslaenderbehördeVorführung]: 'Oficiul pentru Străini – Citație',
    [AuthorityCategory.AuslaenderbehördeAbschiebung]: 'Oficiul pentru Străini – Expulzare',
    [AuthorityCategory.FrontexPatrouille]: 'Frontex – Patrulă',
    [AuthorityCategory.FrontexOperation]: 'Frontex – Operațiune',
    [AuthorityCategory.GemeinsameBundLand]: 'Operațiune comună Federal + Land',
    [AuthorityCategory.GemeinsameMitFrontex]: 'Operațiune comună cu Frontex',
    [AuthorityCategory.Unbekannt]: 'Neidentificabil clar',
  },

  activity: {
    [ObservedActivityType.Identitaetskontrolle]: 'Control identitate / documente',
    [ObservedActivityType.StationaereKontrolle]: 'Punct de control fix',
    [ObservedActivityType.Patrouille]: 'Patrulare',
    [ObservedActivityType.Fahrzeugkontrolle]: 'Control vehicul',
    [ObservedActivityType.Zugriff]: 'Reținere / arestare observată',
    [ObservedActivityType.Transport]: 'Transport persoane (vehicul / autobuz)',
    [ObservedActivityType.DurchsuchungGebaeude]: 'Percheziție clădire / cazare',
    [ObservedActivityType.Sonstiges]: 'Altele',
  },

  confidence: {
    [ObservationConfidence.Direkt]: 'Am observat direct eu însumi/însămi',
    [ObservationConfidence.Weitergeleitet]: 'Primit dintr-o sursă de încredere',
    [ObservationConfidence.Unsicher]: 'Nesigur – ar putea fi altceva',
  },

  rights: {
    title: 'Drepturile tale',
    disclaimer:
      'Informațiile de mai jos au caracter general și nu înlocuiesc consultanța juridică. În situații concrete, contactează un centru de asistență juridică.',
    topics: {
      identityControl: {
        title: 'Control de identitate',
        summary: 'Poliția poate verifica identitatea dacă există un motiv concret.',
        keyPoints: [
          'Poți întreba: „Sunt obligat/ă să mă legitimez?"',
          'Un act de identitate cu fotografie (carte de identitate, pașaport) este suficient.',
          'Nu trebuie să divulgi originea sau motivul prezenței tale.',
          'Fără act: poliția te poate reține pentru identificare câteva ore maximum.',
          'Notează: data, ora, locul, numărul legitimației agentului, martori.',
        ],
      },
      search: {
        title: 'Percheziție',
        summary: 'O percheziție a persoanei sau domiciliului necesită în principiu un mandat judecătoresc.',
        keyPoints: [
          'Întreabă: „Aveți un mandat de percheziție?"',
          'Cere să vezi mandatul și citește-l cu atenție.',
          'Poți să te opui – aceasta nu oprește percheziția, dar este important pentru căile de atac ulterioare.',
          'Notează tot ce se percheziționează și se confiscă.',
          'Solicită o chitanță pentru obiectele confiscate.',
        ],
      },
      arrest: {
        title: 'Reținere / interogatoriu',
        summary: 'Ai dreptul la tăcere – acest drept se aplică întotdeauna.',
        keyPoints: [
          'Declară clar: „Doresc să vorbesc cu un avocat."',
          'Nu ești obligat/ă să furnizezi informații dincolo de datele personale.',
          'Solicită în scris motivul reținerii.',
          'Trebuie prezentat/ă în fața unui judecător cel târziu în ziua următoare reținerii.',
          'Contactează imediat: o linie de asistență juridică sau un avocat de încredere.',
        ],
      },
      recording: {
        title: 'Filmarea poliției',
        summary: 'Filmarea operațiunilor polițienești în spațiul public este în general permisă.',
        keyPoints: [
          'Filmarea actelor oficiale în spațiul public este acoperită de libertatea de exprimare (Art. 5 GG).',
          'Fețele recognoscibile ale persoanelor private din fundal trebuie anonimizate (GDPR).',
          'Ofițerii nu au dreptul general de a te împiedica să filmezi sau de a-ți confisca telefonul.',
          'Confiscarea telefonului necesită un ordin judecătoresc.',
          'Încarcă rapid înregistrările în cloud sau partajează-le cu o persoană de încredere.',
        ],
      },
      silence: {
        title: 'Dreptul la tăcere',
        summary: 'Ai dreptul să refuzi să răspunzi la întrebări. Exercită-l calm.',
        keyPoints: [
          'Spune: „Îmi exercit dreptul la tăcere și solicit un avocat."',
          'Tăcerea nu poate fi folosită împotriva ta.',
          'Nu face nicio declarație despre fapte – nici pe cele aparent inofensive.',
          'Contacte de urgență: GFF (Societatea pentru Drepturi Civile), RAV (Asociația Republicană a Avocaților).',
        ],
      },
    },
  },

  evidence: {
    title: 'Asigurarea dovezilor',
    empty: 'Nicio înregistrare salvată până acum.',
    recordVideo: 'Înregistrează video',
    recordAudio: 'Înregistrează audio',
    takePhoto: 'Fă o fotografie',
    exifWarning: 'Datele GPS și informațiile despre dispozitiv sunt eliminate automat din toate înregistrările.',
    deleteConfirm: 'Ștergi definitiv înregistrarea?',
    storageWarning: 'Înregistrările sunt stocate doar local pe dispozitivul tău. Fă copii de siguranță ale înregistrărilor importante.',
  },

  settings: {
    title: 'Setări',
    language: 'Limbă',
    reportResolution: 'Precizia raportului',
    reportResolutionHint: 'Rezoluție mai grosieră crește anonimatul. Implicit: nivel cartier (~5 km²).',
    persistEvidence: 'Salvează înregistrările local',
    persistEvidenceHint: 'Dezactivat: înregistrările sunt păstrate doar în memorie și șterse la repornire.',
    notifications: 'Notificări pentru raportări apropiate',
    notificationsHint: 'Necesită acces la localizare. Localizarea este utilizată doar local.',
    about: 'Despre PeoplesEyes',
    sourceCode: 'Cod sursă (GitHub)',
    legalNotice: 'Mențiuni legale',
  },

  errors: {
    locationDenied: 'Acces la localizare refuzat. Permite accesul în setările browserului.',
    locationUnavailable: 'Localizarea nu a putut fi determinată.',
    reportFailed: 'Raportul nu a putut fi trimis. Te rugăm să încerci din nou.',
    syncFailed: 'Sincronizarea a eșuat. Verifică conexiunea.',
    storageFull: 'Stocarea dispozitivului este plină. Șterge înregistrările mai vechi.',
  },

  common: {
    yes: 'Da', no: 'Nu', cancel: 'Anulează', confirm: 'Confirmă',
    back: 'Înapoi', next: 'Înainte', loading: 'Se încarcă…',
    unknown: 'Necunoscut', offline: 'Offline', online: 'Online',
  },
};
