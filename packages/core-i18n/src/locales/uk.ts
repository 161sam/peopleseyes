import { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';
import type { Translations } from '../schema.js';

export const uk: Translations = {
  app: { name: 'PeoplesEyes', tagline: 'Спостерігаємо разом. Документуємо безпечно.' },

  nav: { map: 'Карта', report: 'Повідомити', rights: 'Права', evidence: 'Докази', settings: 'Налаштування', history: 'Історія' },

  map: {
    title: 'Поточні спостереження',
    noReports: 'Немає актуальних повідомлень у цьому районі.',
    loading: 'Карта завантажується…',
    zoomIn: 'Збільште для деталей',
    reportHere: 'Повідомити тут',
    lastUpdated: 'Останнє оновлення',
    reportsInArea: 'Повідомлення в цьому районі',
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
    title: 'Повідомити про спостереження',
    subtitle: 'Ваше повідомлення анонімне. Точні координати не залишають пристрій.',
    step: {
      authority: 'Який орган влади?',
      activity: 'Що спостерігалось?',
      confidence: 'Наскільки ви впевнені?',
      description: 'Необов\'язковий опис',
      confirm: 'Підтвердити',
    },
    authorityLabel: 'Орган влади',
    activityLabel: 'Активність',
    confidenceLabel: 'Впевненість',
    descriptionLabel: 'Опис (необов\'язково)',
    descriptionPlaceholder: 'Короткий фактичний опис побаченого…',
    descriptionHint: 'Не вводьте персональні дані, імена чи номери автомобілів. Макс. 280 символів.',
    submitButton: 'Повідомити анонімно',
    cancelButton: 'Скасувати',
    successMessage: 'Повідомлення надіслано анонімно.',
    searchAuthority: 'Пошук відомства…',
    groupFederal: 'Федеральна поліція',
    groupState: 'Поліція землі',
    groupImmigration: 'Відомство у справах іноземців',
    groupFrontex: 'Frontex / Спільно',
    unknownAuthority: 'Нечітко ідентифіковано →',
    activityGroupControl: 'Контроль',
    activityGroupOperation: 'Операція',
    legalDisclaimer:
      'Цей застосунок призначений для документування та інформування. Неправдиві повідомлення можуть мати юридичні наслідки. Повідомляйте лише те, що ви дійсно бачили.',
  },

  authority: {
    [AuthorityCategory.BundespolizeiBahn]: 'Федеральна поліція (Залізниця / Вокзал)',
    [AuthorityCategory.BundespolizeiFlughafen]: 'Федеральна поліція (Аеропорт)',
    [AuthorityCategory.BundespolizeiGrenze]: 'Федеральна поліція (Прикордонний перехід)',
    [AuthorityCategory.BundespolizeiMobil]: 'Федеральна поліція (мобільна)',
    [AuthorityCategory.LandespolizeiSchwerpunktkontrolle]: 'Поліція землі – Посилений контроль',
    [AuthorityCategory.LandespolizeiRazzia]: 'Поліція землі – Обшук / Велика операція',
    [AuthorityCategory.LandespolizeiAllgemein]: 'Поліція землі (загальне)',
    [AuthorityCategory.AuslaenderbehördeUnterkuenfte]: 'Відомство у справах іноземців – Житло',
    [AuthorityCategory.AuslaenderbehördeVorführung]: 'Відомство у справах іноземців – Виклик',
    [AuthorityCategory.AuslaenderbehördeAbschiebung]: 'Відомство у справах іноземців – Депортація',
    [AuthorityCategory.FrontexPatrouille]: 'Frontex – Патруль',
    [AuthorityCategory.FrontexOperation]: 'Frontex – Операція',
    [AuthorityCategory.GemeinsameBundLand]: 'Спільна операція федерації та землі',
    [AuthorityCategory.GemeinsameMitFrontex]: 'Спільна операція з Frontex',
    [AuthorityCategory.Unbekannt]: 'Не можна чітко ідентифікувати',
  },

  activity: {
    [ObservedActivityType.Identitaetskontrolle]: 'Перевірка особи / документів',
    [ObservedActivityType.StationaereKontrolle]: 'Стаціонарний контрольний пункт',
    [ObservedActivityType.Patrouille]: 'Патруль',
    [ObservedActivityType.Fahrzeugkontrolle]: 'Перевірка транспортного засобу',
    [ObservedActivityType.Zugriff]: 'Затримання / Арешт спостерігається',
    [ObservedActivityType.Transport]: 'Перевезення осіб (автомобіль / автобус)',
    [ObservedActivityType.DurchsuchungGebaeude]: 'Обшук будівлі / житла',
    [ObservedActivityType.Sonstiges]: 'Інше',
  },

  confidence: {
    [ObservationConfidence.Direkt]: 'Я безпосередньо спостерігав(ла) це сам(а)',
    [ObservationConfidence.Weitergeleitet]: 'Передано від надійного джерела',
    [ObservationConfidence.Unsicher]: 'Не впевнений(а) – може бути щось інше',
  },

  rights: {
    title: 'Ваші права',
    disclaimer:
      'Наведена інформація має загальний характер і не замінює юридичну консультацію. У конкретних ситуаціях зверніться до юридичної консультації.',
    topics: {
      identityControl: {
        title: 'Перевірка особи',
        summary: 'Поліція може встановити вашу особу за наявності конкретної підстави.',
        keyPoints: [
          'Ви можете запитати: "Чи зобов\'язаний(а) я пред\'явити документи?"',
          'Достатньо документа з фото (посвідчення особи, паспорт).',
          'Ви не зобов\'язані повідомляти про своє походження або причину перебування.',
          'Якщо немає документів: поліція може затримати вас для встановлення особи на кілька годин.',
          'Запишіть: дату, час, місце, номер офіцера, свідків.',
        ],
      },
      search: {
        title: 'Обшук',
        summary: 'Для обшуку вашої особи або житла, як правило, потрібна судова ухвала.',
        keyPoints: [
          'Запитайте: "У вас є ухвала про обшук?"',
          'Попросіть показати ухвалу і уважно прочитайте її.',
          'Ви можете заперечити – це не зупинить обшук, але важливо для оскарження.',
          'Занотуйте все, що обшукується та вилучається.',
          'Вимагайте квитанцію на вилучені речі.',
        ],
      },
      arrest: {
        title: 'Затримання / Допит',
        summary: 'Ви маєте право мовчати – це право діє завжди.',
        keyPoints: [
          'Чітко заявіть: "Я хочу поговорити з адвокатом."',
          'Ви не зобов\'язані давати жодних показань, окрім особистих даних.',
          'Вимагайте письмово підставу для затримання.',
          'Вас мають доставити до судді не пізніше наступного дня після затримання.',
          'Негайно зверніться: юридична гаряча лінія або довірений адвокат.',
        ],
      },
      recording: {
        title: 'Зйомка поліції',
        summary: 'Зйомка дій поліції у громадських місцях загалом дозволена.',
        keyPoints: [
          'Зйомка офіційних дій у громадських місцях захищена свободою вираження (ст. 5 Основного закону).',
          'Впізнавані обличчя сторонніх осіб на фоні слід розмити (GDPR).',
          'Офіцери не мають права перешкоджати зйомці або вилучати телефон.',
          'Вилучення телефону потребує судової ухвали.',
          'Швидко завантажте записи в хмару або поділіться з довіреною особою.',
        ],
      },
      silence: {
        title: 'Право мовчати',
        summary: 'Ви маєте право відмовитися відповідати на запитання. Використовуйте його спокійно.',
        keyPoints: [
          'Скажіть: "Я використовую право мовчати і прошу адвоката."',
          'Мовчання не може бути використане проти вас.',
          'Не давайте жодних показань у справі – навіть здавалося б нешкідливих.',
          'Контакти: GFF (Товариство за громадянські права), RAV (Асоціація республіканських юристів).',
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
              { id: 'ic-3-b', text: 'Answer fully to avoid conflict.', isCorrect: false, explanation: 'You do not have to answer these questions.' }, // TODO: translate
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
              { id: 'hs-1-c', text: 'Not open the door at all and not respond.', isCorrect: false, explanation: 'Completely ignoring the situation can escalate it.' }, // TODO: translate
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
              { id: 'ar-1-c', text: 'Ask whether you are actually under arrest or not.', isCorrect: false, explanation: 'More important: demand a lawyer and stay silent.' }, // TODO: translate
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
    title: 'Збір доказів',
    empty: 'Записи ще не збережено.',
    recordVideo: 'Записати відео',
    recordAudio: 'Записати аудіо',
    takePhoto: 'Зробити фото',
    exifWarning: 'GPS-дані та інформація про пристрій автоматично видаляються з усіх записів.',
    deleteConfirm: 'Видалити запис назавжди?',
    storageWarning: 'Записи зберігаються лише локально на вашому пристрої. Зробіть резервну копію важливих записів у безпечному місці.',
  },

  settings: {
    title: 'Налаштування',
    language: 'Мова',
    reportResolution: 'Точність повідомлення',
    reportResolutionHint: 'Менша точність підвищує вашу анонімність. За замовчуванням: рівень кварталу (~5 км²).',
    persistEvidence: 'Зберігати записи локально',
    persistEvidenceHint: 'Вимкнено: записи зберігаються лише в пам\'яті і видаляються при перезапуску.',
    notifications: 'Сповіщення про близькі повідомлення',
    notificationsHint: 'Потребує доступу до місцезнаходження. Місцезнаходження використовується лише локально.',
    about: 'Про PeoplesEyes',
    sourceCode: 'Вихідний код (GitHub)',
    legalNotice: 'Правова інформація',
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
    locationDenied: 'Доступ до місцезнаходження заборонено. Будь ласка, дозвольте доступ у налаштуваннях браузера.',
    locationUnavailable: 'Не вдалося визначити місцезнаходження.',
    reportFailed: 'Не вдалося надіслати повідомлення. Спробуйте ще раз.',
    syncFailed: 'Синхронізація не вдалася. Перевірте підключення.',
    storageFull: 'Пам\'ять заповнена. Будь ласка, видаліть старі записи.',
  },

  common: {
    yes: 'Так', no: 'Ні', cancel: 'Скасувати', confirm: 'Підтвердити',
    back: 'Назад', next: 'Далі', loading: 'Завантаження…',
    unknown: 'Невідомо', offline: 'Офлайн', online: 'Онлайн',
  },
};
