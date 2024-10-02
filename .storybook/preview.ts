import type { Preview } from '@storybook/react';
import { DEFAULT_VIEWPORT } from '@storybook/addon-viewport';
import '@styles/reset.css';
import '@styles/common.css';
import '@styles/variable.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        // color: /(background|color)$/i,
        // date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        DEFAULT_VIEWPORT,
        custom380: {
          name: 'Custom 380px',
          styles: {
            width: '380px',
            height: '600px',
          },
        },
      },
      defaultViewport: DEFAULT_VIEWPORT,
    },
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
};

export default preview;
