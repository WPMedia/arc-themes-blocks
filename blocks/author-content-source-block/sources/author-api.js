import axios from "axios";
import { ARC_ACCESS_TOKEN, CONTENT_BASE, RESIZER_TOKEN_VERSION } from "fusion:environment";
import signImagesInANSObject from "@wpmedia/arc-themes-components/src/utils/sign-images-in-ans-object";
import handleFetchError from "@wpmedia/arc-themes-components/src/utils/handle-fetch-error";
import { fetch as resizerFetch } from "@wpmedia/signing-service-content-source-block";

const params = [
	{
		displayName: "slug",
		name: "slug",
		type: "text",
	},
	{
		default: "2",
		displayName: "Themes Version",
		name: "themes",
		type: "text",
	},
];

const fetch = ({ slug }, { cachedCall }) => {
	const urlSearch = new URLSearchParams({ slug });

	return axios({
		url: `${CONTENT_BASE}/author/v2/author-service?${urlSearch.toString()}`,
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
		},
		method: "GET",
	})
		.then(signImagesInANSObject(cachedCall, resizerFetch, RESIZER_TOKEN_VERSION))
		.then(({ data }) => {
			if (!data.authors.length > 0) {
				const error = new Error("Not found");
				error.statusCode = 404;
				throw error;
			}
			return data;
		})
		.catch(handleFetchError);
};

export default {
	fetch,
	params,
};
