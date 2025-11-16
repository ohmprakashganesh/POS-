// components/LanguageToggle.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { SelectComponent,OptionComponent  } from "@/features/ui/Select";

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "np" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang); // 👈 persist language
  };

  return (
    <SelectComponent
  value={i18n.language}
  onChange={toggleLanguage}
  className="  text-sm  min-w-[25px]"
>
  <OptionComponent className="w-fit" value="en">English</OptionComponent>
  <OptionComponent className="w-fit " value="np">नेपाली</OptionComponent>
</SelectComponent>
  );
};
export default LanguageToggle;
