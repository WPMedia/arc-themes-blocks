const validateURL = (url) => {
    if (!url) return null;

    try {
        const urlObject = new URL(url, window.location.origin);

        if (urlObject.origin === window.location.origin) {
            return urlObject.pathname;
        }
    } catch (e) {

        sessionStorage.setItem("ArcXP_redirectUrl", "/");
        return "/";
    }

    sessionStorage.setItem("ArcXP_redirectUrl", "/");
    return "/";
};

export default validateURL;
