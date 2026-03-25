import { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';
import type { Translations } from '../schema.js';

export const am: Translations = {
  app: { name: 'PeoplesEyes', tagline: 'በጋራ እንስከር። ደህና ሁኖ እናሰነድ።' },

  nav: { map: 'ካርታ', report: 'ሪፖርት', rights: 'መብቶች', evidence: 'ማስረጃ', settings: 'ቅንብሮች' },

  map: {
    title: 'አሁን ያሉ ምልከታዎች',
    noReports: 'በዚህ አካባቢ አሁን ያሉ ሪፖርቶች የሉም።',
    loading: 'ካርታ እየተጫነ ነው…',
    zoomIn: 'ዝርዝሮችን ለማየት አቅርብ',
    reportHere: 'እዚህ ሪፖርት አድርግ',
    lastUpdated: 'ለመጨረሻ ጊዜ የተዘመነ',
    reportsInArea: 'በዚህ አካባቢ ያሉ ሪፖርቶች',
  },

  report: {
    title: 'ምልከታ ሪፖርት አድርግ',
    subtitle: 'ሪፖርትህ ማንነቱ አይታወቅም። ጥሬ የአካባቢ ውሂብ ከቅርጫምህ አይወጣም።',
    step: {
      authority: 'የትኛው ባለሥልጣን?',
      activity: 'ምን ታይቷል?',
      confidence: 'ምን ያህል እርግጠኛ ነህ?',
      description: 'አማራጭ መግለጫ',
      confirm: 'አረጋግጥ',
    },
    authorityLabel: 'ባለሥልጣን',
    activityLabel: 'እንቅስቃሴ',
    confidenceLabel: 'እርግጠኝነት',
    descriptionLabel: 'መግለጫ (አማራጭ)',
    descriptionPlaceholder: 'ያዩትን ነገር አጭርና ትክክለኛ መግለጫ…',
    descriptionHint: 'የግል ውሂብ፣ ስሞች ወይም የሰሌዳ ቁጥሮች አትጻፍ። ከፍተኛ 280 ፊደሎች።',
    submitButton: 'ማንነት ሳይታወቅ ሪፖርት አድርግ',
    cancelButton: 'ሰርዝ',
    successMessage: 'ሪፖርቱ ማንነት ሳይታወቅ ተልኳል።',
    searchAuthority: 'ባለሥልጣን ፈልግ…',
    groupFederal: 'የፌደራል ፖሊስ',
    groupState: 'የክልል ፖሊስ',
    groupImmigration: 'የውጭ ዜጎች ጽሕፈት ቤት',
    groupFrontex: 'Frontex / የጋር',
    unknownAuthority: 'ግልጽ ሆኖ አይታወቅም →',
    activityGroupControl: 'ቁጥጥር',
    activityGroupOperation: 'ኦፕሬሽን',
    legalDisclaimer:
      'ይህ መተግበሪያ ለሰነድ እና ለመረጃ ዓላማ ነው። ሐሰተኛ ሪፖርቶች የሕጋዊ ውጤቶች ሊኖራቸው ይችላል። እውነትን ያዩትን ብቻ ሪፖርት አድርግ።',
  },

  authority: {
    [AuthorityCategory.BundespolizeiBahn]: 'የፌደራል ፖሊስ (ባቡር / ጣቢያ)',
    [AuthorityCategory.BundespolizeiFlughafen]: 'የፌደራል ፖሊስ (አየር ማረፊያ)',
    [AuthorityCategory.BundespolizeiGrenze]: 'የፌደራል ፖሊስ (ድንበር ማቋረጫ)',
    [AuthorityCategory.BundespolizeiMobil]: 'የፌደራል ፖሊስ (ተንቀሳቃሽ)',
    [AuthorityCategory.LandespolizeiSchwerpunktkontrolle]: 'የክልል ፖሊስ – ጠንካራ ቁጥጥር',
    [AuthorityCategory.LandespolizeiRazzia]: 'የክልል ፖሊስ – ወረራ / ትልቅ ኦፕሬሽን',
    [AuthorityCategory.LandespolizeiAllgemein]: 'የክልል ፖሊስ (አጠቃላይ)',
    [AuthorityCategory.AuslaenderbehördeUnterkuenfte]: 'የውጭ ዜጎች ጽሕፈት ቤት – መኖሪያ',
    [AuthorityCategory.AuslaenderbehördeVorführung]: 'የውጭ ዜጎች ጽሕፈት ቤት – ጥሪ',
    [AuthorityCategory.AuslaenderbehördeAbschiebung]: 'የውጭ ዜጎች ጽሕፈት ቤት – ማባረር',
    [AuthorityCategory.FrontexPatrouille]: 'Frontex – ጠባቂ',
    [AuthorityCategory.FrontexOperation]: 'Frontex – ኦፕሬሽን',
    [AuthorityCategory.GemeinsameBundLand]: 'የፌደራልና ክልል የጋር ኦፕሬሽን',
    [AuthorityCategory.GemeinsameMitFrontex]: 'ከ Frontex ጋር የጋር ኦፕሬሽን',
    [AuthorityCategory.Unbekannt]: 'ግልጽ ሆኖ አይታወቅም',
  },

  activity: {
    [ObservedActivityType.Identitaetskontrolle]: 'የማንነት / ሰነድ ቁጥጥር',
    [ObservedActivityType.StationaereKontrolle]: 'ቋሚ የቁጥጥር ነጥብ',
    [ObservedActivityType.Patrouille]: 'ጥበቃ',
    [ObservedActivityType.Fahrzeugkontrolle]: 'የተሽከርካሪ ቁጥጥር',
    [ObservedActivityType.Zugriff]: 'ቁጥጥር / እስር የታየ',
    [ObservedActivityType.Transport]: 'የሰዎች ማጓጓዝ (ተሽከርካሪ / አውቶቡስ)',
    [ObservedActivityType.DurchsuchungGebaeude]: 'የህንፃ / የመኖሪያ ቦታ ፍተሻ',
    [ObservedActivityType.Sonstiges]: 'ሌላ',
  },

  confidence: {
    [ObservationConfidence.Direkt]: 'እኔ ራሴ ቀጥታ አይቻለሁ',
    [ObservationConfidence.Weitergeleitet]: 'ከታማኝ ምንጭ የተላለፈ',
    [ObservationConfidence.Unsicher]: 'እርግጠኛ አይደለሁም – ሌላ ሊሆን ይችላል',
  },

  rights: {
    title: 'መብቶችህ',
    disclaimer:
      'የሚከተሉት መረጃዎች አጠቃላይ ናቸው እና የሕግ ምክርን አይተኩም። በልዩ ሁኔታዎች፣ የሕግ ምክር ማዕከልን ያነጋግሩ።',
    topics: {
      identityControl: {
        title: 'የማንነት ቁጥጥር',
        summary: 'ፖሊስ ልዩ ምክንያት ካለ ማንነትህን ማረጋገጥ ይችላል።',
        keyPoints: [
          '"ማንነቴን ማሳየት አለብኝ?" ብለህ መጠየቅ ትችላለህ።',
          'ፎቶ ያለው መታወቂያ (ብሔራዊ መታወቂያ፣ ፓስፖርት) በቂ ነው።',
          'ዜግነትህን ወይም ለምን እዚያ እንዳለህ ማሳወቅ አያስፈልግም።',
          'ሰነድ ከሌለህ፡ ፖሊስ ማንነትህን ለማረጋገጥ ጥቂት ሰዓቶች ሊያስቆምህ ይችላል።',
          'ጻፍ፡ ቀን፣ ሰዓት፣ ቦታ፣ የፖሊስ ባጅ ቁጥር፣ ምስክሮች።',
        ],
      },
      search: {
        title: 'ፍተሻ',
        summary: 'የሰውነትህ ወይም ቤትህ ፍተሻ በአጠቃላይ የፍርድ ቤት ትዕዛዝ ይፈልጋል።',
        keyPoints: [
          '"የፍተሻ ትዕዛዝ አላችሁ?" ብለህ ጠይቅ።',
          'ትዕዛዙን ለማየት ጠይቅ እና በጥሞና አንብብ።',
          'ተቃወም ትችላለህ – ፍተሻውን አያቆምም፣ ግን ለቀጣይ ይግባኞች አስፈላጊ ነው።',
          'የሚፈተሹ እና የሚወሰዱ ነገሮችን ሁሉ ጻፍ።',
          'ለተወሰዱ ዕቃዎች ደረሰኝ ጠይቅ።',
        ],
      },
      arrest: {
        title: 'እስር / ምርመራ',
        summary: 'የዝምታ መብት አለህ – ይህ መብት ሁሌም ይሠራል።',
        keyPoints: [
          'በግልጽ ተናገር፡ "ጠበቃ ማነጋገር እፈልጋለሁ።"',
          'ከግል ውሂብ ባሻገር መረጃ ለመስጠት አይገደዱም።',
          'የእስሩን ምክንያት በጽሑፍ ጠይቅ።',
          'ከጠበቀ ቀን ባልዘለለ ሌሊት ፊት ለፊት ዳኛ ፊት ትቀርባለህ።',
          'ወዲያው ያነጋግሩ፡ የሕግ ሀ/አጫ ወይም የምትታመነው ጠበቃ።',
        ],
      },
      recording: {
        title: 'ፖሊስ መቅረጽ',
        summary: 'ፖሊስ ኦፕሬሽኖችን በህዝብ ቦታ መቅረጽ በአጠቃላይ ይፈቀዳል።',
        keyPoints: [
          'የፍርዱ ቤት ተግባሮችን በህዝብ ቦታ መቅረጽ በሐሳብ ነጻነት (አንቀጽ 5 GG) ተጠብቋል።',
          'ከኋላ ታይ የሚሉ የግለ ሰዎች ፊት መሸፈን አለበት (GDPR)።',
          'ፖሊሶች መቅረጽህን ለማስቆም ወይም ስልክህን ለመውሰድ አጠቃላይ መብት የላቸውም።',
          'ስልክ መውሰድ የፍርድ ቤት ትዕዛዝ ይፈልጋል።',
          'ቀረጻዎቹን ወደ ደመና ፈጥነህ ጫን ወይም ከታማኝ ሰው ጋር አጋራ።',
        ],
      },
      silence: {
        title: 'የዝምታ መብት',
        summary: 'ጥያቄዎችን ለመመለስ ፈቃደኛ ያለመሆን መብት አለህ። በሰላም ተጠቀምበት።',
        keyPoints: [
          'ተናገር፡ "የዝምታ መብቴን እጠቀማለሁ እና ጠበቃ እፈልጋለሁ።"',
          'ዝምታ ከምዕቱ ፈቃድ ቢሆን ጉዳትህ ሊሆን አይችልም።',
          'ስለ ጉዳዩ ምንም ቃል አትስጥ – ምንም ጥቃቅን ቢሆን።',
          'አስቸኳይ ግንኙነቶች፡ GFF (የሲቪል መብቶች ማህበር)፣ RAV (የሪፐብሊካን ጠበቆች ማህበር)።',
        ],
      },
    },
  },

  evidence: {
    title: 'ማስረጃ ማስጠበቅ',
    empty: 'ምንም ቀረጻ አልተቀመጠም።',
    recordVideo: 'ቪዲዮ ቅረጽ',
    recordAudio: 'ድምፅ ቅረጽ',
    takePhoto: 'ፎቶ ያንሱ',
    exifWarning: 'የ GPS ውሂብ እና የቅርጫም መረጃ ከሁሉም ቀረጻዎች በራስ-ሰር ይወገዳሉ።',
    deleteConfirm: 'ቀረጻውን ቋሚ ሆኖ ይሰረዝ?',
    storageWarning: 'ቀረጻዎቹ በቅርጫምህ ብቻ ይቀመጣሉ። አስፈላጊ ቀረጻዎችን ደህና ቦታ ምትኬ አድርግ።',
  },

  settings: {
    title: 'ቅንብሮች',
    language: 'ቋንቋ',
    reportResolution: 'የሪፖርቱ ትክክለኝነት',
    reportResolutionHint: 'ዝቅተኛ ጥራት ማንነትህን ሳይታወቅ ይጨምራል። ነባሪ፡ የሰፈር ደረጃ (~5 ኪ.ሜ²)።',
    persistEvidence: 'ማስረጃዎችን አካባቢያዊ አስቀምጥ',
    persistEvidenceHint: 'ጠፍ፡ ቀረጻዎቹ ትዝታ ብቻ ይቀመጣሉ፣ ሲነሳ ይሰረዛሉ።',
    notifications: 'ለቅርብ ሪፖርቶች ማሳወቂያዎች',
    notificationsHint: 'የቦታ ፈቃድ ያስፈልጋል። ቦታ አካባቢያዊ ብቻ ነው የሚያገለግለው።',
    about: 'ስለ PeoplesEyes',
    sourceCode: 'ምንጭ ኮድ (GitHub)',
    legalNotice: 'የሕግ ማስታወቂያ',
  },

  errors: {
    locationDenied: 'የቦታ ፈቃድ ተከልክሏል። በአሳሽ ቅንብሮችህ ፈቃዱን ፍቀድ።',
    locationUnavailable: 'ቦታ ሊወሰን አልቻለም።',
    reportFailed: 'ሪፖርቱ ሊላክ አልቻለም። እባክህ እንደገና ሞክር።',
    syncFailed: 'ማስተባበር አልተሳካም። ግንኙነትህን ፈትሽ።',
    storageFull: 'የቅርጫሙ ማህደረ ትዝታ ሞልቷል። ያረጁ ቀረጻዎችን ሰርዝ።',
  },

  common: {
    yes: 'አዎ', no: 'አይ', cancel: 'ሰርዝ', confirm: 'አረጋግጥ',
    back: 'ተመለስ', next: 'ቀጣይ', loading: 'እየጫነ ነው…',
    unknown: 'አይታወቅም', offline: 'ከመስመር ውጪ', online: 'መስመር ላይ',
  },
};
