import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { Headline } from './features/headline/default';

export default {
  title: 'Headline',
  decorators: [withKnobs],
};

export const shortHeadline = () => (
  <Headline headlineString="Man Bites Dog" />
);

export const longHeadline = () => (
  <Headline headlineString="At home with your kids? Here’s the ultimate parents’ guide to summer activity resources." />
);

export const customHeadline = () => {
  const headlineString = text('headlineString', 'Man Bites Dog');

  return (
    <Headline headlineString={headlineString} />
  );
};
