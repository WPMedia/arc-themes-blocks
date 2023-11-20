import { useContext, useEffect, useState } from "react";
import { useIdentity } from "@wpmedia/arc-themes-components";
import { GoogleSignInContext } from "./googleContext";
import useOIDCLogin from "../../../utils/useOIDCLogin";
import validateURL from "../../../utils/validate-redirect-url";

function useSocialSignIn(redirectURL, onError = () => {}, isOIDC) {
	const { Identity } = useIdentity();
	const { isGoogleLoaded } = useContext(GoogleSignInContext);
	const [config, setConfig] = useState(() => Identity?.configOptions ?? {});
	const { loginByOIDC } = useOIDCLogin();

	useEffect(() => {
		window.onFacebookSignOn = async () => {
			try {
				await Identity.facebookSignOn();

				if (isOIDC) {
					loginByOIDC();
				} else {
					const validatedURL = validateURL(redirectURL);
					window.location = validatedURL;
				}
			} catch (e) {
				onError();
			}
		};
	}, [Identity, onError, redirectURL]);

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
			const googleIdConfig = {
				client_id: googleClientId,
				callback: (credentialResponse) =>
					Identity.signInWithGoogle(credentialResponse).then(() => {
						if (isOIDC) {
							loginByOIDC();
						}
					}),
				auto_select: true,
			};

			window.google.accounts.id.initialize(googleIdConfig);

			window.google.accounts.id.renderButton(document.getElementById("google-sign-in-button"), {
				type: "standard",
				theme: "outline",
				size: "large",
				text: "continue_with",
				shape: "rectangular",
				logo_alignment: "left",
				width: "300",
			});

			Identity.isLoggedIn().then((isLoggedIn) => {
				if (!isLoggedIn) {
					window.google.accounts.id.prompt();
				} else if (isLoggedIn && isOIDC) {
					loginByOIDC();
				}
			});
		}
	}, [config.googleClientId, Identity, isGoogleLoaded]);

	useEffect(() => {
		const initializeFacebook = async () => {
			await Identity.initFacebookLogin(null);
		};
		if (config.facebookAppId) {
			initializeFacebook();
		}
	}, [Identity, config.facebookAppId]);

	return {
		// if facebook and google setup with subs,
		// then they will have a truthy value here
		facebookAppId: config.facebookAppId,
		googleClientId: config.googleClientId,
	};
}

export default useSocialSignIn;
