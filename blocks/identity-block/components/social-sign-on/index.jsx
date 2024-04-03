import React from "react";
import PropTypes from "@arc-fusion/prop-types";
// eslint-disable-next-line
import FacebookSignIn from "./_children/FacebookSignIn";
// eslint-disable-next-line
import GoogleSignIn from "./_children/GoogleSignIn";
// eslint-disable-next-line
import AppleSignIn from "./_children/AppleSignIn";
// eslint-disable-next-line
import useSocialSignIn from "./utils/useSocialSignIn";

export const LOGIN = "Login";
export const SIGN_UP = "SignUp"

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
