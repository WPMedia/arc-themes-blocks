import { searchKey as SEARCH_KEY } from "fusion:environment";
import getResizedImageData from "@wpmedia/resizer-image-block";

export default {
	resolve(contentOptions) {
		const { query, page, "arc-site": arcSite } = contentOptions;
		if (query) {
			return `https://search.arcpublishing.com/search?&q=${encodeURIComponent(
				decodeURIComponent(query)
			)}&page=${page || 1}${arcSite ? `&website_id=${arcSite}` : ""}${
				SEARCH_KEY ? `&key=${SEARCH_KEY}` : ""
			}`;
		}
		return "";
	},
	params: {
		query: "text",
		page: "text",
	},
	/*
    root: {
      data: [{ promo_items: {...}}],
      otherFields: ...
    }
    different from other content sources that have content elements
    on the top-level
  */
	transform: (data, query) => ({
		data: getResizedImageData(data.data, null, null, null, query["arc-site"]),
		...data,
	}),
};
