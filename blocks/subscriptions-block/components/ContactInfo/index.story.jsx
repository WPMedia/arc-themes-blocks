import React from 'react';

import ContactInfo from '.';

export default {
  title: 'Blocks/Subscriptions/Components/Contact Info',
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
};

export const contactInfo = () => (
  <ContactInfo
    callback={() => { console.log('Contact info returned back to parent.'); }}
    user={false}
    logoutCallback={() => { console.log('Request sign out from parent.'); }}
  />
);
