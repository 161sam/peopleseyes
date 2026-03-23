/**
 * Native Locale-Erkennung für React Native (iOS + Android).
 *
 * React Native hat kein `navigator.languages` – stattdessen
 * `expo-localization` (getLocales()) verwenden.
 *
 * Diese Datei überschreibt die Web-Implementierung von detectLocale()
 * für den nativen Kontext.
 */

import * as Localization from 'expo-localization';
import type { SupportedLocale } from '@peopleseyes/core-model';
import { getTranslations, isRtlLocale } from '@peopleseyes/core-i18n';
import type { Translations } from '@peopleseyes/core-i18n';

const SUPPORTED: SupportedLocale[] = ['de', 'en', 'tr', 'ar', 'uk', 'fa'];

/**
 * Erkennt die bevorzugte Geräte-Locale.
 * Fallback: 'de'.
 */
export function detectNativeLocale(): SupportedLocale {
  const locales = Localization.getLocales();
  for (const loc of locales) {
    const base = loc.languageCode?.toLowerCase() as SupportedLocale | undefined;
    if (base && SUPPORTED.includes(base)) return base;
  }
  return 'de';
}

/**
 * Gibt zurück ob die aktuelle Geräte-Locale RTL ist.
 */
export function isNativeRtl(): boolean {
  return isRtlLocale(detectNativeLocale());
}

/**
 * Gibt das Sprach-Tag im BCP 47-Format zurück (z.B. "de-DE", "ar-SA").
 * Für React Native `<Text>` und Accessibility-Attribute.
 */
export function getNativeLanguageTag(): string {
  const locales = Localization.getLocales();
  return locales[0]?.languageTag ?? 'de-DE';
}

export function useI18n(locale?: SupportedLocale): { t: Translations; locale: SupportedLocale; rtl: boolean } {
  const effectiveLocale = locale ?? detectNativeLocale();
  return {
    t: getTranslations(effectiveLocale),
    locale: effectiveLocale,
    rtl: isRtlLocale(effectiveLocale),
  };
}
