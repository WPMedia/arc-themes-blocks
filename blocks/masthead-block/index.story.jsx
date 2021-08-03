import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { MastheadPresentational } from './features/masthead-block/default';

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

const displayDate = 'August 03, 2021';

export const showAllFields = () => {
  const customFieldData = allCustomFieldData;
  return (
    <MastheadPresentational
      customFields={customFieldData}
      displayDate={displayDate}
    />
  );
};

export const hideAllFields = () => {
  const customFieldData = {};
  return (
    <MastheadPresentational
      customFields={customFieldData}
      displayDate={displayDate}
    />
  );
};

export const hideDate = () => {
  const customFieldData = { ...allCustomFieldData, showDate: false };
  return (
    <MastheadPresentational
      customFields={customFieldData}
      displayDate={displayDate}
    />
  );
};

export const emptyTagLine = () => {
  const customFieldData = { ...allCustomFieldData, tagLine: '' };
  return (
    <MastheadPresentational
      customFields={customFieldData}
      displayDate={displayDate}
    />
  );
};

export const emptyPromoLinkText = () => {
  const customFieldData = { ...allCustomFieldData, promoLinkText: '' };
  return (
    <MastheadPresentational
      customFields={customFieldData}
      displayDate={displayDate}
    />
  );
};

export const emptyPromoLinkURL = () => {
  const customFieldData = { ...allCustomFieldData, promoLinkURL: '' };
  return (
    <MastheadPresentational
      customFields={customFieldData}
      displayDate={displayDate}
    />
  );
};

export const emptyLogoURL = () => {
  const customFieldData = { ...allCustomFieldData, logoURL: '' };
  return (
    <MastheadPresentational
      customFields={customFieldData}
      displayDate={displayDate}
    />
  );
};

export const emptyTagLineAndLogoURL = () => {
  const customFieldData = { ...allCustomFieldData, tagLine: '', logoURL: '' };
  return (
    <MastheadPresentational
      customFields={customFieldData}
      displayDate={displayDate}
    />
  );
};
