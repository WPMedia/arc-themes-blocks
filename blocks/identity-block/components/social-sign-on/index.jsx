import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import FacebookSignIn from "./_children/FacebookSignIn";
import GoogleSignIn from "./_children/GoogleSignIn";
import AppleSignIn from "./_children/AppleSignIn";
import OIDCSignIn from "./_children/OIDCSignin";
import useSocialSignIn from "./utils/useSocialSignIn";

const SocialSignOn = ({
	className,
	onError,
	redirectURL,
	isOIDC,
	socialSignOnIn,
	customButtons
}) => {
	const {
		facebookAppId,
		googleClientId,
		appleTeamId,
		appleKeyId,
		appleUrlToReceiveAuthToken,
		oidcClients,
	} = useSocialSignIn(redirectURL, isOIDC, socialSignOnIn, onError, customButtons);

	return (
		<section className={className}>
			{googleClientId && <GoogleSignIn customButtons={customButtons} socialSignOnIn={socialSignOnIn} className={className} />}
			{facebookAppId && <FacebookSignIn customButtons={customButtons} socialSignOnIn={socialSignOnIn} className={className} />}
			{appleTeamId && appleKeyId && appleUrlToReceiveAuthToken && <AppleSignIn customButtons={customButtons} socialSignOnIn={socialSignOnIn} className={className} />}
			{oidcClients?.length && oidcClients?.length > 0 && (
				<OIDCSignIn
					customButtons={customButtons}
					socialSignOnIn={socialSignOnIn}
					oidcClients={oidcClients}
					className={className}
				/>
			)}
		</section>
	);
};

SocialSignOn.propTypes = {
	redirectURL: PropTypes.string.isRequired,
	onError: PropTypes.func.isRequired,
};

export default SocialSignOn;
