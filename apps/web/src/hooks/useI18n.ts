import { useMemo } from 'react';
import type { SupportedLocale } from '@peopleseyes/core-model';
import { getTranslations } from '@peopleseyes/core-i18n';
import type { Translations } from '@peopleseyes/core-i18n';

export function useI18n(locale: SupportedLocale): { t: Translations } {
  const t = useMemo(() => getTranslations(locale), [locale]);
  return { t };
}
