import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  HomeIcon,
  ShoppingCartIcon,
  CubeIcon,
  UsersIcon,
  DocumentTextIcon,
  ChartBarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  BanknoteIcon,
  BookAIcon,
  HelpingHandIcon,
  MoveRightIcon,
  Settings2Icon,
  SettingsIcon,
  UserIcon,
  VideotapeIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = ({closeSidebar,className=""}) => {
  const { t } = useTranslation();
  const navigation = [
    { name: t("subscriber.Dashboard"), href: "/subscriber", icon: HomeIcon },
    { name: t("subscriber.Items"), href: "/products", icon: CubeIcon },
    { name: t("subscriber.Categories"), href: "/categories", icon: BookAIcon },
    { name: t("subscriber.Vendors"), href: "/vendors", icon: UserIcon },
    { name: t("subscriber.Cashiers"), href: "/cashierList", icon: UserIcon },
    { name: t("subscriber.Customers"), href: "/customers", icon: UsersIcon },
    {
      name: t("subscriber.Transactions"),
      href: "/transactions",
      icon: DocumentTextIcon,
    },
    {
      name: t("subscriber.Reports"),
      href: "/reports/sales",
      icon: ChartBarIcon,
    },
  ];
  const settings = [
    {
      name: t("settings.ActivePlan"),
      href: "/subscription",
      icon: Settings2Icon,
    },
    { name: t("settings.Help"), href: "/help", icon: HelpingHandIcon },
    {
      name: t("settings.UpdateProfile"),
      href: "/update-profile",
      icon: UserIcon,
    },
    {
      name: t("settings.Tutorials"),
      href: "/youtube.com",
      icon: VideotapeIcon,
    },
  ];
  function handleLinkCLick(){
    if(window.innerWidth<1024){
      closeSidebar()
    }
  }

  const [isSettingOpen, setIsSettingOPen] = useState(false);
  const handleSettingToggle = () => {
    setIsSettingOPen(!isSettingOpen);
  };
  return (
      <aside className={cn("min-w-70 overflow-y-auto max-w-80 h-screen bg-white shadow-sm",className)}>
        <div className="flex items-center justify-start h-16 px-4">
          <ShoppingCartIcon className="h-8 w-8 text-primary" />
          <span className="ml-2 text-xl font-bold">POS System</span>
        </div>
        <nav className="h-[calc(100dvh-64px)] p-4  space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => `
                    group flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors
                    ${
                      isActive
                        ? "bg-primary/20 text-primary"
                        : "text-muted hover:bg-background hover:text-foreground"
                    }
                  `}
                  onClick={handleLinkCLick}
            >
              <item.icon
                className="mr-3 h-5 w-5 shrink-0 "/>
              {item.name}
            </NavLink>
          ))}

          <button
            onClick={handleSettingToggle}
            className="flex gap-2 px-4 py-2.5 text-sm w-full rounded-md text-muted hover:text-foreground font-medium transition-colors hover:bg-background"
          >
            <SettingsIcon className="mr-3 h-5 w-5 shrink-0" />
            <p>{t("settings.title")}</p>
          </button>

          {/* Dropdown menu */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isSettingOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {settings.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  `group flex items-center pl-7 py-2.5 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "bg-primary/20 text-primary"
                      : "text-muted hover:bg-background hover:text-foreground"
                  }`
                }
                key={item.name}
                to={item.href}

                onClick={handleLinkCLick}
              >
                <item.icon className="mr-3 h-5 w-5 shrink-0" />
                {item.name}
              </NavLink>
            ))}
          </div>
          
        </nav>
      </aside>
    );
  };

export default Sidebar;
