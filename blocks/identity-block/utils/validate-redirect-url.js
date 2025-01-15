const validateURL = (url) => {
	if (!url) return null;

	try {
		const urlObject = new URL(url, window.location.origin);
		console.log("urlObject " + urlObject.origin)
		console.log("window " +window.location.origin)

		if (urlObject.origin === window.location.origin) {
			console.log("urlObject pth " + urlObject.pathname);
	
			if(urlObject.pathname === "/"){
				return urlObject.pathname
			}

			if(urlObject.pathname !== "/"){
				return `${urlObject.origin}${urlObject.pathname}`
			}
		}

		sessionStorage.setItem("ArcXP_redirectUrl", "/");
		return "/";
	} catch (error) {
		const storedRedirect = sessionStorage.getItem("ArcXP_redirectUrl");
        if (storedRedirect && storedRedirect.startsWith("/")) {
            return storedRedirect;
        }

        // Default to "/"
        sessionStorage.setItem("ArcXP_redirectUrl", "/");
        return "/";
	}
};

export default validateURL;