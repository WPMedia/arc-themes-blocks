import { useState, useEffect } from 'react';
import { useIdentity } from '@wpmedia/identity-block';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';

import { isServerSide } from '@wpmedia/engine-theme-sdk';

export const findRegwallRules = (rules = []) => rules.filter(rule => rule.e.length === 1 && rule.e[0]);
export const findSubscribeRules = (rules = []) => rules.filter(rule => rule.e.length > 1);

export const usePaywall = (options = {}) => {
  const [ isPaywalled, setIsPaywalled ] = useState(false);
  const [ triggeredResults, setTriggeredResults ] = useState();
  const [ results, setResults ] = useState();
  const [ triggeredRule, setTriggeredRule ] = useState();
  const [ otherTriggeredRules, setOtherTriggeredRules ] = useState([]);
  const [ isSignwall, setIsSignwall ] = useState();

  const { Identity, isInitialized } = useIdentity();
  const { arcSite, globalContent } = useFusionContext();
  const { subscriptions } = getProperties(arcSite);
  const rules = window.ArcP._rules;

  useEffect(() => {
    const runPaywall = async () => {
      const results = await window.ArcP.run({
        Identity,
        apiOrigin: subscriptions.sales.apiOrigin,
        paywallFunction: (response) => {
          setTriggeredResults(response);
          setIsPaywalled(true)
        },
        contentType: globalContent.type,
        contentIdentifier: globalContent.canonical_url,
        section: globalContent.taxonomy.primary_section._id,
        contentRestriction: globalContent.content_restrictions.content_code,
        ...options
      });
      setResults(results);
    };
    if (Identity && isInitialized && !isServerSide()) {
      runPaywall();
    }
  }, [Identity, isInitialized, isServerSide, globalContent.canonical_url]);

  useEffect(() => {
    if (results) {
      const ruleId = results.triggererd && results.triggered.id;
      const rc = results.triggered && results.triggered.rc;
      const triggeredRule = rules.find(rule => ruleId === rule.id);
      const otherTriggeredRules = rules.filter(rule => rule.rt[1] < rc);
      setTriggeredRule(triggeredRule);
      setOtherTriggeredRules(otherTriggeredRules);
    }
  }, [results, rules ]);

  useEffect(() => {
    if (triggeredRule && otherTriggeredRules) {
      if (triggeredRule.e && triggeredRule.e.length > 1) {
        setIsSignwall(false);
        return;
      }
      if (otherTriggeredRules.length) {
        const paywallRule = otherTriggeredRules
          .sort((a, b) => b.rt[1] - a.rt[1])
          .find(rule => rule.e && rule.e.length > 1) || {};

        setIsSignwall(!paywallRule);
        setTriggeredRule(paywallRule);
        return;
      }
      if (triggeredRule.e && triggeredRule.e.length === 1) {
        setIsSignwall(true);
        return;
      }
    }
  }, [ triggeredRule, otherTriggeredRules ]);

  return {
    isPaywalled,
    results,
    triggeredResults,
    triggeredRule,
    isSignwall,
    getIsPaywalledStatus: () => isPaywalled,
    getPaywallResults: () => results,
    ArcP: window.ArcP,
    rules: rules,
  };
};

export default usePaywall;
