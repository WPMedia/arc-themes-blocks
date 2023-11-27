import React, { useEffect, useState, useMemo } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useSales from "../../../../components/useSales";

import { usePhrases, Button } from "@wpmedia/arc-themes-components";

import PaymentForm from "../../../../components/PaymentForm";

const STRIPE_PAYMENT_METHOD_ID = 18;
const PAYPAL_METOD_ID = 10;

const getStripeIntentID = (paymentOptions, stripeIntentID) => {
	const stripe = paymentOptions?.find((opts) => {
		const stripeByID = paymentOptions?.find(
			(opts) =>
				opts?.paymentMethodType === STRIPE_PAYMENT_METHOD_ID &&
				opts?.paymentMethodType === stripeIntentID,
		);
		console.log(stripeByID);
		// if(stripeIntentID){

		// }else{

		// }
		// opts?.paymentMethodType === STRIPE_PAYMENT_METHOD_ID
	});
};

const PaymentInfo = ({
	successURL,
	className,
	userInfo,
	offerURL,
	stripeIntentID,
	isUpdatePaymentMethod = false,
	successUpdateURL,
}) => {
	const { Sales } = useSales();

	console.log("stripeIntentID");
	console.log(stripeIntentID);

	const [stripeInstance, setStripeInstance] = useState(null);
	const [isStripe, setIsStripe] = useState(false);

	const [orderNumber, setOrderNumber] = useState();
	const [payment, setPayment] = useState({});
	const [paymentID, setPaymentID] = useState(); // Current paymentMethodID, used for updating payment method
	const [paymentMethodID, setPaymentMethodID] = useState();
	const [paymentOpts, setPaymentOpts] = useState([]);
	const phrases = usePhrases();

	const formErrorText = phrases.t("subscriptions-block.payment-error");
	const formLabel = phrases.t("subscriptions-block.credit-card-information");
	const formTitle = phrases.t("subscriptions-block.payment-information");
	const submitText = phrases.t("subscriptions-block.submit-payment");
	const updateText = phrases.t("subscriptions-block.update-payment");

	// load stripe key via payment details stripe key string
	const { parameter2: stripeKey, parameter1: clientSecret } = payment;

	console.log(`isUpdatePaymentMethod ${isUpdatePaymentMethod}`);

	useEffect(() => {
		const getPaymentOptions = async () => {
			const options = await Sales?.getPaymentOptions();
			setPaymentOpts(options);
		};
		getPaymentOptions();
	}, []);

	useEffect(() => {
		if (isUpdatePaymentMethod) {
			const urlParams = new URLSearchParams(window.location.href);
			const pmID = urlParams.get("paymentMethodID");
			setPaymentID(pmID);
		}
	}, [isUpdatePaymentMethod]);

	const paypal = useMemo(
		() => paymentOpts.find((opt) => opt.paymentMethodType === PAYPAL_METOD_ID),
		[paymentOpts],
	);

	useEffect(() => {
		//Checkout flow
		if (isStripe && !isUpdatePaymentMethod) {
			Sales.getCart().then((cart) => {
				if (!cart?.items?.length) {
					window.location.href = offerURL;
					return;
				} else {
					const { country, email } = userInfo;
					Sales.createNewOrder({ country }, email)
						.then((order) => {
							setOrderNumber(order.orderNumber);
							Sales.getPaymentOptions().then((paymentOptions) => {
								if (paymentOptions) {
									const stripe = getStripeIntentID(paymentOptions, stripeIntentID);
									// const stripe = paymentOptions?.find(
									// 	(opts) => opts?.paymentMethodType === STRIPE_PAYMENT_METHOD_ID,
									// );
									Sales.initializePayment(order.orderNumber, stripe?.paymentMethodID).then(
										(paymentObject) => {
											setPayment(paymentObject);
											setPaymentMethodID(stripe?.paymentMethodID);
										},
									);
								}
							});
						})
						.catch((e) => console.error(e));
				}
			});
		}

		//Update payment method
		if (isStripe && isUpdatePaymentMethod && paymentID) {
			console.log("Updating payment method");
			Sales.getPaymentOptions().then((paymentOptions) => {
				if (paymentOptions) {
					const stripe = paymentOptions?.find(
						(opts) => opts?.paymentMethodType === STRIPE_PAYMENT_METHOD_ID,
					);
					Sales.initializePaymentUpdate(paymentID, stripe?.paymentMethodID).then(
						(paymentObject) => {
							setPayment(paymentObject);
							setPaymentMethodID(stripe?.paymentMethodID);
						},
					);
				}
			});
		}
	}, [isStripe, isUpdatePaymentMethod, paymentID]);

	useEffect(() => {
		if (isStripe && stripeKey) {
			// stripe docs https://stripe.com/docs/stripe-js/react#elements-provider
			loadStripe(stripeKey).then((newStripePromise) => setStripeInstance(newStripePromise));
		}
	}, [isStripe, stripeKey]);

	return (
		<>
			{paypal && <Button>Paypal</Button>}
			{isStripe && stripeInstance ? (
				<Elements stripe={stripeInstance}>
					<PaymentForm
						clientSecret={clientSecret}
						formErrorText={formErrorText}
						formLabel={formLabel}
						formTitle={formTitle}
						orderNumber={orderNumber}
						paymentMethodID={paymentMethodID}
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
			) : (
				<Button onClick={() => setIsStripe(true)}>Stripe</Button>
			)}
		</>
	);
};

export default PaymentInfo;
