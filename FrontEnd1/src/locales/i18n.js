import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import np from "./np.json";

const savedLang = localStorage.getItem("lang") || "en";


i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    np: { translation: np }
  },
  lng: savedLang, // default language
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
