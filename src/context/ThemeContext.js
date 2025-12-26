import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const lightTheme = {
  background: '#ffffff',
  surface: '#f8f9fa',
  primary: '#FF6B35',
  secondary: '#5856D6',
  text: '#000000',
  textSecondary: '#666666',
  border: '#e1e1e1',
  card: '#ffffff',
  shadow: 'rgba(0,0,0,0.1)',
};

export const darkTheme = {
  background: '#000000',
  surface: '#1c1c1e',
  primary: '#FF6B35',
  secondary: '#5E5CE6',
  text: '#ffffff',
  textSecondary: '#8e8e93',
  border: '#38383a',
  card: '#2c2c2e',
  shadow: 'rgba(255,255,255,0.1)',
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};