import { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';
import type { Translations } from '../schema.js';

export const ar: Translations = {
  app: { name: 'PeoplesEyes', tagline: 'نراقب معاً. نوثّق بأمان.' },

  nav: { map: 'الخريطة', report: 'بلّغ', rights: 'الحقوق', evidence: 'الأدلة', settings: 'الإعدادات', history: 'السجل' },

  map: {
    title: 'المشاهدات الحالية',
    noReports: 'لا توجد تقارير حالية في هذه المنطقة.',
    loading: 'جارٍ تحميل الخريطة…',
    zoomIn: 'قرّب للحصول على تفاصيل',
    reportHere: 'أبلغ هنا',
    lastUpdated: 'آخر تحديث',
    reportsInArea: 'تقارير في هذه المنطقة',
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
    title: 'الإبلاغ عن مشاهدة',
    subtitle: 'تقريرك مجهول الهوية. بيانات الموقع الخام لا تغادر جهازك.',
    step: {
      authority: 'أيّ جهة؟',
      activity: 'ما الذي شوهد؟',
      confidence: 'ما مدى تأكدك؟',
      description: 'وصف اختياري',
      confirm: 'تأكيد',
    },
    authorityLabel: 'الجهة',
    activityLabel: 'النشاط',
    confidenceLabel: 'درجة التأكد',
    descriptionLabel: 'الوصف (اختياري)',
    descriptionPlaceholder: 'وصف وقائعي موجز لما شاهدته…',
    descriptionHint: 'لا تدخل بيانات شخصية أو أسماء أو أرقام لوحات. الحد الأقصى 280 حرفاً.',
    submitButton: 'أبلغ بشكل مجهول',
    cancelButton: 'إلغاء',
    successMessage: 'تم إرسال التقرير بشكل مجهول.',
    searchAuthority: 'البحث عن جهة…',
    groupFederal: 'الشرطة الاتحادية',
    groupState: 'شرطة الولاية',
    groupImmigration: 'دائرة شؤون الأجانب',
    groupFrontex: 'فرونتكس / مشترك',
    unknownAuthority: 'لا يمكن التعرف عليه بوضوح →',
    activityGroupControl: 'تفتيش',
    activityGroupOperation: 'عملية',
    legalDisclaimer:
      'هذا التطبيق مخصص للتوثيق والإعلام. قد يترتب على التقارير الكاذبة عواقب قانونية. أبلغ فقط عما شاهدته فعلاً.',
  },

  authority: {
    [AuthorityCategory.BundespolizeiBahn]: 'الشرطة الاتحادية (قطار / محطة)',
    [AuthorityCategory.BundespolizeiFlughafen]: 'الشرطة الاتحادية (مطار)',
    [AuthorityCategory.BundespolizeiGrenze]: 'الشرطة الاتحادية (معبر حدودي)',
    [AuthorityCategory.BundespolizeiMobil]: 'الشرطة الاتحادية (متنقلة)',
    [AuthorityCategory.LandespolizeiSchwerpunktkontrolle]: 'شرطة الولاية – رقابة مكثفة',
    [AuthorityCategory.LandespolizeiRazzia]: 'شرطة الولاية – مداهمة / عملية كبرى',
    [AuthorityCategory.LandespolizeiAllgemein]: 'شرطة الولاية (عامة)',
    [AuthorityCategory.AuslaenderbehördeUnterkuenfte]: 'دائرة شؤون الأجانب – سكن',
    [AuthorityCategory.AuslaenderbehördeVorführung]: 'دائرة شؤون الأجانب – استدعاء',
    [AuthorityCategory.AuslaenderbehördeAbschiebung]: 'دائرة شؤون الأجانب – ترحيل',
    [AuthorityCategory.FrontexPatrouille]: 'فرونتكس – دورية',
    [AuthorityCategory.FrontexOperation]: 'فرونتكس – عملية',
    [AuthorityCategory.GemeinsameBundLand]: 'عملية مشتركة اتحادية وولائية',
    [AuthorityCategory.GemeinsameMitFrontex]: 'عملية مشتركة مع فرونتكس',
    [AuthorityCategory.Unbekannt]: 'لا يمكن التعرف عليه بوضوح',
  },

  activity: {
    [ObservedActivityType.Identitaetskontrolle]: 'فحص الهوية / الوثائق',
    [ObservedActivityType.StationaereKontrolle]: 'نقطة تفتيش ثابتة',
    [ObservedActivityType.Patrouille]: 'دورية',
    [ObservedActivityType.Fahrzeugkontrolle]: 'فحص مركبة',
    [ObservedActivityType.Zugriff]: 'احتجاز / اعتقال مُشاهَد',
    [ObservedActivityType.Transport]: 'نقل أشخاص (سيارة / حافلة)',
    [ObservedActivityType.DurchsuchungGebaeude]: 'تفتيش مبنى / مسكن',
    [ObservedActivityType.Sonstiges]: 'أخرى',
  },

  confidence: {
    [ObservationConfidence.Direkt]: 'شاهدت هذا مباشرةً بنفسي',
    [ObservationConfidence.Weitergeleitet]: 'نُقل من مصدر موثوق',
    [ObservationConfidence.Unsicher]: 'لست متأكداً – قد يكون شيئاً آخر',
  },

  rights: {
    title: 'حقوقك',
    disclaimer:
      'المعلومات التالية ذات طابع عام ولا تغني عن الاستشارة القانونية. في حالات محددة، يرجى التواصل مع مركز استشارة قانونية.',
    topics: {
      identityControl: {
        title: 'فحص الهوية',
        summary: 'يجوز للشرطة التحقق من هويتك إذا كان هناك سبب محدد.',
        keyPoints: [
          'يمكنك أن تسأل: "هل أنا ملزم بتقديم وثائقي؟"',
          'وثيقة هوية بصورة (بطاقة هوية، جواز سفر) كافية.',
          'لست مضطراً للإفصاح عن أصلك أو سبب وجودك.',
          'إن لم تكن لديك وثائق: يحق للشرطة احتجازك لتحديد الهوية لساعات قليلة.',
          'دوّن: التاريخ والوقت والمكان ورقم الضابط والشهود.',
        ],
      },
      search: {
        title: 'التفتيش',
        summary: 'يتطلب تفتيش شخصك أو منزلك عموماً أمراً قضائياً.',
        keyPoints: [
          'اسأل: "هل لديكم أمر تفتيش؟"',
          'اطلب رؤية الأمر واقرأه بعناية.',
          'يمكنك الاعتراض – لن يوقف ذلك التفتيش، لكنه مهم للطعن لاحقاً.',
          'دوّن كل ما يُفتَّش ويُصادَر.',
          'اطلب إيصالاً بالأشياء المصادرة.',
        ],
      },
      arrest: {
        title: 'الاحتجاز / الاستجواب',
        summary: 'لديك حق الصمت – هذا الحق يسري دائماً.',
        keyPoints: [
          'صرّح بوضوح: "أريد التحدث مع محامٍ."',
          'لست ملزماً بالإدلاء بأي شيء يتجاوز بياناتك الشخصية.',
          'اطلب كتابياً سبب احتجازك.',
          'يجب مثولك أمام قاضٍ في اليوم التالي للاحتجاز على أبعد تقدير.',
          'تواصل فوراً مع خط مساعدة قانونية أو محامٍ تثق به.',
        ],
      },
      recording: {
        title: 'تصوير الشرطة',
        summary: 'يُسمح عموماً بتصوير عمليات الشرطة في الأماكن العامة.',
        keyPoints: [
          'تسجيل الإجراءات الرسمية في الأماكن العامة مكفول بحرية التعبير (المادة 5 من القانون الأساسي).',
          'يجب إخفاء وجوه الأشخاص الخاصين الذين يمكن التعرف عليهم في الخلفية (GDPR).',
          'لا يحق للضباط منعك من التصوير أو مصادرة هاتفك.',
          'مصادرة الهاتف تستلزم أمراً قضائياً.',
          'ارفع التسجيلات إلى السحابة سريعاً أو شاركها مع شخص موثوق.',
        ],
      },
      silence: {
        title: 'حق الصمت',
        summary: 'لديك الحق في رفض الإجابة على الأسئلة. استخدمه بهدوء.',
        keyPoints: [
          'قل: "أمارس حق الصمت وأطلب محامياً."',
          'لا يجوز استخدام صمتك ضدك.',
          'لا تُدلِ بأي تصريحات في الموضوع – حتى التي تبدو بريئة.',
          'جهات الاتصال: GFF (جمعية الحقوق المدنية)، RAV (رابطة المحامين الجمهوريين).',
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
    title: 'تأمين الأدلة',
    empty: 'لم يتم حفظ أي تسجيلات بعد.',
    recordVideo: 'تسجيل فيديو',
    recordAudio: 'تسجيل صوت',
    takePhoto: 'التقاط صورة',
    exifWarning: 'تتم إزالة بيانات GPS ومعلومات الجهاز تلقائياً من جميع التسجيلات.',
    deleteConfirm: 'حذف التسجيل نهائياً؟',
    storageWarning: 'التسجيلات محفوظة محلياً على جهازك فقط. احتفظ بنسخة احتياطية من التسجيلات المهمة في مكان آمن.',
  },

  settings: {
    title: 'الإعدادات',
    language: 'اللغة',
    reportResolution: 'دقة البلاغ',
    reportResolutionHint: 'الدقة الأخشن تزيد من إخفاء هويتك. الافتراضي: مستوى الحي (~5 كم²).',
    persistEvidence: 'حفظ التسجيلات محلياً',
    persistEvidenceHint: 'إيقاف: تُحفظ التسجيلات في الذاكرة فقط وتُحذف عند إعادة تشغيل التطبيق.',
    notifications: 'إشعارات للبلاغات القريبة',
    notificationsHint: 'يتطلب الوصول إلى الموقع. يُستخدم الموقع محلياً فقط.',
    about: 'حول PeoplesEyes',
    sourceCode: 'الكود المصدري (GitHub)',
    legalNotice: 'الإشعار القانوني',
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
    locationDenied: 'تم رفض الوصول إلى الموقع. يرجى السماح بالوصول في إعدادات المتصفح.',
    locationUnavailable: 'تعذّر تحديد الموقع.',
    reportFailed: 'تعذّر إرسال التقرير. يرجى المحاولة مجدداً.',
    syncFailed: 'فشل المزامنة. يرجى التحقق من اتصالك.',
    storageFull: 'مساحة التخزين ممتلئة. يرجى حذف التسجيلات القديمة.',
  },

  common: {
    yes: 'نعم', no: 'لا', cancel: 'إلغاء', confirm: 'تأكيد',
    back: 'رجوع', next: 'التالي', loading: 'جارٍ التحميل…',
    unknown: 'غير معروف', offline: 'غير متصل', online: 'متصل',
  },
};
