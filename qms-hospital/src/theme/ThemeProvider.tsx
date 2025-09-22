import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createAppTheme } from './theme';
import { useLocalStorage } from '../hooks/useLocalStorage';

type ThemeMode = 'light' | 'dark';
type Direction = 'ltr' | 'rtl';
type Language = 'ar' | 'en';

interface ThemeContextType {
  mode: ThemeMode;
  direction: Direction;
  language: Language;
  toggleMode: () => void;
  setLanguage: (lang: Language) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Use localStorage to persist theme preferences
  const [mode, setMode] = useLocalStorage<ThemeMode>('themeMode', 'light');
  const [language, setLanguage] = useLocalStorage<Language>('language', 'ar');
  
  // Set direction based on language
  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';
  
  // Create theme based on current settings
  const theme = useMemo(
    () => createAppTheme(mode, direction, language),
    [mode, direction, language]
  );
  
  // Toggle between light and dark mode
  const toggleMode = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };
  
  // Set document direction and language
  useEffect(() => {
    document.dir = direction;
    document.documentElement.lang = language;
    document.body.setAttribute('dir', direction);
  }, [direction, language]);
  
  const contextValue = useMemo(
    () => ({
      mode,
      direction,
      language,
      toggleMode,
      setLanguage,
    }),
    [mode, direction, language]
  );
  
  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};