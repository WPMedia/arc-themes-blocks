import React, { useRef } from "react";

import { usePhrases, Heading, Input, Button, Stack, Image } from "@wpmedia/arc-themes-components";

import GoogleIcon from "./google.svg";
import FacebookIcon from "./facebook.svg";

const ContactInfo = ({ callback, user, signedInIdentity, logoutCallback, className }) => {
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

	const phrases = usePhrases();

	// TO-DO: Uncomment once Select component is done
	// const getTranslatedCountries = countryCodes.map((entry) => ({
	// 	code: entry.code,
	// 	name: phrases.t(entry.key),
	// }));

	const signOutBtn = (
		<Button variant="secondary" size="medium" onClick={handleLogout}>
			{phrases.t("checkout-block.identity-sign-out")}
		</Button>
	);

	const identityInfo = () => {
		if (user && signedInIdentity) {
			const type = signedInIdentity.type.toLowerCase();
			switch (type) {
				case "google":
					return (
						<div className={`${className}__identity-row`}>
							<Image alt="Google" title="Google" src={GoogleIcon} />
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
						<div className={`${className}__identity-row`}>
							<Image alt="Facebook" title="Facebook" src={FacebookIcon} />
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
						<div className={`${className}__identity-row`}>
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
		<form onSubmit={handleSubmit} ref={formRef} className={`${className}__contact-info`}>
			<Heading>{phrases.t("checkout-block.contact-info")}</Heading>
			<Stack>
				<Input
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
					type="email"
					validationErrorMessage={phrases.t("checkout-block.email-requirements")}
				/>
				{identityInfo()}
			</Stack>
			<div className={`${className}__contact-info-profile`}>
				<Input
					label={phrases.t("checkout-block.first-name")}
					name="firstName"
					defaultValue={user && user.firstName ? user.firstName : ""}
					required
					onChange={(value) => {
						handleInputChange("firstName", value);
					}}
					showDefaultError={false}
					type="text"
					validationErrorMessage={phrases.t("checkout-block.first-name-requirements")}
				/>
				<Input
					label={phrases.t("checkout-block.last-name")}
					name="lastName"
					defaultValue={user && user.lastName ? user.lastName : ""}
					required
					onChange={(value) => {
						handleInputChange("lastName", value);
					}}
					showDefaultError={false}
					type="text"
					validationErrorMessage={phrases.t("checkout-block.last-name-requirements")}
				/>
			</div>
			<Input
				label={phrases.t("checkout-block.country")}
				name="country"
				required
				onChange={(value) => {
					handleInputChange("country", value);
				}}
				showDefaultError={false}
				type="text"
				validationErrorMessage={phrases.t("checkout-block.country-requirements")}
			/>
			<Button size="medium" variant="primary" fullWidth type="submit">
				<span>{phrases.t("checkout-block.continue-to-checkout")}</span>
			</Button>
		</form>
	);
};

export default ContactInfo;