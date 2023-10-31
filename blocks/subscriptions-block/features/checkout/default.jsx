import React, { useEffect, useState } from "react";
import PropTypes from "@arc-fusion/prop-types";

import { usePhrases, Heading, Link } from "@wpmedia/arc-themes-components";
import { useIdentity } from "@wpmedia/identity-block";

import useSales from "../../components/useSales";
import Cart from "../../components/Cart";
import ContactInfo from "../../components/ContactInfo";
import PaymentInfo from "./_children/PaymentInfo";

const BLOCK_CLASS_NAME = "b-checkout";

console.log("TO-DO-Laura: Unable to grab this function from useIdentity -- remove later");
const getSignedInIdentity = (user) =>
	user?.identities?.reduce((prev, current) =>
		prev.lastLoginDate > current.lastLoginDate ? prev : current
	) || null;

const Checkout = ({ customFields }) => {
	const { offerURL, successURL } = customFields;
	const [loggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(false);
	const [signedInIdentity, setSignedInIdentity] = useState(false);
	const [orderNumber, setOrderNumber] = useState();
	const [showPaymentScreen, setShowPaymentScreen] = useState(false);
	const [payment, setPayment] = useState();
	const [paymentMethodID, setPaymentMethodID] = useState();

	const { Identity } = useIdentity();
	const { Sales } = useSales();
	const phrases = usePhrases();

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
	const createNewOrder = async ({ email, firstName, lastName, country }) => {
		if (user) {
			Identity.updateUserProfile({ firstName, lastName });
		}

		// TO-DO: Check, what should be the behavior if cart is empty. If cart is empty, Sales.createNewOrder is returning an error back

		Sales.createNewOrder({ country }, email).then((order) => {
			setOrderNumber(order.orderNumber);
			Sales.getPaymentOptions().then((paymentOptions) => {
				const newPaymentMethodID = paymentOptions[0].paymentMethodID;
				Sales.initializePayment(order.orderNumber, paymentOptions[0].paymentMethodID).then(
					(paymentObject) => {
						setPayment(paymentObject);
						setPaymentMethodID(newPaymentMethodID);
						setShowPaymentScreen(true);
					}
				);
			});
		});
	};

	return (
		<section className={BLOCK_CLASS_NAME}>
			<Heading>{phrases.t("checkout-block.headline")}</Heading>
			<Link href={offerURL}>{phrases.t("checkout-block.back-to-offer-page")}</Link>

			<Cart offerURL={offerURL} className={BLOCK_CLASS_NAME} />

			{!showPaymentScreen ? (
				<ContactInfo
					callback={createNewOrder}
					user={user}
					signedInIdentity={signedInIdentity}
					logoutCallback={logoutCallback}
					className={BLOCK_CLASS_NAME}
				/>
			) : (
				<PaymentInfo
					orderNumber={orderNumber}
					paymentDetails={payment}
					paymentMethodID={paymentMethodID}
					successURL={successURL}
					className={BLOCK_CLASS_NAME}
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
	}),
};

Checkout.label = "Checkout - Arc Block";
Checkout.icon = "shop-cart";

export default Checkout;
