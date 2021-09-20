import React from 'react';

import ActionDialog from '.';

export default {
  title: 'Blocks/Subscriptions/Components/Action Dialog',
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
};

export const allFields = () => (
  <ActionDialog
    actionText="Subscribe"
    actionUrl="#"
    reasonPromptText="Subscribe to continue reading Storybook documents."
    headlineText="Get every storybook item for only $9 a month"
    linkText="Log In"
    linkPromptText="Already a Storybook patron?"
    linkUrl="#"
    subHeadlineText="You may <b>think</b> you want to cancel, but deep down you know you don't."
  />
);

export const minimalFields = () => (
  <ActionDialog
    linkText="Link"
    linkUrl="#"
  />
);

export const withButton = () => (
  <ActionDialog
    actionAriaLabel="ariaAction"
    actionText="Subscribe"
    actionUrl="#"
    linkText="Log In"
    linkUrl="#"
  />
);

export const withReason = () => (
  <ActionDialog
    reasonPromptText="That is restricted."
    linkAriaLabel="log in"
    linkText="Log In"
    linkUrl="#"
  />
);

export const withLinkPrompt = () => (
  <ActionDialog
    linkPromptText="You must Log in."
    linkText="Log In"
    linkUrl="#"
  />
);

export const withHeadline = () => (
  <ActionDialog
    headlineText="This is a headline!"
    linkText="This is a link"
    linkUrl="#"
  />
);

export const withSubheadline = () => (
  <ActionDialog
    subHeadlineText="This is a subheadline!"
    linkText="This is a link"
    linkUrl="#"
  />
);
