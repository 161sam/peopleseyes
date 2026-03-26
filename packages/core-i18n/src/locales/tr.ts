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
              { id: 'ic-3-b', text: 'Answer fully to avoid conflict.', isCorrect: false, explanation: 'You do not have to answer these questions. Providing the information is voluntary.' }, // TODO: translate
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
              { id: 'hs-1-c', text: 'Not open the door at all and not respond.', isCorrect: false, explanation: 'Completely ignoring the situation can escalate it. Communicate and ask for the warrant.' }, // TODO: translate
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
              { id: 'ar-1-c', text: 'Ask whether you are actually under arrest or not.', isCorrect: false, explanation: 'You have already been told that. More important: demand a lawyer and stay silent.' }, // TODO: translate
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
