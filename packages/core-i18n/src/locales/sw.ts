import { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';
import type { Translations } from '../schema.js';

export const sw: Translations = {
  app: { name: 'PeoplesEyes', tagline: 'Tunaangalia pamoja. Kuandika kwa usalama.' },

  nav: { map: 'Ramani', report: 'Ripoti', rights: 'Haki', evidence: 'Ushahidi', settings: 'Mipangilio' },

  map: {
    title: 'Uchunguzi wa sasa',
    noReports: 'Hakuna ripoti za sasa katika eneo hili.',
    loading: 'Ramani inachargwa…',
    zoomIn: 'Karibishana kwa maelezo',
    reportHere: 'Ripoti hapa',
    lastUpdated: 'Ilisasishwa mara ya mwisho',
    reportsInArea: 'Ripoti katika eneo hili',
  },

  report: {
    title: 'Ripoti uchunguzi',
    subtitle: 'Ripoti yako ni ya siri. Data ghafi za eneo haziondoki kwenye kifaa chako.',
    step: {
      authority: 'Mamlaka gani?',
      activity: 'Nini kilionekana?',
      confidence: 'Una uhakika kiasi gani?',
      description: 'Maelezo ya hiari',
      confirm: 'Thibitisha',
    },
    authorityLabel: 'Mamlaka',
    activityLabel: 'Shughuli',
    confidenceLabel: 'Uhakika',
    descriptionLabel: 'Maelezo (hiari)',
    descriptionPlaceholder: 'Maelezo mafupi na ya ukweli ya ulichoona…',
    descriptionHint: 'Usiingize data za kibinafsi, majina au nambari za magari. Hadi herufi 280.',
    submitButton: 'Ripoti kwa siri',
    cancelButton: 'Ghairi',
    successMessage: 'Ripoti imetumwa kwa siri.',
    searchAuthority: 'Tafuta mamlaka…',
    groupFederal: 'Polisi ya Shirikisho',
    groupState: 'Polisi ya Jimbo',
    groupImmigration: 'Ofisi ya Wageni',
    groupFrontex: 'Frontex / Pamoja',
    unknownAuthority: 'Haiwezi kutambuliwa wazi →',
    activityGroupControl: 'Ukaguzi',
    activityGroupOperation: 'Operesheni',
    legalDisclaimer:
      'Programu hii ni kwa ajili ya hati na taarifa. Ripoti za uongo zinaweza kuwa na matokeo ya kisheria. Ripoti tu unachokiona kweli.',
  },

  authority: {
    [AuthorityCategory.BundespolizeiBahn]: 'Polisi ya Shirikisho (Treni / Stesheni)',
    [AuthorityCategory.BundespolizeiFlughafen]: 'Polisi ya Shirikisho (Uwanja wa Ndege)',
    [AuthorityCategory.BundespolizeiGrenze]: 'Polisi ya Shirikisho (Mpakani)',
    [AuthorityCategory.BundespolizeiMobil]: 'Polisi ya Shirikisho (inayosogea)',
    [AuthorityCategory.LandespolizeiSchwerpunktkontrolle]: 'Polisi ya Jimbo – Ukaguzi Mkubwa',
    [AuthorityCategory.LandespolizeiRazzia]: 'Polisi ya Jimbo – Uvamizi / Operesheni Kubwa',
    [AuthorityCategory.LandespolizeiAllgemein]: 'Polisi ya Jimbo (ya jumla)',
    [AuthorityCategory.AuslaenderbehördeUnterkuenfte]: 'Ofisi ya Wageni – Makazi',
    [AuthorityCategory.AuslaenderbehördeVorführung]: 'Ofisi ya Wageni – Wito',
    [AuthorityCategory.AuslaenderbehördeAbschiebung]: 'Ofisi ya Wageni – Urudishaji',
    [AuthorityCategory.FrontexPatrouille]: 'Frontex – Doria',
    [AuthorityCategory.FrontexOperation]: 'Frontex – Operesheni',
    [AuthorityCategory.GemeinsameBundLand]: 'Operesheni ya Pamoja ya Shirikisho na Jimbo',
    [AuthorityCategory.GemeinsameMitFrontex]: 'Operesheni ya Pamoja na Frontex',
    [AuthorityCategory.Unbekannt]: 'Haiwezi kutambuliwa wazi',
  },

  activity: {
    [ObservedActivityType.Identitaetskontrolle]: 'Ukaguzi wa utambulisho / hati',
    [ObservedActivityType.StationaereKontrolle]: 'Kituo cha ukaguzi cha kudumu',
    [ObservedActivityType.Patrouille]: 'Doria',
    [ObservedActivityType.Fahrzeugkontrolle]: 'Ukaguzi wa gari',
    [ObservedActivityType.Zugriff]: 'Kukamatwa / kuacha kuonekana',
    [ObservedActivityType.Transport]: 'Usafirishaji wa watu (gari / basi)',
    [ObservedActivityType.DurchsuchungGebaeude]: 'Upekuzi wa jengo / makazi',
    [ObservedActivityType.Sonstiges]: 'Nyingine',
  },

  confidence: {
    [ObservationConfidence.Direkt]: 'Nimeona hili mwenyewe moja kwa moja',
    [ObservationConfidence.Weitergeleitet]: 'Imepitishwa kutoka chanzo cha kuaminika',
    [ObservationConfidence.Unsicher]: 'Sina uhakika – inaweza kuwa kitu kingine',
  },

  rights: {
    title: 'Haki zako',
    disclaimer:
      'Taarifa zifuatazo ni za jumla na hazibadilishi ushauri wa kisheria. Katika hali maalum, wasiliana na kituo cha ushauri wa kisheria.',
    topics: {
      identityControl: {
        title: 'Ukaguzi wa Utambulisho',
        summary: 'Polisi inaweza kuthibitisha utambulisho wako ikiwa kuna sababu maalum.',
        keyPoints: [
          'Unaweza kuuliza: "Je, ninatakiwa kujionyesha?"',
          'Kitambulisho chenye picha (kitambulisho cha taifa, paspoti) kinatosha.',
          'Huhitaji kufichua asili yako au sababu ya kuwepo kwako.',
          'Bila kitambulisho: polisi inaweza kukushikilia kwa kuthibitisha utambulisho, masaa machache tu.',
          'Andika: tarehe, muda, mahali, nambari ya beji ya afisa, mashahidi.',
        ],
      },
      search: {
        title: 'Upekuzi',
        summary: 'Upekuzi wa mtu au nyumba kwa kawaida unahitaji amri ya mahakama.',
        keyPoints: [
          'Uliza: "Je, una amri ya upekuzi?"',
          'Omba kuona amri na uisomee kwa makini.',
          'Unaweza kupinga – hii haitazuia upekuzi, lakini ni muhimu kwa rufaa za baadaye.',
          'Andika kila kitu kinachopekuzi na kukamatiwa.',
          'Omba risiti kwa vitu vilivyokamatiwa.',
        ],
      },
      arrest: {
        title: 'Kukamatwa / Mahojiano',
        summary: 'Una haki ya kukaa kimya – haki hii inatumika wakati wote.',
        keyPoints: [
          'Sema wazi: "Nataka kuzungumza na wakili."',
          'Huhitajiki kutoa taarifa zaidi ya data zako za kibinafsi.',
          'Omba kwa maandishi sababu ya kukamatwa kwako.',
          'Lazima uletwe mbele ya jaji sio zaidi ya siku inayofuata baada ya kukamatwa.',
          'Wasiliana mara moja: mstari wa usaidizi wa kisheria au wakili unayemwamini.',
        ],
      },
      recording: {
        title: 'Kupiga Picha Polisi',
        summary: 'Kupiga picha operesheni za polisi katika maeneo ya umma kwa ujumla kuruhusiwa.',
        keyPoints: [
          'Kupiga picha vitendo rasmi katika maeneo ya umma kulindwa na uhuru wa kujieleza (Ibara ya 5 GG).',
          'Nyuso zinazotambuliwa za watu binafsi nyuma zinapaswa kufunikwa (GDPR).',
          'Maafisa hawana haki ya jumla ya kukuzuia kupiga picha au kukutwaa simu.',
          'Kuchukua simu kunahitaji amri ya mahakama.',
          'Pakia rekodi haraka kwa hifadhi ya wingu au zishirikishe na mtu unayemwamini.',
        ],
      },
      silence: {
        title: 'Haki ya Kukaa Kimya',
        summary: 'Una haki ya kukataa kujibu maswali. Itumie kwa utulivu.',
        keyPoints: [
          'Sema: "Ninatumia haki yangu ya kukaa kimya na ninahitaji wakili."',
          'Ukimya hauwezi kutumiwa dhidi yako.',
          'Usitoe taarifa yoyote kuhusu jambo – hata zile zinaonekana zisizo na madhara.',
          'Mawasiliano ya dharura: GFF (Jumuiya ya Haki za Kiraia), RAV (Chama cha Wanasheria wa Jamhuri).',
        ],
      },
    },
  },

  evidence: {
    title: 'Kulinda Ushahidi',
    empty: 'Hakuna rekodi zilizohifadhiwa bado.',
    recordVideo: 'Rekodi video',
    recordAudio: 'Rekodi sauti',
    takePhoto: 'Piga picha',
    exifWarning: 'Data za GPS na taarifa za kifaa huondolewa kiotomatiki kutoka kwa rekodi zote.',
    deleteConfirm: 'Futa rekodi kabisa?',
    storageWarning: 'Rekodi huhifadhiwa ndani ya kifaa chako tu. Hifadhi nakala za rekodi muhimu mahali salama.',
  },

  settings: {
    title: 'Mipangilio',
    language: 'Lugha',
    reportResolution: 'Usahihi wa ripoti',
    reportResolutionHint: 'Azimio zuri zaidi huongeza faragha yako. Chaguo-msingi: kiwango cha mtaa (~5 km²).',
    persistEvidence: 'Hifadhi rekodi ndani',
    persistEvidenceHint: 'Imezimwa: rekodi huhifadhiwa kwenye kumbukumbu tu na kufutwa baada ya kuanzisha upya.',
    notifications: 'Arifa kwa ripoti za karibu',
    notificationsHint: 'Inahitaji ufikiaji wa eneo. Eneo linatumika ndani tu.',
    about: 'Kuhusu PeoplesEyes',
    sourceCode: 'Msimbo chanzo (GitHub)',
    legalNotice: 'Tangazo la kisheria',
  },

  errors: {
    locationDenied: 'Ufikiaji wa eneo ulikataliwa. Ruhusu ufikiaji katika mipangilio ya kivinjari.',
    locationUnavailable: 'Eneo halikuweza kuamuliwa.',
    reportFailed: 'Ripoti haikuweza kutumwa. Tafadhali jaribu tena.',
    syncFailed: 'Usawazishaji umeshindwa. Angalia muunganisho wako.',
    storageFull: 'Hifadhi ya kifaa imejaa. Tafadhali futa rekodi za zamani.',
  },

  common: {
    yes: 'Ndiyo', no: 'Hapana', cancel: 'Ghairi', confirm: 'Thibitisha',
    back: 'Rudi', next: 'Endelea', loading: 'Inachargia…',
    unknown: 'Haijulikani', offline: 'Nje ya mtandao', online: 'Mtandaoni',
  },
};
