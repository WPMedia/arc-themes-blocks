import React from "react";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import useSales from "../useSales";

import Cart from "./index";

const BLOCK_CLASS_NAME = "b-checkout";

jest.mock("fusion:properties", () => jest.fn(() => ({ api: { retail: { origin: "" } } })));

jest.mock("fusion:intl", () => ({
	__esModule: true,
	default: jest.fn(() => ({ t: jest.fn((phrase) => phrase) })),
}));

jest.mock("../../components/useSales");

describe("Cart", () => {
	it("renders empty cart message if no cart items", async () => {
		useSales.mockReturnValue({
			Sales: {
				getCart: jest.fn(async () => Promise.resolve({ items: [] })),
			},
		});

		await act(async () => {
			await render(<Cart offerURL="/" />);
		});

		expect(screen.getByText("Select from one of our offers")).not.toBeNull();
	});

	it("renders cart", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () =>
					Promise.resolve({
						timeUMType: null,
						timeQty: 0,
						price: 0,
						finalPayment: false,
						pricingStrategy: {
							pricingStrategyId: 1179,
							priceCode: "HUV7RS",
							name: "Sports: Free Trial + Monthly",
							description: "<p>1 month free trial</p>",
							gift: false,
							summary: "<p>Free first month,then $5.00 every month until canceled.</p>",
							currencyCode: "USD",
							currencyDisplayFormat: "symbol",
							currencyLocale: "en-US",
							rates: [
								{
									amount: "0.00",
									billingCount: 1,
									billingFrequency: "Month",
									durationCount: 1,
									duration: "Month",
								},
								{
									amount: "5.00",
									billingCount: 1,
									billingFrequency: "Month",
									durationCount: 1,
									duration: "UntilCancelled",
								},
							],
							taxInclusive: false,
						},
						paymentDate: 1638489600000,
						currency: "USD",
					}),
			}),
		);

		const items = [
			{
				sku: "SPORTS",
				quantity: 1,
				shortDescription: "<p>It's all you care about! We understand.</p>",
				name: "Sports All Access",
				price: 0,
				tax: 0,
				subtotal: 0,
				total: 0,
				priceCode: "HUV7RS",
				gift: false,
			},
		];

		useSales.mockReturnValue({
			Sales: {
				getCart: jest.fn(async () =>
					Promise.resolve({
						total: 0,
						subtotal: 0,
						tax: 0,
						shipping: 0,
						items: items,
						currency: "USD",
						taxSupported: true,
					}),
				),
			},
		});

		await act(async () => {
			await render(<Cart className={BLOCK_CLASS_NAME} offerURL="/" />);
		});

		expect(screen.getByText("Order Summary")).not.toBeNull();
		expect(screen.getByText(items.name)).not.toBeNull;
	});
});
