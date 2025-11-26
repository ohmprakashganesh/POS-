import React, { useState } from 'react'
// NotificationItem.jsx
import { notificationsData } from '@/data/mockData';
import logo from "@/assets/test.png"

const NotificationItem = ({ title,stock, time,status, isNew ,id}) => {
 
  const isUnread = status.toLowerCase() === "unread";
  const handleClick = () => {
    if (isUnread) {
      // call the function to update status
    }
  };
  const getIcon = () => {
        return (
          <div className="w-8 mx-auto my-auto h-8 overflow-hidden rounded-full flex items-center justify-center bg-white dark:bg-dark relative">
             <img className=' w-full h-full ' src={logo} alt="" />
          </div>
        );
  };
  return (
    <div   onClick={handleClick}  className={`flex rounded-lg items-start px-2 ${status=="read"?"dark:bg-dark bg-white":"dark:bg-muted/15 text-muted-hover bg-muted/15" }   cursor-pointer nd `}>
      <div className=" my-auto mx-2 flex-shrink-0 ">
        {getIcon()}
      </div>
      <div className="flex-grow font-base  ">
        <div className="text-sm gap-0">
         <span className='text-muted-hover text-sm'> {title? title:"added new product"}</span>
         <p className='text-muted'>stock level <span>{stock?stock:"20"}</span></p>
        </div>
        <p className={`text-xs ${isNew ? 'text-primary' : 'text-muted-hover'}`}>{time}</p>
      </div>
      {isNew && (
        <div className="ml-2 w-2 h-2 rounded-full bg-secondary flex-shrink-0 mt-1"></div>
      )}
      {!isNew && (
        <div className="ml-2 w-4 h-4 flex-shrink-0 text-gray-500">
             {/* Kebab menu icon placeholder */}
        </div>
      )}
    </div>
  );
};

const NotificationScreen = () => {
  const [activeFilter, setActiveFilter]=useState("All")

  const getActivated=(filterName)=>{
    const isActive= activeFilter==filterName;
    return `${isActive?"bg-primary text-white dark:bg-primary/40 dark:text-muted-hover":"bg-muted/30 dark:bg-muted/20 "}`;
  };
  return (
    <div className="w-full h-full overflow-y-auto scrollbar-hide  shadow-sm  font-base">
      {/* Header */}
      <div className="p-4 border-b border-b-muted/40">
          <h1 className="text-2xl mb-2 font-bold">Notifications</h1>
        {/* Tab/Filter Bar */}
        <div className="flex items-center space-x-2">
          <button onClick={()=>{setActiveFilter("All")}} className={`px-4 py-1 text-muted    text-sm font-semibold  ${getActivated("All")} rounded-full`}>
            All
          </button>
          <button onClick={()=>{setActiveFilter("Unread")}} className={`px-4 py-1 text-muted    text-sm font-semibold  ${getActivated("Unread")} rounded-full`}>
            Unread
          </button>
        </div>
      </div>

      {/* New Notifications Section */}
      <div className="pl-4 pt-2">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-muted-hover">New</h2>
        </div>
        {/* Notifications List */}
        <div className='flex flex-col text-muted gap-1' >
         {activeFilter === "All" ? (
  notificationsData.map((notification) => (
    <NotificationItem  key={notification.id} {...notification} />
  ))
) : (
  notificationsData
    .filter((data) => data.status.toLowerCase() === "unread")
    .map((notification) => (
      <NotificationItem className="" key={notification.id} {...notification} />
    ))
)}
        </div>
      </div>
    </div>
  );
};
export default NotificationScreen;
