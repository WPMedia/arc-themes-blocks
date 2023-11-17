import React from "react";
import { render } from "@testing-library/react";

import { isServerSide } from "@wpmedia/arc-themes-components";
import Offer from "./default";
import useOffer from "../../components/useOffer";

jest.spyOn(URLSearchParams.prototype, "get").mockReturnValue("some value");
jest.spyOn(URLSearchParams.prototype, "has").mockReturnValue(false);

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(),
}));

const HEADLINE_TEXT = "Get access today!";
const SUBHEADLINE_TEXT = "Subscribe to any of our sections";
const sampleOffer = {
	name: "All Products Offer",
	disclaimerText: "<p>Terms apply</p>",
	largeImage: null,
	mediumImage: null,
	smallImage: null,
	pageSubTitle: `<p>${SUBHEADLINE_TEXT}</p>`,
	pageTitle: `<p>${HEADLINE_TEXT}</p>`,
	templateName: "a",
	campaigns: [
		{
			canRenew: true,
			canRestart: true,
			canStart: true,
			name: "allaccess",
			validFrom: 1632146400000,
			validUntil: null,
		},
	],
	products: [
		{
			sku: "SPORTS",
			description: "<p>It's all you care about! We understand.</p>",
			image: null,
			imageAction: null,
			name: "Sports All Access",
			thumbnail: null,
			maxSubscriptionAssociations: 0,
			attributes: [
				{
					name: "li",
					value: "<p>Unlimited access to all Sports content</p>",
				},
				{
					name: "li",
					value: "<p>Save $40</p>",
				},
			],
			pricingStrategies: [
				{
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
				{
					pricingStrategyId: 1180,
					priceCode: "0SINKE",
					name: "Sports: Monthly",
					description: "<p>Monthly price for sports content</p>",
					gift: false,
					summary: "<p>$10/mo</p>",
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
		{
			sku: "premium",
			description: "<p>Premium all access subscription. Cancel anytime!</p>",
			image: null,
			imageAction: null,
			name: "Premium All Access",
			thumbnail: null,
			maxSubscriptionAssociations: 0,
			attributes: [],
			pricingStrategies: [
				{
					pricingStrategyId: 1173,
					priceCode: "EX8TZV",
					name: "Free Trial: All Access Premium",
					description: "<p>Save $40 by subscribing annually</p>",
					gift: false,
					summary: "<p>Unlimited access to the daily intelligencer</p>",
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
					pricingStrategyId: 1181,
					priceCode: "K7XNLO",
					name: "All Access Premium Monthly",
					description: "<p>Pay month to month. <strong>Cancel anytime</strong></p>",
					gift: false,
					summary: "<p>10/mo</p>",
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
	default: false,
};

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		arcSite: "gazette",
	})),
}));

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		api: {
			retail: {
				endpoint: "/retail/public/v1/offer/live/",
				origin: "https://corecomponents-the-gazette-prod.api.cdn.arcpublishing.com",
				script: "https://corecomponents-the-gazette-prod.cdn.arcpublishing.com/arc/subs/p.min.js",
			},
		},
	}))
);

jest.mock("@arc-publishing/sdk-sales");
jest.mock("../../components/useOffer");
useOffer.mockReturnValue({
	offer: sampleOffer,
	fetchOffer: () => sampleOffer,
	isFetching: false,
});

isServerSide.mockReturnValue(false);

describe("The Offer feature", () => {
	it("renders the correct number of offer cards", () => {
		const { container } = render(
			<Offer
				customFields={{
					campaignCode: "allaccess",
					loginURL: "/login/",
					checkoutURL: "/checkout/",
				}}
			/>
		);

		const offers = expect(container.querySelector(".b-offer__card--features li"));
		expect(offers.length).toBe(4);
	});

	it("renders sub-headline and subheadline", () => {
		render(
			<Offer
				customFields={{
					campaignCode: "allaccess",
					loginURL: "/login/",
					checkoutURL: "/checkout/",
				}}
			/>
		);
		expect(screen.getByText(HEADLINE_TEXT)).not.toBeNull();
		expect(screen.getByText(SUBHEADLINE_TEXT)).not.toBeNull();
	});

	it("uses fallback campaign code", () => {
		const { container } = render(
			<Offer
				customFields={{
					loginURL: "/login/",
					checkoutURL: "/checkout/",
				}}
			/>
		);

		const offers = expect(container.querySelector(".b-offer__grid-list div"));
		expect(offers.length).toBe(4);
	});

	it("uses the fallback campaign code if url params does not have campaign present", () => {
		jest.spyOn(URLSearchParams.prototype, "has").mockReturnValueOnce(true);

		const { container } = render(
			<Offer
				customFields={{
					loginURL: "/login/",
					checkoutURL: "/checkout/",
				}}
			/>
		);

		expect(container.querySelector(".b-offer")).not.toBeInTheDocument();
	});

	it("is fetching and does not return offers", () => {
		useOffer.mockReturnValue({
			isFetching: true,
			offer: null,
			fetchOffer: () => null,
		});

		const { container } = render(
			<Offer
				customFields={{
					campaignCode: "allaccess",
					loginURL: "/login/",
					checkoutURL: "/checkout/",
				}}
			/>
		);

		const offers = expect(container.querySelector(".b-offer__grid-list div"));
		expect(offers.length).toBe(0);

		const offersHeading = expect(container.querySelector(".b-offer__headings"));
		expect(offersHeading.length).toBe(0);
	});

	it("returns null on serverside", () => {
		isServerSide.mockReturnValue(true);

		render(
			<Offer
				customFields={{
					campaignCode: "allaccess",
					loginURL: "/login/",
					checkoutURL: "/checkout/",
				}}
			/>
		);

		expect(container.querySelector(".b-offer")).toBeInTheDocument();
	});
});