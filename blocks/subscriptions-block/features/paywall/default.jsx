import React from 'react';
import { isServerSide } from '@wpmedia/engine-theme-sdk';
import PropTypes from '@arc-fusion/prop-types';

import getTranslatedPhrases from 'fusion:intl';
import getProperties from 'fusion:properties';

import PaywallOffer from '../../components/PaywallOffer';
import usePaywall from '../../components/usePaywall';

const Paywall = ({
  arcSite,
  customFields,
}) => {
  const {
    campaignCode,
    linkUrl,
    offerURL,
  } = customFields;

  const {
    isPaywalled,
    isRegisterwalled,
  } = usePaywall();

  const { locale } = getProperties(arcSite);
  const phrases = getTranslatedPhrases(locale);

  /**
   *  Return null if server side, not paywalled,
   *
   *  Blocking isRegisterwalled for now too until its implemented
   */
  if (isServerSide() || !isPaywalled || isRegisterwalled) {
    return null;
  }

  return (
    <PaywallOffer
      actionText={phrases.t('identity-block.paywall-button-text')}
      campaignCode={campaignCode}
      linkPrompt={phrases.t('identity-block.paywall-link-prompt')}
      linkText={phrases.t('identity-block.paywall-link-text')}
      linkUrl={linkUrl}
      offerURL={offerURL}
      reasonPrompt={phrases.t('identity-block.paywall-reason-prompt')}
    />
  );
};

Paywall.icon = 'tag-dollar';

Paywall.label = 'Paywall - Arc Block';

Paywall.propTypes = {
  customFields: PropTypes.shape({
    campaignCode: PropTypes.string.tag({
      defaultValue: 'default',
    }),
    linkUrl: PropTypes.string.tag({
      label: 'Log In link URL',
      defaultValue: '/account/login',
    }),
    offerURL: PropTypes.string.tag({
      defaultValue: '/offer/',
    }),
  }),
};

export default Paywall;
