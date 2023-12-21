import { useEffect, useState } from "react";
import { useIdentity } from "@wpmedia/arc-themes-components";
import appendURLParams from "../../utils/append-url-params";
import validateURL from "../../utils/validate-redirect-url";
import useOIDCLogin from "../../utils/useOIDCLogin";

const useLogin = ({
	isAdmin,
	redirectURL,
	redirectToPreviousPage,
	loggedInPageLocation,
	isOIDC,
}) => {

	const { Identity } = useIdentity();
	const validatedRedirectURL = validateURL(redirectURL);
	const [redirectToURL, setRedirectToURL] = useState(validatedRedirectURL);
	const [redirectQueryParam, setRedirectQueryParam] = useState(null);
	const { loginByOIDC } = useOIDCLogin();

	useEffect(() => {
		if (window?.location?.search) {
			const searchParams = new URLSearchParams(window.location.search.substring(1));

			//redirectURL could have additional params
			const params = ["paymentMethodID"];
			const aditionalParams = params.map((p) => {
				const paramExist = searchParams.has(p)
				if(paramExist){
					return {[p]:searchParams.get(p)}
				}
			})

			const fullURL = searchParams.get("redirect") ? appendURLParams(searchParams.get("redirect"), aditionalParams.filter(item => item !== undefined)) : null;
			const validatedRedirectParam = validateURL(fullURL);
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
				if (isOIDC) {
					loginByOIDC();
				} else {
					window.location = redirectQueryParam || validatedLoggedInPageLoc;
				}
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
