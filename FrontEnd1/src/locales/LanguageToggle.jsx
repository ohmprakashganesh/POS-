// components/LanguageToggle.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react"; // optional icon
import { LanguageIcon } from "@heroicons/react/24/outline";
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
  className=" bg-white text-sm w-fit min-w-[25px]"
>
  <OptionComponent className="w-fit p-5" value="en">English</OptionComponent>
  <OptionComponent value="np">नेपाली</OptionComponent>
</SelectComponent>
  );
};
export default LanguageToggle;
