---
# helper funcs https://www.hygen.io/docs/templates/#helpers-and-inflections
to: blocks/<%= h.inflection.dasherize(block_name) %>-block/sources/<%= h.inflection.dasherize(content_source_name) %>/index.js
---
import axios from "axios";
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from "fusion:environment";

const params = {
  input: 'text',
};

const fetch = (key) => {
  const {
    input, 'arc-site': arcSite,
  } = key;

	return axios({
		url: `${CONTENT_BASE}/-- API - ENDPOINT URI HERE --?website=${arcSite}`,
		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
		},
		method: 'GET',
	}).then(({ data: content }) => content);
};

export default {
  fetch,
  params,
  transform: (data) => data,
};
