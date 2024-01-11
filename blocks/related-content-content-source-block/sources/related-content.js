import axios from "axios";
import { CONTENT_BASE, ARC_ACCESS_TOKEN, RESIZER_TOKEN_VERSION } from "fusion:environment";
import signImagesInANSObject from "@wpmedia/arc-themes-components/src/utils/sign-images-in-ans-object";
import handleFetchError from "@wpmedia/arc-themes-components/src/utils/handle-fetch-error";
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

const fetch = ({ _id, "arc-site": site }, { cachedCall }) => {
	if (!_id || !site) {
		return "";
	}

	const urlSearch = new URLSearchParams({
		_id,
		website: site,
	});

	return axios({
		url: `${CONTENT_BASE}/content/v4/related-content?${urlSearch.toString()}`,
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
		},
		method: "GET",
	})
		.then(signImagesInANSObject(cachedCall, resizerFetch, RESIZER_TOKEN_VERSION))
		.then(({ data: { basic, ...remainingData } }) => ({
			...remainingData,
			content_elements: basic,
		}))
		.catch(handleFetchError);
};

export default {
	fetch,
	params,
	schemaName: "ans-feed",
};
