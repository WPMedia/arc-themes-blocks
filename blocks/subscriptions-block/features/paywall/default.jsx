import React from 'react';
import { isServerSide } from '@wpmedia/engine-theme-sdk';
import PropTypes from '@arc-fusion/prop-types';

import {
  usePaywall,
} from '../../components/Paywall';
import SignwallBody from '../../components/SignwallBody';
import { PaywallOfferBody } from '../../components/PaywallOfferBody';
import '../../components/styles.scss';

const Paywall = ({
  customFields,
}) => {
  const {
    signUpURL, loginURL, offerURL, campaignCode,
  } = customFields;
  const {
    isPaywalled,
    isSignwall,
    triggeredRule = {},
  } = usePaywall();

  if (!isPaywalled || isServerSide()) {
    return null;
  }

  return (
    <div className="xpmedia-paywall">
      <div className="xpmedia-paywall-container">
        {
          isSignwall ? (
            <SignwallBody
              signUpURL={signUpURL}
              loginURL={loginURL}
            />
          ) : (
            <PaywallOfferBody
              offerURL={offerURL}
              loginURL={loginURL}
              campaignCode={campaignCode || triggeredRule.pw}
            />
          )
        }
      </div>
    </div>
  );
};

Paywall.label = 'Paywall - Arc Block';

Paywall.propTypes = {
  customFields: PropTypes.shape({
    signUpURL: PropTypes.string.tag({
      defaultValue: '/account/sign-up/',
    }),
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

export default Paywall;
