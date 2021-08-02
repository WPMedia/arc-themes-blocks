import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
// import ArticleTagBlock from './features/tag/default';

export default {
  title: 'Blocks/Tags Bar',
  decorators: [withKnobs],
  parameters: {
    // Set the viewports in Chromatic at a component level.
    chromatic: { viewports: [320, 1200] },
  },
};

export const showSomething = () => <p>ya</p>;
