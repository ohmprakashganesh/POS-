import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { useNotifications } from "../../../contexts/NotificationContext";
import {
  BellIcon,
  Bars3Icon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import LanguageToggle from "@/locales/LanguageToggle";
import NotificationScreen from "../pages/notification/Notification";
import { LogOutIcon, Moon, Sun } from "lucide-react";
// UPDATED import: point to your ThemeContext provider hook
import { useTheme } from "@/contexts/ThemeContext";
import ThemeButton from "@/features/ui/ThemeButton";
import { tr } from "zod/v4/locales";

const Header = ({ onMenuClick, user }) => {
  // now useTheme returns { theme, setTheme, toggleTheme }
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation("cashier");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { logout } = useAuth();
  const { unreadCount, markAsRead } = useNotifications();
  const [notification, setNotification] = useState(false);
   const[nState,setNState]= useState(false);
  const[logState,setLogState]= useState(false);
   const[langState,setLangState]= useState(false);

  

  const buttonRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        panelRef.current &&
        !panelRef.current.contains(event.target)
      ) {
        setNotification(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white dark:bg-dark shadow-sm bor z-50 border-muted/40">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        {/* Left section */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md  dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <div className="ml-4 lg:ml-0">
            <h1 className="text-3xl  text-dark dark:text-white mask- font-bold ">
              {t("general.dashboard")}
            </h1>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center z-50 space-x-2">
          <ThemeButton />
          <LanguageToggle setLangState={setLangState} langState={langState} />
          {/* Notifications */}
          <div ref={buttonRef} className="relative">
            <button
              onClick={() => {
                markAsRead();
                setNState(true);
                setNotification((prev) => !prev);
              }}
              className="p-2 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 relative"
            >
              <BellIcon className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* User menu */}
  <div className="relative">
  <button
    onClick={() =>{ setUserMenuOpen(!userMenuOpen), setLogState(true)}}
    className="flex items-center space-x-3 text-sm focus:outline-none relative z-50"
  >
    <UserCircleIcon className="h-8 w-8 text-muted" />
    <div className="hidden md:block text-left">
      <p className="font-medium text-nowrap">{user?.name}</p>
      <p className="text-muted text-xs">{user?.role}</p>
    </div>
  </button>
</div>
        </div>
      </div>
        {logState && (
    <div className={`fixed w-[140px] right-0 top-16 ${userMenuOpen ?"animate-fade-slide-down":"animate-fade-slide-up"}   bg-white dark:bg-dark rounded-md shadow-md py-1 origin-top-right  z-40 `}>
      <div className="flex items-center text-destructive text-sm gap-2 px-4 py-2">
        <LogOutIcon size={18} />
        <button onClick={logout} className="text-left w-full">
          {t("general.logOut")}
        </button>
      </div>
    </div>
  ) }
      {nState &&(
        <div
          ref={panelRef}
    className={`fixed ${notification?"animate-fade-slide-in":"animate-fade-slide-out"}  w-full md:max-w-80 h-[calc(100dvh-65px)] bg-white dark:bg-dark right-0 bottom-0 z-100`}
        >
          <NotificationScreen />
        </div>
      )}
    </header>
  );
};

export default Header;
