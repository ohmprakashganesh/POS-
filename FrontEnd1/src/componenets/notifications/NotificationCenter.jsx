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
        return <CheckIcon className="h-5 w-5 text-green-500 'border-l-green-500'" />;
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 border-l-yellow-500" />;
      case 'error':
        return <ShieldExclamationIcon className="h-5 w-5 text-red-500 border-l-red-500" />;
      case 'info':
        return <InformationCircleIcon className="h-5 w-5 text-blue-500 border-l-blue-500" />;
      default:
        return <BellIcon className="h-5 w-5 text-gray-500 border-l-gray-500" />;
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
  
  
    </div>
  );
};

export default NotificationCenter;