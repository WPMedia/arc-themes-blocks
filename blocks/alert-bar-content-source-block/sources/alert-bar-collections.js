import axios from "axios";
import { ARC_ACCESS_TOKEN, CONTENT_BASE } from "fusion:environment";
import handleFetchError from "@wpmedia/arc-themes-components/src/utils/handle-fetch-error";

const params = [
	{
		default: "2",
		displayName: "Themes Version",
		name: "themes",
		type: "text",
	},
];

const fetch = ({ "arc-site": website }) => {
	const urlSearch = new URLSearchParams({
		content_alias: "alert-bar",
		from: 0,
		published: true,
		size: 1,
		...(website ? { website } : {}),
	});

	return (
		axios({
			url: `${CONTENT_BASE}/content/v4/collections?${urlSearch.toString()}`,
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
			},
			method: "GET",
		})
			// when a collection as a unpublished elements, the content_elements has a
			// reference to the data without being expanded, and need to be removed
			.then(({ data }) => ({
				...data,
				content_elements: data.content_elements.filter((element) => !element.referent),
			}))
			.catch(handleFetchError)
	);
};

export default {
	fetch,
	params,
	ttl: 120,
};
