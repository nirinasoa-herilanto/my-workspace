import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';

import { GlobalStyle, ThemeProvider } from '@project/styles';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { queryClient } from '@project/utils';

import AppStoreProvider from '@project/store';

import MainRouter from './MainRouter.tsx';

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
