function signImagesInANSObject(cachedCall, resizerFetch, resizerTokenVersion) {
	return function passThrough(response) {
		return response;
	};
}

module.exports = signImagesInANSObject;
module.exports.default = signImagesInANSObject;
