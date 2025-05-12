const calculateWidthAndHeight = ({ aspectRatio = "", width, height, ansImage = {} }) => {
	if (width && height) {
		return { width, height };
	}

	const [w, h] = aspectRatio.split(":");
	const imageWidth = ansImage?.width || width;
	const imageHeight = ansImage?.height || height;

	if (aspectRatio && imageWidth) {
		const calculatedHeight = (h / w) * imageWidth;
		return {
			width: imageWidth,
			height: Math.floor(calculatedHeight),
		};
	}

	if (aspectRatio && imageHeight) {
		const calculatedWidth = (w / h) * imageHeight;
		return {
			width: Math.floor(calculatedWidth),
			height: imageHeight,
		};
	}

	return {
		width: imageWidth || null,
		height: imageHeight || null,
	};
};

export default calculateWidthAndHeight;
