import React from 'react';

import { ThemeStoreType, useThemeStore } from './theme/theme.store';
import { AuthStoreType, useAuthStore } from './auth/auth.store';

export type AppStoreProviderProps = {
  children: React.ReactNode;
};

export interface IAppContext {
  theme: ThemeStoreType;
  auth: AuthStoreType;
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
    const auth = useAuthStore();

    const value = {
      theme,
      auth,
    } as IAppContext;

    return (
      <AppStoreContext.Provider value={value} {...rest}>
        {children}
      </AppStoreContext.Provider>
    );
  }
);

export default AppStoreProvider;
