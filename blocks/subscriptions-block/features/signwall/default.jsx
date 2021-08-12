import React, { useEffect, useState } from 'react';
import { isServerSide } from '@wpmedia/engine-theme-sdk';
import PropTypes from '@arc-fusion/prop-types';

import { useIdentity } from '@wpmedia/identity-block';
import {
  usePaywall,
} from '../../components/Paywall';
import SignwallBody from '../../components/SignwallBody';
import PaywallOfferBody from '../../components/PaywallOfferBody';
import '../../components/styles.scss';

const Signwall = ({
  customFields
}) => {
  const { signUpURL, loginURL, offerURL } = customFields;
  const { isLoggedIn } = useIdentity();
  const {
    isPaywalled
  } = usePaywall();

  if (!isPaywalled || isServerSide()) {
    return null;
  }

  return (
    <div className="xpmedia-paywall">
      <div className="xpmedia-paywall-container">
        <SignwallBody
          signUpURL={signUpURL}
          loginURL={loginURL}
        />
      </div>
    </div>
  )
};

Signwall.label = 'Signwall - Arc Block';

Signwall.propTypes = {
  customFields: PropTypes.shape({
    signUpURL: PropTypes.string.tag({
      defaultValue: '/account/sign-up/',
    }),
    loginURL: PropTypes.string.tag({
      defaultValue: '/account/login/',
    })
  }),
};

export default Signwall;
