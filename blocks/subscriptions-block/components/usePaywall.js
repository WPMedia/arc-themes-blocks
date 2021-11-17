import { useCallback, useEffect, useState } from 'react';

import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';

import Identity from '@arc-publishing/sdk-identity';
import { isServerSide } from '@wpmedia/engine-theme-sdk';

const usePaywall = () => {
  const { arcSite, globalContent } = useFusionContext();
  const { api } = getProperties(arcSite);

  const [isPaywalled, setIsPaywalled] = useState(false);
  const [campaignCode, setCampaignCode] = useState();
  const [results, setResults] = useState();
  const [triggeredRule, setTriggeredRule] = useState();
  const [otherTriggeredRules, setOtherTriggeredRules] = useState([]);
  const [isRegwalled, setIsRegwalled] = useState();

  // eslint-disable-next-line no-underscore-dangle
  const rules = (!isServerSide() && window?.ArcP?._rules) || [];

  const apiOrigin = api?.retail?.origin;

  useEffect(() => {
    const runPaywall = async () => {
      setResults(
        // Subs ArcP.run assumes https://, so we need to strip it from the endpoint origin.
        await window?.ArcP?.run({
          apiOrigin: apiOrigin.replace(/^https?:\/\//i, ''),
          contentIdentifier: globalContent.canonical_url,
          contentRestriction: globalContent.content_restrictions.content_code,
          contentType: globalContent.type,
          Identity,
          paywallFunction: (campaign) => {
            setCampaignCode(campaign);
            setIsPaywalled(true);
          },
          section: globalContent.taxonomy.primary_section._id,
        }),
      );
    };
    if (
      apiOrigin
      && globalContent?.canonical_url
      && globalContent?.content_restrictions?.content_code
      && Identity
      && !isPaywalled
      && !isServerSide()
    ) {
      runPaywall();
    }
  }, [
    apiOrigin,
    globalContent.canonical_url,
    globalContent.content_restrictions,
    globalContent.taxonomy.primary_section,
    globalContent.type,
    isPaywalled,
  ]);

  useEffect(() => {
    if (results && rules?.length) {
      const newTriggeredRule = rules?.find((rule) => results?.triggered?.id === rule.id);
      const newOtherTriggeredRules = rules?.filter((rule) => rule.rt[1] < results?.triggered?.rc);
      if (newTriggeredRule) {
        setTriggeredRule(newTriggeredRule);
      }
      if (newOtherTriggeredRules?.length) {
        setOtherTriggeredRules(newOtherTriggeredRules);
      }
    }
  }, [results, rules]);

  useEffect(() => {
    if (triggeredRule || otherTriggeredRules) {
      if (triggeredRule?.e?.length > 1) {
        setIsRegwalled(false);
        return;
      }
      if (otherTriggeredRules?.length) {
        const paywallRule = otherTriggeredRules
          .sort((a, b) => b.rt[1] - a.rt[1])
          .find((rule) => rule?.e?.length > 1);
        setIsRegwalled(!paywallRule);
        if (paywallRule && triggeredRule !== paywallRule) {
          setTriggeredRule(paywallRule);
        }
        return;
      }
      if (triggeredRule?.e?.length === 1) {
        setIsRegwalled(true);
      }
    }
  }, [triggeredRule, otherTriggeredRules]);

  const getRegistrationRules = useCallback(
    () => rules?.filter((rule) => rule.e.length === 1 && rule.e[0]),
    [rules],
  );

  const getSubscribeRules = useCallback(
    () => rules?.filter((rule) => rule.e.length > 1),
    [rules],
  );

  if (isServerSide()) {
    return {
      campaignCode: undefined,
      getRegistrationRules: undefined,
      getSubscribeRules: undefined,
      isPaywalled: false,
      isRegwalled: false,
      results: undefined,
      rules: undefined,
      triggeredRule: undefined,
    };
  }

  return {
    campaignCode,
    getRegistrationRules,
    getSubscribeRules,
    isPaywalled,
    isRegwalled,
    results,
    rules,
    triggeredRule,
  };
};

export default usePaywall;
