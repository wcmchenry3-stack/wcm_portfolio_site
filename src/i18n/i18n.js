import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { LOCALES } from './locales.js';
import { translationsEnabled } from '../config/features.js';

// With translations flagged off, pin English: `lng` overrides both the
// browser language and a locale a visitor saved before the flag changed.
const enabled = translationsEnabled();

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: enabled ? LOCALES.map((l) => l.code) : ['en'],
    ...(enabled ? {} : { lng: 'en' }),
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'home', 'resume'],
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18n-locale',
    },
    interpolation: {
      escapeValue: false, // React already escapes output
    },
  });

export default i18n;
