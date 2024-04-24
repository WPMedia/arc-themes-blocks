/* global grecaptcha */
import React, { useState } from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import { Input, useIdentity, BotChallengeProtection, Paragraph, Heading, HeadingSection } from "@wpmedia/arc-themes-components";
import HeadlinedSubmitForm from "../../components/headlined-submit-form";
import { RECAPTCHA_MAGICLINK } from "../../utils/useRecaptcha";

const BLOCK_CLASS_NAME = "b-one-time-login-form";

const errorCodes = {
	100015: "identity-block.login-form-error.account-is-disabled",
	130001: "identity-block.login-form-error.captcha-token-invalid",
	130051: "identity-block.login-form-error.unverified-email-address",
	100013: "identity-block.login-form-error.max-devices",
	0: "identity-block.login-form-error.invalid-email-password",
};

const definedMessageByCode = (code) => errorCodes[code] || errorCodes["0"];

const OneTimePasswordLogin = () => {
	const { arcSite } = useFusionContext();
	const { locale } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);
	const { Identity, isInitialized } = useIdentity();
	const [captchaToken, setCaptchaToken] = useState();
	const [resetRecaptcha, setResetRecaptcha] = useState(true);
	const [error, setError] = useState();
	const [captchaError, setCaptchaError] = useState();
	const [success, setSuccess] = useState(true);
	const [userEmail, setUserEmail] = useState('google@gmail.com');

	if (!isInitialized) {
		return null;
	}

	return (
		<div>
			{success ? (
				<div className={BLOCK_CLASS_NAME}>
					<HeadingSection>
						<Heading>Check Your Email</Heading>
					</HeadingSection>
					<p className={`${BLOCK_CLASS_NAME}__ota-sub-headline`}>If there’s an account associated with <b>{userEmail}</b>, you’ll get a link in your inbox that will automatically sign you in to your account. The link will expire in 24 hours.</p>
				</div>
			) : (
				<HeadlinedSubmitForm
					buttonLabel="Send log in link"
					className={BLOCK_CLASS_NAME}
					formErrorText={error}
					headline="Request one time log in link"
					onSubmit={({ email }) => {
						setError(null);
						setCaptchaError(null);

						return Identity.requestOTALink({
							email,
							recaptchaToken: captchaToken,
						}).then(() => {
							if (isOIDC) {
								loginByOIDC();
							} else {
								const validatedURL = validateURL(loginRedirect);
								window.location = validatedURL;
							}
						})
						.catch((e) => {
							setResetRecaptcha(!resetRecaptcha);
							if (e?.code === "130001") {
								setCaptchaError(true);
							}
							else {
								setError(phrases.t(definedMessageByCode(e.code)));
							}
							if (grecaptcha) {
								grecaptcha.reset();
							}						
						});
					}}
				>
					{error && (
						<div className={`${BLOCK_CLASS_NAME}__login-form-error`}>
							<Paragraph>{error}</Paragraph>
						</div>
					)}

					<p className={`${BLOCK_CLASS_NAME}__ota-sub-headline`}>To sign in without a password, enter your email below and you will receive a one time log in link.</p>
					<Input
						autoComplete="email"
						label={phrases.t("identity-block.email-label")}
						name="email"
						required
						showDefaultError={false}
						type="email"
						validationErrorMessage={phrases.t("identity-block.email-requirements")}
					/>

					<div className={`${BLOCK_CLASS_NAME}__recaptcha`}>
						<BotChallengeProtection
							className={BLOCK_CLASS_NAME}
							challengeIn={RECAPTCHA_MAGICLINK}
							setCaptchaToken={setCaptchaToken}
							captchaError={captchaError}
							setCaptchaError={setCaptchaError}
							resetRecaptcha={resetRecaptcha}
						/>
					</div>
				</HeadlinedSubmitForm>
			)}
		</div>
	);
};

OneTimePasswordLogin.label = "Identity One Time Password Request Form - Arc Block";

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
