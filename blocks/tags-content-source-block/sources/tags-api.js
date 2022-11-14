import axios from "axios";
import { ARC_ACCESS_TOKEN, CONTENT_BASE } from "fusion:environment";

const params = {
	slug: "text",
};

const fetch = ({ slug: slugs = "" }) => {
	const urlSearch = new URLSearchParams({ slugs });

	return axios({
		url: `${CONTENT_BASE}/tags/v2/slugs?${urlSearch.toString()}`,
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
		},
		method: "GET",
	}).then(({ data }) => {
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
};
