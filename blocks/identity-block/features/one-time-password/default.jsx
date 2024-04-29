import React, { useState } from "react";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import { Input, useIdentity, BotChallengeProtection, Paragraph, Heading, HeadingSection } from "@wpmedia/arc-themes-components";
import HeadlinedSubmitForm from "../../components/headlined-submit-form";

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
	const [success, setSuccess] = useState(false);
	const [userEmail, setUserEmail] = useState('');

	if (!isInitialized) {
		return null;
	}

	if (success) {
		return (
			<div className={BLOCK_CLASS_NAME}>
				<HeadingSection>
					<Heading>{phrases.t("identity-block.ota-success-heading")}</Heading>
				</HeadingSection>
				<p
					className={`${BLOCK_CLASS_NAME}__ota-sub-headline`}
					dangerouslySetInnerHTML={{__html: phrases.t("identity-block.ota-success-body", { userEmail })}}
				/>
			</div>
		)
	}

	return (
		<div>
			<HeadlinedSubmitForm
				buttonLabel={phrases.t("identity-block.ota-form-button")}
				className={BLOCK_CLASS_NAME}
				formErrorText={error}
				headline={phrases.t("identity-block.ota-headline")}
				onSubmit={({ email }) => {
					setError(null);
					setCaptchaError(null);
					return Identity.requestOTALink({
						email,
						recaptchaToken: captchaToken,
					}).then(() => {
						setUserEmail(email);
						setSuccess(true);
					})
					.catch((e) => {
						setResetRecaptcha(!resetRecaptcha);
						if (e?.code === "130001") {
							setCaptchaError(phrases.t(definedMessageByCode(e.code)));
						} else {
							setError(phrases.t(definedMessageByCode(e.code)));
						}				
					});
				}}
			>
				{error && (
					<div className={`${BLOCK_CLASS_NAME}__login-form-error`}>
						<Paragraph>{error}</Paragraph>
					</div>
				)}

				<p className={`${BLOCK_CLASS_NAME}__ota-sub-headline`}>{phrases.t("identity-block.ota-subheadline")}</p>
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
						challengeIn="magicLink"
						setCaptchaToken={setCaptchaToken}
						captchaError={captchaError}
						setCaptchaError={setCaptchaError}
						resetRecaptcha={resetRecaptcha}
					/>
				</div>
			</HeadlinedSubmitForm>
		</div>
	);
};

OneTimePasswordLogin.label = "Identity One Time Password Request Form - Arc Block";

export default OneTimePasswordLogin;
