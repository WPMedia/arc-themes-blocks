import axios from "axios";
import { ARC_ACCESS_TOKEN, CONTENT_BASE } from "fusion:environment";
import { handleFetchError } from "@wpmedia/arc-themes-components";

const params = {
	hierarchy: "text",
	sectionId: "text",
};

const fetch = ({ hierarchy, sectionId, "arc-site": website }) => {
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
		.then(({ data }) => data)
		.catch(handleFetchError);
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
