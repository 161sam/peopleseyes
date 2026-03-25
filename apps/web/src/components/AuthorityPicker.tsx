/**
 * AuthorityPicker – zweistufige geführte Behördenauswahl mit Suche.
 *
 * Stufe A: 4 Gruppen-Kacheln (immer sichtbar)
 * Stufe B: Unterkategorien der gewählten Gruppe
 * Suche:   filtert alle 15 Kategorien live, überschreibt Stufen-Ansicht
 */
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { AuthorityCategory } from '@peopleseyes/core-model';
import type { Translations } from '@peopleseyes/core-i18n';

type AuthorityGroup = 'federal' | 'state' | 'immigration' | 'frontex';

const GROUP_CATEGORIES: Record<AuthorityGroup, AuthorityCategory[]> = {
  federal: [
    AuthorityCategory.BundespolizeiBahn,
    AuthorityCategory.BundespolizeiFlughafen,
    AuthorityCategory.BundespolizeiGrenze,
    AuthorityCategory.BundespolizeiMobil,
  ],
  state: [
    AuthorityCategory.LandespolizeiSchwerpunktkontrolle,
    AuthorityCategory.LandespolizeiRazzia,
    AuthorityCategory.LandespolizeiAllgemein,
  ],
  immigration: [
    AuthorityCategory.AuslaenderbehördeUnterkuenfte,
    AuthorityCategory.AuslaenderbehördeVorführung,
    AuthorityCategory.AuslaenderbehördeAbschiebung,
  ],
  frontex: [
    AuthorityCategory.FrontexPatrouille,
    AuthorityCategory.FrontexOperation,
    AuthorityCategory.GemeinsameBundLand,
    AuthorityCategory.GemeinsameMitFrontex,
    AuthorityCategory.Unbekannt,
  ],
};

const GROUP_ICONS: Record<AuthorityGroup, string> = {
  federal: '🚔',
  state: '🏛️',
  immigration: '📋',
  frontex: '🇪🇺',
};

const GROUPS: AuthorityGroup[] = ['federal', 'state', 'immigration', 'frontex'];

interface AuthorityPickerProps {
  selected: AuthorityCategory | null;
  onSelect: (v: AuthorityCategory) => void;
  t: Translations;
}

function groupLabel(group: AuthorityGroup, t: Translations): string {
  switch (group) {
    case 'federal':    return t.report.groupFederal;
    case 'state':      return t.report.groupState;
    case 'immigration': return t.report.groupImmigration;
    case 'frontex':    return t.report.groupFrontex;
  }
}

/** Normalisiert einen String für Suche (Kleinschrift + Diakritika entfernen) */
function normalize(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
}

export const AuthorityPicker: React.FC<AuthorityPickerProps> = ({ selected, onSelect, t }) => {
  const [activeGroup, setActiveGroup] = useState<AuthorityGroup | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  // Alle 15 Kategorien als flat Array für Suche
  const allCategories = useMemo(() => Object.values(AuthorityCategory), []);

  // Suchergebnisse live filtern
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const needle = normalize(searchQuery);
    return allCategories.filter(cat => normalize(t.authority[cat]).includes(needle));
  }, [searchQuery, allCategories, t]);

  // Wenn Gruppe gewählt und nur 1 Unterkategorie → direkt auswählen
  const handleGroupClick = (group: AuthorityGroup) => {
    const cats = GROUP_CATEGORIES[group];
    if (cats.length === 1 && cats[0] !== undefined) {
      onSelect(cats[0]);
      setActiveGroup(null);
    } else {
      setActiveGroup(prev => (prev === group ? null : group));
    }
  };

  const handleSelect = (cat: AuthorityCategory) => {
    onSelect(cat);
    setSearchQuery('');
    setActiveGroup(null);
  };

  // Keyboard-Navigation für Sucheingabe
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setSearchQuery('');
      searchRef.current?.blur();
    }
  };

  // Suche leeren wenn nächster Schritt angesteuert wird (selected gesetzt)
  useEffect(() => {
    if (selected) setSearchQuery('');
  }, [selected]);

  const subCategories = activeGroup ? GROUP_CATEGORIES[activeGroup] : null;

  return (
    <div className="space-y-3">
      {/* Suchfeld */}
      <input
        ref={searchRef}
        type="search"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        onKeyDown={handleSearchKeyDown}
        placeholder={t.report.searchAuthority}
        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
        aria-label={t.report.searchAuthority}
      />

      {/* Suchergebnisse (überschreibt Kacheln) */}
      {searchResults !== null ? (
        <div className="space-y-1.5">
          {searchResults.length === 0 ? (
            <p className="text-xs text-slate-500 px-1">{t.common.unknown}</p>
          ) : (
            searchResults.map(cat => (
              <button
                key={cat}
                onClick={() => handleSelect(cat)}
                onKeyDown={e => e.key === 'Enter' && handleSelect(cat)}
                className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                  selected === cat
                    ? 'border-blue-500 bg-blue-500/10 text-blue-300'
                    : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-500'
                }`}
              >
                {t.authority[cat]}
              </button>
            ))
          )}
        </div>
      ) : (
        <>
          {/* Stufe A: Gruppen-Kacheln */}
          <div className="grid grid-cols-2 gap-2">
            {GROUPS.map(group => (
              <button
                key={group}
                onClick={() => handleGroupClick(group)}
                className={`flex flex-col items-center justify-center gap-1.5 min-h-[64px] px-3 py-3 rounded-xl border text-sm font-medium transition-colors ${
                  activeGroup === group
                    ? 'border-blue-500 bg-blue-500/10 text-blue-300'
                    : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-500'
                }`}
                aria-expanded={activeGroup === group}
              >
                <span className="text-xl leading-none">{GROUP_ICONS[group]}</span>
                <span className="text-xs text-center leading-snug">{groupLabel(group, t)}</span>
              </button>
            ))}
          </div>

          {/* Stufe B: Unterkategorien */}
          {subCategories && (
            <div className="space-y-1.5 pt-1">
              {subCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleSelect(cat)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                    selected === cat
                      ? 'border-blue-500 bg-blue-500/10 text-blue-300'
                      : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {t.authority[cat]}
                </button>
              ))}
            </div>
          )}

          {/* Schnellauswahl: Unbekannt */}
          <button
            onClick={() => handleSelect(AuthorityCategory.Unbekannt)}
            className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-500 hover:text-slate-400 transition-colors border border-transparent hover:border-slate-700"
          >
            {t.report.unknownAuthority}
          </button>
        </>
      )}
    </div>
  );
};
