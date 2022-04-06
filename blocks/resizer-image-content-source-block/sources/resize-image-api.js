import getResizedImageData from "@wpmedia/resizer-image-block";

const params = {
	// has to be an external image
	raw_image_url: "text",
};

// input: raw image url
// output: object with dimensions and image keys
const fetch = (query) => {
	const { raw_image_url: rawImageUrl, respect_aspect_ratio: respectAspectRatio = false } = query;

	// last param designates only url -- not data ans object
	return getResizedImageData(rawImageUrl, null, true, respectAspectRatio, query["arc-site"]);
};

/*
not exposing api
http: false
If false, available to components during server-side rendering. Default is true
*/
export default {
	params,
	http: false,
	fetch,
	// not making any network requests anyway
	// so this won't be too big of a performance hit
	// and, resizing the image would change between deployments
	// with caching the same image if params change
	cache: false,
};
