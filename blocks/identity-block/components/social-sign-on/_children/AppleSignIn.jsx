import React from "react";
import { Button, Icon, useIdentity, usePhrases } from "@wpmedia/arc-themes-components";

import { SIGN_UP } from "../constants";

const AppleIcon = <Icon name="Apple" width={21} height={24} viewBox="0 0 24 24" />;

function AppleSignIn({ customButtons, socialSignOnIn, className, oidcClients = [], appleClientId }) {
	const phrases = usePhrases();
	const { Identity } = useIdentity();

	const appleOIDCClient = oidcClients.find((oidcClient) => (
		oidcClient.protocol === 'Apple' && oidcClient.clientId === appleClientId
	));

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
	);
}

export default AppleSignIn;
