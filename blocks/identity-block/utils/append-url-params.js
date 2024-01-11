// Funtion to append additional parameters as part of URL
const appendURLParams = (initURL, params) => {

	let fullURL = initURL;
	if (params.length) {
		const allParams = params.map((x) => Object.keys(x) + "=" + Object.values(x)).join("&");
		fullURL = initURL.includes("?") ? `${initURL}&${allParams}` : `${initURL}?${allParams}`;
	}

	return fullURL;
};

export default appendURLParams;
