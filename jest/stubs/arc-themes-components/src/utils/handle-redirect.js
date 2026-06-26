function handleRedirect(response) {
	const redirectUrl = response?.data?.related_content?.redirect?.[0]?.redirect_url;
	if (redirectUrl) {
		throw new Error("Redirect");
	}
	return response;
}

module.exports = handleRedirect;
module.exports.default = handleRedirect;
