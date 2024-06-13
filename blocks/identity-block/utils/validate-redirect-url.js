const validateURL = (url, contextPath = '') => {
	if (!url) return null;
	const validationRegEx = /^\/[^/].*$/;
	const valid = validationRegEx.test(url);

	if (valid) {
		return `${window.location.origin}${contextPath}${url}`;
	}
	return "/";
};

export default validateURL;
