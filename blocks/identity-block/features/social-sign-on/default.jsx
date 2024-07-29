import React, { useState } from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import { Paragraph, useIdentity, Stack } from "@wpmedia/arc-themes-components";
import SocialSignOn from "../../components/social-sign-on";
import useLogin from "../../components/login";
import { GoogleSignInProvider } from "../../components/social-sign-on/utils/googleContext";

const BLOCK_CLASS_NAME = "b-social-sign-on";

const SocialSignOnBlock = ({ customFields }) => {
	const {
		redirectURL,
		redirectToPreviousPage,
		loggedInPageLocation,
		OIDC,
		socialSignOnIn,
		hideDiv,
	} = customFields;

	const checkAppleCodeExists = (url) => {
		const urlQueryParams = url.split("?");
		if (urlQueryParams.length) {
			const charsAfterLastQuestionMark = urlQueryParams[urlQueryParams.length - 1];
			const queryParams = new URLSearchParams(charsAfterLastQuestionMark);
			const appleCode = queryParams.get("code");
			return appleCode;
		}
		return null;
	};

	const urlString = window.location.href;
	const url = new URL(urlString);
	const isOIDC =
		OIDC && url.searchParams.get("client_id") && url.searchParams.get("response_type") === "code";

	const appleCode = checkAppleCodeExists(urlString);
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
		isOIDC,
		appleCode,
	});

	if (!isInitialized) {
		return null;
	}

	return (
		<Stack className={BLOCK_CLASS_NAME} data-testid="social-sign-on-container">
			{!hideDiv ? <div className={`${BLOCK_CLASS_NAME}__dividerWithText`}>{phrases.t("identity-block.or")}</div> : null}
			<GoogleSignInProvider>
				<SocialSignOn
					className={`${BLOCK_CLASS_NAME}__button-container`}
					onError={() => {
						setError(phrases.t("identity-block.login-form-error"));
					}}
					redirectURL={loginRedirect}
					isOIDC={isOIDC}
					socialSignOnIn={socialSignOnIn}
				/>
			</GoogleSignInProvider>
			{error ? (
				<section role="alert">
					<Paragraph>{error}</Paragraph>
				</section>
			) : null}
		</Stack>
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
		OIDC: PropTypes.bool.tag({
			name: "Login with OIDC",
			defaultValue: false,
			description:
				"Used when authenticating a third party site with OIDC PKCE flow. This will use an ArcXp Org as an auth provider",
		}),
		socialSignOnIn: PropTypes.oneOf(["Login", "SignUp"]).tag({
			defaultValue: "Login",
			description: "Social Sign on component to be rendered on Login or Sign Up form.",
			label: "Social Sign On In",
		}),
		hideDiv: PropTypes.bool.tag({
			name: "Hide divider",
			defaultValue: false,
			description:
				"Used when we want to hide the ---OR--- divider",
		})
	}),
};

export default SocialSignOnBlock;
