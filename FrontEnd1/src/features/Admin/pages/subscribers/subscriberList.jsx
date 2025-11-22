

import Input from "@/features/ui/Input";
import { DeleteIcon, Edit3Icon, EditIcon, FilterXIcon, SaveIcon, UsersIcon, UserPlusIcon } from "lucide-react";
import React, { useState } from "react";
import { NewUsers } from "./NewUsers"; 
import { ExistingUsers } from "./ExistingUsers";
import Button from "@/features/ui/Button";

const SubscriberList = () => {
  // 👥 Existing Subscribers Data
 

  // State to manage which view is active: 'subscribers' or 'potential'
  const [activeView, setActiveView] = useState('existing');
  return (
    <div className="min-w-2xl max-w-full mx-auto  text-muted-hover rounded-xl ">
      <h1 className="text-2xl font-bold text-dark dark:text-white mb-3">Subscriber Management</h1>

      {/* ↔️ Tab/Section Switcher */}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => {
            setActiveView('existing');
          }}
      
        >
           <Button className={` ${activeView=="existing"? "bg-primary":"bg-primary/70"} `}>
           <UsersIcon className="w-4 h-4" />
          <span>Existing Subscribers</span>
          </Button>
         
        </button>
        <div
          onClick={() => {
            setActiveView('new');
          }}
         
        >
           <Button className={` ${activeView=="new"? "bg-primary":"bg-primary/70"} `}>
          <UserPlusIcon className="w-4 h-4" />
         <span>New/Potential Users </span> 
          </Button>
            </div>
        
      </div>

      {/* 📋 Conditional Table Rendering */}
      {activeView === 'existing' ? (
        <ExistingUsers/>
      ) : (
        <NewUsers />
      )}
    </div>
  );
};

export default SubscriberList;