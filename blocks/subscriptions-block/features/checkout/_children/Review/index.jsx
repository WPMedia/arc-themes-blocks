import React, { useEffect, useState } from "react";
import { useElements, useStripe } from "@stripe/react-stripe-js";

import { Paragraph, usePhrases, Stack, Button, useSales } from "@wpmedia/arc-themes-components";

import OrderInformation from "../../../../components/OrderInformation";
import RenewalInformation from "../../../../components/RenewalInformation";
import PaymentIcon, { PAYPAL as paypalIcon } from "../../../../components/PaymentIcons";

import { STRIPEINTENTS, PAYPAL } from "../../../../utils/constants";

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
	reCaptchaToken,
	resetRecaptcha,
	setResetRecaptcha,
	children,
	className,
}) => {
	const phrases = usePhrases();
	const { Sales } = useSales();

	const elements = stripeInstance ? useElements() : undefined;
	const stripe = stripeInstance ? useStripe() : undefined;

	const { stripeIntents, paypal } = paymentOptions;

	const { termsOfSaleURL, termsOfServiceURL, offerURL } = customFields;
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [resultConfirmStripeIntents, setResultConfirmStripeIntents] = useState();
	const [resultConfirmAppleGooglePay, setResultConfirmAppleGooglePay] = useState();

	const handleSubmitStripeIntents = async () => {
		let result = resultConfirmStripeIntents;
		const totalOrder = order?.total;
		const orderNumber = order?.orderNumber;

		setIsSubmitting(true);

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
      return;
		} else {
			if (totalOrder > 0) {
				Sales.finalizePayment(
					orderNumber,
					stripeIntents?.paymentMethodID,
					result?.paymentIntent?.id,
					null,
					reCaptchaToken,
				)
					.then(() => {
						setError();
						console.log("---------- PAGO EXITOSO ------------");
					})
					.catch((e) => {
						console.log("---------- PAGO FALLO ------------");
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
					reCaptchaToken,
				)
					.then(() => {
						setError();
						console.log("---------- PAGO EXITOSO ------------");
					})
					.catch((e) => {
						console.log("---------- PAGO FALLO ------------");
						setResetRecaptcha(!resetRecaptcha);
						setError(e);
						setIsSubmitting(false);
					});
			}
		}
	};

	const handleSubmitApplePayGooglePay = async (event, stripe) => {
		let result = resultConfirmAppleGooglePay;
		const totalOrder = order?.total;
		const orderNumber = order?.orderNumber;

		setIsSubmitting(true);

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
			return;
		} else {
			event.complete("success");
			if (totalOrder > 0) {
				Sales.finalizePayment(
					orderNumber,
					stripeIntents?.paymentMethodID,
					result.paymentIntent.id,
					null,
					reCaptchaToken,
				)
					.then(() => {
						//history.push('/success');
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
					reCaptchaToken,
				)
					.then(() => {
						//history.push('/success');
					})
					.catch((e) => {
						setResetRecaptcha(!resetRecaptcha);
						setError(e);
						setIsSubmitting(false);
					});
			}
		}
	};

	const handlePayPalPayment = () => {
		const paymentMethodID = paypal?.paymentMethodID;
		console.log("finalizando pago PayPal");
		console.log(paymentMethodID);
	};

	const PaymentButton = () => {
		if (paymentOptionSelected === STRIPEINTENTS) {
			return (
				<Button
					size="medium"
					variant="primary"
					fullWidth
					type="submit"
					disabled={isSubmitting}
					onClick={() => handleSubmitStripeIntents()}
				>
					<span>{phrases.t("subscriptions-block.submit-payment")}</span>
				</Button>
			);
		}

		if (paymentOptionSelected === PAYPAL) {
			return (
				<Button
					size="medium"
					variant="primary"
					fullWidth
					className={`${className}__review-paypal-button`}
					type="submit"
					onClick={handlePayPalPayment}
				>
					<>
						<span>{phrases.t("subscriptions-block.submit-payment-paypal")} </span>
						<PaymentIcon type={paypalIcon} />
					</>
				</Button>
			);
		}

		if (paymentOptionSelected === "ApplePay" || paymentOptionSelected === "GooglePay") {
			return <div id="ApplePay-payment-request-button"></div>;
		}
	};

	const mountApplePayGooglePayButton = () => {
		if (paymentMethodAppleGooglePay) {
			const prButton = elements.create("paymentRequestButton", {
				paymentRequest: paymentMethodAppleGooglePay,
			});

			prButton.mount("#ApplePay-payment-request-button");

			paymentMethodAppleGooglePay.on("paymentmethod", async (e) => {
				handleSubmitApplePayGooglePay(e, stripe);
			});
		}
	};

	useEffect(() => {
		mountApplePayGooglePayButton();
	}, []);

	return (
		<Stack className={`${className}__review`}>
			<OrderInformation
				offerURL={offerURL}
				showOfferURL={false}
				showPriceDescription={true}
				showProductFeatures={false}
				orderDetails={order}
				showBorder={true}
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
			<PaymentButton />
		</Stack>
	);
};
export default ReviewOrder;
