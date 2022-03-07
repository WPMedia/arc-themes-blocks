export default (unsafe) => {
	if (typeof unsafe === "undefined" || !unsafe) return null;

	return unsafe
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&#039;/g, "'");
};
