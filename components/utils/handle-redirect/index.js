const get = require("lodash.get");

const RedirectError = (location, message = "Redirect", code = 302) => {
	const err = new Error(message);
	err.statusCode = code;
	err.location = location;
	return err;
};

const handleRedirect = (response) => {
	const content = response.data;
	const contentType = content.type;
	const redirectUrl = get(
		content,
		"redirect_url",
		get(content, "related_content.redirect[0].redirect_url", null),
	);

	if (contentType && (contentType === "story" || contentType === "redirect") && redirectUrl) {
		throw RedirectError(redirectUrl);
	}
	return response;
};

export default handleRedirect;
