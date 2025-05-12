const formatSrc = (srcWithResizerUrl, resizedOptions, width, height) => {
	// remove height and width from the resizedOptions
	// never use the object's heights and widths
	const {
		height: _unusedHeight,
		width: _unusedWidth,
		...resizedOptionsNoDimensions
	} = resizedOptions;

	// "https://resizer-url.com/image.jpg" + "?" + "filter=70&height=100&width=100"
	return srcWithResizerUrl.concat(
		"?",
		new URLSearchParams({
			...resizedOptionsNoDimensions,
			// show height and width in params if available
			// using optional object key syntax
			...(width ? { width: Math.floor(width) } : {}),
			...(height ? { height: Math.floor(height) } : {}),
		}).toString()
	);
};
// Use resizedOptions as querystring params on the src URL. If width and/or height are provided
// both in resizedOptions as well as function arguments, the function arguments will be used.

export default formatSrc;
