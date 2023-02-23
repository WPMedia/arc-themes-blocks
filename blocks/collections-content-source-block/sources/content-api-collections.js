import axios from "axios";
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from "fusion:environment";
import getResizedImageData from "@wpmedia/resizer-image-block";

const params = {
	_id: "text",
	content_alias: "text",
	from: "text",
	size: "text",
};

const handleError = (error) => {
	if (error?.response) {
		// eslint-disable-next-line no-console
		throw new Error(
			`The response from the server was an error with the status code ${error?.response?.status}.`
		);
	} else if (error?.request) {
		// eslint-disable-next-line no-console
		throw new Error("The request to the server failed with no response.");
	} else {
		// eslint-disable-next-line no-console
		throw new Error("An error occured creating the request.");
	}
};

const fetch = (key = {}) => {
	const { "arc-site": site, _id, content_alias: contentAlias, from, size, getNext = "false" } = key;
	let updatedSize = size;
	// Max collection size is 20
	// See: https://redirector.arcpublishing.com/alc/docs/swagger/?url=./arc-products/content-api.json
	// Want to ensure size is capped at 20 to prevent an error.
	if (updatedSize && updatedSize > 9) updatedSize = size < 20 ? size : 20;

	return axios({
		url: `${CONTENT_BASE}/content/v4/collections?${
			_id ? `_id=${_id}` : `content_alias=${contentAlias}`
		}${site ? `&website=${site}` : ""}${from ? `&from=${from}` : ""}${
			size ? `&size=${updatedSize}` : ""
		}&published=true`,
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
		},
		method: "GET",
	})
		.then(
			/* istanbul ignore next */ ({ data: content }) => {
				if (getNext === "false") {
					return content;
				}

				const existingData = content;

				return axios({
					url: `${CONTENT_BASE}/content/v4/collections?${
						_id ? `_id=${_id}` : `content_alias=${contentAlias}`
					}${site ? `&website=${site}` : ""}&from=${updatedSize}${
						size ? `&size=${updatedSize}` : ""
					}&published=true`,
					headers: {
						"content-type": "application/json",
						Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
					},
					method: "GET",
				})
					.then(({ data: nextContent }) => {
						existingData.content_elements = [
							...existingData.content_elements,
							...nextContent?.content_elements,
						];
						return existingData;
					})
					.catch(handleError);
			}
		)
		.catch(handleError);
};

export default {
	params,
	fetch,
	schemaName: "ans-feed",
	// other options null use default functionality, such as filter quality
	transform: /* istanbul ignore next */ (data, query) =>
		getResizedImageData(data, null, null, null, query["arc-site"]),
};
