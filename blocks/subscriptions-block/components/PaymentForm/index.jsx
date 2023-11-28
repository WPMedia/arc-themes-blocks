import React, { useState } from "react";
import Sales from "@arc-publishing/sdk-sales";
import {
	useElements,
	CardNumberElement,
	CardExpiryElement,
	CardCvcElement,
} from "@stripe/react-stripe-js";
import {
	usePhrases,
	Button,
	Heading,
	HeadingSection,
	Paragraph,
	Grid,
	Input,
	Stack,
} from "@wpmedia/arc-themes-components";

const CARD_ELEMENT_OPTIONS = {
	showIcon: true,
};

const FORM_STATUS = {
	IDLE: "idle",
	PROCESSING: "processing",
	SUCCESS: "success",
	ERROR: "error",
};

function PaymentForm({
	orderNumber,
	successURL = "/", // fallback if no successURL is provided
	paymentMethodID,
	clientSecret,
	stripeInstance,
	formTitle,
	submitText,
	formErrorText,
	isUpdatePaymentMethod,
	updateText,
	paymentID,
	successUpdateURL,
	className,
}) {
	const [formStatus, setFormStatus] = useState(FORM_STATUS.IDLE);
	const [cardName, setCardName] = useState("");

	const phrases = usePhrases();

	// stripe hooks have to be within Elements wrapper
	// https://stripe.com/docs/stripe-js/react#useelements-hook
	const elements = useElements();

	const handleSubmit = async (event) => {
		event.preventDefault();

		setFormStatus(FORM_STATUS.PROCESSING);
		const cardNumber = elements.getElement("cardNumber");

		const { error, paymentMethod } = await stripeInstance.createPaymentMethod({
			type: "card",
			card: cardNumber,
			billing_details: {
				name: cardName,
			}, // todo: collect other info? eg. name, email, etc.
		});

		if (error) {
			setFormStatus(FORM_STATUS.ERROR);
			return;
		}

		// if order of $0 there's a different stripe logic,
		let totalOrder;
		if (!isUpdatePaymentMethod) {
			totalOrder = Sales.currentOrder.total;
		}

		let result;
		if (totalOrder && totalOrder > 0 && !isUpdatePaymentMethod) {
			result = await stripeInstance.confirmCardPayment(clientSecret, {
				payment_method: paymentMethod.id,
			});
		} else {
			// User is updating the payment method OR totalOder <= 0
			result = await stripeInstance.confirmCardSetup(clientSecret, {
				payment_method: paymentMethod.id,
			});
		}

		if (result.error) {
			setFormStatus(FORM_STATUS.ERROR);
			return;
		}

		if (!isUpdatePaymentMethod) {
			if (totalOrder > 0) {
				const nonZeroPriceOutput = await Sales.finalizePayment(
					orderNumber,
					paymentMethodID,
					// using paymentIntent here for greater than 0
					result.paymentIntent.id,
				);
				if (nonZeroPriceOutput.status === "Paid") {
					setFormStatus(FORM_STATUS.SUCCESS);
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
		} else {
			try {
				await Sales.finalizePaymentUpdate(
					paymentID,
					paymentMethodID,
					result.setupIntent.id,
				);
				setFormStatus(FORM_STATUS.SUCCESS);
				window.location.href = successUpdateURL;
			} catch (e) {
				setFormStatus(FORM_STATUS.ERROR);
			}
		}
	};

	const additionalClass = `${className}__payment-form--stripe-element`;

	return (
		<section className={`${className}__payment`}>
			<HeadingSection>
				<Heading>{formTitle}</Heading>
			</HeadingSection>
			<form onSubmit={handleSubmit} className={`${className}__payment-form`}>
				<Grid className={`${className}__payment-information`}>
					<Stack>
						<Input
							label={phrases.t("checkout-block.cardholderName")}
							name="cardHolderName"
							required
							onChange={({ value }) => {
								setCardName(value);
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
					</div>
				</Grid>
				<Button
					size="medium"
					variant="primary"
					fullWidth
					type="submit"
					disabled={
						formStatus === FORM_STATUS.PROCESSING || formStatus === FORM_STATUS.SUCCESS
							? true
							: null
					}
				>
					{!isUpdatePaymentMethod ? submitText : updateText}
				</Button>
				{formStatus === FORM_STATUS.ERROR ? (
					<section role="alert">
						<Paragraph>{formErrorText}</Paragraph>
					</section>
				) : null}
			</form>
		</section>
	);
}

export default PaymentForm;
