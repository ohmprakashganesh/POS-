import React, { useRef, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { useNotifications } from "../../../contexts/NotificationContext";
import {
  BellIcon,
  Bars3Icon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

import { Link, useNavigate } from "react-router-dom";
import LanguageToggle from "@/locales/LanguageToggle";
import { LogOut, X } from "lucide-react";
import ThemeButton from "@/features/ui/ThemeButton";
import NotificationScreen from "../pages/notification/Notification";
import { tr } from "zod/v4/locales";
const Header = ({ openSidebar }) => {
    const buttonRef = useRef(null);
    const panelRef = useRef(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { logout, user } = useAuth();
   const { unreadCount, markAsRead } = useNotifications();
    const [notification, setNotification] = useState(false);
    const[nState,setNState]= useState(false);
  const[lState,setLState]= useState(false);
  const [langState,setLangState]=useState(false);



  return (
    <header className="h-16 bg-white dark:bg-dark shadow-sm flex items-center justify-between px-2 sm:px-5 sticky top-0 z-10">
      {/* Left section */}
      <div className="flex items-center gap-2">
        <button
          onClick={openSidebar}
          className="lg:hidden  rounded-md text-muted hover:text-muted-hover"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold whitespace-nowrap">{user.name}</h1>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        <ThemeButton/>
          <LanguageToggle setLangState={setLangState} langState={langState} />
          
           <div ref={buttonRef} className="relative">
                     <button
                       onClick={() => {
                         markAsRead();
                         setNotification((prev) => !prev);
                         setNState(true);
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
            onClick={() =>{setUserMenuOpen(!userMenuOpen) ,setLState(true) }}
            className="flex items-center space-x-3 text-sm focus:outline-none"
          >
            <UserCircleIcon className="h-8 w-8 text-muted" />
            <div className="hidden md:block text-left">
              <p className="font-medium text-nowrap">{user?.name}</p>
              <p className="text-muted text-xs">{user?.role}</p>
            </div>
          </button>
          {lState && (
            <>
              <div
                className="overlay fixed  z-0"
                onClick={() => setUserMenuOpen(false)}
              />
              <div className={`fixed md:w-[240px]  w-[50%] right-3 top-16 bg-white  dark:bg-dark rounded-md shadow-md py-1 origin-top-right ${userMenuOpen ? "animate-fade-slide-down":"animate-fade-slide-up"}  z-40`}>
                <X
                  className="absolute right-2 top-2 size-8 p-1.5  rounded-full hover:bg-background"
                  onClick={() => setUserMenuOpen(false)}
                />
                <div className="px-4">
                  <div className="flex items-center gap-2">
                    <div className="size-10 bg-primary text-primary-foreground rounded-full capitalize flex items-center justify-center text-lg font-bold">
                      {user?.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate capitalize">
                        {user?.name}
                      </h3>
                      <p className="text-sm font-light truncate">
                        {user?.role}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={()=>{navigate("/profile"),setUserMenuOpen(false)}}
                  className="w-full mt-2 justify-start rounded-lg flex items-center px-4 py-2 gap-2 font-semibold hover:bg-background "
                >
                  <UserCircleIcon className="size-7" /> Profile
                </button>

                <button
                  onClick={logout}
                  className="px-4 py-2  rounded-lg w-full flex gap-2 font-semibold items-center justify-start hover:bg-background text-destructive"
                >
                  <LogOut />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>

     {nState && (
  <div
    ref={panelRef}
    className={`fixed w-full md:max-w-80 h-[calc(100dvh-65px)] bg-white dark:bg-dark right-0 bottom-0 z-100 ${
      notification ? "animate-fade-slide-in" : "animate-fade-slide-out"
    }`}
  >
    <NotificationScreen />
  </div>
)}

     
    </header>
  );
};

export default Header;
