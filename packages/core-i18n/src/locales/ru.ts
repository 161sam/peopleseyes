import { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';
import type { Translations } from '../schema.js';

export const ru: Translations = {
  app: { name: 'PeoplesEyes', tagline: 'Наблюдаем вместе. Документируем безопасно.' },

  nav: { map: 'Карта', report: 'Сообщить', rights: 'Права', evidence: 'Доказательства', settings: 'Настройки', history: 'История' },

  map: {
    title: 'Текущие наблюдения',
    noReports: 'В этом районе нет актуальных сообщений.',
    loading: 'Карта загружается…',
    zoomIn: 'Увеличьте для деталей',
    reportHere: 'Сообщить здесь',
    lastUpdated: 'Последнее обновление',
    reportsInArea: 'Сообщения в этом районе',
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
    title: 'Сообщить о наблюдении',
    subtitle: 'Ваше сообщение анонимно. Точные данные о местоположении не покидают устройство.',
    step: {
      authority: 'Какая служба?',
      activity: 'Что наблюдалось?',
      confidence: 'Насколько вы уверены?',
      description: 'Необязательное описание',
      confirm: 'Подтвердить',
    },
    authorityLabel: 'Служба',
    activityLabel: 'Активность',
    confidenceLabel: 'Уверенность',
    descriptionLabel: 'Описание (необязательно)',
    descriptionPlaceholder: 'Краткое фактическое описание наблюдаемого…',
    descriptionHint: 'Не вводите персональные данные, имена или номерные знаки. Макс. 280 символов.',
    submitButton: 'Сообщить анонимно',
    cancelButton: 'Отмена',
    successMessage: 'Сообщение передано анонимно.',
    searchAuthority: 'Поиск ведомства…',
    groupFederal: 'Федеральная полиция',
    groupState: 'Полиция земли',
    groupImmigration: 'Ведомство по делам иностранцев',
    groupFrontex: 'Frontex / Совместная',
    unknownAuthority: 'Неясно идентифицируемо →',
    activityGroupControl: 'Контроль',
    activityGroupOperation: 'Операция',
    legalDisclaimer:
      'Это приложение предназначено для документирования и информирования. Ложные сообщения могут иметь юридические последствия. Сообщайте только о том, что вы действительно наблюдали.',
  },

  authority: {
    [AuthorityCategory.BundespolizeiBahn]: 'Федеральная полиция (Железная дорога / Вокзал)',
    [AuthorityCategory.BundespolizeiFlughafen]: 'Федеральная полиция (Аэропорт)',
    [AuthorityCategory.BundespolizeiGrenze]: 'Федеральная полиция (Пограничный переход)',
    [AuthorityCategory.BundespolizeiMobil]: 'Федеральная полиция (мобильная)',
    [AuthorityCategory.LandespolizeiSchwerpunktkontrolle]: 'Полиция земли – Усиленный контроль',
    [AuthorityCategory.LandespolizeiRazzia]: 'Полиция земли – Облава / Крупная операция',
    [AuthorityCategory.LandespolizeiAllgemein]: 'Полиция земли (общая)',
    [AuthorityCategory.AuslaenderbehördeUnterkuenfte]: 'Ведомство по делам иностранцев – Жильё',
    [AuthorityCategory.AuslaenderbehördeVorführung]: 'Ведомство по делам иностранцев – Вызов',
    [AuthorityCategory.AuslaenderbehördeAbschiebung]: 'Ведомство по делам иностранцев – Депортация',
    [AuthorityCategory.FrontexPatrouille]: 'Frontex – Патруль',
    [AuthorityCategory.FrontexOperation]: 'Frontex – Операция',
    [AuthorityCategory.GemeinsameBundLand]: 'Совместная федерально-земельная операция',
    [AuthorityCategory.GemeinsameMitFrontex]: 'Совместная операция с Frontex',
    [AuthorityCategory.Unbekannt]: 'Неясно идентифицируемо',
  },

  activity: {
    [ObservedActivityType.Identitaetskontrolle]: 'Проверка документов / личности',
    [ObservedActivityType.StationaereKontrolle]: 'Стационарный контрольно-пропускной пункт',
    [ObservedActivityType.Patrouille]: 'Патруль',
    [ObservedActivityType.Fahrzeugkontrolle]: 'Контроль транспортных средств',
    [ObservedActivityType.Zugriff]: 'Задержание / арест наблюдался',
    [ObservedActivityType.Transport]: 'Перевозка людей (транспортное средство / автобус)',
    [ObservedActivityType.DurchsuchungGebaeude]: 'Обыск здания / жилища',
    [ObservedActivityType.Sonstiges]: 'Прочее',
  },

  confidence: {
    [ObservationConfidence.Direkt]: 'Я наблюдал(а) это лично',
    [ObservationConfidence.Weitergeleitet]: 'Передано из надёжного источника',
    [ObservationConfidence.Unsicher]: 'Неуверен(а) – могло быть что-то другое',
  },

  rights: {
    title: 'Ваши права',
    disclaimer:
      'Следующая информация носит общий характер и не заменяет юридической консультации. В конкретных ситуациях обратитесь в юридическую консультацию.',
    topics: {
      identityControl: {
        title: 'Проверка документов',
        summary: 'Полиция может проверить личность при наличии конкретных оснований.',
        keyPoints: [
          'Вы можете спросить: „Обязан(а) ли я предъявлять документы?"',
          'Достаточно удостоверения личности с фотографией (ID-карта, паспорт).',
          'Вы не обязаны сообщать о своём происхождении или причинах нахождения.',
          'Без документа: полиция может задержать вас для установления личности на несколько часов.',
          'Запишите: дату, время, место, номер жетона сотрудника, свидетелей.',
        ],
      },
      search: {
        title: 'Обыск',
        summary: 'Для обыска личности или жилища, как правило, необходим судебный ордер.',
        keyPoints: [
          'Спросите: „У вас есть ордер на обыск?"',
          'Попросите показать ордер и внимательно прочитайте его.',
          'Вы можете возражать – это не остановит обыск, но важно для последующих обжалований.',
          'Запишите всё, что обыскивается и изымается.',
          'Потребуйте квитанцию за изъятые предметы.',
        ],
      },
      arrest: {
        title: 'Задержание / допрос',
        summary: 'У вас есть право хранить молчание – это право действует всегда.',
        keyPoints: [
          'Чётко заявите: „Я хочу поговорить с адвокатом."',
          'Вы не обязаны предоставлять информацию, кроме личных данных.',
          'Потребуйте письменного указания причины задержания.',
          'Вас должны представить судье не позднее следующего дня после задержания.',
          'Немедленно свяжитесь с юридической помощью или доверенным адвокатом.',
        ],
      },
      recording: {
        title: 'Съёмка полиции',
        summary: 'Съёмка действий полиции в общественном пространстве в принципе разрешена.',
        keyPoints: [
          'Съёмка официальных действий в общественном пространстве защищена свободой слова (ст. 5 GG).',
          'Узнаваемые лица частных лиц на заднем плане необходимо скрыть (GDPR).',
          'У сотрудников нет общего права мешать вам снимать или конфисковывать телефон.',
          'Конфискация телефона требует судебного постановления.',
          'Быстро загрузите записи в облако или поделитесь ими с доверенным лицом.',
        ],
      },
      silence: {
        title: 'Право на молчание',
        summary: 'У вас есть право отказаться отвечать на вопросы. Пользуйтесь им спокойно.',
        keyPoints: [
          'Скажите: „Я пользуюсь правом на молчание и прошу адвоката."',
          'Молчание не может быть использовано против вас.',
          'Не делайте никаких заявлений по делу – даже кажущихся безобидными.',
          'Экстренные контакты: GFF (Общество гражданских прав), RAV (Республиканское объединение адвокатов).',
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
    title: 'Обеспечение доказательств',
    empty: 'Записи ещё не сохранены.',
    recordVideo: 'Записать видео',
    recordAudio: 'Записать аудио',
    takePhoto: 'Сделать фото',
    exifWarning: 'GPS-данные и информация об устройстве автоматически удаляются из всех записей.',
    deleteConfirm: 'Удалить запись окончательно?',
    storageWarning: 'Записи хранятся только локально на вашем устройстве. Сделайте резервную копию важных записей в надёжном месте.',
  },

  settings: {
    title: 'Настройки',
    language: 'Язык',
    reportResolution: 'Точность сообщения',
    reportResolutionHint: 'Меньшее разрешение повышает анонимность. По умолчанию: уровень района (~5 км²).',
    persistEvidence: 'Сохранять записи локально',
    persistEvidenceHint: 'Выкл.: записи хранятся только в памяти и удаляются при перезапуске.',
    notifications: 'Уведомления о близких сообщениях',
    notificationsHint: 'Требует доступа к местоположению. Местоположение используется только локально.',
    about: 'О PeoplesEyes',
    sourceCode: 'Исходный код (GitHub)',
    legalNotice: 'Правовое уведомление',
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
    locationDenied: 'Доступ к местоположению запрещён. Разрешите доступ в настройках браузера.',
    locationUnavailable: 'Местоположение не удалось определить.',
    reportFailed: 'Сообщение не удалось отправить. Попробуйте ещё раз.',
    syncFailed: 'Синхронизация не удалась. Проверьте соединение.',
    storageFull: 'Память устройства заполнена. Удалите старые записи.',
  },

  common: {
    yes: 'Да', no: 'Нет', cancel: 'Отмена', confirm: 'Подтвердить',
    back: 'Назад', next: 'Далее', loading: 'Загрузка…',
    unknown: 'Неизвестно', offline: 'Офлайн', online: 'Онлайн',
  },
};
