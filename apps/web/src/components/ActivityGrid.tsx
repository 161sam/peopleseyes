import React from 'react';
import { ObservedActivityType } from '@peopleseyes/core-model';
import type { Translations } from '@peopleseyes/core-i18n';

interface ActivityTile {
  activity: ObservedActivityType;
  icon: string;
}

const ACTIVITY_TILES: ActivityTile[] = [
  { activity: ObservedActivityType.StationaereKontrolle,  icon: '🛑' },
  { activity: ObservedActivityType.Identitaetskontrolle,  icon: '🪪' },
  { activity: ObservedActivityType.Fahrzeugkontrolle,     icon: '🚗' },
  { activity: ObservedActivityType.Patrouille,            icon: '👮' },
  { activity: ObservedActivityType.Zugriff,               icon: '⛓' },
  { activity: ObservedActivityType.Transport,             icon: '🚐' },
  { activity: ObservedActivityType.DurchsuchungGebaeude,  icon: '🏠' },
  { activity: ObservedActivityType.Sonstiges,             icon: '❓' },
];

export { ACTIVITY_TILES };

interface ActivityGridProps {
  selected: ObservedActivityType | null;
  onSelect: (activity: ObservedActivityType) => void;
  t: Translations;
  autoAdvance?: boolean;
}

const ActivityGrid: React.FC<ActivityGridProps> = ({ selected, onSelect, t, autoAdvance }) => {
  const handleClick = (activity: ObservedActivityType) => {
    onSelect(activity);
    // autoAdvance is handled by the parent via onSelect triggering step advance
    void autoAdvance; // consumed by parent
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {ACTIVITY_TILES.map(({ activity, icon }) => (
        <button
          key={activity}
          onClick={() => handleClick(activity)}
          className={`rounded-xl border p-4 flex flex-col items-center gap-2 text-center transition-colors ${
            selected === activity
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-slate-700 bg-slate-800/50 hover:border-slate-500'
          }`}
        >
          <span className="text-2xl leading-none">{icon}</span>
          <span className="text-xs font-medium text-slate-300">{t.activity[activity]}</span>
        </button>
      ))}
    </div>
  );
};

export default ActivityGrid;
