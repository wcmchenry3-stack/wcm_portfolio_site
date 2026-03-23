import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from '../../public/locales/en/common.json';
import enHome from '../../public/locales/en/home.json';
import enResume from '../../public/locales/en/resume.json';

/**
 * Synchronous i18next instance for use in Vitest tests.
 *
 * Uses bundled English resources so tests never hit the network.
 * Falls back to 'en' for any untranslated locale — tests can call
 * i18n.changeLanguage('fr-CA') to exercise locale-specific logic
 * (e.g. Intl.DateTimeFormat month names) while still getting
 * English fallback strings for untranslated keys.
 */
i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common', 'home', 'resume'],
  defaultNS: 'common',
  resources: {
    en: {
      common: enCommon,
      home: enHome,
      resume: enResume,
    },
  },
  interpolation: { escapeValue: false },
});

export default i18n;
