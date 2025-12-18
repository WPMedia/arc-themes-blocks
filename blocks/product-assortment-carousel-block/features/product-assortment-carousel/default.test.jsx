import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";

import ProductAssortmentCarousel from "./default";

jest.mock("fusion:environment", () => ({
	RESIZER_TOKEN_VERSION: 2,
}));

const IMAGE_OBJECT = {
	alt_text: "",
	auth: {
		2: "auth",
	},
	url: "image.jpeg",
};

const FEATURED_IMAGE_SCHEMA = {
	featuredImage: {
		value: [IMAGE_OBJECT],
	},
};
const PRICING_ARRAY_ONLY_LIST = [
	{
		id: null,
		currencyCode: "USD",
		currencyDisplayFormat: "symbol",
		currencyLocale: "en-US",
		prices: [
			{
				type: "List",
				amount: 26,
			},
		],
		schema: {},
	},
];

const PRICING_ARRAY_DIFFERENT_LIST_SALE = [
	{
		id: null,
		currencyCode: "USD",
		currencyDisplayFormat: "symbol",
		currencyLocale: "en-US",
		prices: [
			{
				type: "List",
				amount: 26,
			},
			{
				type: "Sale",
				amount: 16,
			},
		],
		schema: {},
	},
];

const PRICING_ARRAY_SAME_LIST_SALE = [
	{
		id: null,
		currencyCode: "USD",
		currencyDisplayFormat: "symbol",
		currencyLocale: "en-US",
		prices: [
			{
				type: "List",
				amount: 26,
			},
			{
				type: "Sale",
				amount: 26,
			},
		],
		schema: {},
	},
];

const mockContent = [
	{
		name: "Item 1",
		schema: FEATURED_IMAGE_SCHEMA,
		sku: "sku-1",
		pricing: PRICING_ARRAY_ONLY_LIST,
		attributes: [
			{
				name: "product_url",
				value: "a-url",
			},
		],
	},
	{
		name: "Item 2",
		schema: FEATURED_IMAGE_SCHEMA,
		sku: "sku-2",
		pricing: PRICING_ARRAY_DIFFERENT_LIST_SALE,
	},
	{
		name: "Item 3",
		schema: FEATURED_IMAGE_SCHEMA,
		sku: "sku-3",
		pricing: PRICING_ARRAY_ONLY_LIST,
	},
	{
		schema: FEATURED_IMAGE_SCHEMA,
		sku: "sku-4",
		pricing: PRICING_ARRAY_ONLY_LIST,
	},
];

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => {}),
	useEditableContent: jest.fn(() => ({
		searchableField: () => {},
	})),
}));

