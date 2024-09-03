import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import FacebookSignIn from "./_children/FacebookSignIn";
import GoogleSignIn from "./_children/GoogleSignIn";
import AppleSignIn from "./_children/AppleSignIn";
import useSocialSignIn from "./utils/useSocialSignIn";

const SocialSignOn = ({
	className,
	onError,
	redirectURL,
	isOIDC,
	socialSignOnIn,
	customButtons,
	appleClientId,
}) => {
	const {
		facebookAppId,
		googleClientId,
		appleTeamId,
		appleKeyId,
		appleUrlToReceiveAuthToken,
		oidcClients,
	} = useSocialSignIn(redirectURL, isOIDC, socialSignOnIn, onError, customButtons);

	const hasAppleClient = () => {
		const hasOIDCAppleClient = oidcClients && oidcClients.find((oidcClient) => (
			oidcClient.protocol === "Apple" && oidcClient.clientId === appleClientId
		));

		if (hasOIDCAppleClient) {
			return true;
		}

		if (appleTeamId && appleKeyId && appleUrlToReceiveAuthToken) {
			return true;
		}

		return false;
	}

	return (
		<section className={className}>
			{googleClientId && <GoogleSignIn customButtons={customButtons} socialSignOnIn={socialSignOnIn} className={className} />}
			{facebookAppId && <FacebookSignIn customButtons={customButtons} socialSignOnIn={socialSignOnIn} className={className} />}
			{hasAppleClient() && (
				<AppleSignIn
					customButtons={customButtons}
					socialSignOnIn={socialSignOnIn}
					className={className}
					oidcClients={oidcClients}
					appleClientId={appleClientId}
				/>
			)}
		</section>
	);
};

SocialSignOn.propTypes = {
	redirectURL: PropTypes.string.isRequired,
	appleClientId: PropTypes.string,
	onError: PropTypes.func.isRequired,
};

export default SocialSignOn;
