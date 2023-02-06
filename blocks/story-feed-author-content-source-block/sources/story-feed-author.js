import getResizedImageData from "@wpmedia/resizer-image-block";
import { sanitizeANS, constants } from "@wpmedia/engine-theme-sdk";

export default {
	resolve: ({ authorSlug, feedSize = 8, feedOffset = 0, "arc-site": website }) =>
		`/content/v4/search/published?q=credits.by.slug:"${authorSlug}"&size=${feedSize}&from=${feedOffset}&sort=display_date:desc&website=${website}`,
	schemaName: constants.ANS_FEED_SCHEMA,
	params: {
		authorSlug: "text",
		feedSize: "number",
		feedOffset: "number",
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
