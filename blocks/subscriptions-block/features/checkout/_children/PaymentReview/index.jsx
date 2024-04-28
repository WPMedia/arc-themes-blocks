import React, { useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Sales from "@arc-publishing/sdk-sales";

import { Button, usePhrases, useSales } from "@wpmedia/arc-themes-components";

import { STRIPEINTENTS, PAYPAL } from "../../../../utils/constants";
import CheckoutCardDetail, { PAYMENT, REVIEW } from "../../../../components/CheckoutCardDetail";
import Payment from "../Payment";
import ReviewOrder from "../Review";

const PaymentReviewDetail = ({
	customFields,
	paymentOptions,
	stripeInstance,
	order,
	isOpen,
	setIsOpen,
	isComplete,
	setIsComplete,
	error,
	setError,
	clientSecret,
	className,
}) => {
	const phrases = usePhrases();

	const { stripeInstance, paypal } = paymentOptions;

	const [paymentOptionSelected, setPaymentOptionSelected] = useState();
	const [paymentMethodDetails, setPaymentMethodDetails] = useState();

	const [paymentRequestAppleGooglePay, setPaymentRequestAppleGooglePay] = useState();

	useEffect(() => {
		if (stripeInstance) {
			setPaymentOptionSelected(STRIPEINTENTS);
		}
		if (paypal?.paymentMethodType && !stripeInstance) {
			setPaymentOptionSelected(PAYPAL);
		}
	}, [stripeInstance, paypal]);

	const EditButton = () => (
		<Button
			onClick={() => setIsOpen((state) => ({ ...state, payment: true, review: false }))}
			className={`${className}__card-edit`}
		>
			{phrases.t("checkout-block.edit")}
		</Button>
	);

	return (
		<>
			<CheckoutCardDetail
				className={`${className}__card`}
				order={order}
				type={PAYMENT}
				summary={{ ...paymentMethodDetails, paymentOptionSelected: paymentOptionSelected }}
				link={<EditButton />}
				isOpen={isOpen.payment}
				isComplete={isComplete.payment}
				error={error}
			>
				<Payment
					stripeInstance={stripeInstance}
					paypal={paypal}
					order={order}
					error={error}
					setError={setError}
					billingAddress={order?.billingAddress}
					setIsOpen={setIsOpen}
					setIsComplete={setIsComplete}
					setPaymentMethodDetails={setPaymentMethodDetails}
					paymentOptionSelected={paymentOptionSelected}
					setPaymentOptionSelected={setPaymentOptionSelected}
					setPaymentRequestAppleGooglePay={setPaymentRequestAppleGooglePay}
					className={`${className}__card`}
				/>
			</CheckoutCardDetail>
			<CheckoutCardDetail
				className={`${className}__card`}
				type={REVIEW}
				isOpen={isOpen.review}
				isComplete={isComplete.review}
			>
				<ReviewOrder
					customFields={customFields}
					paymentOptions={paymentOptions}
					order={order}
					paymentOptionSelected={paymentOptionSelected}
					paymentMethod={paymentMethodDetails}
					stripeInstance={stripeInstance}
					clientSecret={clientSecret}
					handleSubmitStripeIntents={handleSubmitStripeIntents}
					paymentRequestAppleGooglePay={paymentRequestAppleGooglePay}
					className={className}
				/>
			</CheckoutCardDetail>
		</>
	);
};

const PaymentReview = ({
	customFields,
	paymentOptions,
	order,
	isOpen,
	setIsOpen,
	isComplete,
	setIsComplete,
	error,
	setError,
	className,
}) => {
	const { stripeIntents, paypal } = paymentOptions;

	const { Sales } = useSales();

	const [stripeInstance, setStripeInstance] = useState();
	const [payment, setPayment] = useState({});

	// load stripe key via payment details stripe key string
	const { parameter2: stripeKey, parameter1: clientSecret } = payment;

	console.log(`clientSecret - PaymentReview ${clientSecret}`);

	useEffect(() => {
		setStripeInstance();
	}, [order]);

	useEffect(() => {
		if (stripeKey && !stripeInstance) {
			// stripe docs https://stripe.com/docs/stripe-js/react#elements-provider
			loadStripe(stripeKey).then((newStripePromise) => {
				setStripeInstance(newStripePromise);
			});
		}
	}, [stripeKey, stripeInstance]);

	useEffect(() => {
		if (stripeIntents && order?.orderNumber) {
			Sales.initializePayment(order?.orderNumber, stripeIntents?.paymentMethodID)
				.then((paymentObject) => {
					setPayment(paymentObject);
					setError();
				})
				.catch((e) => {
					setPayment({});
					setError(e);
				});
		}
	}, [order, stripeIntents]);

	console.log("Stripe intents - Stripe instance - order");
	console.log(stripeIntents);
	console.log(stripeInstance);
	console.log(order);
	console.log("Current order from Sales....")
	console.log(Sales.currentOrder)

	if (stripeInstance) {
		return (
			<Elements stripe={stripeInstance}>
				<PaymentReviewDetail
					customFields={customFields}
					paymentOptions={paymentOptions}
					stripeInstance={stripeInstance}
					order={order}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					isComplete={isComplete}
					setIsComplete={setIsComplete}
					error={error}
					setError={setError}
					clientSecret={clientSecret}
					className={className}
				/>
			</Elements>
		);
	}

	return (
		<PaymentReviewDetail
			customFields={customFields}
			paymentOptions={paymentOptions}
			order={order}
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			isComplete={isComplete}
			setIsComplete={setIsComplete}
			error={error}
			setError={setError}
			className={className}
		/>
	);
};

export default PaymentReview;
