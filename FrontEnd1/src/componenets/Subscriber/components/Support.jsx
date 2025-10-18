import React, { useState } from 'react';
import { User, Search, Bell, X, Maximize2, Users, BookOpen, Plus, Clipboard, Briefcase, Settings, AlignRight } from 'lucide-react';
import SupportForm from './SupportForm';
 
import { useAuth } from '@/contexts/AuthContext';

// Help topics data
const helpTopics = [
  { icon: User, title: ' Staff Management', description: 'managing employees',func:'field' },
  { icon: Users, title: 'Customers/Suppliers', description: 'Managing your customers & suppliers' },
  { icon: BookOpen, title: 'Inventory', description: 'Managing your products ' },
  { icon: User, title: 'Managing Party Details', description: 'View contact info, Performance Reports' },
  { icon: Search, title: 'Balances & Ledgers', description: 'Viewing outstanding amounts and transaction history' },
  { icon: Users, title: 'profile Update', description: 'Assigning to retail, wholesale, etc.' },
  { icon: Settings, title: 'Categorize Business', description: 'Applying business types to records' },
];

// Component for a single help card
const HelpCard = ({ icon: Icon, setField, title, description }) => (
  <div onClick={()=> setField(title)} className="bg-white p-4 rounded-xl shadow-md transition duration-300 ease-in-out hover:shadow-lg border  border-gray-100">
    <div className="mb-4">
      <Icon className="w-8 h-8 text-gray-700" />
    </div>
    <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
    <p className="text-sm text-gray-500">{description}</p>
  </div>
);

// Component for the top navigation bar
const Header = () => (
  <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
    <div className="flex justify-between items-center h-16 px-6">
      <div className="flex items-center space-x-4">
        <div className="text-xl font-bold text-gray-900">
          <span className="text-red-600">•</span> App Name
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative flex items-center bg-gray-50 border border-gray-300 rounded-lg w-full max-w-md h-10 px-3">
        <Search className="w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search or create anything..."
          className="flex-grow bg-transparent outline-none ml-2 text-sm placeholder-gray-500"
        />
        <div className="text-xs text-gray-500 font-medium border border-gray-300 rounded px-1 py-0.5 ml-2">
          Ctrl + K
        </div>
      </div>

      {/* Right Icons and User */}
      <div className="flex items-center space-x-4">
        <Maximize2 className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer" />
        <Bell className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer" />
        <div className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer">
          <Plus className="w-5 h-5" />
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            G
          </div>
          <span className="text-sm font-medium text-gray-800 hidden sm:inline">Gokul Joshi</span>
        </div>
      </div>
    </div>
  </header>
);

// Main Application component
const Support = () => {
    const [field, setField]=useState(null);
     if(field){
        alert(field);
     }

     const {user}= useAuth();
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 px-6 lg:px-12">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Help Topics for Party
        </h1>

        {/* Help Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {helpTopics.map((topic, index) => (
           
            <HelpCard key={index}   {...topic} setField={setField}  />
      
          ))}
        </div>
      </main>
      {field && (
      <SupportForm title={field} />
      )}
    </div>
  );
};

export default Support;