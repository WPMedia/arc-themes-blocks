import { useContext, useEffect, useState } from "react";
import { GoogleSignInContext } from "./googleContext";
import useIdentity from "../../identity";

function useSocialSignIn(redirectURL, onError = () => {}) {
	const { Identity } = useIdentity();
	const { isGoogleLoaded } = useContext(GoogleSignInContext);
	const [config, setConfig] = useState(() => Identity?.configOptions ?? {});

	useEffect(() => {
		window.onFacebookSignOn = async () => {
			try {
				await Identity.facebookSignOn();
				window.location = redirectURL;
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
				callback: (credentialResponse) => Identity.signInWithGoogle(credentialResponse),
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