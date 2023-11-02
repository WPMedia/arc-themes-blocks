import React from "react";
import { mount } from "enzyme";
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
		let wrapper;

		useSales.mockReturnValue({
			Sales: {
				getCart: jest.fn(async () => Promise.resolve({ items: [] })),
			},
		});

		await act(async () => {
			wrapper = await mount(<Cart offerURL="/" />);
		});
		wrapper.update();

		expect(wrapper.find("a").exists()).toBe(true);
		expect(wrapper.text()).toBe("checkout-block.empty-cart-message");
	});

	it("renders empty cart message if no cart items", async () => {
		let wrapper;

		useSales.mockReturnValue({
			Sales: {
				getCart: jest.fn(async () => Promise.reject()),
			},
		});

		await act(async () => {
			wrapper = await mount(<Cart offerURL="/" />);
		});
		wrapper.update();

		expect(wrapper.text()).toBe("checkout-block.empty-cart-message");
	});

	it("renders empty cart message if no cart items", async () => {
		let wrapper;

		useSales.mockReturnValue({
			Sales: {
				getCart: jest.fn(async () => Promise.resolve({})),
			},
		});

		await act(async () => {
			wrapper = await mount(<Cart offerURL="/" />);
		});
		wrapper.update();

		expect(wrapper.text()).toBe("checkout-block.empty-cart-message");
	});

	it("renders cart", async () => {
		let wrapper;

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
			})
		);

		useSales.mockReturnValue({
			Sales: {
				getCart: jest.fn(async () =>
					Promise.resolve({
						total: 0,
						subtotal: 0,
						tax: 0,
						shipping: 0,
						items: [
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
						],
						currency: "USD",
						taxSupported: true,
					})
				),
			},
		});

		await act(async () => {
			wrapper = await mount(<Cart className={BLOCK_CLASS_NAME} offerURL="/" />);
		});
		wrapper.update();

		const title = wrapper.find(".b-checkout__cart h1");
		expect(wrapper.find(".b-checkout__cart").exists()).toBe(true);
		expect(title.text()).toEqual("checkout-block.order-summary");
		expect(wrapper.find("Item").exists()).toBe(true);
	});
});
