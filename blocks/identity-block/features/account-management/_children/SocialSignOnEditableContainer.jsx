import React, { useEffect } from "react";

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

	const connectedText = phrases.t("identity-block.connected-identity");
	const connectText = phrases.t("identity-block.connect-identity");
	const disconnectText = phrases.t("identity-block.disconnect-account");

	useEffect(() => {
		if (type === "Google" && !isConnected) {
			const attachEventListener = () =>
				document.getElementById("custom-Google-signin-btn").addEventListener("click", () =>
					window.google.accounts.id.prompt((notification) => {
						if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
							// https://developers.google.com/identity/gsi/web/reference/js-reference
							// https://developers.google.com/identity/gsi/web/guides/features#exponential_cooldown
							alert(googleNotification);
							document.cookie =  `g_state=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`; //Works in Safari
							window.google.accounts.id.prompt();
						}
					}),
				);
			setTimeout(() => attachEventListener(), 0);
		}
	}, [type, isConnected]);

	useEffect(() => {
		if (type === "Facebook" && !isConnected) {
			const attachEventListener = () =>
				document.getElementById("custom-Facebook-signin-btn").addEventListener("click", () => {
					window.onFacebookSignOn();
				});
			setTimeout(() => attachEventListener(), 0);
		}
	}, [type, isConnected]);

	useEffect(() => {
		if (type === "Apple" && !isConnected) {
			const attachEventListener = () => {
				document
					.getElementById("custom-Apple-signin-btn")
					.addEventListener("click", () => Identity.initAppleSignOn());
			};
			setTimeout(() => attachEventListener(), 0);
		}
	}, [type, isConnected]);

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
