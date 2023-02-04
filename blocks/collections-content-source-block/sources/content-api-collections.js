import axios from "axios";
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from "fusion:environment";
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
	_id: "text",
	content_alias: "text",
	from: "text",
	size: "text",
};

const fetch = (key = {}) => {
	const { "arc-site": site, _id, content_alias: contentAlias, from, size, getNext = "false" } = key;
	let updatedSize = size;
	// Max collection size is 20
	// See: https://redirector.arcpublishing.com/alc/docs/swagger/?url=./arc-products/content-api.json
	// Want to ensure size is capped at 20 to prevent an error.
	if (updatedSize && updatedSize > 9) updatedSize = size < 20 ? size : 20;

	return axios({
		url: `${CONTENT_BASE}/content/v4/collections?${
			_id ? `_id=${_id}` : `content_alias=${contentAlias}`
		}${site ? `&website=${site}` : ""}${from ? `&from=${from}` : ""}${
			size ? `&size=${updatedSize}` : ""
		}&published=true`,
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
		},
		method: "GET",
	}).then(({ data: content }) => {
		if (getNext === "false") {
			return content;
		}

		const existingData = content;

		return axios({
			url: `${CONTENT_BASE}/content/v4/collections?${
				_id ? `_id=${_id}` : `content_alias=${contentAlias}`
			}${site ? `&website=${site}` : ""}&from=${updatedSize}${
				size ? `&size=${updatedSize}` : ""
			}&published=true`,
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
			},
			method: "GET",
		}).then(({ data: nextContent }) => {
			existingData.content_elements = [
				...existingData.content_elements,
				...nextContent?.content_elements,
			];
			return existingData;
		});
	});
};

export default {
	params,
	fetch,
	schemaName: "ans-feed",
	// other options null use default functionality, such as filter quality
	transform: (data, query) =>
		getResizedImageData(sanitizeANS(data, "ans-feed"), null, null, null, query["arc-site"]),
};
