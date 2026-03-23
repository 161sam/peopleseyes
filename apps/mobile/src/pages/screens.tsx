/**
 * Mobile-Screens: ReportScreen, RightsScreen, SettingsScreen.
 *
 * Business-Logik identisch mit Web (via shared core-* packages).
 * UI verwendet React Native-Primitives statt HTML/Tailwind.
 */

import React, { useState, useEffect } from 'react';
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
import { createReport } from '@peopleseyes/core-logic';
import { getTranslations } from '@peopleseyes/core-i18n';
import { useNativeReports } from '../hooks/useNativeReports.js';
import { useNativeLocation } from '../hooks/useNativeLocation.js';

// Einstellungen lokal (expo-secure-store in Phase 4 für sensitive Daten)
import AsyncStorage from '@react-native-async-storage/async-storage';

function useSettings() {
  const [locale, setLocaleState] = useState<SupportedLocale>('de');
  const [resolution, setResolutionState] = useState<6 | 7 | 8>(7);
  const [loaded, setLoaded] = useState(false);

  // BUG-04 fix: Einstellungen beim Mount aus AsyncStorage laden
  useEffect(() => {
    const load = async () => {
      try {
        const [storedLocale, storedResolution] = await Promise.all([
          AsyncStorage.getItem('pe:locale'),
          AsyncStorage.getItem('pe:resolution'),
        ]);
        if (storedLocale) setLocaleState(storedLocale as SupportedLocale);
        if (storedResolution) {
          const r = Number(storedResolution) as 6 | 7 | 8;
          if (r === 6 || r === 7 || r === 8) setResolutionState(r);
        }
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

  return { locale, resolution, setLocale, setResolution, loaded };
}

// ─── ReportScreen ─────────────────────────────────────────────────────────────

type Step = 'authority' | 'activity' | 'confidence' | 'description' | 'confirm' | 'success';

export const ReportScreen: React.FC = () => {
  const t = getTranslations('de');
  const { addReport } = useNativeReports();
  const { rawCoords } = useNativeLocation();
  const [step, setStep] = useState<Step>('authority');
  const [authority, setAuthority] = useState<AuthorityCategory | null>(null);
  const [activity, setActivity] = useState<ObservedActivityType | null>(null);
  const [confidence, setConfidence] = useState<ObservationConfidence | null>(null);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!authority || !activity || !confidence) return;
    setIsSubmitting(true);
    try {
      const draft = {
        lat: rawCoords?.lat ?? 51.3,
        lng: rawCoords?.lng ?? 10.0,
        authorityCategory: authority,
        authorityVisibility: AuthorityVisibility.EindeutigErkennbar,
        activityType: activity,
        confidence,
        ...(description.trim() ? { description: description.trim() } : {}),
        resolution: H3Resolution.Viertel,
      };
      const report = createReport(draft);
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
        <TouchableOpacity style={s.btn} onPress={() => { setStep('authority'); setAuthority(null); setActivity(null); setConfidence(null); setDescription(''); }}>
          <Text style={s.btnText}>Neue Meldung</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const options = <T extends string>(
    vals: T[],
    labels: Record<T, string>,
    selected: T | null,
    onSelect: (v: T) => void,
  ) => vals.map(v => (
    <TouchableOpacity key={v} style={[s.option, selected === v && s.optionSelected]} onPress={() => onSelect(v)}>
      <Text style={[s.optionText, selected === v && s.optionTextSelected]}>{labels[v]}</Text>
    </TouchableOpacity>
  ));

  return (
    <ScrollView style={s.fill} contentContainerStyle={s.container}>
      <Text style={s.h1}>{t.report.title}</Text>
      <Text style={s.subtitle}>{t.report.subtitle}</Text>

      {step === 'authority' && (
        <>
          <Text style={s.stepLabel}>{t.report.step.authority}</Text>
          {options(Object.values(AuthorityCategory), t.authority, authority, v => { setAuthority(v); setStep('activity'); })}
        </>
      )}
      {step === 'activity' && (
        <>
          <Text style={s.stepLabel}>{t.report.step.activity}</Text>
          {options(Object.values(ObservedActivityType), t.activity, activity, v => { setActivity(v); setStep('confidence'); })}
        </>
      )}
      {step === 'confidence' && (
        <>
          <Text style={s.stepLabel}>{t.report.step.confidence}</Text>
          {options(Object.values(ObservationConfidence), t.confidence, confidence, v => { setConfidence(v); setStep('description'); })}
        </>
      )}
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
          <TouchableOpacity style={s.btn} onPress={() => setStep('confirm')}>
            <Text style={s.btnText}>{t.common.next}</Text>
          </TouchableOpacity>
        </>
      )}
      {step === 'confirm' && (
        <>
          <Text style={s.stepLabel}>{t.report.step.confirm}</Text>
          {authority && <View style={s.row}><Text style={s.rowLabel}>{t.report.authorityLabel}</Text><Text style={s.rowValue}>{t.authority[authority]}</Text></View>}
          {activity && <View style={s.row}><Text style={s.rowLabel}>{t.report.activityLabel}</Text><Text style={s.rowValue}>{t.activity[activity]}</Text></View>}
          {confidence && <View style={s.row}><Text style={s.rowLabel}>{t.report.confidenceLabel}</Text><Text style={s.rowValue}>{t.confidence[confidence]}</Text></View>}
          <Text style={s.disclaimer}>{t.report.legalDisclaimer}</Text>
          <TouchableOpacity style={[s.btn, isSubmitting && s.btnDisabled]} onPress={handleSubmit} disabled={isSubmitting}>
            <Text style={s.btnText}>{isSubmitting ? t.common.loading : t.report.submitButton}</Text>
          </TouchableOpacity>
        </>
      )}

      {step !== 'authority' && (
        <TouchableOpacity style={s.backBtn} onPress={() => {
          const steps: Step[] = ['authority', 'activity', 'confidence', 'description', 'confirm'];
          const idx = steps.indexOf(step);
          if (idx > 0) setStep(steps[idx - 1]!);
        }}>
          <Text style={s.backBtnText}>{t.common.back}</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

// ─── RightsScreen ─────────────────────────────────────────────────────────────

export const RightsScreen: React.FC = () => {
  const t = getTranslations('de');
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

export const SettingsScreen: React.FC = () => {
  const t = getTranslations('de');
  const { locale, resolution, setLocale, setResolution } = useSettings();
  const [persistEvidence, setPersistEvidence] = useState(false);

  return (
    <ScrollView style={s.fill} contentContainerStyle={s.container}>
      <Text style={s.h1}>{t.settings.title}</Text>

      <Text style={s.sectionLabel}>{t.settings.language}</Text>
      <View style={s.segmented}>
        {(['de', 'en'] as SupportedLocale[]).map(l => (
          <TouchableOpacity key={l} style={[s.segment, locale === l && s.segmentActive]} onPress={() => void setLocale(l)}>
            <Text style={[s.segmentText, locale === l && s.segmentTextActive]}>{l === 'de' ? 'Deutsch' : 'English'}</Text>
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
        <Switch value={persistEvidence} onValueChange={setPersistEvidence} trackColor={{ true: '#3b82f6' }} />
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
  option: { backgroundColor: '#1e293b', borderWidth: 1, borderColor: '#334155', borderRadius: 10, padding: 14, marginBottom: 8 },
  optionSelected: { borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.1)' },
  optionText: { color: '#94a3b8', fontSize: 13 },
  optionTextSelected: { color: '#93c5fd' },
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
  segmented: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  segment: { flex: 1, padding: 12, borderWidth: 1, borderColor: '#334155', borderRadius: 10, alignItems: 'center' },
  segmentActive: { borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.1)' },
  segmentText: { color: '#64748b', fontSize: 13 },
  segmentTextActive: { color: '#93c5fd' },
  toggleRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#1e293b', borderRadius: 12, padding: 14, marginTop: 8 },
  toggleLabel: { color: '#e2e8f0', fontSize: 14, fontWeight: '500' },
});
