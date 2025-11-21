// import React from 'react';
// import { href, Link, useLocation } from 'react-router-dom';
// import { 
//   HomeIcon, 
//   ShoppingCartIcon, 
//   CubeIcon, 
//   UsersIcon, 
//   DocumentTextIcon,
//   ChartBarIcon,
//   CreditCardIcon,
//   XMarkIcon
// } from '@heroicons/react/24/outline';
// import { useTranslation } from 'react-i18next';
// import { ComputerIcon, CurrencyIcon, icons, ShoppingBasketIcon, TypeIcon, UserIcon } from 'lucide-react';



// const Sidebar = ({ isOpen, onClose }) => {
//   const {t}= useTranslation("cashier");
//     const navigation = [
//   { name: t("general.pos"), href: '/', icon: HomeIcon },
//   { name: t("general.products"), href: '/c-products', icon:ComputerIcon },
//   { name: t("general.customers"), href: '/c-customers', icon: UsersIcon },
//    { name: t("general.cart"), href: '/c-cart', icon: ShoppingCartIcon },
//   { name: t("general.history"), href: '/c-orders', icon: ShoppingBasketIcon }

// ];
//  const location = useLocation();
//   return (
//     <>
//       {/* Mobile overlay */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-gray-900/80 z-40 lg:hidden"
//           onClick={onClose}
//         />
//       )} 
//       {/* Sidebar */}
//       <div className={`
//         fixed inset-y-0 left-0 z-50 w-54 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
//         ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0
//       `}>
//         <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
//           <div className="flex items-center">
//             <ShoppingCartIcon className="h-8 w-8 text-blue-600" />
//             <span className="ml-2 text-xl font-bold text-gray-900">POS System</span>
//           </div>
//           <button
//             onClick={onClose}
//             className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
//           >
//             <XMarkIcon className="h-6 w-6" />
//           </button>
//         </div>
        
//         <nav className="mt-8 px-4 space-y-2">
//           {navigation.map((item) => {
//             const isActive = location.pathname === item.href;
//             return (
//               <Link
//                 key={item.name}
//                 to={item.href}
//                 className={`
//                   group flex  items-center z-50 px-4 py-3 hover:[letter-spacing:2px,font:bold] text-sm font-medium rounded-lg transition-colors
//                   ${isActive 
//                     ? 'bg-primary text-muted-foreground  [letter-spacing:2px]  ' 
//                     : 'text hover:bg-gray-50  hover:text-gray-900'
//                   }
//                 `}
//                 onClick={() => window.innerWidth < 1024 && onClose()}
//               >
//                 <item.icon className={`
//                   mr-3 h-5 w-5 flex-shrink-0
//                   ${isActive ? 'text-muted-foreground' : 'text-gray-400 group-hover:text-gray-600'}
//                 `} />
//                 {item.name}
//               </Link>
//             );
//           })}
//         </nav>
//       </div>
//     </>
//   );
// };
// export default Sidebar;


import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  ShoppingCartIcon, 
  UsersIcon, 
  XMarkIcon
} from '@heroicons/react/24/outline';

import { ShoppingBasketIcon, ComputerIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Sidebar = ({ isOpen, onClose }) => {
  const { t } = useTranslation("cashier");

  const navigation = [
    { name: t("general.pos"), href: '/', icon: HomeIcon },
    { name: t("general.products"), href: '/c-products', icon: ComputerIcon },
    { name: t("general.customers"), href: '/c-customers', icon: UsersIcon },
    { name: t("general.cart"), href: '/c-cart', icon: ShoppingCartIcon },
    { name: t("general.history"), href: '/c-orders', icon: ShoppingBasketIcon }
  ];

  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-54 
        bg-white dark:bg-dark  
        shadow-xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 
           border-muted/40 dark:border-gray-700 ">
          <div className="flex items-center">
            <ShoppingCartIcon className="h-8 w-8 text-dark dark:text-white font-bold" />
            <span className="ml-2 text-2xl font-bold">
             Smart Bill
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-muted hover:text-muted-hover dark:text-gray-300 dark:hover:text-gray-100"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        {/* Nav */}
        <nav className="mt-8 px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;

            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  group flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors
                    ${
                      isActive
                        ? "bg-primary/20 text-primary dark:text-white"
                        : "text-muted hover:bg-background hover:text-foreground"
                    }
                `}
                onClick={() => window.innerWidth < 1024 && onClose()}
              >
                <item.icon 
                  className={`
                    mr-3 h-5 w-5 shrink-0
                 
                  `}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
