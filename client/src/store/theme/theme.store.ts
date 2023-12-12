import { useEffect, useState } from 'react';

export type ThemeStoreType = {
  currentTheme: string;
  displayThemeHandler: (theme: string) => void;
};

const initialThemeState = localStorage.getItem('theme') || 'light';

/**
 * Use to handle dark/light mode
 */
export const useThemeStore = () => {
  const [currentTheme, setCurrentTheme] = useState<string>(initialThemeState);

  const displayThemeHandler = (theme: string) => {
    setCurrentTheme(theme);
  };

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  return {
    currentTheme,
    displayThemeHandler,
  } as ThemeStoreType;
};
