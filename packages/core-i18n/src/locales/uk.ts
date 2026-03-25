import { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';
import type { Translations } from '../schema.js';

export const uk: Translations = {
  app: { name: 'PeoplesEyes', tagline: 'Спостерігаємо разом. Документуємо безпечно.' },

  nav: { map: 'Карта', report: 'Повідомити', rights: 'Права', evidence: 'Докази', settings: 'Налаштування' },

  map: {
    title: 'Поточні спостереження',
    noReports: 'Немає актуальних повідомлень у цьому районі.',
    loading: 'Карта завантажується…',
    zoomIn: 'Збільште для деталей',
    reportHere: 'Повідомити тут',
    lastUpdated: 'Останнє оновлення',
    reportsInArea: 'Повідомлення в цьому районі',
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
