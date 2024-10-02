import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: ['@storybook/addon-onboarding', '@storybook/addon-links', '@storybook/addon-essentials', '@chromatic-com/storybook', '@storybook/addon-interactions', '@storybook/addon-mdx-gfm'],

  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  features: { experimentalRSC: true },

  staticDirs: ['..\\public'],

  webpackFinal: async (config) => {
    config.resolve!.alias = {
      ...config.resolve?.alias,
      '@': path.resolve(__dirname, '../src'),
      '@styles': path.resolve(__dirname, '../src/styles'),
      '@images': path.resolve(__dirname, '../public/images'),
      '@loading': path.resolve(__dirname, '../public/loading'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@greeny': path.resolve(__dirname, '../src/app/(greeny)'),
    };
    return config;
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },

  docs: {},
};
export default config;
