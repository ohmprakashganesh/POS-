

import { UsersIcon, UserPlusIcon, ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { NewUsers } from "./NewUsers"; 
import { ExistingUsers } from "./ExistingUsers";
import Button from "@/features/ui/Button";
import { useLocation, useNavigate } from "react-router-dom";

const SubscriberList = () => {
  const navigate=useNavigate();
   const location = useLocation();
    const returnPath= location.state?.from;
   

  const [activeView, setActiveView] = useState('existing');
  return (
    <div className="min-w-2xl max-w-full mx-auto  rounded-xl ">
      {returnPath && (
         <div>
          <ArrowLeft onClick={()=> navigate(`${returnPath}`)} size={25} className="rounded-full cursor-pointer font-bold bg-gray-300 dark:bg-gray-700 mb-2 p-2 w-fit h-fit" />
        </div>
      )}
     
      <h1 className="text-2xl font-bold  mb-4">Subscriber Management</h1>

      <div className="flex space-x-4  mb-2 ">
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

      {activeView === 'existing' ? (
        <ExistingUsers/>
      ) : (
        <NewUsers />
      )}
    </div>
  );
};

export default SubscriberList;