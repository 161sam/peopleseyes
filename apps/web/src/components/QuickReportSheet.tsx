/**
 * QuickReportSheet – Bottom-Sheet für Eilmeldungen direkt von der Karte.
 *
 * 2-Schritt-Formular:
 *   Schritt 1: Behördengruppe (4 große Kacheln, KEINE Unterkategorie)
 *   Schritt 2: Aktivität (alle 8 als Pills, 2 Spalten)
 *
 * Confidence: automatisch ObservationConfidence.Direkt
 * AuthorityVisibility: automatisch AuthorityVisibility.EindeutigErkennbar
 * Unbekannte Gruppe → AuthorityCategory.Unbekannt
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  AuthorityCategory,
  AuthorityVisibility,
  ObservedActivityType,
  ObservationConfidence,
  H3Resolution,
} from '@peopleseyes/core-model';
import { createReport } from '@peopleseyes/core-logic';
import { useReports } from '../hooks/useReports.js';
import { useUserSettings } from '../hooks/useUserSettings.js';
import { useI18n } from '../hooks/useI18n.js';
import type { GeoProps } from '../App.js';

type AuthorityGroup = 'federal' | 'state' | 'immigration' | 'frontex';

/** Repräsentative AuthorityCategory pro Gruppe für schnelle Meldung */
const GROUP_TO_CATEGORY: Record<AuthorityGroup, AuthorityCategory> = {
  federal:     AuthorityCategory.BundespolizeiBahn,
  state:       AuthorityCategory.LandespolizeiAllgemein,
  immigration: AuthorityCategory.AuslaenderbehördeUnterkuenfte,
  frontex:     AuthorityCategory.FrontexPatrouille,
};

const GROUP_ICONS: Record<AuthorityGroup, string> = {
  federal:     '🚔',
  state:       '🏛️',
  immigration: '📋',
  frontex:     '🇪🇺',
};

const GROUPS: AuthorityGroup[] = ['federal', 'state', 'immigration', 'frontex'];

const ALL_ACTIVITIES: ObservedActivityType[] = Object.values(ObservedActivityType);

interface QuickReportSheetProps {
  geoProps: GeoProps;
  onClose: () => void;
  onNavigateToReport: (prefill: { authority: AuthorityCategory; activity: ObservedActivityType }) => void;
}

const QuickReportSheet: React.FC<QuickReportSheetProps> = ({ geoProps, onClose, onNavigateToReport }) => {
  const { settings } = useUserSettings();
  const { t } = useI18n(settings.locale);
  const { addReport } = useReports();

  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedGroup, setSelectedGroup] = useState<AuthorityGroup | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<ObservedActivityType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Slide-in beim Mount
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Escape-Taste schließt Sheet
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  const handleGroupSelect = (group: AuthorityGroup) => {
    setSelectedGroup(group);
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!selectedGroup || !selectedActivity || isSubmitting) return;

    const authority = GROUP_TO_CATEGORY[selectedGroup];
    const lat = geoProps.rawCoords?.lat ?? 51.3;
    const lng = geoProps.rawCoords?.lng ?? 10.0;

    setIsSubmitting(true);
    try {
      const report = createReport({
        lat,
        lng,
        authorityCategory: authority,
        authorityVisibility: AuthorityVisibility.EindeutigErkennbar,
        activityType: selectedActivity,
        confidence: ObservationConfidence.Direkt,
        resolution: settings.reportResolution as H3Resolution,
      });
      await addReport(report);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        handleClose();
      }, 2000);
    } catch {
      // Fehler stillschweigend – Nutzer kann es erneut versuchen
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDetailedReport = () => {
    if (!selectedGroup) return;
    const authority = GROUP_TO_CATEGORY[selectedGroup];
    handleClose();
    onNavigateToReport({
      authority,
      ...(selectedActivity ? { activity: selectedActivity } : {}),
    } as { authority: AuthorityCategory; activity: ObservedActivityType });
  };

  function groupLabel(group: AuthorityGroup): string {
    switch (group) {
      case 'federal':     return t.report.groupFederal;
      case 'state':       return t.report.groupState;
      case 'immigration': return t.report.groupImmigration;
      case 'frontex':     return t.report.groupFrontex;
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-slate-900 rounded-t-2xl shadow-2xl transition-transform duration-300 ${visible ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ maxHeight: '70vh' }}
        role="dialog"
        aria-modal="true"
        aria-label={t.map.quickReportTitle}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-slate-700 rounded-full" />
        </div>

        <div className="overflow-y-auto px-4 pb-8" style={{ maxHeight: 'calc(70vh - 2rem)' }}>
          {/* Header */}
          <div className="flex items-start justify-between pt-3 pb-4">
            <div>
              <h2 className="text-base font-semibold text-slate-100">{t.map.quickReportTitle}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{t.map.quickReportSubtitle}</p>
            </div>
            <button
              onClick={handleClose}
              className="text-slate-500 hover:text-slate-300 text-xl leading-none ml-4 flex-shrink-0"
              aria-label={t.common.cancel}
            >
              ×
            </button>
          </div>

          {/* Schritt 1: Behördengruppe */}
          {step === 1 && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-slate-300">{t.report.step.authority}</p>
              <div className="grid grid-cols-2 gap-3">
                {GROUPS.map(group => (
                  <button
                    key={group}
                    onClick={() => handleGroupSelect(group)}
                    className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-700 hover:border-blue-500 transition-all text-center"
                  >
                    <span className="text-2xl">{GROUP_ICONS[group]}</span>
                    <span className="text-xs font-medium text-slate-200 leading-snug">
                      {groupLabel(group)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Schritt 2: Aktivität */}
          {step === 2 && selectedGroup && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setStep(1); setSelectedActivity(null); }}
                  className="text-slate-400 hover:text-slate-200 text-sm transition-colors"
                >
                  ←
                </button>
                <p className="text-sm font-medium text-slate-300">{t.report.step.activity}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {ALL_ACTIVITIES.map(act => (
                  <button
                    key={act}
                    onClick={() => setSelectedActivity(selectedActivity === act ? null : act)}
                    className={`px-3 py-2.5 rounded-lg text-xs font-medium border transition-colors text-left ${
                      selectedActivity === act
                        ? 'border-blue-500 bg-blue-500/15 text-blue-300'
                        : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {t.activity[act]}
                  </button>
                ))}
              </div>

              {/* Absenden + Detaillierte Meldung */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => void handleSubmit()}
                  disabled={!selectedActivity || isSubmitting}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold text-sm transition-colors"
                >
                  {isSubmitting ? t.common.loading : t.report.submitButton}
                </button>
                <button
                  onClick={handleDetailedReport}
                  className="w-full py-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {t.map.detailedReport}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Success-Toast */}
      {showSuccess && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-slate-800 text-green-400 text-sm font-medium px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 pointer-events-none">
          <span>✓</span>
          <span>{t.map.quickReportSuccess}</span>
        </div>
      )}
    </>
  );
};

export default QuickReportSheet;
