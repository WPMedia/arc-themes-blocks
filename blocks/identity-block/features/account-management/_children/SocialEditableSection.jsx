import React from "react";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import useSocialSignIn from "../../../components/social-sign-on/utils/useSocialSignIn";
import FacebookSignIn from "../../../components/social-sign-on/_children/FacebookSignIn";
import GoogleSignIn from "../../../components/social-sign-on/_children/GoogleSignIn";
import SocialEditableFieldContainer from "./SocialEditableFieldContainer";

function SocialEditableSection({
	blockClassName,
	hasFacebook,
	hasGoogle,
	hasPasswordAccount,
	unlinkFacebook,
	unlinkGoogle,
}) {
	// get current because social sign in has reload and need to re-render page anyway
	const currentUrl = window.location.href;

	const { facebookAppId, googleClientId } = useSocialSignIn(currentUrl);

	const { arcSite } = useFusionContext();
	const { locale } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);

	const socialText = phrases.t("identity-block.connect-account");
	const disconnectText = phrases.t("identity-block.disconnect-account");
	const facebookConnectText = phrases.t("identity-block.connect-platform", {
		platform: "Facebook",
	});
	const googleConnectText = phrases.t("identity-block.connect-platform", {
		platform: "Google",
	});

	return (
		<>
			{googleClientId ? (
				<div className={`${blockClassName}__social-edit`}>
					<div>
						<GoogleSignIn />
					</div>
					<div>
						<SocialEditableFieldContainer
							onDisconnectFunction={unlinkGoogle}
							text={hasGoogle ? socialText : googleConnectText}
							disconnectText={disconnectText}
							showDisconnectButton={hasGoogle && hasPasswordAccount}
						/>
					</div>
				</div>
			) : null}
			{facebookAppId ? (
				<div className={`${blockClassName}__social-edit`}>
					<div>
						<FacebookSignIn />
					</div>
					<div>
						<SocialEditableFieldContainer
							onDisconnectFunction={unlinkFacebook}
							text={hasFacebook ? socialText : facebookConnectText}
							disconnectText={disconnectText}
							showDisconnectButton={hasFacebook && hasPasswordAccount}
						/>
					</div>
				</div>
			) : null}
		</>
	);
}

export default SocialEditableSection;
