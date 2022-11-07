import axios from "axios";
import { ARC_ACCESS_TOKEN, CONTENT_BASE, RESIZER_APP_VERSION } from "fusion:environment";

import signImagesInANSObject from "@wpmedia/arc-themes-components/src/utils/sign-images-in-ans-object";
import { fetch as resizerFetch } from "@wpmedia/signing-service-content-source-block";

const params = {
	slug: "text",
};

const fetch = ({ slug: slugs = "" }, { cachedCall }) => {
	const urlSearch = new URLSearchParams({ slugs });

	return axios({
		url: `${CONTENT_BASE}/tags/v2/slugs?${urlSearch.toString()}`,
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
		},
		method: "GET",
	})
		.then(signImagesInANSObject(cachedCall, resizerFetch, RESIZER_APP_VERSION))
		.then(({ data }) => {
			if (data?.Payload?.some((ele) => !!ele)) {
				return data;
			}

			const error = new Error("Not found");
			error.statusCode = 404;
			return Promise.reject(error);
		});
};

export default {
	fetch,
	params,
	schemaName: "ans-feed",
};
