import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useNotifications } from '../../../contexts/NotificationContext';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  BellIcon,
  Bars3Icon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { Moon, Sun } from 'lucide-react';
import NotificationScreen from '../notifications/NotificationScreen';

const Header = ({ onMenuClick, user }) => {
  const{theme,setTheme}=useTheme();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { unreadCount, markAsRead } = useNotifications();
  const { logout } = useAuth();
  const[notification,setNotification]=useState();
  
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
    <header className="bg-background shadow-sm border-b border-muted/40">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        {/* Left section */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-muted-hover hover:text-shadow-muted-hover"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <div className="ml-4 lg:ml-0">
            <h1 className="text-xl mask- font-bold  text-muted-hover">Dashboard</h1>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
           <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            // alternatively: onClick={toggleTheme}
            className="p-2 rounded-full bg-muted/10 dark:bg-gray-700"
          >
            <Sun className="h-5 w-5 dark:hidden" />
            <Moon className="h-5 w-5 hidden dark:block" />
          </button>
          {/* Notifications */}
          <div ref={buttonRef} className="relative">
                     <button
                       onClick={() => {
                         markAsRead();
                         setNotification((prev) => !prev);
                       }}
                       className="p-2 rounded-full bg-muted/10 dark:bg-gray-700 relative"
                     >
                       <BellIcon className="h-5 w-5 " />
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
              className="flex items-center space-x-3 text-sm focus:outline-none"
            >
              <UserCircleIcon className="h-8 w-8 text-muted-hover" />
              <div className="hidden md:block text-left">
                <div className="font-medium text-gray-900 text-muted-hover">{user?.name}</div>
                <div className=" text-xs">{user?.role}</div>
              </div>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
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