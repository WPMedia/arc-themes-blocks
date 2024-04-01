import React from "react";

import { useSales } from "@wpmedia/arc-themes-components";
import { waitFor, renderHook } from "@testing-library/react";

import useOrder from "./useOrder";
import useOffer from "./useOffer";

// Mock setTimeout and clearTimeout
jest.useFakeTimers();

jest.mock("@arc-publishing/sdk-identity", () => ({
	__esModule: true,
	default: {
		apiOrigin: "",
		options: jest.fn(),
	},
}));

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		api: {
			identity: {
				origin: "https://corecomponents-arc-demo-3-prod.api.cdn.arcpublishing.com",
			},
			retail: {
				origin: "https://corecomponents-arc-demo-3-prod.api.cdn.arcpublishing.com",
				endpoint: "/retail/public/v1/offer/live/",
			},
		},
	})),
);

jest.mock("fusion:context", () => ({
	__esModule: true,
	useFusionContext: () => ({
		arcSite: "Test Site",
	}),
}));

const cartDetail = {
	total: 20000,
	subtotal: 20000,
	tax: 0,
	shipping: 0,
	currency: "COP",
	taxSupported: true,
	items: [
		{
			sku: "0987",
			quantity: 1,
			shortDescription: "<p>COP Currency description</p>",
			name: "COP Currency",
			price: 20000,
			tax: 0,
			subtotal: 20000,
			total: 20000,
			priceCode: "Q6R7UO",
			eventId: null,
			ownerClientId: null,
			attributes: [],
			gift: false,
		},
	],
};

const mockSales = {
	getCart: jest.fn(() => Promise.resolve(cartDetail)),
	getOrderDetails: jest.fn(() => {}),
};

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	useIdentity: jest.fn(() => ({
		isInitialized: true,
	})),
	useSales: jest.fn(() => ({
		isInitialized: true,
		Sales: {
			...mockSales,
		},
	})),
}));

const localStorageMock = (() => {
	let store = {};

	return {
		getItem: (key) => store[key],
		setItem: (key, value) => {
			store[key] = value.toString();
		},
		clear: () => {
			store = {};
		},
	};
})();

const sampleOffer = {
	name: "test_campaign",
	disclaimerText: null,
	largeImage: null,
	mediumImage: null,
	smallImage: null,
	pageSubTitle: "<p>test_campaign</p>",
	pageTitle: "<p>test_campaign</p>",
	templateName: "test-template",
	campaigns: [
		{
			canRenew: true,
			canRestart: true,
			canStart: true,
			name: "demoCampaign",
			validFrom: 1710888000000,
			validUntil: 1711060801000,
		},
	],
	products: [
		{
			sku: "0987",
			description: "<p>COP Currency description</p>",
			image: null,
			imageAction: null,
			name: "COP Currency",
			thumbnail: null,
			maxSubscriptionAssociations: 0,
			attributes: [
				{
					name: "test-style",
					value: "<p>Unlimited access to The Daily Intelligencer</p>",
				},
				{
					name: "test-style",
					value: "<p>Save $40</p>",
				},
				{
					name: "test-style",
					value: "<p>A <strong>bonus subscription</strong> to share</p>",
				},
			],
			pricingStrategies: [
				{
					pricingStrategyId: 4186,
					priceCode: "Q6R7UO",
					name: "All access Annual",
					description: "<p>with tax description price</p>",
					gift: false,
					summary: "<p>with tax summary price</p>",
					currencyCode: "COP",
					currencyDisplayFormat: "symbol",
					currencyLocale: "es-CO",
					rates: [
						{
							amount: "20000.00",
							billingCount: 1,
							billingFrequency: "Month",
							durationCount: 1,
							duration: "UntilCancelled",
						},
					],
					taxInclusive: false,
				},
				{
					pricingStrategyId: 4187,
					priceCode: "Z53LGY",
					name: "taxIncluded priceName",
					description: "<p>tax included priceDescription</p>",
					gift: false,
					summary: "<p>tax included priceSummary</p>",
					currencyCode: "COP",
					currencyDisplayFormat: "symbol",
					currencyLocale: "es-CO",
					rates: [
						{
							amount: "40000.00",
							billingCount: 1,
							billingFrequency: "Month",
							durationCount: 1,
							duration: "UntilCancelled",
						},
					],
					taxInclusive: true,
				},
			],
			defaultSwgProduct: false,
		},
	],
	attributes: [],
	default: true,
};

jest.mock("./useOffer");
useOffer.mockReturnValue({
	offer: sampleOffer,
	fetchOffer: () => sampleOffer,
	isFetching: false,
});

const emptyCart = {
	total: 0,
	subtotal: 0,
	tax: 0,
	shipping: 0,
	items: [],
	currency: "USD",
	taxSupported: true,
};

