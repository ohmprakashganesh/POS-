// import React, { useState } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import Sidebar from './Sidebar';
// import Header from './Header';


// const Layout = ({ children }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { user } = useAuth();

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}

//       {}
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
//       {/* Main content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header onMenuClick={() => setSidebarOpen(true)} user={user} />
        
//         {/* Main content area */}
//         <main className="flex-1 overflow-auto p-4 md:p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;