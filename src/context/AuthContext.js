import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (username, password, selectedRole) => {
    // Mock authentication - in real app, this would call an API
    // Use the selected role from the login form
    const role = selectedRole || 'junior_engineer';
    
    const roleNames = {
      junior_engineer: 'Junior Engineer',
      senior_engineer: 'Senior Engineer',
      admin: 'Administrator',
      contractor: 'Contractor'
    };

    const userData = {
      username,
      role,
      name: roleNames[role] || 'User',
      id: Math.random().toString(36).substr(2, 9)
    };

    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

