import React from "react";
import { render, screen } from "@testing-library/react";
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

		expect(container.querySelectorAll(".b-product-assortment-carousel")).toHaveLength(0);
	});

	it("should render nothing if not in Admin and has less than 4 items", () => {
		useContent.mockReturnValue([{ _id: 1 }]);
		const { container } = render(<ProductAssortmentCarousel />);
		expect(container).toBeEmptyDOMElement();
	});

	it("should render with content", () => {
		useContent.mockReturnValue(mockContent);
		const { container } = render(<ProductAssortmentCarousel />);

		expect(container.querySelectorAll(".b-product-assortment-carousel__main-title")).toHaveLength(
			0,
		);
		expect(container.querySelectorAll(".b-product-assortment-carousel")).toHaveLength(1);
	});

	it("should render with header content", () => {
		useContent.mockReturnValue(mockContent);
		const { container } = render(
			<ProductAssortmentCarousel customFields={{ headerText: "Header" }} />,
		);

		expect(container.querySelectorAll(".b-product-assortment-carousel__main-title")).toHaveLength(
			1,
		);
		expect(container.querySelectorAll(".b-product-assortment-carousel")).toHaveLength(1);
	});

	it("should render admin message when no content and isAdmin", () => {
		useContent.mockReturnValue([]);
		useFusionContext.mockReturnValue({
			isAdmin: true,
		});

		render(<ProductAssortmentCarousel />);

		expect(
			screen.queryByText(
				"This feature requires a minimum of 4 products and a maximum of 12 to display.",
			),
		).not.toBeNull();
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
		const { queryAllByTestId } = render(
			<ProductAssortmentCarousel customFields={{ headerText: "Header" }} />,
		);

		const priceItemsContainer = queryAllByTestId("price");

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
		const { queryAllByTestId } = render(
			<ProductAssortmentCarousel customFields={{ headerText: "Header" }} />,
		);

		const priceItemsContainer = queryAllByTestId("price");

		expect(priceItemsContainer.length).toBe(5);

		expect(priceItemsContainer[0].querySelector(".c-price__list")).toHaveTextContent("$26");
		expect(priceItemsContainer[0].querySelector(".c-price__sale")).not.toBeInTheDocument();
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

		const { queryAllByTestId } = render(
			<ProductAssortmentCarousel customFields={{ headerText: "Header" }} />,
		);
		const priceItemsContainer = queryAllByTestId("price");

		expect(priceItemsContainer[0].querySelector(".c-price__list")).toHaveTextContent("$26");
		expect(priceItemsContainer[0].querySelector(".c-price__sale")).toHaveTextContent("$16");
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
		const { queryAllByTestId } = render(
			<ProductAssortmentCarousel customFields={{ headerText: "Header" }} />,
		);

		const priceItemsContainer = queryAllByTestId("price");

		expect(priceItemsContainer[0].querySelector(".c-price__list")).toHaveTextContent("$26");
		expect(priceItemsContainer[0].querySelector(".c-price__sale")).not.toBeInTheDocument();
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

		expect(screen.queryAllByRole("img").length).toBe(4);
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

		expect(screen.queryAllByRole("img").length).toBe(3);
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
		const { container } = render(
			<ProductAssortmentCarousel customFields={{ headerText: "Header" }} />,
		);
		expect(container.querySelectorAll("a")[0]).toHaveAttribute("href", mockUrl);
		expect(container.querySelectorAll("a")[1]).toHaveAttribute("href", "#");
		expect(container.querySelectorAll("a")[2]).toHaveAttribute("href", "#");
		expect(container.querySelectorAll("a")[3]).toHaveAttribute("href", "#");
	});
});
