import React, { useEffect, useState } from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import { Heading, useIdentity, Paragraph } from "@wpmedia/arc-themes-components";
import { GoogleSignInProvider } from "../../components/social-sign-on/utils/googleContext";
import EmailEditableFieldContainer from "./_children/EmailEditableFieldContainer";
import PasswordEditableFieldContainer from "./_children/PasswordEditableFieldContainer";
import SocialEditableSection from "./_children/SocialEditableSection";

const BLOCK_CLASS_NAME = "b-account-management";

const errorCodes = {
	300044: "identity-block.social-signOn-unlink-error",
	130001: "identity-block.login-form-error.captcha-token-invalid",
	'010122': "identity-block.login-form-error.captcha-token-required",
	0: "identity-block.login-form-error.something-went-wrong",
};

export function definedMessageByCode(code) {
	return errorCodes[code] || errorCodes["0"];
}

export function AccountManagementPresentational({ header, children }) {
	return (
		<div className={`${BLOCK_CLASS_NAME}__section`}>
			<Heading>{header}</Heading>
			{children}
		</div>
	);
}

function AccountManagement({ customFields }) {
	const [loggedIn, setLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [email, setEmail] = useState("");
	const [hasPassword, setHasPassword] = useState();
	const [hasGoogle, setHasGoogle] = useState(false);
	const [hasFacebook, setHasFacebook] = useState(false);
	const [hasApple, setHasApple] = useState(false);
	const [numIdentities, setNumIdentities] = useState();
	const [updateIdentities, setUpdateIdentities] = useState(false);
	const [error, setError] = useState();

	const { redirectURL, showEmail, showPassword, showSocialProfile } = customFields;

	// get properties from context for using translations in intl.json
	// See document for more info https://arcpublishing.atlassian.net/wiki/spaces/TI/pages/2538275032/Lokalise+and+Theme+Blocks
	const { arcSite, isAdmin } = useFusionContext();
	const { locale } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);

	const { isInitialized, Identity } = useIdentity();

	// istanbul ignore next
	useEffect(() => {
		const checkLoggedInStatus = () =>
			Identity.isLoggedIn().then((isLoggedIn) => {
				if (!isLoggedIn) {
					window.location = redirectURL;
					return;
				}
				setLoggedIn(true);
			});
		if (Identity && !isAdmin) {
			checkLoggedInStatus();
		}
	}, [Identity, isAdmin, redirectURL]);

	// istanbul ignore next
	useEffect(() => {
		const getProfile = () =>
			Identity.getUserProfile().then((profileObject) => {
				const { email: loggedInEmail, identities } = profileObject;

				setNumIdentities(identities.length);

				if (loggedInEmail) {
					setEmail(loggedInEmail);
				}

				const passwordProfile = identities.filter(
					({ type }) => type === "Password" || type === "Identity",
				);

				setHasPassword(passwordProfile?.length > 0);
				setHasGoogle(identities.filter(({ type }) => type === "Google").length > 0);
				setHasFacebook(identities.filter(({ type }) => type === "Facebook").length > 0);
				setHasApple(identities.filter(({ type }) => type === "Apple").length > 0);

				setIsLoading(false);
			});

		if (!isAdmin && loggedIn) {
			getProfile();
		}
	}, [loggedIn, setEmail, Identity, isAdmin, updateIdentities]);

	// istanbul ignore next
	const unlinkGoogle = async () => 
		Identity.unlinkSocialIdentity("google").then(() => {
			setUpdateIdentities(!updateIdentities);
			setError();
		}).catch((e) => {
			setError(phrases.t(definedMessageByCode(e.code)));
		});

	// istanbul ignore next
	const unlinkFacebook = () =>
		Identity.unlinkSocialIdentity("facebook")
			.then(() => {
				setUpdateIdentities(!updateIdentities);
				setError();
			})
			.catch((e) => {
				setError(phrases.t(definedMessageByCode(e.code)));
			});

	const linkApple = () => {
		Identity.initAppleSignOn();
	};

	// istanbul ignore next
	const unlinkApple = () =>
		Identity.unlinkSocialIdentity("apple")
			.then(() => {
				setUpdateIdentities(!updateIdentities);
				setError();
			})
			.catch((e) => setError(phrases.t(definedMessageByCode(e.code))));

	if (!isInitialized || (isLoading && !isAdmin)) {
		return null;
	}

	const header = phrases.t("identity-block.account-information");
	const socialProfileHeader = phrases.t("identity-block.connected-accounts");

	// if logged in, return account info
	return (
		<div className={BLOCK_CLASS_NAME}>
			<AccountManagementPresentational header={header}>
				{showEmail && (
					<EmailEditableFieldContainer
						blockClassName={BLOCK_CLASS_NAME}
						email={email}
						setEmail={setEmail}
					/>
				)}
				{showPassword && (
					<PasswordEditableFieldContainer
						blockClassName={BLOCK_CLASS_NAME}
						email={email}
						hasPassword={hasPassword}
						setHasPassword={setHasPassword}
					/>
				)}
			</AccountManagementPresentational>
			{showSocialProfile ? (
				<AccountManagementPresentational header={socialProfileHeader}>
					{error ? (
						<div className={`${BLOCK_CLASS_NAME}__social-signOn-identities-error`}>
							<Paragraph>{error}</Paragraph>
						</div>
					) : null}
					<GoogleSignInProvider>
						<SocialEditableSection
							blockClassName={BLOCK_CLASS_NAME}
							hasFacebook={hasFacebook}
							setHasFacebook={setHasFacebook}
							hasGoogle={hasGoogle}
							hasApple={hasApple}
							hasPasswordAccount={hasPassword}
							unlinkFacebook={unlinkFacebook}
							unlinkGoogle={unlinkGoogle}
							unlinkApple={unlinkApple}
							linkApple={linkApple}
							numIdentities={numIdentities}
							updateIdentities={updateIdentities}
							setUpdateIdentities={setUpdateIdentities}
						/>
					</GoogleSignInProvider>
				</AccountManagementPresentational>
			) : null}
		</div>
	);
}

AccountManagement.label = "Identity Account Management – Arc Block";

AccountManagement.icon = "monitor-user";

AccountManagement.propTypes = {
	customFields: PropTypes.shape({
		redirectURL: PropTypes.string.tag({
			name: "Redirect URL",
			defaultValue: "/account/login/",
		}),
		showEmail: PropTypes.bool.tag({
			// this is to to show or hide the editable input thing and non-editable text
			name: "Enable Email Address Editing",
			defaultValue: false,
		}),
		showPassword: PropTypes.bool.tag({
			// this is to to show or hide the editable input thing and non-editable text
			name: "Enable Password Editing",
			defaultValue: false,
		}),
		showSocialProfile: PropTypes.bool.tag({
			// this is to to show or hide the editable social inputs non-editable text
			name: "Enable Social Profile Editing",
			defaultValue: false,
		}),
	}),
};

export default AccountManagement;
