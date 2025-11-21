import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import sen from "./SubscriberEn.json";
import snp from "./SubscriberNp.json";
import cen from "./CashierEn.json";
import cnp from "./CashierNe.json";
import fnp from "./FormNe.json";
import fen from "./FormEn.json";

const savedLang = localStorage.getItem("lang") || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      subscriber: sen,
      cashier: cen,
        form: fen,   // ✅ cashier namespace for English
    },
    np: {
      subscriber: snp,
      cashier: cnp,
      form:fnp,   // ✅ cashier namespace for Nepali
    },
  },
  lng: savedLang,
  fallbackLng: "en",
  ns: ["subscriber", "cashier","form"], // ✅ declare namespaces
  defaultNS: "subscriber",
  interpolation: { escapeValue: false },
});
export default i18n;
