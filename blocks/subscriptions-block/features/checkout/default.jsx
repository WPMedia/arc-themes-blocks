import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "@arc-fusion/prop-types";
import { usePhrases, Heading, Link, useIdentity } from "@wpmedia/arc-themes-components";
import usePaymentOptions from "../../components/usePaymentOptions";
import Cart from "../../components/Cart";
import ContactInfo from "../../components/ContactInfo";
import PaymentInfo from "./_children/PaymentInfo";

const BLOCK_CLASS_NAME = "b-checkout";

const Checkout = ({ customFields }) => {
	const { offerURL, successURL, stripeIntentsID } = customFields;
	const { stripeIntents, paypal, error } = usePaymentOptions(stripeIntentsID);

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

	const LABEL_ORDER_NUMBER_PAYPAL = "ArcSubs_OrderNumber"

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
					stripeIntents={stripeIntents}
					paypal={paypal}
					errorPaymentOptions={error}
					isInitialized={isInitialized}
					LABEL_ORDER_NUMBER_PAYPAL={LABEL_ORDER_NUMBER_PAYPAL}
				/>
			)}
		</section>
	);
};
Checkout.propTypes = {
	customFields: PropTypes.shape({
		offerURL: PropTypes.string.tag({
			defaultValue: "/offer/",
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