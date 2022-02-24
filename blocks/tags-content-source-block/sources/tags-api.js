const make404 = () => {
	const error = new Error("Not found");
	error.statusCode = 404;
	throw error;
};

export default {
	resolve({ slug }) {
		return `/tags/v2/slugs?slugs=${slug}`;
	},
	params: {
		slug: "text",
	},
	transform: (data) => {
		if (!data || !data.Payload) {
			make404();
		}

		const hasValues = data.Payload.some((ele) => !!ele);
		if (hasValues) {
			return data;
		}

		return make404();
	},
};
