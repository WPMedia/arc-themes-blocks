import axios from "axios";
import { ARC_ACCESS_TOKEN, CONTENT_BASE, RESIZER_APP_VERSION } from "fusion:environment";

import { handleFetchError, signImagesInANSObject } from "@wpmedia/arc-themes-components";
import { fetch as resizerFetch } from "@wpmedia/signing-service-content-source-block";

const params = [
	{
		displayName: "_id",
		name: "_id",
		type: "text",
	},
	{
		default: "2",
		displayName: "Themes Version",
		name: "themes",
		type: "text",
	},
];

const fetch = ({ _id, "arc-site": website }, { cachedCall }) => {
	const urlSearch = new URLSearchParams({
		_id,
		published: "false",
		website,
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
		.then(({ data }) => data)
		.catch(handleFetchError);
};

export default {
	fetch,
	params,
	schemaName: "ans-feed",
};
