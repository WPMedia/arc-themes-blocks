import React, { useEffect, useState } from "react";
import PropTypes from "@arc-fusion/prop-types";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import { useFusionContext } from "fusion:context";
import { Button, Icon } from "@wpmedia/arc-themes-components";
import useIdentity from "../../components/Identity";
import DropDownLinkListItem from "./_children/DropDownLinkListItem";

const BLOCK_CLASS_NAME = "b-header-account-action";

const HeaderAccountAction = ({ customFields }) => {
	const { createAccountURL, loginURL, logoutURL, manageAccountURL } = customFields;
	const { arcSite } = useFusionContext();

	const { Identity, isInitialized } = useIdentity();
	const { locale } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);

	const [loggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(false);
	const [error, setError] = useState();
	const [isAccountMenuOpen, setAccountMenu] = useState(false);

	useEffect(() => {
		const isLoggedIn = async () => {
			setIsLoggedIn(await Identity.isLoggedIn());
		};

		isLoggedIn();
	}, [Identity]);

	useEffect(() => {
		let isActive = true;

		if (loggedIn) {
			Identity.getUserProfile()
				.then((userProfile) => {
					if (isActive) {
						setUser(userProfile);
					}
				})
				.catch((e) => {
					if (isActive) {
						setError(e);
					}
				});
		}

		// cancel subscription to useEffect
		return () => {
			isActive = false;
			return null;
		};
	}, [Identity, loggedIn]);

	const handleLogout = (e) => {
		if (e.key === "Enter" || e.type === "click") {
			e.preventDefault();
			Identity.logout().then(() => {
				window.location = logoutURL;
			});
		}
	};

	if (!isInitialized) {
		return null;
	}

	// Component is fully client side and will render Sign In link
	// until we can check user's profile, if they are logged in will
	// display their name.
	// Should we display anything on first pass?

	const userIcon = <Icon name="User" />;

	if (user && !error) {
		return (
			<div className={`${BLOCK_CLASS_NAME}`}>
				<div className={`${BLOCK_CLASS_NAME}__desktop-header`}>
					<Button
						aria-expanded={isAccountMenuOpen}
						size="small"
						variant="default"
						iconLeft={userIcon}
						secondaryIconType={isAccountMenuOpen ? "chevron-up" : "chevron-down"}
						onClick={() => setAccountMenu(!isAccountMenuOpen)}
						type="button"
					>
						<span>{phrases.t("identity-block.account")}</span>
					</Button>
				</div>
				<div className={`${BLOCK_CLASS_NAME}__mobile-header`}>
					<Button
						aria-expanded={isAccountMenuOpen}
						size="small"
						variant="default"
						iconLeft={userIcon}
						onClick={() => setAccountMenu(!isAccountMenuOpen)}
						type="button"
					>
						<span>{phrases.t("identity-block.login-options")}</span>
					</Button>
				</div>
				{isAccountMenuOpen && (
					<ul className={`${BLOCK_CLASS_NAME}__dropdown-open`}>
						<DropDownLinkListItem
							href={manageAccountURL}
							text={phrases.t("identity-block.manage-account")}
							blockClassName={BLOCK_CLASS_NAME}
						/>
						<DropDownLinkListItem
							href={logoutURL}
							onClick={handleLogout}
							text={phrases.t("identity-block.log-out")}
							blockClassName={BLOCK_CLASS_NAME}
						/>
					</ul>
				)}
			</div>
		);
	}

	// What do we want to happen if there is an error?
	return (
		<>
			<div className={`${BLOCK_CLASS_NAME}__desktop-header`}>
				{createAccountURL ? (
					<Button
						// should be an a tag if it's a link
						as="a"
						size="small"
						variant="primary"
						type="button"
						href={createAccountURL}
					>
						<span>{phrases.t("identity-block.sign-up")}</span>
					</Button>
				) : null}
				{loginURL ? (
					<Button size="small" variant="default" type="button" href={loginURL} iconLeft={userIcon}>
						<span>{phrases.t("identity-block.log-in")}</span>
					</Button>
				) : null}
			</div>
			<div className={`${BLOCK_CLASS_NAME}__mobile-header`}>
				<Button
					aria-expanded={isAccountMenuOpen}
					size="small"
					variant="default"
					iconType="user"
					onClick={() => setAccountMenu(!isAccountMenuOpen)}
					type="button"
				>
					<span>{phrases.t("identity-block.login-options")}</span>
				</Button>
				{isAccountMenuOpen && (
					<ul className={`${BLOCK_CLASS_NAME}__dropdown-open`}>
						{createAccountURL ? (
							<DropDownLinkListItem
								href={createAccountURL}
								text={phrases.t("identity-block.sign-up")}
							/>
						) : null}
						{loginURL ? (
							<DropDownLinkListItem href={loginURL} text={phrases.t("identity-block.log-in")} />
						) : null}
					</ul>
				)}
			</div>
		</>
	);
};

HeaderAccountAction.propTypes = {
	customFields: PropTypes.shape({
		loginURL: PropTypes.string.tag({
			defaultValue: "/account/login/",
			label: "Log In URL",
		}),
		createAccountURL: PropTypes.string.tag({
			defaultValue: "/account/signup/",
			label: "Sign Up URL",
		}),
		logoutURL: PropTypes.string.tag({
			defaultValue: "/",
			label: "Log Out URL",
			description:
				"The URL to which a user would be redirected to after clicking Log Out from the navigation.",
		}),
		manageAccountURL: PropTypes.string.tag({
			defaultValue: "/account/",
			label: "Manage Account URL",
		}),
	}),
};

HeaderAccountAction.label = "Identity Header Account – Arc Block";

export default HeaderAccountAction;
