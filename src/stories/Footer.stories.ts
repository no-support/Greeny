import type { Meta, StoryObj } from '@storybook/react';
import Footer from '@components/layout/Footer';
import * as NextNavigation from 'next/navigation';
import { jest } from '@storybook/jest';
import { faker } from '@faker-js/faker/locale/ko';

jest.spyOn(NextNavigation, 'usePathname').mockReturnValue('/');

const meta: Meta<typeof Footer> = {
  title: 'Layout/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    // nextjs: {
    //   // 미작성 시 pathname이 null -> .storybook/preview.js으로 이동
    //   appDirectory: true,
    // },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const createMockSession = () => ({
  user: {
    name: `${faker.person.lastName()}${faker.person.firstName()}`,
    email: faker.internet.email({ provider: 'naver.com' }),
    image: faker.image.avatar(),
    type: 'user',
    accessToken: faker.string.uuid(),
    refreshToken: faker.string.uuid(),
  },
  expires: faker.date.future().toISOString(),
  accessToken: faker.string.uuid(),
  refreshToken: faker.string.uuid(),
});

export const LoggedIn: Story = {
  args: {
    session: createMockSession(),
  },
};

export const LoggedOut: Story = {
  args: {
    session: null,
  },
  parameters: {
    viewport: {
      defaultViewport: 'custom380',
    },
  },
};
