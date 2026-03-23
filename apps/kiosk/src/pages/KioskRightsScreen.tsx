/**
 * Kiosk-spezifischer Rights-Screen.
 * Importiert ausschließlich aus @peopleseyes/* workspace-Paketen.
 */
import React, { useState } from 'react';
import { getTranslations, isRtlLocale } from '@peopleseyes/core-i18n';
import { useKioskProfile } from '../hooks/useKioskProfile.js';

export const KioskRightsScreen: React.FC = () => {
  const { profile } = useKioskProfile();
  const locale = profile?.locale ?? 'de';
  const t = getTranslations(locale);
  const topics = t.rights.topics;
  const [open, setOpen] = useState<string | null>(null);
  const isRtl = isRtlLocale(locale);

  const topicList = [
    { key: 'identityControl', data: topics.identityControl },
    { key: 'search',          data: topics.search },
    { key: 'arrest',          data: topics.arrest },
    { key: 'recording',       data: topics.recording },
    { key: 'silence',         data: topics.silence },
  ] as const;

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="px-4 pt-6 pb-8 max-w-2xl mx-auto space-y-3">
      <h1 className="text-xl font-medium text-slate-100 mb-1">{t.rights.title}</h1>
      <p className="text-xs text-slate-500 leading-relaxed mb-4">{t.rights.disclaimer}</p>
      {topicList.map(({ key, data }) => (
        <div key={key} className="bg-slate-800 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === key ? null : key)}
            className="w-full flex items-center justify-between px-4 py-5 text-left"
          >
            <span className="text-base font-medium text-slate-200">{data.title}</span>
            <span className={`text-slate-400 text-xs transition-transform ${open === key ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {open === key && (
            <div className="px-4 pb-5 space-y-3 border-t border-slate-700">
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
