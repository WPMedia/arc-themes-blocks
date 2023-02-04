import getResizedImageData from "@wpmedia/resizer-image-block";
// uncomment when engine-theme-sdk canary package is available
// import { sanitizeANS, constants } from "@wpmedia/engine-theme-sdk";

// replace with above import when engine-theme-sdk canary has method available
const sanitizeANSItem = (data) => ({
	...data,
	editor_note: "",
	planning: {
		...data.planning,
		internal_note: "",
	},
	workflow: {},
	additional_properties: {
		...data.additional_properties,
		clipboard: {},
	},
	content_elements: data.content_elements.map((el) => ({
		...el,
		additional_properties: {
			...el.additional_properties,
			inline_comments: [],
			comments: [],
		},
	})),
});

/**
 *
 * @param data {object} ANS JSON
 * @param schema {string("ans-item" | "ans-feed") ANS schema
 * @returns {object} ANS data with empty values on the fields:
 * - editor_note
 * - planning.internal_note
 * - workflow
 * - additional_properties.clipboard
 * - content_elements.additional_properties.comments
 * - content_elements.additional_properties.inline_comments
 */
const sanitizeANS = (data, schema) => {
	if (schema === "ans-feed") {
		return {
			...data,
			content_elements: data.content_elements.map((el) => sanitizeANSItem(el)),
		};
	}
	if (schema === "ans-item") {
		return sanitizeANSItem(data);
	}
	return data;
};

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
	transform: (data, query) =>
		getResizedImageData(sanitizeANS(data, "ans-feed"), null, null, null, query["arc-site"]),
};
