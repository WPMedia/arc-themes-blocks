import getResizedImageData from "@wpmedia/resizer-image-block";
import { sanitizeANS, constants } from "@wpmedia/engine-theme-sdk";

const params = {
	_id: "text",
	website_url: "text",
};

const resolve = (key = {}) => {
	const site = key["arc-site"];
	const { website_url: websiteUrl, _id: id } = key;
	return `/content/v4/?${id ? `_id=${id}` : `website_url=${websiteUrl}`}${
		site ? `&website=${site}` : ""
	}`;
};

const transform = (data, query) =>
	getResizedImageData(
		sanitizeANS(data, constants.ANS_ITEM_SCHEMA),
		null,
		null,
		null,
		query["arc-site"]
	);

export default {
	schemaName: constants.ANS_ITEM_SCHEMA,
	params,
	resolve,
	transform,
};
