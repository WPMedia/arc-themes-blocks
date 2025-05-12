const getLocation = (uri) => {
	let url;

	if (typeof window === "undefined") {
		url = new URL(uri, "http://example.com");
	} else {
		url = document.createElement("a");
		// IE doesn't populate all link properties when setting .href with a relative URL,
		// however .href will return an absolute URL which then can be used on itself
		// to populate these additional fields.
		url.href = uri;

		if (url.host === "") {
			url.href = `${url.href}`;
		}
	}

	return url;
};

const formatURL = (item) => {
	if (!item) {
		return "";
	}

	const url = getLocation(item);

	if (url.hash || url.search || url.pathname.match(/\./)) {
		return item;
	}

	if (item[item.length - 1] !== "/") {
		return `${item}/`;
	}

	return item;
};

export default formatURL;
