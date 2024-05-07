import React from "react";
import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import PriceRates, { ratesOneTime, ratesSingleUntilCancelled, ratesUntilCancelled, ratesDefaultMessage, PriceRate, NextRate, getCurrentBillingFrequency } from "./index";

describe("utils", () => {
	it("ratesOneTime", () => {
		expect(ratesOneTime('Day')).toBe("checkout-block.rates-oneTime-day")
		expect(ratesOneTime('Week')).toBe("checkout-block.rates-oneTime-week")
		expect(ratesOneTime('Month')).toBe("checkout-block.rates-oneTime-month")
		expect(ratesOneTime('Year')).toBe("checkout-block.rates-oneTime-year")
		expect(ratesOneTime('')).toBe("")
	});

	it("ratesSingleUntilCancelled", () => {
		expect(ratesSingleUntilCancelled('Day')).toBe("checkout-block.rates-single-untilCancelled-day")
		expect(ratesSingleUntilCancelled('Week')).toBe("checkout-block.rates-single-untilCancelled-week")
		expect(ratesSingleUntilCancelled('Month')).toBe("checkout-block.rates-single-untilCancelled-month")
		expect(ratesSingleUntilCancelled('Year')).toBe("checkout-block.rates-single-untilCancelled-year")
		expect(ratesSingleUntilCancelled('')).toBe("")
	});

	it("ratesUntilCancelled", () => {
		expect(ratesUntilCancelled('Day')).toBe("checkout-block.rates-untilCancelled-day")
		expect(ratesUntilCancelled('Week')).toBe("checkout-block.rates-untilCancelled-week")
		expect(ratesUntilCancelled('Month')).toBe("checkout-block.rates-untilCancelled-month")
		expect(ratesUntilCancelled('Year')).toBe("checkout-block.rates-untilCancelled-year")
		expect(ratesUntilCancelled('')).toBe("")
	});
  
	it("ratesDefaultMessage", () => {
		expect(ratesDefaultMessage('Day', 'Day')).toBe("checkout-block.rates-default-day-day")
		expect(ratesDefaultMessage('Day', 'Week')).toBe("checkout-block.rates-default-day-week")
		expect(ratesDefaultMessage('Day', 'Month')).toBe("checkout-block.rates-default-day-month")
		expect(ratesDefaultMessage('Day', 'Year')).toBe("checkout-block.rates-default-day-year")

		expect(ratesDefaultMessage('Week', 'Day')).toBe("checkout-block.rates-default-week-day")
		expect(ratesDefaultMessage('Week', 'Week')).toBe("checkout-block.rates-default-week-week")
		expect(ratesDefaultMessage('Week', 'Month')).toBe("checkout-block.rates-default-week-month")
		expect(ratesDefaultMessage('Week', 'Year')).toBe("checkout-block.rates-default-week-year")

		expect(ratesDefaultMessage('Month', 'Day')).toBe("checkout-block.rates-default-month-day")
		expect(ratesDefaultMessage('Month', 'Week')).toBe("checkout-block.rates-default-month-week")
		expect(ratesDefaultMessage('Month', 'Month')).toBe("checkout-block.rates-default-month-month")
		expect(ratesDefaultMessage('Month', 'Year')).toBe("checkout-block.rates-default-month-year")

		expect(ratesDefaultMessage('Year', 'Day')).toBe("checkout-block.rates-default-year-day")
		expect(ratesDefaultMessage('Year', 'Week')).toBe("checkout-block.rates-default-year-week")
		expect(ratesDefaultMessage('Year', 'Month')).toBe("checkout-block.rates-default-year-month")
		expect(ratesDefaultMessage('Year', 'Year')).toBe("checkout-block.rates-default-year-year")

		expect(ratesDefaultMessage('', '')).toBe(undefined)
	});

	it("PriceRate", () => {
    const rate1 = {
      duration: 'Month',
      durationCount: 1,
      billingCount: 1,
      billingFrequency: 'Month',
      amount: 10
    }
    const rate2 = {
      duration: 'Year',
      durationCount: 1,
      billingCount: 4,
      billingFrequency: 'Month',
      amount: 10
    }
    const rate3 = {
      duration: 'Month',
      durationCount: 1,
      billingCount: 10,
      billingFrequency: 'Day',
      amount: 10
    }
    expect(PriceRate(rate1, "USD")).toBe("$10 checkout-block.rates-oneTime-month");
    expect(PriceRate(rate2, "USD")).toBe("$10 checkout-block.rates-default-month-year");
    expect(PriceRate(rate3, "USD")).toBe("$10 checkout-block.rates-default-day-month");
	});

  it("NextRate", () => {
    const rate1 = {
      duration: 'Month',
      durationCount: 1,
      billingCount: 1,
      billingFrequency: 'Month',
      amount: 10
    }

    expect(NextRate({nextRate: rate1})).toBe("subscriptions-block.subscription-profile-management-payment-method-details-billing-frequency");
	});

  it("getCurrentBillingFrequency", () => {
    const rate1 = {
      duration: 'Month',
      durationCount: 1,
      billingCount: 1,
      billingFrequency: 'Month',
      amount: 10
    }
    const rate2 = {
      duration: 'Year',
      durationCount: 1,
      billingCount: 4,
      billingFrequency: 'Month',
      amount: 10
    }
    const rate3 = {
      duration: 'Month',
      durationCount: 1,
      billingCount: 10,
      billingFrequency: 'Day',
      amount: 10
    }
    expect(getCurrentBillingFrequency(rate1)).toBe("checkout-block.rates-oneTime-month");
    expect(getCurrentBillingFrequency(rate2)).toBe("checkout-block.rates-default-month-year");
    expect(getCurrentBillingFrequency(rate3)).toBe("checkout-block.rates-default-day-month");
	});

  it("PriceRates", () => {
    const rates = [
      {
        duration: 'Month',
        durationCount: 1,
        billingCount: 1,
        billingFrequency: 'Month',
        amount: 10
      },
      {
        duration: 'Year',
        durationCount: 1,
        billingCount: 4,
        billingFrequency: 'Month',
        amount: 10
      },
      {
        duration: 'Month',
        durationCount: 1,
        billingCount: 10,
        billingFrequency: 'Day',
        amount: 10
      }
    ];
    render(<PriceRates priceRates={rates} orderCurrency="USD" />)
    expect(screen.getByText("$10 checkout-block.rates-oneTime-month, $10 checkout-block.rates-default-month-year, $10 checkout-block.rates-default-day-month")).toBeInTheDocument();
	});
});
