import type { Meta, StoryObj } from '@storybook/react';

import { Logo } from '@project/components';
import MockAppStoreProvider from '@project/store/storybook/mock.store';
import { IAppContext } from '@project/store';

const meta = {
  component: Logo,
  tags: ['autodocs'],
} satisfies Meta<typeof Logo>;

export default meta;

type LogoStory = StoryObj<typeof Logo>;

const mockValue = { theme: { currentTheme: 'dark' } } as IAppContext;

/** My worspace logo in light mode */
export const LightMode: LogoStory = {
  decorators: [
    (Story) => (
      <MockAppStoreProvider
        value={{ theme: { currentTheme: 'light' } } as IAppContext}
      >
        <Story />
      </MockAppStoreProvider>
    ),
  ],
  render: () => {
    return <Logo />;
  },
};

/** My worspace logo in dark mode  */
export const DarkMode: LogoStory = {
  decorators: [
    (Story) => (
      <MockAppStoreProvider value={mockValue}>
        <Story />
      </MockAppStoreProvider>
    ),
  ],
  render: () => {
    return <Logo />;
  },
};
