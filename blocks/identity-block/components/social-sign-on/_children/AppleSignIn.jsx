import React from "react";
import { Button, Icon, useIdentity } from "@wpmedia/arc-themes-components";
import { useFusionContext } from "fusion:context";
import getTranslatedPhrases from "fusion:intl";

import { SIGN_UP } from "../constants";

const AppleIcon = <Icon name="Apple" width={21} height={24} viewBox="0 0 24 24" />;

function AppleSignIn({ socialSignOnIn, className }) {
	const { siteProperties } = useFusionContext();
	const { locale } = siteProperties;
	const phrases = getTranslatedPhrases(locale);
	const { Identity } = useIdentity();

	return (
			<Button
				id="apple-btn"
				variant="secondary-reverse"
				onClick={() => Identity.initAppleSignOn()}
				iconLeft={AppleIcon}
				className={`${className}__Apple`}
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
