import React, { createContext, useState, useEffect } from 'react';

import AuthServices from '../services/AuthServices';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoadingAuth(false);
    };

    checkUser();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await AuthServices.login(email, password);
      if (response.success) {
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user)); // Store user in local storage
      }
      return response;
    } catch (error) {
      console.error('Error in handleLogin:', error);
      return { success: false, error: error.message };
    }
  };

  const handleSignup = async (email, password, name) => {
    try {
      const response = await AuthServices.register(email, password, name);
      if (response.success) {
        setUser(response.user);
      }
      return response;
    } catch (error) {
      console.error('Error in handleSignup:', error);
      return { success: false, error: error.message };
    }
  };

  const handleLogout = async () => {
    try {
      await AuthServices.logout();
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error in handleLogout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout, handleSignup, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};