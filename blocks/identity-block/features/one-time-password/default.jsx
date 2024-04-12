import React, { useState } from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import { Input, useIdentity } from "@wpmedia/arc-themes-components";
import HeadlinedSubmitForm from "../../components/headlined-submit-form";
import useLogin from "../../components/login";
import useOIDCLogin from "../../utils/useOIDCLogin";
import validateURL from "../../utils/validate-redirect-url";

const BLOCK_CLASS_NAME = "b-one-time-login-form";

const OneTimePasswordLogin = ({ customFields }) => {
	const { redirectURL, redirectToPreviousPage, loggedInPageLocation, OIDC } = customFields;

	let urlString = '';
	let url = '';

	if (typeof window !== "undefined") {
		urlString = window.location.href
		url = new URL(urlString);
	}

	const { isAdmin, arcSite } = useFusionContext();
	const { locale } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);

	const isOIDC = OIDC && url.searchParams.get("client_id") && url.searchParams.get("response_type") === "code";
	const { Identity, isInitialized } = useIdentity();
	const [error, setError] = useState();
	const { loginRedirect } = useLogin({
		isAdmin,
		redirectURL,
		redirectToPreviousPage,
		loggedInPageLocation,
		isOIDC,
	});
	const { loginByOIDC } = useOIDCLogin();

	if (!isInitialized) {
		return null;
	}

	return (
		<HeadlinedSubmitForm
			buttonLabel={phrases.t("identity-block.log-in")}
			className={BLOCK_CLASS_NAME}
			formErrorText={error}
			headline="Request one time log in link"
			onSubmit={({ email, password }) =>
				Identity.login(email, password, {rememberMe: true})
					.then(() => {
						if (isOIDC) {
							loginByOIDC();
						} else {
							const validatedURL = validateURL(loginRedirect);
							window.location = validatedURL;
						}
					})
					.catch(() => setError(phrases.t("identity-block.login-form-error")))
			}
		>
			<p className={`${BLOCK_CLASS_NAME}__ota-sub-headline`}>To sign in without a password, enter your email below and you will receive a one time log in link.</p>
			<Input
				autoComplete="email"
				label={phrases.t("identity-block.email")}
				name="email"
				required
				showDefaultError={false}
				type="email"
				validationErrorMessage={phrases.t("identity-block.email-requirements")}
			/>
			<Input
				autoComplete="current-password"
				label={phrases.t("identity-block.password")}
				name="password"
				required
				showDefaultError={false}
				type="password"
			/>
		</HeadlinedSubmitForm>
	);
};

OneTimePasswordLogin.label = "Identity One Time Password Log In - Arc Block";

OneTimePasswordLogin.propTypes = {
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
				"The URL to which a user would be redirected to if visiting a login page when already logged in.",
		}),
		OIDC: PropTypes.bool.tag({
      name: 'Login with OIDC',
      defaultValue: false,
      description: 'Used when authenticating a third party site with OIDC PKCE flow. This will use an ArcXp Org as an auth provider',
    }),
	}),
};

export default OneTimePasswordLogin;
