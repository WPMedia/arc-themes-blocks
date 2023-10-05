import React, { useEffect, useState } from "react";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import { Input } from "@wpmedia/arc-themes-components";
import useIdentity from "../../../components/identity";
import EditableFieldPresentational from "../../../components/editable-form-input";
import FormPasswordConfirm from "../../../components/form-password-confirm";
import passwordValidationMessage from "../../../utils/password-validation-message";
import validatePasswordPattern from "../../../utils/validate-password-pattern";

function PasswordEditableFieldContainer({ blockClassName, email, hasPassword, setHasPassword }) {
	const [error, setError] = useState(false);
	const [passwordRequirements, setPasswordRequirements] = useState({});
	const [configStatus, setConfigStatus] = useState("loading");

	const { arcSite } = useFusionContext();
	const { locale } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);

	const { Identity } = useIdentity();

	useEffect(() => {
		const getConfigInfo = () =>
			Identity.getConfig()
				.then((response) => {
					setPasswordRequirements(response);
					setConfigStatus("success");
				})
				.catch(() => setConfigStatus("error"));

		if (Identity) {
			getConfigInfo();
		}
	}, [setPasswordRequirements, Identity]);

	const {
		pwLowercase = 0,
		pwMinLength = 0,
		pwPwNumbers = 0,
		pwSpecialCharacters = 0,
		pwUppercase = 0,
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

	const handlePasswordUpdate = ({ "current-password": oldPassword, password: newPassword }) => {
		if (hasPassword) {
			return Identity.updatePassword(oldPassword, newPassword)
				.then(() => {
					setError(false);
				})
				.catch(() => {
					setError(phrases.t("identity-block.update-password-error"));
					throw new Error();
				});
		}

		return Identity.signUp({ userName: email, credentials: newPassword }, { email })
			.then(() => {
				setHasPassword(true);
				setError(false);
			})
			.catch(() => setError(phrases.t("identity-block.sign-up-form-error")));
	};

	const handleCancelEdit = () => {
		setError(false);
	};

	const passwordValue = hasPassword
		? phrases.t("identity-block.password-placeholder")
		: phrases.t("identity-block.add-password");

	return (
		<EditableFieldPresentational
			className={`${blockClassName}__edit`}
			initialValue={passwordValue}
			label={phrases.t("identity-block.password")}
			editText={phrases.t("identity-block.edit")}
			onSubmit={handlePasswordUpdate}
			formErrorText={error}
			cancelEdit={handleCancelEdit}
			saveText={phrases.t("identity-block.save")}
			cancelText={phrases.t("identity-block.cancel")}
		>
			{hasPassword ? (
				<>
					<Input
						type="password"
						label={phrases.t("identity-block.current-password")}
						showDefaultError={false}
						required
						autoComplete="current-password"
						name="current-password"
						validationErrorMessage={phrases.t("identity-block.password-requirements")}
					/>
					<FormPasswordConfirm
						autoComplete="new-password"
						name="password"
						label={phrases.t("identity-block.new-password")}
						validationErrorMessage={configStatus === "success" ? passwordErrorMessage : ""}
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
				</>
			) : (
				<FormPasswordConfirm
					autoComplete="new-password"
					name="password"
					label={phrases.t("identity-block.new-password")}
					validationErrorMessage={configStatus === "success" ? passwordErrorMessage : ""}
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
			)}
		</EditableFieldPresentational>
	);
}

export default PasswordEditableFieldContainer;
