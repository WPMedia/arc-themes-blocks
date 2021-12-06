import React from 'react';
import SocialEditableFieldContainer from './_children/SocialEditableFieldContainer';

export default {
  title: 'Blocks/Identity/Blocks/Account Management',
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
};

export const withFoundUsername = () => (
  <SocialEditableFieldContainer
    foundUsername="jennylopez@gmail.com"
  />
);

export const withoutFoundUsername = () => (
  <SocialEditableFieldContainer
    foundUsername=""
  />
);
