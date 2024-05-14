import React, { useEffect, useState } from "react";
import { useElements, useStripe } from "@stripe/react-stripe-js";

import {
	Paragraph,
	usePhrases,
	Stack,
	Button,
	useIdentity,
	useSales,
} from "@wpmedia/arc-themes-components";

import OrderInformation from "../../../../components/OrderInformation";
import RenewalInformation from "../../../../components/RenewalInformation";
import PaymentIcon from "../../../../components/PaymentIcons";

import {
	STRIPEINTENTS,
	PAYPAL,
	APPLEPAY,
	GOOGLEPAY,
	ARCXP_ORDERNUMBER,
	RECAPTCHA_TOKEN,
} from "../../../../utils/constants";

export const StripeIntentsButtons = ({
	paymentOptionSelected,
	paymentMethodAppleGooglePay,
	handleSubmitStripeIntents,
	handleSubmitApplePayGooglePay,
	isSubmitting,
}) => {
	const phrases = usePhrases();

	const elements = useElements();
	const stripe = useStripe();

	/* istanbul ignore next */
	useEffect(() => {
		if (paymentOptionSelected === APPLEPAY || paymentOptionSelected === GOOGLEPAY) {
			if (paymentMethodAppleGooglePay) {
				const prButton = elements.create("paymentRequestButton", {
					paymentRequest: paymentMethodAppleGooglePay,
				});

				prButton.mount("#ApplePay-payment-request-button");

				paymentMethodAppleGooglePay.on("paymentmethod", async (e) => {
					handleSubmitApplePayGooglePay(e, stripe);
				});
			}
		}
	}, [
		paymentOptionSelected,
		elements,
		handleSubmitApplePayGooglePay,
		paymentMethodAppleGooglePay,
		stripe,
	]);

	if (paymentOptionSelected === STRIPEINTENTS) {
		return (
			<Button
				size="medium"
				variant="primary"
				fullWidth
				type="submit"
				disabled={isSubmitting}
				onClick={() => handleSubmitStripeIntents(stripe)}
			>
				<span>{phrases.t("subscriptions-block.submit-payment")}</span>
			</Button>
		);
	}

	if (paymentOptionSelected === APPLEPAY || paymentOptionSelected === GOOGLEPAY) {
		return (
			<div data-testid="ApplePay-payment-request-button">
				<div id="ApplePay-payment-request-button" />
			</div>
		);
	}

	return null;
};

const PaymentButton = ({
	resultConfirmAppleGooglePay,
	order,
	paymentOptionSelected,
	paymentMethodAppleGooglePay,
	handleSubmitStripeIntents,
	handleSubmitPayPalPayment,
	handleSubmitApplePayGooglePay,
	stripeInstance,
	isSubmitting,
	setError,
	className,
}) => {
	const phrases = usePhrases();

	if (paymentOptionSelected === PAYPAL) {
		return (
			<Button
				size="medium"
				variant="primary"
				fullWidth
				className={`${className}__review-paypal-button`}
				type="submit"
				onClick={handleSubmitPayPalPayment}
			>
				<>
					<span>{phrases.t("subscriptions-block.submit-payment-paypal")} </span>
					<PaymentIcon type="PayPal" />
				</>
			</Button>
		);
	}

	if (stripeInstance && paymentOptionSelected !== PAYPAL) {
		return (
			<StripeIntentsButtons
				order={order}
				paymentOptionSelected={paymentOptionSelected}
				resultConfirmAppleGooglePay={resultConfirmAppleGooglePay}
				paymentMethodAppleGooglePay={paymentMethodAppleGooglePay}
				handleSubmitStripeIntents={handleSubmitStripeIntents}
				handleSubmitApplePayGooglePay={handleSubmitApplePayGooglePay}
				isSubmitting={isSubmitting}
				setError={setError}
			/>
		);
	}

	return null;
};

