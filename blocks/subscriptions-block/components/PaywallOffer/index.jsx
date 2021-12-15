import React, { useEffect, useRef, useState } from 'react';
import { isServerSide } from '@wpmedia/engine-theme-sdk';
import isUrl from 'is-url';
import useOffer from '../useOffer';
import SubscriptionOverlay from '../SubscriptionOverlay';
import SubscriptionDialog from '../SubscriptionDialog';

const isPaywallCampaignURL = (payWallCode) => payWallCode && isUrl(payWallCode);

const PaywallOffer = ({
  actionText,
  actionUrl,
  campaignCode = null,
  displayMode,
  linkPrompt,
  linkText,
  linkUrl,
  reasonPrompt,
  usePortal = true,
}) => {
  // the paywall code (otherwise known as a campaign code)
  const [payWallCode, setPayWallCode] = useState();

  const { offer, fetchOffer } = useOffer({ campaignCode });

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
    const campaign = campaignCode || 'default';
    setPayWallCode(campaign);
  }, [campaignCode]);

  // This will grab the offer corresponding to the paywall code
  useEffect(() => {
    const fetchNewOffer = async () => {
      payWallOffer.current = await fetchOffer(payWallCode);
      if (payWallOffer.current) {
        setSelectedOffer(payWallOffer.current);
      }
    };
    if (payWallCode
      && !isUrl(payWallCode)
      && (!payWallOffer.current || payWallOffer.current.pw !== payWallCode)) {
      fetchNewOffer();
    }
    return () => {
      payWallOffer.current = null;
    };
  }, [payWallCode, fetchOffer]);

  /**
   *  Return null if server side, not paywalled, doesn't have an offer to show
   *  or if the user is logged in.
   */
  if (isServerSide() || !selectedOffer) {
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
  const actionUrlFinal = !campaign || campaign === 'default'
    ? actionUrl
    : `${actionUrl}?campaign=${campaign}`;

  return (
    <SubscriptionOverlay displayMode={displayMode} usePortal={usePortal}>
      <SubscriptionDialog
        actionText={actionText}
        actionUrl={isPaywallCampaignURL(payWallCode)
          ? payWallCode
          : actionUrlFinal}
        headline={selectedOffer.pageTitle}
        linkPrompt={linkPrompt}
        linkText={linkText}
        linkUrl={linkUrl}
        reasonPrompt={reasonPrompt}
        subHeadline={selectedOffer.pageSubTitle}
      />
    </SubscriptionOverlay>
  );
};

export default PaywallOffer;
