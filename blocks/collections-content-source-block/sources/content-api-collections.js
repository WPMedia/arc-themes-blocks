import axios from "axios";
import { CONTENT_BASE, ARC_ACCESS_TOKEN, RESIZER_APP_VERSION } from "fusion:environment";

import signImagesInANSObject from "@wpmedia/arc-themes-components";
import { fetch as resizerFetch } from "@wpmedia/signing-service-content-source-block";

const params = {
	_id: "text",
	"arc-site": "text",
	content_alias: "text",
	from: "text",
	getNext: "text", // content-source API specifies only "text", "number", or "site" as valid.
	size: "text",
};

const fetch = (
	{ _id, "arc-site": site, content_alias, from = "0", getNext = "false", size = "20" },
	{ cachedCall }
) => {
	// Max collection size is 20
	// See: https://redirector.arcpublishing.com/alc/docs/swagger/?url=./arc-products/content-api.json
	const constrainedSize = size > 20 ? 20 : size;
	const urlSearch = new URLSearchParams({
		...(_id ? { _id } : { content_alias }),
		from,
		published: true,
		size: constrainedSize,
		...(site ? { website: site } : {}),
	}).toString();

	return axios({
		url: `${CONTENT_BASE}/content/v4/collections?${urlSearch}`,
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
		},
		method: "GET",
	})
		.then(signImagesInANSObject(cachedCall, resizerFetch, RESIZER_APP_VERSION))
		.then(({ data }) => {
			if (getNext !== "false") {
				return data;
			} else {
				urlSearch.set("from", from + constrainedSize);
				return axios({
					url: `${CONTENT_BASE}/content/v4/collections?${urlSearch}`,
					headers: {
						"content-type": "application/json",
						Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
					},
					method: "GET",
				}).then(({ data: next }) => ({
					...data,
					content_elements: [...data.content_elements, ...(next?.content_elements || [])],
				}));
			}
		});
};

export default {
	fetch,
	params,
	schemaName: "ans-feed",
};
