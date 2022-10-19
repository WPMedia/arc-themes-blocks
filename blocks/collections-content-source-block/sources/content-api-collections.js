import axios from "axios";
import { CONTENT_BASE, ARC_ACCESS_TOKEN, RESIZER_APP_VERSION } from "fusion:environment";

import { signImagesInANSObject } from "@wpmedia/arc-themes-components";
import { fetch as resizerFetch } from "@wpmedia/signing-service-content-source-block";

const params = {
	_id: "text",
	content_alias: "text",
	from: "text",
	getNext: "text",
	size: "text",
};
// test
const fetch = (
	{ _id, "arc-site": site, content_alias: contentAlias, from, getNext = "false", size },
	{ cachedCall }
) => {
	// Max collection size is 20
	// See: https://redirector.arcpublishing.com/alc/docs/swagger/?url=./arc-products/content-api.json
	const constrainedSize = size > 20 ? 20 : size;
	const urlSearch = new URLSearchParams({
		...(_id ? { _id } : { content_alias: contentAlias }),
		...(from ? { from } : {}),
		published: true,
		...(site ? { website: site } : {}),
		...(size ? { size: constrainedSize } : {}),
	});

	return axios({
		url: `${CONTENT_BASE}/content/v4/collections?${urlSearch.toString()}`,
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
		},
		method: "GET",
	})
		.then(signImagesInANSObject(cachedCall, resizerFetch, RESIZER_APP_VERSION))
		.then(({ data }) => {
			if (getNext === "false") {
				return data;
			}
			urlSearch.set("from", (parseInt(from, 10) || 0) + parseInt(constrainedSize, 10));
			return axios({
				url: `${CONTENT_BASE}/content/v4/collections?${urlSearch.toString()}`,
				headers: {
					"content-type": "application/json",
					Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
				},
				method: "GET",
			})
				.then(signImagesInANSObject(cachedCall, resizerFetch, RESIZER_APP_VERSION))
				.then(({ data: next }) => ({
					...data,
					...(data?.content_elements || next?.content_elements
						? {
								content_elements: [
									...(data?.content_elements || []),
									...(next?.content_elements || []),
								],
						  }
						: {}),
				}));
		});
};

export default {
	fetch,
	params,
	schemaName: "ans-feed",
};
