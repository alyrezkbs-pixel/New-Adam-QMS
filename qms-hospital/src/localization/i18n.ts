import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import translationAR from './ar/translation.json';
import translationEN from './en/translation.json';

// the translations
const resources = {
  ar: {
    translation: translationAR
  },
  en: {
    translation: translationEN
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'ar', // default language
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;