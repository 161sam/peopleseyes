import { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';
import type { Translations } from '../schema.js';

export const ro: Translations = {
  app: { name: 'PeoplesEyes', tagline: 'Observăm împreună. Documentăm în siguranță.' },

  nav: { map: 'Hartă', report: 'Raportează', rights: 'Drepturi', evidence: 'Dovezi', settings: 'Setări', history: 'Istoric' },

  map: {
    title: 'Observații actuale',
    noReports: 'Nicio raportare actuală în această zonă.',
    loading: 'Se încarcă harta…',
    zoomIn: 'Mărește pentru detalii',
    reportHere: 'Raportează aici',
    lastUpdated: 'Ultima actualizare',
    reportsInArea: 'Raportări în această zonă',
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
