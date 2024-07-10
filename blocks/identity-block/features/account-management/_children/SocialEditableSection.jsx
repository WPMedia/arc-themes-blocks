import React, { useEffect } from "react";
import { Icon } from "@wpmedia/arc-themes-components";

import useSocialSignIn from "../../../components/social-sign-on/utils/useSocialSignIn";
import SocialSignOnEditableFieldContainer from "./SocialSignOnEditableContainer";

function removeHostname(url) {
	const parsedUrl = new URL(url);
	const urlWithoutHostname = parsedUrl.pathname + parsedUrl.search + parsedUrl.hash;

	return urlWithoutHostname;
}

function SocialEditableSection({
	blockClassName,
	hasFacebook,
	hasGoogle,
	hasApple,
	unlinkFacebook,
	unlinkGoogle,
	unlinkApple,
	linkApple,
	numIdentities,
	updateIdentities,
	setUpdateIdentities
}) {
	// get current because social sign in has reload and need to re-render page anyway
	const currentUrl = window.location.href;
	const newURL = removeHostname(currentUrl);

	const { facebookAppId, googleClientId, appleTeamId, appleKeyId, appleUrlToReceiveAuthToken, updateIdentities: checkIdentities } =
		useSocialSignIn(newURL, null, null, () => { }, true, false);

	const GoogleIcon = <Icon name="GoogleColor" />;
	const AppleIcon = <Icon name="Apple" width={21} height={24} viewBox="0 0 24 24" />;
	const FacebookIcon = <Icon name="Facebook" css={{ fill: "#4285F4" }} />;

	useEffect(() => {
		setUpdateIdentities((prevState) => !prevState);
	}, [checkIdentities, setUpdateIdentities]);

	return (
		<>
			{googleClientId && (
				<SocialSignOnEditableFieldContainer
					blockClassName={blockClassName}
					socialIcon={GoogleIcon}
					type="Google"
					isConnected={hasGoogle}
					numIdentities={numIdentities}
					onDisconnectFunction={unlinkGoogle}
				/>
			)}
			{facebookAppId && (
				<SocialSignOnEditableFieldContainer
					blockClassName={blockClassName}
					socialIcon={FacebookIcon}
					type="Facebook"
					isConnected={hasFacebook}
					numIdentities={numIdentities}
					onDisconnectFunction={unlinkFacebook}
					updateIdentities={updateIdentities}
				/>
			)}
			{appleTeamId && appleKeyId && appleUrlToReceiveAuthToken && (
				<SocialSignOnEditableFieldContainer
					blockClassName={blockClassName}
					socialIcon={AppleIcon}
					type="Apple"
					isConnected={hasApple}
					numIdentities={numIdentities}
					onDisconnectFunction={unlinkApple}
					onConnectFunction={linkApple}
				/>
			)}
		</>
	);
}

export default SocialEditableSection;
