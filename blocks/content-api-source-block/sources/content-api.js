import axios from "axios";
import { ARC_ACCESS_TOKEN, CONTENT_BASE, RESIZER_APP_VERSION } from "fusion:environment";

import signImagesInANSObject from "@wpmedia/arc-themes-components/src/utils/sign-images-in-ans-object";
import { fetch as resizerFetch } from "@wpmedia/signing-service-content-source-block";

const params = {
	_id: "text",
	website_url: "text",
};

const fetch = ({ _id, "arc-site": site, website_url: websiteUrl }, { cachedCall }) => {
	const urlSearch = new URLSearchParams({
		_id,
		...(site ? { website: site } : {}),
		website_url: websiteUrl,
	});

	return axios({
		url: `${CONTENT_BASE}/content/v4/?${urlSearch.toString()}`,
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
