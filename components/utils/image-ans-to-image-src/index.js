/**
 * Helper to take an ANS image object and return an src string
 *
 * @param data ANS Image Object
 *
 * @return an image string to be used in the src of a image tag
 */
const imageANSToImageSrc = (data) => {
	const { _id: id, auth, url } = data || {};
	if (url) {
		if (id) {
			const fileExtension = url.match(/\.\w{3,4}$/);
			if (fileExtension) {
				return `${id}${fileExtension[0]}`;
			}
			// Return the id as a string if no file extension is found.
			return `${id}`;
		}
		if (auth) {
			return encodeURIComponent(url);
		}
	}
	return null;
};

export default imageANSToImageSrc;
