import React, { useState } from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import { Paragraph, useIdentity } from "@wpmedia/arc-themes-components";
import SocialSignOn from "../../components/social-sign-on";
import useLogin from "../../components/login";
import { GoogleSignInProvider } from "../../components/social-sign-on/utils/googleContext";

const BLOCK_CLASS_NAME = "b-social-sign-on";

const SocialSignOnBlock = ({ customFields }) => {
	const { redirectURL, redirectToPreviousPage, loggedInPageLocation } = customFields;

	const { isAdmin, arcSite } = useFusionContext();
	const { locale } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);

	const { isInitialized } = useIdentity();

	const [error, setError] = useState();

	const { loginRedirect } = useLogin({
		isAdmin,
		redirectURL,
		redirectToPreviousPage,
		loggedInPageLocation,
	});

	if (!isInitialized) {
		return null;
	}

	return (
		<section className={BLOCK_CLASS_NAME} data-testid="social-sign-on-container">
			<GoogleSignInProvider>
				<SocialSignOn
					className={`${BLOCK_CLASS_NAME}__button-container`}
					onError={() => {
						setError(phrases.t("identity-block.login-form-error"));
					}}
					redirectURL={loginRedirect}
				/>
			</GoogleSignInProvider>
			{error ? (
				<section role="alert">
					<Paragraph>{error}</Paragraph>
				</section>
			) : null}
		</section>
	);
};

SocialSignOnBlock.label = "Identity Social Sign On - Arc Block";

SocialSignOnBlock.propTypes = {
	customFields: PropTypes.shape({
		redirectURL: PropTypes.string.tag({
			name: "Redirect URL",
			defaultValue: "/account/",
		}),
		redirectToPreviousPage: PropTypes.bool.tag({
			name: "Redirect to previous page",
			defaultValue: true,
			description:
				"Do you wish for the user to be redirected to the page they entered from before logging in? This overrides redirect URL",
		}),
		loggedInPageLocation: PropTypes.string.tag({
			name: "Logged In URL",
			defaultValue: "/account/",
			description:
				"The URL to which a user would be redirected to if logged in an vist a page with the login form on",
		}),
	}),
};

export default SocialSignOnBlock;
