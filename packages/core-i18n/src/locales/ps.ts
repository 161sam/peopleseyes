import { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';
import type { Translations } from '../schema.js';

export const ps: Translations = {
  app: { name: 'PeoplesEyes', tagline: 'سره يو ځای وګورو. خوندي ثبت کړو.' },

  nav: { map: 'نقشه', report: 'راپور', rights: 'حقوق', evidence: 'شواهد', settings: 'تنظیمات' },

  map: {
    title: 'اوسني مشاهدې',
    noReports: 'پدې سیمه کې اوسني راپورونه نشته.',
    loading: 'نقشه لوډیږي…',
    zoomIn: 'د توضیحاتو لپاره نږدې کړئ',
    reportHere: 'دلته راپور ورکړئ',
    lastUpdated: 'وروستي ځل تازه شوی',
    reportsInArea: 'پدې سیمه کې راپورونه',
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
