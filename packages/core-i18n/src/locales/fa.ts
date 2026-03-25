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
