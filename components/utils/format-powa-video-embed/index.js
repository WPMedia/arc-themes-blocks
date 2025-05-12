const formatPowaVideoEmbed = (embedMarkup, powaFields = {}) => {
	if (typeof window === "undefined" || typeof document === "undefined") {
		return ""; // disable this function for server-side rendering
	}
	if (embedMarkup) {
		// get markup as node to set properties
		const parser = new DOMParser();
		const doc = parser.parseFromString(embedMarkup, "text/html");
		const embedHTMLWithPlayStatus = doc.body;
		const powaFieldEntries = Object.entries(powaFields).filter(
			([, value]) => typeof value !== "undefined",
		);

		// set the rest of powa fields
		// https://redirector.arcpublishing.com/alc/arc-products/videocenter/user-docs/video-center-player-settings/
		powaFieldEntries.forEach(([key, value]) => {
			embedHTMLWithPlayStatus.querySelector(".powa")?.setAttribute(`data-${key}`, value);
		});

		// innerhtml ensures body tag not rendered
		return embedHTMLWithPlayStatus.innerHTML;
	}
	return "";
};

export default formatPowaVideoEmbed;
