import React from 'react';
import SocialEditableFieldContainer from './_children/SocialEditableFieldContainer';

export default {
  title: 'Blocks/Identity/Blocks/Account Management',
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
};

export const withConnectedAccountWithDisconnectButton = () => (
  <SocialEditableFieldContainer
    text="Connected"
    onDisconnectFunction={() => {}}
    showDisconnectButton
    disconnectText="Disconnect"
  />
);

export const withConnectedAccountWithoutDisconnectButton = () => (
  <SocialEditableFieldContainer
    text="Connected"
    onDisconnectFunction={() => {}}
    showDisconnectButton={false}
    disconnectText="Disconnect"
  />
);
