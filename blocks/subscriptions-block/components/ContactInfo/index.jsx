import {
	Button,
	BUTTON_SIZES,
	BUTTON_STYLES,
	FIELD_TYPES,
	FormInputField,
	PrimaryFont,
} from "@wpmedia/shared-styles";
import React, { useRef } from "react";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import countryCodes from "./countryCodes";
import GoogleIcon from "./google.svg";
import FacebookIcon from "./facebook.svg";
import "./styles.scss";

const ContactInfo = ({ callback, user, signedInIdentity, logoutCallback }) => {
	const formRef = useRef();
	const entriesRef = useRef({});

	if (user) {
		entriesRef.current.email = user.email ? user.email : "";
		entriesRef.current.firstName = user.firstName ? user.firstName : "";
		entriesRef.current.lastName = user.lastName ? user.lastName : "";
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		const valid = formRef.current.checkValidity();
		if (valid) {
			callback(entriesRef.current);
		}
	};

	const handleInputChange = (name, entry) => {
		entriesRef.current[name] = entry.value;
	};

	const handleLogout = () => {
		logoutCallback();
	};

	const { arcSite } = useFusionContext();
	const phrases = getTranslatedPhrases(getProperties(arcSite).locale || "en");

	const getTranslatedCountries = countryCodes.map((entry) => ({
		code: entry.code,
		name: phrases.t(entry.key),
	}));

	const signOutBtn = (
		<button type="button" className="sign-out-btn" onClick={handleLogout}>
			{phrases.t("checkout-block.identity-sign-out")}
		</button>
	);

	const identityInfo = () => {
		if (user && signedInIdentity) {
			const type = signedInIdentity.type.toLowerCase();
			switch (type) {
				case "google":
					return (
						<div className="identity-row">
							<img
								alt="Google"
								title="Google"
								className="identity-icon"
								src={GoogleIcon}
								data-testid="google-icon"
							/>
							<span>
								{phrases.t("checkout-block.identity-social", {
									email: user.email,
								})}
							</span>
							{signOutBtn}
						</div>
					);
				case "facebook":
					return (
						<div className="identity-row">
							<img
								alt="Facebook"
								title="Facebook"
								className="identity-icon"
								src={FacebookIcon}
								data-testid="facebook-icon"
							/>
							<span>
								{phrases.t("checkout-block.identity-social", {
									email: user.email,
								})}
							</span>
							{signOutBtn}
						</div>
					);
				case "password":
					return (
						<div className="identity-row">
							<span>
								{phrases.t("checkout-block.identity-email", {
									email: user.email,
								})}
							</span>
							{signOutBtn}
						</div>
					);
				default:
					return null;
			}
		}
		return null;
	};

	return (
		<form onSubmit={handleSubmit} ref={formRef} className="xpmedia-subscriptions-contact-info">
			<PrimaryFont as="h2" className="xpmedia-subscriptions-contact-info-title">
				{phrases.t("checkout-block.contact-info")}
			</PrimaryFont>

			<div className="row">
				<div className="col-sm-xl-12">
					<FormInputField
						autoComplete="email"
						label={phrases.t("checkout-block.email")}
						name="email"
						defaultValue={user && user.email ? user.email : ""}
						hidden={!!(user && user.email)}
						required
						onChange={(value) => {
							handleInputChange("email", value);
						}}
						showDefaultError={false}
						type={FIELD_TYPES.EMAIL}
						validationErrorMessage={phrases.t("checkout-block.email-requirements")}
					/>
					{identityInfo()}
				</div>
			</div>
			<div className="row">
				<div className="col-md-xl-6 col-sm-12">
					<FormInputField
						label={phrases.t("checkout-block.first-name")}
						name="firstName"
						defaultValue={user && user.firstName ? user.firstName : ""}
						required
						onChange={(value) => {
							handleInputChange("firstName", value);
						}}
						showDefaultError={false}
						type={FIELD_TYPES.TEXT}
						validationErrorMessage={phrases.t("checkout-block.first-name-requirements")}
					/>
				</div>
				<div className="col-md-xl-6 col-sm-12">
					<FormInputField
						label={phrases.t("checkout-block.last-name")}
						name="lastName"
						defaultValue={user && user.lastName ? user.lastName : ""}
						required
						onChange={(value) => {
							handleInputChange("lastName", value);
						}}
						showDefaultError={false}
						type={FIELD_TYPES.TEXT}
						validationErrorMessage={phrases.t("checkout-block.last-name-requirements")}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-xl-12">
					<FormInputField
						label={phrases.t("checkout-block.country")}
						name="country"
						required
						onChange={(value) => {
							handleInputChange("country", value);
						}}
						options={getTranslatedCountries}
						optionValueKey="code"
						optionLabelKey="name"
						defaultValue=""
						showDefaultError={false}
						type={FIELD_TYPES.SELECT}
						validationErrorMessage={phrases.t("checkout-block.country-requirements")}
					/>
				</div>
			</div>

			<Button
				data-testid="contact-form-submit-btn"
				buttonSize={BUTTON_SIZES.MEDIUM}
				buttonStyle={BUTTON_STYLES.PRIMARY}
				fullWidth
				text={phrases.t("checkout-block.continue-to-checkout")}
				type="submit"
			/>
		</form>
	);
};

export default ContactInfo;
