import { useEffect, useState } from "react";
import useIdentity from "../identity";

const validateURL = (url) => {
	if (!url) return null;
	const validationRegEx = /^\/[^/].*$/;
	const valid = validationRegEx.test(url);
	if (valid) {
		return url;
	}
	return "/";
};

const useLogin = ({ isAdmin, redirectURL, redirectToPreviousPage, loggedInPageLocation }) => {
	const { Identity } = useIdentity();
	const [redirectToURL, setRedirectToURL] = useState(validateURL(redirectURL));
	const [redirectQueryParam, setRedirectQueryParam] = useState(null);

	useEffect(() => {
		if (window?.location?.search) {
			const searchParams = new URLSearchParams(window.location.search.substring(1));
			setRedirectQueryParam(validateURL(searchParams.get("redirect")));
		}

		if (redirectToPreviousPage && document?.referrer) {
			setRedirectToURL(document.referrer);
		}
	}, [redirectQueryParam, redirectToPreviousPage]);

	useEffect(() => {
		const getConfig = async () => {
			await Identity.getConfig();
		};

		if (Identity) {
			// https://redirector.arcpublishing.com/alc/docs/swagger/?url=./arc-products/arc-identity-v1.json#/Tenant_Configuration/get
			getConfig();
		}
	}, [Identity]);

	useEffect(() => {
		const checkLoggedInStatus = async () => {
			const isLoggedIn = await Identity.isLoggedIn();
			if (isLoggedIn) {
				window.location = redirectQueryParam || validateURL(loggedInPageLocation);
			}
		};
		if (Identity && !isAdmin) {
			checkLoggedInStatus();
		}
	}, [Identity, redirectQueryParam, loggedInPageLocation, isAdmin]);

	return {
		loginRedirect: redirectQueryParam || redirectToURL,
	};
};

export default useLogin;
