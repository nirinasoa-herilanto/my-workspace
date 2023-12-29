import { Meta, StoryObj } from '@storybook/react';

import { Input } from '@project/components';

const meta = {
  component: Input,
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;

type InputStory = StoryObj<typeof Input>;

export const Base: InputStory = {
  args: {
    labelFor: 'text',
    htmlFor: 'text',
    placeholder: 'enter some cool text ...',
    hasError: false,
    warningMessage: 'Please provide a cool text.',
  },
};

export const Email: InputStory = {
  args: {
    labelFor: 'E-mail',
    htmlFor: 'email',
    placeholder: 'my-workspace@example.com',
    hasError: false,
    warningMessage: 'Please provide a valid email.',
  },
};
