import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import FacebookSignIn from "./_children/FacebookSignIn";
import GoogleSignIn from "./_children/GoogleSignIn";

import useSocialSignIn from "./utils/useSocialSignIn";

const SocialSignOn = ({ onError, redirectURL }) => {
	const { facebookAppId, googleClientId } = useSocialSignIn(redirectURL, onError);

	return (
		<section>
			{googleClientId ? <GoogleSignIn onError={onError} redirectURL={redirectURL} /> : null}
			{facebookAppId ? <FacebookSignIn /> : null}
		</section>
	);
};

SocialSignOn.propTypes = {
	redirectURL: PropTypes.string.isRequired,
	onError: PropTypes.func.isRequired,
};

export default SocialSignOn;
