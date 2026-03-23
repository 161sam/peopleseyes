import { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';
import type { Translations } from '../schema.js';

export const ar: Translations = {
  app: { name: 'PeoplesEyes', tagline: 'نراقب معاً. نوثّق بأمان.' },

  nav: { map: 'الخريطة', report: 'بلّغ', rights: 'الحقوق', evidence: 'الأدلة', settings: 'الإعدادات' },

  map: {
    title: 'المشاهدات الحالية',
    noReports: 'لا توجد تقارير حالية في هذه المنطقة.',
    loading: 'جارٍ تحميل الخريطة…',
    zoomIn: 'قرّب للحصول على تفاصيل',
    reportHere: 'أبلغ هنا',
    lastUpdated: 'آخر تحديث',
    reportsInArea: 'تقارير في هذه المنطقة',
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
