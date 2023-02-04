import getResizedImageData from "@wpmedia/resizer-image-block";
// uncomment when engine-theme-sdk canary package is available
// import { sanitizeANS, constants } from "@wpmedia/engine-theme-sdk";

// replace with above import when engine-theme-sdk canary has method available
/* istanbul ignore next */
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
/* istanbul ignore next */
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

export default {
	resolve: (params) =>
		`/content/v4/search/published?q=${params.query || "*"}&website=${params["arc-site"]}&size=${
			params.size || 8
		}&from=${params.offset || 0}&sort=display_date:desc`,
	schemaName: "ans-feed",
	params: {
		query: "text",
		size: "number",
		offset: "number",
	},
	// other options null use default functionality, such as filter quality
	transform: (data, query) =>
		getResizedImageData(sanitizeANS(data, "ans-feed"), null, null, null, query["arc-site"]),
};
