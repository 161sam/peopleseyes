import { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';
import type { Translations } from '../schema.js';

export const en: Translations = {
  app: {
    name: 'PeoplesEyes',
    tagline: 'Observe together. Document safely.',
  },

  nav: {
    map: 'Map',
    report: 'Report',
    rights: 'Rights',
    evidence: 'Evidence',
    settings: 'Settings',
  },

  map: {
    title: 'Current sightings',
    noReports: 'No current reports in this area.',
    loading: 'Loading map…',
    zoomIn: 'Zoom in for details',
    reportHere: 'Report here',
    lastUpdated: 'Last updated',
    reportsInArea: 'Reports in this area',
  },

  report: {
    title: 'Report a sighting',
    subtitle: 'Your report is anonymous. Raw location data never leaves your device.',
    step: {
      authority: 'Which authority?',
      activity: 'What was observed?',
      confidence: 'How certain are you?',
      description: 'Optional description',
      confirm: 'Confirm',
    },
    authorityLabel: 'Authority',
    activityLabel: 'Activity',
    confidenceLabel: 'Certainty',
    descriptionLabel: 'Description (optional)',
    descriptionPlaceholder: 'Brief factual description of what you observed…',
    descriptionHint: 'Do not include personal data, names, or license plates. Max 280 characters.',
    submitButton: 'Submit anonymously',
    cancelButton: 'Cancel',
    successMessage: 'Report submitted anonymously.',
    searchAuthority: 'Search authority…',
    groupFederal: 'Federal Police',
    groupState: 'State Police',
    groupImmigration: 'Immigration Office',
    groupFrontex: 'Frontex / Joint',
    unknownAuthority: 'Not clearly identifiable →',
    activityGroupControl: 'Control',
    activityGroupOperation: 'Operation',
    legalDisclaimer:
      'This app is for documentation and information purposes. False reports may have legal consequences. Only report what you have actually observed.',
  },

  authority: {
    [AuthorityCategory.BundespolizeiBahn]: 'Federal Police (Train / Station)',
    [AuthorityCategory.BundespolizeiFlughafen]: 'Federal Police (Airport)',
    [AuthorityCategory.BundespolizeiGrenze]: 'Federal Police (Border crossing)',
    [AuthorityCategory.BundespolizeiMobil]: 'Federal Police (mobile)',
    [AuthorityCategory.LandespolizeiSchwerpunktkontrolle]: 'State Police – Targeted control',
    [AuthorityCategory.LandespolizeiRazzia]: 'State Police – Raid / Major operation',
    [AuthorityCategory.LandespolizeiAllgemein]: 'State Police (general)',
    [AuthorityCategory.AuslaenderbehördeUnterkuenfte]: 'Immigration Office – Accommodation',
    [AuthorityCategory.AuslaenderbehördeVorführung]: 'Immigration Office – Summons',
    [AuthorityCategory.AuslaenderbehördeAbschiebung]: 'Immigration Office – Deportation',
    [AuthorityCategory.FrontexPatrouille]: 'Frontex – Patrol',
    [AuthorityCategory.FrontexOperation]: 'Frontex – Operation',
    [AuthorityCategory.GemeinsameBundLand]: 'Joint Federal + State operation',
    [AuthorityCategory.GemeinsameMitFrontex]: 'Joint operation with Frontex',
    [AuthorityCategory.Unbekannt]: 'Not clearly identifiable',
  },

  activity: {
    [ObservedActivityType.Identitaetskontrolle]: 'Identity / document check',
    [ObservedActivityType.StationaereKontrolle]: 'Stationary checkpoint',
    [ObservedActivityType.Patrouille]: 'Patrol',
    [ObservedActivityType.Fahrzeugkontrolle]: 'Vehicle check',
    [ObservedActivityType.Zugriff]: 'Arrest / apprehension observed',
    [ObservedActivityType.Transport]: 'Person transport (vehicle / bus)',
    [ObservedActivityType.DurchsuchungGebaeude]: 'Building / accommodation search',
    [ObservedActivityType.Sonstiges]: 'Other',
  },

  confidence: {
    [ObservationConfidence.Direkt]: 'I observed this directly myself',
    [ObservationConfidence.Weitergeleitet]: 'Passed on from a reliable source',
    [ObservationConfidence.Unsicher]: 'Uncertain – could be something else',
  },

  rights: {
    title: 'Your rights',
    disclaimer:
      'The following information is general in nature and is not a substitute for legal advice. In specific situations, please contact a legal advice centre.',
    topics: {
      identityControl: {
        title: 'Identity check',
        summary: 'Police may verify your identity if there is a specific reason to do so.',
        keyPoints: [
          'You can ask: "Am I required to identify myself?"',
          'A photo ID (national ID card, passport) is sufficient.',
          'You do not have to disclose your origin or reason for being there.',
          'If you have no ID: police may detain you to establish identity, for a few hours at most.',
          'Note: date, time, location, officer number, witnesses.',
        ],
      },
      search: {
        title: 'Search',
        summary: 'A search of your person or home generally requires a judicial warrant.',
        keyPoints: [
          'Ask: "Do you have a search warrant?"',
          'Ask to see the warrant and read it carefully.',
          'You can object – this won\'t stop the search, but is important for later appeal.',
          'Note everything that is searched and confiscated.',
          'Demand a receipt for confiscated items.',
        ],
      },
      arrest: {
        title: 'Arrest / interrogation',
        summary: 'You have the right to remain silent – this right always applies.',
        keyPoints: [
          'State clearly: "I wish to speak with a lawyer."',
          'You are not required to say anything beyond your personal details.',
          'Request in writing the reason for your arrest.',
          'You must be brought before a judge no later than the day after your arrest.',
          'Contact immediately: legal aid hotline or a lawyer you trust.',
        ],
      },
      recording: {
        title: 'Recording police',
        summary:
          'Recording police operations in public spaces is generally permitted.',
        keyPoints: [
          'Recording official acts in public is covered by freedom of expression (Art. 5 GG).',
          'Recognisable faces of private individuals in the background should be obscured (GDPR).',
          'Officers have no general right to prevent you from recording or to confiscate your phone.',
          'Confiscation of your phone requires a judicial order.',
          'Upload recordings quickly to cloud storage or share with a trusted person.',
        ],
      },
      silence: {
        title: 'Right to silence',
        summary: 'You have the right to refuse to answer questions. Exercise it calmly.',
        keyPoints: [
          'Say: "I am exercising my right to silence and request a lawyer."',
          'Silence may not be used against you.',
          'Do not make any statements about the matter – not even seemingly harmless ones.',
          'Emergency contacts: GFF (Society for Civil Rights), RAV (Republican Lawyers Association).',
        ],
      },
    },
  },

  evidence: {
    title: 'Evidence',
    empty: 'No recordings saved yet.',
    recordVideo: 'Record video',
    recordAudio: 'Record audio',
    takePhoto: 'Take photo',
    exifWarning:
      'GPS data and device information are automatically removed from all recordings.',
    deleteConfirm: 'Permanently delete recording?',
    storageWarning:
      'Recordings are stored locally on your device only. Back up important recordings in a safe place.',
  },

  settings: {
    title: 'Settings',
    language: 'Language',
    reportResolution: 'Report accuracy',
    reportResolutionHint:
      'Coarser resolution increases your anonymity. Default: neighbourhood level (~5 km²).',
    persistEvidence: 'Save recordings locally',
    persistEvidenceHint:
      'Off: recordings are kept in memory only and deleted when the app restarts.',
    notifications: 'Notifications for nearby reports',
    notificationsHint: 'Requires location access. Location is only used locally.',
    about: 'About PeoplesEyes',
    sourceCode: 'Source code (GitHub)',
    legalNotice: 'Legal notice',
  },

  errors: {
    locationDenied:
      'Location access denied. Please allow location access in your browser settings.',
    locationUnavailable: 'Location could not be determined.',
    reportFailed: 'Report could not be submitted. Please try again.',
    syncFailed: 'Synchronisation failed. Please check your connection.',
    storageFull: 'Device storage full. Please delete older recordings.',
  },

  common: {
    yes: 'Yes',
    no: 'No',
    cancel: 'Cancel',
    confirm: 'Confirm',
    back: 'Back',
    next: 'Next',
    loading: 'Loading…',
    unknown: 'Unknown',
    offline: 'Offline',
    online: 'Online',
  },
};
