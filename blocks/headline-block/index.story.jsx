import React from 'react';
import Headline from './features/headline/default';

export default { title: 'Headline' };

export const basic = () => (
  <Headline />
);

const data = () => ({
  globalContent: {
    headlines: {
      basic: 'At home with your kids? Here’s the ultimate parents’ guide to summer activity resources.',
    },
  },
});

export const longHeadline = () => (
  <Headline fusionContext={data} />
);
