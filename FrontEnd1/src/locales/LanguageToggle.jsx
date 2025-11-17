// components/LanguageToggle.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react"; // optional icon
import { LanguageIcon } from "@heroicons/react/24/outline";
import { OptionComponent, SelectComponent } from "@/componenets/ui/Select";

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event) => {
    const newLang=event.target.value || "en"
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang); // 👈 persist language
  };

  return (
    <SelectComponent value={i18n.language} onChange={handleLanguageChange} className="border-none  focus:ring-0 text-xs sm:text-base ml-3">
      <OptionComponent value="en">🇺🇸 En</OptionComponent>
      <OptionComponent value="np">🇳🇵 Np</OptionComponent>
    </SelectComponent>
  );
};

export default LanguageToggle;
