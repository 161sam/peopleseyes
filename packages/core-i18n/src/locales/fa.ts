import { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';
import type { Translations } from '../schema.js';

export const fa: Translations = {
  app: { name: 'PeoplesEyes', tagline: 'با هم نظاره می‌کنیم. با امنیت مستند می‌سازیم.' },

  nav: { map: 'نقشه', report: 'گزارش', rights: 'حقوق', evidence: 'مدرک', settings: 'تنظیمات' },

  map: {
    title: 'مشاهدات جاری',
    noReports: 'گزارش فعالی در این منطقه وجود ندارد.',
    loading: 'در حال بارگذاری نقشه…',
    zoomIn: 'برای جزئیات بزرگ‌نمایی کنید',
    reportHere: 'اینجا گزارش دهید',
    lastUpdated: 'آخرین به‌روزرسانی',
    reportsInArea: 'گزارش‌ها در این منطقه',
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
    title: 'گزارش مشاهده',
    subtitle: 'گزارش شما ناشناس است. داده‌های خام موقعیت مکانی دستگاه را ترک نمی‌کنند.',
    step: {
      authority: 'کدام مقام؟',
      activity: 'چه چیزی مشاهده شد؟',
      confidence: 'چقدر مطمئن هستید؟',
      description: 'توضیح اختیاری',
      confirm: 'تأیید',
    },
    authorityLabel: 'مقام',
    activityLabel: 'فعالیت',
    confidenceLabel: 'اطمینان',
    descriptionLabel: 'توضیح (اختیاری)',
    descriptionPlaceholder: 'شرح واقعی و کوتاهی از آنچه مشاهده کردید…',
    descriptionHint: 'اطلاعات شخصی، نام یا پلاک وارد نکنید. حداکثر ۲۸۰ کاراکتر.',
    submitButton: 'ناشناس گزارش دهید',
    cancelButton: 'انصراف',
    successMessage: 'گزارش به صورت ناشناس ارسال شد.',
    searchAuthority: 'جستجوی مقام…',
    groupFederal: 'پلیس فدرال',
    groupState: 'پلیس ایالت',
    groupImmigration: 'اداره اتباع خارجی',
    groupFrontex: 'فرونتکس / مشترک',
    unknownAuthority: 'قابل تشخیص واضح نیست →',
    activityGroupControl: 'کنترل',
    activityGroupOperation: 'عملیات',
    legalDisclaimer:
      'این برنامه برای مستندسازی و اطلاع‌رسانی است. گزارش‌های کذب ممکن است عواقب قانونی داشته باشد. فقط آنچه واقعاً دیده‌اید را گزارش دهید.',
  },

  authority: {
    [AuthorityCategory.BundespolizeiBahn]: 'پلیس فدرال (قطار / ایستگاه)',
    [AuthorityCategory.BundespolizeiFlughafen]: 'پلیس فدرال (فرودگاه)',
    [AuthorityCategory.BundespolizeiGrenze]: 'پلیس فدرال (گذرگاه مرزی)',
    [AuthorityCategory.BundespolizeiMobil]: 'پلیس فدرال (سیار)',
    [AuthorityCategory.LandespolizeiSchwerpunktkontrolle]: 'پلیس ایالت – کنترل فشرده',
    [AuthorityCategory.LandespolizeiRazzia]: 'پلیس ایالت – یورش / عملیات بزرگ',
    [AuthorityCategory.LandespolizeiAllgemein]: 'پلیس ایالت (عمومی)',
    [AuthorityCategory.AuslaenderbehördeUnterkuenfte]: 'اداره اتباع خارجی – اقامت',
    [AuthorityCategory.AuslaenderbehördeVorführung]: 'اداره اتباع خارجی – احضار',
    [AuthorityCategory.AuslaenderbehördeAbschiebung]: 'اداره اتباع خارجی – اخراج',
    [AuthorityCategory.FrontexPatrouille]: 'فرانتکس – گشت',
    [AuthorityCategory.FrontexOperation]: 'فرانتکس – عملیات',
    [AuthorityCategory.GemeinsameBundLand]: 'عملیات مشترک فدرال و ایالتی',
    [AuthorityCategory.GemeinsameMitFrontex]: 'عملیات مشترک با فرانتکس',
    [AuthorityCategory.Unbekannt]: 'قابل تشخیص نیست',
  },

  activity: {
    [ObservedActivityType.Identitaetskontrolle]: 'بررسی هویت / مدارک',
    [ObservedActivityType.StationaereKontrolle]: 'ایست بازرسی ثابت',
    [ObservedActivityType.Patrouille]: 'گشت‌زنی',
    [ObservedActivityType.Fahrzeugkontrolle]: 'بازرسی خودرو',
    [ObservedActivityType.Zugriff]: 'بازداشت / دستگیری مشاهده شد',
    [ObservedActivityType.Transport]: 'انتقال افراد (خودرو / اتوبوس)',
    [ObservedActivityType.DurchsuchungGebaeude]: 'بازرسی ساختمان / اقامتگاه',
    [ObservedActivityType.Sonstiges]: 'سایر',
  },

  confidence: {
    [ObservationConfidence.Direkt]: 'مستقیماً خودم مشاهده کردم',
    [ObservationConfidence.Weitergeleitet]: 'از منبع موثق منتقل شده',
    [ObservationConfidence.Unsicher]: 'مطمئن نیستم – ممکن است چیز دیگری باشد',
  },

  rights: {
    title: 'حقوق شما',
    disclaimer:
      'اطلاعات زیر جنبه عمومی دارند و جایگزین مشاوره حقوقی نمی‌شوند. در موارد خاص با یک مرکز مشاوره حقوقی تماس بگیرید.',
    topics: {
      identityControl: {
        title: 'بررسی هویت',
        summary: 'پلیس در صورت وجود دلیل مشخص می‌تواند هویت شما را احراز کند.',
        keyPoints: [
          'می‌توانید بپرسید: «آیا موظف به ارائه مدارک هستم؟»',
          'کارت شناسایی با عکس (کارت ملی، پاسپورت) کافی است.',
          'مجبور به اعلام اصل یا دلیل حضور خود نیستید.',
          'در صورت نداشتن مدارک: پلیس می‌تواند شما را برای احراز هویت چند ساعتی نگه دارد.',
          'یادداشت کنید: تاریخ، ساعت، مکان، شماره مأمور، شاهدان.',
        ],
      },
      search: {
        title: 'تفتیش',
        summary: 'تفتیش بدن یا منزل شما معمولاً نیاز به حکم قضایی دارد.',
        keyPoints: [
          'بپرسید: «آیا حکم تفتیش دارید؟»',
          'از آن‌ها بخواهید حکم را نشان دهند و آن را با دقت بخوانید.',
          'می‌توانید اعتراض کنید – این تفتیش را متوقف نمی‌کند اما برای اعتراض بعدی مهم است.',
          'هر آنچه تفتیش و ضبط می‌شود را یادداشت کنید.',
          'برای اشیاء ضبط‌شده رسید بخواهید.',
        ],
      },
      arrest: {
        title: 'بازداشت / بازجویی',
        summary: 'حق سکوت دارید – این حق همیشه معتبر است.',
        keyPoints: [
          'صریحاً بگویید: «می‌خواهم با وکیل صحبت کنم.»',
          'موظف به ارائه هیچ اطلاعاتی فراتر از مشخصات شخصی خود نیستید.',
          'دلیل بازداشت را به صورت کتبی بخواهید.',
          'باید حداکثر روز بعد از بازداشت نزد قاضی حاضر شوید.',
          'فوراً تماس بگیرید: خط کمک حقوقی یا وکیل مورد اعتماد.',
        ],
      },
      recording: {
        title: 'فیلم‌برداری از پلیس',
        summary: 'فیلم‌برداری از عملیات پلیس در فضاهای عمومی به طور کلی مجاز است.',
        keyPoints: [
          'ثبت اقدامات رسمی در فضاهای عمومی تحت آزادی بیان (ماده ۵ قانون اساسی) قرار دارد.',
          'چهره افراد قابل تشخیص در پس‌زمینه باید محو شود (GDPR).',
          'مأموران حق ندارند شما را از فیلم‌برداری باز دارند یا گوشی را ضبط کنند.',
          'ضبط گوشی نیاز به حکم قضایی دارد.',
          'فیلم‌ها را سریعاً در فضای ابری بارگذاری کنید یا با شخص مورد اعتماد به اشتراک بگذارید.',
        ],
      },
      silence: {
        title: 'حق سکوت',
        summary: 'حق دارید از پاسخ به سؤالات امتناع کنید. آرام از این حق استفاده کنید.',
        keyPoints: [
          'بگویید: «از حق سکوت خود استفاده می‌کنم و وکیل می‌خواهم.»',
          'سکوت شما نمی‌تواند علیه شما به کار رود.',
          'هیچ اظهاری درباره موضوع ندهید – حتی ظاهراً بی‌خطر.',
          'تماس‌های اضطراری: GFF (جامعه حقوق مدنی)، RAV (اتحادیه وکلای جمهوری‌خواه).',
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
    title: 'تأمین مدرک',
    empty: 'هنوز هیچ ضبطی ذخیره نشده.',
    recordVideo: 'ضبط ویدیو',
    recordAudio: 'ضبط صدا',
    takePhoto: 'عکس بگیرید',
    exifWarning: 'داده‌های GPS و اطلاعات دستگاه به طور خودکار از تمام ضبط‌ها حذف می‌شوند.',
    deleteConfirm: 'ضبط به طور دائم حذف شود؟',
    storageWarning: 'ضبط‌ها فقط به صورت محلی در دستگاه شما ذخیره می‌شوند. از ضبط‌های مهم در جای امن نسخه پشتیبان تهیه کنید.',
  },

  settings: {
    title: 'تنظیمات',
    language: 'زبان',
    reportResolution: 'دقت گزارش',
    reportResolutionHint: 'دقت کمتر ناشناس‌بودن شما را افزایش می‌دهد. پیش‌فرض: سطح محله (~۵ کیلومتر مربع).',
    persistEvidence: 'ذخیره ضبط‌ها به صورت محلی',
    persistEvidenceHint: 'خاموش: ضبط‌ها فقط در حافظه نگهداری می‌شوند و پس از راه‌اندازی مجدد حذف می‌شوند.',
    notifications: 'اعلان برای گزارش‌های نزدیک',
    notificationsHint: 'نیاز به دسترسی به موقعیت مکانی دارد. موقعیت مکانی فقط به صورت محلی استفاده می‌شود.',
    about: 'درباره PeoplesEyes',
    sourceCode: 'کد منبع (GitHub)',
    legalNotice: 'اطلاعیه حقوقی',
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
    locationDenied: 'دسترسی به موقعیت مکانی رد شد. لطفاً در تنظیمات مرورگر اجازه دهید.',
    locationUnavailable: 'موقعیت مکانی قابل تعیین نبود.',
    reportFailed: 'گزارش ارسال نشد. لطفاً دوباره تلاش کنید.',
    syncFailed: 'همگام‌سازی ناموفق بود. لطفاً اتصال خود را بررسی کنید.',
    storageFull: 'فضای ذخیره‌سازی پر است. لطفاً ضبط‌های قدیمی را حذف کنید.',
  },

  common: {
    yes: 'بله', no: 'خیر', cancel: 'انصراف', confirm: 'تأیید',
    back: 'برگشت', next: 'بعدی', loading: 'در حال بارگذاری…',
    unknown: 'ناشناس', offline: 'آفلاین', online: 'آنلاین',
  },
};
