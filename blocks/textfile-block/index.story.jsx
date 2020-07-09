import React from 'react';
import Text from './features/textfile/text';

export default {
  component: Text,
  title: 'Text File',
  decorators: [
    (storyFn) => (<pre>{storyFn()}</pre>),
  ],
};

export const output = () => (
  <Text customFields={{ Text: 'User-agent: *\nAllow: /\n\nSitemap: http://www.example.com/sitemap.xml' }} />
);
