import React, { useEffect, useState } from "react";

import PropTypes from "@arc-fusion/prop-types";
import { usePhrases, Heading, useIdentity, useSales, Button } from "@wpmedia/arc-themes-components";
import CheckoutCardDetail, {ACCOUNT, BILLING_ADDRESS, PAYMENT, REVIEW} from "../../components/CheckoutCardDetail";
import BillingAddress, {ARCXP_BILLING_ADDRESS} from "./_children/BillingAddress";

export const LABEL_ORDER_NUMBER_PAYPAL = "ArcSubs_OrderNumber"
const BLOCK_CLASS_NAME = "b-checkout";

const Checkout = ({ customFields }) => {
	const { loginURL, offerURL } = customFields;

	const [loggedIn, setIsLoggedIn] = useState(false);
	const [isFetching, setIsFetching] = useState(true);
	const [user, setUser] = useState(false);
	const initialState = {
		account: true,
		billingAddress: false,
		payment: false,
		review: false
	}
	const [isOpen, setIsOpen] = useState(initialState);
	const [isComplete, setIsComplete] = useState(initialState);
	const [accountSummary, setAccountSummary] = useState();
	const [billingAddress, setBillingAddress] = useState({});

	const { Identity } = useIdentity();
	const { Sales } = useSales();
	const phrases = usePhrases();

	const checkoutURL = window.location.href;

	useEffect(() => {
		const storedBillingAddress = localStorage.getItem(ARCXP_BILLING_ADDRESS);
		const verifyJSON = (string) => {
			try {
				return JSON.parse(string);
			} catch (e) {
				return false;
			}
		};
		const parsedBillingAddress = verifyJSON(storedBillingAddress);
		if(parsedBillingAddress) {
			setBillingAddress(parsedBillingAddress);
		}
	}, [])

	const billingAddressSummary = `${billingAddress?.line1} ${billingAddress?.line2}, ${billingAddress?.locality}, ${billingAddress?.region} ${billingAddress?.postal}`

	useEffect(() => {
		const isLoggedIn = async () => {
			setIsLoggedIn(await Identity.isLoggedIn());
			setIsFetching(false);
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

	useEffect(() => {
		if(!isFetching) {
			if (loggedIn) {
				setIsOpen(state => ({...state, account: false, billingAddress: true}))
				setIsComplete(state => ({...state, account: true}))
				if (user?.email) setAccountSummary(user?.email)
			} else if (loginURL && checkoutURL) {
				window.location.href = `${loginURL}?redirect=${checkoutURL}`;
			}
		}
	}, [loggedIn, user, isFetching, loginURL, checkoutURL])

	useEffect(() => {
		if (loggedIn) {
			Sales.getCart().then(cart => {
				if(!cart?.items?.length) {
					window.location.href = `${offerURL}?redirect=${checkoutURL}`;
				}
			})
			// eslint-disable-next-line
			.catch(e => console.error(e))
		}
	}, [loggedIn, Sales, offerURL, checkoutURL])

	const logoutAndRedirect = () => {
		Identity.logout().then(() => {
			window.location.href = `${loginURL}?redirect=${checkoutURL}`;
		})
	}

	const editButton = (type) => {
		if(type === ACCOUNT) {
			return (
				<Button onClick={logoutAndRedirect} className={`${BLOCK_CLASS_NAME}__card-edit`}>
					{phrases.t("checkout-block.edit")}
				</Button>
			)
		}
		if(type === BILLING_ADDRESS) {
			return (
				<Button onClick={() => setIsOpen(state => ({...state, billingAddress: true, payment: false}))} className={`${BLOCK_CLASS_NAME}__card-edit`}>
					{phrases.t("checkout-block.edit")}
				</Button>
			)
		}
		return null;
	}

	return (
		<section className={BLOCK_CLASS_NAME}>
			<Heading>{phrases.t("checkout-block.headline")}</Heading>
			<CheckoutCardDetail className={`${BLOCK_CLASS_NAME}__card`} type={ACCOUNT} summary={accountSummary} link={editButton(ACCOUNT)} isOpen={isOpen.account} isComplete={isComplete.account} />
			<CheckoutCardDetail className={`${BLOCK_CLASS_NAME}__card`} type={BILLING_ADDRESS} summary={billingAddressSummary} link={editButton(BILLING_ADDRESS)} isOpen={isOpen.billingAddress} isComplete={isComplete}>
				<BillingAddress Sales={Sales} className={BLOCK_CLASS_NAME} billingAddress={billingAddress} setBillingAddress={setBillingAddress} setIsOpen={setIsOpen} setIsComplete={setIsComplete}/>
			</CheckoutCardDetail>
			<CheckoutCardDetail className={`${BLOCK_CLASS_NAME}__card`} type={PAYMENT} summary='Credit Card' link={<a href='/login' >Edit</a>} isOpen={isOpen.payment}>
				Payment Placeholder
			</CheckoutCardDetail>
			<CheckoutCardDetail className={`${BLOCK_CLASS_NAME}__card`} type={REVIEW} isOpen={isOpen.review}>
				Review Placeholder
			</CheckoutCardDetail>
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
