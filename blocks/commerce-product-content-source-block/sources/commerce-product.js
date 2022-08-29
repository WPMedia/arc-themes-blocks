import axios from "axios";
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from "fusion:environment";
import { mockProductData } from "./mock-data";

const params = {
	sku: "text",
};

const fetch = (key) => {
	const { sku, "arc-site": arcSite } = key;

	// istanbul ignore next
	if (sku === "bounce-running-shoe") {
		return mockProductData;
	}

	return axios({
		url: `${CONTENT_BASE}/product/api/v1/product/sku/${sku}?website=${arcSite}`,
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
