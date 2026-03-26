/**
 * Report-Screen – 6-Schritt-Formular für anonyme Meldungen.
 *
 * Fehler 2 fix: empfängt geoProps von App.tsx statt eigenen useGeolocation-Hook
 *               zu instanziieren (verhindert doppelten GPS-Watcher).
 * Fehler 3 fix: authorityVisibility ist jetzt ein eigener Schritt im Formular
 *               statt hardcodiert auf EindeutigErkennbar.
 */
import React, { useState } from 'react';
import {
  AuthorityVisibility,
  ObservedActivityType, ObservationConfidence, H3Resolution,
} from '@peopleseyes/core-model';
import type { AuthorityCategory } from '@peopleseyes/core-model';
import { createReport } from '@peopleseyes/core-logic';
import { useReports } from '../hooks/useReports.js';
import { useUserSettings } from '../hooks/useUserSettings.js';
import { useI18n } from '../hooks/useI18n.js';
import { AuthorityPicker } from '../components/AuthorityPicker.js';
import type { GeoProps, ReportPrefill } from '../App.js';

interface ReportScreenProps {
  geoProps: GeoProps;
  prefill?: ReportPrefill | null;
  onSubmitSuccess: () => void;
}

type Step = 'authority' | 'visibility' | 'activity' | 'confidence' | 'description' | 'confirm' | 'success';

interface FormState {
  authority: AuthorityCategory | null;
  visibility: AuthorityVisibility | null;
  activity: ObservedActivityType | null;
  confidence: ObservationConfidence | null;
  description: string;
}

const INITIAL_FORM: FormState = {
  authority: null,
  visibility: null,
  activity: null,
  confidence: null,
  description: '',
};

const STEPS: Step[] = ['authority', 'visibility', 'activity', 'confidence', 'description', 'confirm'];

/** Menschenlesbare Labels für AuthorityVisibility */
const VISIBILITY_LABELS: Record<AuthorityVisibility, string> = {
  [AuthorityVisibility.EindeutigErkennbar]: 'Eindeutig erkennbar (Uniform / Fahrzeug)',
  [AuthorityVisibility.Zivil]: 'Zivil gekleidet, aber identifizierbar',
  [AuthorityVisibility.Unklar]: 'Nicht sicher zuzuordnen',
};

/** Aktivitäten in Gruppen aufteilen für visuelle Darstellung */
const ACTIVITY_GROUPS = {
  control: [
    ObservedActivityType.Identitaetskontrolle,
    ObservedActivityType.StationaereKontrolle,
    ObservedActivityType.Fahrzeugkontrolle,
  ],
  operation: [
    ObservedActivityType.Patrouille,
    ObservedActivityType.Zugriff,
    ObservedActivityType.Transport,
    ObservedActivityType.DurchsuchungGebaeude,
    ObservedActivityType.Sonstiges,
  ],
} as const;

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-1.5 justify-center mb-6">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1 rounded-full transition-all duration-300 ${
            i < current ? 'w-8 bg-blue-500' : i === current ? 'w-8 bg-blue-400' : 'w-4 bg-slate-700'
          }`}
        />
      ))}
    </div>
  );
}

function OptionButton<T extends string>({
  value, label, selected, onSelect,
}: {
  value: T; label: string; selected: boolean; onSelect: (v: T) => void;
}) {
  return (
    <button
      onClick={() => onSelect(value)}
      className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors ${
        selected
          ? 'border-blue-500 bg-blue-500/10 text-blue-300'
          : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-500'
      }`}
    >
      {label}
    </button>
  );
}

