import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { LOCALES } from './locales.js';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: LOCALES.map((l) => l.code),
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
