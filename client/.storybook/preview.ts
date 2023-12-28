import type { Preview } from '@storybook/react';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { ThemeProvider } from 'styled-components';

import { lightMode, darkMode } from '../src/styles/themes';
import GlobalStyles from '../src/styles/GlobalStyle';

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: lightMode,
      dark: darkMode,
    },
    defaultTheme: 'light',
    Provider: ThemeProvider,
    GlobalStyles,
  }),
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
