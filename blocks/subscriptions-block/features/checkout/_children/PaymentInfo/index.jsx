import React, { useEffect, useState, useMemo } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useSales from "../../../../components/useSales";
import PayPal from "../../../../components/PayPal";

import { usePhrases, Button, Paragraph } from "@wpmedia/arc-themes-components";

import PaymentForm from "../../../../components/PaymentForm";

const LABEL_ORDER_NUMBER_PAYPAL = "ArcSubs_OrderNumber"

const PaymentInfo = ({
	successURL,
	className,
	userInfo,
	offerURL,
	paypal,
	stripeIntents,
	isUpdatePaymentMethod = false,
	successUpdateURL,
	errorPaymentOption,
	isInitialized,
}) => {
	const { Sales } = useSales();

	const [stripeInstance, setStripeInstance] = useState(null);

	const [isStripeInitialized, setIsStripeInitialized] = useState(false);
	const [isPayPal, setIsPayPal] = useState(false);

	const [orderNumber, setOrderNumber] = useState();
	const [orderNumberPayPal, setOrderNumberPayPal] = useState();
	const [payment, setPayment] = useState({});

	// load stripe key via payment details stripe key string
	const { parameter2: stripeKey, parameter1: clientSecret } = payment;

	const [paymentID, setPaymentID] = useState(); // Current paymentMethodID, used for updating payment method

	const phrases = usePhrases();

	const formErrorText = phrases.t("subscriptions-block.payment-error");
	const formLabel = phrases.t("subscriptions-block.credit-card-information");
	const formTitle = phrases.t("subscriptions-block.payment-information");
	const submitText = phrases.t("subscriptions-block.submit-payment");
	const updateText = phrases.t("subscriptions-block.update-payment");

	console.log(`isUpdatePaymentMethod ${isUpdatePaymentMethod}`);

	useEffect(() => {
		if (isUpdatePaymentMethod) {
			const urlParams = new URLSearchParams(window.location.href);
			const pmID = urlParams.get("paymentMethodID");
			setPaymentID(pmID);
		}
	}, [isUpdatePaymentMethod]);

	useEffect(() => {
		if (stripeIntents?.paymentMethodID && !errorPaymentOption) {
			//Checkout flow
			if (!isUpdatePaymentMethod) {
				console.log("Va a inicializar");
				Sales.getCart().then((cart) => {
					if (!cart?.items?.length) {
						window.location.href = offerURL;
						return;
					} else {
						const { country, email } = userInfo;
						console.log(stripeIntents);
						Sales.createNewOrder({ country }, email)
							.then((order) => {
								console.log(order);
								setOrderNumber(order.orderNumber);
								Sales.initializePayment(order.orderNumber, stripeIntents?.paymentMethodID).then(
									(paymentObject) => {
										setPayment(paymentObject);
									},
								);
							})
							.catch((e) => console.error(e));
					}
				});
			}

			//Update payment method
			if (stripeIntents?.paymentMethodID && isUpdatePaymentMethod && paymentID) {
				console.log("Updating payment method");
				const stripe = getStripeIntentID(paymentOptions, stripeIntentsID);
				Sales.initializePaymentUpdate(paymentID, stripeIntents?.paymentMethodID).then(
					(paymentObject) => {
						setPayment(paymentObject);
					},
				);
			}
		}
	}, [stripeIntents, isUpdatePaymentMethod, paymentID, errorPaymentOption]);

	useEffect(() => {
		if (stripeKey && !isStripeInitialized) {
			console.log("va a inicializar stripe...");
			// stripe docs https://stripe.com/docs/stripe-js/react#elements-provider
			loadStripe(stripeKey).then((newStripePromise) => setStripeInstance(newStripePromise));
			setIsStripeInitialized(true);
		}
	}, [stripeKey, isStripeInitialized]);

	const handlePayPal = async () => {
		const isLoggedIn = await Identity.isLoggedIn();

		if (!isLoggedIn) {
			window.location.href = `${loginURL}?redirect=${checkoutURL}`;
		}

		const { country, email } = userInfo;
		if (!isUpdatePaymentMethod) {
			if (orderNumber) {
				// Stripe Intents is set up and the payment was initialized already with stripe
				// ... check is logged In
				const currentOrder = await Sales.getOrderDetails(orderNumber);
				console.log(currentOrder);
				if (currentOrder?.items?.length) {
					Sales.clearCart().then(() => {
						const items = currentOrder.items.map((item) => {
							const { sku, priceCode, quantity } = item;
							return { sku, priceCode, quantity };
						});

						Sales.addItemToCart(items).then(() => {
							Sales.createNewOrder({ country }, email).then((newOrder) => {
								setOrderNumberPayPal(newOrder.orderNumber);
								setIsPayPal(true);
							});
						});
					});
				} else {
					window.location.href = offerURL;
					return;
				}
			} else {
				//Stripe Intents is not setup, the payment was not initialized already or the cart is empty
				Sales.getCart().then((cart) => {
					if (!cart?.items?.length) {
						window.location.href = offerURL;
						return;
					} else {
						Sales.createNewOrder({ country }, email)
							.then((order) => {
								setOrderNumberPayPal(order.orderNumber);
								setIsPayPal(true);
							})
							.catch((e) => console.error(e));
					}
				});
			}
		} else {
			setIsPayPal(true);
		}
	};

	return (
		<div className={`${className}__payment-info`}>
			<Paragraph>{formLabel}</Paragraph>
			{paypal && <Button onClick={handlePayPal}>PayPal</Button>}
			{(isPayPal || isInitialized) && (
				<PayPal
					labelOrderNumber = {LABEL_ORDER_NUMBER_PAYPAL}
					paypal={paypal}
					isUpdatePaymentMethod={isUpdatePaymentMethod}
					orderNumber={orderNumberPayPal}
					successURL={successURL}
					successUpdateURL={successUpdateURL}
					isInitialized={isInitialized}
				/>
			)}
			{stripeInstance && (
				<Elements stripe={stripeInstance}>
					<PaymentForm
						clientSecret={clientSecret}
						formErrorText={formErrorText}
						formLabel={formLabel}
						formTitle={formTitle}
						orderNumber={orderNumber}
						paymentMethodID={stripeIntents?.paymentMethodID}
						stripeInstance={stripeInstance}
						successURL={successURL}
						submitText={submitText}
						isUpdatePaymentMethod={isUpdatePaymentMethod}
						updateText={updateText}
						paymentID={paymentID}
						successUpdateURL={successUpdateURL}
						className={className}
					/>
				</Elements>
			)}
			{errorPaymentOption && (
				<section role="alert">
					<Paragraph>{errorPaymentOption}</Paragraph>
				</section>
			)}
		</div>
	);
};

export default PaymentInfo;
