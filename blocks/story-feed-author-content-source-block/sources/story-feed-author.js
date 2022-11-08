import axios from "axios";
import { ARC_ACCESS_TOKEN, CONTENT_BASE, RESIZER_APP_VERSION } from "fusion:environment";

import signImagesInANSObject from "@wpmedia/arc-themes-components/src/utils/sign-images-in-ans-object";
import { fetch as resizerFetch } from "@wpmedia/signing-service-content-source-block";

const params = {
	authorSlug: "text",
	feedOffset: "number",
	feedSize: "number",
};

const fetch = (
	{ authorSlug, feedOffset: from = 0, feedSize: size = 8, "arc-site": website },
	{ cachedCall }
) => {
	const urlSearch = new URLSearchParams({
		from,
		q: `credits.by.slug:"${authorSlug}"`,
		sort: "display_date:desc",
		size,
		website,
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
