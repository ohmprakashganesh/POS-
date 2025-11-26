import React from 'react';
import {Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HomeIcon, 
  ShoppingCartIcon, 
  UsersIcon, 
  ChartBarIcon,
  CreditCardIcon,
  XMarkIcon,
  BuildingStorefrontIcon,
  BuildingOffice2Icon
} from '@heroicons/react/24/outline';
const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Manage-Subscriber', href: '/subscriberList', icon: UsersIcon },
  { name: 'Report', href: '/report', icon: ChartBarIcon },
  { name: 'Manage-plans', href: '/subscriptionPlans', icon: CreditCardIcon },
    { name: 'Support', href: '/support', icon: BuildingStorefrontIcon },
      { name: 'Companies', href: '/companies', icon: BuildingOffice2Icon },

   

];

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate=useNavigate();

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
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-65 bg-white dark:bg-dark  shadow-sm transform transition-transform duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex text-dark dark:text-white font-bold items-center cursor-pointer" onClick={()=>navigate("/admin")} >
            <ShoppingCartIcon className="h-8 w-8  " />
            <span className="ml-2 text-2xl  ">Smart Bill </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="mt-8 px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  group flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors
                  ${isActive 
                        ? "bg-primary/20 text-primary dark:text-white"
                        : "text-muted-ho dark:hover:bg-background  hover:bg-dark/15 hover:text-foreground"
                  }
                `}
                onClick={() => window.innerWidth < 1024 && onClose()}
              >
                <item.icon className={`
                  mr-3 h-5 w-5 flex-shrink-0
                  ${isActive
                        ? " text-primary"
                        : "text-muted hover:bg-background hover:text-foreground"
                  }
                `} />
                {item.name}
              </Link>
            );
          })}
        </nav>
         </aside>
      </>
   
  );
};

export default Sidebar;