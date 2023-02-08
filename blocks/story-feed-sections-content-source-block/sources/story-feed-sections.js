import axios from "axios";
import { ARC_ACCESS_TOKEN, CONTENT_BASE, RESIZER_APP_VERSION } from "fusion:environment";

import signImagesInANSObject from "@wpmedia/arc-themes-components/src/utils/sign-images-in-ans-object";
import { fetch as resizerFetch } from "@wpmedia/signing-service-content-source-block";

/**
 * @func itemsToArray
 * @param {String} itemString - a csv list of items to turn into an array
 * @return {String[]} the itemString now in an array
 */
export const itemsToArray = (itemString = "") =>
	itemString.split(",").map((item) => item.trim().replace(/"/g, ""));

const params = {
	excludeSections: "text",
	feedOffset: "number",
	feedSize: "number",
	includeSections: "text",
};

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
		themes: "v2",
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
		.then(({ data }) => data);
};

export default {
	fetch,
	params,
	schemaName: "ans-feed",
};
