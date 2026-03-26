import type { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';

export interface SimulationChoice {
  readonly id: string;
  readonly text: string;
  readonly isCorrect: boolean;
  readonly explanation: string;
}

export interface SimulationStep {
  readonly id: string;
  readonly situation: string;
  readonly question: string;
  readonly choices: readonly [SimulationChoice, SimulationChoice, SimulationChoice];
}

export interface SimulationScenario {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
  readonly steps: readonly SimulationStep[];
}

/** Vollständiges Schema aller übersetzbaren Strings */
export interface Translations {
  readonly app: {
    readonly name: string;
    readonly tagline: string;
  };

  readonly nav: {
    readonly map: string;
    readonly report: string;
    readonly rights: string;
    readonly evidence: string;
    readonly settings: string;
  };

  readonly map: {
    readonly title: string;
    readonly noReports: string;
    readonly loading: string;
    readonly zoomIn: string;
    readonly reportHere: string;
    readonly lastUpdated: string;
    readonly reportsInArea: string;
    readonly reportNow: string;
    readonly quickReportTitle: string;
    readonly quickReportSubtitle: string;
    readonly quickReportSuccess: string;
    readonly detailedReport: string;
    readonly externalLayer: string;
    readonly externalLayerHint: string;
    readonly externalSource: string;
    readonly externalSourceWarning: string;
    readonly ngoVerified: string;
    readonly communityVerified: string;
    readonly unverified: string;
    readonly noExternalSources: string;
  };

  readonly report: {
    readonly title: string;
    readonly subtitle: string;
    readonly step: {
      readonly authority: string;
      readonly activity: string;
      readonly confidence: string;
      readonly description: string;
      readonly confirm: string;
    };
    readonly authorityLabel: string;
    readonly activityLabel: string;
    readonly confidenceLabel: string;
    readonly descriptionLabel: string;
    readonly descriptionPlaceholder: string;
    readonly descriptionHint: string;
    readonly submitButton: string;
    readonly cancelButton: string;
    readonly successMessage: string;
    readonly legalDisclaimer: string;
    readonly searchAuthority: string;
    readonly groupFederal: string;
    readonly groupState: string;
    readonly groupImmigration: string;
    readonly groupFrontex: string;
    readonly unknownAuthority: string;
    readonly activityGroupControl: string;
    readonly activityGroupOperation: string;
  };

  readonly authority: Record<AuthorityCategory, string>;
  readonly activity: Record<ObservedActivityType, string>;
  readonly confidence: Record<ObservationConfidence, string>;

  readonly rights: {
    readonly title: string;
    readonly disclaimer: string;
    readonly topics: {
      readonly identityControl: {
        readonly title: string;
        readonly summary: string;
        readonly keyPoints: readonly string[];
      };
      readonly search: {
        readonly title: string;
        readonly summary: string;
        readonly keyPoints: readonly string[];
      };
      readonly arrest: {
        readonly title: string;
        readonly summary: string;
        readonly keyPoints: readonly string[];
      };
      readonly recording: {
        readonly title: string;
        readonly summary: string;
        readonly keyPoints: readonly string[];
      };
      readonly silence: {
        readonly title: string;
        readonly summary: string;
        readonly keyPoints: readonly string[];
      };
    };
  };

  readonly evidence: {
    readonly title: string;
    readonly empty: string;
    readonly recordVideo: string;
    readonly recordAudio: string;
    readonly takePhoto: string;
    readonly exifWarning: string;
    readonly deleteConfirm: string;
    readonly storageWarning: string;
  };

  readonly simulations: {
    readonly title: string;
    readonly subtitle: string;
    readonly resultCorrect: string;
    readonly resultIncorrect: string;
    readonly resultExplanation: string;
    readonly nextStep: string;
    readonly restart: string;
    readonly finish: string;
    readonly scenarios: {
      readonly identityCheck: SimulationScenario;
      readonly houseSearch: SimulationScenario;
      readonly arrest: SimulationScenario;
      readonly vehicleStop: SimulationScenario;
    };
  };

  readonly settings: {
    readonly title: string;
    readonly language: string;
    readonly reportResolution: string;
    readonly reportResolutionHint: string;
    readonly persistEvidence: string;
    readonly persistEvidenceHint: string;
    readonly notifications: string;
    readonly notificationsHint: string;
    readonly about: string;
    readonly sourceCode: string;
    readonly legalNotice: string;
    readonly dataProtection: string;
    readonly pinChange: string;
    readonly pinChangeStep1: string;
    readonly pinChangeStep2: string;
    readonly pinChangeStep3: string;
    readonly pinChangeSuccess: string;
    readonly pinChangeError: string;
    readonly pinChangeMismatch: string;
    readonly pinChangeWorking: string;
    readonly deleteAllData: string;
    readonly emergencyContacts: string;
    readonly emergencyContactsHint: string;
    readonly emergencyContactName: string;
    readonly emergencyContactPhone: string;
    readonly emergencyContactAdd: string;
    readonly emergencyContactRemove: string;
    readonly emergencyMessage: string;
    readonly emergencyMessageHint: string;
    readonly emergencyAlertSending: string;
    readonly aiAssistantKey: string;
    readonly aiAssistantKeyHint: string;
    readonly aiAssistantKeyPlaceholder: string;
    readonly aiAssistantKeySave: string;
    readonly aiAssistantKeyDelete: string;
    readonly aiAssistantKeyLink: string;
  };

  readonly legalChat: {
    readonly title: string;
    readonly disclaimer: string;
    readonly placeholder: string;
    readonly noKey: string;
    readonly noKeyHint: string;
    readonly errorInvalidKey: string;
    readonly errorRateLimit: string;
    readonly errorNetwork: string;
  };

  readonly errors: {
    readonly locationDenied: string;
    readonly locationUnavailable: string;
    readonly reportFailed: string;
    readonly syncFailed: string;
    readonly storageFull: string;
  };

  readonly common: {
    readonly yes: string;
    readonly no: string;
    readonly cancel: string;
    readonly confirm: string;
    readonly back: string;
    readonly next: string;
    readonly loading: string;
    readonly unknown: string;
    readonly offline: string;
    readonly online: string;
  };
}
