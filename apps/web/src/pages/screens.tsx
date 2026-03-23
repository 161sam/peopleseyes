import React, { useState } from 'react';
import { H3Resolution } from '@peopleseyes/core-model';
import type { SupportedLocale } from '@peopleseyes/core-model';
import { isRtlLocale } from '@peopleseyes/core-i18n';
import { useUserSettings } from '../hooks/useUserSettings.js';
import { useI18n } from '../hooks/useI18n.js';

// ─── RightsScreen ─────────────────────────────────────────────────────────────

export const RightsScreen: React.FC = () => {
  const { settings } = useUserSettings();
  const { t } = useI18n(settings.locale);
  const topics = t.rights.topics;
  const [open, setOpen] = useState<string | null>(null);
  const isRtl = isRtlLocale(settings.locale);

  const topicList = [
    { key: 'identityControl', data: topics.identityControl },
    { key: 'search', data: topics.search },
    { key: 'arrest', data: topics.arrest },
    { key: 'recording', data: topics.recording },
    { key: 'silence', data: topics.silence },
  ] as const;

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="px-4 pt-6 pb-8 max-w-lg mx-auto space-y-3">
      <h1 className="text-lg font-medium text-slate-100 mb-1">{t.rights.title}</h1>
      <p className="text-xs text-slate-500 leading-relaxed mb-4">{t.rights.disclaimer}</p>

      {topicList.map(({ key, data }) => (
        <div key={key} className="bg-slate-800 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === key ? null : key)}
            className="w-full flex items-center justify-between px-4 py-4 text-left"
          >
            <span className="text-sm font-medium text-slate-200">{data.title}</span>
            <span className={`text-slate-400 transition-transform text-xs ${open === key ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {open === key && (
            <div className="px-4 pb-4 space-y-3 border-t border-slate-700">
              <p className="text-sm text-slate-300 pt-3 leading-relaxed">{data.summary}</p>
              <ul className="space-y-2">
                {data.keyPoints.map((point, i) => (
                  <li key={i} className="flex gap-2 text-xs text-slate-400 leading-relaxed">
                    <span className="text-blue-400 flex-shrink-0 mt-0.5">→</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ─── EvidenceScreen (Stub – Phase 3 nativ) ───────────────────────────────────

export const EvidenceScreen: React.FC = () => {
  const { settings } = useUserSettings();
  const { t } = useI18n(settings.locale);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-slate-400 px-8 text-center">
      <span className="text-4xl">🎥</span>
      <div>
        <p className="text-sm font-medium text-slate-300 mb-1">{t.evidence.title}</p>
        <p className="text-xs text-slate-500">{t.evidence.empty}</p>
      </div>
      <p className="text-xs text-slate-600 bg-slate-800 rounded-lg px-4 py-3 leading-relaxed">
        {t.evidence.exifWarning}
      </p>
      <p className="text-xs text-slate-700">Kamera-Integration – Mobile App (Phase 3)</p>
    </div>
  );
};

// ─── SettingsScreen ───────────────────────────────────────────────────────────

const LOCALES: Array<{ value: SupportedLocale; label: string; flag: string }> = [
  { value: 'de', label: 'Deutsch',    flag: '🇩🇪' },
  { value: 'en', label: 'English',    flag: '🇬🇧' },
  { value: 'tr', label: 'Türkçe',     flag: '🇹🇷' },
  { value: 'uk', label: 'Українська', flag: '🇺🇦' },
  { value: 'ar', label: 'العربية',    flag: '🇸🇦' },
  { value: 'fa', label: 'فارسی',      flag: '🇮🇷' },
];

const RESOLUTION_OPTIONS: Array<{ value: number; labelDe: string }> = [
  { value: H3Resolution.Stadt,       labelDe: 'Grob (~86 km²)' },
  { value: H3Resolution.Viertel,     labelDe: 'Standard (~5 km²)' },
  { value: H3Resolution.Strassenzug, labelDe: 'Fein (~0.7 km²)' },
];

export const SettingsScreen: React.FC = () => {
  const { settings, updateSettings } = useUserSettings();
  const { t } = useI18n(settings.locale);
  const isRtl = isRtlLocale(settings.locale);

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="px-4 pt-6 pb-8 max-w-lg mx-auto space-y-6">
      <h1 className="text-lg font-medium text-slate-100">{t.settings.title}</h1>

      {/* Sprache */}
      <section className="space-y-2">
        <label className="text-sm font-medium text-slate-300">{t.settings.language}</label>
        <div className="grid grid-cols-3 gap-2">
          {LOCALES.map(({ value, label, flag }) => (
            <button
              key={value}
              onClick={() => updateSettings({ locale: value })}
              className={`flex items-center gap-2 py-2.5 px-3 rounded-lg text-sm border transition-colors ${
                settings.locale === value
                  ? 'border-blue-500 bg-blue-500/10 text-blue-300'
                  : 'border-slate-700 text-slate-400 hover:border-slate-500'
              }`}
            >
              <span>{flag}</span>
              <span className="text-xs">{label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Meldungs-Genauigkeit */}
      <section className="space-y-2">
        <label className="text-sm font-medium text-slate-300">{t.settings.reportResolution}</label>
        <p className="text-xs text-slate-500">{t.settings.reportResolutionHint}</p>
        <div className="space-y-2">
          {RESOLUTION_OPTIONS.map(({ value, labelDe }) => (
            <button
              key={value}
              onClick={() => updateSettings({ reportResolution: value as 6 | 7 | 8 })}
              className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors ${
                settings.reportResolution === value
                  ? 'border-blue-500 bg-blue-500/10 text-blue-300'
                  : 'border-slate-700 text-slate-400 hover:border-slate-500'
              }`}
            >
              {labelDe}
            </button>
          ))}
        </div>
      </section>

      {/* Beweise persistieren */}
      <section className="bg-slate-800 rounded-xl p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-200">{t.settings.persistEvidence}</span>
          <button
            role="switch"
            aria-checked={settings.persistEvidence}
            onClick={() => updateSettings({ persistEvidence: !settings.persistEvidence })}
            className={`relative w-10 h-6 rounded-full transition-colors ${
              settings.persistEvidence ? 'bg-blue-600' : 'bg-slate-600'
            }`}
          >
            <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${settings.persistEvidence ? 'translate-x-4' : ''}`} />
          </button>
        </div>
        <p className="text-xs text-slate-500">{t.settings.persistEvidenceHint}</p>
      </section>

      {/* About */}
      <section className="space-y-3 pt-2">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{t.settings.about}</p>
        <a
          href="https://github.com/org/peopleseyes"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-4 py-3 bg-slate-800 rounded-xl text-sm text-slate-300 hover:text-slate-100"
        >
          {t.settings.sourceCode}
          <span className="text-slate-600">↗</span>
        </a>
        <div className="px-4 py-3 bg-slate-800 rounded-xl text-xs text-slate-500 leading-relaxed">
          {t.report.legalDisclaimer}
        </div>
      </section>
    </div>
  );
};

