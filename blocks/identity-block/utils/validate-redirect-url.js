const validateURL = (url) => {
	if (!url) return null;
	const validationRegEx = /^\/[^/].*$/;
	const valid = validationRegEx.test(url);

	if (valid) {
		return `${window.location.origin}${url}`;
	}

	const urlLocation = new URL(url);

	if (urlLocation.origin === window.location.origin) {
		return url;
	}

	return "/";
};

export default validateURL;
