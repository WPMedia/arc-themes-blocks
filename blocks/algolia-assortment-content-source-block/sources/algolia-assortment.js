import algoliasearch from "algoliasearch/lite";
import { algoliaSearchKey, algoliaAppId } from "fusion:environment";

const params = {
	filters: "text",
	index: "text",
	query: "text",
	ruleContexts: "text",
	hitsPerPage: "number",
	page: "number",
};

const fetch = async (contentSourceParameters) => {
	const { filters, index, query, ruleContexts } = contentSourceParameters;
	let { hitsPerPage, page } = contentSourceParameters;

	// parameters in content source are defined as null by default
	if (hitsPerPage === null) {
		hitsPerPage = 20;
	}
	if (page === null) {
		page = 0;
	}
	const client = algoliasearch(algoliaAppId, algoliaSearchKey);

	const clientSearchIndex = client.initIndex(index);
	try {
		const { hits } = await clientSearchIndex.search(query, {
			// array of strings
			// https://www.algolia.com/doc/api-reference/api-parameters/ruleContexts/
			ruleContexts: [ruleContexts],
			filters,
			hitsPerPage,
			page,
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
