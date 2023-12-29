import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@project/components';

const meta = {
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type ButtonStory = StoryObj<typeof Button>;

/** A simple button */
export const Base: ButtonStory = {
  render: () => <Button>Click here</Button>,
};

/** Button animated by framer motion */
export const WithMotion: ButtonStory = {
  render: () => (
    <Button
      whileTap={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 500 }}
    >
      Click Motion
    </Button>
  ),
};
