import React, { useState, useEffect } from 'react';
import { H3Resolution } from '@peopleseyes/core-model';
import type { SupportedLocale, Report } from '@peopleseyes/core-model';
import { localReportStore } from '../services/local-report-store.js';
import { generateCerfFeed } from '../services/cerf-feed-generator.js';
import { isRtlLocale } from '@peopleseyes/core-i18n';
import { useUserSettings } from '../hooks/useUserSettings.js';
import { useI18n } from '../hooks/useI18n.js';
import { usePanicWipe } from '../hooks/usePanicWipe.js';
import { useStorageKey, useChangePin } from '../App.js';
import PinChangeForm from '../components/PinChangeForm.js';
import { RightsSimulation } from '../components/RightsSimulation.js';
import { LegalChat } from '../components/LegalChat.js';
import { saveLegalApiKey, loadLegalApiKey, deleteLegalApiKey } from '../services/legal-assistant.js';

// ─── RightsScreen ─────────────────────────────────────────────────────────────

export const RightsScreen: React.FC = () => {
  const { settings } = useUserSettings();
  const { t } = useI18n(settings.locale);
  const topics = t.rights.topics;
  const [open, setOpen] = useState<string | null>(null);
  const [simulationActive, setSimulationActive] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const isRtl = isRtlLocale(settings.locale);

  const allTopics = [
    { key: 'identityControl', data: topics.identityControl },
    { key: 'search', data: topics.search },
    { key: 'arrest', data: topics.arrest },
    { key: 'recording', data: topics.recording },
    { key: 'silence', data: topics.silence },
  ] as const;

  const q = searchQuery.trim().toLowerCase();
  const topicList = q
    ? allTopics.filter(({ data }) =>
        data.title.toLowerCase().includes(q) ||
        data.summary.toLowerCase().includes(q) ||
        data.keyPoints.some(p => p.toLowerCase().includes(q)),
      )
    : allTopics;

  if (simulationActive) {
    return (
      <div dir={isRtl ? 'rtl' : 'ltr'}>
        <RightsSimulation
          t={t}
          onClose={() => setSimulationActive(false)}
        />
      </div>
    );
  }

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="px-4 pt-6 pb-8 max-w-lg mx-auto space-y-3">
      <h1 className="text-lg font-medium text-slate-100 mb-1">{t.rights.title}</h1>
      <p className="text-xs text-slate-500 leading-relaxed mb-4">{t.rights.disclaimer}</p>

      <input
        type="search"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Suchen…"
        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-blue-500"
      />

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

      {/* Situationen üben — Button */}
      <div className="mt-2">
        <button
          onClick={() => setSimulationActive(true)}
          className="w-full bg-blue-600/10 border border-blue-600/30 hover:bg-blue-600/20 rounded-xl px-4 py-4 text-left flex items-center justify-between transition-colors"
        >
          <div>
            <p className="text-sm font-medium text-blue-300">{t.simulations.title}</p>
            <p className="text-xs text-slate-500 mt-0.5">{t.simulations.subtitle}</p>
          </div>
          <span className="text-blue-400">→</span>
        </button>
      </div>

      {/* Floating Chat-Button */}
      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-24 right-4 w-12 h-12 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center text-xl shadow-lg transition-colors z-30"
        aria-label={t.legalChat.title}
      >
        💬
      </button>

      {/* LegalChat Sheet */}
      {chatOpen && (
        <LegalChat
          t={t}
          locale={settings.locale}
          activeRightsTopic={open ?? undefined}
          onClose={() => setChatOpen(false)}
        />
      )}
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
  { value: 'de', label: 'Deutsch',      flag: '🇩🇪' },
  { value: 'en', label: 'English',      flag: '🇬🇧' },
  { value: 'tr', label: 'Türkçe',       flag: '🇹🇷' },
  { value: 'uk', label: 'Українська',   flag: '🇺🇦' },
  { value: 'ar', label: 'العربية',      flag: '🇸🇦' },
  { value: 'fa', label: 'فارسی',        flag: '🇮🇷' },
  { value: 'fr', label: 'Français',     flag: '🇫🇷' },
  { value: 'es', label: 'Español',      flag: '🇪🇸' },
  { value: 'pl', label: 'Polski',       flag: '🇵🇱' },
  { value: 'ro', label: 'Română',       flag: '🇷🇴' },
  { value: 'sr', label: 'Srpski',       flag: '🇷🇸' },
  { value: 'sq', label: 'Shqip',        flag: '🇦🇱' },
  { value: 'bs', label: 'Bosanski',     flag: '🇧🇦' },
  { value: 'so', label: 'Soomaali',     flag: '🇸🇴' },
  { value: 'am', label: 'አማርኛ',         flag: '🇪🇹' },
  { value: 'ti', label: 'ትግርኛ',         flag: '🇪🇷' },
  { value: 'ps', label: 'پښتو',         flag: '🇦🇫' },
  { value: 'ku', label: 'Kurdî',        flag: '🏳' },
  { value: 'ru', label: 'Русский',      flag: '🇷🇺' },
  { value: 'sw', label: 'Kiswahili',    flag: '🇹🇿' },
];

