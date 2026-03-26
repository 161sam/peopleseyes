import { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';
import type { Translations } from '../schema.js';

export const es: Translations = {
  app: { name: 'PeoplesEyes', tagline: 'Observar juntos. Documentar con seguridad.' },

  nav: { map: 'Mapa', report: 'Reportar', rights: 'Derechos', evidence: 'Pruebas', settings: 'Ajustes', history: 'Historial' },

  map: {
    title: 'Avistamientos actuales',
    noReports: 'No hay reportes actuales en esta zona.',
    loading: 'Cargando mapa…',
    zoomIn: 'Acercar para detalles',
    reportHere: 'Reportar aquí',
    lastUpdated: 'Última actualización',
    reportsInArea: 'Reportes en esta zona',
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
    title: 'Reportar un avistamiento',
    subtitle: 'Tu reporte es anónimo. Los datos de ubicación en bruto no salen de tu dispositivo.',
    step: {
      authority: '¿Qué autoridad?',
      activity: '¿Qué se observó?',
      confidence: '¿Qué tan seguro/a estás?',
      description: 'Descripción opcional',
      confirm: 'Confirmar',
    },
    authorityLabel: 'Autoridad',
    activityLabel: 'Actividad',
    confidenceLabel: 'Certeza',
    descriptionLabel: 'Descripción (opcional)',
    descriptionPlaceholder: 'Breve descripción objetiva de lo que observaste…',
    descriptionHint: 'No incluyas datos personales, nombres ni matrículas. Máx. 280 caracteres.',
    submitButton: 'Reportar anónimamente',
    cancelButton: 'Cancelar',
    successMessage: 'Reporte enviado de forma anónima.',
    searchAuthority: 'Buscar autoridad…',
    groupFederal: 'Policía Federal',
    groupState: 'Policía Estatal',
    groupImmigration: 'Oficina de Extranjería',
    groupFrontex: 'Frontex / Conjunto',
    unknownAuthority: 'No claramente identificable →',
    activityGroupControl: 'Control',
    activityGroupOperation: 'Operación',
    stepContext: 'How are you involved?', // TODO: translate
    contextAffected: 'I am directly affected', // TODO: translate
    contextAffectedSub: 'Stop, arrest, or similar', // TODO: translate
    contextWitness: 'I am witnessing something', // TODO: translate
    contextWitnessSub: 'I see it, but am not directly affected', // TODO: translate
    stepActivity: 'What is happening?', // TODO: translate
    stepActivitySub: 'Tap what you see', // TODO: translate
    stepAuthority: 'Who is involved?', // TODO: translate
    authorityHintPrefix: 'Common for {activity}:', // TODO: translate
    authorityUnknownLabel: "Don't know / Not identifiable", // TODO: translate
    authorityUnknownSub: 'Send report anyway', // TODO: translate
    authorityShowAll: 'Show all authorities', // TODO: translate
    stepTiming: 'When did this happen?', // TODO: translate
    timingNow: 'Right now', // TODO: translate
    timing15: '~15 min ago', // TODO: translate
    timing60: '~1 hour ago', // TODO: translate
    gpsUnavailable: 'GPS unavailable — location is required for this report.', // TODO: translate
    legalDisclaimer:
      'Esta aplicación está destinada a la documentación e información. Los reportes falsos pueden tener consecuencias legales. Solo reporta lo que hayas observado realmente.',
  },

  authority: {
    [AuthorityCategory.BundespolizeiBahn]: 'Policía Federal (Tren / Estación)',
    [AuthorityCategory.BundespolizeiFlughafen]: 'Policía Federal (Aeropuerto)',
    [AuthorityCategory.BundespolizeiGrenze]: 'Policía Federal (Paso fronterizo)',
    [AuthorityCategory.BundespolizeiMobil]: 'Policía Federal (móvil)',
    [AuthorityCategory.LandespolizeiSchwerpunktkontrolle]: 'Policía Estatal – Control intensivo',
    [AuthorityCategory.LandespolizeiRazzia]: 'Policía Estatal – Redada / Gran operativo',
    [AuthorityCategory.LandespolizeiAllgemein]: 'Policía Estatal (general)',
    [AuthorityCategory.AuslaenderbehördeUnterkuenfte]: 'Oficina de Extranjería – Alojamiento',
    [AuthorityCategory.AuslaenderbehördeVorführung]: 'Oficina de Extranjería – Citación',
    [AuthorityCategory.AuslaenderbehördeAbschiebung]: 'Oficina de Extranjería – Deportación',
    [AuthorityCategory.FrontexPatrouille]: 'Frontex – Patrulla',
    [AuthorityCategory.FrontexOperation]: 'Frontex – Operación',
    [AuthorityCategory.GemeinsameBundLand]: 'Operación conjunta Federal + Estatal',
    [AuthorityCategory.GemeinsameMitFrontex]: 'Operación conjunta con Frontex',
    [AuthorityCategory.Unbekannt]: 'No claramente identificable',
  },

  activity: {
    [ObservedActivityType.Identitaetskontrolle]: 'Control de identidad / documentos',
    [ObservedActivityType.StationaereKontrolle]: 'Punto de control fijo',
    [ObservedActivityType.Patrouille]: 'Patrulla',
    [ObservedActivityType.Fahrzeugkontrolle]: 'Control de vehículo',
    [ObservedActivityType.Zugriff]: 'Arresto / detención observada',
    [ObservedActivityType.Transport]: 'Transporte de personas (vehículo / autobús)',
    [ObservedActivityType.DurchsuchungGebaeude]: 'Registro de edificio / alojamiento',
    [ObservedActivityType.Sonstiges]: 'Otro',
  },

  confidence: {
    [ObservationConfidence.Direkt]: 'Lo observé directamente yo mismo/a',
    [ObservationConfidence.Weitergeleitet]: 'Información de una fuente fiable',
    [ObservationConfidence.Unsicher]: 'Incierto – podría ser otra cosa',
  },

  rights: {
    title: 'Tus derechos',
    disclaimer:
      'La siguiente información es de carácter general y no sustituye el asesoramiento jurídico. En situaciones concretas, contacta con un centro de asesoría legal.',
    topics: {
      identityControl: {
        title: 'Control de identidad',
        summary: 'La policía puede verificar tu identidad si existe un motivo concreto.',
        keyPoints: [
          'Puedes preguntar: « ¿Estoy obligado/a a identificarme? »',
          'Un documento de identidad con foto (DNI, pasaporte) es suficiente.',
          'No tienes que revelar tu origen ni el motivo de tu presencia.',
          'Sin documento: la policía puede retenerte para identificarte, como máximo unas horas.',
          'Anota: fecha, hora, lugar, número de placa del agente, testigos.',
        ],
      },
      search: {
        title: 'Registro',
        summary: 'Un registro de tu persona o domicilio requiere en principio una orden judicial.',
        keyPoints: [
          'Pregunta: « ¿Tiene una orden de registro? »',
          'Pide ver la orden y léela detenidamente.',
          'Puedes oponerte – esto no detiene el registro, pero es importante para recursos posteriores.',
          'Anota todo lo que se registra y se incauta.',
          'Exige un recibo por los objetos incautados.',
        ],
      },
      arrest: {
        title: 'Detención / interrogatorio',
        summary: 'Tienes derecho a guardar silencio – este derecho siempre se aplica.',
        keyPoints: [
          'Declara claramente: « Quiero hablar con un abogado/a. »',
          'No estás obligado/a a proporcionar información más allá de tus datos personales.',
          'Solicita por escrito el motivo de tu detención.',
          'Debes ser presentado/a ante un juez a más tardar al día siguiente de tu detención.',
          'Contacta inmediatamente: una línea de asesoría jurídica o un abogado/a de confianza.',
        ],
      },
      recording: {
        title: 'Grabar a la policía',
        summary: 'Grabar operaciones policiales en espacios públicos está generalmente permitido.',
        keyPoints: [
          'Grabar actos oficiales en espacios públicos está amparado por la libertad de expresión (Art. 5 GG).',
          'Los rostros reconocibles de personas privadas en el fondo deben difuminarse (RGPD).',
          'Los agentes no tienen derecho general a impedirte grabar ni a confiscar tu teléfono.',
          'La confiscación de tu teléfono requiere una orden judicial.',
          'Sube rápidamente las grabaciones a la nube o compártelas con una persona de confianza.',
        ],
      },
      silence: {
        title: 'Derecho al silencio',
        summary: 'Tienes derecho a negarte a responder preguntas. Ejércelo con calma.',
        keyPoints: [
          'Di: « Ejerzo mi derecho al silencio y solicito un abogado/a. »',
          'El silencio no puede usarse en tu contra.',
          'No hagas declaraciones sobre los hechos – ni siquiera las aparentemente inocuas.',
          'Contactos de emergencia: GFF (Sociedad de Derechos Civiles), RAV (Asociación Republicana de Abogados/as).',
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
    title: 'Asegurar pruebas',
    empty: 'Todavía no hay grabaciones guardadas.',
    recordVideo: 'Grabar vídeo',
    recordAudio: 'Grabar audio',
    takePhoto: 'Tomar foto',
    exifWarning: 'Los datos GPS e información del dispositivo se eliminan automáticamente de todas las grabaciones.',
    deleteConfirm: '¿Eliminar grabación definitivamente?',
    storageWarning: 'Las grabaciones solo se almacenan localmente en tu dispositivo. Haz una copia de seguridad de las grabaciones importantes en un lugar seguro.',
  },

  settings: {
    title: 'Ajustes',
    language: 'Idioma',
    reportResolution: 'Precisión del reporte',
    reportResolutionHint: 'Una resolución más gruesa aumenta tu anonimato. Por defecto: nivel barrio (~5 km²).',
    persistEvidence: 'Guardar grabaciones localmente',
    persistEvidenceHint: 'Desactivado: las grabaciones se conservan solo en memoria y se eliminan al reiniciar.',
    notifications: 'Notificaciones para reportes cercanos',
    notificationsHint: 'Requiere acceso a la ubicación. La ubicación solo se usa localmente.',
    about: 'Sobre PeoplesEyes',
    sourceCode: 'Código fuente (GitHub)',
    legalNotice: 'Aviso legal',
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
    locationDenied: 'Acceso a la ubicación denegado. Permite el acceso en la configuración del navegador.',
    locationUnavailable: 'No se pudo determinar la ubicación.',
    reportFailed: 'No se pudo enviar el reporte. Por favor, inténtalo de nuevo.',
    syncFailed: 'La sincronización falló. Por favor, comprueba tu conexión.',
    storageFull: 'Almacenamiento del dispositivo lleno. Por favor, elimina grabaciones antiguas.',
  },

  common: {
    yes: 'Sí', no: 'No', cancel: 'Cancelar', confirm: 'Confirmar',
    back: 'Atrás', next: 'Siguiente', loading: 'Cargando…',
    unknown: 'Desconocido', offline: 'Sin conexión', online: 'En línea',
  },
};
