import { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';
import type { Translations } from '../schema.js';

export const ru: Translations = {
  app: { name: 'PeoplesEyes', tagline: 'Наблюдаем вместе. Документируем безопасно.' },

  nav: { map: 'Карта', report: 'Сообщить', rights: 'Права', evidence: 'Доказательства', settings: 'Настройки' },

  map: {
    title: 'Текущие наблюдения',
    noReports: 'В этом районе нет актуальных сообщений.',
    loading: 'Карта загружается…',
    zoomIn: 'Увеличьте для деталей',
    reportHere: 'Сообщить здесь',
    lastUpdated: 'Последнее обновление',
    reportsInArea: 'Сообщения в этом районе',
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
