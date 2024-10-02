import type { Meta, StoryObj } from '@storybook/react';
import Button from '@components/button/Button';
import Spinner from '@/components/spinner/Spinner';

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

export const Disabled: Story = {
  args: {
    children: 'Button',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    children: (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
        <Spinner />
        Loading
      </div>
    ),
    disabled: true,
    className: 'loading',
  },
};
