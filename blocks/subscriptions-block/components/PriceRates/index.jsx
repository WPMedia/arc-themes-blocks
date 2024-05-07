import React from "react";
import { usePhrases } from "@wpmedia/arc-themes-components";

import currency from "../../utils/currency";

// billing frequency: Day, Week, Month, Year
// duration: Day, Week, Month, Year, UntilCancelled

const DAY = "Day";
const WEEK = "Week";
const MONTH = "Month";
const YEAR = "Year";
const UNTIL_CANCELLED = "UntilCancelled";

export const ratesOneTime = (billingFrequency) => {
	let message;
	switch (billingFrequency) {
		case DAY:
			message = "checkout-block.rates-oneTime-day";
			break;
		case WEEK:
			message = "checkout-block.rates-oneTime-week";
			break;
		case MONTH:
			message = "checkout-block.rates-oneTime-month";
			break;
		case YEAR:
			message = "checkout-block.rates-oneTime-year";
			break;
		default:
			message = "";
			break;
	}
	return message;
};

export const ratesSingleUntilCancelled = (billingFrequency) => {
	let message;
	switch (billingFrequency) {
		case DAY:
			message = "checkout-block.rates-single-untilCancelled-day";
			break;
		case WEEK:
			message = "checkout-block.rates-single-untilCancelled-week";
			break;
		case MONTH:
			message = "checkout-block.rates-single-untilCancelled-month";
			break;
		case YEAR:
			message = "checkout-block.rates-single-untilCancelled-year";
			break;
		default:
			message = "";
			break;
	}
	return message;
};

export const ratesUntilCancelled = (billingFrequency) => {
	let message;
	switch (billingFrequency) {
		case DAY:
			message = "checkout-block.rates-untilCancelled-day";
			break;
		case WEEK:
			message = "checkout-block.rates-untilCancelled-week";
			break;
		case MONTH:
			message = "checkout-block.rates-untilCancelled-month";
			break;
		case YEAR:
			message = "checkout-block.rates-untilCancelled-year";
			break;
		default:
			message = "";
			break;
	}
	return message;
};

export const ratesDefaultMessage = (billingFrequency, duration) => {
	const cases = {
		[DAY]: {
			[DAY]: "checkout-block.rates-default-day-day",
			[WEEK]: "checkout-block.rates-default-day-week",
			[MONTH]: "checkout-block.rates-default-day-month",
			[YEAR]: "checkout-block.rates-default-day-year",
		},
		[WEEK]: {
			[DAY]: "checkout-block.rates-default-week-day",
			[WEEK]: "checkout-block.rates-default-week-week",
			[MONTH]: "checkout-block.rates-default-week-month",
			[YEAR]: "checkout-block.rates-default-week-year",
		},
		[MONTH]: {
			[DAY]: "checkout-block.rates-default-month-day",
			[WEEK]: "checkout-block.rates-default-month-week",
			[MONTH]: "checkout-block.rates-default-month-month",
			[YEAR]: "checkout-block.rates-default-month-year",
		},
		[YEAR]: {
			[DAY]: "checkout-block.rates-default-year-day",
			[WEEK]: "checkout-block.rates-default-year-week",
			[MONTH]: "checkout-block.rates-default-year-month",
			[YEAR]: "checkout-block.rates-default-year-year",
		},
	};

	if (billingFrequency in cases) {
		if (duration in cases[billingFrequency]) {
			return cases[billingFrequency][duration];
		}
	}

	return undefined;
};

export const getAmount = (amount, priceCurrency) => `${currency(priceCurrency)}${amount}`;

export const PriceRate = (rate, rateCurrency) => {
	const phrases = usePhrases();

	const { billingCount, durationCount, billingFrequency, duration } = rate;

	const amount = getAmount(rate?.amount, rateCurrency);

	let rateString = "";
	let fullRateString = "";

	if (duration === UNTIL_CANCELLED) {
		if (billingCount <= 1) {
			rateString = ratesSingleUntilCancelled(billingFrequency);
			fullRateString = `${amount} ${rateString ? phrases.t(rateString) : ""}`;
		} else {
			rateString = ratesUntilCancelled(billingFrequency);
			fullRateString = `${amount} ${rateString ? phrases.t(rateString, { billingCount }) : ""}`;
		}
	}

	if (duration !== UNTIL_CANCELLED) {
		if (billingCount === durationCount && billingFrequency === duration) {
			rateString = ratesOneTime(billingFrequency);
			fullRateString = `${amount} ${rateString ? phrases.t(rateString, { billingCount }) : ""}`;
		} else {
			rateString = ratesDefaultMessage(billingFrequency, duration);
			fullRateString = `${amount} ${rateString ? phrases.t(rateString, { billingCount, durationCount }) : ""}`;
		}
	}
	return fullRateString;
};

export const NextRate = ({ nextRate }) => {
	const phrases = usePhrases();
	const { billingCount, durationCount, billingFrequency, duration } = nextRate;

	let rateString = "";
	let rate = "";

	const getFinalString = (r) =>
		phrases.t(
			"subscriptions-block.subscription-profile-management-payment-method-details-billing-frequency",
			{ rate: r },
		);

	if (duration === UNTIL_CANCELLED) {
		if (billingCount <= 1) {
			rateString = ratesSingleUntilCancelled(billingFrequency) ?? "";
			rate = `${rateString ? phrases.t(rateString) : ""}`;
			return getFinalString(rate);
		}
		rateString = ratesUntilCancelled(billingFrequency);
		rate = `${rateString ? phrases.t(rateString, { billingCount }) : ""}`;
		return getFinalString(rate);
	}

	if (billingCount === durationCount && billingFrequency === duration) {
		rateString = ratesOneTime(billingFrequency);
		rate = `${rateString ? phrases.t(rateString, { billingCount }) : ""}`;
		return getFinalString(rate);
	}

	rateString = ratesDefaultMessage(billingFrequency, duration);
	rate = `${rateString ? phrases.t(rateString, { billingCount, durationCount }) : ""}`;
	return getFinalString(rate);
};

export const getCurrentBillingFrequency = (rate) => {
	if (rate?.billingCount === rate?.durationCount && rate?.billingFrequency === rate?.duration) {
		return `${ratesOneTime(rate?.billingFrequency)}`;
	}
	if (rate?.duration === UNTIL_CANCELLED) {
		if (rate?.billingCount <= 1) {
			return `${ratesSingleUntilCancelled(rate?.billingFrequency)}`;
		}
		return `${ratesUntilCancelled(rate?.billingFrequency)}`;
	}
	return `${ratesDefaultMessage(rate?.billingFrequency, rate?.duration)}`;
};

const PriceRates = ({ priceRates, orderCurrency }) => {
	if (priceRates && priceRates.length && currency) {
		let priceRateStrings = priceRates.map((rate) => PriceRate(rate, orderCurrency));
		priceRateStrings = priceRateStrings.join(", ");
		return <span>{priceRateStrings}</span>;
	}

	return null;
};

export default PriceRates;
