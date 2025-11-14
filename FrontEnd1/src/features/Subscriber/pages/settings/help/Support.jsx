import React, { useEffect, useState } from 'react';
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
const HelpCard = ({ icon: Icon, title,setShowForm, description }) => (
  <div onClick={()=> setShowForm(true)} className="bg-white transition-all  hover:border-green-500 hover:scale-110 p-4 rounded-xl shadow-md  duration-300 ease-in-out hover:shadow-lg border  border-gray-100">
    <div className="mb-4 flex justify-center">
      <Icon className="w-8  h-8 text-gray-700" />
    </div>
    <div className='border-t-2  '>
    <h3 className="text-lg text-center font-semibold text-gray-800 mb-1">{title}</h3>
    <p className="text-sm text-center text-gray-500">{description}</p>
    </div>
   
  </div>
);
// Main Application component
const Support = () => {

     const[showForm,setShowForm]=useState(false)
  
     const {user}= useAuth();
  return (
    <div className="min-h-screen relative flex-col bg-gray-50">
       <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Help Topics for Party
        </h1>
      <main className=" px-6   lg:px-12">


        {/* Help Topics Grid */}
        <div className=" grid-cols-1  md:grid lg:grid  cursor-pointer md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-6 gap-3 grid">
          {helpTopics.map((topic, index) => (
            <HelpCard key={index}   {...topic}  setShowForm={setShowForm}   />
          ))}
        </div>
      </main>
     {showForm && (
  <div className="md:absolute inset-0 absolute  lg:absolute   h-screen flex bg-black  lg:h-auto md:h-auto md:justify-center md:items-center z-20">
    <SupportForm setShowForm={setShowForm}/>
  </div>
)}

     
    </div>
  );
};

export default Support;