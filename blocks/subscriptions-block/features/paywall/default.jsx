import React from 'react';
import { isServerSide } from '@wpmedia/engine-theme-sdk';
import PropTypes from '@arc-fusion/prop-types';

import usePaywall from '../../components/usePaywall';
import PaywallOffer from '../../components/PaywallOffer';

const Paywall = ({
  customFields,
}) => {
  const {
    reasonPrompt,
    linkPrompt,
    linkText,
    linkUrl,
    actionText,
    offerURL,
  } = customFields;

  const {
    isRegwall,
    isPaywalled,
  } = usePaywall();

  /**
   *  Return null if server side, not paywalled,
   *
   *  Blocking isRegwall for now too until its implemented
   */
  if (isServerSide() || !isPaywalled || isRegwall) {
    return null;
  }

  return (
    <PaywallOffer
      reasonPrompt={reasonPrompt}
      linkPrompt={linkPrompt}
      linkText={linkText}
      linkUrl={linkUrl}
      offerURL={offerURL}
      actionText={actionText}
    />
  );
};

Paywall.label = 'Paywall - Arc Block';

Paywall.propTypes = {
  customFields: PropTypes.shape({
    reasonPrompt: PropTypes.string.tag({
      label: 'Prompt text',
      defaultValue: 'Subscribe to continue reading.',
    }),
    linkPrompt: PropTypes.string.tag({
      label: 'Log in prompt text',
      defaultValue: 'Already a subscriber?',
    }),
    linkText: PropTypes.string.tag({
      label: 'Log In link text',
      defaultValue: 'Log In.',
    }),
    linkUrl: PropTypes.string.tag({
      label: 'Log In link URL',
      defaultValue: '/account/login',
    }),
    actionText: PropTypes.string.tag({
      label: 'CTA button text',
      defaultValue: 'Subscribe',
    }),
    offerURL: PropTypes.string.tag({
      defaultValue: '/offer/',
    }),
    campaignCode: PropTypes.string.tag({
      defaultValue: 'default',
    }),
  }),
};

export default Paywall;
