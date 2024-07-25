import { useContext, useEffect, useState } from "react";
import { useIdentity } from "@wpmedia/arc-themes-components";
import { GoogleSignInContext } from "./googleContext";
import useOIDCLogin from "../../../utils/useOIDCLogin";
import validateURL from "../../../utils/validate-redirect-url";

import { SIGN_UP } from "../constants";

function useSocialSignIn(
	redirectURL,
	isOIDC,
	socialSignOnIn,
	onError = () => {},
	customButtons = true,
	fromSocialSignOnBlock = true,
) {
	const { Identity } = useIdentity();
	const { isGoogleLoaded } = useContext(GoogleSignInContext);
	const [config, setConfig] = useState(() => Identity?.configOptions ?? {});

	const [isFBInitialized, setIsFBInitialized] = useState(false);
	const [isFBEventSubscribed, setIsFBEventSubscribed] = useState(false);
	const [updateIdentities, setUpdateIdentities] = useState(false);

	const { loginByOIDC } = useOIDCLogin();

	useEffect(() => {
		window.onFacebookSignOn = async () => {
			try {
				Identity.facebookSignOn().then(() => {
					if (customButtons) {
						setIsFBInitialized(true);
					}
				});

				if (isOIDC) {
					loginByOIDC();
				} else if (fromSocialSignOnBlock) {
					Identity.isLoggedIn().then((isLoggedIn) => {
						if (isLoggedIn) {
							window.location = validateURL(redirectURL);
						}
					});
				}
			} catch (e) {
				onError();
			}
		};
	}, [
		Identity,
		onError,
		redirectURL,
		isOIDC,
		loginByOIDC,
		customButtons,
		setIsFBInitialized,
		fromSocialSignOnBlock,
	]);

	useEffect(() => {
		const fetchConfig = async () => {
			await Identity.getConfig();
			setConfig(Identity.configOptions);
		};
		if (Identity && !Identity.configOptions) {
			fetchConfig();
		}
	}, [Identity]);

	useEffect(() => {
		// istanbul ignore next
		if (isGoogleLoaded && config.googleClientId) {
			const googleClientId = config.googleClientId.split(",")?.[0];
			const googleIdConfigOneTap = {
				client_id: googleClientId,
				callback: async (credentialResponse) =>
					Identity.signInWithGoogle(credentialResponse).then(() => {
						if (isOIDC) {
							loginByOIDC();
						} else {
							const validatedURL = validateURL(redirectURL);
							window.location = validatedURL;
						}
					}),
				auto_select: false,
				state_cookie_domain: "none",
			};
			// one-tap Google Sign-In
			window.google.accounts.id.initialize(googleIdConfigOneTap);

			if (!customButtons) {
				const googleTextType = socialSignOnIn === SIGN_UP ? "signup_with" : "signin_with";
				window.google.accounts.id.renderButton(document.getElementById("google-sign-in-button"), {
					// render a standard Google Sign-In button
					type: "standard",
					theme: "outline",
					size: "large",
					text: googleTextType,
					shape: "rectangular",
					logo_alignment: "left",
					width: "400",
				});
			}

			Identity.isLoggedIn().then((isLoggedIn) => {
				if (!isLoggedIn) {
					// If user rejects it will not appear again based on exponential cooldown https://developers.google.com/identity/gsi/web/guides/features#exponential_cooldown
					window.google.accounts.id.prompt();
				} else if (isLoggedIn && isOIDC) {
					loginByOIDC();
				}
			});
		}
	}, [
		config.googleClientId,
		Identity,
		isGoogleLoaded,
		isOIDC,
		loginByOIDC,
		redirectURL,
		socialSignOnIn,
		customButtons,
	]);

	useEffect(() => {
		const initializeFacebook = async () => {
			// Basic setup: https://developers.facebook.com/docs/javascript/quickstart/
			await Identity.initFacebookLogin(null, null, customButtons);
		};
		if (config.facebookAppId) {
			initializeFacebook();
		}
	}, [Identity, config.facebookAppId, customButtons]);

	useEffect(() => {
		const checkIsLoggedIn = () => {
			const timeout = setTimeout(() => {
				Identity.isLoggedIn().then((isLoggedIn) => {
					if (isLoggedIn) {
						window.location = validateURL(redirectURL);
					}
				});
			}, 1500);
  			return () => clearTimeout(timeout)
		};

		const setIdentityUpdated = () => {
			const timeout = setTimeout(() => {
				setUpdateIdentities((prev) => !prev);
			}, 1500);
			return () => clearTimeout(timeout)
		};

		if (customButtons && isFBInitialized && !isFBEventSubscribed && window?.FB?.Event) {
			setIsFBEventSubscribed(true);
			window.FB.Event.subscribe("auth.statusChange", (response) => {
				if (response.status === "connected") {
					if (fromSocialSignOnBlock) {
						checkIsLoggedIn();
					} else {
						setIdentityUpdated();
					}
				}
			});
		}
	}, [
		isFBInitialized,
		isFBEventSubscribed,
		customButtons,
		setUpdateIdentities,
		updateIdentities,
		Identity,
		fromSocialSignOnBlock,
		redirectURL,
	]);






	return {
		// if facebook and google setup with subs,
		// then they will have a truthy value here
		facebookAppId: config.facebookAppId,
		googleClientId: config.googleClientId,
		appleTeamId: config.teamId,
		appleKeyId: config.keyId,
		appleUrlToReceiveAuthToken: config.urlToReceiveAuthToken,
		updateIdentities,
	};
}

export default useSocialSignIn;
