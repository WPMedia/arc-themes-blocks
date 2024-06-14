const validateURL = (url) => {
	if (!url) return null;
	const validationRegEx = /^\/[^/].*$/;
	const valid = validationRegEx.test(url);

	if (valid) {
		// handling preview with PB.
		if (window.location.pathname.includes('/pf/')) {
			return `${window.location.origin}/pf${url}`;
		}

		return `${window.location.origin}${url}`;
	}

	const urlLocation = new URL(url);

	if (urlLocation === window.location.origin) {
		return url;
	}

	return "/";
};

export default validateURL;
