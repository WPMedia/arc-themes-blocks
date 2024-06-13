import React, { useEffect, useState } from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import {
	Button,
	Input,
	useIdentity,
	BotChallengeProtection,
	Heading,
	Paragraph,
	HeadingSection,
} from "@wpmedia/arc-themes-components";

import HeadlinedSubmitForm from "../../components/headlined-submit-form";
import validateURL from "../../utils/validate-redirect-url";

const BLOCK_CLASS_NAME = "b-one-time-login-form";
const OTA_NONCE = 'ota_nonce';

const errorCodes = {
	130001: "identity-block.login-form-error.captcha-token-invalid",
	0: "identity-block.login-form-error.something-went-wrong",
};

const definedMessageByCode = (code) => errorCodes[code] || errorCodes["0"];

const OneTimePasswordLogin = ({ customFields }) => {
	const { loggedInPageLocation } = customFields;

	const { arcSite, contextPath } = useFusionContext();
	const { locale } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);
	const { Identity, isInitialized } = useIdentity();
	const [captchaToken, setCaptchaToken] = useState();
	const [resetRecaptcha, setResetRecaptcha] = useState(true);
	const [error, setError] = useState();
	const [captchaError, setCaptchaError] = useState();
	const [success, setSuccess] = useState(false);
	const [successRedeem, setSuccessRedeem] = useState(true);
	const [userEmail, setUserEmail] = useState("");

	const url = new URL(window.location.href);
	const params = new URLSearchParams(url.search);
	const otaNonce = params.get(OTA_NONCE);

	useEffect(() => {
		if (otaNonce) {
			Identity.redeemOTALink(otaNonce)
				.then(() => {
					const validatedURL = validateURL(loggedInPageLocation, contextPath);
					window.location.href = validatedURL;
				})
				.catch(() => {
					setSuccessRedeem(false);
				});
		}
	}, [otaNonce, Identity, loggedInPageLocation, phrases, contextPath]);

	if (!isInitialized) {
		return null;
	}

	if (!successRedeem) {
		return (
			<div className={BLOCK_CLASS_NAME}>
				<HeadingSection>
					<Heading>{phrases.t("identity-block.ota-ivalid-login-link")}</Heading>
				</HeadingSection>
				<p className={`${BLOCK_CLASS_NAME}__ota-sub-headline`}>
					{phrases.t("identity-block.ota-ivalid-login-link-subheadline")}
				</p>
				<Button
					size="large"
					variant="primary"
					fullWidth
					type="button"
					onClick={() => {
						params.delete(OTA_NONCE, otaNonce);
						const newUrl = `${url.origin}${url.contextPath}?${params.toString()}`;
						window.location.href = newUrl;
					}}
				>
					<span>{phrases.t("identity-block.ota-get-new-link")}</span>
				</Button>
			</div>
		);
	}

	if (success) {
		return (
			<div className={BLOCK_CLASS_NAME}>
				<HeadingSection>
					<Heading>{phrases.t("identity-block.ota-success-heading")}</Heading>
				</HeadingSection>
				<p
					className={`${BLOCK_CLASS_NAME}__ota-sub-headline`}
					dangerouslySetInnerHTML={{
						__html: phrases.t("identity-block.ota-success-body", { userEmail }),
					}}
				/>
			</div>
		);
	}

	return (
		<div>
			<HeadlinedSubmitForm
				buttonLabel={phrases.t("identity-block.ota-form-button")}
				className={BLOCK_CLASS_NAME}
				headline={phrases.t("identity-block.ota-headline")}
				onSubmit={({ email }) => {
					setError(null);
					setCaptchaError(null);
					return Identity.requestOTALink(email, captchaToken)
						.then(() => {
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
				<p className={`${BLOCK_CLASS_NAME}__ota-sub-headline`}>
					{phrases.t("identity-block.ota-subheadline")}
				</p>
				{error ? (
					<div className={`${BLOCK_CLASS_NAME}__ota-form-error`}>
						<Paragraph>{error}</Paragraph>
					</div>
				) : null}
				<Input
					autoComplete="email"
					label={phrases.t("identity-block.email-label")}
					name="email"
					placeholder={phrases.t("identity-block.ota-input-placeholder")}
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

OneTimePasswordLogin.propTypes = {
	customFields: PropTypes.shape({
		loggedInPageLocation: PropTypes.string.tag({
			name: "Logged In URL",
			defaultValue: "/account/",
			description:
				"The URL to which a user would be redirected to if visiting a login page when already logged in.",
		}),
	}),
};

export default OneTimePasswordLogin;
