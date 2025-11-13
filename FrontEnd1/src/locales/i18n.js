import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import np from "./np.json";
import cen from "./CashierEn.json";
import cnp from "./CashierNe.json";

const savedLang = localStorage.getItem("lang") || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      subscriber: en,
      cashier: cen,   // ✅ cashier namespace for English
    },
    np: {
      subscriber: np,
      cashier: cnp,   // ✅ cashier namespace for Nepali
    },
  },
  lng: savedLang,
  fallbackLng: "en",
  ns: ["subscriber", "cashier"], // ✅ declare namespaces
  defaultNS: "subscriber",
  interpolation: { escapeValue: false },
});

export default i18n;
