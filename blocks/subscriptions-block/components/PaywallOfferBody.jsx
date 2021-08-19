import React, { useState, useEffect } from 'react';
import isUrl from 'is-url';

import { useIdentity } from '@wpmedia/identity-block';
import { useOffer } from './Offer';
import { usePaywall } from './Paywall';

export const PaywallOfferBody = ({
  loginURL,
  offerURL = '/offer/',
  campaignCode,
}) => {
  const { isLoggedIn, Identity } = useIdentity();
  const [title, setTitle] = useState();
  const [subtitle, setSubtitle] = useState();

  const {
    results: paywallResults = {},
    ArcP = {},
  } = usePaywall();
  // eslint-disable-next-line no-underscore-dangle
  const rules = ArcP._rules || [];
  const [triggeredRule, setTriggeredRule] = useState();
  const [triggeredRules, setTriggeredRules] = useState([]);
  const [pw, setPw] = useState();

  const { offer, fetchOffer } = useOffer({
    campaignCode: campaignCode || (!isUrl(pw) ? pw : null),
  });
  const [pwOffer, setPwOffer] = useState();
  useEffect(() => {
    const selectedOffer = pwOffer || offer;
    if (selectedOffer) {
      setTitle(selectedOffer.pageTitle);
      setSubtitle(selectedOffer.pageSubTitle);
    }
  }, [offer, pwOffer]);

  useEffect(() => {
    const fetchNewOffer = async () => {
      setPwOffer(await fetchOffer(pw));
    };
    if (pw && !isUrl(pw) && (!pwOffer || pwOffer.pw !== pw)) {
      fetchNewOffer();
    }
  }, [pw, fetchOffer, pwOffer]);

  useEffect(() => {
    const ruleId = paywallResults.triggered && paywallResults.triggered.id;
    const rc = paywallResults.triggered && paywallResults.triggered.rc;
    if (ruleId) {
      const newTriggeredRule = rules.find((rule) => ruleId === rule.id);
      const newTriggeredRules = rules.filter((rule) => rule.rt[1] < rc);
      setTriggeredRule(newTriggeredRule);
      setTriggeredRules(newTriggeredRules);
    }
  }, [paywallResults.triggered, rules]);

  useEffect(() => {
    if (triggeredRule && triggeredRules) {
      if (triggeredRule.e && triggeredRule.e.length > 1) {
        setPw(triggeredRule.pw);
        return;
      }
      if (triggeredRules.length) {
        const triggeredz = triggeredRules
          .sort((a, b) => b.rt[1] - a.rt[1]);
        const triggered = triggeredz
          .find((rule) => rule.e && rule.e.length > 1) || {};
        setPw(triggered.pw);
      }
    }
  }, [triggeredRule, triggeredRules]);

  const isPwUrl = pw && isUrl(pw);
  const campaign = campaignCode || (!isPwUrl ? pw : 'default');
  return (
    <>
      {loginURL && !isLoggedIn ? (
        <p className="xpmedia-paywall--header">
          Already a subscriber?
          {' '}
          <button
            type="button"
            onClick={async () => {
              try {
                await Identity.login('matthewkim93+test12345@gmail.com', 'Test12345!', { rememberMe: true });
                window.location.reload();
              } catch (e) {
                // console.error(e);
              }
            }}
          >
            Sign In
          </button>
        </p>
      ) : null}

      {title
        ? (
          <p
            className="xpmedia-paywall--title"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        ) : 'Subscribe to continue reading'}
      {subtitle ? (
        <p
          className="xpmedia-paywall--subtitle"
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />
      ) : null}
      <a href={isPwUrl ? pw : `${offerURL}?_cid=${campaign}`} className="xpmedia-paywall--button">Subscribe</a>
    </>
  );
};

PaywallOfferBody.label = 'Paywall Offer Body - Arc Block';

export default PaywallOfferBody;
