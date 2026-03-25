import { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';
import type { Translations } from '../schema.js';

export const ku: Translations = {
  app: { name: 'PeoplesEyes', tagline: 'Bi hev re temaşe bikin. Bi ewlehî belgeleyin.' },

  nav: { map: 'Nexşe', report: 'Rapor bike', rights: 'Maf', evidence: 'Delîl', settings: 'Mîheng' },

  map: {
    title: 'Dîtinên niha',
    noReports: 'Di vê herêmê de rapora heyî tune.',
    loading: 'Nexşe tê barkirin…',
    zoomIn: 'Ji bo hûrgiliyan nêzîk bike',
    reportHere: 'Li vir rapor bike',
    lastUpdated: 'Nûvekirina dawî',
    reportsInArea: 'Raport di vê herêmê de',
  },

  report: {
    title: 'Dîtinê rapor bike',
    subtitle: 'Rapora te nepenî ye. Daneyên cîhê xam cîhazê te terk nakin.',
    step: {
      authority: 'Kîjan dezgeh?',
      activity: 'Çi hat dîtin?',
      confidence: 'Tu çiqas pê bawer î?',
      description: 'Danasîna vebijarkî',
      confirm: 'Piştrast bike',
    },
    authorityLabel: 'Dezgeh',
    activityLabel: 'Çalakî',
    confidenceLabel: 'Bawerî',
    descriptionLabel: 'Danasîn (vebijarkî)',
    descriptionPlaceholder: 'Danasîna kurt û rastî ya tiştê hatî dîtin…',
    descriptionHint: 'Daneyên kesane, nav an jimareyên sifrê nexe. Herî zêde 280 tîp.',
    submitButton: 'Nepenî rapor bike',
    cancelButton: 'Betal bike',
    successMessage: 'Rapor bi nepenî hate şandin.',
    searchAuthority: 'Li dezgehê bigere…',
    groupFederal: 'Polîsê Federal',
    groupState: 'Polîsê Eyaletê',
    groupImmigration: 'Dezgeha Biyaniyên',
    groupFrontex: 'Frontex / Hevpar',
    unknownAuthority: 'Bi eşkere nayê naskirin →',
    activityGroupControl: 'Kontrol',
    activityGroupOperation: 'Operasyon',
    legalDisclaimer:
      'Ev sepan ji bo belgekirinê û agahdariyê ye. Raportên derewîn dibe ku encamên hiqûqî hebin. Tenê tiştê ku bi rastî dîtiye rapor bike.',
  },

  authority: {
    [AuthorityCategory.BundespolizeiBahn]: 'Polîsê Federal (Trên / İstasyon)',
    [AuthorityCategory.BundespolizeiFlughafen]: 'Polîsê Federal (Balafirgeha)',
    [AuthorityCategory.BundespolizeiGrenze]: 'Polîsê Federal (Deriyê Sînorê)',
    [AuthorityCategory.BundespolizeiMobil]: 'Polîsê Federal (mobîl)',
    [AuthorityCategory.LandespolizeiSchwerpunktkontrolle]: 'Polîsê Eyaletê – Kontrola Zêde',
    [AuthorityCategory.LandespolizeiRazzia]: 'Polîsê Eyaletê – Baskın / Operasyona Mezin',
    [AuthorityCategory.LandespolizeiAllgemein]: 'Polîsê Eyaletê (giştî)',
    [AuthorityCategory.AuslaenderbehördeUnterkuenfte]: 'Dezgeha Biyaniyên – Bicihbûn',
    [AuthorityCategory.AuslaenderbehördeVorführung]: 'Dezgeha Biyaniyên – Bangkirin',
    [AuthorityCategory.AuslaenderbehördeAbschiebung]: 'Dezgeha Biyaniyên – Sirgûnkirin',
    [AuthorityCategory.FrontexPatrouille]: 'Frontex – Dewriye',
    [AuthorityCategory.FrontexOperation]: 'Frontex – Operasyon',
    [AuthorityCategory.GemeinsameBundLand]: 'Operasyona Hevpar a Federal û Eyalet',
    [AuthorityCategory.GemeinsameMitFrontex]: 'Operasyona Hevpar a bi Frontex',
    [AuthorityCategory.Unbekannt]: 'Bi eşkere nayê naskirin',
  },

  activity: {
    [ObservedActivityType.Identitaetskontrolle]: 'Kontrola nasname / belgeyan',
    [ObservedActivityType.StationaereKontrolle]: 'Xala kontrolê ya sabît',
    [ObservedActivityType.Patrouille]: 'Dewriye',
    [ObservedActivityType.Fahrzeugkontrolle]: 'Kontrola wesayitê',
    [ObservedActivityType.Zugriff]: 'Girtina / destgirtina hatî dîtin',
    [ObservedActivityType.Transport]: 'Veguhestina kesan (wesayit / otobus)',
    [ObservedActivityType.DurchsuchungGebaeude]: 'Lêgerîna avahî / bicihbûnê',
    [ObservedActivityType.Sonstiges]: 'Yên din',
  },

  confidence: {
    [ObservationConfidence.Direkt]: 'Min ev bi xwe rasterast dît',
    [ObservationConfidence.Weitergeleitet]: 'Ji çavkaniyeke pêbawer hat şandin',
    [ObservationConfidence.Unsicher]: 'Nediyar – dibe ku tiştek din be',
  },

  rights: {
    title: 'Mafên te',
    disclaimer:
      'Agahiyên jêrîn xwedî xasûmîyeteke giştî ne û şûna şêwirmendiya hiqûqî nagirin. Di rewşên taybetî de, bi navendek şêwirmendiya hiqûqî re têkiliyê daynin.',
    topics: {
      identityControl: {
        title: 'Kontrola Nasnamê',
        summary: 'Polîs dikare nasnameya te kontrol bike heke sedemek taybetî hebe.',
        keyPoints: [
          'Dikare bipirse: "Ma ez neçar im ku xwe nas bikim?"',
          'Belgeyeke wêneydar (karta nasnameya neteweyî, pasaport) têrê dike.',
          'Ne mecbûr î ku eslê xwe an sedemê hebûna xwe eşkere bikî.',
          'Bê belge: polîs dikare te ji bo naskirinê çend saetan ragire.',
          'Not bike: dîrok, dem, cîh, hejmara rozeta efser, şahid.',
        ],
      },
      search: {
        title: 'Lêgerîn',
        summary: 'Lêgerîna laşê te an mala te bi giştî emrê dadrêsî hewce dike.',
        keyPoints: [
          'Bipirse: "Emrê lêgerînê heye?"',
          'Daxwaz bike ku emrê bibînî û bi baldarî bixwînî.',
          'Dikare îtiraz bikî – ev lêgerînê nasekinîne, lê ji bo doza paşîn girîng e.',
          'Her tiştê tê lêgerandin û desteserkirin not bike.',
          'Ji bo tiştên hatine desteserkirin resîd bixwaze.',
        ],
      },
      arrest: {
        title: 'Girtî / Lêpirsîn',
        summary: 'Mafê te yê bêdengiyê heye – ev maf her dem derbaz e.',
        keyPoints: [
          'Bi eşkere bêje: "Ez dixwazim bi parêzerek re biaxivim."',
          'Ne mecbûr î ku ji xeynî daneyên kesane agahiyan bidî.',
          'Sedemê girtinê bi nivîskî bixwaze.',
          'Divê herî dereng roja din a girtinê li ber dadwer bêyî.',
          'Yekser têkiliyê dayne: xeta alîkariya hiqûqî an parêzerekî pêbawer.',
        ],
      },
      recording: {
        title: 'Polîs Kamera Kirin',
        summary: 'Kamera kirina operasyonên polîsê li cihên giştî bi giştî destûr e.',
        keyPoints: [
          'Kamera kirina çalakiyên fermî li cihên giştî di bin azadiya gotinê de ye (Xala 5 GG).',
          'Rûyên kesên taybet ên ku tên naskirin di paşperdeyê de divê were şênber kirin (GDPR).',
          'Efseran mafê giştî tune ku te ji kamera kirinê asteng bikin an telefona te dest bixin.',
          'Dest xistina telefon emrê dadrêsî hewce dike.',
          'Tomarên xwe zû li ewrê barkirin an bi kesekî pêbawer re parve bike.',
        ],
      },
      silence: {
        title: 'Mafê Bêdengiyê',
        summary: 'Mafê te heye ku tu bersivdana pirsan red bikî. Bi aramî ji xwe re bike.',
        keyPoints: [
          'Bêje: "Ez mafê bêdengiyê bi kar tînim û parêzerek dixwazim."',
          'Bêdengî nabe ku li dijî te bê bikaranîn.',
          'Di derbarê mijarê de tu daxuyaniyan nede – yên xuyaye bêzirar jî.',
          'Têkiliyên acîl: GFF (Civata Mafên Medenî), RAV (Komeleya Parêzerên Komarî).',
        ],
      },
    },
  },

  evidence: {
    title: 'Misogerikira Delîlan',
    empty: 'Hêj tomara hatî tomarkirin tune.',
    recordVideo: 'Video tomar bike',
    recordAudio: 'Dengî tomar bike',
    takePhoto: 'Wêne bigire',
    exifWarning: 'Daneyên GPS û agahiyên cîhazê ji hemû tomaran bixwebexû têne rakirin.',
    deleteConfirm: 'Tomarê bixwe ji holê rake?',
    storageWarning: 'Tomarên tenê li ser cîhazê te bi xwecî têne hilanîn. Ji tomarên girîng kopiyeke berevanî li cihekî ewle bike.',
  },

  settings: {
    title: 'Mîheng',
    language: 'Ziman',
    reportResolution: 'Hûrgiliya rapor',
    reportResolutionHint: 'Rezolûsyona qerşatir nepeniya te zêde dike. Xwerû: asta taxa (~5 km²).',
    persistEvidence: 'Delîlan li xwecî hilanîne',
    persistEvidenceHint: 'Vekişand: tomarên tenê di bîranînê de têne hilanîn û piştî ji nû ve destpêkirinê têne jêbirin.',
    notifications: 'Agahdarî ji bo raportên nêzîk',
    notificationsHint: 'Gihîştina cîhê hewce dike. Cîh tenê li xwecî tê bikaranîn.',
    about: 'Derbarê PeoplesEyes',
    sourceCode: 'Koda çavkanî (GitHub)',
    legalNotice: 'Agahiya hiqûqî',
  },

  errors: {
    locationDenied: 'Gihîştina cîhê hat red kirin. Di mîhengên geroka xwe de destûrê bide.',
    locationUnavailable: 'Cîh nehat destnîşankirin.',
    reportFailed: 'Rapor nehat şandin. Ji kerema xwe dîsa biceribîne.',
    syncFailed: 'Hevdemkirin bi ser neket. Ji kerema xwe girêdana xwe kontrol bike.',
    storageFull: 'Hilanîna cîhazê tijî ye. Ji kerema xwe tomarên kevn jê bike.',
  },

  common: {
    yes: 'Erê', no: 'Na', cancel: 'Betal bike', confirm: 'Piştrast bike',
    back: 'Paş', next: 'Pêşve', loading: 'Tê barkirin…',
    unknown: 'Nenas', offline: 'Offline', online: 'Online',
  },
};
