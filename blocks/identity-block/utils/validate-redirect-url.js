const validateURL = (url, allowedRedirectDomains) => {
	if (!url) return null;
	const validationRegEx = /^\/[^/].*$/;
	const valid = validationRegEx.test(url);
	if (valid) {
		if (allowedRedirectDomains) {
			const domain = allowedRedirectDomains.find((item) => item === window.location.origin);

			if (domain) {
				return `${domain}${url}`;
			}
		}

		return url;
	}

	if (allowedRedirectDomains.includes(url)) {
		const externalDomain = allowedRedirectDomains.find((item) => item === url);

		return `${externalDomain}${url}`;
	}

	return "/";
};

export default validateURL;
