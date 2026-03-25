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
