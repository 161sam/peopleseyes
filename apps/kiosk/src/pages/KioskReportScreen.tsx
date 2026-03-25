/**
 * Kiosk-Report-Screen – nur aktiv wenn allowReporting=true im Profil.
 *
 * CRIT-01 fix: Reports werden jetzt tatsächlich in IndexedDB gespeichert.
 * Fehler 3 fix: authorityVisibility ist jetzt ein eigener Schritt im Formular.
 */
import React, { useState } from 'react';
import {
  AuthorityCategory, AuthorityVisibility,
  ObservedActivityType, ObservationConfidence,
  H3Resolution,
} from '@peopleseyes/core-model';
import { createReport } from '@peopleseyes/core-logic';
import { getTranslations } from '@peopleseyes/core-i18n';
import { useKioskProfile } from '../hooks/useKioskProfile.js';
import { kioskReportStore } from '../services/kiosk-report-store.js';

interface KioskReportScreenProps {
  onSubmitSuccess: () => void;
}

const VISIBILITY_LABELS: Record<AuthorityVisibility, string> = {
  [AuthorityVisibility.EindeutigErkennbar]: 'Eindeutig erkennbar (Uniform / Fahrzeug)',
  [AuthorityVisibility.Zivil]: 'Zivil gekleidet, aber identifizierbar',
  [AuthorityVisibility.Unklar]: 'Nicht sicher zuzuordnen',
};

const KioskReportScreen: React.FC<KioskReportScreenProps> = ({ onSubmitSuccess }) => {
  const { profile } = useKioskProfile();
  const locale = profile?.locale ?? 'de';
  const t = getTranslations(locale);
  const [authority, setAuthority] = useState<AuthorityCategory | null>(null);
  const [visibility, setVisibility] = useState<AuthorityVisibility | null>(null);
  const [activity, setActivity] = useState<ObservedActivityType | null>(null);
  const [confidence, setConfidence] = useState<ObservationConfidence | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!profile?.allowReporting) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500 px-8 text-center">
        <p className="text-sm">Melden ist für dieses Terminal deaktiviert.</p>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!authority || !visibility || !activity || !confidence) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const report = createReport({
        lat: 51.3, lng: 10.0,
        authorityCategory: authority,
        authorityVisibility: visibility,
        activityType: activity,
        confidence,
        resolution: H3Resolution.Stadt, // Bewusst grob auf Kiosk
      });
      await kioskReportStore.init();
      await kioskReportStore.addReport(report);
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Fehler beim Melden');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center px-8">
        <span className="text-5xl">✓</span>
        <p className="text-slate-300 text-sm">{t.report.successMessage}</p>
        <button
          onClick={() => {
            setAuthority(null); setVisibility(null);
            setActivity(null); setConfidence(null);
            setSubmitted(false); onSubmitSuccess();
          }}
          className="px-8 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium"
        >
          Zurück
        </button>
      </div>
    );
  }

  const OptionBtn = <T extends string>({ value, label, selected, onSelect }: { value: T; label: string; selected: boolean; onSelect: (v: T) => void }) => (
    <button
      onClick={() => onSelect(value)}
      className={`w-full text-left px-4 py-4 rounded-xl border text-sm transition-colors ${selected ? 'border-blue-500 bg-blue-500/10 text-blue-300' : 'border-slate-700 bg-slate-800 text-slate-300'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="px-4 pt-6 pb-8 max-w-xl mx-auto space-y-4">
      <h1 className="text-xl font-medium text-slate-100">{t.report.title}</h1>
      <p className="text-xs text-slate-500">{t.report.subtitle}</p>

      {!authority && (
        <>
          <p className="text-sm font-medium text-slate-300">{t.report.step.authority}</p>
          {Object.values(AuthorityCategory).map(c => <OptionBtn key={c} value={c} label={t.authority[c]} selected={false} onSelect={setAuthority} />)}
        </>
      )}
      {authority && !visibility && (
        <>
          <p className="text-sm font-medium text-slate-300">Wie erkennbar war die Behörde?</p>
          {Object.values(AuthorityVisibility).map(v => <OptionBtn key={v} value={v} label={VISIBILITY_LABELS[v]} selected={false} onSelect={setVisibility} />)}
        </>
      )}
      {authority && visibility && !activity && (
        <>
          <p className="text-sm font-medium text-slate-300">{t.report.step.activity}</p>
          {Object.values(ObservedActivityType).map(a => <OptionBtn key={a} value={a} label={t.activity[a]} selected={false} onSelect={setActivity} />)}
        </>
      )}
      {authority && visibility && activity && !confidence && (
        <>
          <p className="text-sm font-medium text-slate-300">{t.report.step.confidence}</p>
          {Object.values(ObservationConfidence).map(c => <OptionBtn key={c} value={c} label={t.confidence[c]} selected={false} onSelect={setConfidence} />)}
        </>
      )}
      {authority && visibility && activity && confidence && (
        <>
          <p className="text-sm text-slate-500 leading-relaxed">{t.report.legalDisclaimer}</p>
          {submitError && (
            <p className="text-xs text-red-400 bg-red-900/20 rounded-lg px-3 py-2">{submitError}</p>
          )}
          <button
            onClick={() => { void handleSubmit(); }}
            disabled={isSubmitting}
            className={`w-full py-4 rounded-xl text-sm font-medium transition-colors ${
              isSubmitting
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            {isSubmitting ? t.common.loading : t.report.submitButton}
          </button>
        </>
      )}
    </div>
  );
};

export default KioskReportScreen;