const RESOLUTION_OPTIONS: Array<{ value: number; labelDe: string }> = [
  { value: H3Resolution.Stadt,       labelDe: 'Grob (~86 km²)' },
  { value: H3Resolution.Viertel,     labelDe: 'Standard (~5 km²)' },
  { value: H3Resolution.Strassenzug, labelDe: 'Fein (~0.7 km²)' },
];

function isValidPhone(phone: string): boolean {
  return phone.startsWith('+') && (phone.match(/\d/g)?.length ?? 0) >= 8;
}

export const SettingsScreen: React.FC = () => {
  const { settings, updateSettings } = useUserSettings();
  const { t } = useI18n(settings.locale);
  const isRtl = isRtlLocale(settings.locale);
  const storageKey = useStorageKey();
  const changePin = useChangePin();
  const [showPinChange, setShowPinChange] = useState(false);

  // Emergency contacts state
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);

  // AI key state (OPFS-verschlüsselt)
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [savedApiKey, setSavedApiKey] = useState<string>('');

  React.useEffect(() => {
    if (!storageKey) return;
    void loadLegalApiKey(storageKey).then(k => setSavedApiKey(k ?? ''));
  }, [storageKey]);

  // usePanicWipe — Options are threaded from App.tsx, but SettingsScreen
  // uses the hook directly for the button UI only (no onBeforeWipe here).
  const { onTap, tapCount, isWiping } = usePanicWipe();

  function handleAddContact() {
    if (!newContactName.trim() || !newContactPhone.trim()) return;
    if (!isValidPhone(newContactPhone)) {
      setPhoneError(true);
      return;
    }
    setPhoneError(false);
    const contacts = settings.emergencyContacts;
    if (contacts.length >= 3) return;
    const newContact = {
      id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`,
      name: newContactName.trim(),
      phone: newContactPhone.trim(),
    };
    updateSettings({ emergencyContacts: [...contacts, newContact] });
    setNewContactName('');
    setNewContactPhone('');
  }

  function handleRemoveContact(id: string) {
    updateSettings({ emergencyContacts: settings.emergencyContacts.filter(c => c.id !== id) });
  }

  function handleSaveApiKey() {
    const key = apiKeyInput.trim();
    if (!key || !storageKey) return;
    void saveLegalApiKey(key, storageKey).then(() => {
      setSavedApiKey(key);
      setApiKeyInput('');
    });
  }

  function handleDeleteApiKey() {
    void deleteLegalApiKey().then(() => {
      setSavedApiKey('');
      setApiKeyInput('');
    });
  }

  // PIN-Änderungsformular inline anzeigen (ersetzt Settings-Inhalt)
  if (showPinChange && storageKey) {
    return (
      <div dir={isRtl ? 'rtl' : 'ltr'} className="px-4 pt-6 pb-8 max-w-lg mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setShowPinChange(false)}
            className="text-slate-400 hover:text-slate-200 text-sm transition-colors"
          >
            ← {t.common.back}
          </button>
          <h1 className="text-lg font-medium text-slate-100">{t.settings.pinChange}</h1>
        </div>
        <PinChangeForm
          currentKey={storageKey}
          onChangePinAsync={changePin ?? (async () => { throw new Error('changePin nicht verfügbar'); })}
          onSuccess={() => { setShowPinChange(false); }}
          onCancel={() => setShowPinChange(false)}
          t={t}
        />
      </div>
    );
  }

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

      {/* Notfallkontakte */}
      <section className="bg-slate-800 rounded-xl p-4 space-y-3">
        <div>
          <p className="text-sm font-medium text-slate-200">{t.settings.emergencyContacts}</p>
          <p className="text-xs text-slate-500 mt-0.5">{t.settings.emergencyContactsHint}</p>
        </div>

        {/* Kontaktliste */}
        {settings.emergencyContacts.map(contact => (
          <div key={contact.id} className="flex items-center gap-2">
            <div className="flex-1 min-w-0">
              <span className="text-xs text-slate-300 font-medium truncate block">{contact.name}</span>
              <span className="text-xs text-slate-500 truncate block">{contact.phone}</span>
            </div>
            <button
              onClick={() => handleRemoveContact(contact.id)}
              className="text-xs text-red-400/70 hover:text-red-400 transition-colors flex-shrink-0"
            >
              {t.settings.emergencyContactRemove}
            </button>
          </div>
        ))}

        {/* Kontakt hinzufügen */}
        {settings.emergencyContacts.length < 3 && (
          <div className="space-y-2 pt-1">
            <div className="flex gap-2">
              <input
                type="text"
                value={newContactName}
                onChange={e => setNewContactName(e.target.value)}
                placeholder={t.settings.emergencyContactName}
                className="flex-1 bg-slate-700 text-slate-200 placeholder-slate-500 rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="tel"
                value={newContactPhone}
                onChange={e => { setNewContactPhone(e.target.value); setPhoneError(false); }}
                placeholder={t.settings.emergencyContactPhone}
                className={`flex-1 bg-slate-700 text-slate-200 placeholder-slate-500 rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 ${
                  phoneError ? 'ring-1 ring-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                }`}
              />
            </div>
            <button
              onClick={handleAddContact}
              disabled={!newContactName.trim() || !newContactPhone.trim()}
              className="text-xs text-blue-400 hover:text-blue-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {t.settings.emergencyContactAdd}
            </button>
          </div>
        )}

        {/* Nachricht */}
        <div className="pt-1 space-y-1">
          <p className="text-xs text-slate-400">{t.settings.emergencyMessage}</p>
          <input
            type="text"
            value={settings.emergencyMessage}
            onChange={e => updateSettings({ emergencyMessage: e.target.value })}
            className="w-full bg-slate-700 text-slate-200 placeholder-slate-500 rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-blue-500"
          />
          <p className="text-xs text-slate-600">{t.settings.emergencyMessageHint}</p>
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

      {/* KI-Assistent */}
      <section className="bg-slate-800 rounded-xl p-4 space-y-3">
        <div>
          <p className="text-sm font-medium text-slate-200">{t.settings.aiAssistantKey}</p>
          <p className="text-xs text-slate-500 mt-0.5">{t.settings.aiAssistantKeyHint}</p>
        </div>

        {savedApiKey ? (
          <div className="space-y-2">
            <div className="bg-slate-700 rounded-lg px-3 py-2 text-xs text-slate-400 font-mono">
              {savedApiKey.slice(0, 10)}•••
            </div>
            <button
              onClick={handleDeleteApiKey}
              className="text-xs text-red-400/70 hover:text-red-400 transition-colors"
            >
              {t.settings.aiAssistantKeyDelete}
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="password"
              value={apiKeyInput}
              onChange={e => setApiKeyInput(e.target.value)}
              placeholder={t.settings.aiAssistantKeyPlaceholder}
              className="flex-1 bg-slate-700 text-slate-200 placeholder-slate-500 rounded-lg px-3 py-2 text-xs font-mono outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={handleSaveApiKey}
              disabled={!apiKeyInput.trim()}
              className="text-xs bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg px-3 py-2 transition-colors"
            >
              {t.settings.aiAssistantKeySave}
            </button>
          </div>
        )}

        <p className="text-xs text-slate-600">{t.settings.aiAssistantKeyLink}</p>
      </section>

      {/* Datenschutz – nur wenn OPFS-Verschlüsselung aktiv (storageKey vorhanden) */}
      {storageKey && (
        <section className="bg-slate-800 rounded-xl overflow-hidden">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide px-4 pt-4 pb-2">
            🔒 {t.settings.dataProtection}
          </p>
          <button
            onClick={() => setShowPinChange(true)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm text-slate-300 hover:text-slate-100 hover:bg-slate-700/50 transition-colors border-t border-slate-700"
          >
            <span>{t.settings.pinChange}</span>
            <span className="text-slate-500">→</span>
          </button>
          <button
            onClick={onTap}
            className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors border-t border-slate-700 select-none ${
              isWiping
                ? 'bg-red-900/60 text-red-300 animate-pulse'
                : tapCount > 0
                ? 'text-red-400/70'
                : 'text-slate-500 hover:text-red-400/70'
            }`}
            aria-label="Alle lokalen Daten löschen"
          >
            <span>
              {isWiping
                ? t.settings.emergencyAlertSending
                : tapCount > 0
                ? `${tapCount}/5 – ${t.settings.deleteAllData}`
                : t.settings.deleteAllData}
            </span>
            <span className="text-slate-600">→</span>
          </button>
        </section>
      )}

      {/* Reports exportieren */}
      <section className="space-y-2">
        <button
          onClick={() => {
            void (async () => {
              const aggregates = await localReportStore.computeAllAggregates();
              const feed = generateCerfFeed(aggregates);
              const blob = new Blob([JSON.stringify(feed, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `peopleseyes-export-${new Date().toISOString().slice(0, 10)}.json`;
              a.click();
              URL.revokeObjectURL(url);
            })();
          }}
          className="w-full text-left px-4 py-3 bg-slate-800 rounded-xl text-sm text-slate-300 hover:text-slate-100 hover:bg-slate-700/80 flex items-center justify-between transition-colors"
        >
          <span>Reports exportieren (CERF-JSON)</span>
          <span className="text-slate-500">↓</span>
        </button>
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

      {/* Fallback Panic-Button wenn OPFS nicht aktiv (kein storageKey) */}
      {!storageKey && (
        <section className="pt-2">
          <button
            onClick={onTap}
            className={`w-full text-center py-2 rounded-lg text-xs transition-colors select-none ${
              isWiping
                ? 'bg-red-900/60 text-red-300 animate-pulse'
                : tapCount > 0
                ? 'bg-slate-800 text-red-400/70'
                : 'bg-slate-900 text-slate-700 hover:text-slate-600'
            }`}
            aria-label="Alle lokalen Daten löschen"
          >
            {isWiping
              ? t.settings.emergencyAlertSending
              : tapCount > 0
              ? `${tapCount}/${5} – Alle Daten löschen`
              : 'v0.1.0'}
          </button>
          <p className="text-center text-xs text-slate-800 mt-1 select-none">
            5× tippen zum Löschen aller lokalen Daten
          </p>
        </section>
      )}
    </div>
  );
};

// ─── HistoryScreen ─────────────────────────────────────────────────────────────

export const HistoryScreen: React.FC = () => {
  const { settings } = useUserSettings();
  const { t } = useI18n(settings.locale);
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void localReportStore.getAllReports().then(all => {
      const sorted = [...all].sort((a, b) => b.reportedAtMinute - a.reportedAtMinute);
      setReports(sorted);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="px-4 pt-6 pb-8 max-w-lg mx-auto">
      <h1 className="text-lg font-medium text-slate-100 mb-4">Meine Meldungen</h1>

      {isLoading ? (
        <p className="text-sm text-slate-500 text-center py-8">{t.common.loading}</p>
      ) : reports.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-12 text-slate-500">
          <span className="text-3xl">📋</span>
          <p className="text-sm">Noch keine Meldungen.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {reports.map(r => {
            const date = new Date(r.reportedAtMinute);
            const dateStr = date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: '2-digit' });
            const timeStr = date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
            const cellShort = r.position.cellId.slice(0, 8);
            return (
              <li
                key={r.id}
                className="bg-slate-800 rounded-xl px-4 py-3 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="text-xs text-slate-300 font-medium truncate">
                    {t.authority[r.authorityCategory]} · {t.activity[r.activityType]}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 font-mono">{cellShort}…</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-slate-400">{dateStr}</p>
                  <p className="text-xs text-slate-600">{timeStr}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
