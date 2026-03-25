import { AuthorityCategory, ObservedActivityType, ObservationConfidence } from '@peopleseyes/core-model';
import type { Translations } from '../schema.js';

export const pl: Translations = {
  app: { name: 'PeoplesEyes', tagline: 'Obserwujemy razem. Dokumentujemy bezpiecznie.' },

  nav: { map: 'Mapa', report: 'Zgłoś', rights: 'Prawa', evidence: 'Dowody', settings: 'Ustawienia' },

  map: {
    title: 'Aktualne obserwacje',
    noReports: 'Brak aktualnych zgłoszeń w tym obszarze.',
    loading: 'Ładowanie mapy…',
    zoomIn: 'Przybliż, aby zobaczyć szczegóły',
    reportHere: 'Zgłoś tutaj',
    lastUpdated: 'Ostatnia aktualizacja',
    reportsInArea: 'Zgłoszenia w tym obszarze',
  },

  report: {
    title: 'Zgłoś obserwację',
    subtitle: 'Twoje zgłoszenie jest anonimowe. Surowe dane lokalizacyjne nie opuszczają urządzenia.',
    step: {
      authority: 'Jaka służba?',
      activity: 'Co zaobserwowano?',
      confidence: 'Jak pewny/a jesteś?',
      description: 'Opis opcjonalny',
      confirm: 'Potwierdź',
    },
    authorityLabel: 'Służba',
    activityLabel: 'Aktywność',
    confidenceLabel: 'Pewność',
    descriptionLabel: 'Opis (opcjonalny)',
    descriptionPlaceholder: 'Krótki, rzeczowy opis tego, co zaobserwowano…',
    descriptionHint: 'Nie podawaj danych osobowych, nazwisk ani numerów rejestracyjnych. Maks. 280 znaków.',
    submitButton: 'Zgłoś anonimowo',
    cancelButton: 'Anuluj',
    successMessage: 'Zgłoszenie zostało anonimowo przesłane.',
    searchAuthority: 'Szukaj służby…',
    groupFederal: 'Policja Federalna',
    groupState: 'Policja Krajowa',
    groupImmigration: 'Urząd ds. Cudzoziemców',
    groupFrontex: 'Frontex / Wspólna',
    unknownAuthority: 'Niewyraźnie rozpoznawalne →',
    activityGroupControl: 'Kontrola',
    activityGroupOperation: 'Operacja',
    legalDisclaimer:
      'Ta aplikacja służy do dokumentowania i informowania. Fałszywe zgłoszenia mogą mieć konsekwencje prawne. Zgłaszaj tylko to, co rzeczywiście zaobserwowałeś/aś.',
  },

  authority: {
    [AuthorityCategory.BundespolizeiBahn]: 'Policja Federalna (Kolej / Dworzec)',
    [AuthorityCategory.BundespolizeiFlughafen]: 'Policja Federalna (Lotnisko)',
    [AuthorityCategory.BundespolizeiGrenze]: 'Policja Federalna (Przejście graniczne)',
    [AuthorityCategory.BundespolizeiMobil]: 'Policja Federalna (mobilna)',
    [AuthorityCategory.LandespolizeiSchwerpunktkontrolle]: 'Policja Krajowa – Intensywna kontrola',
    [AuthorityCategory.LandespolizeiRazzia]: 'Policja Krajowa – Nalot / Wielka operacja',
    [AuthorityCategory.LandespolizeiAllgemein]: 'Policja Krajowa (ogólna)',
    [AuthorityCategory.AuslaenderbehördeUnterkuenfte]: 'Urząd ds. Cudzoziemców – Zakwaterowanie',
    [AuthorityCategory.AuslaenderbehördeVorführung]: 'Urząd ds. Cudzoziemców – Wezwanie',
    [AuthorityCategory.AuslaenderbehördeAbschiebung]: 'Urząd ds. Cudzoziemców – Deportacja',
    [AuthorityCategory.FrontexPatrouille]: 'Frontex – Patrol',
    [AuthorityCategory.FrontexOperation]: 'Frontex – Operacja',
    [AuthorityCategory.GemeinsameBundLand]: 'Wspólna operacja federalna i krajowa',
    [AuthorityCategory.GemeinsameMitFrontex]: 'Wspólna operacja z Frontex',
    [AuthorityCategory.Unbekannt]: 'Niewyraźnie rozpoznawalne',
  },

  activity: {
    [ObservedActivityType.Identitaetskontrolle]: 'Kontrola tożsamości / dokumentów',
    [ObservedActivityType.StationaereKontrolle]: 'Stały punkt kontrolny',
    [ObservedActivityType.Patrouille]: 'Patrol',
    [ObservedActivityType.Fahrzeugkontrolle]: 'Kontrola pojazdów',
    [ObservedActivityType.Zugriff]: 'Zatrzymanie / aresztowanie zaobserwowane',
    [ObservedActivityType.Transport]: 'Transport osób (pojazd / autobus)',
    [ObservedActivityType.DurchsuchungGebaeude]: 'Przeszukanie budynku / zakwaterowania',
    [ObservedActivityType.Sonstiges]: 'Inne',
  },

  confidence: {
    [ObservationConfidence.Direkt]: 'Obserwowałem/am to bezpośrednio',
    [ObservationConfidence.Weitergeleitet]: 'Przekazano z wiarygodnego źródła',
    [ObservationConfidence.Unsicher]: 'Niepewne – mogło być coś innego',
  },

  rights: {
    title: 'Twoje prawa',
    disclaimer:
      'Poniższe informacje mają charakter ogólny i nie zastępują porady prawnej. W konkretnych sytuacjach skontaktuj się z centrum pomocy prawnej.',
    topics: {
      identityControl: {
        title: 'Kontrola tożsamości',
        summary: 'Policja może sprawdzić tożsamość, jeśli istnieje konkretny powód.',
        keyPoints: [
          'Możesz zapytać: „Czy jestem zobowiązany/a do okazania dokumentu?"',
          'Wystarczy dokument tożsamości ze zdjęciem (dowód osobisty, paszport).',
          'Nie musisz ujawniać swojego pochodzenia ani powodu przebywania.',
          'Bez dokumentu: policja może cię zatrzymać w celu ustalenia tożsamości na kilka godzin.',
          'Zanotuj: datę, godzinę, miejsce, numer odznaki funkcjonariusza, świadków.',
        ],
      },
      search: {
        title: 'Przeszukanie',
        summary: 'Przeszukanie osoby lub miejsca zamieszkania wymaga co do zasady nakazu sądowego.',
        keyPoints: [
          'Zapytaj: „Czy mają Państwo nakaz przeszukania?"',
          'Poproś o okazanie nakazu i przeczytaj go uważnie.',
          'Możesz wyrazić sprzeciw – nie zatrzyma to przeszukania, ale jest ważne dla późniejszych odwołań.',
          'Zanotuj wszystko, co jest przeszukiwane i zajmowane.',
          'Zażądaj pokwitowania za zajęte przedmioty.',
        ],
      },
      arrest: {
        title: 'Zatrzymanie / przesłuchanie',
        summary: 'Masz prawo do milczenia – prawo to obowiązuje zawsze.',
        keyPoints: [
          'Powiedz wyraźnie: „Chcę porozmawiać z adwokatem."',
          'Nie musisz podawać żadnych informacji poza danymi osobowymi.',
          'Zażądaj pisemnego uzasadnienia zatrzymania.',
          'Musisz być doprowadzony/a przed sędziego najpóźniej dnia następnego.',
          'Natychmiast skontaktuj się z infolinią prawną lub zaufanym adwokatem.',
        ],
      },
      recording: {
        title: 'Filmowanie policji',
        summary: 'Filmowanie działań policji w przestrzeni publicznej jest zasadniczo dozwolone.',
        keyPoints: [
          'Filmowanie czynności urzędowych w przestrzeni publicznej jest objęte wolnością słowa (Art. 5 GG).',
          'Rozpoznawalne twarze osób prywatnych w tle powinny być zamazane (RODO).',
          'Funkcjonariusze nie mają prawa powstrzymywać cię od filmowania ani konfiskować telefonu.',
          'Konfiskata telefonu wymaga nakazu sądowego.',
          'Szybko wgraj nagrania do chmury lub podziel się nimi z zaufaną osobą.',
        ],
      },
      silence: {
        title: 'Prawo do milczenia',
        summary: 'Masz prawo odmówić odpowiedzi na pytania. Korzystaj z niego spokojnie.',
        keyPoints: [
          'Powiedz: „Korzystam z prawa do milczenia i proszę o adwokata."',
          'Milczenie nie może być użyte przeciwko tobie.',
          'Nie składaj żadnych oświadczeń dotyczących sprawy – nawet pozornie niewinnych.',
          'Kontakty alarmowe: GFF (Towarzystwo Praw Obywatelskich), RAV (Stowarzyszenie Adwokatów Republikańskich).',
        ],
      },
    },
  },

  evidence: {
    title: 'Zabezpieczanie dowodów',
    empty: 'Nie zapisano jeszcze żadnych nagrań.',
    recordVideo: 'Nagraj wideo',
    recordAudio: 'Nagraj dźwięk',
    takePhoto: 'Zrób zdjęcie',
    exifWarning: 'Dane GPS i informacje o urządzeniu są automatycznie usuwane ze wszystkich nagrań.',
    deleteConfirm: 'Trwale usunąć nagranie?',
    storageWarning: 'Nagrania są przechowywane wyłącznie lokalnie na twoim urządzeniu. Zrób kopię zapasową ważnych nagrań w bezpiecznym miejscu.',
  },

  settings: {
    title: 'Ustawienia',
    language: 'Język',
    reportResolution: 'Dokładność zgłoszenia',
    reportResolutionHint: 'Mniejsza rozdzielczość zwiększa anonimowość. Domyślnie: poziom dzielnicy (~5 km²).',
    persistEvidence: 'Zapisuj nagrania lokalnie',
    persistEvidenceHint: 'Wyłączone: nagrania są przechowywane tylko w pamięci i usuwane po restarcie.',
    notifications: 'Powiadomienia o zgłoszeniach w pobliżu',
    notificationsHint: 'Wymaga dostępu do lokalizacji. Lokalizacja jest używana tylko lokalnie.',
    about: 'O PeoplesEyes',
    sourceCode: 'Kod źródłowy (GitHub)',
    legalNotice: 'Informacja prawna',
  },

  errors: {
    locationDenied: 'Odmówiono dostępu do lokalizacji. Zezwól na dostęp w ustawieniach przeglądarki.',
    locationUnavailable: 'Nie można określić lokalizacji.',
    reportFailed: 'Nie można wysłać zgłoszenia. Spróbuj ponownie.',
    syncFailed: 'Synchronizacja nie powiodła się. Sprawdź połączenie.',
    storageFull: 'Pamięć urządzenia jest pełna. Usuń starsze nagrania.',
  },

  common: {
    yes: 'Tak', no: 'Nie', cancel: 'Anuluj', confirm: 'Potwierdź',
    back: 'Wstecz', next: 'Dalej', loading: 'Ładowanie…',
    unknown: 'Nieznany', offline: 'Offline', online: 'Online',
  },
};
