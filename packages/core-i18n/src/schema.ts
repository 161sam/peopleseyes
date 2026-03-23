import type { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';

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
