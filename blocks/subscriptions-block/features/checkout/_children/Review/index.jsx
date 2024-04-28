import React, { useEffect } from "react";
import { useElements } from "@stripe/react-stripe-js";

import { Paragraph, usePhrases, Stack, Button } from "@wpmedia/arc-themes-components";

import Sales from "@arc-publishing/sdk-sales";

import OrderInformation from "../../../../components/OrderInformation";
import RenewalInformation from "../../../../components/RenewalInformation";
import PaymentIcon, { PAYPAL as paypalIcon } from "../../../../components/PaymentIcons";

import { STRIPEINTENTS, PAYPAL, APPLEPAY, GOOGLEPAY } from "../../../../utils/constants";

const ReviewOrder = ({
	customFields,
	paymentOptions,
	order,
	paymentOptionSelected,
	paymentMethod,
	stripeInstance,
	clientSecret,
	handleSubmitStripeIntents,
	paymentRequestAppleGooglePay,
	className,
}) => {
	const phrases = usePhrases();

	const { stripeIntents, paypal } = paymentOptions;

	const elements = stripeInstance ? useElements() : undefined;

	console.log(`clientSecret - review ${clientSecret}`);
	console.log("stripeInstance - paymentMethodDetails");
	console.log(stripeInstance);
	console.log(paymentMethod);

	const { termsOfSaleURL, termsOfServiceURL, offerURL } = customFields;

	const handleStripeIntentPayment = async () => {
		console.log("Finalizando pago Stripe Intents...");
		console.log("PaymentMethod");
		console.log(order);

		const totalOrder = order?.total;
		const paymentMethodID = stripeIntents?.paymentMethodID;
		const orderNumber = order?.orderNumber;

		console.log(`orderNumber ${orderNumber}`);

		let result;

		if (totalOrder && totalOrder > 0) {
			result = await stripeInstance.confirmCardPayment(clientSecret, {
				payment_method: paymentMethod.id,
			});
		} else {
			result = await stripeInstance.confirmCardSetup(clientSecret, {
				payment_method: paymentMethod.id,
			});
		}

		console.log("Resull!!!!!!!####");
		console.log(result);

		if (result.error) {
			console.log("Error....");
			//setFormStatus(FORM_STATUS.ERROR);
			return;
		}

		if (totalOrder > 0) {
			const nonZeroPriceOutput = await Sales.finalizePayment(
				orderNumber,
				paymentMethodID,
				// using paymentIntent here for greater than 0
				result.paymentIntent.id,
			);

			console.log("nonZeroPriceOutput-----");
			console.log(nonZeroPriceOutput);

			if (nonZeroPriceOutput.status === "Paid") {
				window.location.href = successURL;
			} else {
				setFormStatus(FORM_STATUS.ERROR);
			}
		} else {
			const zeroPriceOutput = await Sales.finalizePayment(
				orderNumber,
				paymentMethodID,
				// using setupIntent here for 0
				result.setupIntent.id,
			);
			// even if no money changes hands, still shows status 'Paid'
			if (zeroPriceOutput.status === "Paid") {
				setFormStatus(FORM_STATUS.SUCCESS);
				window.location.href = successURL;
			} else {
				setFormStatus(FORM_STATUS.ERROR);
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
					onClick={handleStripeIntentPayment}
				>
					<span>{phrases.t("subscriptions-block.submit-payment")}</span>
				</Button>
			);
		}

		if (paymentOptionSelected === APPLEPAY || paymentOptionSelected === GOOGLEPAY) {
			return <div id="ApplePay-payment-request-button"></div>;
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

		// if(paymentOptionSelected === APPLEPAY){
		// 	return();
		// };

		// if(paymentOptionSelected === GOOGLEPAY){
		// 	return();
		// }
	};

	useEffect(() => {
		if (paymentRequestAppleGooglePay) {
			const prButton = elements.create("paymentRequestButton", {
				paymentRequest: paymentRequestAppleGooglePay,
			});

			prButton.mount("#ApplePay-payment-request-button");

			paymentRequestAppleGooglePay.on("paymentmethod", async () => {
				handleSubmitStripeIntents();
			});
		}
	}, [paymentRequestAppleGooglePay]);

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
