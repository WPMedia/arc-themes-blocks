import axios from "axios";
import { ARC_ACCESS_TOKEN, CONTENT_BASE, RESIZER_APP_VERSION } from "fusion:environment";
import signImagesInANSObject from "@wpmedia/arc-themes-components/src/utils/sign-images-in-ans-object";
import handleFetchError from "@wpmedia/arc-themes-components/src/utils/handle-fetch-error";
import { fetch as resizerFetch } from "@wpmedia/signing-service-content-source-block";

/**
 * @func itemsToArray
 * @param {String} itemString - a csv list of items to turn into an array
 * @return {String[]} the itemString now in an array
 */
export const itemsToArray = (itemString = "") =>
	itemString.split(",").map((item) => item.trim().replace(/"/g, ""));

const params = [
	{
		displayName: "excludeSections",
		name: "excludeSections",
		type: "text",
	},
	{
		displayName: "feedOffset",
		name: "feedOffset",
		type: "number",
	},
	{
		displayName: "feedSize",
		name: "feedSize",
		type: "number",
	},
	{
		displayName: "includeSections",
		name: "includeSections",
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
	{
		excludeSections,
		feedOffset: from = 0,
		feedSize: size = 10,
		includeSections,
		"arc-site": website,
	},
	{ cachedCall }
) => {
	if (!includeSections) {
		return Promise.reject(new Error("includeSections parameter is required"));
	}

	const body = {
		query: {
			bool: {
				must: [
					{
						term: {
							"revision.published": "true",
						},
					},
					{
						nested: {
							path: "taxonomy.sections",
							query: {
								bool: {
									must: [
										{
											terms: {
												"taxonomy.sections._id": itemsToArray(includeSections),
											},
										},
										{
											term: {
												"taxonomy.sections._website": website,
											},
										},
									],
								},
							},
						},
					},
				],
				must_not: [
					{
						nested: {
							path: "taxonomy.sections",
							query: {
								bool: {
									must: [
										{
											terms: {
												"taxonomy.sections._id": itemsToArray(excludeSections),
											},
										},
										{
											term: {
												"taxonomy.sections._website": website,
											},
										},
									],
								},
							},
						},
					},
				],
			},
		},
	};

	const urlSearch = new URLSearchParams({
		body: JSON.stringify(body),
		from,
		size,
		sort: "display_date:desc",
		website,
	});

	return axios({
		url: `${CONTENT_BASE}/content/v4/search/published?${urlSearch.toString()}`,
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
		},
		method: "GET",
	})
		.then(signImagesInANSObject(cachedCall, resizerFetch, RESIZER_APP_VERSION))
		.then(({ data }) => data)
		.catch(handleFetchError);
};

export default {
	fetch,
	params,
	schemaName: "ans-feed",
};
