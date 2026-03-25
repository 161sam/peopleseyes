import type { SupportedLocale } from '@peopleseyes/core-model';
import type { Translations } from './schema.js';
import { de } from './locales/de.js';
import { en } from './locales/en.js';
import { tr } from './locales/tr.js';
import { uk } from './locales/uk.js';
import { ar } from './locales/ar.js';
import { fa } from './locales/fa.js';
import { fr } from './locales/fr.js';
import { es } from './locales/es.js';
import { pl } from './locales/pl.js';
import { ro } from './locales/ro.js';
import { sr } from './locales/sr.js';
import { sq } from './locales/sq.js';
import { bs } from './locales/bs.js';
import { so } from './locales/so.js';
import { am } from './locales/am.js';
import { ti } from './locales/ti.js';
import { ps } from './locales/ps.js';
import { ku } from './locales/ku.js';
import { ru } from './locales/ru.js';
import { sw } from './locales/sw.js';

const LOCALES: Record<SupportedLocale, Translations> = {
  de, en, tr, uk, ar, fa,
  fr, es, pl, ro, sr, sq, bs,
  so, am, ti, ps, ku, ru, sw,
};

/**
 * Gibt die Translations für eine Locale zurück.
 * Fallback: Deutsch → Englisch.
 */
export function getTranslations(locale: SupportedLocale): Translations {
  const translations = LOCALES[locale as keyof typeof LOCALES];
  return translations ?? LOCALES.de;
}

/**
 * Gibt zurück ob eine Locale RTL-Text verwendet.
 */
export function isRtlLocale(locale: SupportedLocale): boolean {
  return locale === 'ar' || locale === 'fa' || locale === 'ps';
}

/**
 * Erkennt die bevorzugte Locale des Browsers,
 * begrenzt auf unterstützte Locales.
 */
export function detectLocale(): SupportedLocale {
  const supported: SupportedLocale[] = [
    'de', 'en', 'tr', 'ar', 'uk', 'fa',
    'fr', 'es', 'pl', 'ro', 'sr', 'sq', 'bs',
    'so', 'am', 'ti', 'ps', 'ku', 'ru', 'sw',
  ];
  const nav = (globalThis as unknown as { navigator?: { languages?: readonly string[]; language?: string } }).navigator;
  const browserLangs = nav ? (nav.languages ?? (nav.language ? [nav.language] : ['de'])) : ['de'];

  for (const lang of browserLangs) {
    const base = lang.split('-')[0]?.toLowerCase() as SupportedLocale;
    if (supported.includes(base)) return base;
  }

  return 'de';
}

export type { Translations } from './schema.js';
