// components/LanguageToggle.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react"; // optional icon
import { LanguageIcon } from "@heroicons/react/24/outline";
import { OptionComponent, SelectComponent } from "@/features/ui/Select";

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event) => {
    const newLang=event.target.value || "en"
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang); // 👈 persist language
  };

  return (
    <SelectComponent
  value={i18n.language}
  onChange={handleLanguageChange}
  className="  text-sm  min-w-[25px]"
>
  <OptionComponent className="w-fit" value="en">English</OptionComponent>
  <OptionComponent className="w-fit " value="np">नेपाली</OptionComponent>
</SelectComponent>
  );
};
export default LanguageToggle;
