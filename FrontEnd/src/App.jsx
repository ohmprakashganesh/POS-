import React from 'react'
import { useTranslation } from 'react-i18next'   // ✅ correct hook
import './App.css'

function App() {
  const { t, i18n } = useTranslation(); // ✅ correct usage

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "np" : "en");
  };

  return (
    <>
      <div>
        <h1>Wel come the Byte Gurkha</h1>
        <h2>First POS system</h2>
      </div>

      <div className="p-4">
        <h1>{t("welcome")}</h1>
        <button 
          onClick={toggleLanguage} 
          className="bg-blue-500 text-white p-2 rounded"
        >
          {t("toggle")}
        </button>
      </div>
    </>
  );
}

export default App;
