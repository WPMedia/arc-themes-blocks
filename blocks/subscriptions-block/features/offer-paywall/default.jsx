import React from 'react';
import { isServerSide } from '@wpmedia/engine-theme-sdk';
import PropTypes from '@arc-fusion/prop-types';

import {
  usePaywall,
} from '../../components/Paywall';
import { PaywallOfferBody } from '../../components/PaywallOfferBody';
import '../../components/styles.scss';

const OfferPaywall = ({
  customFields,
}) => {
  const { loginURL, offerURL, campaignCode } = customFields;
  const {
    isPaywalled,
  } = usePaywall();

  if (!isPaywalled || isServerSide()) {
    return null;
  }

  return (
    <div className="xpmedia-paywall">
      <div className="xpmedia-paywall-container">
        <PaywallOfferBody
          offerURL={offerURL}
          loginURL={loginURL}
          campaignCode={campaignCode}
        />
      </div>
    </div>
  );
};

OfferPaywall.label = 'Offer Paywall - Arc Block';

OfferPaywall.propTypes = {
  customFields: PropTypes.shape({
    loginURL: PropTypes.string.tag({
      defaultValue: '/account/login/',
    }),
    offerURL: PropTypes.string.tag({
      defaultValue: '/offer/',
    }),
    campaignCode: PropTypes.string.tag({
      defaultValue: '',
    }),
  }),
};

export default OfferPaywall;
