/**
 * Kiosk-Report-Screen – nur aktiv wenn allowReporting=true im Profil.
 * Nutzt denselben Formular-Flow wie apps/web, aber ohne cross-app Import.
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

interface KioskReportScreenProps {
  onSubmitSuccess: () => void;
}

const KioskReportScreen: React.FC<KioskReportScreenProps> = ({ onSubmitSuccess }) => {
  const { profile } = useKioskProfile();
  const locale = profile?.locale ?? 'de';
  const t = getTranslations(locale);
  const [authority, setAuthority] = useState<AuthorityCategory | null>(null);
  const [activity, setActivity] = useState<ObservedActivityType | null>(null);
  const [confidence, setConfidence] = useState<ObservationConfidence | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!profile?.allowReporting) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500 px-8 text-center">
        <p className="text-sm">Melden ist für dieses Terminal deaktiviert.</p>
      </div>
    );
  }

  const handleSubmit = () => {
    if (!authority || !activity || !confidence) return;
    // Kiosk meldet ohne Standort – Mittelpunkt Deutschland als Fallback
    createReport({
      lat: 51.3, lng: 10.0,
      authorityCategory: authority,
      authorityVisibility: AuthorityVisibility.Unklar,
      activityType: activity,
      confidence,
      resolution: H3Resolution.Stadt, // Bewusst grob auf Kiosk
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center px-8">
        <span className="text-5xl">✓</span>
        <p className="text-slate-300 text-sm">{t.report.successMessage}</p>
        <button
          onClick={() => { setAuthority(null); setActivity(null); setConfidence(null); setSubmitted(false); onSubmitSuccess(); }}
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
      {authority && !activity && (
        <>
          <p className="text-sm font-medium text-slate-300">{t.report.step.activity}</p>
          {Object.values(ObservedActivityType).map(a => <OptionBtn key={a} value={a} label={t.activity[a]} selected={false} onSelect={setActivity} />)}
        </>
      )}
      {authority && activity && !confidence && (
        <>
          <p className="text-sm font-medium text-slate-300">{t.report.step.confidence}</p>
          {Object.values(ObservationConfidence).map(c => <OptionBtn key={c} value={c} label={t.confidence[c]} selected={false} onSelect={setConfidence} />)}
        </>
      )}
      {authority && activity && confidence && (
        <>
          <p className="text-sm text-slate-500 leading-relaxed">{t.report.legalDisclaimer}</p>
          <button onClick={handleSubmit} className="w-full py-4 bg-blue-600 text-white rounded-xl text-sm font-medium">
            {t.report.submitButton}
          </button>
        </>
      )}
    </div>
  );
};

export default KioskReportScreen;
