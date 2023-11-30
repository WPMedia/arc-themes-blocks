import React, { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { usePhrases, Heading, HeadingSection, Paragraph } from "@wpmedia/arc-themes-components";

import useSales from "../../../../components/useSales";
import PayPal from "../../../../components/PayPal";
import PaymentForm from "../../../../components/PaymentForm";
import usePaymentOptions from "../../../../components/usePaymentOptions";

const LABEL_IS_UPDATING_PAYMENT_METHOD = "ArcSubs_isUpdatingPaymentMethod";

const PaymentInfo = ({
	successURL,
	className,
	userInfo,
	offerURL,
	stripeIntentsID,
	isInitialized,
	LABEL_ORDER_NUMBER_PAYPAL,
	successUpdateURL,
	isPaymentMethodUpdate = false,
}) => {

	const { Sales } = useSales();
	const { stripeIntents, paypal, error } = usePaymentOptions(stripeIntentsID);

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
	const payWithCardDividerLabel = phrases.t("subscriptions-block.payWithCard-label");
	const updateText = phrases.t("subscriptions-block.update-payment");

	useEffect(() => {
		if (isPaymentMethodUpdate) {
			const urlParams = new URLSearchParams(window.location.href);
			const pmID = urlParams.get("paymentMethodID");
			setPaymentID(pmID);
		}
	}, [isPaymentMethodUpdate]);

	useEffect(() => {
		if (stripeIntents?.paymentMethodID && !error && !isInitialized) {
			//Checkout flow
			if (!isPaymentMethodUpdate) {
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

			//Update payment method
			if (stripeIntents?.paymentMethodID && isPaymentMethodUpdate && paymentID) {
				Sales.initializePaymentUpdate(paymentID, stripeIntents?.paymentMethodID).then(
					(paymentObject) => {
						setPayment(paymentObject);
					},
				);
			}
		}
	}, [stripeIntents, isPaymentMethodUpdate, paymentID, error, isInitialized]);

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

	// Paypal is nor supported when updating a payment method
	return (
		<div className={`${className}__payment-info`}>
			<HeadingSection>
				<Heading>{formLabel}</Heading>
			</HeadingSection>
			{!isPaymentMethodUpdate && paypal && (
				<>
					<div className={`${className}__payment-info-payments`}>
						<span className={`${className}__payment-info-paypal`}>
							<button className={`${className}__payment-info-paypal-button`} onClick={handlePayPal}>
								<img
									src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png"
									alt="Buy now with PayPal"
								/>
							</button>
							<Paragraph>PayPal</Paragraph>
						</span>
					</div>
					{(isPayPal || isInitialized) && (
						<PayPal
							labelOrderNumber={LABEL_ORDER_NUMBER_PAYPAL}
							paypal={paypal}
							orderNumber={orderNumberPayPal}
							successURL={successURL}
						/>
					)}
					<div className={`${className}__payment-info-divider-container`}>
						<hr className={`${className}__payment-info-divider-line`} />
						<Paragraph>{payWithCardDividerLabel}</Paragraph>
						<hr className={`${className}__payment-info-divider-line`} />
					</div>
				</>
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
						isPaymentMethodUpdate={isPaymentMethodUpdate}
						updateText={updateText}
						paymentID={paymentID}
						successUpdateURL={successUpdateURL}
						className={className}
					/>
				</Elements>
			)}
			{error && (
				<section role="alert">
					<Paragraph>{error}</Paragraph>
				</section>
			)}
		</div>
	);
};

export default PaymentInfo;
