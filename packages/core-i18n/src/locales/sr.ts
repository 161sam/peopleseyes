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
    reportNow: 'Report now', // TODO: translate
    quickReportTitle: 'Quick report', // TODO: translate
    quickReportSubtitle: '2 details are enough — anonymous and instant', // TODO: translate
    quickReportSuccess: 'Report submitted', // TODO: translate
    detailedReport: 'Detailed report →', // TODO: translate
    externalLayer: 'External reports', // TODO: translate
    externalLayerHint: 'Reports from partner projects', // TODO: translate
    externalSource: 'External source', // TODO: translate
    externalSourceWarning: 'Not reported by PeoplesEyes users', // TODO: translate
    ngoVerified: 'NGO-verified', // TODO: translate
    communityVerified: 'Community-confirmed', // TODO: translate
    unverified: 'Unverified', // TODO: translate
    noExternalSources: 'No external sources active yet', // TODO: translate
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

  simulations: {
    title: 'Practice situations', // TODO: translate
    subtitle: 'How would you react?', // TODO: translate
    resultCorrect: 'Correct', // TODO: translate
    resultIncorrect: 'Not optimal', // TODO: translate
    resultExplanation: 'Explanation:', // TODO: translate
    nextStep: 'Next', // TODO: translate
    restart: 'Try again', // TODO: translate
    finish: 'Done', // TODO: translate
    scenarios: {
      identityCheck: {
        id: 'identityCheck',
        title: 'Identity check', // TODO: translate
        description: 'You are approached by police on the street.', // TODO: translate
        icon: '🚶',
        steps: [
          {
            id: 'ic-1',
            situation: 'Two police officers approach you on the street and ask you to show your ID.', // TODO: translate
            question: 'What do you do first?', // TODO: translate
            choices: [
              { id: 'ic-1-a', text: 'Calmly ask whether I am required to show ID.', isCorrect: true, explanation: 'You have the right to ask — this is not a provocation, it is your right.' }, // TODO: translate
              { id: 'ic-1-b', text: 'Hand over the ID immediately without asking.', isCorrect: false, explanation: 'You can first ask whether an obligation to show ID actually exists.' }, // TODO: translate
              { id: 'ic-1-c', text: 'Refuse to show ID and try to walk away.', isCorrect: false, explanation: 'This could be interpreted as resistance. Better to ask first, then cooperate if required.' }, // TODO: translate
            ],
          },
          {
            id: 'ic-2',
            situation: 'The officer says: "Yes, you must identify yourself — we are conducting general checks."', // TODO: translate
            question: 'What do you hand over?', // TODO: translate
            choices: [
              { id: 'ic-2-a', text: 'Show national ID card or passport.', isCorrect: true, explanation: 'A photo ID is sufficient — you do not need to hand over anything else.' }, // TODO: translate
              { id: 'ic-2-b', text: 'Also hand over phone, bag, and wallet.', isCorrect: false, explanation: 'You only need to show a photo ID — no other items.' }, // TODO: translate
              { id: 'ic-2-c', text: 'Show nothing and invoke data protection.', isCorrect: false, explanation: 'If an obligation to show ID exists, you must present a photo ID.' }, // TODO: translate
            ],
          },
          {
            id: 'ic-3',
            situation: 'The officer asks: "Where are you coming from and where are you going?"', // TODO: translate
            question: 'What do you answer?', // TODO: translate
            choices: [
              { id: 'ic-3-a', text: 'Stay silent or say "I decline to answer."', isCorrect: true, explanation: 'Information about origin and reason for presence is voluntary.' }, // TODO: translate
              { id: 'ic-3-b', text: 'Answer fully to avoid conflict.', isCorrect: false, explanation: 'You do not have to answer these questions.' }, // TODO: translate
              { id: 'ic-3-c', text: 'Give a false address.', isCorrect: false, explanation: 'False information can be a criminal offence. Better to stay silent than to lie.' }, // TODO: translate
            ],
          },
        ],
      },
      houseSearch: {
        id: 'houseSearch',
        title: 'House search', // TODO: translate
        description: 'Police appear at your front door.', // TODO: translate
        icon: '🏠',
        steps: [
          {
            id: 'hs-1',
            situation: 'The doorbell rings. Through the peephole you see uniformed officers calling: "Police — we want to search your apartment."', // TODO: translate
            question: 'What do you do before opening the door?', // TODO: translate
            choices: [
              { id: 'hs-1-a', text: 'Ask through the closed door for the search warrant.', isCorrect: true, explanation: 'You do not have to open the door before you have seen the warrant.' }, // TODO: translate
              { id: 'hs-1-b', text: 'Open immediately to appear cooperative.', isCorrect: false, explanation: 'You have the right to see the warrant first — use it.' }, // TODO: translate
              { id: 'hs-1-c', text: 'Not open the door at all and not respond.', isCorrect: false, explanation: 'Completely ignoring the situation can escalate it.' }, // TODO: translate
            ],
          },
          {
            id: 'hs-2',
            situation: 'The officers show a search warrant. You open the door. They enter your apartment.', // TODO: translate
            question: 'What do you do now?', // TODO: translate
            choices: [
              { id: 'hs-2-a', text: 'Read the warrant, call a lawyer, observe and note everything.', isCorrect: true, explanation: 'You have the right to read the warrant and contact a lawyer.' }, // TODO: translate
              { id: 'hs-2-b', text: 'Actively help with the search to show cooperation.', isCorrect: false, explanation: 'Active assistance can later be interpreted as a confession.' }, // TODO: translate
              { id: 'hs-2-c', text: 'Try to physically block the officers.', isCorrect: false, explanation: 'That constitutes resisting officers. Use your rights instead.' }, // TODO: translate
            ],
          },
          {
            id: 'hs-3',
            situation: 'At the end, the officers take your laptop and some documents.', // TODO: translate
            question: 'What do you demand?', // TODO: translate
            choices: [
              { id: 'hs-3-a', text: 'A written receipt for all confiscated items.', isCorrect: true, explanation: 'You have a legal right to a seizure record. Insist on it.' }, // TODO: translate
              { id: 'hs-3-b', text: 'Nothing — accept the loss.', isCorrect: false, explanation: 'Without a receipt you have no basis for later legal remedies.' }, // TODO: translate
              { id: 'hs-3-c', text: 'Hold onto the laptop so it cannot be taken.', isCorrect: false, explanation: 'That would be resistance. Demand a receipt instead.' }, // TODO: translate
            ],
          },
        ],
      },
      arrest: {
        id: 'arrest',
        title: 'Arrest', // TODO: translate
        description: 'You are being temporarily detained by police.', // TODO: translate
        icon: '🚔',
        steps: [
          {
            id: 'ar-1',
            situation: 'An officer says to you: "You are under provisional arrest."', // TODO: translate
            question: 'What do you say first?', // TODO: translate
            choices: [
              { id: 'ar-1-a', text: '"I wish to speak with a lawyer." — then stay silent.', isCorrect: true, explanation: 'The right to a lawyer applies immediately from the moment of arrest.' }, // TODO: translate
              { id: 'ar-1-b', text: 'Immediately explain everything to clear up the misunderstanding.', isCorrect: false, explanation: 'Everything you say can be used against you. Lawyer first, then talk.' }, // TODO: translate
              { id: 'ar-1-c', text: 'Ask whether you are actually under arrest or not.', isCorrect: false, explanation: 'More important: demand a lawyer and stay silent.' }, // TODO: translate
            ],
          },
          {
            id: 'ar-2',
            situation: 'In the police car, officers chat casually: "Just informally — can you explain what happened today?"', // TODO: translate
            question: 'What do you do?', // TODO: translate
            choices: [
              { id: 'ar-2-a', text: 'Stay silent and repeat: "I want my lawyer."', isCorrect: true, explanation: 'There is no such thing as an "informal conversation" — everything can be used in proceedings.' }, // TODO: translate
              { id: 'ar-2-b', text: 'Accept the conversation since you have nothing to hide.', isCorrect: false, explanation: 'Even harmless statements can be incriminating. Wait for your lawyer.' }, // TODO: translate
              { id: 'ar-2-c', text: 'React aggressively and insult the officers.', isCorrect: false, explanation: 'This significantly worsens your situation. Stay calm and silent.' }, // TODO: translate
            ],
          },
          {
            id: 'ar-3',
            situation: 'At the station, forms are presented: "Please sign here — it is just a formality."', // TODO: translate
            question: 'What do you do?', // TODO: translate
            choices: [
              { id: 'ar-3-a', text: 'Sign nothing until the lawyer is present.', isCorrect: true, explanation: 'Signatures are legally binding — let your lawyer review everything first.' }, // TODO: translate
              { id: 'ar-3-b', text: 'Sign so it is over quickly.', isCorrect: false, explanation: 'Even "formalities" can have legal consequences. Wait for your lawyer.' }, // TODO: translate
              { id: 'ar-3-c', text: 'Tear up the forms.', isCorrect: false, explanation: 'That is property damage. Calmly decline to sign.' }, // TODO: translate
            ],
          },
        ],
      },
      vehicleStop: {
        id: 'vehicleStop',
        title: 'Vehicle stop', // TODO: translate
        description: 'Police pull you over with flashing lights.', // TODO: translate
        icon: '🚗',
        steps: [
          {
            id: 'vs-1',
            situation: 'Blue lights flash behind you. A police car signals you to stop.', // TODO: translate
            question: 'What do you do immediately?', // TODO: translate
            choices: [
              { id: 'vs-1-a', text: 'Pull over safely, turn off engine, place hands visibly on steering wheel.', isCorrect: true, explanation: 'Visible hands signal no threat — this is for your own safety as well.' }, // TODO: translate
              { id: 'vs-1-b', text: 'Stay in the car and wait without showing hands.', isCorrect: false, explanation: 'Keeping hands visible de-escalates the situation.' }, // TODO: translate
              { id: 'vs-1-c', text: 'Get out and walk towards the officers.', isCorrect: false, explanation: 'Getting out can be perceived as a threat. Stay in the car and show your hands.' }, // TODO: translate
            ],
          },
          {
            id: 'vs-2',
            situation: 'The officer approaches and says: "Driver\'s licence and vehicle documents, please."', // TODO: translate
            question: 'What do you hand over?', // TODO: translate
            choices: [
              { id: 'vs-2-a', text: 'Driver\'s licence and vehicle registration — nothing more.', isCorrect: true, explanation: 'At a traffic stop you are only required to show these documents.' }, // TODO: translate
              { id: 'vs-2-b', text: 'Also provide national ID, phone number and address.', isCorrect: false, explanation: 'You only need to show driver\'s licence and vehicle documents.' }, // TODO: translate
              { id: 'vs-2-c', text: 'Hand over nothing and ask whether it is voluntary.', isCorrect: false, explanation: 'At a traffic stop you are required to show driver\'s licence and registration.' }, // TODO: translate
            ],
          },
          {
            id: 'vs-3',
            situation: 'The officer asks: "May I quickly look in the boot?"', // TODO: translate
            question: 'What do you answer?', // TODO: translate
            choices: [
              { id: 'vs-3-a', text: '"No, I do not consent to a search."', isCorrect: true, explanation: 'You can decline. Without a warrant or specific suspicion, a search is not permitted.' }, // TODO: translate
              { id: 'vs-3-b', text: 'Agree so no problems arise.', isCorrect: false, explanation: 'You do not have to agree. Declining is not an admission of guilt.' }, // TODO: translate
              { id: 'vs-3-c', text: 'Open the boot yourself to show cooperation.', isCorrect: false, explanation: 'Opening it yourself counts as consent. Better to clearly decline.' }, // TODO: translate
            ],
          },
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
    dataProtection: 'Data protection', // TODO: translate
    pinChange: 'Change encryption PIN', // TODO: translate
    pinChangeStep1: 'Enter current PIN', // TODO: translate
    pinChangeStep2: 'Choose new PIN', // TODO: translate
    pinChangeStep3: 'Confirm new PIN', // TODO: translate
    pinChangeSuccess: 'PIN changed successfully', // TODO: translate
    pinChangeError: 'Incorrect PIN', // TODO: translate
    pinChangeMismatch: 'PINs do not match', // TODO: translate
    pinChangeWorking: 'Re-encrypting data…', // TODO: translate
    deleteAllData: 'Delete all data (emergency)', // TODO: translate
    emergencyContacts: 'Emergency contacts', // TODO: translate
    emergencyContactsHint: 'Notified on emergency tap (max. 3)', // TODO: translate
    emergencyContactName: 'Name', // TODO: translate
    emergencyContactPhone: 'Phone (+1...)', // TODO: translate
    emergencyContactAdd: '+ Add contact', // TODO: translate
    emergencyContactRemove: 'Remove', // TODO: translate
    emergencyMessage: 'Message', // TODO: translate
    emergencyMessageHint: 'Sent with your approximate location', // TODO: translate
    emergencyAlertSending: 'Sending alert…', // TODO: translate
    aiAssistantKey: 'AI Assistant (Beta)', // TODO: translate
    aiAssistantKeyHint: 'Anthropic API key — stays local on your device', // TODO: translate
    aiAssistantKeyPlaceholder: 'sk-ant-...',
    aiAssistantKeySave: 'Save', // TODO: translate
    aiAssistantKeyDelete: 'Delete key', // TODO: translate
    aiAssistantKeyLink: 'Try for free → console.anthropic.com', // TODO: translate
  },

  legalChat: {
    title: 'Ask legal questions', // TODO: translate
    disclaimer: 'General information — not legal advice', // TODO: translate
    placeholder: 'Your question…', // TODO: translate
    noKey: 'No API key configured', // TODO: translate
    noKeyHint: 'Go to Settings → AI Assistant', // TODO: translate
    errorInvalidKey: 'Invalid API key', // TODO: translate
    errorRateLimit: 'Too many requests — please wait a moment', // TODO: translate
    errorNetwork: 'No connection', // TODO: translate
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
