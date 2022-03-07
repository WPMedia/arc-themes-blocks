import React, { useState } from "react";

import { FIELD_TYPES, FormInputField, PrimaryFont } from "@wpmedia/shared-styles";

import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";

import HeadlinedSubmitForm from "../../components/HeadlinedSubmitForm";
import useIdentity from "../../components/Identity";
import "./styles.scss";

const ForgotPassword = () => {
	const { arcSite } = useFusionContext();
	const { locale } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);

	const { Identity, isInitialized } = useIdentity();
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState();

	if (submitted) {
		return (
			<section>
				<PrimaryFont as="h2" className="xpmedia-forgot-password-headline">
					{phrases.t("identity-block.forgot-password-headline-submitted")}
				</PrimaryFont>
				<PrimaryFont className="xpmedia-forgot-password-instruction">
					{phrases.t("identity-block.forgot-password-instruction-submitted")}
				</PrimaryFont>
			</section>
		);
	}

	return isInitialized ? (
		<HeadlinedSubmitForm
			headline={phrases.t("identity-block.forgot-password-headline")}
			buttonLabel={phrases.t("identity-block.forgot-password-submit")}
			onSubmit={({ email }) =>
				Identity.requestResetPassword(email)
					.then(() => {
						setSubmitted(true);
					})
					.catch(() => setError(phrases.t("identity-block.forgot-password-error")))
			}
			formErrorText={error}
		>
			<PrimaryFont className="xpmedia-forgot-password-instruction">
				{phrases.t("identity-block.forgot-password-instruction")}
			</PrimaryFont>
			<FormInputField
				autoComplete="email"
				label={phrases.t("identity-block.email")}
				name="email"
				required
				showDefaultError={false}
				type={FIELD_TYPES.EMAIL}
				validationErrorMessage={phrases.t("identity-block.email-requirements")}
			/>
		</HeadlinedSubmitForm>
	) : null;
};

ForgotPassword.label = "Identity Forgot Password - Arc Block";

ForgotPassword.icon = "user-question";

export default ForgotPassword;
