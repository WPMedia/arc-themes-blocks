import getResizedImageData from "@wpmedia/resizer-image-block";

const params = {
	includeSections: "text",
	excludeSections: "text",
	feedSize: "number",
	feedOffset: "number",
};

/**
 * @func itemsToArray
 * @param {String} itemString - a csv list of items to turn into an array
 * @return {String[]} the itemString now in an array
 */
export const itemsToArray = (itemString = "") =>
	itemString.split(",").map((item) => item.replace(/"/g, ""));

/**
 * @func pattern
 * @param {Object} key
 * @return {String} elastic search query for the feed sections
 */
const pattern = (key = {}) => {
	const website = key["arc-site"];
	const { includeSections, excludeSections, feedOffset, feedSize } = key;

	if (!includeSections) {
		throw new Error("includeSections parameter is required");
	}

	const sectionsIncluded = itemsToArray(includeSections);
	const sectionsExcluded = itemsToArray(excludeSections);

	const body = {
		query: {
			bool: {
				must: [
					{
						term: {
							"revision.published": "true",
						},
					},
					{
						nested: {
							path: "taxonomy.sections",
							query: {
								bool: {
									must: [
										{
											terms: {
												"taxonomy.sections._id": sectionsIncluded,
											},
										},
										{
											term: {
												"taxonomy.sections._website": website,
											},
										},
									],
								},
							},
						},
					},
				],
				must_not: [
					{
						nested: {
							path: "taxonomy.sections",
							query: {
								bool: {
									must: [
										{
											terms: {
												"taxonomy.sections._id": sectionsExcluded,
											},
										},
										{
											term: {
												"taxonomy.sections._website": website,
											},
										},
									],
								},
							},
						},
					},
				],
			},
		},
	};

	const encodedBody = encodeURI(JSON.stringify(body));

	return `/content/v4/search/published?body=${encodedBody}&website=${website}&size=${
		feedSize || 10
	}&from=${feedOffset || 0}&sort=display_date:desc`;
};

const resolve = (key) => pattern(key);

export default {
	resolve,
	schemaName: "ans-feed",
	params,
	// other options null use default functionality, such as filter quality
	transform: (data, query) => getResizedImageData(data, null, null, null, query["arc-site"]),
};
