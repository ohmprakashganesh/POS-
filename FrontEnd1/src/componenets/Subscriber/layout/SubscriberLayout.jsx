import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '../../../contexts/AuthContext';

import Header from './Header';

const SubscriberLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="flex h-screen w-full ">
  {/* Sidebar */}
  <div className="lg:fixed md:fixed flex    bg-green-100 lg:w-[16%] h-full">
    <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
  </div>

  {/* Main Content */}
  <div className="flex flex-col  lg:ml-[16%] w-[100%]  md:w-[100%] lg:w-[84%] xl:w-[84%]  h-screen bg-[#F5F5F5]">
    {/* Header */}
    <div className="shrink-0">
      <Header onMenuClick={() => setSidebarOpen(true)} user={user} />
    </div>

    {/* Scrollable children area */}
    <div className="flex-1 overflow-y-auto px-2 py-3">
      {children}
    </div>
  </div>

      {/* <div className=" fixed md:ml-[20%] lg:ml-[20%] xl:ml-[20%] w-[100%]  flex-col overflow-hidden"> */}
        {/* Main content area */}
        {/* <main className="flex-1 relative lg:px-12 overflow-auto p-4 md:p-6"> */}
                {/* <main className="flex-1 " >
          {children}
        </main> */}
      {/* </div> */}
      
    </div>
  );
};

export default SubscriberLayout;