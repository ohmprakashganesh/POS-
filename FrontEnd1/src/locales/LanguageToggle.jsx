// components/LanguageToggle.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react"; // optional icon

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "np" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang); // 👈 persist language
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm transition duration-150"
    >
      <Languages size={16} />
      {i18n.language === "en" ? "नेपाली" : "English"}
    </button>
  );
};

export default LanguageToggle;
