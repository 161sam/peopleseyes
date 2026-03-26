/**
 * Report-Screen – neuer 7-Schritt-Formular für anonyme Meldungen.
 *
 * Schritt-Reihenfolge: context → activity → authority → confidence → timing → description → confirm
 *
 * Fehler 2 fix: empfängt geoProps von App.tsx statt eigenen useGeolocation-Hook
 *               zu instanziieren (verhindert doppelten GPS-Watcher).
 * GPS-Guard: blockiert Submit wenn rawCoords === null, zeigt t.report.gpsUnavailable.
 */
import React, { useState } from 'react';
import {
  AuthorityCategory,
  AuthorityVisibility,
  ObservedActivityType,
  ObservationConfidence,
  H3Resolution,
} from '@peopleseyes/core-model';
import { createReport, ACTIVITY_TO_AUTHORITY_HINTS } from '@peopleseyes/core-logic';
import { useReports } from '../hooks/useReports.js';
import { useUserSettings } from '../hooks/useUserSettings.js';
import { useI18n } from '../hooks/useI18n.js';
import { AuthorityPicker } from '../components/AuthorityPicker.js';
import ActivityGrid from '../components/ActivityGrid.js';
import type { GeoProps, ReportPrefill } from '../App.js';

interface ReportScreenProps {
  geoProps: GeoProps;
  prefill?: ReportPrefill | null;
  onSubmitSuccess: (toastMessage: string) => void;
}

type Step = 'context' | 'activity' | 'authority' | 'confidence' | 'timing' | 'description' | 'confirm';

const ALL_STEPS: Step[] = ['context', 'activity', 'authority', 'confidence', 'timing', 'description', 'confirm'];

interface FormState {
  authority: AuthorityCategory | null;
  visibility: AuthorityVisibility | null;
  activity: ObservedActivityType | null;
  confidence: ObservationConfidence | null;
  description: string;
  timingOffsetMinutes: 0 | 15 | 60;
}

const INITIAL_FORM: FormState = {
  authority: null,
  visibility: null,
  activity: null,
  confidence: null,
  description: '',
  timingOffsetMinutes: 0,
};

function buildSteps(prefill?: ReportPrefill | null): Step[] {
  const skip = new Set<Step>();
  if (prefill?.reporterContext === 'affected') {
    skip.add('context');
    skip.add('confidence');
  }
  if (prefill?.activity) skip.add('activity');
  if (prefill?.activity && prefill?.authority) skip.add('authority');
  return ALL_STEPS.filter(s => !skip.has(s));
}

function buildInitialForm(prefill?: ReportPrefill | null): FormState {
  return {
    ...INITIAL_FORM,
    authority: prefill?.authority ?? null,
    activity: prefill?.activity ?? null,
    confidence: prefill?.reporterContext === 'affected' ? ObservationConfidence.Direkt : null,
    visibility: prefill?.reporterContext === 'affected' ? AuthorityVisibility.EindeutigErkennbar : null,
  };
}

const AUTHORITY_ICONS: Partial<Record<AuthorityCategory, string>> = {
  [AuthorityCategory.BundespolizeiBahn]:    '🚔',
  [AuthorityCategory.BundespolizeiFlughafen]: '🚔',
  [AuthorityCategory.BundespolizeiGrenze]:  '🚔',
  [AuthorityCategory.BundespolizeiMobil]:   '🚔',
  [AuthorityCategory.LandespolizeiSchwerpunktkontrolle]: '🏛️',
  [AuthorityCategory.LandespolizeiRazzia]:  '🏛️',
  [AuthorityCategory.LandespolizeiAllgemein]: '🏛️',
  [AuthorityCategory.AuslaenderbehördeUnterkuenfte]: '📋',
  [AuthorityCategory.AuslaenderbehördeVorführung]:   '📋',
  [AuthorityCategory.AuslaenderbehördeAbschiebung]:  '📋',
  [AuthorityCategory.FrontexPatrouille]:    '🇪🇺',
  [AuthorityCategory.FrontexOperation]:     '🇪🇺',
  [AuthorityCategory.GemeinsameBundLand]:   '🇪🇺',
  [AuthorityCategory.GemeinsameMitFrontex]: '🇪🇺',
  [AuthorityCategory.Unbekannt]:            '❓',
};

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

