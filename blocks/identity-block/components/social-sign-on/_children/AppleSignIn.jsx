import React from "react";
import { Button, Icon, useIdentity, usePhrases } from "@wpmedia/arc-themes-components";

import { SIGN_UP } from "../constants";

const AppleIcon = <Icon name="Apple" width={21} height={24} viewBox="0 0 24 24" />;

function AppleSignIn({ customButtons, socialSignOnIn, className, oidcClients = [], appleClientId }) {
	const phrases = usePhrases();
	const { Identity } = useIdentity();

	const appleOIDCClient = oidcClients.find((oidcClient) => {
		const parsedClientId = oidcClient.clientId.split(';')[0];

		return oidcClient.protocol === 'Apple' && parsedClientId === appleClientId;
	});

	const handleClick = () => {
		if (appleOIDCClient?.clientId) {
			Identity.initiateOIDC(
				appleOIDCClient.clientId,
				['name', 'email'],
				true,
				true
			);
		} else {
			Identity.initAppleSignOn();
		}
	};

	return (
		<div
			data-testid="apple-sign-in-button"
			style={{ width: '100%' }}
		>
			<Button
				id="apple-btn"
				variant="secondary-reverse"
				onClick={handleClick}
				iconLeft={AppleIcon}
				className={`${className}__Apple ${customButtons ? `${className}__Apple__custom` : ''}`}
			>
				{socialSignOnIn !== SIGN_UP ? (
					<span>{phrases.t("identity-block.social-signOn-apple-login")}</span>
				) : (
					<span>{phrases.t("identity-block.social-signOn-apple-signUp")}</span>
				)}
			</Button>
		</div>
	);
}

export default AppleSignIn;
