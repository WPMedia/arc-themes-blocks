import React from "react";

import { Button, Icon, usePhrases } from "@wpmedia/arc-themes-components";

import { SIGN_UP } from "../constants";

const GoogleIcon = <Icon name="GoogleColor" />;

function GoogleSignIn({ customButtons, socialSignOnIn, className }) {
	const phrases = usePhrases();
	const googleNotification = phrases.t("identity-block.social-google-one-tap-notification");

	if (customButtons) {
		return (
			<Button
				id="custom-google-signin-btn"
				variant="secondary-reverse"
				iconLeft={GoogleIcon}
				className={`${className}__Google`}
				onClick={() =>
					window?.google?.accounts?.id?.prompt((notification) => {
						if (notification.isSkippedMoment()) {
							// https://developers.google.com/identity/gsi/web/reference/js-reference
							// https://developers.google.com/identity/gsi/web/guides/features#exponential_cooldown
							// eslint-disable-next-line
							alert(googleNotification);
							// Remove cookie works in Safari
							document.cookie = `g_state=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
							window.google.accounts.id.prompt();
						}
					})
				}
			>
				{socialSignOnIn !== SIGN_UP ? (
					<span>{phrases.t("identity-block.social-signOn-google-login")}</span>
				) : (
					<span>{phrases.t("identity-block.social-signOn-google-signUp")}</span>
				)}
			</Button>
		);
	}
	return (
		<div data-testid="google-sign-in-button">
			<div id="google-sign-in-button" />
		</div>
	);
}

export default GoogleSignIn;
