import getResizedImageData from "@wpmedia/resizer-image-block";
import { sanitizeANS, constants } from "@wpmedia/engine-theme-sdk";

export default {
	resolve: (params) =>
		`/content/v4/search/published?q=${params.query || "*"}&website=${params["arc-site"]}&size=${
			params.size || 8
		}&from=${params.offset || 0}&sort=display_date:desc`,
	schemaName: constants.ANS_FEED_SCHEMA,
	params: {
		query: "text",
		size: "number",
		offset: "number",
	},
	// other options null use default functionality, such as filter quality
	transform: (data, query) =>
		getResizedImageData(
			sanitizeANS(data, constants.ANS_FEED_SCHEMA),
			null,
			null,
			null,
			query["arc-site"]
		),
};
