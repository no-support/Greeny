import type { Meta, StoryObj } from '@storybook/react';
import Input from '@components/input/Input';
import { faker } from '@faker-js/faker/locale/ko';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    value: faker.lorem.sentence(),
  },
};
