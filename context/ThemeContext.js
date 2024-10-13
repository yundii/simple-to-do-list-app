import React, { createContext, useState } from 'react';
import { colors } from '../Helpers/styles';
// Create the context
export const ThemeContext = createContext();
// Create the provider
export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  // This function toggles the theme
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  // Define the theme
  const theme = {
    containerBg: isDarkTheme ? colors.Plum : colors.LightPurple,
    itemBg: isDarkTheme ? colors.Grey : colors.Purple,
    textColor: isDarkTheme ? colors.Black : colors.Red,
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
