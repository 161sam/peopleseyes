import React, { useState, createContext, useContext } from 'react';
import type { AppMode } from '@peopleseyes/core-model';
import { H3Resolution } from '@peopleseyes/core-model';
import MapScreen from './pages/MapScreen.js';
import ReportScreen from './pages/ReportScreen.js';
import { RightsScreen, EvidenceScreen, SettingsScreen } from './pages/screens.js';
import BottomNav from './components/BottomNav.js';
import PinLockScreen from './components/PinLockScreen.js';
import { useUserSettings } from './hooks/useUserSettings.js';
import { useI18n } from './hooks/useI18n.js';
import { useGeolocation } from './hooks/useGeolocation.js';
import { useStoragePin } from './hooks/useStoragePin.js';
import type { AnonymizedPosition } from '@peopleseyes/core-model';

export type Screen = 'map' | 'report' | 'rights' | 'evidence' | 'settings';

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

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>('map');
  const { settings } = useUserSettings();
  const { t } = useI18n(settings.locale);
  const isKiosk = settings.appMode === ('kiosk' as AppMode);

  // PIN-Unlock – muss vor allem anderen laufen
  const { pinState, storageKey, pinError, submitPin } = useStoragePin();

  // Fehler 2 fix: GPS-Watcher einmalig auf App-Ebene — kein doppelter
  // watchPosition wenn gleichzeitig MapScreen und ReportScreen gemountet.
  const { position, rawCoords, error: geoError } = useGeolocation(
    settings.reportResolution as H3Resolution,
  );
  const geoProps: GeoProps = { position, rawCoords, geoError };

  // PinLockScreen solange anzeigen bis der Store entsperrt ist
  if (pinState !== 'unlocked') {
    return (
      <PinLockScreen
        pinState={pinState}
        pinError={pinError}
        onSubmitPin={submitPin}
      />
    );
  }

  const renderScreen = () => {
    switch (activeScreen) {
      case 'map':
        return <MapScreen geoProps={geoProps} />;
      case 'report':
        if (isKiosk) return <MapScreen geoProps={geoProps} />;
        return (
          <ReportScreen
            geoProps={geoProps}
            onSubmitSuccess={() => setActiveScreen('map')}
          />
        );
      case 'rights':
        return <RightsScreen />;
      case 'evidence':
        if (isKiosk) return <RightsScreen />;
        return <EvidenceScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <MapScreen geoProps={geoProps} />;
    }
  };

  return (
    <StorageKeyContext.Provider value={storageKey}>
      <div className="flex flex-col h-screen max-h-dvh bg-slate-950 text-slate-100">
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
  );
};

export default App;
