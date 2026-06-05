import axios from "axios";
import { FY_RECOMMENDER_BASE, ORGANIZATION } from "fusion:environment";
import scoredItemToAns from "./_children/scoredItemToAns";

// Server-side proxy to the FY Recommender.
//
// This runs in the Fusion engine (Node), NOT the browser, which is what makes
// the integration viable in a real Arc deployment:
//   - The gateway-managed `arc-organization` / `arc-service` headers are
//     injected here, server-side. Sending them from the browser is rejected
//     (403 "forbidden header"), and the recommender does not return CORS
//     headers, so the browser cannot call it directly.
//   - This mirrors the dev proxy used by the fy-ui-poc reference app, which
//     injects the same headers against the same upstream.
//
// The FY Recommendations feature block invokes this source CLIENT-SIDE (after
// mount) through Fusion's content-fetch endpoint, so nothing is fetched during
// SSR — recommendations are per-user and must not be baked into shared,
// edge-cached HTML.

const params = [
	{ displayName: "num_results", name: "num_results", type: "text" },
	{ displayName: "user_id", name: "user_id", type: "text" },
	{ displayName: "item_id", name: "item_id", type: "text" },
	{ displayName: "device_type", name: "device_type", type: "text" },
	{ displayName: "subscription_tier", name: "subscription_tier", type: "text" },
];

const EMPTY = { content_elements: [], attribution: null };

const fetch = async (key = {}) => {
	const siteId = key["arc-site"];
	const {
		num_results: numResults = 5,
		user_id: userId,
		item_id: itemId,
		device_type: deviceType,
		subscription_tier: subscriptionTier,
	} = key;

	if (!FY_RECOMMENDER_BASE || !ORGANIZATION || !siteId || !userId) {
		return EMPTY;
	}

	const query = new URLSearchParams({
		site_id: siteId,
		user_id: userId,
		num_results: String(numResults),
	});
	if (itemId) query.set("item_id", itemId);
	if (deviceType) query.set("device_type", deviceType);
	if (subscriptionTier) query.set("subscription_tier", subscriptionTier);

	const url = `${FY_RECOMMENDER_BASE}/recommend/v1/recommendations?${query.toString()}`;

	try {
		const { data } = await axios({
			url,
			method: "GET",
			headers: {
				"arc-organization": ORGANIZATION,
				"arc-service": "api",
			},
		});

		const recs = data && data.recommendations;
		if (!Array.isArray(recs) || recs.length === 0) {
			return { content_elements: [], attribution: (data && data.attribution) || null };
		}

		return {
			content_elements: recs.map((s) => scoredItemToAns(s, siteId)),
			attribution: data.attribution || null,
		};
	} catch {
		// Network/HTTP/parse error: degrade to empty so the block renders nothing.
		return EMPTY;
	}
};

export default {
	fetch,
	params,
	schemaName: "ans-feed",
	ttl: 120,
};
