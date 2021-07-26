import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import AuthorBio from './features/full-author-bio/default';

export default {
  title: 'Blocks/Full Author Bio',
  decorators: [withKnobs],
  parameters: {
    chromatic: {
      viewports: [320, 1200],
    },
  },
};

export const allFieldsFull = () => <AuthorBio />;
