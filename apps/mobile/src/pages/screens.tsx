/**
 * Mobile-Screens: ReportScreen, RightsScreen, SettingsScreen.
 *
 * Business-Logik identisch mit Web (via shared core-* packages).
 * UI verwendet React Native-Primitives statt HTML/Tailwind.
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  TextInput, StyleSheet, Alert, Switch,
} from 'react-native';
import {
  AuthorityCategory, AuthorityVisibility,
  ObservedActivityType, ObservationConfidence,
  H3Resolution,
} from '@peopleseyes/core-model';
import type { SupportedLocale } from '@peopleseyes/core-model';
import { createReport, ACTIVITY_TO_AUTHORITY_HINTS } from '@peopleseyes/core-logic';
import { getTranslations } from '@peopleseyes/core-i18n';
import { useNativeReports } from '../hooks/useNativeReports.js';
import { useNativeLocation } from '../hooks/useNativeLocation.js';

// Einstellungen lokal (expo-secure-store in Phase 4 für sensitive Daten)
import AsyncStorage from '@react-native-async-storage/async-storage';

function useSettings() {
  const [locale, setLocaleState] = useState<SupportedLocale>('de');
  const [resolution, setResolutionState] = useState<6 | 7 | 8>(7);
  const [persistEvidence, setPersistEvidenceState] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // BUG-04 fix: Einstellungen beim Mount aus AsyncStorage laden
  useEffect(() => {
    const load = async () => {
      try {
        const [storedLocale, storedResolution, storedPersist] = await Promise.all([
          AsyncStorage.getItem('pe:locale'),
          AsyncStorage.getItem('pe:resolution'),
          AsyncStorage.getItem('pe:persistEvidence'),
        ]);
        if (storedLocale) setLocaleState(storedLocale as SupportedLocale);
        if (storedResolution) {
          const r = Number(storedResolution) as 6 | 7 | 8;
          if (r === 6 || r === 7 || r === 8) setResolutionState(r);
        }
        if (storedPersist !== null) setPersistEvidenceState(storedPersist === 'true');
      } catch {
        // AsyncStorage-Fehler – Defaults behalten
      } finally {
        setLoaded(true);
      }
    };
    void load();
  }, []);

  const setLocale = async (v: SupportedLocale) => {
    setLocaleState(v);
    await AsyncStorage.setItem('pe:locale', v);
  };
  const setResolution = async (v: 6 | 7 | 8) => {
    setResolutionState(v);
    await AsyncStorage.setItem('pe:resolution', String(v));
  };
  // MED-01 fix: persistEvidence wird jetzt tatsächlich gespeichert
  const setPersistEvidence = async (v: boolean) => {
    setPersistEvidenceState(v);
    await AsyncStorage.setItem('pe:persistEvidence', String(v));
  };

  return { locale, resolution, persistEvidence, setLocale, setResolution, setPersistEvidence, loaded };
}

// ─── Activity Tiles (mobile-native, kein shared component) ────────────────────

interface ActivityTile {
  activity: ObservedActivityType;
  icon: string;
}

const MOBILE_ACTIVITY_TILES: ActivityTile[] = [
  { activity: ObservedActivityType.StationaereKontrolle,  icon: '🛑' },
  { activity: ObservedActivityType.Identitaetskontrolle,  icon: '🪪' },
  { activity: ObservedActivityType.Fahrzeugkontrolle,     icon: '🚗' },
  { activity: ObservedActivityType.Patrouille,            icon: '👮' },
  { activity: ObservedActivityType.Zugriff,               icon: '⛓' },
  { activity: ObservedActivityType.Transport,             icon: '🚐' },
  { activity: ObservedActivityType.DurchsuchungGebaeude,  icon: '🏠' },
  { activity: ObservedActivityType.Sonstiges,             icon: '❓' },
];

// Authority-Gruppen für "Alle anzeigen"-Fallback
type AuthorityGroup = 'federal' | 'state' | 'immigration' | 'frontex';

const GROUP_CATEGORIES: Record<AuthorityGroup, AuthorityCategory[]> = {
  federal: [
    AuthorityCategory.BundespolizeiBahn,
    AuthorityCategory.BundespolizeiFlughafen,
    AuthorityCategory.BundespolizeiGrenze,
    AuthorityCategory.BundespolizeiMobil,
  ],
  state: [
    AuthorityCategory.LandespolizeiSchwerpunktkontrolle,
    AuthorityCategory.LandespolizeiRazzia,
    AuthorityCategory.LandespolizeiAllgemein,
  ],
  immigration: [
    AuthorityCategory.AuslaenderbehördeUnterkuenfte,
    AuthorityCategory.AuslaenderbehördeVorführung,
    AuthorityCategory.AuslaenderbehördeAbschiebung,
  ],
  frontex: [
    AuthorityCategory.FrontexPatrouille,
    AuthorityCategory.FrontexOperation,
    AuthorityCategory.GemeinsameBundLand,
    AuthorityCategory.GemeinsameMitFrontex,
    AuthorityCategory.Unbekannt,
  ],
};

const GROUP_ICONS: Record<AuthorityGroup, string> = {
  federal: '🚔',
  state: '🏛️',
  immigration: '📋',
  frontex: '🇪🇺',
};

const GROUPS: AuthorityGroup[] = ['federal', 'state', 'immigration', 'frontex'];

const COMBINED_CONFIDENCE_OPTIONS = [
  {
    label: 'Ich habe es direkt gesehen — Behörde klar erkennbar',
    confidence: ObservationConfidence.Direkt,
    visibility: AuthorityVisibility.EindeutigErkennbar,
  },
  {
    label: 'Ich habe es direkt gesehen — nicht sicher wer',
    confidence: ObservationConfidence.Direkt,
    visibility: AuthorityVisibility.Unklar,
  },
  {
    label: 'Jemand hat es mir erzählt',
    confidence: ObservationConfidence.Weitergeleitet,
    visibility: AuthorityVisibility.Unklar,
  },
] as const;

function normalize(str: string): string {
  return str.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
}

// ─── ReportScreen ─────────────────────────────────────────────────────────────

type Step = 'context' | 'activity' | 'authority' | 'confidence' | 'timing' | 'description' | 'confirm' | 'success';

const ALL_STEPS: Step[] = ['context', 'activity', 'authority', 'confidence', 'timing', 'description', 'confirm'];

export const ReportScreen: React.FC = () => {
  const { locale } = useSettings();
  const t = getTranslations(locale);
  const { addReport } = useNativeReports();
  const { rawCoords } = useNativeLocation();

  const [activeSteps, setActiveSteps] = useState<Step[]>(ALL_STEPS);
  const [step, setStep] = useState<Step>('context');
  const [activity, setActivity] = useState<ObservedActivityType | null>(null);
  const [authority, setAuthority] = useState<AuthorityCategory | null>(null);
  const [confidence, setConfidence] = useState<ObservationConfidence | null>(null);
  const [visibility, setVisibility] = useState<AuthorityVisibility | null>(null);
  const [timingOffsetMinutes, setTimingOffsetMinutes] = useState<0 | 15 | 60>(0);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  // "Alle Behörden anzeigen" Fallback
  const [showAllAuthorities, setShowAllAuthorities] = useState(false);
  const [activeGroup, setActiveGroup] = useState<AuthorityGroup | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const currentIdx = activeSteps.indexOf(step);

  const hintAuthorities = activity ? ACTIVITY_TO_AUTHORITY_HINTS[activity] : [];

  const allCategories = useMemo(() => Object.values(AuthorityCategory), []);
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const needle = normalize(searchQuery);
    return allCategories.filter(cat => normalize(t.authority[cat]).includes(needle));
  }, [searchQuery, allCategories, t]);

  const goNextFrom = (currentStep: Step) => {
    const idx = activeSteps.indexOf(currentStep);
    if (idx < activeSteps.length - 1) setStep(activeSteps[idx + 1]!);
  };

  const goBack = () => {
    if (currentIdx > 0) setStep(activeSteps[currentIdx - 1]!);
  };

  const handleContextSelect = (ctx: 'affected' | 'witness') => {
    if (ctx === 'affected') {
      setConfidence(ObservationConfidence.Direkt);
      setVisibility(AuthorityVisibility.EindeutigErkennbar);
      setActiveSteps(prev => prev.filter(s => s !== 'confidence'));
    }
    goNextFrom('context');
  };

  const handleActivitySelect = (act: ObservedActivityType) => {
    setActivity(act);
    setShowAllAuthorities(false);
    setActiveGroup(null);
    setSearchQuery('');
    goNextFrom('activity');
  };

  const handleAuthoritySelect = (cat: AuthorityCategory) => {
    setAuthority(cat);
    setShowAllAuthorities(false);
    setActiveGroup(null);
    setSearchQuery('');
    goNextFrom('authority');
  };

  const groupLabel = (group: AuthorityGroup): string => {
    switch (group) {
      case 'federal':     return t.report.groupFederal;
      case 'state':       return t.report.groupState;
      case 'immigration': return t.report.groupImmigration;
      case 'frontex':     return t.report.groupFrontex;
    }
  };

  const handleSubmit = async () => {
    if (!authority || !visibility || !activity || !confidence) return;
    setIsSubmitting(true);
    try {
      const nowMs = Date.now() - timingOffsetMinutes * 60_000;
      const draft = {
        lat: rawCoords?.lat ?? 51.3,
        lng: rawCoords?.lng ?? 10.0,
        authorityCategory: authority,
        authorityVisibility: visibility,
        activityType: activity,
        confidence,
        ...(description.trim() ? { description: description.trim() } : {}),
        resolution: H3Resolution.Viertel,
      };
      const report = createReport(draft, nowMs);
      await addReport(report);
      setStep('success');
    } catch (err) {
      Alert.alert('Fehler', err instanceof Error ? err.message : 'Melden fehlgeschlagen');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 'success') {
    return (
      <View style={s.center}>
        <Text style={s.successIcon}>✓</Text>
        <Text style={s.h2}>Anonym gemeldet</Text>
        <Text style={s.muted}>{t.report.successMessage}</Text>
        <TouchableOpacity style={s.btn} onPress={() => {
          setActiveSteps(ALL_STEPS);
          setStep('context');
          setActivity(null); setAuthority(null);
          setConfidence(null); setVisibility(null);
          setDescription(''); setTimingOffsetMinutes(0);
          setShowAllAuthorities(false); setActiveGroup(null); setSearchQuery('');
        }}>
          <Text style={s.btnText}>Neue Meldung</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={s.fill} contentContainerStyle={s.container}>
      <Text style={s.h1}>{t.report.title}</Text>
      <Text style={s.subtitle}>{t.report.subtitle}</Text>

      {/* Schritt: context */}
      {step === 'context' && (
        <>
          <Text style={s.stepLabel}>{t.report.stepContext}</Text>
          <View style={s.groupGrid}>
            <TouchableOpacity
              style={[s.groupTile, { minHeight: 100 }]}
              onPress={() => handleContextSelect('affected')}
            >
              <Text style={s.groupIcon}>🙋</Text>
              <Text style={s.groupLabel}>{t.report.contextAffected}</Text>
              <Text style={[s.groupLabel, { fontSize: 10, color: '#475569' }]}>{t.report.contextAffectedSub}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[s.groupTile, { minHeight: 100 }]}
              onPress={() => handleContextSelect('witness')}
            >
              <Text style={s.groupIcon}>👁</Text>
              <Text style={s.groupLabel}>{t.report.contextWitness}</Text>
              <Text style={[s.groupLabel, { fontSize: 10, color: '#475569' }]}>{t.report.contextWitnessSub}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Schritt: activity */}
      {step === 'activity' && (
        <>
          <Text style={s.stepLabel}>{t.report.stepActivity}</Text>
          <View style={s.groupGrid}>
            {MOBILE_ACTIVITY_TILES.map(({ activity: act, icon }) => (
              <TouchableOpacity
                key={act}
                style={[s.groupTile, activity === act && s.groupTileActive]}
                onPress={() => handleActivitySelect(act)}
              >
                <Text style={s.groupIcon}>{icon}</Text>
                <Text style={[s.groupLabel, activity === act && s.groupLabelActive]}>
                  {t.activity[act]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {/* Schritt: authority */}
      {step === 'authority' && (
        <>
          <Text style={s.stepLabel}>{t.report.stepAuthority}</Text>

          {!showAllAuthorities ? (
            <>
              {/* Priorisierte Hints */}
              {hintAuthorities
                .filter(cat => cat !== AuthorityCategory.Unbekannt)
                .map(cat => (
                  <TouchableOpacity
                    key={cat}
                    style={[s.option, authority === cat && s.optionSelected]}
                    onPress={() => handleAuthoritySelect(cat)}
                  >
                    <Text style={[s.optionText, authority === cat && s.optionTextSelected]}>
                      {t.authority[cat]}
                    </Text>
                  </TouchableOpacity>
                ))}

              {/* Unbekannt immer sichtbar */}
              <TouchableOpacity
                style={[s.option, authority === AuthorityCategory.Unbekannt && s.optionSelected]}
                onPress={() => handleAuthoritySelect(AuthorityCategory.Unbekannt)}
              >
                <Text style={[s.optionText, authority === AuthorityCategory.Unbekannt && s.optionTextSelected]}>
                  ❓ {t.report.authorityUnknownLabel}
                </Text>
              </TouchableOpacity>

              {/* Alle anzeigen */}
              <TouchableOpacity
                style={s.unknownBtn}
                onPress={() => setShowAllAuthorities(true)}
              >
                <Text style={s.unknownBtnText}>{t.report.authorityShowAll}</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* Suche */}
              <TextInput
                style={s.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder={t.report.searchAuthority}
                placeholderTextColor="#475569"
                returnKeyType="search"
              />

              {searchResults !== null ? (
                searchResults.length === 0 ? (
                  <Text style={s.hint}>{t.common.unknown}</Text>
                ) : (
                  searchResults.map(cat => (
                    <TouchableOpacity
                      key={cat}
                      style={[s.option, authority === cat && s.optionSelected]}
                      onPress={() => handleAuthoritySelect(cat)}
                    >
                      <Text style={[s.optionText, authority === cat && s.optionTextSelected]}>
                        {t.authority[cat]}
                      </Text>
                    </TouchableOpacity>
                  ))
                )
              ) : (
                <>
                  <View style={s.groupGrid}>
                    {GROUPS.map(group => (
                      <TouchableOpacity
                        key={group}
                        style={[s.groupTile, activeGroup === group && s.groupTileActive]}
                        onPress={() => setActiveGroup(prev => (prev === group ? null : group))}
                      >
                        <Text style={s.groupIcon}>{GROUP_ICONS[group]}</Text>
                        <Text style={[s.groupLabel, activeGroup === group && s.groupLabelActive]}>
                          {groupLabel(group)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  {activeGroup && GROUP_CATEGORIES[activeGroup].map(cat => (
                    <TouchableOpacity
                      key={cat}
                      style={[s.option, authority === cat && s.optionSelected]}
                      onPress={() => handleAuthoritySelect(cat)}
                    >
                      <Text style={[s.optionText, authority === cat && s.optionTextSelected]}>
                        {t.authority[cat]}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    style={s.unknownBtn}
                    onPress={() => handleAuthoritySelect(AuthorityCategory.Unbekannt)}
                  >
                    <Text style={s.unknownBtnText}>{t.report.unknownAuthority}</Text>
                  </TouchableOpacity>
                </>
              )}

              <TouchableOpacity
                style={s.unknownBtn}
                onPress={() => { setShowAllAuthorities(false); setActiveGroup(null); setSearchQuery(''); }}
              >
                <Text style={[s.unknownBtnText, { color: '#3b82f6' }]}>← Zurück</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}

      {/* Schritt: confidence (kombiniert) */}
      {step === 'confidence' && (
        <>
          <Text style={s.stepLabel}>{t.report.step.confidence}</Text>
          {COMBINED_CONFIDENCE_OPTIONS.map(opt => {
            const isSelected = confidence === opt.confidence && visibility === opt.visibility;
            return (
              <TouchableOpacity
                key={`${opt.confidence}-${opt.visibility}`}
                style={[s.option, isSelected && s.optionSelected]}
                onPress={() => {
                  setConfidence(opt.confidence);
                  setVisibility(opt.visibility);
                  goNextFrom('confidence');
                }}
              >
                <Text style={[s.optionText, isSelected && s.optionTextSelected]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </>
      )}

      {/* Schritt: timing */}
      {step === 'timing' && (
        <>
          <Text style={s.stepLabel}>{t.report.stepTiming}</Text>
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
            {([0, 15, 60] as const).map(offset => {
              const label = offset === 0 ? t.report.timingNow : offset === 15 ? t.report.timing15 : t.report.timing60;
              return (
                <TouchableOpacity
                  key={offset}
                  style={[
                    s.option,
                    { flex: 1, alignItems: 'center', padding: 10 },
                    timingOffsetMinutes === offset && s.optionSelected,
                  ]}
                  onPress={() => setTimingOffsetMinutes(offset)}
                >
                  <Text style={[s.optionText, timingOffsetMinutes === offset && s.optionTextSelected]}>
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity style={s.btn} onPress={() => goNextFrom('timing')}>
            <Text style={s.btnText}>{t.common.next}</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Schritt: description */}
      {step === 'description' && (
        <>
          <Text style={s.stepLabel}>{t.report.step.description}</Text>
          <TextInput
            style={s.textInput}
            value={description}
            onChangeText={v => setDescription(v.slice(0, 280))}
            placeholder={t.report.descriptionPlaceholder}
            placeholderTextColor="#475569"
            multiline
            numberOfLines={4}
          />
          <Text style={s.hint}>{description.length}/280 · {t.report.descriptionHint}</Text>
          <TouchableOpacity style={s.btn} onPress={() => goNextFrom('description')}>
            <Text style={s.btnText}>{t.common.next}</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Schritt: confirm */}
      {step === 'confirm' && (
        <>
          <Text style={s.stepLabel}>{t.report.step.confirm}</Text>
          {activity && <View style={s.row}><Text style={s.rowLabel}>{t.report.activityLabel}</Text><Text style={s.rowValue}>{t.activity[activity]}</Text></View>}
          {authority && <View style={s.row}><Text style={s.rowLabel}>{t.report.authorityLabel}</Text><Text style={s.rowValue}>{t.authority[authority]}</Text></View>}
          {confidence && <View style={s.row}><Text style={s.rowLabel}>{t.report.confidenceLabel}</Text><Text style={s.rowValue}>{t.confidence[confidence]}</Text></View>}
          {timingOffsetMinutes > 0 && (
            <View style={s.row}>
              <Text style={s.rowLabel}>{t.report.stepTiming}</Text>
              <Text style={s.rowValue}>{timingOffsetMinutes === 15 ? t.report.timing15 : t.report.timing60}</Text>
            </View>
          )}
          <Text style={s.disclaimer}>{t.report.legalDisclaimer}</Text>
          <TouchableOpacity
            style={[s.btn, isSubmitting && s.btnDisabled]}
            onPress={() => { void handleSubmit(); }}
            disabled={isSubmitting}
          >
            <Text style={s.btnText}>{isSubmitting ? t.common.loading : t.report.submitButton}</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Back button (nicht für auto-advance Schritte) */}
      {step !== 'context' && (
        <TouchableOpacity style={s.backBtn} onPress={goBack}>
          <Text style={s.backBtnText}>{t.common.back}</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

// ─── RightsScreen ─────────────────────────────────────────────────────────────

export const RightsScreen: React.FC = () => {
  const { locale } = useSettings();
  const t = getTranslations(locale);
  const [open, setOpen] = useState<string | null>(null);
  const topics = t.rights.topics;

  return (
    <ScrollView style={s.fill} contentContainerStyle={s.container}>
      <Text style={s.h1}>{t.rights.title}</Text>
      <Text style={s.disclaimer}>{t.rights.disclaimer}</Text>
      {Object.entries(topics).map(([key, topic]) => (
        <TouchableOpacity key={key} style={s.accordion} onPress={() => setOpen(open === key ? null : key)}>
          <View style={s.accordionHeader}>
            <Text style={s.accordionTitle}>{topic.title}</Text>
            <Text style={s.accordionChevron}>{open === key ? '▲' : '▼'}</Text>
          </View>
          {open === key && (
            <View style={s.accordionBody}>
              <Text style={s.accordionSummary}>{topic.summary}</Text>
              {topic.keyPoints.map((p, i) => (
                <View key={i} style={s.bulletRow}>
                  <Text style={s.bullet}>→</Text>
                  <Text style={s.bulletText}>{p}</Text>
                </View>
              ))}
            </View>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

// ─── SettingsScreen ───────────────────────────────────────────────────────────

const LOCALE_LIST: Array<{ value: SupportedLocale; label: string; flag: string }> = [
  { value: 'de', label: 'Deutsch',    flag: '🇩🇪' },
  { value: 'en', label: 'English',    flag: '🇬🇧' },
  { value: 'tr', label: 'Türkçe',     flag: '🇹🇷' },
  { value: 'uk', label: 'Укр',        flag: '🇺🇦' },
  { value: 'ar', label: 'عربي',       flag: '🇸🇦' },
  { value: 'fa', label: 'فارسی',      flag: '🇮🇷' },
  { value: 'fr', label: 'Français',   flag: '🇫🇷' },
  { value: 'es', label: 'Español',    flag: '🇪🇸' },
  { value: 'pl', label: 'Polski',     flag: '🇵🇱' },
  { value: 'ro', label: 'Română',     flag: '🇷🇴' },
  { value: 'sr', label: 'Srpski',     flag: '🇷🇸' },
  { value: 'sq', label: 'Shqip',      flag: '🇦🇱' },
  { value: 'bs', label: 'Bosanski',   flag: '🇧🇦' },
  { value: 'so', label: 'Soomaali',   flag: '🇸🇴' },
  { value: 'am', label: 'አማርኛ',       flag: '🇪🇹' },
  { value: 'ti', label: 'ትግርኛ',       flag: '🇪🇷' },
  { value: 'ps', label: 'پښتو',       flag: '🇦🇫' },
  { value: 'ku', label: 'Kurdî',      flag: '🏳' },
  { value: 'ru', label: 'Русский',    flag: '🇷🇺' },
  { value: 'sw', label: 'Kiswahili',  flag: '🇹🇿' },
];

export const SettingsScreen: React.FC = () => {
  const { locale, resolution, persistEvidence, setLocale, setResolution, setPersistEvidence } = useSettings();
  const t = getTranslations(locale);

  return (
    <ScrollView style={s.fill} contentContainerStyle={s.container}>
      <Text style={s.h1}>{t.settings.title}</Text>

      <Text style={s.sectionLabel}>{t.settings.language}</Text>
      <View style={s.localeGrid}>
        {LOCALE_LIST.map(({ value, label, flag }) => (
          <TouchableOpacity
            key={value}
            style={[s.localeTile, locale === value && s.localeTileActive]}
            onPress={() => void setLocale(value)}
          >
            <Text style={s.localeFlag}>{flag}</Text>
            <Text style={[s.localeLabel, locale === value && s.localeLabelActive]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={s.sectionLabel}>{t.settings.reportResolution}</Text>
      <Text style={s.hint}>{t.settings.reportResolutionHint}</Text>
      {([6, 7, 8] as const).map(r => (
        <TouchableOpacity key={r} style={[s.option, resolution === r && s.optionSelected]} onPress={() => void setResolution(r)}>
          <Text style={[s.optionText, resolution === r && s.optionTextSelected]}>
            {r === 6 ? 'Grob (~86 km²)' : r === 7 ? 'Standard (~5 km²)' : 'Fein (~0.7 km²)'}
          </Text>
        </TouchableOpacity>
      ))}

      <View style={s.toggleRow}>
        <View style={{ flex: 1 }}>
          <Text style={s.toggleLabel}>{t.settings.persistEvidence}</Text>
          <Text style={s.hint}>{t.settings.persistEvidenceHint}</Text>
        </View>
        <Switch value={persistEvidence} onValueChange={v => void setPersistEvidence(v)} trackColor={{ true: '#3b82f6' }} />
      </View>

      <Text style={[s.hint, { marginTop: 24 }]}>{t.report.legalDisclaimer}</Text>
    </ScrollView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  fill: { flex: 1, backgroundColor: '#0f172a' },
  container: { padding: 16, paddingBottom: 40 },
  center: { flex: 1, backgroundColor: '#0f172a', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 },
  h1: { fontSize: 20, fontWeight: '500', color: '#f1f5f9', marginBottom: 6 },
  h2: { fontSize: 18, fontWeight: '500', color: '#f1f5f9' },
  subtitle: { fontSize: 12, color: '#64748b', lineHeight: 18, marginBottom: 20 },
  muted: { color: '#64748b', fontSize: 13, textAlign: 'center' },
  stepLabel: { fontSize: 14, fontWeight: '500', color: '#cbd5e1', marginBottom: 12, marginTop: 8 },
  sectionLabel: { fontSize: 12, fontWeight: '500', color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8, marginTop: 20 },
  groupHeading: { fontSize: 11, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6, marginTop: 4, paddingHorizontal: 2 },
  option: { backgroundColor: '#1e293b', borderWidth: 1, borderColor: '#334155', borderRadius: 10, padding: 14, marginBottom: 8 },
  optionSelected: { borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.1)' },
  optionText: { color: '#94a3b8', fontSize: 13 },
  optionTextSelected: { color: '#93c5fd' },
  searchInput: { backgroundColor: '#1e293b', borderWidth: 1, borderColor: '#334155', borderRadius: 10, padding: 12, color: '#e2e8f0', fontSize: 13, marginBottom: 12 },
  groupGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  groupTile: { width: '47%', minHeight: 64, backgroundColor: '#1e293b', borderWidth: 1, borderColor: '#334155', borderRadius: 12, alignItems: 'center', justifyContent: 'center', padding: 10, gap: 4 },
  groupTileActive: { borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.1)' },
  groupIcon: { fontSize: 22 },
  groupLabel: { color: '#94a3b8', fontSize: 11, textAlign: 'center' },
  groupLabelActive: { color: '#93c5fd' },
  unknownBtn: { marginTop: 4, padding: 10, alignItems: 'center' },
  unknownBtnText: { color: '#475569', fontSize: 12 },
  textInput: { backgroundColor: '#1e293b', borderWidth: 1, borderColor: '#334155', borderRadius: 10, padding: 12, color: '#e2e8f0', fontSize: 13, minHeight: 100, textAlignVertical: 'top', marginBottom: 8 },
  hint: { color: '#475569', fontSize: 11, lineHeight: 16, marginBottom: 12 },
  disclaimer: { color: '#475569', fontSize: 11, lineHeight: 16, marginVertical: 12, backgroundColor: '#1e293b', borderRadius: 10, padding: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, backgroundColor: '#1e293b', borderRadius: 8, marginBottom: 6 },
  rowLabel: { color: '#64748b', fontSize: 12 },
  rowValue: { color: '#e2e8f0', fontSize: 12, flex: 1, textAlign: 'right' },
  btn: { backgroundColor: '#3b82f6', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 8 },
  btnDisabled: { backgroundColor: '#1e293b' },
  btnText: { color: '#fff', fontSize: 15, fontWeight: '500' },
  backBtn: { marginTop: 16, alignItems: 'center', padding: 12 },
  backBtnText: { color: '#64748b', fontSize: 14 },
  successIcon: { fontSize: 48, color: '#22c55e' },
  accordion: { backgroundColor: '#1e293b', borderRadius: 12, marginBottom: 8, overflow: 'hidden' },
  accordionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  accordionTitle: { color: '#e2e8f0', fontSize: 14, fontWeight: '500', flex: 1 },
  accordionChevron: { color: '#64748b', fontSize: 10 },
  accordionBody: { padding: 16, paddingTop: 0, borderTopWidth: 1, borderTopColor: '#334155' },
  accordionSummary: { color: '#94a3b8', fontSize: 13, lineHeight: 20, marginBottom: 12 },
  bulletRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  bullet: { color: '#3b82f6', fontSize: 12, marginTop: 2 },
  bulletText: { color: '#64748b', fontSize: 12, lineHeight: 18, flex: 1 },
  localeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 },
  localeTile: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 8, paddingHorizontal: 10, borderWidth: 1, borderColor: '#334155', borderRadius: 10 },
  localeTileActive: { borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.1)' },
  localeFlag: { fontSize: 16 },
  localeLabel: { color: '#64748b', fontSize: 12 },
  localeLabelActive: { color: '#93c5fd' },
  toggleRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#1e293b', borderRadius: 12, padding: 14, marginTop: 8 },
  toggleLabel: { color: '#e2e8f0', fontSize: 14, fontWeight: '500' },
});
