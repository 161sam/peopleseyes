import React, { useState } from 'react';
import type { AppMode } from '@peopleseyes/core-model';
import MapScreen from './pages/MapScreen.js';
import ReportScreen from './pages/ReportScreen.js';
import { RightsScreen, EvidenceScreen, SettingsScreen } from './pages/screens.js';
import BottomNav from './components/BottomNav.js';
import { useUserSettings } from './hooks/useUserSettings.js';
import { useI18n } from './hooks/useI18n.js';

export type Screen = 'map' | 'report' | 'rights' | 'evidence' | 'settings';

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>('map');
  const { settings } = useUserSettings();
  const { t } = useI18n(settings.locale);

  const isKiosk = settings.appMode === ('kiosk' as AppMode);

  const renderScreen = () => {
    switch (activeScreen) {
      case 'map':
        return <MapScreen />;
      case 'report':
        // Im Kiosk-Modus kein Melden
        if (isKiosk) return <MapScreen />;
        return <ReportScreen onSubmitSuccess={() => setActiveScreen('map')} />;
      case 'rights':
        return <RightsScreen />;
      case 'evidence':
        if (isKiosk) return <RightsScreen />;
        return <EvidenceScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <MapScreen />;
    }
  };

  return (
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
  );
};

export default App;
