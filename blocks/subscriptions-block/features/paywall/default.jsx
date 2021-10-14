import React, { useEffect, useRef, useState } from 'react';
import { isServerSide } from '@wpmedia/engine-theme-sdk';
import PropTypes from '@arc-fusion/prop-types';

import isUrl from 'is-url';
import usePaywall from '../../components/usePaywall';
import useOffer from '../../components/useOffer';
import { useIdentity } from '../../../identity-block';
import SubscriptionOverlay from '../../components/SubscriptionOverlay';
import SubscriptionDialog from '../../components/SubscriptionDialog';

const isPaywallCampaignURL = (payWallCode) => payWallCode && isUrl(payWallCode);

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
    campaignCode,
  } = customFields;

  const {
    campaignCode: initialCampaignCode,
    isPaywalled,
  } = usePaywall();

  // the paywall code (otherwise known as a campaign code)
  const [payWallCode, setPayWallCode] = useState();

  const { offer, fetchOffer } = useOffer({
    campaignCode: campaignCode || (!isUrl(initialCampaignCode) ? initialCampaignCode : null),
  });

  const { isLoggedIn } = useIdentity();

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
   * If campaignCode is passed in as a prop,
   * use that.  Otherwise use what is returned from
   * usePaywall hook and at the very least, set it
   * to "default"
   */
  useEffect(() => {
    const campaign = campaignCode
      || (!isPaywallCampaignURL(initialCampaignCode) ? initialCampaignCode : 'default');
    setPayWallCode(campaign);
  }, [campaignCode, initialCampaignCode]);

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

  /**
   *  Return null if server side, not paywalled, doesn't have an offer to show
   *  or if the user is logged in.
   */
  if (isServerSide() || !isPaywalled || !selectedOffer || isLoggedIn) {
    return null;
  }

  /**
   * Need to determine the campaign code.
   * First we see if we have been provided with a campaignCode prop.
   * If not then we check if the payWallCode is not a url, if its
   * not, then we use that.  If it a url (Why would it be a URL??) then
   * we just set the campaign code to "default"
   */
  const campaign = campaignCode || (!isPaywallCampaignURL(payWallCode) ? payWallCode : 'default');
  const actionUrl = isPaywallCampaignURL(payWallCode)
    ? payWallCode : `${offerURL}?_cid=${campaign}`;

  return (
    <SubscriptionOverlay>
      <SubscriptionDialog
        reasonPrompt={reasonPrompt}
        linkPrompt={linkPrompt}
        linkText={linkText}
        linkUrl={linkUrl}
        headline={selectedOffer.pageTitle}
        subHeadline={selectedOffer.pageSubTitle}
        actionUrl={actionUrl}
        actionText={actionText}
      />
    </SubscriptionOverlay>
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
