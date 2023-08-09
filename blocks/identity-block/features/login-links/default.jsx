import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import getTranslatedPhrases from "fusion:intl";
import { Link, Stack } from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-login-links";
const defaultLoginURL = "/account/login/";
const defaultForgotURL = "/account/forgot-password/";
const defaultSignUpURL = "/account/signup/";

const LoginLinks = ({ customFields }) => {
	const {
		showLogin = false,
		loginURL = defaultLoginURL,
		showForgot = false,
		forgotURL = defaultForgotURL,
		showSignUp = false,
		signUpURL = defaultSignUpURL,
	} = customFields;
	const { siteProperties } = useFusionContext();
	const { locale } = siteProperties;
	const phrases = getTranslatedPhrases(locale);

	if (!showLogin && !showForgot && !showSignUp) {
		return null;
	}

	return (
		<Stack as="div" className={BLOCK_CLASS_NAME}>
			{showLogin ? (
				<Link href={loginURL}>{phrases.t("identity-block.login-links-login")}</Link>
			) : null}
			{showForgot ? (
				<Link href={forgotURL}>{phrases.t("identity-block.login-links-forgot")}</Link>
			) : null}
			{showSignUp ? (
				<Link href={signUpURL}>{phrases.t("identity-block.login-links-signup")}</Link>
			) : null}
		</Stack>
	);
};

LoginLinks.label = "Identity Login Links - Arc Block";

LoginLinks.icon = "laptop-help-message";

LoginLinks.propTypes = {
	customFields: PropTypes.shape({
		showLogin: PropTypes.bool.tag({
			name: "Show Login link",
			defaultValue: false,
			group: "Login",
		}),
		loginURL: PropTypes.string.tag({
			name: "Login URL",
			defaultValue: defaultLoginURL,
			group: "Login",
		}),
		showForgot: PropTypes.bool.tag({
			name: "Show Forgot Password link",
			defaultValue: false,
			group: "Forgot Password",
		}),
		forgotURL: PropTypes.string.tag({
			name: "Forgot Password URL",
			defaultValue: defaultForgotURL,
			group: "Forgot Password",
		}),
		showSignUp: PropTypes.bool.tag({
			name: "Show Sign up link",
			defaultValue: false,
			group: "Sign Up",
		}),
		signUpURL: PropTypes.string.tag({
			name: "Sign Up URL",
			defaultValue: defaultSignUpURL,
			group: "Sign Up",
		}),
	}),
};

export default LoginLinks;
