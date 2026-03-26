import React, { useState, createContext, useContext } from 'react';
import type { AppMode, AuthorityCategory, ObservedActivityType } from '@peopleseyes/core-model';
import { H3Resolution } from '@peopleseyes/core-model';
import MapScreen from './pages/MapScreen.js';
import ReportScreen from './pages/ReportScreen.js';
import { RightsScreen, EvidenceScreen, SettingsScreen, HistoryScreen } from './pages/screens.js';
import BottomNav from './components/BottomNav.js';
import PinLockScreen from './components/PinLockScreen.js';
import Toast from './components/Toast.js';
import { useUserSettings } from './hooks/useUserSettings.js';
import { useI18n } from './hooks/useI18n.js';
import { useGeolocation } from './hooks/useGeolocation.js';
import { useStoragePin } from './hooks/useStoragePin.js';
import { useEmergencyAlert } from './hooks/useEmergencyAlert.js';
import { usePanicWipe } from './hooks/usePanicWipe.js';
import type { AnonymizedPosition } from '@peopleseyes/core-model';

export type Screen = 'map' | 'report' | 'rights' | 'evidence' | 'settings' | 'history';

/** Gemeinsame GPS-Props die an Map und ReportScreen durchgereicht werden */
export interface GeoProps {
  position: AnonymizedPosition | null;
  rawCoords: { lat: number; lng: number } | null;
  geoError: string | null;
}

/**
 * Context für den PIN-abgeleiteten AES-GCM CryptoKey.
 * null solange der Store noch nicht entsperrt wurde.
 */
export const StorageKeyContext = createContext<CryptoKey | null>(null);

/** Gibt den aktuellen StorageKey aus dem Context zurück. */
export function useStorageKey(): CryptoKey | null {
  return useContext(StorageKeyContext);
}

/**
 * Context für die changePin-Funktion.
 * Ermöglicht PinChangeForm den PIN zu wechseln und den Context zu aktualisieren.
 */
export const ChangePinContext = createContext<((newPin: string) => Promise<void>) | null>(null);

/** Gibt changePin aus dem Context zurück. */
export function useChangePin(): ((newPin: string) => Promise<void>) | null {
  return useContext(ChangePinContext);
}

export type ReporterContext = 'witness' | 'affected';

export interface ReportPrefill {
  authority?: AuthorityCategory;
  activity?: ObservedActivityType;
  reporterContext?: ReporterContext;
}

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>('map');
  const [prefillReport, setPrefillReport] = useState<ReportPrefill | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { settings } = useUserSettings();
  const { t } = useI18n(settings.locale);
  const isKiosk = settings.appMode === ('kiosk' as AppMode);

  // PIN-Unlock – muss vor allem anderen laufen
  const { pinState, storageKey, pinError, submitPin, changePin, forgotPin } = useStoragePin();

  // Fehler 2 fix: GPS-Watcher einmalig auf App-Ebene — kein doppelter
  // watchPosition wenn gleichzeitig MapScreen und ReportScreen gemountet.
  const { position, rawCoords, error: geoError } = useGeolocation(
    settings.reportResolution as H3Resolution,
  );
  const geoProps: GeoProps = { position, rawCoords, geoError };

  // Emergency Alert + Panic Wipe verdrahten
  const { sendAlert } = useEmergencyAlert();
  usePanicWipe({
    onBeforeWipe: () => sendAlert(position?.cellId ?? null),
  });

  // PinLockScreen solange anzeigen bis der Store entsperrt ist
  if (pinState !== 'unlocked') {
    return (
      <PinLockScreen
        pinState={pinState}
        pinError={pinError}
        onSubmitPin={submitPin}
        onForgotPin={forgotPin}
      />
    );
  }

  const renderScreen = () => {
    switch (activeScreen) {
      case 'map':
        return (
          <MapScreen
            geoProps={geoProps}
            {...(!isKiosk && {
              onNavigateToReport: (prefill) => {
                setPrefillReport(prefill ?? null);
                setActiveScreen('report');
              },
            })}
          />
        );
      case 'report':
        if (isKiosk) return <MapScreen geoProps={geoProps} />;
        return (
          <ReportScreen
            geoProps={geoProps}
            prefill={prefillReport}
            onSubmitSuccess={(msg) => {
              setToastMessage(msg);
              setPrefillReport(null);
              setActiveScreen('map');
            }}
          />
        );
      case 'rights':
        return <RightsScreen />;
      case 'evidence':
        if (isKiosk) return <RightsScreen />;
        return <EvidenceScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'history':
        if (isKiosk) return <MapScreen geoProps={geoProps} />;
        return <HistoryScreen />;
      default:
        return <MapScreen geoProps={geoProps} />;
    }
  };

  return (
    <ChangePinContext.Provider value={changePin}>
      <StorageKeyContext.Provider value={storageKey}>
        <div className="flex flex-col h-screen max-h-dvh bg-slate-950 text-slate-100">
          {toastMessage && (
            <Toast message={toastMessage} onDone={() => setToastMessage(null)} />
          )}
          <main className="flex-1 overflow-y-auto pb-20">
            {renderScreen()}
          </main>
          <BottomNav
            activeScreen={activeScreen}
            onNavigate={setActiveScreen}
            isKiosk={isKiosk}
            t={t}
          />
        </div>
      </StorageKeyContext.Provider>
    </ChangePinContext.Provider>
  );
};

export default App;
