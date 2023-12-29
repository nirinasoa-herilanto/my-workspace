import React, { ReactNode } from 'react';

import { AppStoreContext, IAppContext } from '../index';
import { BrowserRouter } from 'react-router-dom';

export type MockAppStoreProps = {
  children: ReactNode;
  value: IAppContext;
};

/**
 * A mock store provider.
 *
 * Only used for writing `stories` for our components
 */
const MockAppStoreProvider: React.FC<MockAppStoreProps> = ({
  value,
  children,
}) => {
  return (
    <BrowserRouter>
      <AppStoreContext.Provider value={value}>
        {children}
      </AppStoreContext.Provider>
    </BrowserRouter>
  );
};

export default MockAppStoreProvider;
