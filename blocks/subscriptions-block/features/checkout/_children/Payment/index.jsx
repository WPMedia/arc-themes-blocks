import React, { useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";

import { Button, Input, Stack, usePhrases, useSales } from "@wpmedia/arc-themes-components";

import usePaymentOptions from "../../../../components/usePaymentOptions";
import PaymentIcon, { APPLEPAY, GOOGLEPAY, PAYPAL } from "../../../../components/PaymentIcons";
import { STRIPEINTENTS } from "../../../../utils/constants";
import StripeIntentCheckout from "../../../../components/StripeIntentCheckout";

const Payment = ({
	stripeIntentsID,
	order,
	error,
	setError,
	billingAddress,
	setIsOpen,
	setIsComplete,
	setPaymentMethodDetails,
	paymentOptionSelected,
	setPaymentOptionSelected,
	checkFinalizePayment,
	setClientSecret,
	className,
}) => {
	const { Sales } = useSales();
	const phrases = usePhrases();

	const {
		stripeIntents,
		paypal,
		error: errorPaymentOptions,
		isFetching,
	} = usePaymentOptions(stripeIntentsID);

	const [stripeInstance, setStripeInstance] = useState(null);
	const [isFetchingWallets, setIsFetchingWallets] = useState(true);
	const [isGooglePaySupported, setIsGooglePaySupported] = useState(false);
	const [isApplePaySupported, setIsApplePaySupported] = useState(false);

	const [isStripeInitialized, setIsStripeInitialized] = useState(false);
	const [checkStripeForm, setCheckStripeForm] = useState();
	const [isStripeIntentFormValid, setIsStripeIntentFormValid] = useState(false);
	const [payment, setPayment] = useState({});

	const [isValid, setIsValid] = useState(false);

	// load stripe key via payment details stripe key string
	const { parameter2: stripeKey, parameter1: clientSecret } = payment;

	useEffect(() => {
		if (paypal?.paymentMethodType && !stripeIntents?.paymentMethodType) {
			setPaymentOptionSelected(PAYPAL);
			setIsFetchingWallets(false);
		}
		if (!paypal?.paymentMethodType && stripeIntents?.paymentMethodType) {
			setPaymentOptionSelected(STRIPEINTENTS);
		}
		if (paypal?.paymentMethodType && stripeIntents?.paymentMethodType) {
			setPaymentOptionSelected(STRIPEINTENTS);
		}
	}, [stripeIntents, paypal]);

	useEffect(() => {
		if (!error?.message && errorPaymentOptions?.message) {
			setError(errorPaymentOptions);
		}
		if (!error?.message && !errorPaymentOptions?.message) {
			setError();
		}
	}, [error, errorPaymentOptions]);

	useEffect(() => {
		if (stripeIntents && order?.orderNumber) {
			Sales.initializePayment(order?.orderNumber, stripeIntents?.paymentMethodID)
				.then((paymentObject) => {
					setClientSecret(clientSecret);
					setPayment(paymentObject);
					setError();
				})
				.catch((e) => setError(e));
		}
	}, [order, stripeIntents]);

	useEffect(() => {
		if (stripeKey && !isStripeInitialized) {
			// stripe docs https://stripe.com/docs/stripe-js/react#elements-provider
			loadStripe(stripeKey).then((newStripePromise) => setStripeInstance(newStripePromise));
			setIsStripeInitialized(true);
		}
	}, [stripeKey, isStripeInitialized]);

	useEffect(() => {
		if (paymentOptionSelected === STRIPEINTENTS && isStripeIntentFormValid) {
			setIsValid(true);
		}
	}, [paymentOptionSelected, isStripeIntentFormValid]);

	useEffect(() => {
		if (isValid) {
			setIsOpen((state) => ({ ...state, payment: false, review: true }));
			setIsComplete((state) => ({ ...state, payment: true }));
		}
	}, [isValid]);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (paymentOptionSelected === STRIPEINTENTS) {
			setCheckStripeForm(!checkStripeForm);
		}
		if ([APPLEPAY, GOOGLEPAY, PAYPAL].includes(paymentOptionSelected)) {
			setIsValid(true);
			setIsOpen((state) => ({ ...state, payment: false, review: true }));
			setIsComplete((state) => ({ ...state, payment: true }));
		}
	};

	if (isFetching) {
		return null;
	}

	return (
		<form onSubmit={handleSubmit} className={`${className}__payment-form`}>
			<Stack className={`${className}-paymentOptions`}>
				{stripeIntents?.paymentMethodType && (
					<>
						<Input
							type="radio"
							name="paymentOptions"
							optionValueKey={STRIPEINTENTS}
							defaultValue={STRIPEINTENTS}
							checked={paymentOptionSelected === STRIPEINTENTS}
							onChange={() => setPaymentOptionSelected(STRIPEINTENTS)}
							label={phrases.t("checkout-block.payment-type.creditDebitCard")}
						/>
						{paymentOptionSelected === STRIPEINTENTS && isStripeInitialized && (
							<StripeIntentCheckout
								stripeInstance={stripeInstance}
								isStripeInitialized={isStripeInitialized}
								setIsFetchingWallets={setIsFetchingWallets}
								setIsGooglePaySupported={setIsGooglePaySupported}
								setIsApplePaySupported={setIsApplePaySupported}
								setIsStripeIntentFormValid={setIsStripeIntentFormValid}
								setPaymentMethodDetails={setPaymentMethodDetails}
								checkStripeForm={checkStripeForm}
								billingAddress={billingAddress}
								order={order}
								checkFinalizePayment={checkFinalizePayment}
								className={className}
							/>
						)}
					</>
				)}
				{paypal?.paymentMethodID && (
					<Input
						type="radio"
						name="paymentOptions"
						optionValueKey={PAYPAL}
						defaultValue={PAYPAL}
						checked={paymentOptionSelected === PAYPAL}
						onChange={() => setPaymentOptionSelected(PAYPAL)}
						label={<PaymentIcon type={PAYPAL} />}
					/>
				)}
				{!isFetchingWallets && isApplePaySupported && (
					<Input
						type="radio"
						name="paymentOptions"
						optionValueKey={paymentOptionSelected === APPLEPAY}
						defaultValue={APPLEPAY}
						checked={paymentOptionSelected === APPLEPAY}
						onChange={() => setPaymentOptionSelected(APPLEPAY)}
						label={<PaymentIcon type={APPLEPAY} />}
					/>
				)}
				{!isFetchingWallets && isGooglePaySupported && (
					<Input
						type="radio"
						name="paymentOptions"
						optionValueKey={paymentOptionSelected === GOOGLEPAY}
						defaultValue={GOOGLEPAY}
						checked={paymentOptionSelected === GOOGLEPAY}
						onChange={() => setPaymentOptionSelected(GOOGLEPAY)}
						label={<PaymentIcon type={GOOGLEPAY} />}
					/>
				)}
			</Stack>
			<Button
				size="medium"
				variant="primary"
				disabled={!isValid || error?.message ? true : null}
				fullWidth
				type="submit"
			>
				<span>{phrases.t("checkout-block.continue")}</span>
			</Button>
		</form>
	);
};

export default Payment;
