import React, { useEffect } from "react";

import { Button, Icon, usePhrases } from "@wpmedia/arc-themes-components";

import { SIGN_UP } from "../constants";

const FacebookIcon = <Icon name="Facebook" />;

function FacebookSignIn({ customButtons, socialSignOnIn, className }) {
	const phrases = usePhrases();
	const facebookTextType = socialSignOnIn === SIGN_UP ? "continue_with" : "login_with";

	if (customButtons) {
		return (
			<Button
				id="facebook-btn"
				variant="secondary-reverse"
				iconLeft={FacebookIcon}
				className={`${className}__Facebook`}
				onClick={() => window?.onFacebookSignOn()}
			>
				{socialSignOnIn !== SIGN_UP ? (
					<span>{phrases.t("identity-block.social-signOn-facebook-login")}</span>
				) : (
					<span>{phrases.t("identity-block.social-signOn-facebook-signUp")}</span>
				)}
			</Button>
		);
	}

	return (
		<div data-testid="fb-login-button">
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
		</div>
	);
}

export default FacebookSignIn;
