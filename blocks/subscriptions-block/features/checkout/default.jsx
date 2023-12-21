import React, { useEffect, useState } from "react";

import PropTypes from "@arc-fusion/prop-types";
import { usePhrases, Heading, Link, useIdentity } from "@wpmedia/arc-themes-components";
import Cart from "../../components/Cart";
import ContactInfo from "../../components/ContactInfo";
import PaymentInfo from "./_children/PaymentInfo";

export const LABEL_ORDER_NUMBER_PAYPAL = "ArcSubs_OrderNumber"
const BLOCK_CLASS_NAME = "b-checkout";

const Checkout = ({ customFields }) => {
	const { offerURL, successURL, loginURL, stripeIntentsID } = customFields;

	const [loggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(false);
	const [signedInIdentity, setSignedInIdentity] = useState(false);
	const [showPaymentScreen, setShowPaymentScreen] = useState(false);
	const [userInfo, setUserInfo] = useState({});

	const { Identity, getSignedInIdentity } = useIdentity();
	const phrases = usePhrases();

	const [isInitialized, setIsInitialized] = useState(false);

	const params = new URLSearchParams(window.location.search);
	const token = params.get("token");

	useEffect(() => {
		const isOrderNumberInLocalStorage = localStorage.getItem(LABEL_ORDER_NUMBER_PAYPAL);
		if (isOrderNumberInLocalStorage && token) {
			setIsInitialized(true);
		}
	}, []);

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
						setSignedInIdentity(getSignedInIdentity(userProfile));
					}
				})
				.catch(() => {
					setUser(false);
				});
		}

		// cancel subscription to useEffect
		return () => {
			isActive = false;
			return null;
		};
	}, [Identity, loggedIn]);

	const logoutCallback = () => {
		Identity.logout().then(() => {
			setUser(false);
		});
	};

	const setUserInfoAndShowPaymentScreen = async (userInfo) => {
		const { firstName, lastName } = userInfo;
		setUserInfo(userInfo);
		if (user) {
			Identity.updateUserProfile({ firstName, lastName });
		}
		setShowPaymentScreen(true);
	};

	return (
		<section className={BLOCK_CLASS_NAME}>
			<Heading>{phrases.t("checkout-block.headline")}</Heading>
			<Link href={offerURL}>{phrases.t("checkout-block.back-to-offer-page")}</Link>

			<Cart offerURL={offerURL} className={BLOCK_CLASS_NAME} />

			{!showPaymentScreen && !isInitialized ? (
				<ContactInfo
					callback={setUserInfoAndShowPaymentScreen}
					user={user}
					signedInIdentity={signedInIdentity}
					logoutCallback={logoutCallback}
					className={BLOCK_CLASS_NAME}
				/>
			) : (
				<PaymentInfo
					successURL={successURL}
					className={BLOCK_CLASS_NAME}
					userInfo={userInfo}
					offerURL={offerURL}
					stripeIntentsID={stripeIntentsID}
					isInitialized = {isInitialized}
					loginURL = {loginURL}
				/>
			)}
		</section>
	);
};
Checkout.propTypes = {
	customFields: PropTypes.shape({
		loginURL: PropTypes.string.tag({
			defaultValue: "/account/login/",
			label: "Login URL",
		}),
		offerURL: PropTypes.string.tag({
			defaultValue: "/offer/",
			label: "Offer URL",
		}),
		successURL: PropTypes.string.tag({
			defaultValue: "/",
			label: "Success URL",
		}),
		stripeIntentsID: PropTypes.number.tag({
			label: "Stripe Intents - Provider ID",
			description:
				"In case you have multiple payment providers for stripe Intents, It determines what is the provider ID to be used by default.",
		}),
	}),
};

Checkout.label = "Subscriptions Checkout - Arc Block";
Checkout.icon = "shop-cart";

export default Checkout;
