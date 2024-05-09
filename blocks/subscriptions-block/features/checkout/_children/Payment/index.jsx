import React, { useEffect, useState, useRef, useCallback } from "react";

import { useElements, useStripe } from "@stripe/react-stripe-js";

import { Button, Input, Stack, usePhrases, useIdentity, useSales } from "@wpmedia/arc-themes-components";

import PaymentIcon, { APPLEPAY, GOOGLEPAY, PAYPAL } from "../../../../components/PaymentIcons";
import { STRIPEINTENTS } from "../../../../utils/constants";
import StripeIntentCheckout from "../../../../components/StripeIntentCheckout";

export const StripeIntentsOptions = ({
	stripeInstance,
	customFields,
	order,
	billingAddress,
	paymentOptionSelected,
	setPaymentOptionSelected,
	errorForm,
	setErrorForm,
	checkFormIsValid,
	setPaymentMethod,
	setPaymentMethodAppleGooglePay,
	className,
}) => {

	const phrases = usePhrases();
	const entriesRef = useRef({country: "", postal: "", cardHolderName: ""});

	const elements = useElements();
	const stripe = useStripe();

	const {Identity} = useIdentity();
	const { Sales } = useSales();
	
	const {titleApplePayGooglePay} = customFields;

	const [isApplePaySupported, setIsApplePaySupported] = useState(false);
	const [isGooglePaySupported, setIsGooglePaySupported] = useState(false);

	const paymentRequestButton = elements.getElement("paymentRequestButton");

	useEffect(() => {
		if (billingAddress) {
			if (!entriesRef?.current?.country)
				entriesRef.current.country = billingAddress?.country ? billingAddress.country : "";
			if (!entriesRef?.current?.postal)
				entriesRef.current.postal = billingAddress?.postal ? billingAddress.postal : "";
		}
	}, [billingAddress, entriesRef]);


	useEffect(() => {
		const checkStripeFormIsValid = async () => {
			const cardNumber = elements.getElement("cardNumber");

			const { cardHolderName, country, postal } = entriesRef.current;

			const { error, paymentMethod } = await stripe.createPaymentMethod({
				type: "card",
				card: cardNumber,
				billing_details: {
					name: cardHolderName,
					address: {
						country,
						postal_code: postal,
					},
				},
			});

			if (error) {
				setPaymentMethod();
				setErrorForm(error);
			} else {
				setPaymentMethod(paymentMethod);
				setErrorForm();
			}
		};

		if (checkFormIsValid !== undefined) {
			checkStripeFormIsValid();
		}
	}, [checkFormIsValid, setErrorForm, setPaymentMethod, stripe, elements, entriesRef]);

	/* istanbul ignore next */
	const checkApplePayGooglePayWallets = useCallback(() => {
        const billingCountry = order?.billingAddress?.country || billingAddress?.country;

        if (order?.currency && billingCountry) {
            const request = {
                currency: order?.currency?.toLowerCase(),
                country: billingCountry,
                requestPayerEmail: true,
                total: {
                    label: titleApplePayGooglePay,
                    amount: Math.round(order.total * 100)
                },
                disableWallets: ["link"]
            };

            const paymentRequest = stripe.paymentRequest(request);

            paymentRequest.canMakePayment().then((res) => {
                if (res) {
					setIsApplePaySupported(res?.applePay);
                    setIsGooglePaySupported(res?.googlePay);
                    setPaymentMethodAppleGooglePay(paymentRequest);
                }
            });

			if(paymentRequestButton){
				paymentRequestButton.destroy();
			}
        }
    }, [order, stripe, billingAddress, setPaymentMethodAppleGooglePay, titleApplePayGooglePay, paymentRequestButton]);

	useEffect(() => {
		const getIpAddressCountry = async () => {
			const url = `https://${(Sales.apiOrigin ?? Identity.apiOrigin).replace(
				/^https?:\/\//,
				"",
			)}/sales/public/v1/entitlements`;
			const headers = {
				"Cache-Control": "no-store",
			};
			let response;

			try {
				response = await fetch(url, {
					headers,
				});
			} catch (e) {
				// eslint-disable-next-line
				console.warn("call to /entitlements, service not available");
			}

			const json = !!response && response.ok && (await response.json());
			return json?.edgescape?.country_code;
		};

		if (stripeInstance) {
			getIpAddressCountry().then((countryCode) => {
				// ApplePay & GooglePay don't display for IP addresses in India https://docs.stripe.com/stripe-js/elements/payment-request-button?client=html
				if (countryCode && countryCode !== "IN") {
					checkApplePayGooglePayWallets(order);
				}
			});
		}
	}, [stripeInstance, order, Identity.apiOrigin, Sales.apiOrigin, checkApplePayGooglePayWallets]);

	return (
		<>
			<>
				<Input
					type="radio"
					name="paymentOptions"
					optionValueKey={STRIPEINTENTS}
					inputId = {STRIPEINTENTS}
					defaultValue={STRIPEINTENTS}
					checked={paymentOptionSelected === STRIPEINTENTS}
					onChange={() => setPaymentOptionSelected(STRIPEINTENTS)}
					label={phrases.t("checkout-block.payment-type.creditDebitCard")}
				/>
				{paymentOptionSelected === STRIPEINTENTS && stripeInstance && (
					<StripeIntentCheckout
						entriesRef={entriesRef}
						stripeInstance={stripeInstance}
						errorForm={errorForm}
						billingAddress={billingAddress}
						className={className}
					/>
				)}
			</>
			{isApplePaySupported && (
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
			{isGooglePaySupported && (
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
		</>
	);
};

const Payment = ({
	stripeInstance,
	customFields,
	paypal,
	order,
	billingAddress,
	setIsOpen,
	setIsComplete,
	paymentMethod,
	setPaymentMethod,
	paymentOptionSelected,
	setPaymentOptionSelected,
	setPaymentMethodAppleGooglePay,
	className,
}) => {
	const phrases = usePhrases();

	const [errorForm, setErrorForm] = useState();
	const [checkFormIsValid, setCheckFormIsValid] = useState();

	useEffect(() => {
		if (paymentOptionSelected === STRIPEINTENTS && !errorForm && paymentMethod) {
			setIsOpen((state) => ({ ...state, payment: false, review: true }));
			setIsComplete((state) => ({ ...state, payment: true }));
		}
	}, [paymentOptionSelected, errorForm, paymentMethod, setIsOpen, setIsComplete]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (paymentOptionSelected === STRIPEINTENTS) {
			setCheckFormIsValid(!checkFormIsValid);
		}

		if ([APPLEPAY, GOOGLEPAY, PAYPAL].includes(paymentOptionSelected)) {
			setIsOpen((state) => ({ ...state, payment: false, review: true }));
			setIsComplete((state) => ({ ...state, payment: true }));
		}
	};

	// https://developer.paypal.com/docs/reports/reference/paypal-supported-currencies/
	// Subscriptions supports: ['BRL', 'CAD', 'CLP', 'COP' 'EUR', 'JPY', 'KRW' 'MXN', 'NZD', 'PEN' 'GBP', 'USD']
	const currenciesPayPalSuppport = ['BRL', 'CAD', 'EUR', 'JPY', 'MXN', 'NZD', 'GBP', 'USD'];

	return (
		<form onSubmit={handleSubmit} className={`${className}__payment-form`}>
			<Stack className={`${className}-paymentOptions`}>
				{stripeInstance && (
					<StripeIntentsOptions
						stripeInstance={stripeInstance}
						customFields={customFields}
						order={order}
						billingAddress={billingAddress}
						paymentOptionSelected={paymentOptionSelected}
						setPaymentOptionSelected={setPaymentOptionSelected}
						errorForm={errorForm}
						setErrorForm={setErrorForm}
						checkFormIsValid={checkFormIsValid}
						setPaymentMethod={setPaymentMethod}
						setPaymentMethodAppleGooglePay={setPaymentMethodAppleGooglePay}
						className={className}
					/>
				)}
				{paypal?.paymentMethodID && order?.total > 0 && order?.currency && currenciesPayPalSuppport.includes(order?.currency) && (
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
			</Stack>
			<Button size="medium" variant="primary" fullWidth type="submit">
				<span>{phrases.t("checkout-block.continue")}</span>
			</Button>
		</form>
	);
};

export default Payment;
