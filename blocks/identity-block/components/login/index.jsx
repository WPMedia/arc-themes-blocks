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
	const [currentRedirectToURL, setCurrentRedirectToURL] = useState(validatedRedirectURL);
	const [redirectQueryParam, setRedirectQueryParam] = useState(null);
	const [isAppleAuthSuccess, setIsAppleAuthSuccess] = useState(false);
	const { loginByOIDC } = useOIDCLogin();

	const setRedirectUrl = (url) => {
		setCurrentRedirectToURL(url);
		localStorage.setItem('ArcXP_redirectUrl', url);
	};

	const getRedirectURL = () => {
		const localStorageRedirectUrl = localStorage.getItem('ArcXP_redirectUrl');

		return redirectQueryParam || localStorageRedirectUrl || currentRedirectToURL;
	};

	useEffect(() => {
		const askForloginWithApple = async (code) => {
			await Identity.appleSignOn(code);
			const isLoggedIn = await Identity.isLoggedIn();

			if (isLoggedIn) {
				setIsAppleAuthSuccess(true);
			}
		};

		if (Identity && appleCode) {
			askForloginWithApple(appleCode);
		}
	}, [appleCode, Identity]);

	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search.substring(1));

		if (window?.location?.search) {
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
			const redirectUrlLocation = new URL(document.referrer);

			if (searchParams.has('reset_password')) {
				const newRedirectUrl = `${redirectURL}${redirectUrlLocation.search}`;

				setRedirectUrl(newRedirectUrl);
			} else {
				const newRedirectUrl = redirectUrlLocation.pathname.includes('/pagebuilder/')
					? redirectURL
					: `${redirectUrlLocation.pathname}${redirectUrlLocation.search}`;

				setRedirectUrl(newRedirectUrl);
			}
		}
	}, [redirectQueryParam, redirectToPreviousPage, redirectURL]);

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
					const localStorageRedirectUrl = localStorage.getItem('ArcXP_redirectUrl');
					const newRedirectUrl = redirectQueryParam || localStorageRedirectUrl || validatedLoggedInPageLoc;

					window.location.assign(newRedirectUrl);
				}
				localStorage.removeItem('ArcXP_redirectUrl');
			}
		};
		if (Identity && !isAdmin) {
			checkLoggedInStatus();
		}
	}, [Identity, redirectQueryParam, loggedInPageLocation, isAdmin, loginByOIDC, isOIDC, isAppleAuthSuccess]);

	return {
		loginRedirect: getRedirectURL(),
	};
};

export default useLogin;
