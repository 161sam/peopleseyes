import { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';
import type { Translations } from '../schema.js';

export const sw: Translations = {
  app: { name: 'PeoplesEyes', tagline: 'Tunaangalia pamoja. Kuandika kwa usalama.' },

  nav: { map: 'Ramani', report: 'Ripoti', rights: 'Haki', evidence: 'Ushahidi', settings: 'Mipangilio', history: 'Historia' },

  map: {
    title: 'Uchunguzi wa sasa',
    noReports: 'Hakuna ripoti za sasa katika eneo hili.',
    loading: 'Ramani inachargwa…',
    zoomIn: 'Karibishana kwa maelezo',
    reportHere: 'Ripoti hapa',
    lastUpdated: 'Ilisasishwa mara ya mwisho',
    reportsInArea: 'Ripoti katika eneo hili',
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
    title: 'Ripoti uchunguzi',
    subtitle: 'Ripoti yako ni ya siri. Data ghafi za eneo haziondoki kwenye kifaa chako.',
    step: {
      authority: 'Mamlaka gani?',
      activity: 'Nini kilionekana?',
      confidence: 'Una uhakika kiasi gani?',
      description: 'Maelezo ya hiari',
      confirm: 'Thibitisha',
    },
    authorityLabel: 'Mamlaka',
    activityLabel: 'Shughuli',
    confidenceLabel: 'Uhakika',
    descriptionLabel: 'Maelezo (hiari)',
    descriptionPlaceholder: 'Maelezo mafupi na ya ukweli ya ulichoona…',
    descriptionHint: 'Usiingize data za kibinafsi, majina au nambari za magari. Hadi herufi 280.',
    submitButton: 'Ripoti kwa siri',
    cancelButton: 'Ghairi',
    successMessage: 'Ripoti imetumwa kwa siri.',
    searchAuthority: 'Tafuta mamlaka…',
    groupFederal: 'Polisi ya Shirikisho',
    groupState: 'Polisi ya Jimbo',
    groupImmigration: 'Ofisi ya Wageni',
    groupFrontex: 'Frontex / Pamoja',
    unknownAuthority: 'Haiwezi kutambuliwa wazi →',
    activityGroupControl: 'Ukaguzi',
    activityGroupOperation: 'Operesheni',
    stepContext: 'How are you involved?', // TODO: translate
    contextAffected: 'I am directly affected', // TODO: translate
    contextAffectedSub: 'Stop, arrest, or similar', // TODO: translate
    contextWitness: 'I am witnessing something', // TODO: translate
    contextWitnessSub: 'I see it, but am not directly affected', // TODO: translate
    stepActivity: 'What is happening?', // TODO: translate
    stepActivitySub: 'Tap what you see', // TODO: translate
    stepAuthority: 'Who is involved?', // TODO: translate
    authorityHintPrefix: 'Common for {activity}:', // TODO: translate
    authorityUnknownLabel: "Don't know / Not identifiable", // TODO: translate
    authorityUnknownSub: 'Send report anyway', // TODO: translate
    authorityShowAll: 'Show all authorities', // TODO: translate
    stepTiming: 'When did this happen?', // TODO: translate
    timingNow: 'Right now', // TODO: translate
    timing15: '~15 min ago', // TODO: translate
    timing60: '~1 hour ago', // TODO: translate
    gpsUnavailable: 'GPS unavailable — location is required for this report.', // TODO: translate
    legalDisclaimer:
      'Programu hii ni kwa ajili ya hati na taarifa. Ripoti za uongo zinaweza kuwa na matokeo ya kisheria. Ripoti tu unachokiona kweli.',
  },

  authority: {
    [AuthorityCategory.BundespolizeiBahn]: 'Polisi ya Shirikisho (Treni / Stesheni)',
    [AuthorityCategory.BundespolizeiFlughafen]: 'Polisi ya Shirikisho (Uwanja wa Ndege)',
    [AuthorityCategory.BundespolizeiGrenze]: 'Polisi ya Shirikisho (Mpakani)',
    [AuthorityCategory.BundespolizeiMobil]: 'Polisi ya Shirikisho (inayosogea)',
    [AuthorityCategory.LandespolizeiSchwerpunktkontrolle]: 'Polisi ya Jimbo – Ukaguzi Mkubwa',
    [AuthorityCategory.LandespolizeiRazzia]: 'Polisi ya Jimbo – Uvamizi / Operesheni Kubwa',
    [AuthorityCategory.LandespolizeiAllgemein]: 'Polisi ya Jimbo (ya jumla)',
    [AuthorityCategory.AuslaenderbehördeUnterkuenfte]: 'Ofisi ya Wageni – Makazi',
    [AuthorityCategory.AuslaenderbehördeVorführung]: 'Ofisi ya Wageni – Wito',
    [AuthorityCategory.AuslaenderbehördeAbschiebung]: 'Ofisi ya Wageni – Urudishaji',
    [AuthorityCategory.FrontexPatrouille]: 'Frontex – Doria',
    [AuthorityCategory.FrontexOperation]: 'Frontex – Operesheni',
    [AuthorityCategory.GemeinsameBundLand]: 'Operesheni ya Pamoja ya Shirikisho na Jimbo',
    [AuthorityCategory.GemeinsameMitFrontex]: 'Operesheni ya Pamoja na Frontex',
    [AuthorityCategory.Unbekannt]: 'Haiwezi kutambuliwa wazi',
  },

  activity: {
    [ObservedActivityType.Identitaetskontrolle]: 'Ukaguzi wa utambulisho / hati',
    [ObservedActivityType.StationaereKontrolle]: 'Kituo cha ukaguzi cha kudumu',
    [ObservedActivityType.Patrouille]: 'Doria',
    [ObservedActivityType.Fahrzeugkontrolle]: 'Ukaguzi wa gari',
    [ObservedActivityType.Zugriff]: 'Kukamatwa / kuacha kuonekana',
    [ObservedActivityType.Transport]: 'Usafirishaji wa watu (gari / basi)',
    [ObservedActivityType.DurchsuchungGebaeude]: 'Upekuzi wa jengo / makazi',
    [ObservedActivityType.Sonstiges]: 'Nyingine',
  },

  confidence: {
    [ObservationConfidence.Direkt]: 'Nimeona hili mwenyewe moja kwa moja',
    [ObservationConfidence.Weitergeleitet]: 'Imepitishwa kutoka chanzo cha kuaminika',
    [ObservationConfidence.Unsicher]: 'Sina uhakika – inaweza kuwa kitu kingine',
  },

  rights: {
    title: 'Haki zako',
    disclaimer:
      'Taarifa zifuatazo ni za jumla na hazibadilishi ushauri wa kisheria. Katika hali maalum, wasiliana na kituo cha ushauri wa kisheria.',
    topics: {
      identityControl: {
        title: 'Ukaguzi wa Utambulisho',
        summary: 'Polisi inaweza kuthibitisha utambulisho wako ikiwa kuna sababu maalum.',
        keyPoints: [
          'Unaweza kuuliza: "Je, ninatakiwa kujionyesha?"',
          'Kitambulisho chenye picha (kitambulisho cha taifa, paspoti) kinatosha.',
          'Huhitaji kufichua asili yako au sababu ya kuwepo kwako.',
          'Bila kitambulisho: polisi inaweza kukushikilia kwa kuthibitisha utambulisho, masaa machache tu.',
          'Andika: tarehe, muda, mahali, nambari ya beji ya afisa, mashahidi.',
        ],
      },
      search: {
        title: 'Upekuzi',
        summary: 'Upekuzi wa mtu au nyumba kwa kawaida unahitaji amri ya mahakama.',
        keyPoints: [
          'Uliza: "Je, una amri ya upekuzi?"',
          'Omba kuona amri na uisomee kwa makini.',
          'Unaweza kupinga – hii haitazuia upekuzi, lakini ni muhimu kwa rufaa za baadaye.',
          'Andika kila kitu kinachopekuzi na kukamatiwa.',
          'Omba risiti kwa vitu vilivyokamatiwa.',
        ],
      },
      arrest: {
        title: 'Kukamatwa / Mahojiano',
        summary: 'Una haki ya kukaa kimya – haki hii inatumika wakati wote.',
        keyPoints: [
          'Sema wazi: "Nataka kuzungumza na wakili."',
          'Huhitajiki kutoa taarifa zaidi ya data zako za kibinafsi.',
          'Omba kwa maandishi sababu ya kukamatwa kwako.',
          'Lazima uletwe mbele ya jaji sio zaidi ya siku inayofuata baada ya kukamatwa.',
          'Wasiliana mara moja: mstari wa usaidizi wa kisheria au wakili unayemwamini.',
        ],
      },
      recording: {
        title: 'Kupiga Picha Polisi',
        summary: 'Kupiga picha operesheni za polisi katika maeneo ya umma kwa ujumla kuruhusiwa.',
        keyPoints: [
          'Kupiga picha vitendo rasmi katika maeneo ya umma kulindwa na uhuru wa kujieleza (Ibara ya 5 GG).',
          'Nyuso zinazotambuliwa za watu binafsi nyuma zinapaswa kufunikwa (GDPR).',
          'Maafisa hawana haki ya jumla ya kukuzuia kupiga picha au kukutwaa simu.',
          'Kuchukua simu kunahitaji amri ya mahakama.',
          'Pakia rekodi haraka kwa hifadhi ya wingu au zishirikishe na mtu unayemwamini.',
        ],
      },
      silence: {
        title: 'Haki ya Kukaa Kimya',
        summary: 'Una haki ya kukataa kujibu maswali. Itumie kwa utulivu.',
        keyPoints: [
          'Sema: "Ninatumia haki yangu ya kukaa kimya na ninahitaji wakili."',
          'Ukimya hauwezi kutumiwa dhidi yako.',
          'Usitoe taarifa yoyote kuhusu jambo – hata zile zinaonekana zisizo na madhara.',
          'Mawasiliano ya dharura: GFF (Jumuiya ya Haki za Kiraia), RAV (Chama cha Wanasheria wa Jamhuri).',
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
    title: 'Kulinda Ushahidi',
    empty: 'Hakuna rekodi zilizohifadhiwa bado.',
    recordVideo: 'Rekodi video',
    recordAudio: 'Rekodi sauti',
    takePhoto: 'Piga picha',
    exifWarning: 'Data za GPS na taarifa za kifaa huondolewa kiotomatiki kutoka kwa rekodi zote.',
    deleteConfirm: 'Futa rekodi kabisa?',
    storageWarning: 'Rekodi huhifadhiwa ndani ya kifaa chako tu. Hifadhi nakala za rekodi muhimu mahali salama.',
  },

  settings: {
    title: 'Mipangilio',
    language: 'Lugha',
    reportResolution: 'Usahihi wa ripoti',
    reportResolutionHint: 'Azimio zuri zaidi huongeza faragha yako. Chaguo-msingi: kiwango cha mtaa (~5 km²).',
    persistEvidence: 'Hifadhi rekodi ndani',
    persistEvidenceHint: 'Imezimwa: rekodi huhifadhiwa kwenye kumbukumbu tu na kufutwa baada ya kuanzisha upya.',
    notifications: 'Arifa kwa ripoti za karibu',
    notificationsHint: 'Inahitaji ufikiaji wa eneo. Eneo linatumika ndani tu.',
    about: 'Kuhusu PeoplesEyes',
    sourceCode: 'Msimbo chanzo (GitHub)',
    legalNotice: 'Tangazo la kisheria',
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
    locationDenied: 'Ufikiaji wa eneo ulikataliwa. Ruhusu ufikiaji katika mipangilio ya kivinjari.',
    locationUnavailable: 'Eneo halikuweza kuamuliwa.',
    reportFailed: 'Ripoti haikuweza kutumwa. Tafadhali jaribu tena.',
    syncFailed: 'Usawazishaji umeshindwa. Angalia muunganisho wako.',
    storageFull: 'Hifadhi ya kifaa imejaa. Tafadhali futa rekodi za zamani.',
  },

  common: {
    yes: 'Ndiyo', no: 'Hapana', cancel: 'Ghairi', confirm: 'Thibitisha',
    back: 'Rudi', next: 'Endelea', loading: 'Inachargia…',
    unknown: 'Haijulikani', offline: 'Nje ya mtandao', online: 'Mtandaoni',
  },
};
