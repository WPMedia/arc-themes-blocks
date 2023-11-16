import { useEffect, useState } from "react";
import { useIdentity } from "@wpmedia/arc-themes-components";
import validateURL from "../../utils/validate-redirect-url";

const useLogin = ({ isAdmin, redirectURL, redirectToPreviousPage, loggedInPageLocation }) => {
	const { Identity } = useIdentity();
	const validatedRedirectURL = validateURL(redirectURL);
	const [redirectToURL, setRedirectToURL] = useState(validatedRedirectURL);
	const [redirectQueryParam, setRedirectQueryParam] = useState(null);

	useEffect(() => {
		if (window?.location?.search) {
			const searchParams = new URLSearchParams(window.location.search.substring(1));
			const validatedRedirectParam = validateURL(searchParams.get("redirect"));
			setRedirectQueryParam(validatedRedirectParam);
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
			const validatedLoggedInPageLoc = validateURL(loggedInPageLocation);
			if (isLoggedIn) {
				window.location = redirectQueryParam || validatedLoggedInPageLoc;
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
