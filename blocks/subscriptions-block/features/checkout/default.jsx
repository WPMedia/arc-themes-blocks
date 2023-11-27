import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "@arc-fusion/prop-types";
import { usePhrases, Heading, Link, useIdentity } from "@wpmedia/arc-themes-components";
import useSales from "../../components/useSales";
import Cart from "../../components/Cart";
import ContactInfo from "../../components/ContactInfo";
import PaymentInfo from "./_children/PaymentInfo";

const BLOCK_CLASS_NAME = "b-checkout";

const Checkout = ({ customFields }) => {
	const {Sales} = useSales();
	const { offerURL, successURL } = customFields;
	const [loggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(false);
	const [signedInIdentity, setSignedInIdentity] = useState(false);
	const [showPaymentScreen, setShowPaymentScreen] = useState(false);
	const [paymentOpts, setPaymentOpts] = useState([]);
	const [userInfo, setUserInfo] = useState({});
	const { Identity, getSignedInIdentity } = useIdentity();
	const phrases = usePhrases();

	useEffect(() => {
		const getPaymentOptions = async () => {
			const options = await Sales?.getPaymentOptions();
			setPaymentOpts(options);
		}
		getPaymentOptions();
	}, []);

	const paypal = useMemo(
    () => paymentOpts.find(opt => opt.paymentMethodType === 10),
    [paymentOpts]
  );

	const params = new URLSearchParams(window.location.search);
	const token = params.get('token');
	const orderNumber = localStorage.ArcSubs_OrderNumber;

	useEffect(() => {
		const finalizePayment = async () => {

			await Sales.getPaymentOptions();
			const option =
			Sales.paymentOptions.find(option => option.paymentMethodType === 10) || {};
			if (token && option.paymentMethodID) {

				const currentOrder = await Sales.getOrderDetails(orderNumber);

				const finalizePayment = async () => {
					try {
						await Sales.finalizePayment(orderNumber, option.paymentMethodID, token, null);
						localStorage.removeItem('ArcSubs_OrderNumber');s
						window.location.href = successURL;
					} catch (e) {
						console.error(e);
					}
				};
	
				if (currentOrder) {
					finalizePayment();
				}
			}
		}

		if(token && paypal && orderNumber) {
			finalizePayment();
		}
	}, [token, paypal, orderNumber]);

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
		const { email, firstName, lastName, country } = userInfo;
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

			{!showPaymentScreen ? (
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
					paypal={paypal}
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

Checkout.label = "Subscriptions Checkout - Arc Block";
Checkout.icon = "shop-cart";

export default Checkout;