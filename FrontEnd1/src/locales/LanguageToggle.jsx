// components/LanguageToggle.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react"; // optional icon
import { LanguageIcon } from "@heroicons/react/24/outline";

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
      className="flex items-center rounded-md underline text-sm transition duration-150"
    >
      <LanguageIcon size={16} />
      {i18n.language === "en" ? "NE" : "EN"}
    </button>
  );
};

export default LanguageToggle;
