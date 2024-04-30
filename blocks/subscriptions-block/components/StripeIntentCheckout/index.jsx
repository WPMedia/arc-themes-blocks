import React from "react";

import {
	CardCvcElement,
	CardExpiryElement,
	CardNumberElement,
} from "@stripe/react-stripe-js";
import { usePhrases, Grid, Input, Stack, Divider } from "@wpmedia/arc-themes-components";

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

const StripeIntentCheckout = ({
	entriesRef,
	errorForm,
	billingAddress,
	className,
}) => {
	const phrases = usePhrases();

	const additionalClass = `${className}__payment-form--stripe-element`;

	const handleInputChange = (name, entry) => {
		// eslint-disable-next-line
		entriesRef.current[name] = entry;
	};

	const getTranslatedCountries = countryCodes.map((entry) => ({
		label: phrases.t(entry.key),
		value: entry.code,
	}));

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

export default StripeIntentCheckout;