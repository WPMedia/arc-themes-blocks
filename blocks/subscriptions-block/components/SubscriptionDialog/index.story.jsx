import React from 'react';

import SubscriptionDialog from '.';

export default {
  title: 'Blocks/Subscriptions/Components/Subscription Dialog',
  parameters: {
    chromatic: { viewports: [320, 1023, 1200] },
  },
};

export const allFields = () => (
  <SubscriptionDialog
    actionText="Subscribe"
    actionUrl="#"
    reasonPrompt="Subscribe to continue reading Storybook documents."
    headline="Get every storybook item for only $9 a month"
    linkText="Log In"
    linkPrompt="Already a Storybook patron?"
    linkUrl="#"
    subHeadline="You may <b>think</b> you want to cancel, but deep down you know you don't."
  />
);

export const minimalFields = () => (
  <SubscriptionDialog
    linkText="Link"
    linkUrl="#"
  />
);

export const withButton = () => (
  <SubscriptionDialog
    actionAriaLabel="ariaAction"
    actionText="Subscribe"
    actionUrl="#"
    linkText="Log In"
    linkUrl="#"
  />
);

export const withReason = () => (
  <SubscriptionDialog
    reasonPrompt="That is restricted."
    linkText="Log In"
    linkUrl="#"
  />
);

export const withLinkPrompt = () => (
  <SubscriptionDialog
    linkPrompt="You must Log in."
    linkText="Log In"
    linkUrl="#"
  />
);

export const withHeadline = () => (
  <SubscriptionDialog
    headline="This is a headline!"
    linkText="This is a link"
    linkUrl="#"
  />
);

export const withSubheadline = () => (
  <SubscriptionDialog
    subHeadline="This is a subheadline!"
    linkText="This is a link"
    linkUrl="#"
  />
);
