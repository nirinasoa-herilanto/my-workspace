import React, { ReactNode } from 'react';
import { ThemeProvider as Wrapper } from 'styled-components';

import { lightMode } from './themes';

export type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return <Wrapper theme={lightMode}>{children}</Wrapper>;
};

export default ThemeProvider;
