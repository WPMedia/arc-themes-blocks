import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import getTranslatedPhrases from "fusion:intl";
import { Link, Stack, Button, Paragraph } from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-login-links";
const defaultLoginURL = "/account/login/";
const defaultForgotURL = "/account/forgot-password/";
const defaultSignUpURL = "/account/signup/";

const LoginLinks = ({ customFields }) => {
	const {
		showLogin = false,
		showLoginWithoutPassword = false,
		loginURL = defaultLoginURL,
		loginWithOutPasswordUrl = "/one-time-password/",
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
			{showLoginWithoutPassword && (
				<Button
					href={loginWithOutPasswordUrl}
					className={`${BLOCK_CLASS_NAME}__ota-link`}
					size="large"
					fullWidth
				>
					Log in without password
				</Button>
			)}
			{showLogin ? (
				<Link href={loginURL}>{phrases.t("identity-block.login-links-login")}</Link>
			) : null}
			{showForgot ? (
				<Link href={forgotURL}>{phrases.t("identity-block.login-links-forgot")}</Link>
			) : null}
			{showSignUp ? (
				<Paragraph>{phrases.t("identity-block.login-links-signup")}<Link href={signUpURL} className={`${BLOCK_CLASS_NAME}__inner-link`}>{phrases.t("identity-block.sign-up-natural")}</Link></Paragraph>
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
		showLoginWithoutPassword: PropTypes.bool.tag({
			name: "Show Login without password",
			defaultValue: false,
			group: "Login Without Password",
		}),
		loginWithOutPasswordUrl: PropTypes.string.tag({
			name: "Login without password URL",
			defaultValue: defaultLoginURL,
			group: "Login Without Password",
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
