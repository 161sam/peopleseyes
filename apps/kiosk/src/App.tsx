import React, { useState, useCallback, useMemo, useRef, lazy, Suspense } from 'react';
import type { KioskTab } from './kiosk-profile.js';
import { useKioskProfileLoader, KioskProfileContext } from './hooks/useKioskProfile.js';
import { useInactivityReset } from './hooks/useInactivityReset.js';
import KioskNav from './components/KioskNav.js';
import InactivityOverlay from './components/InactivityOverlay.js';

// Lazy imports – eigene Kiosk-Screens (nicht apps/web direkt importieren)
// WARN-05 fix: Kiosk importiert nicht mehr via relativen Pfad aus apps/web.
// Stattdessen: eigene Wrapper-Screens die die shared core-* Pakete nutzen.
const MapScreenLazy = lazy(() => import('./pages/KioskMapScreen.js'));
const RightsScreenLazy = lazy(() => import('./pages/KioskRightsScreen.js').then(m => ({ default: m.KioskRightsScreen })));
const ReportScreenLazy = lazy(() => import('./pages/KioskReportScreen.js'));
const EmergencyScreen = lazy(() => import('./pages/EmergencyScreen.js'));

const OVERLAY_PRE_WARN_SEC = 10; // Overlay erscheint 10s vor Reset

const KioskApp: React.FC = () => {
  const { profile, isLoading } = useKioskProfileLoader();
  const [activeTab, setActiveTab] = useState<KioskTab | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  // BUG-03 fix: Timer-Ref damit Dismiss den laufenden Timer abbrechen kann
  const overlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Ersten Tab als Default setzen
  const currentTab = activeTab ?? (profile?.tabs[0] ?? null);
  const accentColor = profile?.branding?.accentColor ?? '#3b82f6';

  // Inaktivitäts-Callback: Overlay zeigen und Timer starten
  const handleInactivity = useCallback((target: KioskTab | null) => {
    // Vorherigen Timer abbrechen falls noch aktiv
    if (overlayTimerRef.current) clearTimeout(overlayTimerRef.current);
    setShowOverlay(true);
    overlayTimerRef.current = setTimeout(() => {
      overlayTimerRef.current = null;
      setShowOverlay(false);
      if (target) setActiveTab(target);
    }, OVERLAY_PRE_WARN_SEC * 1000);
  }, []);

  // Overlay-Dismiss: Timer abbrechen und weitermachen
  const handleOverlayDismiss = useCallback(() => {
    if (overlayTimerRef.current) {
      clearTimeout(overlayTimerRef.current);
      overlayTimerRef.current = null;
    }
    setShowOverlay(false);
  }, []);

  // Timeout wird um Overlay-Zeit reduziert
  const effectiveTimeout = useMemo(() => {
    if (!profile?.inactivityTimeoutSec) return null;
    return Math.max(profile.inactivityTimeoutSec - OVERLAY_PRE_WARN_SEC, 10);
  }, [profile?.inactivityTimeoutSec]);

  useInactivityReset({
    timeoutSec: effectiveTimeout,
    behavior: profile?.resetBehavior ?? 'map',
    tabs: profile?.tabs ?? [],
    onReset: handleInactivity,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Kiosk wird geladen…</span>
        </div>
      </div>
    );
  }

  if (!profile || !currentTab) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950 text-slate-400">
        <p>Kein Profil verfügbar.</p>
      </div>
    );
  }

  const renderTab = () => (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      {currentTab === 'map' && <MapScreenLazy />}
      {currentTab === 'rights' && <RightsScreenLazy />}
      {currentTab === 'report' && profile.allowReporting && (
        <ReportScreenLazy onSubmitSuccess={() => setActiveTab(profile.tabs[0] ?? 'map')} />
      )}
      {currentTab === 'emergency' && <EmergencyScreen profile={profile} />}
    </Suspense>
  );

  return (
    <KioskProfileContext.Provider value={{ profile, isLoading: false }}>
      <div className="flex flex-col h-screen max-h-dvh bg-slate-950 text-slate-100 select-none">
        {/* Profil-Name als Header-Badge */}
        <div
          className="flex items-center justify-between px-4 py-2 border-b border-slate-800"
          style={{ background: `${accentColor}10`, borderBottomColor: `${accentColor}30` }}
        >
          <span className="text-xs font-medium" style={{ color: accentColor }}>
            PeoplesEyes · InfoTerminal
          </span>
          {profile.branding?.organizationName && (
            <span className="text-xs text-slate-500">{profile.branding.organizationName}</span>
          )}
        </div>

        {/* Screen */}
        <main className="flex-1 overflow-y-auto pb-24">
          {renderTab()}
        </main>

        {/* Navigation */}
        <KioskNav
          tabs={profile.tabs}
          activeTab={currentTab}
          onSelect={setActiveTab}
          accentColor={accentColor}
          {...(profile.branding?.organizationName
            ? { orgName: profile.branding.organizationName }
            : {})}
        />

        {/* Inaktivitäts-Overlay */}
        {showOverlay && (
          <InactivityOverlay
            countdownSec={OVERLAY_PRE_WARN_SEC}
            onDismiss={handleOverlayDismiss}
          />
        )}
      </div>
    </KioskProfileContext.Provider>
  );
};

export default KioskApp;
