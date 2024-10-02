import type { Meta, StoryObj } from '@storybook/react';
import Skeleton from '@/components/skeleton/Skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    w: {
      control: {
        type: 'number',
        min: 1,
        step: 1,
      },
    },
    h: {
      control: {
        type: 'number',
        min: 1,
      },
    },
    radius: {
      control: {
        type: 'number',
        min: 0,
      },
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    w: 20,
    h: 10,
  },
};

export const Circle: Story = {
  args: {
    w: 10,
    h: 10,
    radius: 5,
  },
  parameters: {
    docs: {
      description: {
        story: '너비와 높이 값이 같고, radius 값이 그 값의 절반이면 원이 됩니다.',
      },
    },
  },
};
