const validateURL = (url) => {
	if (!url) return null;

	try {
		const urlObject = new URL(url, window.location.origin);

		if (urlObject.origin === window.location.origin) {
	
			if(urlObject.pathname === "/"){
				return urlObject.pathname
			}

			if(urlObject.pathname !== "/"){
                return urlObject.toString(); 
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