const ReportScreen: React.FC<ReportScreenProps> = ({ geoProps, prefill, onSubmitSuccess }) => {
  const [activeSteps, setActiveSteps] = useState<Step[]>(() => buildSteps(prefill));
  const [step, setStep] = useState<Step>(buildSteps(prefill)[0] ?? 'context');
  const [form, setForm] = useState<FormState>(() => buildInitialForm(prefill));
  const [showAllAuthorities, setShowAllAuthorities] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { settings } = useUserSettings();
  const { t } = useI18n(settings.locale);
  const { rawCoords, geoError } = geoProps;
  const { addReport } = useReports();

  const currentIdx = activeSteps.indexOf(step);

  const goNext = () => {
    if (currentIdx < activeSteps.length - 1) setStep(activeSteps[currentIdx + 1]!);
  };

  const goBack = () => {
    if (currentIdx > 0) setStep(activeSteps[currentIdx - 1]!);
  };

  const isNextDisabled = step === 'confidence' && (!form.confidence || !form.visibility);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleContextSelect = (ctx: 'affected' | 'witness') => {
    if (ctx === 'affected') {
      setForm(f => ({
        ...f,
        confidence: ObservationConfidence.Direkt,
        visibility: AuthorityVisibility.EindeutigErkennbar,
      }));
      setActiveSteps(prev => prev.filter(s => s !== 'confidence'));
    }
    goNext();
  };

  const handleActivitySelect = (activity: ObservedActivityType) => {
    setForm(f => ({ ...f, activity }));
    setShowAllAuthorities(false);
    // auto-advance
    const idx = activeSteps.indexOf(step);
    if (idx < activeSteps.length - 1) setStep(activeSteps[idx + 1]!);
  };

  const handleAuthoritySelect = (authority: AuthorityCategory) => {
    setForm(f => ({ ...f, authority }));
    // auto-advance
    const idx = activeSteps.indexOf(step);
    if (idx < activeSteps.length - 1) setStep(activeSteps[idx + 1]!);
  };

  const handleConfidenceSelect = (
    confidence: ObservationConfidence,
    visibility: AuthorityVisibility,
  ) => {
    setForm(f => ({ ...f, confidence, visibility }));
  };

  const handleSubmit = async () => {
    if (!form.authority || !form.visibility || !form.activity || !form.confidence) return;
    if (!rawCoords) {
      setSubmitError(t.report.gpsUnavailable);
      return;
    }
    const { lat, lng } = rawCoords;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const nowMs = Date.now() - form.timingOffsetMinutes * 60_000;
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
      const report = createReport(draft, nowMs);
      await addReport(report);
      onSubmitSuccess(t.report.successMessage);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Fehler beim Senden');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  const hintAuthorities = form.activity ? ACTIVITY_TO_AUTHORITY_HINTS[form.activity] : [];

  return (
    <div className="flex flex-col min-h-full px-4 pt-6 pb-4 max-w-lg mx-auto">
      <div className="mb-4">
        <h1 className="text-lg font-medium text-slate-100">{t.report.title}</h1>
        <p className="text-xs text-slate-500 mt-1">{t.report.subtitle}</p>
      </div>

      <StepIndicator current={currentIdx} total={activeSteps.length} />

      <div className="flex-1 space-y-2">

        {/* Schritt: context */}
        {step === 'context' && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-300 mb-3">{t.report.stepContext}</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleContextSelect('affected')}
                className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl border border-slate-700 bg-slate-800/50 hover:border-blue-500 hover:bg-blue-500/10 transition-colors text-center min-h-[120px]"
              >
                <span className="text-3xl">🙋</span>
                <div>
                  <p className="text-sm font-medium text-slate-200">{t.report.contextAffected}</p>
                  <p className="text-xs text-slate-500 mt-1">{t.report.contextAffectedSub}</p>
                </div>
              </button>
              <button
                onClick={() => handleContextSelect('witness')}
                className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl border border-slate-700 bg-slate-800/50 hover:border-blue-500 hover:bg-blue-500/10 transition-colors text-center min-h-[120px]"
              >
                <span className="text-3xl">👁</span>
                <div>
                  <p className="text-sm font-medium text-slate-200">{t.report.contextWitness}</p>
                  <p className="text-xs text-slate-500 mt-1">{t.report.contextWitnessSub}</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Schritt: activity */}
        {step === 'activity' && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-300 mb-1">{t.report.stepActivity}</p>
            <p className="text-xs text-slate-500 mb-3">{t.report.stepActivitySub}</p>
            <ActivityGrid
              selected={form.activity}
              onSelect={handleActivitySelect}
              t={t}
              autoAdvance
            />
          </div>
        )}

        {/* Schritt: authority */}
        {step === 'authority' && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-300 mb-3">{t.report.stepAuthority}</p>

            {!showAllAuthorities ? (
              <>
                {/* Hint prefix */}
                {hintAuthorities.length > 0 && form.activity && (
                  <p className="text-xs text-slate-500 px-1">
                    {t.report.authorityHintPrefix.replace('{activity}', t.activity[form.activity])}
                  </p>
                )}

                {/* Priorisierte Behörden */}
                <div className="space-y-2">
                  {hintAuthorities
                    .filter(cat => cat !== AuthorityCategory.Unbekannt)
                    .map(cat => (
                      <button
                        key={cat}
                        onClick={() => handleAuthoritySelect(cat)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border text-sm transition-colors ${
                          form.authority === cat
                            ? 'border-blue-500 bg-blue-500/10 text-blue-300'
                            : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        <span className="text-lg leading-none flex-shrink-0">
                          {AUTHORITY_ICONS[cat] ?? '🏛️'}
                        </span>
                        <span className="text-left">{t.authority[cat]}</span>
                      </button>
                    ))}
                </div>

                {/* Unbekannt — immer sichtbar */}
                <button
                  onClick={() => handleAuthoritySelect(AuthorityCategory.Unbekannt)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border text-sm transition-colors ${
                    form.authority === AuthorityCategory.Unbekannt
                      ? 'border-blue-500 bg-blue-500/10 text-blue-300'
                      : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <span className="text-lg leading-none flex-shrink-0">❓</span>
                  <div className="text-left">
                    <p>{t.report.authorityUnknownLabel}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{t.report.authorityUnknownSub}</p>
                  </div>
                </button>

                {/* Alle anzeigen Link */}
                <button
                  onClick={() => setShowAllAuthorities(true)}
                  className="w-full text-xs text-blue-400 hover:text-blue-300 transition-colors py-2 text-center"
                >
                  {t.report.authorityShowAll}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowAllAuthorities(false)}
                  className="text-xs text-slate-400 hover:text-slate-200 transition-colors mb-2"
                >
                  ← Zurück zur Vorschlagsliste
                </button>
                <AuthorityPicker
                  selected={form.authority}
                  onSelect={handleAuthoritySelect}
                  t={t}
                />
              </>
            )}
          </div>
        )}

        {/* Schritt: confidence (kombiniert mit visibility) */}
        {step === 'confidence' && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-300 mb-3">{t.report.step.confidence}</p>
            {COMBINED_CONFIDENCE_OPTIONS.map(opt => {
              const isSelected = form.confidence === opt.confidence && form.visibility === opt.visibility;
              return (
                <button
                  key={`${opt.confidence}-${opt.visibility}`}
                  onClick={() => handleConfidenceSelect(opt.confidence, opt.visibility)}
                  className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors ${
                    isSelected
                      ? 'border-blue-500 bg-blue-500/10 text-blue-300'
                      : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Schritt: timing */}
        {step === 'timing' && (
          <div className="space-y-4">
            <p className="text-sm font-medium text-slate-300 mb-3">{t.report.stepTiming}</p>
            <div className="flex gap-2">
              {([0, 15, 60] as const).map(offset => {
                const label = offset === 0 ? t.report.timingNow : offset === 15 ? t.report.timing15 : t.report.timing60;
                return (
                  <button
                    key={offset}
                    onClick={() => setForm(f => ({ ...f, timingOffsetMinutes: offset }))}
                    className={`flex-1 py-2.5 px-3 rounded-full text-xs font-medium border transition-colors ${
                      form.timingOffsetMinutes === offset
                        ? 'border-blue-500 bg-blue-500/10 text-blue-300'
                        : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    {form.timingOffsetMinutes === offset && <span className="mr-1">●</span>}
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Schritt: description */}
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

        {/* Schritt: confirm */}
        {step === 'confirm' && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-300 mb-3">{t.report.step.confirm}</p>
            <div className="bg-slate-800 rounded-lg divide-y divide-slate-700 text-sm">
              {form.activity && (
                <div className="flex justify-between px-4 py-3 gap-4">
                  <span className="text-slate-400 flex-shrink-0">{t.report.activityLabel}</span>
                  <span className="text-slate-200 text-right text-xs">{t.activity[form.activity]}</span>
                </div>
              )}
              {form.authority && (
                <div className="flex justify-between px-4 py-3 gap-4">
                  <span className="text-slate-400 flex-shrink-0">{t.report.authorityLabel}</span>
                  <span className="text-slate-200 text-right text-xs">{t.authority[form.authority]}</span>
                </div>
              )}
              {form.confidence && (
                <div className="flex justify-between px-4 py-3 gap-4">
                  <span className="text-slate-400 flex-shrink-0">{t.report.confidenceLabel}</span>
                  <span className="text-slate-200 text-right text-xs">{t.confidence[form.confidence]}</span>
                </div>
              )}
              {form.timingOffsetMinutes > 0 && (
                <div className="flex justify-between px-4 py-3 gap-4">
                  <span className="text-slate-400 flex-shrink-0">{t.report.stepTiming}</span>
                  <span className="text-slate-200 text-right text-xs">
                    {form.timingOffsetMinutes === 15 ? t.report.timing15 : t.report.timing60}
                  </span>
                </div>
              )}
              {form.description && (
                <div className="px-4 py-3">
                  <p className="text-slate-400 mb-1">{t.report.descriptionLabel}</p>
                  <p className="text-slate-300 text-xs">{form.description}</p>
                </div>
              )}
            </div>

            {!rawCoords && (
              <p className="text-xs text-red-400 bg-red-500/10 rounded-lg px-3 py-2">
                {t.report.gpsUnavailable}
              </p>
            )}
            {rawCoords && geoError && (
              <p className="text-xs text-amber-400 bg-amber-500/10 rounded-lg px-3 py-2">
                ⚠ {geoError}
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

      {/* Navigation — context, activity, authority auto-advance; no Next button needed */}
      {step !== 'context' && step !== 'activity' && step !== 'authority' && (
        <div className="flex gap-3 mt-6">
          {currentIdx > 0 && (
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
              disabled={isSubmitting || !rawCoords}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg text-sm font-medium transition-colors"
            >
              {isSubmitting ? t.common.loading : t.report.submitButton}
            </button>
          )}
        </div>
      )}

      {/* Back button for auto-advance steps */}
      {(step === 'activity' || step === 'authority') && currentIdx > 0 && (
        <div className="mt-4">
          <button
            onClick={goBack}
            className="w-full py-2 text-sm text-slate-500 hover:text-slate-300 transition-colors"
          >
            {t.common.back}
          </button>
        </div>
      )}
    </div>
  );
};

export default ReportScreen;
