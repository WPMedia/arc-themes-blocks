import React from "react";
import { render, screen, within } from "@testing-library/react";
import '@testing-library/jest-dom';
import OrderInformation from "./index";
import currency from "../../utils/currency";

const orderDetails = {
	currency: "COP",
	shipping: 0,
	subtotal: 20000,
	tax: 100,
	taxSupported: true,
	total: 20100,
	items: [
		{
			name: "COP Currency",
			price: 20000,
			priceCode: "Q6R7UO",
			priceDescription: "<p>with tax description price</p>",
			priceName: "All access Annual",
			priceSummary: "<p>with tax summary price</p>",
			productDescription: "<p>COP Currency description</p>",
			quantity: 1,
			shortDescription: "<p>COP Currency description</p>",
			sku: "0987",
			subtotal: 20100,
			tax: 0,
			taxInclusive: undefined,
			total: 20000,
			productAttributes: [
				{
					featureText: "<p>Unlimited access to The Daily Intelligencer</p>",
				},
				{
					featureText: "<p>Save $40</p>",
				},
				{
					featureText: "<p>A <strong>bonus subscription</strong> to share</p>",
				},
			],
		},
	],
};

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

describe('Order Information component', () => {
	it("renders order info", () => {
		const showProductF = true;
		render(
			<OrderInformation
				id={1}
				orderDetails={orderDetails}
				offerURL="/offer/"
				showOfferURL={false}
				showPriceDescription={false}
				showProductFeatures={showProductF}
			/>,
		);
		expect(screen.getByText(orderDetails?.items?.[0]?.priceName)).toBeVisible();
		expect(screen.getByText("checkout-block.order-summary")).toBeVisible();
		expect(screen.getByText("checkout-block.subtotal")).toBeVisible();
		expect(
			screen.getByText(`${currency(orderDetails?.currency)}${orderDetails?.subtotal}`),
		).toBeVisible();
		expect(screen.getByText("checkout-block.salesTax")).toBeVisible();
		expect(
			screen.getByText(`${currency(orderDetails?.currency)}${orderDetails?.total}`),
		).toBeVisible();
		expect(screen.getByText("checkout-block.due-today")).toBeVisible();
	});

	it("renders price description", () => {
		const showPriceDesc = true;
		const showProductFeat = true;
		render(
			<OrderInformation
				orderDetails={orderDetails}
				showOfferURL={false}
				showPriceDescription={showPriceDesc}
				showProductFeatures={showProductFeat}
			/>,
		);
		expect(screen.getByText("with tax description price")).toBeVisible();
	});

	it("renders features", () => {
		const showOfferUrl = true
		const showPriceDesc = false;
		const showProductFeat = true;
		render(
			<OrderInformation
				orderDetails={orderDetails}
				offerURL="/offer/"
				showOfferURL={showOfferUrl}
				showPriceDescription={showPriceDesc}
				showProductFeatures={showProductFeat}
			/>,
		);
		const list = screen.getByRole("list");
		const { getAllByRole } = within(list);
		const items = getAllByRole("listitem");
		expect(items.length).toBe(3);
	});

	it("renders link to offer", () => {
		const showOfferUrl = true
		const showPriceDesc = false;
		const showProductFeat = true;
		render(
			<OrderInformation
				orderDetails={orderDetails}
				offerURL="/offer/"
				showOfferURL={showOfferUrl}
				showPriceDescription={showPriceDesc}
				showProductFeatures={showProductFeat}
			/>,
		);
		expect(
			screen.getByRole("link", { name: "checkout-block.view-subscription-offers" }),
		).toHaveAttribute("href", "/offer/");
	});
});
