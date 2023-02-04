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

export default {
	resolve: ({ authorSlug, feedSize = 8, feedOffset = 0, "arc-site": website }) =>
		`/content/v4/search/published?q=credits.by.slug:"${authorSlug}"&size=${feedSize}&from=${feedOffset}&sort=display_date:desc&website=${website}`,
	schemaName: "ans-feed",
	params: {
		authorSlug: "text",
		feedSize: "number",
		feedOffset: "number",
	},
	// other options null use default functionality, such as filter quality
	transform: (data, query) =>
		getResizedImageData(sanitizeANS(data, "ans-feed"), null, null, null, query["arc-site"]),
};
