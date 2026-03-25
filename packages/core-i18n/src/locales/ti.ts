import { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';
import type { Translations } from '../schema.js';

export const ti: Translations = {
  app: { name: 'PeoplesEyes', tagline: 'ብሓባር ንዕዘብ። ብሰላም ንሰነድ።' },

  nav: { map: 'ካርታ', report: 'ጸብጻብ', rights: 'መሰላት', evidence: 'ምስክርነት', settings: 'ምቕናዕ' },

  map: {
    title: 'ሕጂ ዘሎ ምልከታ',
    noReports: 'ኣብዚ ከባቢ ሕጂ ዝርከቡ ጸብጻባት የለን።',
    loading: 'ካርታ ይጽዓን ኣሎ…',
    zoomIn: 'ዝርዝር ንምርኣይ ቀረብ',
    reportHere: 'ኣብዚ ጸብጻብ ሃብ',
    lastUpdated: 'ናይ መጠረሽታ ዝተሓደሰ',
    reportsInArea: 'ኣብዚ ከባቢ ዘሎ ጸብጻባት',
  },

  report: {
    title: 'ምልከታ ጸብጻብ ሃብ',
    subtitle: 'ጸብጻብካ ሕቡእ ዩ። ጥርናፈ ናይ ቦታ ውሂብ ካብ መሳርሒካ ኣይወጽእን።',
    step: {
      authority: 'ኣየናይ ስልጣን?',
      activity: 'እንታይ ተራእዩ?',
      confidence: 'ክንደይ ተኣማሚንካ ኣለኻ?',
      description: 'ምርጫዊ ሓበሬታ',
      confirm: 'ኣረጋግጽ',
    },
    authorityLabel: 'ስልጣን',
    activityLabel: 'ንጥፈት',
    confidenceLabel: 'ምእማን',
    descriptionLabel: 'ሓበሬታ (ምርጫዊ)',
    descriptionPlaceholder: 'ዝረኣኹምዎ ነገር ሓጺር ሓቀኛ ሓበሬታ…',
    descriptionHint: 'ናይ ውልቂ ሓበሬታ፣ ስሞ ወይ ቁጽሪ ሰሌዳ ኣይጸሓፍ። ዝበዝሐ 280 ፊደላት።',
    submitButton: 'ብሕቡእ ጸብጻብ ሃብ',
    cancelButton: 'ሰርዝ',
    successMessage: 'ጸብጻቡ ብሕቡእ ተሰዲዱ።',
    searchAuthority: 'ስልጣን ድለ…',
    groupFederal: 'ፌደራላዊ ፖሊስ',
    groupState: 'ፖሊስ ናይ ክፍለ ሃገር',
    groupImmigration: 'ቤት ጽሕፈት ወጻእተኛታት',
    groupFrontex: 'Frontex / ሓቢርና',
    unknownAuthority: 'ብንጹር ኣይፍለጥን →',
    activityGroupControl: 'ቁጽጽር',
    activityGroupOperation: 'ስርሒት',
    legalDisclaimer:
      'እዚ ኣፕ ንሰነድን ሓበሬታን ዩ። ሓሶት ጸብጻባት ህጋዊ ሳዕቤናት ክህልዎ ይኽእል። ብሓቂ ዝረኣኹምዎ ጥራሕ ጸብጻብ ሃቡ።',
  },

  authority: {
    [AuthorityCategory.BundespolizeiBahn]: 'ፌደራላዊ ፖሊስ (ባቡር / ኣቛርጻ)',
    [AuthorityCategory.BundespolizeiFlughafen]: 'ፌደራላዊ ፖሊስ (ኣየር ማዕርፎ)',
    [AuthorityCategory.BundespolizeiGrenze]: 'ፌደራላዊ ፖሊስ (ዶብ ምሕላፊ)',
    [AuthorityCategory.BundespolizeiMobil]: 'ፌደራላዊ ፖሊስ (ተንቀሳቓሲ)',
    [AuthorityCategory.LandespolizeiSchwerpunktkontrolle]: 'ፖሊስ ናይ ክፍለ ሃገር – ቀፀልቲ ቁጽጽር',
    [AuthorityCategory.LandespolizeiRazzia]: 'ፖሊስ ናይ ክፍለ ሃገር – ወረርቲ / ዓቢ ስርሒት',
    [AuthorityCategory.LandespolizeiAllgemein]: 'ፖሊስ ናይ ክፍለ ሃገር (ሓፈሻዊ)',
    [AuthorityCategory.AuslaenderbehördeUnterkuenfte]: 'ቤት ጽሕፈት ወጻእተኛታት – መንበሪ',
    [AuthorityCategory.AuslaenderbehördeVorführung]: 'ቤት ጽሕፈት ወጻእተኛታት – ጽውዓ',
    [AuthorityCategory.AuslaenderbehördeAbschiebung]: 'ቤት ጽሕፈት ወጻእተኛታት – ምስጓም',
    [AuthorityCategory.FrontexPatrouille]: 'Frontex – ኣቃባሊ',
    [AuthorityCategory.FrontexOperation]: 'Frontex – ስርሒት',
    [AuthorityCategory.GemeinsameBundLand]: 'ሓቢርካ ናይ ፌደራልን ክፍለ ሃገርን ስርሒት',
    [AuthorityCategory.GemeinsameMitFrontex]: 'ምስ Frontex ሓቢርካ ስርሒት',
    [AuthorityCategory.Unbekannt]: 'ብንጹር ኣይፍለጥን',
  },

  activity: {
    [ObservedActivityType.Identitaetskontrolle]: 'ቁጽጽር መንነት / ሰነድ',
    [ObservedActivityType.StationaereKontrolle]: 'ቀውሚ ቁጽጽር ነጥቢ',
    [ObservedActivityType.Patrouille]: 'ምሕላው',
    [ObservedActivityType.Fahrzeugkontrolle]: 'ቁጽጽር ተሽከርካሪ',
    [ObservedActivityType.Zugriff]: 'ምትሓዝ / ምእሳር ተራእዩ',
    [ObservedActivityType.Transport]: 'ምጉዓዝ ሰባት (ተሽከርካሪ / ኣውቶቡስ)',
    [ObservedActivityType.DurchsuchungGebaeude]: 'ምፍታሽ ህንጻ / መደቀሲ',
    [ObservedActivityType.Sonstiges]: 'ካልእ',
  },

  confidence: {
    [ObservationConfidence.Direkt]: 'ባዕለይ ብቐጥታ ርኢዩ',
    [ObservationConfidence.Weitergeleitet]: 'ካብ እሙን ምንጪ ዝተሓለፈ',
    [ObservationConfidence.Unsicher]: 'ኣይተኣማመንኩን – ካልእ ክኸውን ይኽእል',
  },

  rights: {
    title: 'መሰላትካ',
    disclaimer:
      'ዝስዕቡ ሓበሬታታት ሓፈሻዊ ባህሪ ኣለዎም፣ ህጋዊ ምኽሪ ዘይትካእ። ኣብ ፍሉያት ኩነታት፣ ምስ ማዕከን ህጋዊ ምኽሪ ተወያዩ።',
    topics: {
      identityControl: {
        title: 'ቁጽጽር መንነት',
        summary: 'ፖሊስ ፍሉይ ምክንያት እንተሃሉ መንነትካ ኣረጋጊጹ ክፈልጥ ይኽእል።',
        keyPoints: [
          '"ክምዝገብ ይግደደኒዶ?" ብምባል ሓቲትካ ትኽእል።',
          'ናይ ፎቶ ምስሊ ዘለዎ መለለዪ (ሃገራዊ መለለዪ ካርድ፣ ፓስፖርት) ይኣኽል።',
          'ዜግነትካ ወይ ምፍጣርካ ምክንያት ምሓበር ኣይግደደካን።',
          'ሰነድ ከይብልካ፡ ፖሊስ ካብ ሒደት ሰዓታት ዘይዓቢ ብምቁጻ ፍለጦ ይኽእል።',
          'ጸሓፍ፡ ዕለት፣ ሰዓት፣ ቦታ፣ ቁጽሪ ባጅ ፖሊስ፣ መሰኻኸሪ።',
        ],
      },
      search: {
        title: 'ምፍታሽ',
        summary: 'ምፍታሽ ሰብነትካ ወይ ናይ ስድራ ቤትካ ቤት ብሓፈሻ ናይ ፍርዲ ቤት ትዕዛዝ ይሓትት።',
        keyPoints: [
          '"ናይ ምፍታሽ ትዕዛዝ ኣለኩምዶ?" ሕተት።',
          'ትዕዛዙ ንምርኣይ ሕተትን ብጥንቃቐ ኣንብቦን።',
          'ምቅዋም ትኽእል – እዚ ምፍታሹ ኣይዓግቶን፣ ግን ንመጻኢ ምምልካት ኣገዳሲ ዩ።',
          'ዝፍተሽን ዝስወጥን ነገር ኩሉ ጸሓፍ።',
          'ንዝስወጡ ሓደጋታት ደረሰኝ ሕተት።',
        ],
      },
      arrest: {
        title: 'ምእሳር / ምምርማር',
        summary: 'ናይ ምስትታው መሰል ኣለካ – እዚ መሰል ኩሉ ጊዜ ይሰርሕ።',
        keyPoints: [
          'ብንጹር ተዛረብ፡ "ምስ ጠበቓ ክዛረብ ደሊ።"',
          'ካብ ናይ ውልቂ ሓበሬታ ንላዕሊ ሓበሬታ ሃቡ ኣይትግደድን።',
          'ምክንያት ምእሳርካ ብጽሑፍ ሕተት።',
          'ካብ ምቕጻልካ ቀዳማይ ዕለት ቅድሚ ዳኛ ክቀርቡ ኣለካ።',
          'ሕጂ ኣናብቡ፡ ህጋዊ ሓለዋ መስመር ወይ ዝኣምኖ ጠበቓ።',
        ],
      },
      recording: {
        title: 'ፖሊስ ምቕዳሕ',
        summary: 'ስርሒት ፖሊስ ኣብ ሕዝባዊ ቦታ ምቕዳሕ ብሓፈሻ ይፍቀድ።',
        keyPoints: [
          'ናይ ወግዓዊ ስራሕ ኣብ ሕዝባዊ ቦታ ምቕዳሕ ብናፃ ሓሳብ (ዓንቀጽ 5 GG) ዝሕሎ ዩ።',
          'ናይ ውልቂ ሰባት ዝፍለጡ ገጻት ኣብ ድሕሪ ክኽወሉ ኣለዎ (GDPR)።',
          'ፖሊሶ ምቕዳሕካ ንምዕጋት ወይ ሞባይልካ ንምውሳድ ሓፈሻዊ ናይ ሕጊ ጥቕሚ የብሎምን።',
          'ሞባይል ምውሳድ ናይ ፍርዲ ቤት ትዕዛዝ ይሓትት።',
          'ቀዳምንቀዳምን ቀዳምታ ናይ ደበናን ኣካፍሎን ምስ ዝኣምኖ ሰብ።',
        ],
      },
      silence: {
        title: 'ናይ ምስትታው መሰል',
        summary: 'ንሕቶታት ምምላስ ምኽሓድ መሰል ኣለካ። ብሰላም ተጠቐምሉ።',
        keyPoints: [
          'ተዛረብ፡ "ናይ ምስትታው መሰለይ ይጥቀመሉ ጠበቓ ከምዘድልየኒ።"',
          'ምስትታው ኣንጻርካ ኣይጥቀምን።',
          'ብዛዕባ ነገሩ ዝኾነ ንኢሉ ኣይሃብ – ቀሊሉ ዝመስሉ ዶ።',
          'ህጹጽ ኩነታት ኣድራሻ፡ GFF (ናይ ሲቪል መሰላት ማሕበር)፣ RAV (ሪፐብሊካን ጠበቓታት ማሕበር)።',
        ],
      },
    },
  },

  evidence: {
    title: 'ምስክርነት ምሕላው',
    empty: 'ዝተቐርጸ ዝኾነ ነገር ዛጊት የለን።',
    recordVideo: 'ቪዲዮ ቅረጽ',
    recordAudio: 'ድምጺ ቅረጽ',
    takePhoto: 'ፎቶ ወስድ',
    exifWarning: 'ናይ GPS ሓበሬታን ናይ መሳርሒ ሓበሬታን ካብ ኩሎም ቀረጻ ብኡ ናብኡ ይወገድ።',
    deleteConfirm: 'ቀረጻ ንዘለዓለም ሰርዝ?',
    storageWarning: 'ቀረጻታት ኣብ መሳርሒካ ጥራሕ ኣካባቢያዊ ኣለዋ። ኣገደስቲ ቀረጻታት ኣብ ሓደ ሰናዩ ቦታ ምትኬ ግበር።',
  },

  settings: {
    title: 'ምቕናዕ',
    language: 'ቋንቋ',
    reportResolution: 'ትኽክለኝነት ጸብጻብ',
    reportResolutionHint: 'ዝነኣሰ ርቀት ምስጢርነትካ ይውስኽ። ነቐዳ፡ ናይ ሰፈር ደረጃ (~5 ኪ.ሜ²)።',
    persistEvidence: 'ምስክርነት ኣካባቢያዊ ኣቐምጥ',
    persistEvidenceHint: 'ጠፊኡ፡ ቀረጻታት ትዝታ ጥራሕ ኣለዋ ምስ ደጊምካ ትጅምር ይሰርዛ።',
    notifications: 'ንቀረቡ ጸብጻባት ምልክታ',
    notificationsHint: 'ናይ ቦታ ፍቓድ ይሓትት። ቦታ ኣካባቢያዊ ጥራሕ ዩ ዝጥቀም።',
    about: 'ብዛዕባ PeoplesEyes',
    sourceCode: 'ምንጪ ኮድ (GitHub)',
    legalNotice: 'ህጋዊ ምልክታ',
  },

  errors: {
    locationDenied: 'ናይ ቦታ ፍቓድ ተኸልኪሉ። ኣብ ናይ ምርፋቅ ምቕናዕ ፍቓድ ሃብ።',
    locationUnavailable: 'ቦታ ክፍለጥ ኣይከኣለን።',
    reportFailed: 'ጸብጻቡ ክስደድ ኣይከኣለን። ብኽብርካ ደጊምካ ፈትን።',
    syncFailed: 'ምስምማዕ ኣይሰርሐን። ምትእስሳርካ ፈትሽ።',
    storageFull: 'ናይ መሳርሒ ዕቓቤ ዝሞልአ ዩ። ናይ ቀደም ቀረጻታት ሰርዝ።',
  },

  common: {
    yes: 'እወ', no: 'ኣይፋልን', cancel: 'ሰርዝ', confirm: 'ኣረጋግጽ',
    back: 'ተመለስ', next: 'ቀጺሉ', loading: 'ይጽዓን ኣሎ…',
    unknown: 'ዘይፍለጥ', offline: 'ካብ መስመር ወጻኢ', online: 'ኣብ መስመር',
  },
};
