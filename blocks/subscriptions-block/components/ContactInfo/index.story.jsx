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
    callback={() => 0}
    user={false}
    logoutCallback={() => 0}
  />
);
