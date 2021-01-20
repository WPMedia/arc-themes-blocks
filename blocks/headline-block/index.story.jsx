import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { Headline } from './features/headline/default';

export default {
  title: 'Headline',
  decorators: [withKnobs],
};

export const customHeadline = () => {
  const headlineString = text('headlineString', 'Man Bites Dog');
  // if we want to allow custom fonts https://stackoverflow.com/a/63128475/7491536
  const primaryFont = text('primaryFont (web-safe)', 'Arial');

  return (
    <Headline headlineString={headlineString} primaryFont={primaryFont} />
  );
};

export const comicSansFontFamily = () => (
  <Headline headlineString="Emperor Has No Pants" primaryFont="Comic Sans MS" />
);
