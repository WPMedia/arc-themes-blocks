function signImagesInANSObject() {
	return function passThrough(response) {
		return response;
	};
}

module.exports = signImagesInANSObject;
module.exports.default = signImagesInANSObject;
