import type { SupportedLocale } from '@peopleseyes/core-model';
import type { Translations } from './schema.js';
import { de } from './locales/de.js';
import { en } from './locales/en.js';
import { tr } from './locales/tr.js';
import { uk } from './locales/uk.js';
import { ar } from './locales/ar.js';
import { fa } from './locales/fa.js';

const LOCALES: Record<SupportedLocale, Translations> = { de, en, tr, uk, ar, fa };

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
  return locale === 'ar' || locale === 'fa';
}

/**
 * Erkennt die bevorzugte Locale des Browsers,
 * begrenzt auf unterstützte Locales.
 */
export function detectLocale(): SupportedLocale {
  const supported: SupportedLocale[] = ['de', 'en', 'tr', 'ar', 'uk', 'fa'];
  const nav = (globalThis as unknown as { navigator?: { languages?: readonly string[]; language?: string } }).navigator;
  const browserLangs = nav ? (nav.languages ?? (nav.language ? [nav.language] : ['de'])) : ['de'];

  for (const lang of browserLangs) {
    const base = lang.split('-')[0]?.toLowerCase() as SupportedLocale;
    if (supported.includes(base)) return base;
  }

  return 'de';
}

export type { Translations } from './schema.js';
