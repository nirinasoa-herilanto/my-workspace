import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@project/utils';

import MainRouter from './MainRouter.tsx';
import { GlobalStyle, ThemeProvider } from '@project/styles';
import AppStoreProvider from '@project/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppStoreProvider>
      <ThemeProvider>
        <GlobalStyle />
        <QueryClientProvider client={queryClient}>
          <MainRouter />
        </QueryClientProvider>
      </ThemeProvider>
    </AppStoreProvider>
  </React.StrictMode>
);
