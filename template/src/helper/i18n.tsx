import i18n from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import I18NextXhrBackend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";

i18n.use(I18NextXhrBackend)
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init({
        lng: 'th',
        fallbackLng: 'th',
        ns: ['translations'],
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        }

    });
export default i18n;