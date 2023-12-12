import React, { ReactNode } from 'react';
import { ThemeProvider as Wrapper } from 'styled-components';

import { useAppStore } from '@project/store/use-app-store';

import { darkMode, lightMode } from './themes';

export type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const {
    theme: { currentTheme },
  } = useAppStore();

  return (
    <Wrapper theme={currentTheme !== 'light' ? darkMode : lightMode}>
      {children}
    </Wrapper>
  );
};

export default ThemeProvider;
