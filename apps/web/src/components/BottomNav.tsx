import React from 'react';
import type { Screen } from '../App.js';
import type { Translations } from '@peopleseyes/core-i18n';

interface BottomNavProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
  isKiosk: boolean;
  t: Translations;
}

const NAV_ITEMS: Array<{ screen: Screen; icon: string; labelKey: keyof Translations['nav'] }> = [
  { screen: 'map',      icon: '🗺',  labelKey: 'map' },
  { screen: 'report',   icon: '📍',  labelKey: 'report' },
  { screen: 'rights',   icon: '⚖️',  labelKey: 'rights' },
  { screen: 'evidence', icon: '🎥',  labelKey: 'evidence' },
  { screen: 'history',  icon: '📋',  labelKey: 'history' },
  { screen: 'settings', icon: '⚙️',  labelKey: 'settings' },
];

const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, onNavigate, isKiosk, t }) => {
  const visibleItems = isKiosk
    ? NAV_ITEMS.filter(i => i.screen === 'map' || i.screen === 'rights' || i.screen === 'settings')
    : NAV_ITEMS;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 flex justify-around items-center h-16 z-50">
      {visibleItems.map(({ screen, icon, labelKey }) => {
        const isActive = activeScreen === screen;
        return (
          <button
            key={screen}
            onClick={() => onNavigate(screen)}
            className={`flex flex-col items-center px-3 py-2 rounded-lg transition-colors ${
              isActive ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            <span
              className={`block w-1 h-1 rounded-full mx-auto mb-0.5 ${isActive ? 'bg-blue-400' : 'bg-transparent'}`}
              aria-hidden="true"
            />
            <span className="text-lg leading-none" aria-hidden="true">{icon}</span>
            <span className="text-[10px] font-medium">{t.nav[labelKey]}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
