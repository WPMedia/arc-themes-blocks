import React, { useEffect, useState, useMemo } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useSales from "../../../../components/useSales";
import PayPal from "../../../../components/PayPal";

import { usePhrases, Heading, HeadingSection, Paragraph } from "@wpmedia/arc-themes-components";

import PaymentForm from "../../../../components/PaymentForm";

const PaymentInfo = ({
	successURL,
	className,
	userInfo,
	offerURL,
	paypal,
	stripeIntents,
	errorPaymentOption,
	isInitialized,
	LABEL_ORDER_NUMBER_PAYPAL
}) => {
	const { Sales } = useSales();
	window.Sales = Sales;
	const [stripeInstance, setStripeInstance] = useState(null);

	const [isStripeInitialized, setIsStripeInitialized] = useState(false);
	const [isPayPal, setIsPayPal] = useState(false);

	const [orderNumber, setOrderNumber] = useState();
	const [orderNumberPayPal, setOrderNumberPayPal] = useState();
	const [payment, setPayment] = useState({});

	// load stripe key via payment details stripe key string
	const { parameter2: stripeKey, parameter1: clientSecret } = payment;

	const phrases = usePhrases();

	const formErrorText = phrases.t("subscriptions-block.payment-error");
	const formLabel = phrases.t("subscriptions-block.credit-card-information");
	const submitText = phrases.t("subscriptions-block.submit-payment");
	const payWithCardDividerLabel = phrases.t("subscriptions-block.payWithCard-label");

	useEffect(() => {
		if (stripeIntents?.paymentMethodID && !errorPaymentOption) {
				Sales.getCart().then((cart) => {
					if (!cart?.items?.length) {
						window.location.href = offerURL;
						return;
					} else {
						const { country, email } = userInfo;
						Sales.createNewOrder({ country }, email)
							.then((order) => {
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
	}, [stripeIntents, errorPaymentOption]);

	useEffect(() => {
		if (stripeKey && !isStripeInitialized) {
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
			if (orderNumber) {
				// Stripe Intents is set up and the payment was initialized already with stripe
				// ... check is logged In
				const currentOrder = await Sales.getOrderDetails(orderNumber);
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
	};

	return (
		<div className={`${className}__payment-info`}>
			<HeadingSection>
				<Heading>{formLabel}</Heading>
			</HeadingSection>
			{paypal && 
				<div className={`${className}__payment-info-payments`}>
					<span className={`${className}__payment-info-paypal`}>
						<button className={`${className}__payment-info-paypal-button`} onClick={handlePayPal}><img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png" alt="Buy now with PayPal" /></button>
						<Paragraph>PayPal</Paragraph>
					</span>
				</div>
			}
			{(paypal && (isPayPal || isInitialized)) && (
				<PayPal
					labelOrderNumber = {LABEL_ORDER_NUMBER_PAYPAL}
					paypal={paypal}
					orderNumber={orderNumberPayPal}
					successURL={successURL}
					isInitialized={isInitialized}
				/>
			)}
			{paypal && 
			<div className={`${className}__payment-info-divider-container`} >
				<hr className={`${className}__payment-info-divider-line`} />
					<Paragraph>{payWithCardDividerLabel}</Paragraph>
				<hr className={`${className}__payment-info-divider-line`} />
			</div>}
			{stripeInstance && (
				<Elements stripe={stripeInstance}>
					<PaymentForm
						clientSecret={clientSecret}
						formErrorText={formErrorText}
						formLabel={formLabel}
						orderNumber={orderNumber}
						paymentMethodID={stripeIntents?.paymentMethodID}
						stripeInstance={stripeInstance}
						successURL={successURL}
						submitText={submitText}
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