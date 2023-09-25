import axios from "axios";
import { ARC_ACCESS_TOKEN, CONTENT_BASE } from "fusion:environment";
import handleFetchError from "@wpmedia/arc-themes-components/src/utils/handle-fetch-error";

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

const fetch = ({ slug: slugs = "" }) => {
	const urlSearch = new URLSearchParams({ slugs });

	return axios({
		url: `${CONTENT_BASE}/tags/v2/slugs?${urlSearch.toString()}`,
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
		},
		method: "GET",
	})
		.then(({ data }) => {
			if (data?.Payload?.some((ele) => !!ele)) {
				return data;
			}

			const NotFoundError = (message = "Not found") => {
				const err = new Error(message);
				err.statusCode = 404;
				return err;
			};
			throw NotFoundError();
		})
		.catch(handleFetchError);
};

export default {
	fetch,
	params,
};
