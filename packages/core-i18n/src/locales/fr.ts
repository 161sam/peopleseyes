import { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';
import type { Translations } from '../schema.js';

export const fr: Translations = {
  app: { name: 'PeoplesEyes', tagline: 'Observer ensemble. Documenter en sécurité.' },

  nav: { map: 'Carte', report: 'Signaler', rights: 'Droits', evidence: 'Preuves', settings: 'Paramètres' },

  map: {
    title: 'Observations actuelles',
    noReports: 'Aucun signalement actuel dans cette zone.',
    loading: 'Chargement de la carte…',
    zoomIn: 'Zoomer pour les détails',
    reportHere: 'Signaler ici',
    lastUpdated: 'Dernière mise à jour',
    reportsInArea: 'Signalements dans cette zone',
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
    title: 'Signaler une observation',
    subtitle: 'Votre signalement est anonyme. Les données de localisation brutes ne quittent pas votre appareil.',
    step: {
      authority: 'Quelle autorité ?',
      activity: 'Qu\'a-t-on observé ?',
      confidence: 'Dans quelle mesure êtes-vous sûr(e) ?',
      description: 'Description facultative',
      confirm: 'Confirmer',
    },
    authorityLabel: 'Autorité',
    activityLabel: 'Activité',
    confidenceLabel: 'Certitude',
    descriptionLabel: 'Description (facultative)',
    descriptionPlaceholder: 'Brève description factuelle de ce que vous avez observé…',
    descriptionHint: 'N\'incluez pas de données personnelles, de noms ou de plaques d\'immatriculation. 280 caractères max.',
    submitButton: 'Signaler anonymement',
    cancelButton: 'Annuler',
    successMessage: 'Signalement transmis anonymement.',
    searchAuthority: 'Rechercher une autorité…',
    groupFederal: 'Police fédérale',
    groupState: 'Police d\'État',
    groupImmigration: 'Office des étrangers',
    groupFrontex: 'Frontex / Conjoint',
    unknownAuthority: 'Pas clairement identifiable →',
    activityGroupControl: 'Contrôle',
    activityGroupOperation: 'Intervention',
    legalDisclaimer:
      'Cette application est destinée à la documentation et à l\'information. Les faux signalements peuvent avoir des conséquences juridiques. Ne signalez que ce que vous avez réellement observé.',
  },

  authority: {
    [AuthorityCategory.BundespolizeiBahn]: 'Police fédérale (Train / Gare)',
    [AuthorityCategory.BundespolizeiFlughafen]: 'Police fédérale (Aéroport)',
    [AuthorityCategory.BundespolizeiGrenze]: 'Police fédérale (Poste frontière)',
    [AuthorityCategory.BundespolizeiMobil]: 'Police fédérale (mobile)',
    [AuthorityCategory.LandespolizeiSchwerpunktkontrolle]: 'Police d\'État – Contrôle renforcé',
    [AuthorityCategory.LandespolizeiRazzia]: 'Police d\'État – Raid / Grande opération',
    [AuthorityCategory.LandespolizeiAllgemein]: 'Police d\'État (générale)',
    [AuthorityCategory.AuslaenderbehördeUnterkuenfte]: 'Office des étrangers – Hébergement',
    [AuthorityCategory.AuslaenderbehördeVorführung]: 'Office des étrangers – Convocation',
    [AuthorityCategory.AuslaenderbehördeAbschiebung]: 'Office des étrangers – Expulsion',
    [AuthorityCategory.FrontexPatrouille]: 'Frontex – Patrouille',
    [AuthorityCategory.FrontexOperation]: 'Frontex – Opération',
    [AuthorityCategory.GemeinsameBundLand]: 'Opération conjointe fédérale + État',
    [AuthorityCategory.GemeinsameMitFrontex]: 'Opération conjointe avec Frontex',
    [AuthorityCategory.Unbekannt]: 'Pas clairement identifiable',
  },

  activity: {
    [ObservedActivityType.Identitaetskontrolle]: 'Contrôle d\'identité / documents',
    [ObservedActivityType.StationaereKontrolle]: 'Point de contrôle fixe',
    [ObservedActivityType.Patrouille]: 'Patrouille',
    [ObservedActivityType.Fahrzeugkontrolle]: 'Contrôle de véhicule',
    [ObservedActivityType.Zugriff]: 'Arrestation / interpellation observée',
    [ObservedActivityType.Transport]: 'Transport de personnes (véhicule / bus)',
    [ObservedActivityType.DurchsuchungGebaeude]: 'Fouille de bâtiment / hébergement',
    [ObservedActivityType.Sonstiges]: 'Autre',
  },

  confidence: {
    [ObservationConfidence.Direkt]: 'Je l\'ai observé directement moi-même',
    [ObservationConfidence.Weitergeleitet]: 'Transmis par une source fiable',
    [ObservationConfidence.Unsicher]: 'Incertain – pourrait être autre chose',
  },

  rights: {
    title: 'Vos droits',
    disclaimer:
      'Les informations suivantes sont de nature générale et ne remplacent pas un conseil juridique. Dans des situations concrètes, veuillez contacter un centre de conseil juridique.',
    topics: {
      identityControl: {
        title: 'Contrôle d\'identité',
        summary: 'La police peut vérifier votre identité s\'il existe une raison concrète.',
        keyPoints: [
          'Vous pouvez demander : « Suis-je obligé(e) de m\'identifier ? »',
          'Une pièce d\'identité avec photo (carte nationale d\'identité, passeport) suffit.',
          'Vous n\'avez pas à divulguer votre origine ou votre raison d\'être là.',
          'Sans pièce d\'identité : la police peut vous retenir pour établir votre identité, quelques heures au maximum.',
          'Notez : date, heure, lieu, numéro de badge, témoins.',
        ],
      },
      search: {
        title: 'Perquisition',
        summary: 'Une fouille de votre personne ou de votre domicile nécessite en principe un mandat judiciaire.',
        keyPoints: [
          'Demandez : « Avez-vous un mandat de perquisition ? »',
          'Demandez à voir le mandat et lisez-le attentivement.',
          'Vous pouvez vous y opposer – cela n\'arrête pas la perquisition, mais est important pour les recours ultérieurs.',
          'Notez tout ce qui est fouillé et saisi.',
          'Exigez un reçu pour les objets saisis.',
        ],
      },
      arrest: {
        title: 'Arrestation / interrogatoire',
        summary: 'Vous avez le droit de garder le silence – ce droit s\'applique toujours.',
        keyPoints: [
          'Déclarez clairement : « Je souhaite parler à un avocat. »',
          'Vous n\'êtes pas obligé(e) de fournir des informations au-delà de vos données personnelles.',
          'Demandez par écrit le motif de votre arrestation.',
          'Vous devez être présenté(e) à un juge au plus tard le lendemain de votre arrestation.',
          'Contactez immédiatement : une permanence juridique ou un avocat de confiance.',
        ],
      },
      recording: {
        title: 'Filmer la police',
        summary: 'Filmer des opérations de police dans l\'espace public est en principe autorisé.',
        keyPoints: [
          'Filmer des actes officiels dans l\'espace public est couvert par la liberté d\'expression (Art. 5 GG).',
          'Les visages reconnaissables de personnes privées en arrière-plan doivent être floutés (RGPD).',
          'Les agents n\'ont pas le droit général de vous empêcher de filmer ou de confisquer votre téléphone.',
          'La confiscation de votre téléphone nécessite une ordonnance judiciaire.',
          'Téléchargez rapidement vos enregistrements dans le cloud ou partagez-les avec une personne de confiance.',
        ],
      },
      silence: {
        title: 'Droit au silence',
        summary: 'Vous avez le droit de refuser de répondre aux questions. Exercez-le calmement.',
        keyPoints: [
          'Dites : « J\'exerce mon droit au silence et souhaite un avocat. »',
          'Le silence ne peut pas être utilisé contre vous.',
          'Ne faites aucune déclaration sur les faits – même celles qui semblent anodines.',
          'Contacts d\'urgence : GFF (Société pour les droits civils), RAV (Association républicaine des avocat·e·s).',
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
    title: 'Sécurisation des preuves',
    empty: 'Aucun enregistrement sauvegardé pour l\'instant.',
    recordVideo: 'Enregistrer une vidéo',
    recordAudio: 'Enregistrer un audio',
    takePhoto: 'Prendre une photo',
    exifWarning: 'Les données GPS et les informations de l\'appareil sont automatiquement supprimées de tous les enregistrements.',
    deleteConfirm: 'Supprimer définitivement l\'enregistrement ?',
    storageWarning: 'Les enregistrements sont stockés uniquement en local sur votre appareil. Sauvegardez les enregistrements importants en lieu sûr.',
  },

  settings: {
    title: 'Paramètres',
    language: 'Langue',
    reportResolution: 'Précision du signalement',
    reportResolutionHint: 'Une résolution plus grossière augmente votre anonymat. Par défaut : niveau quartier (~5 km²).',
    persistEvidence: 'Enregistrer les preuves en local',
    persistEvidenceHint: 'Désactivé : les enregistrements sont conservés uniquement en mémoire et supprimés au redémarrage.',
    notifications: 'Notifications pour les signalements à proximité',
    notificationsHint: 'Nécessite l\'accès à la localisation. La localisation n\'est utilisée que localement.',
    about: 'À propos de PeoplesEyes',
    sourceCode: 'Code source (GitHub)',
    legalNotice: 'Mentions légales',
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
    locationDenied: 'Accès à la localisation refusé. Veuillez autoriser l\'accès dans les paramètres de votre navigateur.',
    locationUnavailable: 'La localisation n\'a pas pu être déterminée.',
    reportFailed: 'Le signalement n\'a pas pu être transmis. Veuillez réessayer.',
    syncFailed: 'La synchronisation a échoué. Veuillez vérifier votre connexion.',
    storageFull: 'Stockage de l\'appareil plein. Veuillez supprimer les anciens enregistrements.',
  },

  common: {
    yes: 'Oui', no: 'Non', cancel: 'Annuler', confirm: 'Confirmer',
    back: 'Retour', next: 'Suivant', loading: 'Chargement…',
    unknown: 'Inconnu', offline: 'Hors ligne', online: 'En ligne',
  },
};
