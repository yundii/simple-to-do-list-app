import React, { createContext, useState } from 'react';
import { colors } from '../helpers/styles';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const theme = {
    containerBg: isDarkTheme ? colors.Plum : colors.LightPurple,
    itemBg: isDarkTheme ? colors.Grey : colors.Purple,
    textColor: isDarkTheme ? colors.Black : colors.White,
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
