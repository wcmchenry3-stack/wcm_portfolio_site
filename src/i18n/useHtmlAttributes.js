import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RTL_LOCALES } from './locales.js';

/**
 * Keeps <html lang> and <html dir> in sync with the active i18next locale.
 * Call once inside a component that is mounted inside I18nextProvider.
 *
 * index.html keeps lang="en" as a static fallback for crawlers and
 * server-side rendering; this hook overwrites it once JS has loaded
 * and i18next has detected the user's preferred locale.
 */
export function useHtmlAttributes() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const locale = i18n.language;
    document.documentElement.setAttribute('lang', locale);
    document.documentElement.setAttribute(
      'dir',
      RTL_LOCALES.has(locale) ? 'rtl' : 'ltr'
    );
  }, [i18n.language]);
}
