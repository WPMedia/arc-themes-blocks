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

const ratesOneTime = (billingCount, billingFrequency) => {
	const phrases = usePhrases();

	let message;
	switch (billingFrequency) {
		case DAY:
			message = phrases.t("checkout-block.rates-oneTime-day", { billingCount });
			break;
		case WEEK:
			message = phrases.t("checkout-block.rates-oneTime-week", { billingCount });
			break;
		case MONTH:
			message = phrases.t("checkout-block.rates-oneTime-month", { billingCount });
			break;
		case YEAR:
			message = phrases.t("checkout-block.rates-oneTime-year", { billingCount });
			break;
		default:
			message = "";
			break;
	}
	return message;
};

const ratesSingleUntilCancelled = (billingFrequency) => {
    const phrases = usePhrases();

	let message;
	switch (billingFrequency) {
		case DAY:
			message = phrases.t("checkout-block.rates-single-untilCancelled-day");
			break;
		case WEEK:
			message = phrases.t("checkout-block.rates-single-untilCancelled-week");
			break;
		case MONTH:
			message = phrases.t("checkout-block.rates-single-untilCancelled-month");
			break;
		case YEAR:
			message = phrases.t("checkout-block.rates-single-untilCancelled-year");
			break;
		default:
			message = "";
			break;
	}
	return message;
};

const ratesUntilCancelled = (billingCount, billingFrequency) => {
    const phrases = usePhrases();

	let message;
	switch (billingFrequency) {
		case DAY:
			message = phrases.t("checkout-block.rates-untilCancelled-day", { billingCount });
			break;
		case WEEK:
			message = phrases.t("checkout-block.rates-untilCancelled-week", { billingCount });
			break;
		case MONTH:
			message = phrases.t("checkout-block.rates-untilCancelled-month", { billingCount });
			break;
		case YEAR:
			message = phrases.t("checkout-block.rates-untilCancelled-year", { billingCount });
			break;
		default:
			message = "";
			break;
	}
	return message;
};

const ratesDefaultMessage = (billingCount, billingFrequency, durationCount, duration) => {
    const phrases = usePhrases();

	const cases = {
		[DAY]: {
			[DAY]: phrases.t("checkout-block.rates-default-day-day", { billingCount, durationCount }),
			[WEEK]: phrases.t("checkout-block.rates-default-day-week", { billingCount, durationCount }),
			[MONTH]: phrases.t("checkout-block.rates-default-day-month", { billingCount, durationCount }),
			[YEAR]: phrases.t("checkout-block.rates-default-day-year", { billingCount, durationCount }),
		},
		[WEEK]: {
			[DAY]: phrases.t("checkout-block.rates-default-week-day", { billingCount, durationCount }),
			[WEEK]: phrases.t("checkout-block.rates-default-week-week", { billingCount, durationCount }),
			[MONTH]: phrases.t("checkout-block.rates-default-week-month", {
				billingCount,
				durationCount,
			}),
			[YEAR]: phrases.t("checkout-block.rates-default-week-year", { billingCount, durationCount }),
		},
		[MONTH]: {
			[DAY]: phrases.t("checkout-block.rates-default-month-day", { billingCount, durationCount }),
			[WEEK]: phrases.t("checkout-block.rates-default-month-week", { billingCount, durationCount }),
			[MONTH]: phrases.t("checkout-block.rates-default-month-month", {
				billingCount,
				durationCount,
			}),
			[YEAR]: phrases.t("checkout-block.rates-default-month-year", { billingCount, durationCount }),
		},
		[YEAR]: {
			[DAY]: phrases.t("checkout-block.rates-default-year-day", { billingCount, durationCount }),
			[WEEK]: phrases.t("checkout-block.rates-default-year-week", { billingCount, durationCount }),
			[MONTH]: phrases.t("checkout-block.rates-default-year-month", {
				billingCount,
				durationCount,
			}),
			[YEAR]: phrases.t("checkout-block.rates-default-year-year", { billingCount, durationCount }),
		},
	};

	if (billingFrequency in cases) {
		if (duration in cases[billingFrequency]) {
			return cases[billingFrequency][duration];
		}
	}

	return "";
};

const getAmount = (amount, priceCurrency) => `${currency(priceCurrency)}${amount}`;

const getPriceRate = (rate, currency) => {
	const amount = getAmount(rate?.amount, currency);

	if (rate?.billingCount === rate?.durationCount && rate?.billingFrequency === rate?.duration) {
		return `${amount} ${ratesOneTime(rate?.billingCount, rate?.billingFrequency)}`;
	} if (rate?.duration === UNTIL_CANCELLED) {
		if (rate?.billingCount <= 1) {
			return `${amount} ${ratesSingleUntilCancelled(rate?.billingFrequency)}`;
		} 
			return `${amount} ${ratesUntilCancelled(rate?.billingCount, rate?.billingFrequency)}`;
		
	} 
		return `${amount} ${ratesDefaultMessage(
			rate?.billingCount,
			rate?.billingFrequency,
			rate?.durationCount,
			rate?.duration,
		)}`;
	
};

export const getCurrentBillingFrequency = (rate) => {
	if (rate?.billingCount === rate?.durationCount && rate?.billingFrequency === rate?.duration) {
		return `${ratesOneTime(rate?.billingCount, rate?.billingFrequency)}`;
	} if (rate?.duration === UNTIL_CANCELLED) {
		if (rate?.billingCount <= 1) {
			return `${ratesSingleUntilCancelled(rate?.billingFrequency)}`;
		} 
			return `${ratesUntilCancelled(rate?.billingCount, rate?.billingFrequency)}`;
		
	} 
		return `${ratesDefaultMessage(
			rate?.billingCount,
			rate?.billingFrequency,
			rate?.durationCount,
			rate?.duration,
		)}`;
	
};

const PriceRates = ({ priceRates, currency }) => {
	const priceRatestest = [
		{
			amount: "10000.00",
			billingCount: 1,
			billingFrequency: "Day",
			duration: "Day",
			durationCount: 1,
		},
		{
			amount: "10000.00",
			billingCount: 1,
			billingFrequency: "Month",
			duration: "Month",
			durationCount: 1,
		},
		{
			amount: "20000.00",
			billingCount: 1,
			billingFrequency: "Month",
			duration: "UntilCancelled",
			durationCount: 1,
		},
		{
			amount: "30000.00",
			billingCount: 5,
			billingFrequency: "Month",
			duration: "Day",
			durationCount: 3,
		},
		{
			amount: "40000.00",
			billingCount: 1,
			billingFrequency: "Month",
			duration: "Year",
			durationCount: 1,
		},
	];

	if (priceRates && priceRates.length && currency) {
		let priceRateStrings = priceRatestest.map((rate) => getPriceRate(rate, currency));
		priceRateStrings = priceRateStrings.join(", ");
		return <span>{priceRateStrings}</span>;
	}
	return null;
};

export default PriceRates;