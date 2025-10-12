import React, { useState, useEffect } from 'react';
import { useNotifications } from '../../contexts/NotificationContext';
import { 
  BellIcon, 
  XMarkIcon, 
  CheckIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ShieldExclamationIcon
} from '@heroicons/react/24/outline';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    removeNotification,
    addNotification 
  } = useNotifications();

  // Close notification center when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.notification-panel')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckIcon className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <ShieldExclamationIcon className="h-5 w-5 text-red-500" />;
      case 'info':
        return <InformationCircleIcon className="h-5 w-5 text-blue-500" />;
      default:
        return <BellIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'border-l-green-500';
      case 'warning':
        return 'border-l-yellow-500';
      case 'error':
        return 'border-l-red-500';
      case 'info':
        return 'border-l-blue-500';
      default:
        return 'border-l-gray-500';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const handleMarkAllAsRead = () => {
    markAsRead();
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    // Handle notification actions based on type
    switch (notification.action) {
      case 'low_stock':
        // Navigate to products page
        window.location.href = '/products';
        break;
      case 'subscription':
        // Navigate to subscription page
        window.location.href = '/subscription';
        break;
      default:
        // Do nothing
        break;
    }
    
    setIsOpen(false);
  };

  // Demo function to add sample notifications (for testing)
  const addSampleNotifications = () => {
    addNotification({
      type: 'warning',
      title: 'Low Stock Alert',
      message: 'Product "Wireless Mouse" is running low (3 left)',
      action: 'low_stock'
    });
    
    addNotification({
      type: 'info',
      title: 'New Feature Available',
      message: 'Check out the new reporting dashboard features',
      action: 'reports'
    });
  };

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <BellIcon className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="notification-panel absolute right-0 top-12 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {unreadCount} unread {unreadCount === 1 ? 'message' : 'messages'}
            </p>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center">
                <BellIcon className="mx-auto h-12 w-12 text-gray-300" />
                <p className="mt-2 text-gray-500">No notifications</p>
                <p className="text-sm text-gray-400 mt-1">We'll notify you when something arrives</p>
                
                {/* Demo button for testing */}
                <button
                  onClick={addSampleNotifications}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                  Add Sample Notifications
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 cursor-pointer transition-colors border-l-4 ${
                      getNotificationColor(notification.type)
                    } ${
                      !notification.read ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex space-x-3">
                      {/* Notification Icon */}
                      <div className="flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      {/* Notification Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <p className={`text-sm font-medium ${
                            !notification.read ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNotification(notification.id);
                            }}
                            className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-400">
                            {formatTime(notification.timestamp)}
                          </span>
                          {!notification.read && (
                            <span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    {notification.actions && (
                      <div className="flex space-x-2 mt-3">
                        {notification.actions.map((action, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              action.onClick();
                            }}
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => {
                    // Clear all notifications
                    notifications.forEach(notification => {
                      removeNotification(notification.id);
                    });
                  }}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Clear all
                </button>
                <button
                  onClick={() => {
                    // View all notifications (could navigate to a dedicated page)
                    console.log('View all notifications');
                    setIsOpen(false);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View all
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;