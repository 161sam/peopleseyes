import { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';
import type { Translations } from '../schema.js';

export const es: Translations = {
  app: { name: 'PeoplesEyes', tagline: 'Observar juntos. Documentar con seguridad.' },

  nav: { map: 'Mapa', report: 'Reportar', rights: 'Derechos', evidence: 'Pruebas', settings: 'Ajustes' },

  map: {
    title: 'Avistamientos actuales',
    noReports: 'No hay reportes actuales en esta zona.',
    loading: 'Cargando mapa…',
    zoomIn: 'Acercar para detalles',
    reportHere: 'Reportar aquí',
    lastUpdated: 'Última actualización',
    reportsInArea: 'Reportes en esta zona',
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
