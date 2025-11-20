import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { useNotifications } from '../../../contexts/NotificationContext';
import {
  BellIcon,
  Bars3Icon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import LanguageToggle from '@/locales/LanguageToggle';
import NotificationScreen from '../pages/notification/Notification';
import { LogOutIcon, Moon, Sun } from 'lucide-react';
// UPDATED import: point to your ThemeContext provider hook
import { useTheme } from '@/contexts/ThemeContext';
import ThemeButton from '@/features/ui/ThemeButton';

const Header = ({ onMenuClick, user }) => {
  // now useTheme returns { theme, setTheme, toggleTheme }
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation('cashier');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { unreadCount, markAsRead } = useNotifications();
  const { logout } = useAuth();
  const [notification, setNotification] = useState(false);

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
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white dark:bg-dark shadow-sm border-b border-muted/40">
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
              {t('general.dashboard')}
            </h1>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2">
          <ThemeButton/>
          <LanguageToggle />
          {/* Notifications */}
          <div ref={buttonRef} className="relative">
            <button
              onClick={() => {
                markAsRead();
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
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center space-x-1 text-sm focus:outline-none"
            >
              <UserCircleIcon className="h-8 w-8 text-gray-400 dark:text-gray-300" />
              <div className="hidden md:block text-left">
                <div className="text-gray-700 dark:text-gray-200 text-sm">
                  {user?.role}
                </div>
              </div>
            </button>

            {userMenuOpen && (
             <div className="absolute right-0 mt-4 w-48 bg-white dark:bg-dark rounded-md hover:bg-muted/10 shadow-lg py-1 z-50">
                             <div className='flex flex-row justify-start py-2 gap-2 hover:bg-muted/10 dark:text-muted-hover  text-muted-hover  px-5'>
                                <LogOutIcon/> 
                               <button
                               onClick={logout}
                               className="block w-full text-left  text-sm "
                             >
                              Sign out
                             </button>
                             </div>
                            
                           </div>
            )}
          </div>
        </div>
      </div>

      {notification && (
        <div
          ref={panelRef}
          className="absolute md:w-2/6 lg:w-2/7 w-full bg-white dark:bg-gray-800 right-1 top-17 z-40 flex justify-end border border-gray-200 dark:border-gray-700"
        >
          <NotificationScreen />
        </div>
      )}
    </header>
  );
};

export default Header;
