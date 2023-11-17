import React, { useEffect, useState } from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import getTranslatedPhrases from "fusion:intl";
import { Paragraph, useIdentity } from "@wpmedia/arc-themes-components";
import FormPasswordConfirm from "../../components/form-password-confirm";
import HeadlinedSubmitForm from "../../components/headlined-submit-form";
import passwordValidationMessage from "../../utils/password-validation-message";
import validatePasswordPattern from "../../utils/validate-password-pattern";
import validateURL from "../../utils/validate-redirect-url";

const BLOCK_CLASS_NAME = "b-reset-password";

const defaultSuccessURL = "/account/login/";

export const ResetPasswordPresentation = ({ isAdmin = false, phrases, successActionURL }) => {
	const { Identity, isInitialized } = useIdentity();

	const [error, setError] = useState();
	const [passwordRequirements, setPasswordRequirements] = useState({
		status: "initial",
	});
	const [submitted, setSubmitted] = useState(false);

	// eslint doesn't handle globalThis yet, but this is appropriate
	/* global globalThis */
	const nonce = new URLSearchParams(globalThis.location.search).get("nonce");

	useEffect(() => {
		const getConfig = async () => {
			await Identity.getConfig()
				.then((response) => {
					const { pwLowercase, pwMinLength, pwPwNumbers, pwSpecialCharacters, pwUppercase } =
						response;

					setPasswordRequirements({
						pwLowercase,
						pwMinLength,
						pwPwNumbers,
						pwSpecialCharacters,
						pwUppercase,
						status: "success",
					});
				})
				.catch(() => setPasswordRequirements({ status: "error" }));
		};

		if (Identity) {
			getConfig();
		}
	}, [Identity]);

	const {
		pwLowercase = 0,
		pwMinLength = 0,
		pwPwNumbers = 0,
		pwSpecialCharacters = 0,
		pwUppercase = 0,
		status,
	} = passwordRequirements;

	const passwordErrorMessage = passwordValidationMessage({
		defaultMessage: phrases.t("identity-block.password-requirements"),
		options: {
			lowercase: {
				value: pwLowercase,
				message: phrases.t("identity-block.password-requirements-lowercase", {
					requirementCount: pwLowercase,
				}),
			},
			minLength: {
				value: pwMinLength,
				message: phrases.t("identity-block.password-requirements-characters", {
					requirementCount: pwMinLength,
				}),
			},
			uppercase: {
				value: pwUppercase,
				message: phrases.t("identity-block.password-requirements-uppercase", {
					requirementCount: pwUppercase,
				}),
			},
			numbers: {
				value: pwPwNumbers,
				message: phrases.t("identity-block.password-requirements-numbers", {
					requirementCount: pwPwNumbers,
				}),
			},
			specialCharacters: {
				value: pwSpecialCharacters,
				message: phrases.t("identity-block.password-requirements-uppercase", {
					requirementCount: pwUppercase,
				}),
			},
		},
	});

	if (isAdmin || (isInitialized && nonce)) {
		if (submitted) {
			return (
				<HeadlinedSubmitForm
					headline={phrases.t("identity-block.reset-password-headline-submitted")}
					buttonLabel={phrases.t("identity-block.reset-password-submit-submitted")}
					onSubmit={() => {
						const redirect = validateURL(successActionURL);
						window.location.assign(redirect);
					}}
				>
					<Paragraph>{phrases.t("identity-block.reset-password-instruction-submitted")}</Paragraph>
				</HeadlinedSubmitForm>
			);
		}

		return (
			<HeadlinedSubmitForm
				buttonLabel={phrases.t("identity-block.reset-password-submit")}
				className={BLOCK_CLASS_NAME}
				formErrorText={error}
				headline={phrases.t("identity-block.reset-password-headline")}
				onSubmit={({ newPassword }) => {
					if (!isAdmin) {
						Identity.resetPassword(nonce, newPassword)
							.then(() => {
								setSubmitted(true);
							})
							.catch(() => setError(phrases.t("identity-block.reset-password-error")));
					}
				}}
			>
				<Paragraph>{phrases.t("identity-block.reset-password-instruction")}</Paragraph>
				<FormPasswordConfirm
					autoComplete="new-password"
					name="newPassword"
					label={phrases.t("identity-block.password")}
					validationErrorMessage={status === "success" ? passwordErrorMessage : ""}
					validationPattern={validatePasswordPattern(
						pwLowercase,
						pwMinLength,
						pwPwNumbers,
						pwSpecialCharacters,
						pwUppercase
					)}
					confirmLabel={phrases.t("identity-block.confirm-password")}
					confirmValidationErrorMessage={phrases.t("identity-block.confirm-password-error")}
				/>
			</HeadlinedSubmitForm>
		);
	}
	return null;
};

const ResetPassword = ({ customFields }) => {
	const { successActionURL = defaultSuccessURL } = customFields;
	const { isAdmin, siteProperties } = useFusionContext();
	const { locale } = siteProperties;
	const phrases = getTranslatedPhrases(locale);

	return (
		<ResetPasswordPresentation
			isAdmin={isAdmin}
			phrases={phrases}
			successActionURL={successActionURL}
		/>
	);
};

ResetPassword.label = "Identity Reset Password - Arc Block";

ResetPassword.icon = "redo";

ResetPassword.propTypes = {
	customFields: PropTypes.shape({
		successActionURL: PropTypes.string.tag({
			name: "Successful Action URL",
			defaultValue: "/account/login/",
		}),
	}),
};

export default ResetPassword;
