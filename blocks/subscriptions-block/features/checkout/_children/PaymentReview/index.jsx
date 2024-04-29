import React, { useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { Button, usePhrases, useSales, BotChallengeProtection } from "@wpmedia/arc-themes-components";

import { STRIPEINTENTS, PAYPAL, RECAPTCHA_TOKEN } from "../../../../utils/constants";
import CheckoutCardDetail, { PAYMENT, REVIEW } from "../../../../components/CheckoutCardDetail";
import Payment from "../Payment";
import ReviewOrder from "../Review";

const PaymentReviewDetail = ({
	stripeInstance,
	clientSecret,
	customFields,
	paymentOptions,
	billingAddress,
	order,
	isOpen,
	setIsOpen,
	isComplete,
	setIsComplete,
	error,
	setError,
	captchaToken,
	className,
}) => {
	const phrases = usePhrases();

	const { paypal } = paymentOptions;

	const [paymentOptionSelected, setPaymentOptionSelected] = useState();

	const [paymentMethod, setPaymentMethod] = useState();
	const [paymentMethodAppleGooglePay, setPaymentMethodAppleGooglePay] = useState();

	const reCaptchaStorage = localStorage.getItem(RECAPTCHA_TOKEN);
	const [reCaptchaToken, setReCaptchaToken] = useState(captchaToken ? captchaToken : reCaptchaStorage);
	const [resetRecaptcha, setResetRecaptcha] = useState(false);

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
				type={PAYMENT}
				summary={{ ...paymentMethod, paymentOptionSelected: paymentOptionSelected }}
				link={<EditButton />}
				isOpen={isOpen.payment}
				isComplete={isComplete.payment}
				error={error}
			>
				<Payment
					stripeInstance={stripeInstance}
					paypal={paypal}
					order={order}
					billingAddress={order?.billingAddress ? order?.billingAddress : billingAddress}
					setIsOpen={setIsOpen}
					setIsComplete={setIsComplete}
					setPaymentMethod={setPaymentMethod}
					paymentOptionSelected={paymentOptionSelected}
					setPaymentOptionSelected={setPaymentOptionSelected}
					setPaymentMethodAppleGooglePay={setPaymentMethodAppleGooglePay}
					className={`${className}__card`}
				/>
			</CheckoutCardDetail>
			<CheckoutCardDetail
				className={`${className}__card`}
				type={REVIEW}
				isOpen={isOpen.review}
				isComplete={isComplete.review}
				error={error}
			>
				<ReviewOrder
					customFields={customFields}
					paymentOptions={paymentOptions}
					order={order}
					paymentOptionSelected={paymentOptionSelected}
					stripeInstance={stripeInstance}
					clientSecret={clientSecret}
					paymentMethod={paymentMethod}
					paymentMethodAppleGooglePay={paymentMethodAppleGooglePay}
					setError={setError}
					reCaptchaToken={reCaptchaToken}
					resetRecaptcha={resetRecaptcha}
					setResetRecaptcha={setResetRecaptcha}
					className={className}
				>
					{error &&
						(error?.code === "130001" || error?.code === "010122" || error?.code === "010125") && (
							<div className={`${className}__billing-address-captcha`}>
								<BotChallengeProtection
									challengeIn="checkout"
									setCaptchaToken={setReCaptchaToken}
									error={error?.message}
									resetRecaptcha={resetRecaptcha}
								/>
							</div>
						)}
				</ReviewOrder>
			</CheckoutCardDetail>
		</>
	);
};

const PaymentReview = ({
	className,
	customFields,
	paymentOptions,
	billingAddress,
	order,
	setOrder,
	isOpen,
	setIsOpen,
	isComplete,
	setIsComplete,
	error,
	captchaToken,
	setError,
}) => {
	const { Sales } = useSales();

	const { stripeIntents } = paymentOptions;

	const [stripeInstance, setStripeInstance] = useState();
	const [payment, setPayment] = useState({});

	// load stripe key via payment details stripe key string
	const { parameter2: stripeKey, parameter1: clientSecret } = payment;

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
			if(!payment || payment?.orderNumber !== order?.orderNumber){
				Sales.initializePayment(order?.orderNumber, stripeIntents?.paymentMethodID)
				.then((paymentObject) => {
					if(paymentObject?.orderNumber && order?.orderNumber !== payment?.orderNumber){
						setOrder({...order, orderNumber: paymentObject?.orderNumber});
					}
					setPayment(paymentObject);
					setError();
				})
				.catch((e) => {
					setPayment({});
					setError(e);
				});
			}
		}
	}, [order, payment, stripeIntents]);

	if (stripeInstance) {
		return (
			<Elements stripe={stripeInstance}>
				<PaymentReviewDetail
					stripeInstance={stripeInstance}
					clientSecret={clientSecret}
					customFields={customFields}
					paymentOptions={paymentOptions}
					billingAddress={billingAddress}
					order={order}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					isComplete={isComplete}
					setIsComplete={setIsComplete}
					error={error}
					setError={setError}
					captchaToken={captchaToken}
					className={className}
				/>
			</Elements>
		);
	}

	return (
		<PaymentReviewDetail
			customFields={customFields}
			paymentOptions={paymentOptions}
			billingAddress={billingAddress}
			order={order}
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			isComplete={isComplete}
			setIsComplete={setIsComplete}
			error={error}
			setError={setError}
			captchaToken={captchaToken}
			className={className}
		/>
	);
};

export default PaymentReview;
