import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import Headline from './features/headline/headline';

export default {
  title: 'Headline',
  decorators: [withKnobs],
};

export const customHeadline = () => {
  const data = {
    useFusionContext: {
      globalContent: {
        headlines: {
          basic: text('headlineString', 'Man Bites Dog'),
        },
      },
    },
  };

  return (
    <Headline {...data} />
  );
};
