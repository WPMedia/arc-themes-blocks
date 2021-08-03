import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Masthead } from './features/masthead-block/default';

export default {
  title: 'Blocks/Masthead',
  decorators: [withKnobs],
  parameters: {
    // Set the viewports in Chromatic at a component level.
    chromatic: { viewports: [320, 1200] },
  },
};

const allCustomFieldData = {
  promoLinkText: 'Arc XP',
  promoLinkURL: 'https://www.arcxp.com/',
  tagLine: 'Arc XP - Go beyond traditional commerce to meet the evolving needs of the online economy. Enterprise flexibility meets SaaS simplicity - Learn more about Arc XP commerce products.',
  logoURL: 'https://arc-anglerfish-staging-staging.s3.amazonaws.com/public/NA6FMAXWP5DR3FDZQ7SGJ3C3FE.png',
  showDate: true,
};

export const showAllFields = () => {
  const customFieldData = allCustomFieldData;
  return (
    <Masthead
      customFields={customFieldData}
    />
  );
};

export const hideAllFields = () => {
  const customFieldData = {};
  return (
    <Masthead
      customFields={customFieldData}
    />
  );
};

export const hideDate = () => {
  const customFieldData = { ...allCustomFieldData, showDate: false };
  return (
    <Masthead
      customFields={customFieldData}
    />
  );
};
