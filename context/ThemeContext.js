import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const theme = {
    containerBg: isDarkTheme ? 'lightblue' : '#D8BFD8',
    headerBg: isDarkTheme ? 'steelblue' : 'purple',
    itemBg: isDarkTheme ? 'steelblue' : 'purple',
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