const ReviewOrder = ({
	customFields,
	paymentOptions,
	order,
	paymentOptionSelected,
	stripeInstance,
	clientSecret,
	paymentMethod,
	paymentMethodAppleGooglePay,
	setError,
	captchaToken,
	resetRecaptcha,
	setResetRecaptcha,
	setCaptchaError,
	children,
	className,
}) => {
	const phrases = usePhrases();

	const { Sales } = useSales();
	const { Identity } = useIdentity();

	const { stripeIntents, paypal } = paymentOptions;

	const { termsOfSaleURL, termsOfServiceURL, offerURL, loginURL, successURL } = customFields;
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [resultConfirmStripeIntents, setResultConfirmStripeIntents] = useState();
	const [resultConfirmAppleGooglePay, setResultConfirmAppleGooglePay] = useState();

	const recaptchaStored = localStorage.getItem(RECAPTCHA_TOKEN);

	const handleSubmitStripeIntents = async (stripe) => {
		const isLoggedIn = await Identity.isLoggedIn();
		const checkoutURL = window.location.pathname;
		if (!isLoggedIn) {
			window.location.href = `${loginURL}?redirect=${checkoutURL}`;
		}

		let result = resultConfirmStripeIntents;
		const totalOrder = order?.total;
		const orderNumber = order?.orderNumber;

		setIsSubmitting(true);
		setCaptchaError(null);

		if (!resultConfirmStripeIntents) {
			if (typeof totalOrder === "number" && orderNumber) {
				if (totalOrder > 0) {
					result = await stripe.confirmCardPayment(clientSecret, {
						payment_method: paymentMethod.id,
					});
				}
				if (totalOrder <= 0) {
					result = await stripe.confirmCardSetup(clientSecret, {
						payment_method: paymentMethod.id,
					});
				}

				if (!result?.error) {
					setResultConfirmStripeIntents(result);
				}
			}
		}

		if (result?.error) {
			setError(result.error);
			setIsSubmitting(false);
		}

		if (result?.paymentIntent || result?.setupIntent) {
			if (totalOrder > 0) {
				Sales.finalizePayment(
					orderNumber,
					stripeIntents?.paymentMethodID,
					result?.paymentIntent?.id,
					null,
					recaptchaStored || captchaToken,
				)
					.then(() => {
						window.location.href = `${successURL}`;
					})
					.catch((e) => {
						setResetRecaptcha(!resetRecaptcha);
						setError(e);
						setIsSubmitting(false);
					});
			} else {
				Sales.finalizePayment(
					orderNumber,
					stripeIntents?.paymentMethodID,
					result.setupIntent.id,
					null,
					recaptchaStored || captchaToken,
				)
					.then(() => {
						window.location.href = `${successURL}`;
					})
					.catch((e) => {
						setResetRecaptcha(!resetRecaptcha);
						setError(e);
						setIsSubmitting(false);
					});
			}
		}
	};

	/* istanbul ignore next */
	const handleSubmitApplePayGooglePay = async (event, stripe) => {
		const isLoggedIn = await Identity.isLoggedIn();
		const checkoutURL = window.location.pathname;
		if (!isLoggedIn) {
			window.location.href = `${loginURL}?redirect=${checkoutURL}`;
		}

		let result = resultConfirmAppleGooglePay;
		const totalOrder = order?.total;
		const orderNumber = order?.orderNumber;

		setIsSubmitting(true);
		setCaptchaError(null);

		if (!resultConfirmAppleGooglePay) {
			if (typeof totalOrder === "number" && orderNumber) {
				if (totalOrder > 0) {
					result = await stripe.confirmCardPayment(
						clientSecret,
						{
							payment_method: event.paymentMethod.id,
						},
						{
							handleActions: false,
						},
					);
				}
				if (totalOrder <= 0) {
					result = await stripe.confirmCardSetup(
						clientSecret,
						{
							payment_method: event.paymentMethod.id,
						},
						{
							handleActions: false,
						},
					);
				}

				if (!result?.error) {
					setResultConfirmAppleGooglePay(result);
				}
			}
		}

		if (result?.error) {
			setError(result.error);
			setIsSubmitting(false);
			event.complete("fail");
		} else {
			event.complete("success");
			if (totalOrder > 0) {
				Sales.finalizePayment(
					orderNumber,
					stripeIntents?.paymentMethodID,
					result.paymentIntent.id,
					null,
					recaptchaStored || captchaToken,
				)
					.then(() => {
						window.location.href = `${successURL}`;
					})
					.catch((e) => {
						setResetRecaptcha(!resetRecaptcha);
						setError(e);
						setIsSubmitting(false);
					});
			} else {
				Sales.finalizePayment(
					orderNumber,
					stripeIntents?.paymentMethodID,
					result.setupIntent.id,
					null,
					recaptchaStored || captchaToken,
				)
					.then(() => {
						window.location.href = `${successURL}`;
					})
					.catch((e) => {
						setResetRecaptcha(!resetRecaptcha);
						setError(e);
						setIsSubmitting(false);
					});
			}
		}
	};

	const handleSubmitPayPalPayment = async () => {
		const isLoggedIn = await Identity.isLoggedIn();
		const checkoutURL = window.location.pathname;
		if (!isLoggedIn) {
			window.location.href = `${loginURL}?redirect=${checkoutURL}`;
		}

		setIsSubmitting(true);
		setCaptchaError(null);

		try {
			const paypalPayment = await Sales.initializePayment(
				order?.orderNumber,
				paypal?.paymentMethodID,
			);
			const orderNumberPaypal = paypalPayment?.orderNumber || order?.orderNumber;
			// When paypal token is returned, We need to know the orderNumber in order to call Sales.finalizePayment();
			localStorage.setItem(ARCXP_ORDERNUMBER, orderNumberPaypal);
			window.location.href = paypalPayment?.parameter1;
		} catch (e) {
			setIsSubmitting(false);
			setResetRecaptcha(!resetRecaptcha);
			setError(e);
		}
	};

	return (
		<Stack className={`${className}__review`}>
			<OrderInformation
				offerURL={offerURL}
				showOfferURL={false}
				showPriceDescription
				showProductFeatures={false}
				orderDetails={order}
				showBorder
				className={className}
			/>
			<RenewalInformation order={order} className={className} />
			{children}
			<div className={`${className}__review__tos-container`}>
				<Paragraph
					dangerouslySetInnerHTML={{
						__html: phrases.t("subscriptions-block.terms-sales-service-text", {
							termsOfSaleURL,
							termsOfServiceURL,
						}),
					}}
				/>
			</div>
			<PaymentButton
				resultConfirmAppleGooglePay={resultConfirmAppleGooglePay}
				stripeInstance={stripeInstance}
				order={order}
				paymentOptionSelected={paymentOptionSelected}
				paymentMethodAppleGooglePay={paymentMethodAppleGooglePay}
				handleSubmitStripeIntents={handleSubmitStripeIntents}
				handleSubmitPayPalPayment={handleSubmitPayPalPayment}
				handleSubmitApplePayGooglePay={handleSubmitApplePayGooglePay}
				isSubmitting={isSubmitting}
				setError={setError}
				className={className}
			/>
		</Stack>
	);
};
export default ReviewOrder;
