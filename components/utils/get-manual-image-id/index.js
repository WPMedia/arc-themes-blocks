const getManualImageID = (imageURL, isResizedImage = false) => {
	let manualImageId = "";
	if (!isResizedImage && imageURL) {
		const cloudfrontRegex =
			/^https:\/\/cloudfront.{1,50}images\.arcpublishing\.com\/.{1,150}\/(\w{26})(?:$|\.\w{3,4})/;
		const matches = imageURL.match(cloudfrontRegex);
		manualImageId = Array.isArray(matches) && matches.length >= 2 ? matches[1] : "";
	}
	return manualImageId;
};

export default getManualImageID;
