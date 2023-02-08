import axios from "axios";
import { ARC_ACCESS_TOKEN, CONTENT_BASE, RESIZER_APP_VERSION } from "fusion:environment";

import signImagesInANSObject from "@wpmedia/arc-themes-components/src/utils/sign-images-in-ans-object";
import { fetch as resizerFetch } from "@wpmedia/signing-service-content-source-block";

const params = {
	feedOffset: "number",
	feedSize: "number",
	tagSlug: "text",
};

const fetch = (
	{ feedSize: size = 10, feedOffset: from = 0, tagSlug, "arc-site": website },
	{ cachedCall }
) => {
	if (!tagSlug) {
		return Promise.reject(new Error("tagSlug parameter is required"));
	}

	const urlSearch = new URLSearchParams({
		from,
		q: `taxonomy.tags.slug:${tagSlug}`,
		size,
		sort: "display_date:desc",
		website,
		themes: "v2",
	});

	return axios({
		url: `${CONTENT_BASE}/content/v4/search/published?${urlSearch.toString()}`,
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
		},
		method: "GET",
	})
		.then(signImagesInANSObject(cachedCall, resizerFetch, RESIZER_APP_VERSION))
		.then(({ data }) => data);
};

export default {
	fetch,
	params,
	schemaName: "ans-feed",
};
