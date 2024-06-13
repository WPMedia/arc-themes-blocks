const validateURL = (url, contextPath = '') => {
	if (!url) return null;
	const validationRegEx = /^\/[^/].*$/;
	const valid = validationRegEx.test(url);

	if (valid) {
		return `${window.location.origin}${contextPath}${url}`;
	}

	const urlLocation = new URL(url);

	if (urlLocation === window.location.origin) {
		return url;
	}

	return "/";
};

export default validateURL;
