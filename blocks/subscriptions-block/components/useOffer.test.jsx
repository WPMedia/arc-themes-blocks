import { waitFor, renderHook } from "@testing-library/react";
import useOffer from "./useOffer";

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		arcSite: "arc-demo-3",
	})),
}));

const testOfferResponse = {
	name: "Premium Offer",
	disclaimerText: null,
	largeImage: null,
	mediumImage: null,
	smallImage: null,
	pageSubTitle: "<p>Free trial: <strong>first month free</strong>, then $10/mo</p>",
	pageTitle: "<p>Default subscription</p>",
	templateName: "bottom-drawer",
	campaigns: [
		{
			canRenew: true,
			canRestart: true,
			canStart: true,
			name: "augpromo",
			validFrom: 1629216600000,
			validUntil: 1630468800000,
		},
	],
	products: [
		{
			sku: "premium",
			description: "<p>Get access to premium content</p>",
			image: null,
			imageAction: null,
			name: "Premium Content",
			thumbnail: null,
			maxSubscriptionAssociations: 0,
			attributes: [
				{
					name: "p",
					value: "<p>get access to sports, business, cooking sections</p>",
				},
			],
			pricingStrategies: [
				{
					pricingStrategyId: 1169,
					priceCode: "1B1HCQ",
					name: "Premium free trial",
					description: "<p>free trial price</p>",
					gift: false,
					summary: null,
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
							amount: "10.00",
							billingCount: 1,
							billingFrequency: "Month",
							durationCount: 1,
							duration: "UntilCancelled",
						},
					],
					taxInclusive: false,
				},
				{
					pricingStrategyId: 1168,
					priceCode: "H7SCJB",
					name: "premium all access",
					description: "<p>Get access to premium content for a low rate</p>",
					gift: false,
					summary: null,
					currencyCode: "USD",
					currencyDisplayFormat: "symbol",
					currencyLocale: "en-US",
					rates: [
						{
							amount: "10.00",
							billingCount: 1,
							billingFrequency: "Month",
							durationCount: 1,
							duration: "UntilCancelled",
						},
					],
					taxInclusive: false,
				},
			],
			defaultSwgProduct: false,
		},
	],
	attributes: [],
	default: true,
};

global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve(testOfferResponse),
	}),
);

jest.mock("fusion:properties", () => {
	const retailOrigin = "https://corecomponents-arc-demo-3-prod.api.cdn.arcpublishing.com";
	const retailEndpoint = "/retail/public/v1/offer/live/";
	return jest.fn(() => ({
		__esModule: true,
		api: {
			retail: {
				origin: retailOrigin,
				endpoint: retailEndpoint,
			},
		},
	}));
});

describe("useOffer", () => {
	beforeEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	it("useOffer hook runs correctly", async () => {
		const { result } = renderHook(() => useOffer({ campaignCode: "default" }));

		expect(result.current.error).toBe(null);
		expect(result.current.offer).toBe(null);
		expect(result.current.isFetching).toBe(true);

		await waitFor(() => expect(result.current.error).toEqual(null));
		await waitFor(() => expect(result.current.offer).toEqual(testOfferResponse));
		await waitFor(() => expect(result.current.isFetching).toEqual(false));
	});

	it("use offer uses fallback default string", async () => {
		const { result } = renderHook(() => useOffer({ campaignCode: "" }));

		expect(result.current.error).toBe(null);
		expect(result.current.offer).toBe(null);
		expect(result.current.isFetching).toBe(true);

		await waitFor(() => expect(result.current.error).toEqual(null));
		await waitFor(() => expect(result.current.offer).toEqual(testOfferResponse));
		await waitFor(() => expect(result.current.isFetching).toEqual(false));
	});

	it("useOffer hook handles an error state during fetch", async () => {
		global.fetch = jest.fn().mockRejectedValue(new Error("fetch error"));

		const { result } = renderHook(() => useOffer({ campaignCode: "default" }));

		expect(result.current.error).toBe(null);
		expect(result.current.offer).toBe(null);
		expect(result.current.isFetching).toBe(true);

		await waitFor(() =>
			expect(result.current.error).toEqual("Error in fetching retail offers: Error: fetch error"),
		);
		await waitFor(() => expect(result.current.offer).toEqual(null));
		await waitFor(() => expect(result.current.isFetching).toEqual(false));
	});

	it("useOffer hook handles an error state during fetch", async () => {
		global.fetch = jest.fn().mockRejectedValue(new Error("fetch error"));

		const { result } = renderHook(() => useOffer({ campaignCode: "default" }));

		expect(result.current.error).toBe(null);
		expect(result.current.offer).toBe(null);
		expect(result.current.isFetching).toBe(true);

		await waitFor(() =>
			expect(result.current.error).toEqual("Error in fetching retail offers: Error: fetch error"),
		);
		await waitFor(() => expect(result.current.offer).toEqual(null));
		await waitFor(() => expect(result.current.isFetching).toEqual(false));
	});
});

