import React from 'react';
import ShareBar from './features/share-bar/default';

export default { title: 'Share Bar' };

export const basic = () => (
  <ShareBar />
);

const data = () => ({
  customFields: {
    email: false,
    facebook: true,
    pinterest: false,
    twitter: false,
    linkedIn: false,
  },
  globalContent: {
    label: {
      basic: {
        display: true,
        url: 'http://google.com/',
        text: 'Overline Text Root',
      },
    },
  },
});

export const onlyFacebook = () => (
  <ShareBar fusionContext={data} />
);
