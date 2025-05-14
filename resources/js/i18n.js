import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import common_fr from './locales/fr/common.json';
import common_ar from './locales/ar/common.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { common: common_fr },
      ar: { common: common_ar },
    },
    fallbackLng: 'fr',
    supportedLngs: ['fr','ar'],
    ns: ['common'],
    defaultNS: 'common',
    detection: {
      order: ['localStorage','navigator'],
      caches: ['localStorage'],
    },
    react: { useSuspense: false },
  });

export default i18n;