describe("Product Assortment Carousel", () => {
	it("should not render with no content", () => {
		useContent.mockReturnValue([]);
		const { container } = render(<ProductAssortmentCarousel />);
		expect(container).toBeEmptyDOMElement();
	});

	it("should render nothing if not in Admin and has less than 4 items", () => {
		useContent.mockReturnValue([{ _id: 1 }]);
		const { container } = render(<ProductAssortmentCarousel />);
		expect(container).toBeEmptyDOMElement();
	});

	it("should render with content", () => {
		useContent.mockReturnValue(mockContent);
		render(<ProductAssortmentCarousel />);
		expect(screen.getAllByRole("presentation", { hidden: true }).length).toBeGreaterThan(0);
	});

	it("should render with header content", () => {
		useContent.mockReturnValue(mockContent);
		render(<ProductAssortmentCarousel customFields={{ headerText: "Header" }} />);
		expect(screen.getByText("Header")).toBeInTheDocument();
	});

	it("should render admin message when no content and isAdmin", () => {
		useContent.mockReturnValue([]);
		useFusionContext.mockReturnValue({
			isAdmin: true,
		});

		render(<ProductAssortmentCarousel />);

		expect(
			screen.getByText(
				"This feature requires a minimum of 4 products and a maximum of 12 to display.",
			),
		).toBeInTheDocument();
	});

	it("should not show pricing data if not present", () => {
		useContent.mockReturnValue([
			{
				name: "List Price Render",
				sku: "sku-mock",
				schema: FEATURED_IMAGE_SCHEMA,
				attributes: [
					{
						name: "product_url",
						value: "a-url",
					},
				],
			},
			...mockContent,
		]);
		render(<ProductAssortmentCarousel customFields={{ headerText: "Header" }} />);

		const priceItemsContainer = screen.queryAllByTestId("price");

		expect(priceItemsContainer.length).toBe(4);
	});

	it("should render list price only when no sale price", () => {
		useContent.mockReturnValue([
			{
				name: "List Price Render",
				sku: "sku-mock",
				schema: FEATURED_IMAGE_SCHEMA,
				pricing: PRICING_ARRAY_ONLY_LIST,
				attributes: [
					{
						name: "product_url",
						value: "a-url",
					},
				],
			},
			...mockContent,
		]);
		render(<ProductAssortmentCarousel customFields={{ headerText: "Header" }} />);

		const priceItemsContainer = screen.queryAllByTestId("price");

		expect(priceItemsContainer.length).toBe(5);

		expect(within(priceItemsContainer[0]).getByText("$26.00")).toBeInTheDocument();
		expect(within(priceItemsContainer[0]).queryByText("$16.00")).not.toBeInTheDocument();
	});

	it("should render list price and sale price when both exist and differ", () => {
		useContent.mockReturnValue([
			{
				name: "List + Sale Price Render",
				schema: FEATURED_IMAGE_SCHEMA,
				sku: "sku-mock",
				pricing: PRICING_ARRAY_DIFFERENT_LIST_SALE,
			},
			...mockContent,
		]);

		render(<ProductAssortmentCarousel customFields={{ headerText: "Header" }} />);
		const priceItemsContainer = screen.queryAllByTestId("price");

		expect(within(priceItemsContainer[0]).getByText("$26.00")).toBeInTheDocument();
		expect(within(priceItemsContainer[0]).getByText("$16.00")).toBeInTheDocument();
	});

	it("should render list price only when sale price is the same", () => {
		useContent.mockReturnValue([
			{
				name: "List Price Render",
				schema: FEATURED_IMAGE_SCHEMA,
				sku: "sku-mock",
				pricing: PRICING_ARRAY_SAME_LIST_SALE,
				attributes: [
					{
						name: "product_url",
						value: "a-url",
					},
				],
			},
			...mockContent,
		]);
		render(<ProductAssortmentCarousel customFields={{ headerText: "Header" }} />);

		const priceItemsContainer = screen.queryAllByTestId("price");

		expect(within(priceItemsContainer[0]).getAllByText("$26.00")).toHaveLength(1);
	});

	it("should render images", () => {
		useContent.mockReturnValue([
			{
				name: "Image",
				schema: FEATURED_IMAGE_SCHEMA,
				sku: "sku-mock",
				pricing: PRICING_ARRAY_DIFFERENT_LIST_SALE,
			},
			...mockContent,
		]);

		render(<ProductAssortmentCarousel customFields={{ headerText: "Header" }} />);
		expect(screen.getAllByRole("presentation", { hidden: true }).length).toBe(5);
	});

	it("will not render a product image if not present", () => {
		useContent.mockReturnValue([
			{
				name: "Image",
				sku: "sku-mock",
				pricing: PRICING_ARRAY_DIFFERENT_LIST_SALE,
			},
			...mockContent,
		]);

		render(<ProductAssortmentCarousel customFields={{ headerText: "Header" }} />);
		expect(screen.getAllByRole("presentation", { hidden: true }).length).toBe(4);
	});

	it("should generate product URL", () => {
		const mockUrl = "a-url";
		useContent.mockReturnValue([
			{
				name: "Has product_url attribute",
				schema: FEATURED_IMAGE_SCHEMA,
				sku: "sku-1",
				pricing: PRICING_ARRAY_ONLY_LIST,
				attributes: [
					{
						name: "product_url",
						value: mockUrl,
					},
				],
			},
			{
				name: "Has no product_url attribute",
				schema: FEATURED_IMAGE_SCHEMA,
				sku: "sku-2",
				pricing: PRICING_ARRAY_ONLY_LIST,
				attributes: [
					{
						name: "unrelated_field",
						value: "unrelated value",
					},
				],
			},
			{
				name: "Has empty attribute array",
				schema: FEATURED_IMAGE_SCHEMA,
				sku: "sku-3",
				pricing: PRICING_ARRAY_ONLY_LIST,
				attributes: [],
			},
			{
				name: "Has no attribute key",
				schema: FEATURED_IMAGE_SCHEMA,
				sku: "sku-4",
				pricing: PRICING_ARRAY_ONLY_LIST,
			},
		]);
		render(<ProductAssortmentCarousel customFields={{ headerText: "Header" }} />);
		const links = screen.getAllByRole("link");
		expect(links[0]).toHaveAttribute("href", mockUrl);
		expect(links[1]).toHaveAttribute("href", "#");
		expect(links[2]).toHaveAttribute("href", "#");
		expect(links[3]).toHaveAttribute("href", "#");
	});
});
