import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { useAuth } from '../../../contexts/AuthContext';


const CashierLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-background dark:bg-black">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} user={user} />
        
        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
       <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default CashierLayout;