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
	appleState,
}) => {

	const { Identity } = useIdentity();
	const validatedRedirectURL = validateURL(redirectURL);
	const [currentRedirectToURL, setCurrentRedirectToURL] = useState(validatedRedirectURL);
	const [redirectQueryParam, setRedirectQueryParam] = useState(null);
	const [isAppleAuthSuccess, setIsAppleAuthSuccess] = useState(false);
	const { loginByOIDC } = useOIDCLogin();

	const setRedirectUrl = (url) => {
		setCurrentRedirectToURL(url);
		sessionStorage.setItem('ArcXP_redirectUrl', url);
	};

	const getRedirectURL = () => {
		const localStorageRedirectUrl = sessionStorage.getItem('ArcXP_redirectUrl');

		return redirectQueryParam || localStorageRedirectUrl || currentRedirectToURL;
	};

	useEffect(() => {
		const askForloginWithApple = async (code, state) => {
			if (state) {
				await Identity.signInWithOIDC(code, state);
			} else {
				await Identity.appleSignOn(code);
			}

			const isLoggedIn = await Identity.isLoggedIn();

			if (isLoggedIn) {
				setIsAppleAuthSuccess(true);
			}
		};

		if (Identity && appleCode) {
			askForloginWithApple(appleCode, appleState);
		}
	}, [appleCode, Identity, appleState]);

	const isReferrerFromHost = () => {
		if (!document?.referrer) return false;

		const referrerURL = new URL(document.referrer);

		return referrerURL.origin === window.location.origin;
	};

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

		if (redirectToPreviousPage && document?.referrer && isReferrerFromHost()) {
			const redirectUrlLocation = new URL(document.referrer);
			let newRedirectUrl = redirectUrlLocation.pathname.includes('/pagebuilder/')
				? redirectURL
				: `${redirectUrlLocation.pathname}${redirectUrlLocation.search}`;

			if (searchParams.has('reset_password')) {
				newRedirectUrl = `${redirectURL}${redirectUrlLocation.search}`;

				setRedirectUrl(newRedirectUrl);
			}

			setRedirectUrl(newRedirectUrl);
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
					const localStorageRedirectUrl = sessionStorage.getItem('ArcXP_redirectUrl');
					const validatedLocalRedirectURL = validateURL(localStorageRedirectUrl);
					const newRedirectUrl = redirectQueryParam || validatedLocalRedirectURL || validatedLoggedInPageLoc;

					window.location = newRedirectUrl;
				}
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