const ReportScreen: React.FC<ReportScreenProps> = ({ geoProps, prefill, onSubmitSuccess }) => {
  const [step, setStep] = useState<Step>(
    prefill?.activity ? 'visibility'
    : prefill?.authority ? 'visibility'
    : 'authority',
  );
  const [form, setForm] = useState<FormState>({
    ...INITIAL_FORM,
    authority: prefill?.authority ?? null,
    activity: prefill?.activity ?? null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { settings } = useUserSettings();
  const { t } = useI18n(settings.locale);
  const { rawCoords, geoError } = geoProps;
  const { addReport } = useReports();

  const currentStepIndex = STEPS.indexOf(step as (typeof STEPS)[number]);

  const goNext = () => {
    const idx = STEPS.indexOf(step as (typeof STEPS)[number]);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1]!);
  };

  const goBack = () => {
    const idx = STEPS.indexOf(step as (typeof STEPS)[number]);
    if (idx > 0) setStep(STEPS[idx - 1]!);
  };

  const isNextDisabled =
    (step === 'authority' && !form.authority) ||
    (step === 'visibility' && !form.visibility) ||
    (step === 'activity' && !form.activity) ||
    (step === 'confidence' && !form.confidence);

  const handleSubmit = async () => {
    if (!form.authority || !form.visibility || !form.activity || !form.confidence) return;

    const lat = rawCoords?.lat ?? 51.3;
    const lng = rawCoords?.lng ?? 10.0;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const draft = {
        lat,
        lng,
        authorityCategory: form.authority,
        authorityVisibility: form.visibility,
        activityType: form.activity,
        confidence: form.confidence,
        ...(form.description.trim() ? { description: form.description.trim() } : {}),
        resolution: settings.reportResolution as H3Resolution,
      };
      const report = createReport(draft);
      await addReport(report);
      setStep('success');
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Fehler beim Senden');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 'success') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-3xl">
          ✓
        </div>
        <div>
          <h2 className="text-lg font-medium text-slate-100 mb-2">Meldung übermittelt</h2>
          <p className="text-sm text-slate-400">{t.report.successMessage}</p>
        </div>
        <button
          onClick={() => { setForm(INITIAL_FORM); setStep('authority'); onSubmitSuccess(); }}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Zur Karte
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full px-4 pt-6 pb-4 max-w-lg mx-auto">
      <div className="mb-4">
        <h1 className="text-lg font-medium text-slate-100">{t.report.title}</h1>
        <p className="text-xs text-slate-500 mt-1">{t.report.subtitle}</p>
      </div>

      <StepIndicator current={currentStepIndex} total={STEPS.length} />

      <div className="flex-1 space-y-2">

        {/* Schritt 1: Behörde – zweistufige Auswahl */}
        {step === 'authority' && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-300 mb-3">{t.report.step.authority}</p>
            <AuthorityPicker
              selected={form.authority}
              onSelect={v => setForm(f => ({ ...f, authority: v }))}
              t={t}
            />
          </div>
        )}

        {/* Schritt 2: Erkennbarkeit */}
        {step === 'visibility' && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-300 mb-3">Wie erkennbar war die Behörde?</p>
            {Object.values(AuthorityVisibility).map(vis => (
              <OptionButton
                key={vis}
                value={vis}
                label={VISIBILITY_LABELS[vis]}
                selected={form.visibility === vis}
                onSelect={v => setForm(f => ({ ...f, visibility: v }))}
              />
            ))}
          </div>
        )}

        {/* Schritt 3: Aktivität – mit visuellen Gruppen */}
        {step === 'activity' && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-300 mb-3">{t.report.step.activity}</p>

            <p className="text-xs text-slate-500 uppercase tracking-wide px-1 mt-2">
              {t.report.activityGroupControl}
            </p>
            {ACTIVITY_GROUPS.control.map(act => (
              <OptionButton
                key={act}
                value={act}
                label={t.activity[act]}
                selected={form.activity === act}
                onSelect={v => setForm(f => ({ ...f, activity: v }))}
              />
            ))}

            <p className="text-xs text-slate-500 uppercase tracking-wide px-1 mt-3">
              {t.report.activityGroupOperation}
            </p>
            {ACTIVITY_GROUPS.operation.map(act => (
              <OptionButton
                key={act}
                value={act}
                label={t.activity[act]}
                selected={form.activity === act}
                onSelect={v => setForm(f => ({ ...f, activity: v }))}
              />
            ))}
          </div>
        )}

        {/* Schritt 4: Confidence */}
        {step === 'confidence' && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-300 mb-3">{t.report.step.confidence}</p>
            {Object.values(ObservationConfidence).map(conf => (
              <OptionButton
                key={conf}
                value={conf}
                label={t.confidence[conf]}
                selected={form.confidence === conf}
                onSelect={v => setForm(f => ({ ...f, confidence: v }))}
              />
            ))}
          </div>
        )}

        {/* Schritt 5: Beschreibung */}
        {step === 'description' && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-300">{t.report.step.description}</p>
            <textarea
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value.slice(0, 280) }))}
              placeholder={t.report.descriptionPlaceholder}
              rows={4}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder-slate-500 resize-none focus:outline-none focus:border-blue-500"
            />
            <p className="text-xs text-slate-500">
              {form.description.length}/280 · {t.report.descriptionHint}
            </p>
          </div>
        )}

        {/* Schritt 6: Bestätigen */}
        {step === 'confirm' && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-300 mb-3">{t.report.step.confirm}</p>
            <div className="bg-slate-800 rounded-lg divide-y divide-slate-700 text-sm">
              {[
                { label: t.report.authorityLabel, value: form.authority ? t.authority[form.authority] : '' },
                { label: 'Erkennbarkeit', value: form.visibility ? VISIBILITY_LABELS[form.visibility] : '' },
                { label: t.report.activityLabel, value: form.activity ? t.activity[form.activity] : '' },
                { label: t.report.confidenceLabel, value: form.confidence ? t.confidence[form.confidence] : '' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between px-4 py-3 gap-4">
                  <span className="text-slate-400 flex-shrink-0">{label}</span>
                  <span className="text-slate-200 text-right text-xs">{value}</span>
                </div>
              ))}
              {form.description && (
                <div className="px-4 py-3">
                  <p className="text-slate-400 mb-1">{t.report.descriptionLabel}</p>
                  <p className="text-slate-300 text-xs">{form.description}</p>
                </div>
              )}
            </div>

            {geoError && (
              <p className="text-xs text-amber-400 bg-amber-500/10 rounded-lg px-3 py-2">
                ⚠ {geoError} – Meldung wird ohne exakten Standort übermittelt.
              </p>
            )}

            <p className="text-xs text-slate-500 leading-relaxed">{t.report.legalDisclaimer}</p>

            {submitError && (
              <p className="text-xs text-red-400 bg-red-500/10 rounded-lg px-3 py-2">
                {submitError}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-6">
        {currentStepIndex > 0 && (
          <button
            onClick={goBack}
            className="flex-1 py-3 border border-slate-700 text-slate-300 rounded-lg text-sm font-medium hover:border-slate-500 transition-colors"
          >
            {t.common.back}
          </button>
        )}

        {step !== 'confirm' ? (
          <button
            onClick={goNext}
            disabled={isNextDisabled}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            {t.common.next}
          </button>
        ) : (
          <button
            onClick={() => { void handleSubmit(); }}
            disabled={isSubmitting}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            {isSubmitting ? t.common.loading : t.report.submitButton}
          </button>
        )}
      </div>
    </div>
  );
};

export default ReportScreen;
