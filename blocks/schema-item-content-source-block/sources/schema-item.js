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
		displayName: "Schema Name",
		name: "schemaName",
		type: "text",
	},
];

const fetch = ({ id, schemaName, "arc-site": website }, { arcSite }) => {
	if (!id || !schemaName) {
		return "";
	}

	const siteValue = website || arcSite;
	if (!siteValue) {
		return "";
	}

	const urlSearch = new URLSearchParams({
		id: id.trim(),
		schema_name: schemaName.trim(),
		website: siteValue,
	});

	return axios({
		url: `${CONTENT_BASE}/content/v5/search/schemas/by-id/?${urlSearch.toString()}`,
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
	ttl: 300,
};
