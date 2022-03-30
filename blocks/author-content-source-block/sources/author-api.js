import getResizedImageData from "@wpmedia/resizer-image-block";

export default {
	resolve({ slug }) {
		return `/author/v2/author-service?slug=${slug}`;
	},
	params: {
		slug: "text",
	},
	transform: (data, query) => {
		const authors = !data?.authors
			? []
			: data.authors.map((authorObject) => ({
					...authorObject,
					// other options null use default functionality, such as filter quality
					resized_params: authorObject.image
						? getResizedImageData(authorObject.image, null, true, null, query["arc-site"])
						: {},
			  }));

		return {
			...data,
			authors,
		};
	},
};
