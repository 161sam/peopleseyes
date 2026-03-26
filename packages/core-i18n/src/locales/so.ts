import { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';
import type { Translations } from '../schema.js';

export const so: Translations = {
  app: { name: 'PeoplesEyes', tagline: 'Waxaan si wadajir ah u daawanaynaa. Si ammaan ah u dukumeyntaynaa.' },

  nav: { map: 'Khariidad', report: 'Warbixin', rights: 'Xuquuq', evidence: 'Caddayn', settings: 'Dejinta', history: 'Taariikhda' },

  map: {
    title: 'Aragtiyada hadda',
    noReports: 'Ma jiraan warbixino hadda ah ee goobtan.',
    loading: 'Khariidadda ayaa la rarayo…',
    zoomIn: 'Zoom-garee si aad faahfaahin u hesho',
    reportHere: 'Warbixin halkan ka dir',
    lastUpdated: 'Markii ugu dambeysay la cusboonaysiiyay',
    reportsInArea: 'Warbixinada goobtan',
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
    title: 'Aragtida u dir warbixin',
    subtitle: 'Warbixintaadu waa mid qarsoodi ah. Xogta goobta ah ee raw-ka ah ma baxayso qalabkaaga.',
    step: {
      authority: 'Xukuumad kee?',
      activity: 'Maxaa la arkay?',
      confidence: 'Intee baad ku kalsoon tahay?',
      description: 'Sharaxaad ikhtiyaari ah',
      confirm: 'Xaqiiji',
    },
    authorityLabel: 'Xukuumad',
    activityLabel: 'Waxqabad',
    confidenceLabel: 'Kalsooni',
    descriptionLabel: 'Sharaxaad (ikhtiyaari)',
    descriptionPlaceholder: 'Sharaxaad gaaban oo xaqiiq ah ee waxa aad aragtay…',
    descriptionHint: 'Ha gelinin xogta shaqsiga, magacyada ama lambarka gaariga. Ugu badnaan 280 xaraf.',
    submitButton: 'U dir qarsoodi ahaan',
    cancelButton: 'Baaji',
    successMessage: 'Warbixinta si qarsoodi ah ayaa loo gudbiyay.',
    searchAuthority: 'Raadi xukuumad…',
    groupFederal: 'Booliska Federaalka',
    groupState: 'Booliska Gobolka',
    groupImmigration: 'Xafiiska Shisheeye',
    groupFrontex: 'Frontex / Wadajir',
    unknownAuthority: 'Si cad looma garan karo →',
    activityGroupControl: 'Xukumo',
    activityGroupOperation: 'Hawlgal',
    legalDisclaimer:
      'App-kani wuxuu u shaqeeyaa dukumeyntaynta iyo xogta. Warbixinada been abuurka ah waxay lahaankaraan cawaaqib sharci ah. Wax kaliya u dir waxa aad dhab ahaan aragtay.',
  },

  authority: {
    [AuthorityCategory.BundespolizeiBahn]: 'Booliska Federaalka (Tareenka / Saldhigga)',
    [AuthorityCategory.BundespolizeiFlughafen]: 'Booliska Federaalka (Garoonka Diyaaradaha)',
    [AuthorityCategory.BundespolizeiGrenze]: 'Booliska Federaalka (Xadka)',
    [AuthorityCategory.BundespolizeiMobil]: 'Booliska Federaalka (Gaadiidka)',
    [AuthorityCategory.LandespolizeiSchwerpunktkontrolle]: 'Booliska Gobolka – Xukumo Xoogan',
    [AuthorityCategory.LandespolizeiRazzia]: 'Booliska Gobolka – Beeri / Hawlgal Weyn',
    [AuthorityCategory.LandespolizeiAllgemein]: 'Booliska Gobolka (guud)',
    [AuthorityCategory.AuslaenderbehördeUnterkuenfte]: 'Xafiiska Shisheeye – Hoy',
    [AuthorityCategory.AuslaenderbehördeVorführung]: 'Xafiiska Shisheeye – Xaadir',
    [AuthorityCategory.AuslaenderbehördeAbschiebung]: 'Xafiiska Shisheeye – Tarxiil',
    [AuthorityCategory.FrontexPatrouille]: 'Frontex – Jeex',
    [AuthorityCategory.FrontexOperation]: 'Frontex – Hawlgal',
    [AuthorityCategory.GemeinsameBundLand]: 'Hawlgal wadajir ah oo Federaal + Gobol',
    [AuthorityCategory.GemeinsameMitFrontex]: 'Hawlgal wadajir ah oo Frontex la leh',
    [AuthorityCategory.Unbekannt]: 'Si cad looma garan karo',
  },

  activity: {
    [ObservedActivityType.Identitaetskontrolle]: 'Xukumo aqoonsiga / dukumeentiyada',
    [ObservedActivityType.StationaereKontrolle]: 'Meelaha xukumo ee joogta ah',
    [ObservedActivityType.Patrouille]: 'Jeex',
    [ObservedActivityType.Fahrzeugkontrolle]: 'Xukumo gaariga',
    [ObservedActivityType.Zugriff]: 'Qabasho / Kaxaynta la arkay',
    [ObservedActivityType.Transport]: 'Qaadista dadka (gaariga / bas)',
    [ObservedActivityType.DurchsuchungGebaeude]: 'Baaritaanka dhismaha / hoyga',
    [ObservedActivityType.Sonstiges]: 'Kuwa kale',
  },

  confidence: {
    [ObservationConfidence.Direkt]: 'Anigoo keligay ayaan arkaay',
    [ObservationConfidence.Weitergeleitet]: 'Laga helay ilo aamin ah',
    [ObservationConfidence.Unsicher]: 'Aan hubin – waxay noqon kartaa wax kale',
  },

  rights: {
    title: 'Xuquuqdaada',
    disclaimer:
      'Macluumaadka soo socda waa mid guud ah mana bedelin karin talo xeer. Xaaladaha gaar ah, la xiriir xarun talobixin xeer.',
    topics: {
      identityControl: {
        title: 'Xukumo Aqoonsiga',
        summary: 'Booliisku wuxuu xaqiijin karaa aqoonsigaaga haddii sabab gaar ah jirto.',
        keyPoints: [
          'Waxaad weydiin kartaa: "Ma waajib baan u ahay inaan isu aqoonsado?"',
          'Dukumeenti leh sawir (kaardhiga aqoonsiga, baasaboortiga) ayaa ku filan.',
          'Asal ahaanshahaga ama sababta joogitaankaaga kuma sharaxno.',
          'Dukumeenti la\'aanta: booliisku wuxuu kuu hayn karaa saacado yar si aqoonsiga loo go\'aamiyo.',
          'Qor: taariikh, wakti, meel, lambarka xubinta booliska, markhaatiyada.',
        ],
      },
      search: {
        title: 'Baaritaan',
        summary: 'Baaritaanka jidhkaaga ama gurigaaga guud ahaan wuxuu u baahan yahay amarka maxkamada.',
        keyPoints: [
          'Weydii: "Ma leedihiin amarka baaritaanka?"',
          'Codso inaad amarkii aragto oo si taxadar leh u akhrido.',
          'Waxaad ka soo horjeedsanaan kartaa – tani ma joojin doonto baaritaanka, laakiin waa muhiim dacwadaha mustaqbalka.',
          'Qor wax kasta oo la baaro oo la xidho.',
          'Raadso resiidh ee walxaha la xiray.',
        ],
      },
      arrest: {
        title: 'Qabasho / Soocid',
        summary: 'Xuquuq baad u leedahay inaad aamusato – xaqan mar walba wuu shaqeynayaa.',
        keyPoints: [
          'Si cad u sheeg: "Waxaan rabaa inaan la xiriiro qareen."',
          'Xogta shaqsiga ka baxsan macluumaad bixinta ama waajib ma aha.',
          'Codso qoraal ah sabab xiritaanka.',
          'Ugu dambeyntii maalinta xigta ee xiritaanka ka dib aad gadi doontaa maxkamada.',
          'Isla markiiba la xiriir: khadka gargaarka xeerka ama qareen aaminsan.',
        ],
      },
      recording: {
        title: 'Duulidda Booliska',
        summary: 'Duulidda hawlgalada booliska ee meelaha dadweynaha guud ahaan waxa loo oggolyahay.',
        keyPoints: [
          'Duulidda ficilada rasmi ee meelaha dadweynaha waxay ku jirtaa xorriyadda hadalka (Qodobka 5 GG).',
          'Wejiyadda dadka gaarka ah ee la garan karo ee gadaashiisa waa in lagu daboolo (GDPR).',
          'Saraakiisha guud ahaan ma laha xuquuq inay kaa joojiyaan duulidda ama ay qaadaan telefoonkaaga.',
          'Qaadashada telefoonka waxay u baahan tahay amarka maxkamada.',
          'Diiwaangelintaada si dhakhso ah ugu geli daabacaadda ama la wadaag qof aaminsan.',
        ],
      },
      silence: {
        title: 'Xuquuqa Aamusiga',
        summary: 'Xuquuq baad u leedahay inaad diiddo inaad su\'aasha ka jawaabtid. Si xasiloon u adeegsado.',
        keyPoints: [
          'Sheeg: "Waxaan adeegsanaayaa xuquuqayga aamusiga waxaanna u baahnahay qareen."',
          'Aamusiga laguma isticmaali karo si lagugu soo hor joogsado.',
          'Hadal kuma bixin arrimaha – kuwa u muuqda inay beezsanahayn mid.',
          'Xiriirka degdegga ah: GFF (Ururka Xuquuqda Madaniga), RAV (Ururka Qareennada Jamhuuriyadda).',
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
    title: 'Ilaalinta Caddaynta',
    empty: 'Wali ma jiraan diiwaangelimo la kaydiyay.',
    recordVideo: 'Diiwaangeli muuqaal',
    recordAudio: 'Diiwaangeli cod',
    takePhoto: 'Sawir qaado',
    exifWarning: 'Xogta GPS-ka iyo macluumaadka qalabka si toos ah ayaa looga saaraa dhammaan diiwaangelimaadka.',
    deleteConfirm: 'Diiwaangelintii si joogto ah ma tirtirto?',
    storageWarning: 'Diiwaangelimaadku waxay ku kaydsan yihiin qalabkaaga oo keliya. Kaydso nuqulka muhiimka ah meel ammaan ah.',
  },

  settings: {
    title: 'Dejinta',
    language: 'Luqad',
    reportResolution: 'Saxnaanta warbixinta',
    reportResolutionHint: 'Go\'aan yar oo ka weyn wuxuu kordhinayaa qarsooniyadaada. Default: heerka xaafadda (~5 km²).',
    persistEvidence: 'Kayd caddaynta gudaha',
    persistEvidenceHint: 'Dami: diiwaangelimaadku waxay ku kaydsan yihiin xusuusta oo keliya waxayna tirtirayaan dib u bilaabista kadib.',
    notifications: 'Digniinta warbixinada dhow',
    notificationsHint: 'Waxay u baahan tahay helitaanka goobta. Goobtu waxay loo adeegsadaa oo keliya gudaha.',
    about: 'Ku saabsan PeoplesEyes',
    sourceCode: 'Koodka isha (GitHub)',
    legalNotice: 'Ogeysiiska sharciga',
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
    locationDenied: 'Helitaanka goobta waa la diiday. Ogolow helitaanka settings-ka browser-kaaga.',
    locationUnavailable: 'Goobta lama go\'aamin karin.',
    reportFailed: 'Warbixinta lama gudbin. Fadlan mar kale isku day.',
    syncFailed: 'Isku-duwida waa ku fashilantay. Xiriirkaaga hubi.',
    storageFull: 'Kaydka qalabku wuu buuxay. Fadlan tirtir diiwaangelimaadka duugga ah.',
  },

  common: {
    yes: 'Haa', no: 'Maya', cancel: 'Baaji', confirm: 'Xaqiiji',
    back: 'Dib', next: 'Xiga', loading: 'La rarayo…',
    unknown: 'Aan la garanayn', offline: 'Offline', online: 'Online',
  },
};
