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
	appleCode,
}) => {

	const { Identity } = useIdentity();
	const validatedRedirectURL = validateURL(redirectURL);
	const [redirectToURL, setRedirectToURL] = useState(validatedRedirectURL);
	const [redirectQueryParam, setRedirectQueryParam] = useState(null);
	const [isAppleAuthSuccess, setIsAppleAuthSuccess] = useState(false);
	const { loginByOIDC } = useOIDCLogin();

	useEffect(()=>{
		const askForloginWithApple = async (code) => {
			await Identity.appleSignOn(code);
			const isLoggedIn = await Identity.isLoggedIn();
			
			if(isLoggedIn){
				setIsAppleAuthSuccess(true);
			}
		};

		if(Identity && appleCode){
			askForloginWithApple(appleCode);
		}
	},[appleCode, Identity]);

	useEffect(() => {
		if (window?.location?.search) {
			const searchParams = new URLSearchParams(window.location.search.substring(1));

			// redirectURL could have additional params
			const params = ["paymentMethodID"];
			const aditionalParams = params.filter((p) => {
				const paramExist = searchParams.has(p);

				return paramExist;
			})

			const fullURL = searchParams.get("redirect") ? appendURLParams(searchParams.get("redirect"), aditionalParams.filter(item => item !== undefined)) : null;
			const validatedRedirectParam = validateURL(fullURL);
			setRedirectQueryParam(validatedRedirectParam);
		}

		if (redirectToPreviousPage && document?.referrer) {
			const redirectUrl = new URL(document.referrer);

			setRedirectToURL(`${redirectUrl.pathname}${redirectUrl.search}`);
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
	}, [Identity, redirectQueryParam, loggedInPageLocation, isAdmin, loginByOIDC, isOIDC, isAppleAuthSuccess]);

	return {
		loginRedirect: redirectQueryParam || redirectToURL,
	};
};

export default useLogin;
