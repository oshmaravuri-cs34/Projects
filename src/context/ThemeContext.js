import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const lightTheme = {
  background: '#f8f9fa',
  surface: '#ffffff',
  primary: '#FF6B35',
  text: '#333333',
  textSecondary: '#666666',
  border: '#eeeeee',
  card: '#ffffff',
};

export const darkTheme = {
  background: '#121212',
  surface: '#1e1e1e',
  primary: '#FF6B35',
  text: '#ffffff',
  textSecondary: '#cccccc',
  border: '#333333',
  card: '#2a2a2a',
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        const isDarkMode = savedTheme === 'dark';
        setIsDark(isDarkMode);
        setTheme(isDarkMode ? darkTheme : lightTheme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    setTheme(newIsDark ? darkTheme : lightTheme);
    await AsyncStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);