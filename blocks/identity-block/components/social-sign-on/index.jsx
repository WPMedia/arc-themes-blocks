import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import FacebookSignIn from "./_children/FacebookSignIn";
import GoogleSignIn from "./_children/GoogleSignIn";
import AppleSignIn from "./_children/AppleSignIn";
import useSocialSignIn from "./utils/useSocialSignIn";

const SocialSignOn = ({ className, onError, redirectURL, isOIDC, socialSignOnIn }) => {
	const { facebookAppId, googleClientId, appleTeamId, appleKeyId, appleUrlToReceiveAuthToken} = useSocialSignIn(redirectURL, isOIDC, socialSignOnIn, onError);
	return (
		<section className={className}>
			{googleClientId ? <GoogleSignIn onError={onError} redirectURL={redirectURL} socialSignOnIn={socialSignOnIn} className={className} /> : null}
			{facebookAppId ? <FacebookSignIn socialSignOnIn={socialSignOnIn}/> : null}
			{appleTeamId && appleKeyId && appleUrlToReceiveAuthToken ? <AppleSignIn socialSignOnIn={socialSignOnIn} className={className} /> : null}
		</section>
	);
};

SocialSignOn.propTypes = {
	redirectURL: PropTypes.string.isRequired,
	onError: PropTypes.func.isRequired,
};

export default SocialSignOn;
