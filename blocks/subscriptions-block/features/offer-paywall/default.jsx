import React, { useEffect, useRef, useState } from 'react';
import { isServerSide } from '@wpmedia/engine-theme-sdk';
import PropTypes from '@arc-fusion/prop-types';

import isUrl from 'is-url/index';
import usePaywall from '../../components/usePaywall';
import PaywallOfferBody from '../../components/PaywallOfferBody';
import useOffer from '../../components/useOffer';
import { useIdentity } from '../../../identity-block';

const OfferPaywall = ({
  customFields,
}) => {
  const { loginURL, offerURL, campaignCode } = customFields;

  // the paywall code (otherwise known as a campaign code)
  const [payWallCode, setPayWallCode] = useState();

  const { offer, fetchOffer } = useOffer({
    campaignCode: campaignCode || (!isUrl(payWallCode) ? payWallCode : null),
  });

  const { isLoggedIn } = useIdentity();

  const {
    triggeredRule,
    rules = [],
    isPaywalled,
  } = usePaywall();

  /**
   * payWallOffer is the most updated offer that is returned from
   * the fetchOffer method in the useOffer hook.
   * We can't use the offer object that is returned from the useOffer
   * directly as that causes a recursive call to the second useEffect.
   *
   * When the payWallOffer is updated in the second hook it's current
   * value will be applied to the selectedOffer state to update the dom.
   */
  const payWallOffer = useRef(offer);

  const [selectedOffer, setSelectedOffer] = useState(payWallOffer.current);

  /**
   * Goal here is to find the paywall code (i.e. campaign code)
   */
  useEffect(() => {
    const ruleId = triggeredRule && triggeredRule.id;
    const rc = triggeredRule && triggeredRule.rc;
    if (ruleId && rules.length) {
      const triggeredRules = rules.filter((rule) => rule.rt[1] < rc);
      if (triggeredRule && triggeredRules) {
        if (triggeredRule.e && triggeredRule.e.length > 1) {
          setPayWallCode(triggeredRule.pw);
          return;
        }
        if (triggeredRules.length) {
          const triggeredz = triggeredRules
            .sort((a, b) => b.rt[1] - a.rt[1]);
          const triggered = triggeredz
            .find((rule) => rule.e && rule.e.length > 1) || {};
          setPayWallCode(triggered.pw);
        }
      }
    }
  }, [rules, triggeredRule]);

  // This will grab the offer corresponding to the paywall code
  useEffect(() => {
    const fetchNewOffer = async () => {
      payWallOffer.current = await fetchOffer(payWallCode);
      if (payWallOffer.current) {
        setSelectedOffer(payWallOffer.current);
      }
    };
    if (payWallCode && !isUrl(payWallCode)
      && (!payWallOffer.current || payWallOffer.current.pw !== payWallCode)) {
      fetchNewOffer();
    }
  }, [payWallCode, fetchOffer]);

  // Check to see if the payWallCode is a URL or not.
  const isPwUrl = payWallCode && isUrl(payWallCode);

  /**
   * Need to determine the campaign code.
   * First we see if we have been provided with a campaignCode prop.
   * If not then we check if the payWallCode is not a url, if its
   * not, then we use that.  If it a url (Why would it be a URL??) then
   * we just set the campaign code to "default"
   */
  const campaign = campaignCode || (!isPwUrl ? payWallCode : 'default');

  if (!isPaywalled || isServerSide()) {
    return null;
  }

  /**
   *  Return null if server side, not paywalled, don't have an offer to show
   *  or if the user is logged in.
   */
  if (isServerSide() || !isPaywalled || !selectedOffer || isLoggedIn) {
    return null;
  }

  return (
    <PaywallOfferBody
      offerURL={offerURL}
      loginURL={loginURL}
      campaignCode={campaign}
      selectedOffer={selectedOffer}
      payWallCode={payWallCode}
      isPwUrl={isPwUrl}
    />
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
      defaultValue: 'default',
    }),
  }),
};

export default OfferPaywall;
