import axios from "axios";
import { ARC_ACCESS_TOKEN, CONTENT_BASE, RESIZER_APP_VERSION } from "fusion:environment";

import signImagesInANSObject from "@wpmedia/arc-themes-components/src/utils/sign-images-in-ans-object";
import { fetch as resizerFetch } from "@wpmedia/signing-service-content-source-block";

const params = {
	hierarchy: "text",
	sectionId: "text",
};

const fetch = ({ hierarchy, sectionId, "arc-site": website }, { cachedCall }) => {
	const urlSearch = new URLSearchParams({
		...(hierarchy ? { hierarchy } : {}),
		...(sectionId ? { _id: sectionId } : {}),
	});

	return axios({
		url: `${CONTENT_BASE}/site/v3/navigation/${website}?${urlSearch.toString()}`,
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
	schemaName: "navigation-hierarchy",
	transform: (data, query) => {
		if (query.sectionId && query.sectionId !== data._id) {
			if (!query.hierarchy || query.uri) {
				const error = new Error("Not found");
				error.statusCode = 404;
				return Promise.reject(error);
			}
		}
		return data;
	},
};
