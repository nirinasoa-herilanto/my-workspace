import { Meta, StoryObj } from '@storybook/react';

import { InputPassword } from '@project/components';

const meta = {
  component: InputPassword,
  tags: ['autodocs'],
} satisfies Meta<typeof InputPassword>;

export default meta;

type InputPasswordStory = StoryObj<typeof InputPassword>;

export const Base: InputPasswordStory = {
  args: {
    labelFor: 'Password',
    hasError: false,
    warningMessage: 'Password can not be empty!',
  },
};
