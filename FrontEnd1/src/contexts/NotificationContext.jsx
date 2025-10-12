import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Mock initial notifications
    const initialNotifications = [
      {
        id: 1,
        type: 'warning',
        title: 'Low Stock Alert',
        message: 'Product "Wireless Mouse" is running low (3 left)',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: false
      },
      {
        id: 2,
        type: 'success',
        title: 'Payment Received',
        message: 'Monthly subscription payment of $79.00 received',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        read: false
      },
      {
        id: 3,
        type: 'info',
        title: 'New Update Available',
        message: 'Version 2.1 is ready with new features',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        read: true
      }
    ];
    
    setNotifications(initialNotifications);
    updateUnreadCount(initialNotifications);
  }, []);

  const updateUnreadCount = (notifs) => {
    const unread = notifs.filter(notif => !notif.read).length;
    setUnreadCount(unread);
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date(),
      read: false,
      ...notification
    };
    
    setNotifications(prev => {
      const updated = [newNotification, ...prev];
      updateUnreadCount(updated);
      return updated;
    });
  };

  const markAsRead = (notificationId = null) => {
    setNotifications(prev => {
      const updated = prev.map(notif => 
        notificationId ? 
          (notif.id === notificationId ? { ...notif, read: true } : notif) :
          { ...notif, read: true }
      );
      updateUnreadCount(updated);
      return updated;
    });
  };

  const removeNotification = (notificationId) => {
    setNotifications(prev => {
      const updated = prev.filter(notif => notif.id !== notificationId);
      updateUnreadCount(updated);
      return updated;
    });
  };

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    removeNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};