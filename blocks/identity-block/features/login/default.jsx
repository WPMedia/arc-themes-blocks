import React, { useState, useEffect } from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import { Input, useIdentity, Paragraph, Button } from "@wpmedia/arc-themes-components";
import HeadlinedSubmitForm from "../../components/headlined-submit-form";
import useLogin from "../../components/login";
import BotChallengeProtection from "../../components/bot-challenge-protection";
import useOIDCLogin from "../../utils/useOIDCLogin";
import validateURL from "../../utils/validate-redirect-url";

const BLOCK_CLASS_NAME = "b-login-form";

const Login = ({ customFields }) => {
	const { redirectURL, redirectToPreviousPage, loggedInPageLocation, OIDC, signUpURL } = customFields;

	const url_string = window.location.href;
	const url = new URL(url_string);

	const { isAdmin, arcSite } = useFusionContext();
	const { locale } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);

	const isOIDC = OIDC && url.searchParams.get("client_id") && url.searchParams.get("response_type") === "code";
	const { Identity, isInitialized } = useIdentity();
	const [captchaToken, setCaptchaToken] = useState();
	const [error, setError] = useState();
	const { loginRedirect } = useLogin({
		isAdmin,
		redirectURL,
		redirectToPreviousPage,
		loggedInPageLocation,
		isOIDC,
	});
	const { loginByOIDC } = useOIDCLogin();

	const redirectToSignUp = () => {
		if(signUpURL){
			window.location = signUpURL;
		}
	}

	if (!isInitialized) {
		return null;
	}

	return (
		<>
			<HeadlinedSubmitForm
				buttonLabel={phrases.t("identity-block.log-in")}
				className={BLOCK_CLASS_NAME}
				formErrorText={error}
				headline={phrases.t("identity-block.log-in-headline")}
				onSubmit={({ email, password }) =>
					Identity.login(email, password, {
						rememberMe: true,
						recaptchaToken: captchaToken
					})
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
				<Input
					autoComplete="email"
					label={phrases.t("identity-block.email-label")}
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
				<BotChallengeProtection className={BLOCK_CLASS_NAME} challengeIn={"signin"} setCaptchaToken={setCaptchaToken}/>
				<Paragraph className={`${BLOCK_CLASS_NAME}__privacy-statement`}>{phrases.t("identity-block.privacy-statement")}</Paragraph>
			</HeadlinedSubmitForm>
			<div className={`${BLOCK_CLASS_NAME}__sign-up-div`}>
				<Paragraph>Need to create an account? <button onClick={redirectToSignUp} className={`${BLOCK_CLASS_NAME}__sign-up-button`}>{phrases.t("identity-block.sign-up")}</button></Paragraph>
			</div>
		</>
	);
};

Login.label = "Identity Log In - Arc Block";

Login.propTypes = {
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
		signUpURL: PropTypes.string.tag({
			name: "Sign up URL",
			defaultValue: "/signup/",
			description:
				"The URL to which a user would be redirected to if the user clicks on the sign up button",
		}),
		OIDC: PropTypes.bool.tag({
      name: 'Login with OIDC',
      defaultValue: false,
      description: 'Used when authenticating a third party site with OIDC PKCE flow. This will use an ArcXp Org as an auth provider',
    }),
	}),
};

export default Login;
