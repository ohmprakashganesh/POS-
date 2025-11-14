import React, { useCallback, useState } from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '../../../contexts/AuthContext';

import Header from './Header';
import { Outlet } from 'react-router-dom';

const SubscriberLayout = () => {
  const [isSidebarOpen, setisSidebarOpen] = useState(false);
  const { user } = useAuth();
  const openSidebar=useCallback(()=>{setisSidebarOpen(true)},[])
  const closeSidebar=useCallback(()=>{setisSidebarOpen(false)},[])

  return (
    <div className="flex h-screen w-screen overflow-hidden">

      {/* mobile sidebar  */}
      <div className="mobile-sidebar lg:hidden">
        <Sidebar closeSidebar={closeSidebar} className={`fixed  z-100  lg:hidden transition-all duration-300 ${isSidebarOpen ? "translate-x-0":"-translate-x-full"}`}/>
       <div className={`overlay fixed inset-0 h-screen w-screen bg-black/40 z-50 lg:hidden  transition-opacity duration-300 ${isSidebarOpen ? "opacity-100": "pointer-events-none opacity-0"}`} onClick={closeSidebar}/>
      </div>

      {/* Sidebar */}
      <Sidebar className="hidden lg:block"/>
      
      {/* Main content */}
      <main className="grow overflow-y-auto">
         <Header user={user}  openSidebar={openSidebar}/>
          <div className="outlet p-2 sm:px-5">
            <Outlet/>
          </div>
        </main>
    </div>
  );
};

export default SubscriberLayout;