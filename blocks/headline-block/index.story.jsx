import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import Headline from './features/headline/default';

export default {
  title: 'Headline',
  decorators: [withKnobs],
};

export const shortHeadline = () => (
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
  <Headline useInjectedFusionContext={data} />
);

export const customHeadline = () => {
  const headline = text('Headline', 'Man Bites Dog');
  const newData = () => ({
    globalContent: {
      headlines: {
        basic: headline,
      },
    },
  });

  return (
    <Headline useInjectedFusionContext={newData} />
  );
};
