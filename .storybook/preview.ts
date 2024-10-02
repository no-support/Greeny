import type { Preview } from '@storybook/react';
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
        desktop: {
          name: 'desktop',
          styles: {
            width: '100%',
            height: '100%',
          },
        },
        custom380: {
          name: 'Custom 380px',
          styles: {
            width: '380px',
            height: '600px',
          },
        },
      },
      defaultViewport: 'desktop',
    },
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
};

export default preview;
