import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    // Simulate API call
    const userData = {
      id: 1,
      name: 'John Doe',
      email,
      avatar: 'https://via.placeholder.com/100',
    };
    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    return userData;
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  const register = async (name, email, password) => {
    // Simulate API call
    const userData = {
      id: Date.now(),
      name,
      email,
      avatar: 'https://via.placeholder.com/100',
    };
    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    return userData;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);