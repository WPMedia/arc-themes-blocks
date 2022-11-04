import getResizedImageData from "@wpmedia/resizer-image-block";

const params = {
	tagSlug: "text",
	feedSize: "number",
	feedOffset: "number",
};

/**
 * @func pattern
 * @param {Object} key
 * @return {String} slugified content api search url
 */
const pattern = (key = {}) => {
	const website = key["arc-site"] || "Arc Site is not defined";
	const { tagSlug, feedOffset, feedSize } = key;

	if (!tagSlug) {
		throw new Error("tagSlug parameter is required");
	}

	// have to use inline due to content source
	// defaults for feedSize 10 and feedOffset 0
	return `/content/v4/search/published?q=taxonomy.tags.slug:${tagSlug}&size=${
		feedSize || 10
	}&from=${feedOffset || 0}&sort=display_date:desc&website=${website}`;
};

/**
 * @func resolve
 * @param {Object} key - the object key to return a slugified pattern for
 * @return {String} slugified content api search url
 */
const resolve = (key) => pattern(key);

export default {
	resolve,
	schemaName: "ans-feed",
	params,

	// other options null use default functionality, such as filter quality
	transform: (data, query) => getResizedImageData(data, null, null, null, query["arc-site"]),
};
