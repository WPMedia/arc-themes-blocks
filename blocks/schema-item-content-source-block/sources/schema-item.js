import axios from "axios";
import { ARC_ACCESS_TOKEN, CONTENT_BASE } from "fusion:environment";
import handleFetchError from "@wpmedia/arc-themes-components/src/utils/handle-fetch-error";

const params = [
	{
		displayName: "Document ID",
		name: "id",
		type: "text",
	},
	{
		displayName: "Website URL",
		name: "website_url",
		type: "text",
	},
	{
		displayName: "Schema Name",
		name: "schemaName",
		type: "text",
	},
	{
		default: "2",
		displayName: "Themes Version",
		name: "themes",
		type: "text",
	},
];

const fetch = (
	{ id, schemaName, website_url: websiteUrl, "arc-site": website },
	{ arcSite }
) => {
	if (!schemaName || (!id && !websiteUrl)) {
		return "";
	}

	const siteValue = website || arcSite;
	if (!siteValue) {
		return "";
	}

	// Prefer lookup by id when both are provided, matching the content-api source behavior.
	const useId = Boolean(id);
	const endpoint = useId
		? "/content/v5/search/schemas/by-id/"
		: "/content/v5/search/schemas/by-url/";

	const urlSearch = new URLSearchParams({
		...(useId ? { id: id.trim() } : { url: websiteUrl.trim() }),
		schema_name: schemaName.trim(),
		website: siteValue,
	});

	return axios({
		url: `${CONTENT_BASE}${endpoint}?${urlSearch.toString()}`,
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
		},
		method: "GET",
	})
		.then(({ data }) => {
			if (!data) {
				const error = new Error("Document not found");
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
	schemaName: "ans-item",
	ttl: 300,
};
