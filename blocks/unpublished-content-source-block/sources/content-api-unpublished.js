import getResizedImageData from "@wpmedia/resizer-image-block";

export default {
	resolve(contentOptions) {
		const { _id, "arc-site": arcSite } = contentOptions;
		return `content/v4?_id=${_id}&website=${arcSite}&published=false`;
	},
	params: {
		_id: "text",
	},
	transform: (data, query) => getResizedImageData(data, null, null, null, query["arc-site"]),
};
