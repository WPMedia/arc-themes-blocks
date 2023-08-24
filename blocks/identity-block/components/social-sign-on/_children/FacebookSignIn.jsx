import React from "react";

function FacebookSignIn() {
	return (
		<div
			className="fb-login-button"
			data-width="300"
			data-size="large"
			data-button-type="continue_with"
			data-scope="public_profile,email"
			data-auto-logout-link="false"
			data-use-continue-as="true"
			data-onlogin="window.onFacebookSignOn()"
		/>
	);
}

export default FacebookSignIn;
