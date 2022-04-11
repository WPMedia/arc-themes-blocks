const params = {
	input: "text",
};

const resolve = (key) => {
	const { input, "arc-site": arcSite } = key;

	return `${arcSite}-${input}`;
};

export default {
	resolve,
	params,
	transform: (data) => data,
};
