import { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';
import type { Translations } from '../schema.js';

export const ku: Translations = {
  app: { name: 'PeoplesEyes', tagline: 'Bi hev re temaşe bikin. Bi ewlehî belgeleyin.' },

  nav: { map: 'Nexşe', report: 'Rapor bike', rights: 'Maf', evidence: 'Delîl', settings: 'Mîheng', history: 'Dîrok' },

  map: {
    title: 'Dîtinên niha',
    noReports: 'Di vê herêmê de rapora heyî tune.',
    loading: 'Nexşe tê barkirin…',
    zoomIn: 'Ji bo hûrgiliyan nêzîk bike',
    reportHere: 'Li vir rapor bike',
    lastUpdated: 'Nûvekirina dawî',
    reportsInArea: 'Raport di vê herêmê de',
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
    title: 'Dîtinê rapor bike',
    subtitle: 'Rapora te nepenî ye. Daneyên cîhê xam cîhazê te terk nakin.',
    step: {
      authority: 'Kîjan dezgeh?',
      activity: 'Çi hat dîtin?',
      confidence: 'Tu çiqas pê bawer î?',
      description: 'Danasîna vebijarkî',
      confirm: 'Piştrast bike',
    },
    authorityLabel: 'Dezgeh',
    activityLabel: 'Çalakî',
    confidenceLabel: 'Bawerî',
    descriptionLabel: 'Danasîn (vebijarkî)',
    descriptionPlaceholder: 'Danasîna kurt û rastî ya tiştê hatî dîtin…',
    descriptionHint: 'Daneyên kesane, nav an jimareyên sifrê nexe. Herî zêde 280 tîp.',
    submitButton: 'Nepenî rapor bike',
    cancelButton: 'Betal bike',
    successMessage: 'Rapor bi nepenî hate şandin.',
    searchAuthority: 'Li dezgehê bigere…',
    groupFederal: 'Polîsê Federal',
    groupState: 'Polîsê Eyaletê',
    groupImmigration: 'Dezgeha Biyaniyên',
    groupFrontex: 'Frontex / Hevpar',
    unknownAuthority: 'Bi eşkere nayê naskirin →',
    activityGroupControl: 'Kontrol',
    activityGroupOperation: 'Operasyon',
    legalDisclaimer:
      'Ev sepan ji bo belgekirinê û agahdariyê ye. Raportên derewîn dibe ku encamên hiqûqî hebin. Tenê tiştê ku bi rastî dîtiye rapor bike.',
  },

  authority: {
    [AuthorityCategory.BundespolizeiBahn]: 'Polîsê Federal (Trên / İstasyon)',
    [AuthorityCategory.BundespolizeiFlughafen]: 'Polîsê Federal (Balafirgeha)',
    [AuthorityCategory.BundespolizeiGrenze]: 'Polîsê Federal (Deriyê Sînorê)',
    [AuthorityCategory.BundespolizeiMobil]: 'Polîsê Federal (mobîl)',
    [AuthorityCategory.LandespolizeiSchwerpunktkontrolle]: 'Polîsê Eyaletê – Kontrola Zêde',
    [AuthorityCategory.LandespolizeiRazzia]: 'Polîsê Eyaletê – Baskın / Operasyona Mezin',
    [AuthorityCategory.LandespolizeiAllgemein]: 'Polîsê Eyaletê (giştî)',
    [AuthorityCategory.AuslaenderbehördeUnterkuenfte]: 'Dezgeha Biyaniyên – Bicihbûn',
    [AuthorityCategory.AuslaenderbehördeVorführung]: 'Dezgeha Biyaniyên – Bangkirin',
    [AuthorityCategory.AuslaenderbehördeAbschiebung]: 'Dezgeha Biyaniyên – Sirgûnkirin',
    [AuthorityCategory.FrontexPatrouille]: 'Frontex – Dewriye',
    [AuthorityCategory.FrontexOperation]: 'Frontex – Operasyon',
    [AuthorityCategory.GemeinsameBundLand]: 'Operasyona Hevpar a Federal û Eyalet',
    [AuthorityCategory.GemeinsameMitFrontex]: 'Operasyona Hevpar a bi Frontex',
    [AuthorityCategory.Unbekannt]: 'Bi eşkere nayê naskirin',
  },

  activity: {
    [ObservedActivityType.Identitaetskontrolle]: 'Kontrola nasname / belgeyan',
    [ObservedActivityType.StationaereKontrolle]: 'Xala kontrolê ya sabît',
    [ObservedActivityType.Patrouille]: 'Dewriye',
    [ObservedActivityType.Fahrzeugkontrolle]: 'Kontrola wesayitê',
    [ObservedActivityType.Zugriff]: 'Girtina / destgirtina hatî dîtin',
    [ObservedActivityType.Transport]: 'Veguhestina kesan (wesayit / otobus)',
    [ObservedActivityType.DurchsuchungGebaeude]: 'Lêgerîna avahî / bicihbûnê',
    [ObservedActivityType.Sonstiges]: 'Yên din',
  },

  confidence: {
    [ObservationConfidence.Direkt]: 'Min ev bi xwe rasterast dît',
    [ObservationConfidence.Weitergeleitet]: 'Ji çavkaniyeke pêbawer hat şandin',
    [ObservationConfidence.Unsicher]: 'Nediyar – dibe ku tiştek din be',
  },

  rights: {
    title: 'Mafên te',
    disclaimer:
      'Agahiyên jêrîn xwedî xasûmîyeteke giştî ne û şûna şêwirmendiya hiqûqî nagirin. Di rewşên taybetî de, bi navendek şêwirmendiya hiqûqî re têkiliyê daynin.',
    topics: {
      identityControl: {
        title: 'Kontrola Nasnamê',
        summary: 'Polîs dikare nasnameya te kontrol bike heke sedemek taybetî hebe.',
        keyPoints: [
          'Dikare bipirse: "Ma ez neçar im ku xwe nas bikim?"',
          'Belgeyeke wêneydar (karta nasnameya neteweyî, pasaport) têrê dike.',
          'Ne mecbûr î ku eslê xwe an sedemê hebûna xwe eşkere bikî.',
          'Bê belge: polîs dikare te ji bo naskirinê çend saetan ragire.',
          'Not bike: dîrok, dem, cîh, hejmara rozeta efser, şahid.',
        ],
      },
      search: {
        title: 'Lêgerîn',
        summary: 'Lêgerîna laşê te an mala te bi giştî emrê dadrêsî hewce dike.',
        keyPoints: [
          'Bipirse: "Emrê lêgerînê heye?"',
          'Daxwaz bike ku emrê bibînî û bi baldarî bixwînî.',
          'Dikare îtiraz bikî – ev lêgerînê nasekinîne, lê ji bo doza paşîn girîng e.',
          'Her tiştê tê lêgerandin û desteserkirin not bike.',
          'Ji bo tiştên hatine desteserkirin resîd bixwaze.',
        ],
      },
      arrest: {
        title: 'Girtî / Lêpirsîn',
        summary: 'Mafê te yê bêdengiyê heye – ev maf her dem derbaz e.',
        keyPoints: [
          'Bi eşkere bêje: "Ez dixwazim bi parêzerek re biaxivim."',
          'Ne mecbûr î ku ji xeynî daneyên kesane agahiyan bidî.',
          'Sedemê girtinê bi nivîskî bixwaze.',
          'Divê herî dereng roja din a girtinê li ber dadwer bêyî.',
          'Yekser têkiliyê dayne: xeta alîkariya hiqûqî an parêzerekî pêbawer.',
        ],
      },
      recording: {
        title: 'Polîs Kamera Kirin',
        summary: 'Kamera kirina operasyonên polîsê li cihên giştî bi giştî destûr e.',
        keyPoints: [
          'Kamera kirina çalakiyên fermî li cihên giştî di bin azadiya gotinê de ye (Xala 5 GG).',
          'Rûyên kesên taybet ên ku tên naskirin di paşperdeyê de divê were şênber kirin (GDPR).',
          'Efseran mafê giştî tune ku te ji kamera kirinê asteng bikin an telefona te dest bixin.',
          'Dest xistina telefon emrê dadrêsî hewce dike.',
          'Tomarên xwe zû li ewrê barkirin an bi kesekî pêbawer re parve bike.',
        ],
      },
      silence: {
        title: 'Mafê Bêdengiyê',
        summary: 'Mafê te heye ku tu bersivdana pirsan red bikî. Bi aramî ji xwe re bike.',
        keyPoints: [
          'Bêje: "Ez mafê bêdengiyê bi kar tînim û parêzerek dixwazim."',
          'Bêdengî nabe ku li dijî te bê bikaranîn.',
          'Di derbarê mijarê de tu daxuyaniyan nede – yên xuyaye bêzirar jî.',
          'Têkiliyên acîl: GFF (Civata Mafên Medenî), RAV (Komeleya Parêzerên Komarî).',
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
    title: 'Misogerikira Delîlan',
    empty: 'Hêj tomara hatî tomarkirin tune.',
    recordVideo: 'Video tomar bike',
    recordAudio: 'Dengî tomar bike',
    takePhoto: 'Wêne bigire',
    exifWarning: 'Daneyên GPS û agahiyên cîhazê ji hemû tomaran bixwebexû têne rakirin.',
    deleteConfirm: 'Tomarê bixwe ji holê rake?',
    storageWarning: 'Tomarên tenê li ser cîhazê te bi xwecî têne hilanîn. Ji tomarên girîng kopiyeke berevanî li cihekî ewle bike.',
  },

  settings: {
    title: 'Mîheng',
    language: 'Ziman',
    reportResolution: 'Hûrgiliya rapor',
    reportResolutionHint: 'Rezolûsyona qerşatir nepeniya te zêde dike. Xwerû: asta taxa (~5 km²).',
    persistEvidence: 'Delîlan li xwecî hilanîne',
    persistEvidenceHint: 'Vekişand: tomarên tenê di bîranînê de têne hilanîn û piştî ji nû ve destpêkirinê têne jêbirin.',
    notifications: 'Agahdarî ji bo raportên nêzîk',
    notificationsHint: 'Gihîştina cîhê hewce dike. Cîh tenê li xwecî tê bikaranîn.',
    about: 'Derbarê PeoplesEyes',
    sourceCode: 'Koda çavkanî (GitHub)',
    legalNotice: 'Agahiya hiqûqî',
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
    locationDenied: 'Gihîştina cîhê hat red kirin. Di mîhengên geroka xwe de destûrê bide.',
    locationUnavailable: 'Cîh nehat destnîşankirin.',
    reportFailed: 'Rapor nehat şandin. Ji kerema xwe dîsa biceribîne.',
    syncFailed: 'Hevdemkirin bi ser neket. Ji kerema xwe girêdana xwe kontrol bike.',
    storageFull: 'Hilanîna cîhazê tijî ye. Ji kerema xwe tomarên kevn jê bike.',
  },

  common: {
    yes: 'Erê', no: 'Na', cancel: 'Betal bike', confirm: 'Piştrast bike',
    back: 'Paş', next: 'Pêşve', loading: 'Tê barkirin…',
    unknown: 'Nenas', offline: 'Offline', online: 'Online',
  },
};
