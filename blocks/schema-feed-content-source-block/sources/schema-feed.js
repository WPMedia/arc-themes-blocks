import axios from "axios";
import { ARC_ACCESS_TOKEN, CONTENT_BASE } from "fusion:environment";
import handleFetchError from "@wpmedia/arc-themes-components/src/utils/handle-fetch-error";

const params = [
	{
		displayName: "Schema Name",
		name: "schemaName",
		type: "text",
	},
	{
		displayName: "Sort By",
		name: "sortBy",
		type: "text",
	},
	{
		displayName: "Query",
		name: "query",
		type: "text",
	},
	{
		displayName: "Size",
		name: "size",
		type: "number",
		default: 25,
	},
	{
		displayName: "Page",
		name: "page",
		type: "number",
		default: 1,
	},
];

const fetch = (
	{ schemaName, sortBy, query, size = 25, page = 1, "arc-site": website },
	{ arcSite },
) => {
	if (!schemaName) {
		return "";
	}

	const siteValue = website || arcSite;
	if (!siteValue) {
		return "";
	}

	const urlSearch = new URLSearchParams({
		schema_name: schemaName.trim(),
		website: siteValue,
		size,
		page,
	});

	if (sortBy) {
		urlSearch.set("sort", `${sortBy.trim()}:desc`);
	}

	if (query) {
		urlSearch.set("q", query.trim());
	}

	const url = new URL(`/content/v5/search/schemas/?${urlSearch.toString()}`, CONTENT_BASE);

	return axios({
		url: url.toString(),
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
		},
		method: "GET",
		timeout: 8000,
	})
		.then(({ data }) => {
			if (!data) {
				const error = new Error("Failed to retrieve schema data");
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
	ttl: 300,
};
