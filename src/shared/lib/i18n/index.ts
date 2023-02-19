import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { DE, EN, RU } from './locales'

const DEFAULT_LANGUAGE_CODE = import.meta.env.VITE_DEFAULT_LANGUAGE_CODE

// the translations
const resources = {
  en: {
    translation: EN,
  },
  de: {
    translation: DE,
  },
  ru: {
    translation: RU,
  },
}

declare module 'react-i18next' {
  // and extend them!
  interface CustomTypeOptions {
    // // custom namespace type if you changed it
    defaultNS: typeof DEFAULT_LANGUAGE_CODE
    // custom resources type
    resources: {
      en: typeof EN
      de: typeof DE
      ru: typeof RU
    }
  }
}

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: DEFAULT_LANGUAGE_CODE,
    supportedLngs: ['de', 'en', 'ru'],
    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },

    debug: false,

    // react-i18next options
    react: {
      useSuspense: true,
    },
  })

export { i18n }
