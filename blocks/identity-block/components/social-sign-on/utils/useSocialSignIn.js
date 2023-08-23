import { useState, useEffect } from "react";
import useIdentity from "../../identity";

function useSocialSignIn(redirectURL, onError = () => {}) {
	const { Identity } = useIdentity();
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
