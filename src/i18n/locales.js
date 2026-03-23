/**
 * Supported locales configuration.
 * Used by LanguageSwitcher and the i18n init config.
 */
export const LOCALES = [
  {
    code: 'en',
    label: 'English',
    nativeLabel: 'English',
    flag: '🇺🇸',
    dir: 'ltr',
  },
  {
    code: 'fr-CA',
    label: 'French (Canadian)',
    nativeLabel: 'Français',
    flag: '🇨🇦',
    dir: 'ltr',
  },
  {
    code: 'es',
    label: 'Spanish',
    nativeLabel: 'Español',
    flag: '🇪🇸',
    dir: 'ltr',
  },
  {
    code: 'hi',
    label: 'Hindi',
    nativeLabel: 'हिन्दी',
    flag: '🇮🇳',
    dir: 'ltr',
  },
  {
    code: 'ar',
    label: 'Arabic',
    nativeLabel: 'العربية',
    flag: '🇸🇦',
    dir: 'rtl',
  },
];

export const RTL_LOCALES = new Set(
  LOCALES.filter((l) => l.dir === 'rtl').map((l) => l.code)
);
