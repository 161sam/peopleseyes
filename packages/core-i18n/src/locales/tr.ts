import { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';
import type { Translations } from '../schema.js';

export const tr: Translations = {
  app: { name: 'PeoplesEyes', tagline: 'Birlikte gözlemleyin. Güvenle belgeleyin.' },

  nav: { map: 'Harita', report: 'Bildir', rights: 'Haklar', evidence: 'Kanıt', settings: 'Ayarlar' },

  map: {
    title: 'Güncel Gözlemler',
    noReports: 'Bu bölgede güncel bildirim yok.',
    loading: 'Harita yükleniyor…',
    zoomIn: 'Ayrıntılar için yakınlaştırın',
    reportHere: 'Burada bildir',
    lastUpdated: 'Son güncelleme',
    reportsInArea: 'Bu bölgedeki bildirimler',
  },

  report: {
    title: 'Gözlem Bildir',
    subtitle: 'Bildiriminiz anonimdir. Ham konum verisi cihazınızdan çıkmaz.',
    step: {
      authority: 'Hangi kurum?',
      activity: 'Ne gözlemlendi?',
      confidence: 'Ne kadar emin misiniz?',
      description: 'İsteğe bağlı açıklama',
      confirm: 'Onayla',
    },
    authorityLabel: 'Kurum',
    activityLabel: 'Aktivite',
    confidenceLabel: 'Kesinlik',
    descriptionLabel: 'Açıklama (isteğe bağlı)',
    descriptionPlaceholder: 'Gözlemlediğinizin kısa, nesnel açıklaması…',
    descriptionHint: 'Kişisel veri, isim veya plaka girmeyin. Maks. 280 karakter.',
    submitButton: 'Anonim olarak bildir',
    cancelButton: 'İptal',
    successMessage: 'Bildirim anonim olarak iletildi.',
    searchAuthority: 'Kurum ara…',
    groupFederal: 'Federal Polis',
    groupState: 'Eyalet Polisi',
    groupImmigration: 'Yabancılar Dairesi',
    groupFrontex: 'Frontex / Ortak',
    unknownAuthority: 'Açıkça tanımlanamıyor →',
    activityGroupControl: 'Kontrol',
    activityGroupOperation: 'Operasyon',
    legalDisclaimer:
      'Bu uygulama belgeleme ve bilgilendirme amaçlıdır. Yanlış bildirimler hukuki sonuçlar doğurabilir. Yalnızca gerçekten gözlemlediğinizi bildirin.',
  },

  authority: {
    [AuthorityCategory.BundespolizeiBahn]: 'Federal Polis (Tren / İstasyon)',
    [AuthorityCategory.BundespolizeiFlughafen]: 'Federal Polis (Havalimanı)',
    [AuthorityCategory.BundespolizeiGrenze]: 'Federal Polis (Sınır kapısı)',
    [AuthorityCategory.BundespolizeiMobil]: 'Federal Polis (Mobil)',
    [AuthorityCategory.LandespolizeiSchwerpunktkontrolle]: 'Eyalet Polisi – Yoğun Denetim',
    [AuthorityCategory.LandespolizeiRazzia]: 'Eyalet Polisi – Baskın / Büyük Operasyon',
    [AuthorityCategory.LandespolizeiAllgemein]: 'Eyalet Polisi (genel)',
    [AuthorityCategory.AuslaenderbehördeUnterkuenfte]: 'Yabancılar Dairesi – Konut',
    [AuthorityCategory.AuslaenderbehördeVorführung]: 'Yabancılar Dairesi – İfadeye Çağrı',
    [AuthorityCategory.AuslaenderbehördeAbschiebung]: 'Yabancılar Dairesi – Sınır Dışı Etme',
    [AuthorityCategory.FrontexPatrouille]: 'Frontex – Devriye',
    [AuthorityCategory.FrontexOperation]: 'Frontex – Operasyon',
    [AuthorityCategory.GemeinsameBundLand]: 'Ortak Federal + Eyalet Operasyonu',
    [AuthorityCategory.GemeinsameMitFrontex]: "Frontex ile Ortak Operasyon",
    [AuthorityCategory.Unbekannt]: 'Açıkça tanımlanamıyor',
  },

  activity: {
    [ObservedActivityType.Identitaetskontrolle]: 'Kimlik / Belge Kontrolü',
    [ObservedActivityType.StationaereKontrolle]: 'Sabit Kontrol Noktası',
    [ObservedActivityType.Patrouille]: 'Devriye',
    [ObservedActivityType.Fahrzeugkontrolle]: 'Araç Kontrolü',
    [ObservedActivityType.Zugriff]: 'Gözaltı / Tutuklama Gözlemlendi',
    [ObservedActivityType.Transport]: 'Kişi Taşıma (Araç / Otobüs)',
    [ObservedActivityType.DurchsuchungGebaeude]: 'Bina / Konut Araması',
    [ObservedActivityType.Sonstiges]: 'Diğer',
  },

  confidence: {
    [ObservationConfidence.Direkt]: 'Bunu doğrudan kendim gözlemledim',
    [ObservationConfidence.Weitergeleitet]: 'Güvenilir bir kaynaktan iletildi',
    [ObservationConfidence.Unsicher]: 'Emin değilim – başka bir şey olabilir',
  },

  rights: {
    title: 'Haklarınız',
    disclaimer:
      'Aşağıdaki bilgiler genel niteliktedir ve hukuki danışmanlığın yerini tutmaz. Somut durumlarda lütfen bir hukuki danışmanlık merkeziyle iletişime geçin.',
    topics: {
      identityControl: {
        title: 'Kimlik Kontrolü',
        summary: 'Polis, belirli bir neden varsa kimliğinizi tespit edebilir.',
        keyPoints: [
          '"Kimliğimi göstermek zorunda mıyım?" diye sorabilirsiniz.',
          'Fotoğraflı kimlik (nüfus cüzdanı, pasaport) yeterlidir.',
          'Kökeninizi veya orada bulunma nedeninizi açıklamak zorunda değilsiniz.',
          'Kimliğiniz yoksa: polis kimlik tespiti için sizi kısa süreliğine tutabilir.',
          'Not alın: tarih, saat, yer, memur numarası, tanıklar.',
        ],
      },
      search: {
        title: 'Arama',
        summary: 'Üstünüzün veya evinizin aranması için kural olarak adli karar gerekir.',
        keyPoints: [
          '"Arama kararınız var mı?" diye sorun.',
          'Kararı görmelerini isteyin ve dikkatlice okuyun.',
          'İtiraz edebilirsiniz – bu aramayı durdurmaz, ancak itiraz için önemlidir.',
          'Aranan ve el konulan her şeyi not edin.',
          'El konulan eşyalar için makbuz isteyin.',
        ],
      },
      arrest: {
        title: 'Gözaltı / Sorgu',
        summary: 'Susma hakkınız vardır – bu hak her zaman geçerlidir.',
        keyPoints: [
          'Açıkça belirtin: "Bir avukatla görüşmek istiyorum."',
          'Kişisel bilgilerinizin ötesinde hiçbir şey söylemek zorunda değilsiniz.',
          'Gözaltı nedenini yazılı olarak isteyin.',
          'Gözaltından en geç ertesi gün bir hakime çıkarılmalısınız.',
          'Hemen iletişime geçin: hukuki yardım hattı veya güvendiğiniz bir avukat.',
        ],
      },
      recording: {
        title: 'Polisi Kaydetmek',
        summary: 'Kamusal alanda polis operasyonlarını kayıt altına almak genel olarak serbesttir.',
        keyPoints: [
          'Kamusal alanda resmi işlemleri kaydetmek ifade özgürlüğü kapsamındadır (m. 5 GG).',
          'Arka planda tanınabilir kişilerin yüzleri gizlenmelidir (GDPR).',
          'Memurların sizi kayıt yapmaktan alıkoyma veya telefonunuza el koyma hakkı yoktur.',
          'Telefona el koyma için adli karar gerekir.',
          'Kayıtları hızla buluta yükleyin veya güvenilir biriyle paylaşın.',
        ],
      },
      silence: {
        title: 'Susma Hakkı',
        summary: 'Soruları yanıtlamayı reddedebilirsiniz. Bu hakkı sakin bir şekilde kullanın.',
        keyPoints: [
          '"Susma hakkımı kullanıyorum ve bir avukat istiyorum" deyin.',
          'Susmanız aleyhinize kullanılamaz.',
          'Konuyla ilgili hiçbir açıklama yapmayın – görünürde zararsız olanlar dahil.',
          'Acil iletişim: GFF (Özgürlük Hakları Derneği), RAV (Cumhuriyetçi Avukatlar Birliği).',
        ],
      },
    },
  },

  evidence: {
    title: 'Kanıt Güvencesi',
    empty: 'Henüz kayıt kaydedilmedi.',
    recordVideo: 'Video kaydet',
    recordAudio: 'Ses kaydet',
    takePhoto: 'Fotoğraf çek',
    exifWarning: 'GPS verileri ve cihaz bilgileri tüm kayıtlardan otomatik olarak kaldırılır.',
    deleteConfirm: 'Kayıt kalıcı olarak silinsin mi?',
    storageWarning: 'Kayıtlar yalnızca cihazınızda yerel olarak depolanır. Önemli kayıtları güvenli bir yerde yedekleyin.',
  },

  settings: {
    title: 'Ayarlar',
    language: 'Dil',
    reportResolution: 'Bildirim Hassasiyeti',
    reportResolutionHint: 'Daha kaba çözünürlük anonimliğinizi artırır. Varsayılan: Mahalle seviyesi (~5 km²).',
    persistEvidence: 'Kayıtları yerel olarak sakla',
    persistEvidenceHint: 'Kapalı: Kayıtlar yalnızca bellekte tutulur ve uygulama yeniden başlatıldığında silinir.',
    notifications: 'Yakındaki bildirimler için uyarı',
    notificationsHint: 'Konum erişimi gerektirir. Konum yalnızca yerel olarak kullanılır.',
    about: "PeoplesEyes Hakkında",
    sourceCode: 'Kaynak Kodu (GitHub)',
    legalNotice: 'Yasal Uyarı',
  },

  errors: {
    locationDenied: 'Konum erişimi reddedildi. Lütfen tarayıcı ayarlarından izin verin.',
    locationUnavailable: 'Konum tespit edilemedi.',
    reportFailed: 'Bildirim iletilemedi. Lütfen tekrar deneyin.',
    syncFailed: 'Senkronizasyon başarısız. Lütfen bağlantınızı kontrol edin.',
    storageFull: 'Depolama alanı dolu. Lütfen eski kayıtları silin.',
  },

  common: {
    yes: 'Evet', no: 'Hayır', cancel: 'İptal', confirm: 'Onayla',
    back: 'Geri', next: 'İleri', loading: 'Yükleniyor…',
    unknown: 'Bilinmiyor', offline: 'Çevrimdışı', online: 'Çevrimiçi',
  },
};
