import React, { useState, useEffect, useRef } from "react";

import Sales from "@arc-publishing/sdk-sales";
import {
	CardCvcElement,
	CardExpiryElement,
	CardNumberElement,
	useElements,
	useStripe,
	Elements,
} from "@stripe/react-stripe-js";

import { Divider } from "@wpmedia/arc-themes-components";

import countryCodes from "../ContactInfo/countryCodes";

export const FORM_STATUS = {
	IDLE: "idle",
	PROCESSING: "processing",
	SUCCESS: "success",
	ERROR: "error",
};

const CARD_ELEMENT_OPTIONS = {
	showIcon: true,
};

import { usePhrases, Grid, Input, Stack } from "@wpmedia/arc-themes-components";

const StripeIntentsForm = ({
	stripeInstance,
	isStripeInitialized,
	setIsFetchingWallets,
	setIsApplePaySupported,
	setIsGooglePaySupported,
	setIsStripeIntentFormValid,
	setPaymentMethodDetails,
	checkStripeForm,
	billingAddress,
	order,
	checkFinalizePayment,
	className,
}) => {
	const entriesRef = useRef({});

	const [formStatus, setFormStatus] = useState(FORM_STATUS.IDLE);
	const [errorForm, setErrorForm] = useState();

	const phrases = usePhrases();
	const elements = useElements();

	const stripe = useStripe();

	const additionalClass = `${className}__payment-form--stripe-element`;

	const handleInputChange = (name, entry) => {
		entriesRef.current[name] = entry;
	};

	if (billingAddress) {
		if (!entriesRef.current.country)
			entriesRef.current.country = billingAddress.country ? billingAddress.country : "";
		if (!entriesRef.current.postal)
			entriesRef.current.postal = billingAddress.postal ? billingAddress.postal : "";
	}

	const getTranslatedCountries = countryCodes.map((entry) => ({
		label: phrases.t(entry.key),
		value: entry.code,
	}));

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

		const checkApplePayGooglePayWallets = (orderDetail) => {
			if (orderDetail?.currency && orderDetail?.shippingAddress?.country && orderDetail?.total) {
				const paymentRequest = stripe.paymentRequest({
					currency: orderDetail?.currency?.toLowerCase(),
					country: orderDetail?.shippingAddress?.country,
					requestPayerName: true,
					requestPayerEmail: true,
					total: {
						label: "Apple pay",
						amount: Math.round(orderDetail?.total * 100),
					},
					disableWallets: ["link"],
				});
				const prButton = elements.create("paymentRequestButton", {
					paymentRequest: paymentRequest,
				});

				paymentRequest.canMakePayment().then((res) => {
					console.log("canMakePayment...");
					console.log(res);
					if (res) {
						prButton.mount("#ApplePay-payment-request-button");
						if (res?.applePay) {
							setIsApplePaySupported(true);
						}
						if (res?.googlePay) {
							setIsGooglePaySupported(true);
						}
					} else {
						document.getElementById("#ApplePay-payment-request-button").style.display = "none";
					}
				});

				paymentRequest.on("paymentmethod", async (e) => {
					handleSubmitApplePay(e, stripe);
				});
			}
		};

		if (isStripeInitialized) {
			getIpAddressCountry()
				.then((countryCode) => {
					// ApplePay & GooglePay don't display for IP addresses in India https://docs.stripe.com/stripe-js/elements/payment-request-button?client=html
					if (countryCode && countryCode !== "IN") {
						checkApplePayGooglePayWallets(order);
						setIsFetchingWallets(false);
					} else {
						setIsFetchingWallets(false);
					}
				})
				.catch(() => {
					setIsFetchingWallets(false);
				});
		}
	}, [isStripeInitialized, order]);

	useEffect(() => {
		const checkStripeFormIsValid = async () => {
			setFormStatus(FORM_STATUS.PROCESSING);

			const cardName = entriesRef.current["cardHolderName"];
			const countryCode = entriesRef.current["country"];
			const postalCode = entriesRef.current["postal"];

			const cardNumber = elements.getElement("cardNumber");

			const { error, paymentMethod } = await stripeInstance.createPaymentMethod({
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
				setErrorForm(error);
				setFormStatus(FORM_STATUS.ERROR);
				setIsStripeIntentFormValid(false);
				return;
			} else {
				setIsStripeIntentFormValid(true);
				setPaymentMethodDetails(paymentMethod);
				setErrorForm();
			}
		};

		if (stripeInstance && elements && checkStripeForm !== undefined) {
			checkStripeFormIsValid();
		}
	}, [stripeInstance, elements, checkStripeForm]);

	useEffect(() => {
		const finalizePayment = async () => {
			let result;
			const totalOrder = order?.total;
			if (totalOrder && totalOrder > 0) {
				result = await stripeInstance.confirmCardPayment(clientSecret, {
					payment_method: paymentMethod.id,
				});
			} else {
				result = await stripeInstance.confirmCardSetup(clientSecret, {
					payment_method: paymentMethod.id,
				});
			}

			console.log("Intentando finalizar el pago....");
		};

		if (stripeInstance && elements && finalizePayment !== undefined) {
			finalizePayment();
		}
	}, [stripeInstance, elements, checkFinalizePayment]);

	console.log(order);

	return (
		<section className={`${className}__payment`}>
			<Grid className={`${className}__payment-information`}>
				<Stack>
					<Input
						label={phrases.t("checkout-block.cardholderName")}
						name="cardHolderName"
						placeholder={`${phrases.t("checkout-block.first-name")}/${phrases.t("checkout-block.last-name")}`}
						required
						onChange={({ value }) => {
							handleInputChange("cardHolderName", value);
						}}
						showDefaultError={false}
						type="text"
						validationErrorMessage={phrases.t("checkout-block.cardholderName-requirements")}
					/>
				</Stack>
				<div className={`${className}__payment-form--stripe-input-container`}>
					<label className={`${className}__payment-form--stripe-label`}>
						{phrases.t("checkout-block.cardNumber")}
					</label>
					<div className={`${className}__payment-form--stripe-cardDetails`}>
						<Stack>
							<div className={`${className}__payment-form--border-bottom ${additionalClass}`}>
								<CardNumberElement options={CARD_ELEMENT_OPTIONS} />
							</div>
						</Stack>
						<div className={`${className}__payment-form--stripe-row`}>
							<div className={`${className}__payment-form--border-right ${additionalClass}`}>
								<CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
							</div>
							<div className={additionalClass}>
								<CardCvcElement options={CARD_ELEMENT_OPTIONS} />
							</div>
						</div>
					</div>
					{errorForm?.message && (
						<div className={`${className}__payment-form--stripe-error`}>
							{`${errorForm?.message}`}
						</div>
					)}
				</div>
				<Stack className={`${className}__payment-form--stripe-country-zipCode`}>
					<Input
						label={phrases.t("checkout-block.country-region")}
						name="country"
						required
						defaultValue={billingAddress?.country ?? ""}
						onChange={({ value }) => {
							handleInputChange("country", value);
						}}
						showDefaultError={false}
						options={getTranslatedCountries}
						type="select"
						validationErrorMessage={phrases.t("checkout-block.country-validation")}
					/>
					<Input
						label={phrases.t("checkout-block.zip-code")}
						name="postal"
						required
						defaultValue={billingAddress?.postal ?? ""}
						onChange={({ value }) => {
							handleInputChange("postal", value);
						}}
						showDefaultError={false}
						type="text"
						validationErrorMessage={phrases.t("checkout-block.zip-code-validation")}
					/>
				</Stack>
				<Divider />
			</Grid>
		</section>
	);
};

const StripeIntentCheckout = ({
	stripeInstance,
	isStripeInitialized,
	setIsFetchingWallets,
	setIsApplePaySupported,
	setIsGooglePaySupported,
	setIsStripeIntentFormValid,
	setPaymentMethodDetails,
	checkStripeForm,
	billingAddress,
	order,
	checkFinalizePayment,
	className,
}) => {
	if (!stripeInstance) {
		null;
	}

	return (
		<Elements stripe={stripeInstance}>
			<StripeIntentsForm
				stripeInstance={stripeInstance}
				isStripeInitialized={isStripeInitialized}
				setIsFetchingWallets={setIsFetchingWallets}
				setIsApplePaySupported={setIsApplePaySupported}
				setIsGooglePaySupported={setIsGooglePaySupported}
				setIsStripeIntentFormValid={setIsStripeIntentFormValid}
				setPaymentMethodDetails={setPaymentMethodDetails}
				checkStripeForm={checkStripeForm}
				billingAddress={billingAddress}
				order={order}
				checkFinalizePayment={checkFinalizePayment}
				className={className}
			/>
		</Elements>
	);
};

export default StripeIntentCheckout;
