import React from "react";

// eslint-disable-next-line
import { SIGN_UP } from "../index";

function FacebookSignIn({socialSignOnIn}) {
	const facebookTextType = socialSignOnIn === SIGN_UP ? 'continue_with' : 'login_with';
	return (
		<div
			className="fb-login-button"
			data-width="400"
			data-size="large"
			data-button-type={facebookTextType}
			data-scope="public_profile,email"
			data-auto-logout-link="false"
			data-use-continue-as="true"
			data-onlogin="window.onFacebookSignOn()"
		/>
	);
}

export default FacebookSignIn;
