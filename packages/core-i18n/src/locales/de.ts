import { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';
import type { Translations } from '../schema.js';

export const de: Translations = {
  app: {
    name: 'PeoplesEyes',
    tagline: 'Gemeinsam beobachten. Sicher dokumentieren.',
  },

  nav: {
    map: 'Karte',
    report: 'Melden',
    rights: 'Rechte',
    evidence: 'Beweise',
    settings: 'Einstellungen',
  },

  map: {
    title: 'Aktuelle Sichtungen',
    noReports: 'Keine aktuellen Meldungen in diesem Bereich.',
    loading: 'Karte wird geladen…',
    zoomIn: 'Hineinzoomen für Details',
    reportHere: 'Hier melden',
    lastUpdated: 'Zuletzt aktualisiert',
    reportsInArea: 'Meldungen in diesem Bereich',
  },

  report: {
    title: 'Sichtung melden',
    subtitle: 'Deine Meldung ist anonym. Rohdaten verlassen dein Gerät nicht.',
    step: {
      authority: 'Welche Behörde?',
      activity: 'Was wurde beobachtet?',
      confidence: 'Wie sicher bist du?',
      description: 'Optionale Beschreibung',
      confirm: 'Bestätigen',
    },
    authorityLabel: 'Behörde',
    activityLabel: 'Aktivität',
    confidenceLabel: 'Sicherheit',
    descriptionLabel: 'Beschreibung (optional)',
    descriptionPlaceholder: 'Kurze sachliche Beschreibung des Beobachteten…',
    descriptionHint:
      'Keine Personendaten, Namen oder Kennzeichen eintragen. Max. 280 Zeichen.',
    submitButton: 'Anonym melden',
    cancelButton: 'Abbrechen',
    successMessage: 'Meldung wurde anonym übermittelt.',
    searchAuthority: 'Behörde suchen…',
    groupFederal: 'Bundespolizei',
    groupState: 'Landespolizei',
    groupImmigration: 'Ausländerbehörde',
    groupFrontex: 'Frontex / Gemeinsam',
    unknownAuthority: 'Nicht eindeutig erkennbar →',
    activityGroupControl: 'Kontrolle',
    activityGroupOperation: 'Einsatz',
    legalDisclaimer:
      'Diese App dient der Dokumentation und Information. Falschmeldungen können rechtliche Konsequenzen haben. Bitte melde nur was du tatsächlich beobachtet hast.',
  },

  authority: {
    [AuthorityCategory.BundespolizeiBahn]: 'Bundespolizei (Bahn / Bahnhof)',
    [AuthorityCategory.BundespolizeiFlughafen]: 'Bundespolizei (Flughafen)',
    [AuthorityCategory.BundespolizeiGrenze]: 'Bundespolizei (Grenzübergang)',
    [AuthorityCategory.BundespolizeiMobil]: 'Bundespolizei (mobil)',
    [AuthorityCategory.LandespolizeiSchwerpunktkontrolle]: 'Landespolizei – Schwerpunktkontrolle',
    [AuthorityCategory.LandespolizeiRazzia]: 'Landespolizei – Razzia / Großeinsatz',
    [AuthorityCategory.LandespolizeiAllgemein]: 'Landespolizei (allgemein)',
    [AuthorityCategory.AuslaenderbehördeUnterkuenfte]: 'Ausländerbehörde – Unterkunft',
    [AuthorityCategory.AuslaenderbehördeVorführung]: 'Ausländerbehörde – Vorführung',
    [AuthorityCategory.AuslaenderbehördeAbschiebung]: 'Ausländerbehörde – Abschiebung',
    [AuthorityCategory.FrontexPatrouille]: 'Frontex – Patrouille',
    [AuthorityCategory.FrontexOperation]: 'Frontex – Operation',
    [AuthorityCategory.GemeinsameBundLand]: 'Gemeinschaftseinsatz Bund + Land',
    [AuthorityCategory.GemeinsameMitFrontex]: 'Gemeinschaftseinsatz mit Frontex',
    [AuthorityCategory.Unbekannt]: 'Nicht eindeutig erkennbar',
  },

  activity: {
    [ObservedActivityType.Identitaetskontrolle]: 'Identitäts- / Dokumentenkontrolle',
    [ObservedActivityType.StationaereKontrolle]: 'Stationärer Checkpoint',
    [ObservedActivityType.Patrouille]: 'Streife / Patrouille',
    [ObservedActivityType.Fahrzeugkontrolle]: 'Fahrzeugkontrolle',
    [ObservedActivityType.Zugriff]: 'Zugriff / Festnahme beobachtet',
    [ObservedActivityType.Transport]: 'Personentransport (Fahrzeug / Bus)',
    [ObservedActivityType.DurchsuchungGebaeude]: 'Durchsuchung Gebäude / Unterkunft',
    [ObservedActivityType.Sonstiges]: 'Sonstiges',
  },

  confidence: {
    [ObservationConfidence.Direkt]: 'Ich habe es direkt selbst gesehen',
    [ObservationConfidence.Weitergeleitet]: 'Aus zuverlässiger Quelle weitergegeben',
    [ObservationConfidence.Unsicher]: 'Nicht sicher – könnte auch etwas anderes sein',
  },

  rights: {
    title: 'Deine Rechte',
    disclaimer:
      'Die folgenden Informationen sind allgemeiner Natur und kein Ersatz für anwaltliche Beratung. Bei konkreten Situationen kontaktiere bitte eine Rechtsberatungsstelle.',
    topics: {
      identityControl: {
        title: 'Identitätskontrolle',
        summary:
          'Die Polizei darf deine Identität feststellen, wenn ein konkreter Anlass besteht.',
        keyPoints: [
          'Du kannst fragen: „Bin ich verpflichtet, mich auszuweisen?"',
          'Ein Lichtbildausweis (Personalausweis, Reisepass) reicht aus.',
          'Du musst keine Angaben zu deiner Herkunft oder deinem Aufenthaltsgrund machen.',
          'Wenn du ausweislos bist: Polizei darf dich zur Identitätsfeststellung festhalten, maximal einige Stunden.',
          'Notiere: Datum, Uhrzeit, Ort, Beamten-Nummer, Zeugen.',
        ],
      },
      search: {
        title: 'Durchsuchung',
        summary:
          'Eine Durchsuchung deiner Person oder Wohnung braucht grundsätzlich einen richterlichen Beschluss.',
        keyPoints: [
          'Frage: „Haben Sie einen Durchsuchungsbeschluss?"',
          'Lass dir den Beschluss zeigen und lies ihn durch.',
          'Du kannst widersprechen – das verhindert die Durchsuchung nicht, ist aber wichtig für spätere Rechtsmittel.',
          'Notiere alles was durchsucht und beschlagnahmt wird.',
          'Verlange eine Quittung für beschlagnahmte Gegenstände.',
        ],
      },
      arrest: {
        title: 'Festnahme / Verhör',
        summary:
          'Du hast das Recht zu schweigen – dieses Recht gilt immer, auch wenn du nicht verhaftet bist.',
        keyPoints: [
          'Sage klar: „Ich möchte einen Anwalt / eine Anwältin sprechen."',
          'Du musst außer deinen Personalien keine Angaben machen.',
          'Verlange schriftlich den Grund der Festnahme.',
          'Du musst spätestens am Tag nach der Festnahme einem Richter vorgeführt werden.',
          'Kontaktiere umgehend: Telefonische Rechtsauskunft oder Anwalt deines Vertrauens.',
        ],
      },
      recording: {
        title: 'Polizei filmen',
        summary:
          'Das Filmen von Polizeieinsätzen im öffentlichen Raum ist grundsätzlich erlaubt.',
        keyPoints: [
          'Das Filmen von Amtshandlungen im öffentlichen Raum ist durch die Meinungsfreiheit (Art. 5 GG) gedeckt.',
          'Erkennbare Gesichter von Privatpersonen im Hintergrund sollten unkenntlich gemacht werden (DSGVO).',
          'Polizisten haben kein allgemeines Recht, dich am Filmen zu hindern oder dein Handy zu konfiszieren.',
          'Eine Konfiszierung des Handys bedarf eines richterlichen Beschlusses.',
          'Lade Aufnahmen schnell in die Cloud oder teile sie mit einer Vertrauensperson.',
        ],
      },
      silence: {
        title: 'Schweigerecht',
        summary:
          'Du hast das Recht, die Aussage zu verweigern. Mach davon ruhig Gebrauch.',
        keyPoints: [
          'Sage: „Ich mache von meinem Schweigerecht Gebrauch und wünsche einen Anwalt."',
          'Das Schweigen darf nicht zu deinen Ungunsten gewertet werden.',
          'Keine Angaben zur Sache machen – auch keine scheinbar harmlosen.',
          'Kontaktnotfallnummern: Gesellschaft für Freiheitsrechte (GFF), RAV – Republikanischer Anwältinnen- und Anwälteverein.',
        ],
      },
    },
  },

  evidence: {
    title: 'Beweissicherung',
    empty: 'Noch keine Aufnahmen gespeichert.',
    recordVideo: 'Video aufnehmen',
    recordAudio: 'Audio aufnehmen',
    takePhoto: 'Foto aufnehmen',
    exifWarning:
      'GPS-Daten und Geräteinformationen werden automatisch aus allen Aufnahmen entfernt.',
    deleteConfirm: 'Aufnahme endgültig löschen?',
    storageWarning:
      'Aufnahmen sind nur lokal auf deinem Gerät gespeichert. Sichere wichtige Aufnahmen an einem sicheren Ort.',
  },

  settings: {
    title: 'Einstellungen',
    language: 'Sprache',
    reportResolution: 'Meldungs-Genauigkeit',
    reportResolutionHint:
      'Grobe Auflösung erhöht deine Anonymität. Standard: Viertel-Ebene (~5 km²).',
    persistEvidence: 'Aufnahmen lokal speichern',
    persistEvidenceHint:
      'Aus: Aufnahmen werden nur im Arbeitsspeicher gehalten und bei App-Neustart gelöscht.',
    notifications: 'Benachrichtigungen bei Meldungen in der Nähe',
    notificationsHint:
      'Erfordert Standortzugriff. Standort wird nur lokal verwendet.',
    about: 'Über PeoplesEyes',
    sourceCode: 'Quellcode (GitHub)',
    legalNotice: 'Rechtliche Hinweise',
  },

  errors: {
    locationDenied:
      'Standortzugriff verweigert. Bitte erlaube den Standortzugriff in den Browsereinstellungen.',
    locationUnavailable: 'Standort konnte nicht ermittelt werden.',
    reportFailed: 'Meldung konnte nicht übermittelt werden. Bitte versuche es erneut.',
    syncFailed: 'Synchronisierung fehlgeschlagen. Bitte prüfe deine Verbindung.',
    storageFull: 'Gerätespeicher voll. Bitte lösche ältere Aufnahmen.',
  },

  common: {
    yes: 'Ja',
    no: 'Nein',
    cancel: 'Abbrechen',
    confirm: 'Bestätigen',
    back: 'Zurück',
    next: 'Weiter',
    loading: 'Wird geladen…',
    unknown: 'Unbekannt',
    offline: 'Offline',
    online: 'Online',
  },
};
