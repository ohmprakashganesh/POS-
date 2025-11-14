import React from 'react'
// NotificationItem.jsx
const NotificationItem = ({ iconType, title,stock, time, isNew }) => {
  const getIcon = () => {
    switch (iconType) {
      case 'reaction':
        return (
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 relative">
            {/* Placeholder for small story preview icon */}
            <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M13 13h-2v-2h2v2zM15 9h-2v2h2V9zM7 9h2v2H7V9zM5 11h2v2H5v-2z"></path></svg>
            </div>
            {/* Placeholder for profile image */}
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          </div>
        );
      case 'tag':
        return (
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-300 relative">
            <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M0 10a10 10 0 1 1 20 0 10 10 0 0 1-20 0zm10-5a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"></path></svg>
            </div>
            {/* Placeholder for profile image */}
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          </div>
        );
      case 'comment':
        return (
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-300 relative">
            <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M18 10c0 3.866-3.582 7-8 7a8 8 0 0 1-8-7c0-3.866 3.582-7 8-7s8 3.134 8 7zm-5-3h-6v2h6V7zm0 4h-6v2h6v-2z"></path></svg>
            </div>
            {/* Placeholder for profile image */}
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          </div>
        );
      default:
        return <div className="w-12 h-12 rounded-full bg-gray-300"></div>;
    }
  };

  return (
    <div className={`flex items-start p-2  hover:bg-gray-100 cursor-pointer ${isNew ? 'bg-blue-50' : ''}`}>
      <div className="mr-3 flex-shrink-0">
        {getIcon()}
      </div>
      <div className="flex-grow font-base ">
        <p className="text-sm">
         <span>added new laptop</span>
         <p>stock level <span>20</span></p>
        </p>
        <p className={`text-xs ${isNew ? 'text-blue-600' : 'text-gray-500'}`}>{time}</p>
      </div>
      {isNew && (
        <div className="ml-2 w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-1"></div>
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
  const notificationsData = [
    {
      id: 1,
      iconType: 'reaction',
      title: "Hp lapto 45 inch",
      stock:"stock level",
      time: '15m',
      isNew: true,
    },
     {
      id: 1,
      iconType: 'reaction',
      title: "lenevo lapto 45 inch",
      stock:"stock level",
      time: '15m',
      isNew: false,
    },
     {
      id: 1,
      iconType: 'reaction',
      title: "Mac book laptop 45 inch",
      stock:"stock level",
      time: '15m',
      isNew: false,
    },
     {
      id: 1,
      iconType: 'reaction',
      title: "Hp lapto 45 inch",
      stock:"stock level",
      time: '15m',
      isNew: true,
    },
     {
      id: 1,
      iconType: 'reaction',
      title: "lenevo lapto 45 inch",
      stock:"stock level",
      time: '15m',
      isNew: false,
    },
     {
      id: 1,
      iconType: 'reaction',
      title: "Mac book laptop 45 inch",
      stock:"stock level",
      time: '15m',
      isNew: false,
    }, {
      id: 1,
      iconType: 'reaction',
      title: "Hp lapto 45 inch",
      stock:"stock level",
      time: '15m',
      isNew: true,
    },
     {
      id: 1,
      iconType: 'reaction',
      title: "lenevo lapto 45 inch",
      stock:"stock level",
      time: '15m',
      isNew: false,
    },
     {
      id: 1,
      iconType: 'reaction',
      title: "Mac book laptop 45 inch",
      stock:"stock level",
      time: '15m',
      isNew: false,
    }, {
      id: 1,
      iconType: 'reaction',
      title: "Hp lapto 45 inch",
      stock:"stock level",
      time: '15m',
      isNew: true,
    },
     {
      id: 1,
      iconType: 'reaction',
      title: "lenevo lapto 45 inch",
      stock:"stock level",
      time: '15m',
      isNew: false,
    },
     {
      id: 1,
      iconType: 'reaction',
      title: "Mac book laptop 45 inch",
      stock:"stock level",
      time: '15m',
      isNew: false,
    },
    // Add more notifications here...
  ];

  return (
    <div className="w-full max-h-screen overflow-scroll bg-primary-foreground   shadow-lg  font-base">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl text-muted-hover font-bold">Notifications</h1>
          <button className="text-muted-hover hover:text-muted-hover">
            {/* Three dots (kebab menu) icon placeholder */}
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"></path></svg>
          </button>
        </div>
        
        {/* Tab/Filter Bar */}
        <div className="flex items-center space-x-2">
          <button className="px-4 py-1 text-sm font-semibold text-secondary bg-primary-foreground rounded-full">
            All
          </button>
          <button className="px-4 py-1 text-sm font-semibold text-muted bg-primary-foreground rounded-full">
            Unread
          </button>
        </div>
      </div>

      {/* New Notifications Section */}
      <div className="pl-4 pt-2">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-gray-800">New</h2>
          <button className="text-blue-600 text-sm font-semibold">
            See all
          </button>
        </div>
        
        {/* Notifications List */}
        <div >
          {notificationsData.map((notification) => (
            <NotificationItem key={notification.id} {...notification} />
          ))}
        </div>
      </div>
      
    </div>
  );
};
export default NotificationScreen;
