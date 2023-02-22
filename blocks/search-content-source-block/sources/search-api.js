import axios from "axios";
import { ARC_ACCESS_TOKEN, RESIZER_APP_VERSION, searchKey as SEARCH_KEY } from "fusion:environment";

import signImagesInANSObject from "@wpmedia/arc-themes-components/src/utils/sign-images-in-ans-object";
import { fetch as resizerFetch } from "@wpmedia/signing-service-content-source-block";

const params = [
	{
		displayName: "_id",
		name: "_id",
		type: "text",
	},
	{
		displayName: "page",
		name: "page",
		type: "text",
	},
	{
		displayName: "query",
		name: "query",
		type: "text",
	},
	{
		default: "2",
		displayName: "Themes Version",
		name: "themes",
		type: "text",
	},
];

const fetch = ({ "arc-site": site, page = "1", query }, { cachedCall }) => {
	if (!query) {
		return "";
	}

	const urlSearch = new URLSearchParams({
		page,
		q: decodeURIComponent(query),
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