describe("The OfferToProductList component", () => {
	beforeEach(() => {
		Object.defineProperty(window, "localStorage", {
			value: localStorageMock,
		});
		localStorage.setItem("ArcXP_campaignName", "demoCampaign");
	});

	it("User has a cart", async () => {
		const { result } = renderHook(() => useOrder());

		expect(result.current.cartDetails).toBe(undefined);
		expect(result.current.orderDetails).toBe(undefined);
		expect(result.current.error).toBe(undefined);

		const newCartDetails = {
			...cartDetail,
			items: [
				{
					...cartDetail?.items?.[0],
					productAttributes: [
						{ featureText: "<p>Unlimited access to The Daily Intelligencer</p>" },
						{
							featureText: "<p>Save $40</p>",
						},
						{
							featureText: "<p>A <strong>bonus subscription</strong> to share</p>",
						},
					],
					productDescription: "<p>COP Currency description</p>",
					priceName: "All access Annual",
					priceDescription: "<p>with tax description price</p>",
					priceSummary: "<p>with tax summary price</p>",
					rates: [
						{
							amount: "20000.00",
							billingCount: 1,
							billingFrequency: "Month",
							durationCount: 1,
							duration: "UntilCancelled",
						},
					],
				},
			],
		};

		await waitFor(() => expect(result.current.cartDetails).toEqual(newCartDetails));
		await waitFor(() => expect(result.current.orderDetails).toEqual(undefined));
		await waitFor(() => expect(result.current.error).toEqual(undefined));
	});

	it("User has order", async () => {

		const orderDetail = {
			total: 22000,
			subtotal: 20000,
			tax: 2000,
			shipping: 0,
			items: [
				{
					sku: "0987",
					quantity: 1,
					shortDescription: "<p>COP Currency description</p>",
					name: "COP Currency",
					price: 20000,
					tax: 2000,
					subtotal: 20000,
					total: 22000,
					priceCode: "Q6R7UO",
					eventId: null,
					ownerClientId: null,
					attributes: [],
					gift: false,
				},
			],
			currency: "COP",
			orderNumber: "6OGJP2GGVJ7GT8L3",
			status: "Pending",
			email: "laurapinb@gmail.com",
			phone: "NA",
			firstName: "laura",
			lastName: "pin",
			orderDateUTC: 1711936392300,
			taxDelegated: false,
			paymentPending: false,
		};

		useSales.mockReturnValueOnce({
			isInitialized: true,
			Sales: {
				getCart: jest.fn(() => Promise.resolve(emptyCart)),
				getOrderDetails: jest.fn(() => {
					return Promise.resolve(orderDetail);
				}),
			},
		});

		const newOrderDetail = {
			...orderDetail,
			items: [
				{
					...orderDetail?.items?.[0],
					productAttributes: [
						{ featureText: "<p>Unlimited access to The Daily Intelligencer</p>" },
						{
							featureText: "<p>Save $40</p>",
						},
						{
							featureText: "<p>A <strong>bonus subscription</strong> to share</p>",
						},
					],
					productDescription: "<p>COP Currency description</p>",
					priceName: "All access Annual",
					priceDescription: "<p>with tax description price</p>",
					priceSummary: "<p>with tax summary price</p>",
					rates: [
						{
							amount: "20000.00",
							billingCount: 1,
							billingFrequency: "Month",
							durationCount: 1,
							duration: "UntilCancelled",
						},
					],
				},
			],
		}

		const { result } = renderHook(() => useOrder("6OGJP2GGVJ7GT8L3"));

		expect(result.current.cartDetails).toBe(undefined);
		expect(result.current.orderDetails).toBe(undefined);
		expect(result.current.error).toBe(undefined);

		await waitFor(() => expect(result.current.cartDetails).toEqual(undefined));
		await waitFor(() => expect(result.current.orderDetails).toEqual(newOrderDetail));
		await waitFor(() => expect(result.current.error).toEqual(undefined));
	});

	it("getOrderDetail is returning an error", async () => {

		const error = {code: '200019', message: 'Access Denied'}; 
		useSales.mockReturnValueOnce({
			isInitialized: true,
			Sales: {
				getCart: jest.fn(() => Promise.resolve(emptyCart)),
				getOrderDetails: jest.fn().mockRejectedValueOnce(error)
			},
		});

		const { result } = renderHook(() => useOrder("6OGJP2GGVJ7GT8L3"));

		expect(result.current.cartDetails).toBe(undefined);
		expect(result.current.orderDetails).toBe(undefined);
		expect(result.current.error).toBe(undefined);

		await waitFor(() => expect(result.current.cartDetails).toEqual(undefined));
		await waitFor(() => expect(result.current.orderDetails).toEqual(undefined));
		await waitFor(() => expect(result.current.error).toEqual(error));
	})
});
