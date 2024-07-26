import React, { useCallback } from "react";

import { Button, usePhrases, Icon, useIdentity } from "@wpmedia/arc-themes-components";

function SocialSignOnEditableFieldContainer({
	blockClassName,
	socialIcon,
	type,
	isConnected,
	onDisconnectFunction,
}) {
	const phrases = usePhrases();
	const { Identity } = useIdentity();

	const googleNotification = phrases.t("identity-block.social-google-one-tap-notification");

	const connectedText = phrases.t("identity-block.connect-account");
	const connectText = phrases.t("identity-block.connect-identity");
	const disconnectText = phrases.t("identity-block.disconnect-account");

	const onConnectIdentity = useCallback(() => {
		switch (type) {
			case "Google":
				window.google.accounts.id.prompt((notification) => {
					if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
						// eslint-disable-next-line
						alert(googleNotification);
						document.cookie = "g_state=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT";
						window.google.accounts.id.prompt();
					}
				});
				break;
			case "Facebook":
				window.onFacebookSignOn();
				break;
			case "Apple":
				Identity.initAppleSignOn();
				break;
			default:
				break;
		}
	}, [googleNotification, Identity, type]);

	return (
		<div className={`${blockClassName}__social-signOn-edit`}>
			<div className={`${blockClassName}__social-signOn-identity`}>
				<div className={`${blockClassName}__social-signOn-identity-icon`}>{socialIcon}</div>
				<div className={`${blockClassName}__social-signOn-identity-text`}>{type}</div>
			</div>
			{isConnected && (
				<Button
					className={`${blockClassName}__social-signOn-button-disconnect`}
					size="medium"
					variant="primary-reverse"
					onClick={onDisconnectFunction}
				>
					{disconnectText}
				</Button>
			)}
			{!isConnected && (
				<Button
					id={`custom-${type}-signin-btn`}
					className={`${blockClassName}__social-signOn-button-connect`}
					size="medium"
					variant="primary"
					onClick={() => onConnectIdentity()}
				>
					{connectText}
				</Button>
			)}
			{isConnected && (
				<div className={`${blockClassName}__social-signOn-button-connected`}>
					<Icon name="Check" />
					{connectedText}
				</div>
			)}
		</div>
	);
}

export default SocialSignOnEditableFieldContainer;
