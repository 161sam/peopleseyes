import React from 'react';
import type { KioskTab } from '../kiosk-profile.js';

interface KioskNavProps {
  tabs: readonly KioskTab[];
  activeTab: KioskTab;
  onSelect: (tab: KioskTab) => void;
  accentColor?: string;
  orgName?: string;
}

const TAB_META: Record<KioskTab, { icon: string; label: string }> = {
  map:       { icon: '🗺',  label: 'Karte' },
  rights:    { icon: '⚖️',  label: 'Rechte' },
  report:    { icon: '📍',  label: 'Melden' },
  emergency: { icon: '🆘',  label: 'Notfall' },
};

const KioskNav: React.FC<KioskNavProps> = ({
  tabs,
  activeTab,
  onSelect,
  accentColor = '#3b82f6',
  orgName,
}) => (
  <div className="fixed bottom-0 left-0 right-0 z-40">
    {/* Organisation-Footer */}
    {orgName && (
      <div className="bg-slate-900/95 border-t border-slate-800 px-4 py-1.5 text-center">
        <p className="text-xs text-slate-600">{orgName}</p>
      </div>
    )}

    {/* Navigation */}
    <nav className="bg-slate-900 border-t border-slate-800 flex justify-around items-stretch">
      {tabs.map(tab => {
        const { icon, label } = TAB_META[tab];
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            onClick={() => onSelect(tab)}
            className="flex flex-col items-center gap-1.5 flex-1 py-4 transition-colors"
            style={{ color: isActive ? accentColor : '#64748b' }}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className="text-2xl leading-none" aria-hidden="true">{icon}</span>
            <span className="text-xs font-medium">{label}</span>
            {isActive && (
              <span
                className="absolute bottom-0 h-0.5 w-12 rounded-full"
                style={{ background: accentColor }}
              />
            )}
          </button>
        );
      })}
    </nav>
  </div>
);

export default KioskNav;
