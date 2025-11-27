// components/LanguageToggle.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { OptionComponent, SelectComponent } from "@/features/ui/Select";

const LanguageToggle = ({setLangState, langState}) => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event) => {
    const newLang = event.target.value || "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang); // 👈 persist language
  };

  return (
    <SelectComponent
     langState={langState}
     setLangState={setLangState}
      value={i18n.language}
      onChange={handleLanguageChange}

      className="mx-0 px-0 border-none focus:ring-0 text-xs sm:text-base"
    >
      <OptionComponent value="en">🇺🇸 En</OptionComponent>
      <OptionComponent value="np">🇳🇵 Np</OptionComponent>
    </SelectComponent>
  );
};

export default LanguageToggle;
