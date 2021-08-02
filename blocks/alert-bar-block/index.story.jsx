import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { AlertBarPresentational } from './features/alert-bar/default';

export default {
  title: 'Blocks/Alert Bar',
  decorators: [withKnobs],
  parameters: {
    // Set the viewports in Chromatic at a component level.
    chromatic: { viewports: [320, 1200] },
  },
};

const mockHeadlineObject = {
  headlines: {
    basic: '7 questions about traveling to Australia during catastrophic fires, answered',
  },
  websites: {
    'story-book': {
      website_url: 'https://storybook.js.org',
    },
  },
};

export const headlineAndLink = () => {
  const contentPaylod = {
    content_elements: [
      mockHeadlineObject,
    ],
  };

  return (
    <AlertBarPresentational
      alertRef={null}
      barAriaLabel="Alert bar"
      closeAriaLabel="Close"
      hideAlertHandler={null}
      arcSite="story-book"
      content={contentPaylod}
    />
  );
};

export const noHeadlineAndWithLink = () => {
  const noHeadlineObject = {
    ...mockHeadlineObject,
    headlines: {
      basic: '',
    },
  };
  const contentPaylod = {
    content_elements: [
      noHeadlineObject,
    ],
  };

  return (
    <AlertBarPresentational
      alertRef={null}
      barAriaLabel="Alert bar"
      closeAriaLabel="Close"
      hideAlertHandler={null}
      arcSite="story-book"
      content={contentPaylod}
    />
  );
};

export const headlineAndNoLink = () => {
  const noLinkObject = {
    ...mockHeadlineObject,
    websites: {
      'story-book': {
        website_url: '',
      },
    },
  };
  const contentPaylod = {
    content_elements: [
      noLinkObject,
    ],
  };

  return (
    <AlertBarPresentational
      alertRef={null}
      barAriaLabel="Alert bar"
      closeAriaLabel="Close"
      hideAlertHandler={null}
      arcSite="story-book"
      content={contentPaylod}
    />
  );
};

export const headlineWithReallyLongText = () => {
  const longHeadlineObject = {
    ...mockHeadlineObject,
    headlines: {
      basic: 'This is a really long headline, especially with the longest word pneumonoultramicroscopicsilicovolcanoconiosis pneumonoultramicroscopicsilicovolcanoconiosis pneumonoultramicroscopicsilicovolcanoconiosis pneumonoultramicroscopicsilicovolcanoconiosis pneumonoultramicroscopicsilicovolcanoconiosis pneumonoultramicroscopicsilicovolcanoconiosis pneumonoultramicroscopicsilicovolcanoconiosis',
    },
  };
  const contentPaylod = {
    content_elements: [
      longHeadlineObject,
    ],
  };

  return (
    <AlertBarPresentational
      alertRef={null}
      barAriaLabel="Alert bar"
      closeAriaLabel="Close"
      hideAlertHandler={null}
      arcSite="story-book"
      content={contentPaylod}
    />
  );
};
