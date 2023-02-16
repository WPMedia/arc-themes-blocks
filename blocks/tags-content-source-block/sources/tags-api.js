import axios from "axios";
import { ARC_ACCESS_TOKEN, CONTENT_BASE } from "fusion:environment";

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

const fetch = ({ slug: slugs = "", themes }) => {
	const urlSearch = new URLSearchParams({
		slugs,
		themes,
	});

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
