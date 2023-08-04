const validateURL = (url) => {
	if (!url) return null;
	const validationRegEx = /^\/[^/].*$/;
	const valid = validationRegEx.test(url);
	if (valid) {
		return url;
	}
	return "/";
};

export default validateURL;
