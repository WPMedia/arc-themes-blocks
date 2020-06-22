/* eslint-disable react/no-children-prop */
import React from 'react';
import RightRailBlock from './layouts/right-rail/default';
import Navigation from '../header-nav-block/features/navigation/default';

import Masthead from '../masthead-block/features/masthead-block/default';
// import ExtraLargeManualPromo from
//  '../extra-large-manual-promo-block/features/extra-large-manual-promo/default';

export default { title: 'Right Rail Block' };

const navigationComponents = () => (
  <Navigation />
);

// https://arc-anglerfish-staging-staging.s3.amazonaws.com/public/MBMXUMZQZZCWBMD3Z4BY6FYFF4.png
//   const [navigation, fullWidth1, main, rightRail, fullWidth2, footer] = children;

const mastheadCustomFields = {
  tagLine: 'Customization Thrives in the Light',
  promoLinkURL: 'https://duckduckgo.com/?va=z&t=hc',
  promoLinkText: 'Promo',
  logoURL: 'https://arc-anglerfish-staging-staging.s3.amazonaws.com/public/MBMXUMZQZZCWBMD3Z4BY6FYFF4.png',
  showDate: true,
};

const fullWidth1Components = () => (
  <Masthead customFields={mastheadCustomFields} />
);
// mainComponents()
// const mainComponents = () => (
//   <ExtraLargeManualPromo />
// );
export const basic = () => (
  <RightRailBlock
    children={[navigationComponents(), fullWidth1Components()]}
  />
);
