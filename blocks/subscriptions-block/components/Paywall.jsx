import { useState, useEffect } from 'react';
import { useIdentity } from '@wpmedia/identity-block';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';

import { isServerSide } from '@wpmedia/engine-theme-sdk';

export const findRegwallRules = (rules = []) => rules.filter((rule) => (
  rule.e.length === 1 && rule.e[0]
));

export const findSubscribeRules = (rules = []) => rules.filter((rule) => rule.e.length > 1);

export const usePaywall = () => {
  const [isPaywalled, setIsPaywalled] = useState(false);
  const [triggeredResults, setTriggeredResults] = useState();
  const [results, setResults] = useState();
  const [triggeredRule, setTriggeredRule] = useState();
  const [otherTriggeredRules, setOtherTriggeredRules] = useState([]);
  const [isSignwall, setIsSignwall] = useState();

  const { Identity, isInitialized } = useIdentity();
  const { arcSite, globalContent } = useFusionContext();
  const { subscriptions } = getProperties(arcSite);

  // eslint-disable-next-line no-underscore-dangle
  const rules = window && window.ArcP && window.ArcP._rules;

  const [contentId, setContentId] = useState(() => globalContent.canonical_url);

  useEffect(() => {
    if (globalContent.canonical_url && globalContent.canonical_url !== contentId) {
      setContentId(globalContent.canonical_url);
    }
  }, [globalContent.canonical_url, contentId]);

  useEffect(() => {
    const runPaywall = async () => {
      const paywallResults = typeof window !== 'undefined'
        && window
        && window.ArcP
        && await window.ArcP.run({
          Identity,
          apiOrigin: subscriptions.sales.apiOrigin,
          paywallFunction: (response) => {
            setTriggeredResults(response);
            setIsPaywalled(true);
          },
          contentType: globalContent.type,
          contentIdentifier: contentId,
          section: globalContent.taxonomy.primary_section._id,
          contentRestriction: globalContent.content_restrictions.content_code,
          headers: subscriptions.headers,
        });
      setResults(paywallResults);
    };
    if (
      Identity
      && isInitialized
      && !isServerSide()
      && !isPaywalled
      && contentId
    ) {
      runPaywall();
    }
  }, [
    Identity,
    isInitialized,
    isPaywalled,
    contentId,
    globalContent.content_restrictions.content_code,
    globalContent.taxonomy.primary_section._id,
    globalContent.type,
    subscriptions.headers,
    subscriptions.sales.apiOrigin,
  ]);

  useEffect(() => {
    if (results) {
      const ruleId = results.triggered && results.triggered.id;
      const rc = results.triggered && results.triggered.rc;
      const newTriggeredRule = rules.find((rule) => ruleId === rule.id);
      const newOtherTriggeredRules = rules.filter((rule) => rule.rt[1] < rc);
      if (newTriggeredRule && (!triggeredRule || triggeredRule.id !== newTriggeredRule.id)) {
        setTriggeredRule(newTriggeredRule);
      }
      if (newOtherTriggeredRules.length && otherTriggeredRules !== newOtherTriggeredRules) {
        setOtherTriggeredRules(newOtherTriggeredRules);
      }
    }
  }, [results, rules, otherTriggeredRules, triggeredRule]);

  useEffect(() => {
    if (triggeredRule || otherTriggeredRules) {
      if (triggeredRule && triggeredRule.e && triggeredRule.e.length > 1) {
        setIsSignwall(false);
        return;
      }
      if (otherTriggeredRules && otherTriggeredRules.length) {
        const paywallRule = otherTriggeredRules
          .sort((a, b) => b.rt[1] - a.rt[1])
          .find((rule) => rule.e && rule.e.length > 1);
        setIsSignwall(!paywallRule);
        if (paywallRule && triggeredRule !== paywallRule) {
          setTriggeredRule(paywallRule);
        }
        return;
      }
      if (triggeredRule && triggeredRule.e && triggeredRule.e.length === 1) {
        setIsSignwall(true);
      }
    }
  }, [triggeredRule, otherTriggeredRules]);

  if (isServerSide()) {
    return null;
  }

  return {
    isPaywalled,
    results,
    triggeredResults,
    triggeredRule,
    isSignwall,
    getTriggeredRule: () => triggeredRule,
    getIsPaywalledStatus: () => isPaywalled,
    getPaywallResults: () => results,
    ArcP: typeof window !== 'undefined' && window && window.ArcP,
    rules,
  };
};

export default usePaywall;
