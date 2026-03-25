import { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';
import type { Translations } from '../schema.js';

export const so: Translations = {
  app: { name: 'PeoplesEyes', tagline: 'Waxaan si wadajir ah u daawanaynaa. Si ammaan ah u dukumeyntaynaa.' },

  nav: { map: 'Khariidad', report: 'Warbixin', rights: 'Xuquuq', evidence: 'Caddayn', settings: 'Dejinta' },

  map: {
    title: 'Aragtiyada hadda',
    noReports: 'Ma jiraan warbixino hadda ah ee goobtan.',
    loading: 'Khariidadda ayaa la rarayo…',
    zoomIn: 'Zoom-garee si aad faahfaahin u hesho',
    reportHere: 'Warbixin halkan ka dir',
    lastUpdated: 'Markii ugu dambeysay la cusboonaysiiyay',
    reportsInArea: 'Warbixinada goobtan',
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
