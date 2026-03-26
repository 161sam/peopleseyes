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
    history: 'Verlauf',
  },

  map: {
    title: 'Aktuelle Sichtungen',
    noReports: 'Keine aktuellen Meldungen in diesem Bereich.',
    loading: 'Karte wird geladen…',
    zoomIn: 'Hineinzoomen für Details',
    reportHere: 'Hier melden',
    lastUpdated: 'Zuletzt aktualisiert',
    reportsInArea: 'Meldungen in diesem Bereich',
    reportNow: 'Jetzt melden',
    quickReportTitle: 'Schnellmeldung',
    quickReportSubtitle: '2 Angaben genügen — anonym und sofort',
    quickReportSuccess: 'Meldung übermittelt',
    detailedReport: 'Detaillierte Meldung →',
    externalLayer: 'Externe Meldungen',
    externalLayerHint: 'Meldungen von Partnerprojekten',
    externalSource: 'Externe Quelle',
    externalSourceWarning: 'Nicht von PeoplesEyes-Nutzern gemeldet',
    ngoVerified: 'NGO-verifiziert',
    communityVerified: 'Community-bestätigt',
    unverified: 'Ungeprüft',
    noExternalSources: 'Noch keine externen Quellen aktiv',
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
    stepContext: 'Wie bist du betroffen?',
    contextAffected: 'Ich bin selbst betroffen',
    contextAffectedSub: 'Kontrolle, Festnahme oder Ähnliches',
    contextWitness: 'Ich beobachte etwas',
    contextWitnessSub: 'Ich sehe es, bin aber nicht direkt betroffen',
    stepActivity: 'Was passiert gerade?',
    stepActivitySub: 'Tippe was du siehst',
    stepAuthority: 'Wer ist beteiligt?',
    authorityHintPrefix: 'Häufig bei {activity}:',
    authorityUnknownLabel: 'Weiß ich nicht / Nicht erkennbar',
    authorityUnknownSub: 'Meldung trotzdem senden',
    authorityShowAll: 'Alle Behörden anzeigen',
    stepTiming: 'Wann war das?',
    timingNow: 'Gerade jetzt',
    timing15: 'Vor ~15 Min',
    timing60: 'Vor ~1 Std',
    gpsUnavailable: 'GPS nicht verfügbar — Standort wird für diese Meldung benötigt.',
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

  simulations: {
    title: 'Situationen üben',
    subtitle: 'Wie würdest du reagieren?',
    resultCorrect: 'Richtig',
    resultIncorrect: 'Nicht optimal',
    resultExplanation: 'Erklärung:',
    nextStep: 'Weiter',
    restart: 'Nochmal',
    finish: 'Fertig',
    scenarios: {
      identityCheck: {
        id: 'identityCheck',
        title: 'Identitätskontrolle',
        description: 'Du wirst auf der Straße von der Polizei angesprochen.',
        icon: '🚶',
        steps: [
          {
            id: 'ic-1',
            situation: 'Zwei Polizisten sprechen dich auf der Straße an und fordern dich auf, deinen Ausweis zu zeigen.',
            question: 'Was tust du zuerst?',
            choices: [
              {
                id: 'ic-1-a',
                text: 'Ruhig fragen ob ich ausweispflichtig bin.',
                isCorrect: true,
                explanation: 'Du hast das Recht zu fragen — das ist keine Provokation sondern dein Recht.',
              },
              {
                id: 'ic-1-b',
                text: 'Sofort den Ausweis übergeben ohne zu fragen.',
                isCorrect: false,
                explanation: 'Du kannst zuerst fragen, ob überhaupt eine Ausweispflicht besteht.',
              },
              {
                id: 'ic-1-c',
                text: 'Den Ausweis verweigern und weggehen wollen.',
                isCorrect: false,
                explanation: 'Das kann als Widerstand gewertet werden. Besser erst fragen und dann kooperieren wenn eine Pflicht besteht.',
              },
            ],
          },
          {
            id: 'ic-2',
            situation: 'Der Polizist sagt: „Ja, Sie müssen sich ausweisen, wir führen allgemeine Kontrollen durch."',
            question: 'Was gibst du her?',
            choices: [
              {
                id: 'ic-2-a',
                text: 'Personalausweis oder Reisepass zeigen.',
                isCorrect: true,
                explanation: 'Ein Lichtbildausweis genügt — mehr musst du nicht herausgeben.',
              },
              {
                id: 'ic-2-b',
                text: 'Auch Handy, Rucksack und Portemonnaie aushändigen.',
                isCorrect: false,
                explanation: 'Du musst nur einen Lichtbildausweis vorzeigen — keine weiteren Gegenstände.',
              },
              {
                id: 'ic-2-c',
                text: 'Gar nichts zeigen und auf Datenschutz berufen.',
                isCorrect: false,
                explanation: 'Wenn eine Ausweispflicht besteht, musst du einen Lichtbildausweis vorzeigen.',
              },
            ],
          },
          {
            id: 'ic-3',
            situation: 'Der Polizist fragt dich: „Woher kommen Sie und wohin gehen Sie?"',
            question: 'Was antwortest du?',
            choices: [
              {
                id: 'ic-3-a',
                text: 'Schweigen oder sagen „Dazu mache ich keine Angaben."',
                isCorrect: true,
                explanation: 'Angaben zu Herkunft und Aufenthaltsgrund sind freiwillig — du musst diese Fragen nicht beantworten.',
              },
              {
                id: 'ic-3-b',
                text: 'Vollständig antworten um den Konflikt zu vermeiden.',
                isCorrect: false,
                explanation: 'Du musst diese Fragen nicht beantworten. Die Auskunft ist freiwillig.',
              },
              {
                id: 'ic-3-c',
                text: 'Eine falsche Adresse nennen.',
                isCorrect: false,
                explanation: 'Falsche Angaben können eine Straftat sein. Besser schweigen als lügen.',
              },
            ],
          },
        ],
      },
      houseSearch: {
        id: 'houseSearch',
        title: 'Hausdurchsuchung',
        description: 'Die Polizei erscheint vor deiner Wohnungstür.',
        icon: '🏠',
        steps: [
          {
            id: 'hs-1',
            situation: 'Es klingelt. Du schaust durch den Türspion und siehst Polizisten in Uniform. Sie rufen: „Polizei, wir möchten Ihre Wohnung durchsuchen."',
            question: 'Was tust du bevor du aufmachst?',
            choices: [
              {
                id: 'hs-1-a',
                text: 'Durch die geschlossene Tür nach dem Durchsuchungsbeschluss fragen.',
                isCorrect: true,
                explanation: 'Du musst nicht öffnen bevor du den Beschluss gesehen hast. Das ist dein Recht.',
              },
              {
                id: 'hs-1-b',
                text: 'Sofort öffnen um kooperativ zu wirken.',
                isCorrect: false,
                explanation: 'Du hast das Recht, zuerst den Beschluss zu sehen — nutze es.',
              },
              {
                id: 'hs-1-c',
                text: 'Die Tür gar nicht öffnen und nicht antworten.',
                isCorrect: false,
                explanation: 'Vollständiges Ignorieren kann die Situation eskalieren. Besser kommunizieren und nach dem Beschluss fragen.',
              },
            ],
          },
          {
            id: 'hs-2',
            situation: 'Die Beamten zeigen einen Durchsuchungsbeschluss. Du öffnest die Tür. Sie betreten die Wohnung.',
            question: 'Was tust du jetzt?',
            choices: [
              {
                id: 'hs-2-a',
                text: 'Beschluss lesen, Anwalt anrufen, alles beobachten und notieren.',
                isCorrect: true,
                explanation: 'Du hast das Recht, den Beschluss zu lesen und einen Anwalt zu kontaktieren. Notiere alles was durchsucht wird.',
              },
              {
                id: 'hs-2-b',
                text: 'Aktiv mithelfen beim Suchen um Kooperation zu zeigen.',
                isCorrect: false,
                explanation: 'Aktive Mithilfe kann später als Geständnis gewertet werden. Ruhig beobachten und notieren ist besser.',
              },
              {
                id: 'hs-2-c',
                text: 'Beamte körperlich aufhalten wollen.',
                isCorrect: false,
                explanation: 'Das wäre Widerstand gegen Vollstreckungsbeamte. Nutze stattdessen deine Rechte: Beschluss lesen, Anwalt rufen.',
              },
            ],
          },
          {
            id: 'hs-3',
            situation: 'Die Beamten nehmen am Ende deinen Laptop und einige Dokumente mit.',
            question: 'Was verlangst du?',
            choices: [
              {
                id: 'hs-3-a',
                text: 'Eine schriftliche Quittung für alle beschlagnahmten Gegenstände.',
                isCorrect: true,
                explanation: 'Du hast rechtlichen Anspruch auf ein Beschlagnahmeprotokoll. Bestehe darauf.',
              },
              {
                id: 'hs-3-b',
                text: 'Nichts verlangen und den Verlust hinnehmen.',
                isCorrect: false,
                explanation: 'Ohne Quittung hast du keine Grundlage für spätere Rechtsmittel. Fordere immer ein Protokoll.',
              },
              {
                id: 'hs-3-c',
                text: 'Den Laptop festhalten damit er nicht mitgenommen wird.',
                isCorrect: false,
                explanation: 'Das wäre Widerstand. Lass die Gegenstände mitnehmen und verlange stattdessen eine Quittung.',
              },
            ],
          },
        ],
      },
      arrest: {
        id: 'arrest',
        title: 'Festnahme',
        description: 'Du wirst von der Polizei vorläufig festgenommen.',
        icon: '🚔',
        steps: [
          {
            id: 'ar-1',
            situation: 'Ein Polizist sagt zu dir: „Sie sind vorläufig festgenommen."',
            question: 'Was sagst du als erstes?',
            choices: [
              {
                id: 'ar-1-a',
                text: '"Ich möchte einen Anwalt sprechen." — dann schweigen.',
                isCorrect: true,
                explanation: 'Das Recht auf Anwalt gilt sofort ab der Festnahme. Danach schweigen.',
              },
              {
                id: 'ar-1-b',
                text: 'Sofort alles erklären um das Missverständnis aufzuklären.',
                isCorrect: false,
                explanation: 'Alles was du sagst kann gegen dich verwendet werden. Erst Anwalt, dann reden.',
              },
              {
                id: 'ar-1-c',
                text: 'Fragen ob du festgenommen bist oder nicht.',
                isCorrect: false,
                explanation: 'Das wurde dir bereits gesagt. Wichtiger ist jetzt: Anwalt fordern und schweigen.',
              },
            ],
          },
          {
            id: 'ar-2',
            situation: 'Im Polizeiauto sprechen zwei Beamte locker mit dir. „Nur informell, kein Verhör — kannst du kurz erklären was heute passiert ist?"',
            question: 'Was tust du?',
            choices: [
              {
                id: 'ar-2-a',
                text: 'Schweigen und wiederholen: „Ich möchte meinen Anwalt."',
                isCorrect: true,
                explanation: 'Es gibt kein „informelles Gespräch" — alles kann im Verfahren verwendet werden.',
              },
              {
                id: 'ar-2-b',
                text: 'Das Gespräch annehmen da du nichts zu verbergen hast.',
                isCorrect: false,
                explanation: 'Auch harmlose Aussagen können im falschen Kontext belastend sein. Warte auf den Anwalt.',
              },
              {
                id: 'ar-2-c',
                text: 'Aggressiv reagieren und die Beamten beschimpfen.',
                isCorrect: false,
                explanation: 'Das verschlechtert deine Situation erheblich. Ruhig bleiben und schweigen.',
              },
            ],
          },
          {
            id: 'ar-3',
            situation: 'Auf dem Revier werden dir Formulare vorgelegt. „Bitte unterschreiben Sie hier, das ist nur eine Formalität."',
            question: 'Was tust du?',
            choices: [
              {
                id: 'ar-3-a',
                text: 'Nichts unterschreiben bevor der Anwalt da ist.',
                isCorrect: true,
                explanation: 'Unterschriften sind rechtlich bindend — lass den Anwalt alles prüfen bevor du unterschreibst.',
              },
              {
                id: 'ar-3-b',
                text: 'Unterschreiben damit es schnell vorbeigeht.',
                isCorrect: false,
                explanation: 'Selbst „Formalitäten" können rechtliche Konsequenzen haben. Warte auf den Anwalt.',
              },
              {
                id: 'ar-3-c',
                text: 'Die Formulare zerreißen.',
                isCorrect: false,
                explanation: 'Das ist Sachbeschädigung und verschlimmert deine Lage. Ruhig ablehnen zu unterschreiben.',
              },
            ],
          },
        ],
      },
      vehicleStop: {
        id: 'vehicleStop',
        title: 'Fahrzeugkontrolle',
        description: 'Die Polizei hält dich mit Blaulicht an.',
        icon: '🚗',
        steps: [
          {
            id: 'vs-1',
            situation: 'Hinter dir leuchtet Blaulicht auf. Ein Polizeiauto signalisiert dir anzuhalten.',
            question: 'Was tust du sofort?',
            choices: [
              {
                id: 'vs-1-a',
                text: 'Sicher an den Straßenrand fahren, Motor aus, Hände sichtbar aufs Lenkrad.',
                isCorrect: true,
                explanation: 'Sichtbare Hände signalisieren keine Bedrohung — das ist zu deiner eigenen Sicherheit.',
              },
              {
                id: 'vs-1-b',
                text: 'Im Auto bleiben und warten bis jemand klopft ohne Hände zu zeigen.',
                isCorrect: false,
                explanation: 'Hände sichtbar halten deeskaliert die Situation und ist ein Sicherheitszeichen.',
              },
              {
                id: 'vs-1-c',
                text: 'Aussteigen und auf die Beamten zugehen.',
                isCorrect: false,
                explanation: 'Spontanes Aussteigen kann als Bedrohung wahrgenommen werden. Im Auto bleiben und Hände zeigen.',
              },
            ],
          },
          {
            id: 'vs-2',
            situation: 'Der Beamte tritt ans Fenster und sagt: „Führerschein und Fahrzeugpapiere bitte."',
            question: 'Was übergibst du?',
            choices: [
              {
                id: 'vs-2-a',
                text: 'Führerschein und Fahrzeugschein — mehr nicht.',
                isCorrect: true,
                explanation: 'Mehr als diese Dokumente musst du bei einer Verkehrskontrolle nicht vorzeigen.',
              },
              {
                id: 'vs-2-b',
                text: 'Auch Personalausweis, Handynummer und Adresse nennen.',
                isCorrect: false,
                explanation: 'Du musst nur Führerschein und Fahrzeugpapiere vorzeigen — nicht mehr.',
              },
              {
                id: 'vs-2-c',
                text: 'Gar nichts herausgeben und fragen ob das freiwillig ist.',
                isCorrect: false,
                explanation: 'Bei einer Verkehrskontrolle bist du verpflichtet, Führerschein und Fahrzeugschein vorzuzeigen.',
              },
            ],
          },
          {
            id: 'vs-3',
            situation: 'Der Beamte fragt: „Darf ich mal kurz in den Kofferraum schauen?"',
            question: 'Was antwortest du?',
            choices: [
              {
                id: 'vs-3-a',
                text: '"Nein, ich stimme einer Durchsuchung nicht zu."',
                isCorrect: true,
                explanation: 'Du kannst ablehnen. Ohne Beschluss oder konkreten Verdacht darf nicht durchsucht werden.',
              },
              {
                id: 'vs-3-b',
                text: 'Zustimmen damit keine Probleme entstehen.',
                isCorrect: false,
                explanation: 'Du musst nicht zustimmen. Eine Ablehnung ist kein Schuldeingeständnis.',
              },
              {
                id: 'vs-3-c',
                text: 'Den Kofferraum eigenständig öffnen um Kooperation zu zeigen.',
                isCorrect: false,
                explanation: 'Eigenständiges Öffnen gilt als Zustimmung. Besser klar ablehnen.',
              },
            ],
          },
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
    dataProtection: 'Datenschutz',
    pinChange: 'Verschlüsselungs-PIN ändern',
    pinChangeStep1: 'Aktuellen PIN eingeben',
    pinChangeStep2: 'Neuen PIN wählen',
    pinChangeStep3: 'Neuen PIN bestätigen',
    pinChangeSuccess: 'PIN erfolgreich geändert',
    pinChangeError: 'Falscher PIN',
    pinChangeMismatch: 'PINs stimmen nicht überein',
    pinChangeWorking: 'Daten werden neu verschlüsselt…',
    deleteAllData: 'Alle Daten löschen (Notfall)',
    emergencyContacts: 'Notfallkontakte',
    emergencyContactsHint: 'Werden beim Notfall-Tap benachrichtigt (max. 3)',
    emergencyContactName: 'Name',
    emergencyContactPhone: 'Telefon (+49...)',
    emergencyContactAdd: '+ Kontakt hinzufügen',
    emergencyContactRemove: 'Entfernen',
    emergencyMessage: 'Nachricht',
    emergencyMessageHint: 'Wird mit deinem ungefähren Standort gesendet',
    emergencyAlertSending: 'Alert wird gesendet…',
    aiAssistantKey: 'KI-Assistent (Beta)',
    aiAssistantKeyHint: 'Anthropic API-Key — bleibt lokal auf deinem Gerät',
    aiAssistantKeyPlaceholder: 'sk-ant-...',
    aiAssistantKeySave: 'Speichern',
    aiAssistantKeyDelete: 'Key löschen',
    aiAssistantKeyLink: 'Kostenlos testen → console.anthropic.com',
  },

  legalChat: {
    title: 'Rechtsfragen stellen',
    disclaimer: 'Allgemeine Information, keine Rechtsberatung',
    placeholder: 'Deine Frage…',
    noKey: 'Kein API-Key konfiguriert',
    noKeyHint: 'Gehe zu Einstellungen → KI-Assistent',
    errorInvalidKey: 'Ungültiger API-Key',
    errorRateLimit: 'Zu viele Anfragen — kurz warten',
    errorNetwork: 'Keine Verbindung',
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
