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

const HEADLINE = '7 questions about traveling to Australia during catastrophic fires, answered';
const WEBSITE_URL = 'https://storybook.js.org';

export const headlineAndLink = () => (
  <AlertBarPresentational
    alertRef={null}
    barAriaLabel="Alert bar"
    closeAriaLabel="Close"
    hideAlertHandler={null}
    headline={HEADLINE}
    websiteURL={WEBSITE_URL}
    filledIn
  />
);

export const headlineAndNoLink = () => (
  <AlertBarPresentational
    alertRef={null}
    barAriaLabel="Alert bar"
    closeAriaLabel="Close"
    hideAlertHandler={null}
    headline={HEADLINE}
    websiteURL=""
    filledIn
  />
);

export const headlineWithReallyLongText = () => (
  <AlertBarPresentational
    alertRef={null}
    barAriaLabel="Alert bar"
    closeAriaLabel="Close"
    hideAlertHandler={null}
    headline="This is a really long headline, especially with the longest word pneumonoultramicroscopicsilicovolcanoconiosis pneumonoultramicroscopicsilicovolcanoconiosis pneumonoultramicroscopicsilicovolcanoconiosis pneumonoultramicroscopicsilicovolcanoconiosis pneumonoultramicroscopicsilicovolcanoconiosis pneumonoultramicroscopicsilicovolcanoconiosis pneumonoultramicroscopicsilicovolcanoconiosis"
    websiteURL={WEBSITE_URL}
    filledIn
  />
);

export const placeHolderEmpty = () => (
  <AlertBarPresentational
    alertRef={null}
    barAriaLabel="Alert bar"
    closeAriaLabel="Close"
    hideAlertHandler={null}
    websiteURL={WEBSITE_URL}
    headline={HEADLINE}
    filledIn={false}
  />
);
