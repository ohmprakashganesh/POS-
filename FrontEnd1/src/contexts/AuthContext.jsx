import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState('deActive');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data
    const storedUser = localStorage.getItem('pos_user');
    const storedSubscription = localStorage.getItem('pos_subscription');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedSubscription) {
      setSubscriptionStatus(storedSubscription);
    }
    
    setLoading(false);
  }, []);

 // Add this to the login function for admin access:
const login = async (email, password) => {
  setLoading(true);
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo: If email contains 'admin', give admin role
       let role = 'subscriber';
      if (email.includes('admin')) role = 'admin';
      else if (email.includes('cashier')) role = 'cashier';

    const userData = {
        id: 1,
        email,
        name:
          role === "admin"
            ? "Admin User"
            : role === "cashier"
            ? "Cashier User"
            : "Subscriber User",
        role
      };
    setUser(userData);
    localStorage.setItem('pos_user', JSON.stringify(userData));

   
    return { success: true,user: userData };
  } catch (error) {
    return { success: false, error: error.message };
  } finally {
    setLoading(false);
  }
};

  const signup = async (userData) => {
    setLoading(true);
    try {
      const newUser = {
        id: 1,
        ...userData,
        role: 'admin'
      };
      
      setUser(newUser);
      localStorage.setItem('pos_user', JSON.stringify(newUser));
      localStorage.setItem('pos_subscription', 'active');
      setSubscriptionStatus('active');
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pos_user');
    localStorage.removeItem('pos_subscription');
  };

  const updateSubscription = (status) => {
    setSubscriptionStatus(status);
    localStorage.setItem('pos_subscription', status);
  };

  const value = {
    user,
    subscriptionStatus,
    loading,
    login,
    signup,
    logout,
    updateSubscription
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};