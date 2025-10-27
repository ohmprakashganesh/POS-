import React, { useState } from 'react';
import { href, Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  ShoppingCartIcon, 
  CubeIcon, 
  UsersIcon, 
  DocumentTextIcon,
  ChartBarIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { BanknoteIcon, BookAIcon, HelpingHandIcon, MoveRightIcon, Settings2Icon, SettingsIcon, UserIcon, VideotapeIcon } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/subscriber', icon: HomeIcon },
  { name: 'Items', href: '/products', icon: CubeIcon },
  {name:'Categories', href:'/categories',icon:BookAIcon},
   {name:'Vendors', href:'/vendors',icon:UserIcon},
  {name:'Cashiers', href:'/cashierList',icon:UserIcon},
  { name: 'Customers', href: '/customers', icon: UsersIcon },
  { name: 'Transactions', href: '/transactions', icon: DocumentTextIcon },
  { name: 'Reports', href: '/reports/sales', icon: ChartBarIcon },
];
const settings = [
    {name:'Active-plan', href:'/subscription',icon:Settings2Icon},
    { name:'Help',href:'/support',icon:HelpingHandIcon},
     { name:'update-Profile',href:'/update-profile',icon:UserIcon},
     {name:'Tutorials', href:'/youtube.com',icon:VideotapeIcon}

    
];


const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();


  const [setting,setSetting]=useState(false);
const setToggle=()=>{
  setSetting(!setting);
  alert(setting);
}
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/80 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 h-fit lg:w-full  w-[20%]  z-50  bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <ShoppingCartIcon className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">POS System</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="mt-4 px-4 h-screen space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  group flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
                onClick={() => window.innerWidth < 1024 && onClose()}
              >
                <item.icon className={`
                  mr-3 h-5 w-5 flex-shrink-0
                  ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}
                `} />
                {item.name}
              </Link>
            );
          })}

          <button
        onClick={() => setSetting(!setting)}
        className="flex gap-2 px-4 py-2 text-sm w-full text-gray-600 border-t border-black font-medium transition-colors hover:bg-gray-50"
      >
        <SettingsIcon className="mr-3 h-5 w-5 flex-shrink-0" />
        <p>Settings</p>
      </button>

      {/* Dropdown menu */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          setting ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {settings.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center pl-7 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              onClick={() => window.innerWidth < 1024 && onClose?.()}
            >
              <item.icon
                className={`mr-3 h-5 w-5 flex-shrink-0 ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-400 group-hover:text-gray-600"
                }`}
              />
              {item.name}
            </Link>
          );
        })}
      </div>
            
        </nav>
      </div>
    </>
  );
};

export default Sidebar;