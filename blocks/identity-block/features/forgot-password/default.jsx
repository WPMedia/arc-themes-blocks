import React, { useState } from "react";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import { Heading, Input, Paragraph } from "@wpmedia/arc-themes-components";
import HeadlinedSubmitForm from "../../components/headlined-submit-form";
import useIdentity from "../../components/identity";

const BLOCK_CLASS_NAME = "b-forgot-password";

const ForgotPassword = () => {
	const { arcSite } = useFusionContext();
	const { locale } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);

	const { Identity, isInitialized } = useIdentity();
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState();

	if (submitted) {
		return (
			<section className={BLOCK_CLASS_NAME}>
				<Heading>{phrases.t("identity-block.forgot-password-headline-submitted")}</Heading>
				<Paragraph>{phrases.t("identity-block.forgot-password-instruction-submitted")}</Paragraph>
			</section>
		);
	}

	return isInitialized ? (
		<HeadlinedSubmitForm
			buttonLabel={phrases.t("identity-block.forgot-password-submit")}
			className={BLOCK_CLASS_NAME}
			formErrorText={error}
			headline={phrases.t("identity-block.forgot-password-headline")}
			onSubmit={({ email }) =>
				Identity.requestResetPassword(email)
					.then(() => {
						setSubmitted(true);
					})
					.catch(() => setError(phrases.t("identity-block.forgot-password-error")))
			}
		>
			<Paragraph>{phrases.t("identity-block.forgot-password-instruction")}</Paragraph>
			<Input
				autoComplete="email"
				label={phrases.t("identity-block.email")}
				name="email"
				required
				showDefaultError={false}
				type="email"
				validationErrorMessage={phrases.t("identity-block.email-requirements")}
			/>
		</HeadlinedSubmitForm>
	) : null;
};

ForgotPassword.label = "Identity Forgot Password - Arc Block";

ForgotPassword.icon = "user-question";

export default ForgotPassword;
