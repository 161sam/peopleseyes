import { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';
import type { Translations } from '../schema.js';

export const ps: Translations = {
  app: { name: 'PeoplesEyes', tagline: 'سره يو ځای وګورو. خوندي ثبت کړو.' },

  nav: { map: 'نقشه', report: 'راپور', rights: 'حقوق', evidence: 'شواهد', settings: 'تنظیمات', history: 'تاریخچه' },

  map: {
    title: 'اوسني مشاهدې',
    noReports: 'پدې سیمه کې اوسني راپورونه نشته.',
    loading: 'نقشه لوډیږي…',
    zoomIn: 'د توضیحاتو لپاره نږدې کړئ',
    reportHere: 'دلته راپور ورکړئ',
    lastUpdated: 'وروستي ځل تازه شوی',
    reportsInArea: 'پدې سیمه کې راپورونه',
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
    title: 'مشاهده راپور کړئ',
    subtitle: 'ستاسو راپور پټ دی. د ځای خام ډیټا ستاسو وسیله نه پریږدي.',
    step: {
      authority: 'کومه واک لرونکي؟',
      activity: 'څه وليدل شول؟',
      confidence: 'تاسو سره څومره ډاډمن یاست؟',
      description: 'اختیاري توضیح',
      confirm: 'تایید کړئ',
    },
    authorityLabel: 'واک لرونکي',
    activityLabel: 'فعالیت',
    confidenceLabel: 'ډاډمنتیا',
    descriptionLabel: 'توضیح (اختیاري)',
    descriptionPlaceholder: 'د هغه چې مو ولیدل لنډه او واقعي توضیح…',
    descriptionHint: 'شخصي معلومات، نومونه یا د موټر نمبرونه مه لیکئ. لږ تر لږه ۲۸۰ توری.',
    submitButton: 'پټ ډول راپور ورکړئ',
    cancelButton: 'لغوه کړئ',
    successMessage: 'راپور پټ ډول واستول شو.',
    searchAuthority: 'واک لرونکي وپلټئ…',
    groupFederal: 'فدرالي پولیس',
    groupState: 'د ایالت پولیس',
    groupImmigration: 'د بهرنیانو اداره',
    groupFrontex: 'فرونتکس / ګډ',
    unknownAuthority: 'روښانه نه پیژندل کیږي →',
    activityGroupControl: 'کنټرول',
    activityGroupOperation: 'عملیات',
    legalDisclaimer:
      'دا اپلیکیشن د ثبت او معلوماتو لپاره دی. غلط راپورونه کیدای شي قانوني پایلې ولري. یوازې هغه چې واقعیا مو ولیدل راپور ورکړئ.',
  },

  authority: {
    [AuthorityCategory.BundespolizeiBahn]: 'فدرالي پولیس (ریل / سټیشن)',
    [AuthorityCategory.BundespolizeiFlughafen]: 'فدرالي پولیس (هوایيډګر)',
    [AuthorityCategory.BundespolizeiGrenze]: 'فدرالي پولیس (سرحدي تیرېدو ځای)',
    [AuthorityCategory.BundespolizeiMobil]: 'فدرالي پولیس (متحرک)',
    [AuthorityCategory.LandespolizeiSchwerpunktkontrolle]: 'د ایالت پولیس – ډیر کنټرول',
    [AuthorityCategory.LandespolizeiRazzia]: 'د ایالت پولیس – چاپه / لوی عملیات',
    [AuthorityCategory.LandespolizeiAllgemein]: 'د ایالت پولیس (عمومي)',
    [AuthorityCategory.AuslaenderbehördeUnterkuenfte]: 'د بهرنیانو اداره – استوګنه',
    [AuthorityCategory.AuslaenderbehördeVorführung]: 'د بهرنیانو اداره – احضار',
    [AuthorityCategory.AuslaenderbehördeAbschiebung]: 'د بهرنیانو اداره – اخراج',
    [AuthorityCategory.FrontexPatrouille]: 'فرونتکس – پاترول',
    [AuthorityCategory.FrontexOperation]: 'فرونتکس – عملیات',
    [AuthorityCategory.GemeinsameBundLand]: 'ګډ فدرالي او ایالتي عملیات',
    [AuthorityCategory.GemeinsameMitFrontex]: 'د فرونتکس سره ګډ عملیات',
    [AuthorityCategory.Unbekannt]: 'روښانه نه پیژندل کیږي',
  },

  activity: {
    [ObservedActivityType.Identitaetskontrolle]: 'د هویت / سند کنټرول',
    [ObservedActivityType.StationaereKontrolle]: 'ثابت چک پوسته',
    [ObservedActivityType.Patrouille]: 'پاترول',
    [ObservedActivityType.Fahrzeugkontrolle]: 'د موټر کنټرول',
    [ObservedActivityType.Zugriff]: 'نیول / لیدل شوې نیونه',
    [ObservedActivityType.Transport]: 'د خلکو لیږدول (موټر / بس)',
    [ObservedActivityType.DurchsuchungGebaeude]: 'د ودانۍ / استوګنې لټول',
    [ObservedActivityType.Sonstiges]: 'نور',
  },

  confidence: {
    [ObservationConfidence.Direkt]: 'ما دا پخپله مستقیم ولیدل',
    [ObservationConfidence.Weitergeleitet]: 'له باوري سرچینې لیږدول شوی',
    [ObservationConfidence.Unsicher]: 'ډاډمن نه یم – کیدای شي بل څه وي',
  },

  rights: {
    title: 'ستاسو حقوق',
    disclaimer:
      'لاندې معلومات عمومي ډول لري او د قانوني مشورې ځای نه نیسي. د ځانګړو حالتونو کې د قانوني مشورې مرکز سره اړیکه ونیسئ.',
    topics: {
      identityControl: {
        title: 'د هویت کنټرول',
        summary: 'پولیس کولای شي چې ستاسو هویت وپلټي که چیرې ځانګړی دلیل وي.',
        keyPoints: [
          'تاسو کولای شئ وپوښتئ: "ایا زه مجبور یم چې خپل ځان معرفي کړم?"',
          'د عکس سره پیژندپاڼه (ملي پیژندپاڼه، پاسپورت) کافي دی.',
          'تاسو نه یاست مجبور چې خپل اصلیت یا د هلته د شتون دلیل بیان کړئ.',
          'بې سند: پولیس کولای شي تاسو د هویت ټاکلو لپاره یو څو ساعته ولري.',
          'ولیکئ: نیټه، وخت، ځای، د بیج شمیره، شاهدان.',
        ],
      },
      search: {
        title: 'لټون',
        summary: 'ستاسو بدن یا کور لټول عموماً د محکمې امر ته اړتیا لري.',
        keyPoints: [
          'وپوښتئ: "ایا تاسو د لټون امر لرئ?"',
          'غوښتنه وکړئ چې امر وګورئ او دقت سره یې ولولئ.',
          'تاسو کولای شئ مخالفت وکړئ – دا لټون نه ودروي، مګر د وروسته اپیل لپاره مهم دی.',
          'هر هغه چې لټول کیږي او اخیستل کیږي ولیکئ.',
          'د نیول شوو شیانو لپاره رسید وغواړئ.',
        ],
      },
      arrest: {
        title: 'نیول / پوښتنه',
        summary: 'تاسو د خاموشۍ حق لرئ – دا حق تل پلي کیږي.',
        keyPoints: [
          'روښانه ووایاست: "زه غواړم له وکیل سره خبرې وکړم."',
          'تاسو مجبور نه یاست چې د شخصي معلوماتو پرته نور معلومات ورکړئ.',
          'د نیولو دلیل پر لیک وغواړئ.',
          'باید تاسو د نیولو بل ورځ له قاضي سره مخامخ شئ.',
          'فوري اړیکه ونیسئ: د قانوني مرستې کرښه یا باوري وکیل.',
        ],
      },
      recording: {
        title: 'پولیس ریکارډ کول',
        summary: 'د عامه ځایونو کې د پولیس عملیاتو ریکارډ کول عموماً اجازه لري.',
        keyPoints: [
          'د عامه ځایونو کې د رسمي کارونو ریکارډ کول د بیان ازادۍ (مادې 5 GG) لاندې راځي.',
          'د شالید کې د پیژندلو وړ خصوصي خلکو مخونه باید پټ شي (GDPR).',
          'پولیسانو د ریکارډ کولو مخنیوي یا ستاسو تلیفون اخیستو عمومي حق نه لري.',
          'تلیفون اخیستو ته د محکمې امر اړین دی.',
          'ریکارډونه ژر کلاوډ ته پورته کړئ یا د باوري چا سره یې شریک کړئ.',
        ],
      },
      silence: {
        title: 'د خاموشۍ حق',
        summary: 'تاسو حق لرئ چې د پوښتنو ځوابولو انکار وکړئ. له هغه سره اراماو ګټه واخلئ.',
        keyPoints: [
          'ووایاست: "زه د خاموشۍ حق کاروم او وکیل ته اړتیا لرم."',
          'خاموشي نه شي کارول کیدای ستاسو پر وړاندې.',
          'د قضیې سره تړلي هیڅ بیان مه ورکوئ – حتی هغه چې بی ضرره ښکاري.',
          'بیړني اړیکې: GFF (د مدني حقوقو ټولنه)، RAV (د جمهوري پلوه وکیلانو ټولنه).',
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
    title: 'د شواهدو ساتنه',
    empty: 'تر اوسه هیڅ ریکارډ خوندي شوی نه دی.',
    recordVideo: 'ویدیو ریکارډ کړئ',
    recordAudio: 'غږ ریکارډ کړئ',
    takePhoto: 'عکس واخلئ',
    exifWarning: 'د GPS ډیټا او د وسیلې معلومات له ټولو ریکارډونو اتوماتیک لرې کیږي.',
    deleteConfirm: 'ریکارډ دایمي حذف شي؟',
    storageWarning: 'ریکارډونه یوازې ستاسو وسیله کې خوندي دي. مهم ریکارډونه یو خوندي ځای کې بیک اپ کړئ.',
  },

  settings: {
    title: 'تنظیمات',
    language: 'ژبه',
    reportResolution: 'د راپور دقت',
    reportResolutionHint: 'کم ریزولوشن ستاسو پټوالی زیاتوي. ډیفالټ: د محلې کچه (~5 km²).',
    persistEvidence: 'شواهد محلي خوندي کړئ',
    persistEvidenceHint: 'بند: ریکارډونه یوازې حافظه کې ساتل کیږي او د بیا پیل کولو وروسته حذف کیږي.',
    notifications: 'د نږدې راپورونو خبرتیاوې',
    notificationsHint: 'د ځای لاسرسي ته اړتیا لري. ځای یوازې محلي کارول کیږي.',
    about: 'د PeoplesEyes په اړه',
    sourceCode: 'سرچینه کوډ (GitHub)',
    legalNotice: 'قانوني خبرتیا',
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
    locationDenied: 'د ځای لاسرسی رد شو. د براوزر تنظیماتو کې اجازه ورکړئ.',
    locationUnavailable: 'ځای نه شو ټاکلی.',
    reportFailed: 'راپور نه شو لیږلی. بیا هڅه وکړئ.',
    syncFailed: 'همغږي ناکامه شوه. خپله اتصال وپلټئ.',
    storageFull: 'د وسیلې ذخیره ډکه ده. زوړ ریکارډونه حذف کړئ.',
  },

  common: {
    yes: 'هو', no: 'نه', cancel: 'لغوه کړئ', confirm: 'تایید کړئ',
    back: 'شاته', next: 'وړاندې', loading: 'لوډیږي…',
    unknown: 'نامعلوم', offline: 'آفلاین', online: 'آنلاین',
  },
};
