import React, { useEffect, useState, useRef } from "react";

import { useElements, useStripe } from "@stripe/react-stripe-js";

import { Button, Input, Stack, usePhrases } from "@wpmedia/arc-themes-components";

import Sales from "@arc-publishing/sdk-sales";

import PaymentIcon, { APPLEPAY, GOOGLEPAY, PAYPAL } from "../../../../components/PaymentIcons";
import { STRIPEINTENTS } from "../../../../utils/constants";
import StripeIntentCheckout from "../../../../components/StripeIntentCheckout";

// export const FORM_STATUS = {
// 	IDLE: "idle",
// 	PROCESSING: "processing",
// 	SUCCESS: "success",
// 	ERROR: "error",
// };

// const CARD_ELEMENT_OPTIONS = {
// 	showIcon: true,
// };

const Payment = ({
	stripeInstance,
	paypal,
	order,
	billingAddress,
	setIsOpen,
	setIsComplete,
	setPaymentMethodDetails,
	paymentOptionSelected,
	setPaymentOptionSelected,
	handleSubmitStripeIntents,
	setPaymentRequestAppleGooglePay,
	className,
}) => {
	const phrases = usePhrases();
	const entriesRef = useRef({});

	const elements = stripeInstance ? useElements() : undefined;
	const stripe = stripeInstance ? useStripe() : undefined;

	if (billingAddress) {
		if (!entriesRef.current.country)
			entriesRef.current.country = billingAddress.country ? billingAddress.country : "";
		if (!entriesRef.current.postal)
			entriesRef.current.postal = billingAddress.postal ? billingAddress.postal : "";
	}

	const [errorForm, setErrorForm] = useState();
	const [isApplePaySupported, setIsApplePaySupported] = useState(false);
	const [isGooglePaySupported, setIsGooglePaySupported] = useState(true);

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
				console.warn("call to /entitlements, service not available");
			}

			const json = !!response && response.ok && (await response.json());
			return json?.edgescape?.country_code;
		};

		const checkApplePayGooglePayWallets = () => {
			console.log("Checking wallets....")
			const billingCountry = order?.billingAddress?.country || billingAddress?.country;
			if (order?.currency && order?.total && billingCountry) {
				const paymentRequest = stripe.paymentRequest({
					currency: order?.currency?.toLowerCase(),
					country: billingCountry,
					requestPayerName: true,
					requestPayerEmail: true,
					total: {
						label: "Apple pay",
						amount: Math.round(orderDetail?.total * 100),
					},
					disableWallets: ["link"],
				});

				setPaymentRequestAppleGooglePay(paymentRequest);

				// const prButton = elements.create("paymentRequestButton", {
				// 	paymentRequest: paymentRequest,
				// });

				paymentRequest.canMakePayment().then((res) => {
					console.info(res);
					if (res) {
						//prButton.mount("#ApplePay-payment-request-button");
						if (res?.applePay) {
							setIsApplePaySupported(true);
						}
						if (res?.googlePay) {
							setIsGooglePaySupported(true);
						}
					} 
					// else {
					// 	document.getElementById("#ApplePay-payment-request-button").style.display = "none";
					// }
				});

				paymentRequest.on("paymentmethod", async () => {
					handleSubmitStripeIntents();
				});
			}
		};

		if (stripeInstance) {
			getIpAddressCountry().then((countryCode) => {
				console.log("Country code");
				// ApplePay & GooglePay don't display for IP addresses in India https://docs.stripe.com/stripe-js/elements/payment-request-button?client=html
				if (countryCode && countryCode !== "IN") {
					checkApplePayGooglePayWallets(order);
				}
			});
		}
	}, [stripeInstance, order]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const checkStripeFormIsValid = async () => {
			const cardName = entriesRef.current["cardHolderName"];
			const countryCode = entriesRef.current["country"];
			const postalCode = entriesRef.current["postal"];

			const cardNumber = elements.getElement("cardNumber");

			const { error, paymentMethod } = await stripe.createPaymentMethod({
				type: "card",
				card: cardNumber,
				billing_details: {
					name: cardName,
					address: {
						country: countryCode,
						postal_code: postalCode,
					},
				},
			});

			if (error) {
				setPaymentMethodDetails();
				setErrorForm(error);
				return false;
			} else {
				setPaymentMethodDetails(paymentMethod);
				setErrorForm();
				return true;
			}
		};

		if (paymentOptionSelected === STRIPEINTENTS) {
			checkStripeFormIsValid().then((isvalid) => {
				if (isvalid) {
					setIsOpen((state) => ({ ...state, payment: false, review: true }));
					setIsComplete((state) => ({ ...state, payment: true }));
				}
			});
		}
		if ([APPLEPAY, GOOGLEPAY, PAYPAL].includes(paymentOptionSelected)) {
			setIsOpen((state) => ({ ...state, payment: false, review: true }));
			setIsComplete((state) => ({ ...state, payment: true }));
			setPaymentMethodDetails({ paymentMethodSelected: paymentOptionSelected });
		}
	};

	return (
		<form onSubmit={handleSubmit} className={`${className}__payment-form`}>
			<Stack className={`${className}-paymentOptions`}>
				{stripeInstance && (
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
			</Stack>
			<Button
				size="medium"
				variant="primary"
				// disabled={!isValid || error?.message ? true : null}
				fullWidth
				type="submit"
			>
				<span>{phrases.t("checkout-block.continue")}</span>
			</Button>
		</form>
	);
};

export default Payment;
