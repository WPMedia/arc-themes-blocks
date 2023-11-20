import { useEffect, useState } from "react";

import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";

import { useIdentity } from "@wpmedia/identity-block";
import { isServerSide } from "@wpmedia/arc-themes-components";

const usePaywall = () => {
	const { arcSite, globalContent } = useFusionContext();
	const contentIdentifier = globalContent?.canonical_url;
	const contentRestriction = globalContent?.content_restrictions?.content_code;
	const contentType = globalContent?.type;

	const { api } = getProperties(arcSite);

	const [campaignCode, setCampaignCode] = useState();
	const [results, setResults] = useState();
	const [isPaywalled, setIsPaywalled] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [triggeredRule, setTriggeredRule] = useState();
	const { Identity, isInitialized: isIdentityInitialized } = useIdentity();

	// eslint-disable-next-line no-underscore-dangle
	const rules = (!isServerSide() && window?.ArcP?._rules) || [];
	const apiOrigin = api?.retail?.origin;

	useEffect(() => {
		if (isIdentityInitialized) {
			Identity.isLoggedIn().then(setIsLoggedIn);
		}
	}, [Identity, isIdentityInitialized]);

	useEffect(() => {
		const runPaywall = async () => {
			// Subs ArcP.run assumes https://, so we need to strip it from the endpoint origin.
			setResults(
				await window?.ArcP?.run({
					apiOrigin: apiOrigin.replace(/^https?:\/\//i, ""),
					contentIdentifier,
					contentRestriction,
					contentType,
					Identity,
					paywallFunction: (campaign) => {
						setCampaignCode(campaign);
						setIsPaywalled(true);
					},
					section: globalContent.taxonomy?.primary_section._id,
				})
			);
		};

		if (
			apiOrigin &&
			contentIdentifier &&
			contentRestriction &&
			isIdentityInitialized &&
			!isPaywalled &&
			!isServerSide()
		) {
			runPaywall();
		}
	}, [apiOrigin, globalContent, Identity, isIdentityInitialized, isPaywalled]);

	useEffect(() => {
		if (results?.triggered && rules?.length) {
			const { id: triggerId, rc: triggerCount } = results.triggered;

			const triggeringRule = rules.find(({ id }) => triggerId === id);

			// Rule is bypassed by registered or subscribed users
			// Registered e: [true], ent:[false]
			// Subscribed (SKU): e: [true, SKU1,...], ent: [false]
			// Subscribed (entitlement): e: [false], ent: [true, ENT1, ...]
			if (triggeringRule?.e?.length === 1 && triggeringRule?.e[0] === true && isLoggedIn) {
				// we currently only support rule triggers of ['>', count]
				const triggerableRules = ({ rt: [op, count] }) => op === ">" && triggerCount > count;
				const byDescendingTriggerCount = ({ rt: [, a] }, { rt: [, b] }) => b - a;
				const withRestrictedStatus = ({ e: [hasOpportunity, skuId] }) => hasOpportunity && !!skuId;

				const paywallableRule = rules
					.filter(triggerableRules)
					.sort(byDescendingTriggerCount)
					.find(withRestrictedStatus);

				setTriggeredRule(
					paywallableRule && paywallableRule !== triggeringRule ? paywallableRule : triggeringRule
				);
			} else {
				setTriggeredRule(triggeringRule);
			}
		}
	}, [results, rules, isLoggedIn]);

	if (isServerSide()) {
		return {
			campaignCode: undefined,
			isPaywalled: false,
			isRegisterwalled: false,
		};
	}

	return {
		isLoggedIn,
		campaignCode,
		isPaywalled,
		isRegisterwalled:
			triggeredRule?.e?.length === 1 &&
			triggeredRule?.e[0] === true &&
			triggeredRule?.ent?.length === 1 &&
			triggeredRule?.ent[0] === false,
	};
};

export default usePaywall;
