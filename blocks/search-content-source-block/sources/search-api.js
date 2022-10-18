import axios from "axios";
import { ARC_ACCESS_TOKEN, RESIZER_APP_VERSION, searchKey as SEARCH_KEY } from "fusion:environment";

import { signImagesInANSObject } from "@wpmedia/arc-themes-components";
import { fetch as resizerFetch } from "@wpmedia/signing-service-content-source-block";

const params = {
	_id: "text",
	"arc-site": "text",
	page: "text",
	query: "text",
};

const fetch = ({ "arc-site": site, page = "1", query }, { cachedCall }) => {
	if (!query) {
		return "";
	}

	const urlSearch = new URLSearchParams({
		page,
		q: encodeURIComponent(decodeURIComponent(query)),
		...(SEARCH_KEY ? { key: SEARCH_KEY } : {}),
		...(site ? { website_id: site } : {}),
	});

	return axios({
		url: `https://search.arcpublishing.com/search?${urlSearch.toString()}`,
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
