import { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';
import type { Translations } from '../schema.js';

export const sq: Translations = {
  app: { name: 'PeoplesEyes', tagline: 'Vëzhgojmë bashkë. Dokumentojmë me siguri.' },

  nav: { map: 'Harta', report: 'Raporto', rights: 'Të drejtat', evidence: 'Prova', settings: 'Cilësimet' },

  map: {
    title: 'Vëzhgimet aktuale',
    noReports: 'Nuk ka raporte aktuale në këtë zonë.',
    loading: 'Po ngarkohet harta…',
    zoomIn: 'Zmadho për detaje',
    reportHere: 'Raporto këtu',
    lastUpdated: 'Përditësimi i fundit',
    reportsInArea: 'Raporte në këtë zonë',
  },

  report: {
    title: 'Raporto një vëzhgim',
    subtitle: 'Raporti yt është anonim. Të dhënat e papërpunuara të vendndodhjes nuk largohen nga pajisja.',
    step: {
      authority: 'Cila autoritet?',
      activity: 'Çfarë u vëzhgua?',
      confidence: 'Sa i/e sigurt/e jesh?',
      description: 'Përshkrim opcional',
      confirm: 'Konfirmo',
    },
    authorityLabel: 'Autoriteti',
    activityLabel: 'Aktiviteti',
    confidenceLabel: 'Siguria',
    descriptionLabel: 'Përshkrim (opcional)',
    descriptionPlaceholder: 'Përshkrim i shkurtër faktik i asaj që vëzhgove…',
    descriptionHint: 'Mos përfshij të dhëna personale, emra apo targa. Maks. 280 karaktere.',
    submitButton: 'Raporto anonimisht',
    cancelButton: 'Anulo',
    successMessage: 'Raporti u transmetua në mënyrë anonime.',
    searchAuthority: 'Kërko autoritet…',
    groupFederal: 'Policia Federale',
    groupState: 'Policia e Landit',
    groupImmigration: 'Zyra për të Huajt',
    groupFrontex: 'Frontex / Bashkërenduar',
    unknownAuthority: 'Nuk njihet qartë →',
    activityGroupControl: 'Kontroll',
    activityGroupOperation: 'Operacion',
    legalDisclaimer:
      'Kjo aplikacion është për dokumentim dhe informim. Raportet e rreme mund të kenë pasoja ligjore. Raporto vetëm atë që ke vëzhguar vërtet.',
  },

  authority: {
    [AuthorityCategory.BundespolizeiBahn]: 'Policia Federale (Tren / Stacion)',
    [AuthorityCategory.BundespolizeiFlughafen]: 'Policia Federale (Aeroport)',
    [AuthorityCategory.BundespolizeiGrenze]: 'Policia Federale (Kalim kufitar)',
    [AuthorityCategory.BundespolizeiMobil]: 'Policia Federale (lëvizëse)',
    [AuthorityCategory.LandespolizeiSchwerpunktkontrolle]: 'Policia e Landit – Kontroll i intensifikuar',
    [AuthorityCategory.LandespolizeiRazzia]: 'Policia e Landit – Bastisje / Operacion i madh',
    [AuthorityCategory.LandespolizeiAllgemein]: 'Policia e Landit (e përgjithshme)',
    [AuthorityCategory.AuslaenderbehördeUnterkuenfte]: 'Zyra për të Huajt – Strehim',
    [AuthorityCategory.AuslaenderbehördeVorführung]: 'Zyra për të Huajt – Thirrje',
    [AuthorityCategory.AuslaenderbehördeAbschiebung]: 'Zyra për të Huajt – Dëbim',
    [AuthorityCategory.FrontexPatrouille]: 'Frontex – Patrullë',
    [AuthorityCategory.FrontexOperation]: 'Frontex – Operacion',
    [AuthorityCategory.GemeinsameBundLand]: 'Operacion i përbashkët Federal + Land',
    [AuthorityCategory.GemeinsameMitFrontex]: 'Operacion i përbashkët me Frontex',
    [AuthorityCategory.Unbekannt]: 'Nuk njihet qartë',
  },

  activity: {
    [ObservedActivityType.Identitaetskontrolle]: 'Kontroll identiteti / dokumentesh',
    [ObservedActivityType.StationaereKontrolle]: 'Pikë kontrolli fikse',
    [ObservedActivityType.Patrouille]: 'Patrullë',
    [ObservedActivityType.Fahrzeugkontrolle]: 'Kontroll automjeti',
    [ObservedActivityType.Zugriff]: 'Arrestim / kapje e vëzhguar',
    [ObservedActivityType.Transport]: 'Transport personash (automjet / autobus)',
    [ObservedActivityType.DurchsuchungGebaeude]: 'Bastisje ndërtese / strehimi',
    [ObservedActivityType.Sonstiges]: 'Tjetër',
  },

  confidence: {
    [ObservationConfidence.Direkt]: 'E vëzhgova drejtpërdrejt vetë',
    [ObservationConfidence.Weitergeleitet]: 'Transmetuar nga një burim i besueshëm',
    [ObservationConfidence.Unsicher]: 'I pasigurt – mund të jetë diçka tjetër',
  },

  rights: {
    title: 'Të drejtat e tua',
    disclaimer:
      'Informacionet e mëposhtme janë të natyrës së përgjithshme dhe nuk zëvendësojnë këshillimin juridik. Në situata konkrete, kontakto një qendër këshillimi juridik.',
    topics: {
      identityControl: {
        title: 'Kontroll identiteti',
        summary: 'Policia mund të verifikojë identitetin nëse ka një arsye konkrete.',
        keyPoints: [
          'Mund të pyesësh: „A jam i/e detyruar të legitimohem?"',
          'Një dokument identiteti me foto (letërnjoftim, pasaportë) është i mjaftueshëm.',
          'Nuk duhet të zbulosh origjinën apo arsyen e pranisë.',
          'Pa dokument: policia mund të të mbajë për identifikim disa orë maksimum.',
          'Shëno: datën, orën, vendin, numrin e shqerit, dëshmitarët.',
        ],
      },
      search: {
        title: 'Bastisje',
        summary: 'Bastisja e personit apo banesës kërkon në parim një urdhër gjyqësor.',
        keyPoints: [
          'Pyet: „Keni urdhër bastisjeje?"',
          'Kërko të shohësh urdhrin dhe lexoje me kujdes.',
          'Mund të kundërshtosh – kjo nuk do të ndalojë bastisjen, por është e rëndësishme për ankesa të mëvonshme.',
          'Shëno gjithçka që bastiset dhe konfiskohet.',
          'Kërko faturë për sendet e konfiskuara.',
        ],
      },
      arrest: {
        title: 'Arrestim / marrje në pyetje',
        summary: 'Ke të drejtën të heshtësh – kjo e drejtë vlen gjithmonë.',
        keyPoints: [
          'Deklaroje qartë: „Dëshiroj të flas me avokat."',
          'Nuk je i/e detyruar të japësh informacion përtej të dhënave personale.',
          'Kërko me shkrim arsyen e arrestimit.',
          'Duhet të paraqitesh para gjyqtarit jo më vonë se të nesërmen.',
          'Kontakto menjëherë: linjën e ndihmës juridike ose një avokat të besuar.',
        ],
      },
      recording: {
        title: 'Filmimi i policisë',
        summary: 'Filmimi i operacioneve policore në hapësirën publike është në parim i lejuar.',
        keyPoints: [
          'Filmimi i akteve zyrtare në hapësirën publike mbrohet nga liria e shprehjes (Neni 5 GG).',
          'Fytyrat e njohshme të personave privatë në sfond duhen turbulluar (GDPR).',
          'Oficerët nuk kanë të drejtë t\'ju pengojnë të filmoni apo të konfiskojnë telefonin.',
          'Konfiskimi i telefonit kërkon urdhër gjyqësor.',
          'Ngarko regjistrimet shpejt në cloud ose ndajini me një person të besuar.',
        ],
      },
      silence: {
        title: 'E drejta e heshtjes',
        summary: 'Ke të drejtën të refuzosh t\'u përgjigjesh pyetjeve. Ushtroje qetësisht.',
        keyPoints: [
          'Thuaj: „Ushtrojnë të drejtën time të heshtjes dhe kërkoj avokat."',
          'Heshtja nuk mund të përdoret kundër teje.',
          'Mos bëj asnjë deklaratë rreth çështjes – as ato aparentisht të padëmshme.',
          'Kontakte urgjente: GFF (Shoqëria për të Drejtat Civile), RAV (Shoqata Republikane e Avokatëve).',
        ],
      },
    },
  },

  evidence: {
    title: 'Sigurimi i provave',
    empty: 'Asnjë regjistrim i ruajtur ende.',
    recordVideo: 'Regjistro video',
    recordAudio: 'Regjistro audio',
    takePhoto: 'Bëj foto',
    exifWarning: 'Të dhënat GPS dhe informacionet e pajisjes hiqen automatikisht nga të gjitha regjistrimet.',
    deleteConfirm: 'Fshi regjistrimin përfundimisht?',
    storageWarning: 'Regjistrimet ruhen vetëm lokalisht në pajisjen tënde. Bëj kopje rezervë të regjistrimeve të rëndësishme.',
  },

  settings: {
    title: 'Cilësimet',
    language: 'Gjuha',
    reportResolution: 'Saktësia e raportit',
    reportResolutionHint: 'Rezolucioni më i trashë rrit anonimitetin. Si parazgjedhje: niveli i lagjes (~5 km²).',
    persistEvidence: 'Ruaj provat lokalisht',
    persistEvidenceHint: 'Çaktivizuar: regjistrimet mbahen vetëm në memorie dhe fshihen pas rindezjes.',
    notifications: 'Njoftime për raporte afërsisht',
    notificationsHint: 'Kërkon qasje te vendndodhja. Vendndodhja përdoret vetëm lokalisht.',
    about: 'Rreth PeoplesEyes',
    sourceCode: 'Kodi burimor (GitHub)',
    legalNotice: 'Shënim ligjor',
  },

  errors: {
    locationDenied: 'Qasja te vendndodhja u refuzua. Lejo qasjen në cilësimet e shfletuesit.',
    locationUnavailable: 'Vendndodhja nuk mund të përcaktohet.',
    reportFailed: 'Raporti nuk mund të dërgohej. Provo përsëri.',
    syncFailed: 'Sinkronizimi dështoi. Kontrollo lidhjen.',
    storageFull: 'Hapësira e pajisjes është plot. Fshi regjistrimet e vjetra.',
  },

  common: {
    yes: 'Po', no: 'Jo', cancel: 'Anulo', confirm: 'Konfirmo',
    back: 'Prapa', next: 'Tjetër', loading: 'Po ngarkohet…',
    unknown: 'I panjohur', offline: 'Jashtë linje', online: 'Në linje',
  },
};
