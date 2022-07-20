import axios from "axios";
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from "fusion:environment";
import { mockProductData } from "./mock-data";

const params = {
	slug: "text",
};

const useMock = true;

const fetch = (key) => {
	const { slug, "arc-site": arcSite } = key;

	// istanbul ignore next
	if (useMock) {
		return mockProductData;
	}

	/*
  		We are currently using Mock data to return product data until APIs are
		available for us, the below code will need to be used to fetch content
		from the Commerce APIs, and the URL will need updated based on the
		path commerce provide
		Don't forget to update the tests
	*/
	// istanbul ignore next
	// eslint-disable-next-line no-unreachable
	return axios({
		url: `${CONTENT_BASE}/${slug}?website=${arcSite}`,
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
		},
		method: "GET",
	}).then(({ data: content }) => content);
};

export default {
	fetch,
	params,
	transform: (data) => data,
};
