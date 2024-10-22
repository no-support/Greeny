import Heading from '@/components/heading/Heading';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: {
        type: 'radio',
      },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      table: {
        defaultValue: { summary: '"h1"' },
      },
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: 'Heading',
    as: 'h1',
  },
};
