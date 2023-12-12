import React from 'react';
import { ThemeStoreType, useThemeStore } from './theme/theme.store';

export type AppStoreProviderProps = {
  children: React.ReactNode;
};

export interface IAppContext {
  theme: ThemeStoreType;
}

/**
 * App store context
 */
export const AppStoreContext = React.createContext({} as IAppContext);

/**
 * App store provider wrapper
 */
const AppStoreProvider: React.FC<AppStoreProviderProps> = React.memo(
  ({ children, ...rest }) => {
    const theme = useThemeStore();

    const value = {
      theme,
    } as IAppContext;

    return (
      <AppStoreContext.Provider value={value} {...rest}>
        {children}
      </AppStoreContext.Provider>
    );
  }
);

export default AppStoreProvider;
