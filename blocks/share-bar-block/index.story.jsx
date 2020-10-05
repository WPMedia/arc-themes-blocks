import React from 'react';
import {
  withKnobs, text, boolean,
} from '@storybook/addon-knobs';
import { ShareBar } from './features/share-bar/default';

export default {
  title: 'Share Bar',
  decorators: [withKnobs],
};

// look into multiple object select
// via https://www.npmjs.com/package/@storybook/addon-knobs/v/5.3.21#options

// const valuesObj = {
//   email: true,
//   facebook: true,
//   pinterest: true,
//   twitter: true,
//   linkedIn: true,
// };

// const defaultObj = {
//   email: true,
//   facebook: true,
//   pinterest: true,
//   twitter: true,
//   linkedIn: true,
// };

export const CustomShareBar = () => {
  const headlineString = text('headlineString', 'Man Bites Dog');
  const websiteDomain = text('websiteDomain', 'https://www.thesun.com/');
  const websiteUrl = text('websiteUrl', '/2019/07/15/global-kitchen-sink-article/');
  const websiteName = text('websiteName', 'The Sun');

  const emailInput = boolean('email', true);
  const facebookInput = boolean('facebook', true);
  const pinterestInput = boolean('pinterest', true);
  const twitterInput = boolean('twitter', true);
  const linkedInInput = boolean('linkedIn', true);

  const customFields = {
    email: emailInput,
    facebook: facebookInput,
    pinterest: pinterestInput,
    twitter: twitterInput,
    linkedIn: linkedInInput,
  };

  return (
    <ShareBar
      headlineString={headlineString}
      customFields={customFields}
      websiteDomain={websiteDomain}
      websiteUrl={websiteUrl}
      websiteName={websiteName}
    />
  );
};
