import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useNotifications } from '../../../contexts/NotificationContext';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  BellIcon,
  Bars3Icon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { LogOutIcon, Moon, Sun } from 'lucide-react';
import NotificationScreen from '../notifications/NotificationScreen';import { useNavigate } from 'react-router-dom';
import { tr } from 'zod/v4/locales';



const Header = ({ onMenuClick, user }) => {
  const navigate= useNavigate();
  const{theme,setTheme}=useTheme();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { unreadCount, markAsRead } = useNotifications();
  const { logout } = useAuth();
  const[notification,setNotification]=useState(false);
    const[nState,setNState]= useState(false);
      const[lState,setLState]= useState(false);
  
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
    <header className="bg-white dark:bg-dark shadow-sm z-50">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        {/* Left section */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-muted-hover hover:text-shadow-muted-hover"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <div className="ml-4 lg:ml-0" >
            <h1 className="text-3xl  text-dark dark:text-white mask- font-bold " >Dashboard</h1>
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
                         setNState(true);
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
                             <div className="relative">
                                       <button
                                   onClick={() => {setUserMenuOpen(!userMenuOpen), setLState(true)}}
                                   className="flex items-center space-x-3 text-sm focus:outline-none"
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
        {lState &&(
          <div className={`fixed w-[140px] right-0 top-16   bg-white dark:bg-dark rounded-md shadow-md py-1 origin-top-right  ${userMenuOpen ?"animate-fade-slide-down":"animate-fade-slide-up"}   z-40 `}>
            <div className="flex items-center text-destructive text-sm gap-2 px-4 py-2">
              <LogOutIcon size={18} />
              <button onClick={logout} className="text-left w-full">
              Log Out
              </button>
            </div>
          </div>
        ) }
      
     {nState &&(
  <div
    ref={panelRef}
    className={`fixed ${notification ?" animate-fade-slide-in":"animate-fade-slide-out"}  w-full md:max-w-80 h-[calc(100dvh-65px)] bg-white dark:bg-dark right-0 bottom-0 z-100`}
  >
    <NotificationScreen />
  </div>
) }

    </header>
  );
};

export default Header;