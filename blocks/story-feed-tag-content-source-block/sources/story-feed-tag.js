import axios from "axios";
import { ARC_ACCESS_TOKEN, CONTENT_BASE, RESIZER_APP_VERSION } from "fusion:environment";
import signImagesInANSObject from "@wpmedia/arc-themes-components/src/utils/sign-images-in-ans-object";
import handleFetchError from "@wpmedia/arc-themes-components/src/utils/handle-fetch-error";
import { fetch as resizerFetch } from "@wpmedia/signing-service-content-source-block";

const params = [
	{
		displayName: "feedOffset",
		name: "feedOffset",
		type: "number",
	},
	{
		displayName: "feedSize",
		name: "feedSize",
		type: "number",
	},
	{
		displayName: "tagSlug",
		name: "tagSlug",
		type: "text",
	},
	{
		default: "2",
		displayName: "Themes Version",
		name: "themes",
		type: "text",
	},
];

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
		.then(({ data }) => data)
		.catch(handleFetchError);
};

export default {
	fetch,
	params,
	schemaName: "ans-feed",
};
