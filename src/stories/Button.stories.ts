import type { Meta, StoryObj } from '@storybook/react';
import Button from '@components/button/Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: {
        type: 'radio',
      },
      options: ['button', 'submit', 'reset'],
      table: {
        defaultValue: { summary: '"button"' },
      },
      description: 'The type of button',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: 'Button',
    bgColor: 'fill',
    btnSize: 'xs',
    radiusStyle: 'curve',
    type: 'button',
  },
};

export const NoArg: Story = {
  args: {
    children: 'Button',
  },
};
