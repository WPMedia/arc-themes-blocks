import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import Overline from './features/overline/default';

export default {
  title: 'Blocks/Overline',
  decorators: [withKnobs],
  // Disabling Snapshot of block as this block is currently an interface for Shared Styles/Overline
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const usingANSStoryObject = () => {
  const content = {
    websites: {
      'story-book': {
        website_section: {
          _id: text('websites[arcSite].website_section._id', '/news/'),
          name: text('websites[arcSite].website_section.name', 'News'),
        },
      },
    },
  };

  return (
    <Overline story={content} className={text('className', '')} />
  );
};

export const sponsoredContentOutput = () => {
  const content = {
    owner: {
      sponsored: true,
    },
    websites: {
      'story-book': {
        website_section: {
          _id: text('websites[arcSite].website_section._id', '/news/'),
          name: text('websites[arcSite].website_section.name', 'News'),
        },
      },
    },
  };

  return (
    <Overline story={content} className={text('className', '')} />
  );
};

export const customLinkTextAndUrl = () => {
  const props = {
    customText: text('customText', 'Overline Text'),
    customUrl: text('customUrl', 'https://arcxp.com'),
    className: text('className', ''),
  };

  return (
    <Overline {...props} />
  );
};
