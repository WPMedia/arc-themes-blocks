import algoliasearch from "algoliasearch/lite";
import { algoliaSearchKey, algoliaAppId } from "fusion:environment";

const params = {
	input: "text",
};

const fetch = async (key = {}) => {
	const client = algoliasearch(algoliaAppId, algoliaSearchKey);
	const index = client.initIndex("instant_search");
	try {
		const { hits } = await index.search(key.query, {
			ruleContext: key.ruleContext,
			filters: key.filter,
		});
		return hits;
	} catch (err) {
		const error = new Error(err);
		error.statusCode = 500;
		throw error;
	}
};
export default {
	fetch,
	params,
	transform: (data) => data,
	// Time to live cache set to the Fusion minimum of 2 minutes (120 seconds)
	ttl: 120,
};
