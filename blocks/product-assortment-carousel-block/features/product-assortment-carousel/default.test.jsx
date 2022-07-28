import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";

import ProductAssortmentCarousel from "./default";

const mockContent = [
	{
		name: "Item 1",
		image: "image-url",
		sku: "sku-1",
		prices: [
			{
				amount: 26,
				type: "List",
				currencyLocale: "en-US",
				currencyCode: "USD",
			},
		],
		attributes: [
			{
				name: "product_url",
				value: "a-url",
			},
		],
	},
	{
		name: "Item 2",
		image: "image-url",
		sku: "sku-2",
		prices: [
			{
				amount: 16,
				type: "Sale",
				currencyLocale: "en-US",
				currencyCode: "USD",
			},
			{
				amount: 26,
				type: "List",
				currencyLocale: "en-US",
				currencyCode: "USD",
			},
		],
	},
	{
		name: "Item 3",
		image: "image-url",
		sku: "sku-3",
		prices: [
			{
				amount: 26,
				type: "List",
				currencyLocale: "en-US",
				currencyCode: "USD",
			},
		],
	},
	{
		image: "image-url",
		sku: "sku-4",
		prices: [
			{
				amount: 26,
				type: "List",
				currencyLocale: "en-US",
				currencyCode: "USD",
			},
		],
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
			0
		);
		expect(container.querySelectorAll(".b-product-assortment-carousel")).toHaveLength(1);
	});

	it("should render with header content", () => {
		useContent.mockReturnValue(mockContent);
		const { container } = render(
			<ProductAssortmentCarousel customFields={{ headerText: "Header" }} />
		);

		expect(container.querySelectorAll(".b-product-assortment-carousel__main-title")).toHaveLength(
			1
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
				"This feature requires a minimum of 4 products and a maximum of 12 to display."
			)
		).not.toBeNull();
	});

	it("should render list price only when no sale price", () => {
		useContent.mockReturnValue([
			{
				name: "List Price Render",
				image: "image-url",
				sku: "sku-mock",
				prices: [
					{
						amount: 26,
						type: "List",
						currencyLocale: "en-US",
						currencyCode: "USD",
					},
				],
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
			<ProductAssortmentCarousel customFields={{ headerText: "Header" }} />
		);

		const priceItemsContainer = queryAllByTestId("price");

		expect(priceItemsContainer[0].querySelector(".c-price__list")).toHaveTextContent("$26");
		expect(priceItemsContainer[0].querySelector(".c-price__sale")).not.toBeInTheDocument();
	});

	it("should render list price and sale price when both exist and differ", () => {
		useContent.mockReturnValue([
			{
				name: "List + Sale Price Render",
				image: "image-url",
				sku: "sku-mock",
				prices: [
					{
						amount: 16,
						type: "Sale",
						currencyLocale: "en-US",
						currencyCode: "USD",
					},
					{
						amount: 26,
						type: "List",
						currencyLocale: "en-US",
						currencyCode: "USD",
					},
				],
			},
			...mockContent,
		]);

		const { queryAllByTestId } = render(
			<ProductAssortmentCarousel customFields={{ headerText: "Header" }} />
		);
		const priceItemsContainer = queryAllByTestId("price");

		expect(priceItemsContainer[0].querySelector(".c-price__list")).toHaveTextContent("$26");
		expect(priceItemsContainer[0].querySelector(".c-price__sale")).toHaveTextContent("$16");
	});

	it("should render list price only when sale price is the same", () => {
		useContent.mockReturnValue([
			{
				name: "List Price Render",
				image: "image-url",
				sku: "sku-mock",
				prices: [
					{
						amount: 26,
						type: "Sale",
						currencyLocale: "en-US",
						currencyCode: "USD",
					},
					{
						amount: 26,
						type: "List",
						currencyLocale: "en-US",
						currencyCode: "USD",
					},
				],
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
			<ProductAssortmentCarousel customFields={{ headerText: "Header" }} />
		);

		const priceItemsContainer = queryAllByTestId("price");

		expect(priceItemsContainer[0].querySelector(".c-price__list")).toHaveTextContent("$26");
		expect(priceItemsContainer[0].querySelector(".c-price__sale")).not.toBeInTheDocument();
	});

	it("should generate product URL", () => {
		const mockUrl = "a-url";
		useContent.mockReturnValue([
			{
				name: "Has product_url attribute",
				image: "image-url",
				sku: "sku-1",
				prices: [
					{
						amount: 26,
						type: "List",
						currencyLocale: "en-US",
						currencyCode: "USD",
					},
				],
				attributes: [
					{
						name: "product_url",
						value: mockUrl,
					},
				],
			},
			{
				name: "Has no product_url attribute",
				image: "image-url",
				sku: "sku-2",
				prices: [
					{
						amount: 26,
						type: "List",
						currencyLocale: "en-US",
						currencyCode: "USD",
					},
				],
				attributes: [
					{
						name: "unrelated_field",
						value: "unrelated value",
					},
				],
			},
			{
				name: "Has empty attribute array",
				image: "image-url",
				sku: "sku-3",
				prices: [
					{
						amount: 26,
						type: "List",
						currencyLocale: "en-US",
						currencyCode: "USD",
					},
				],
				attributes: [],
			},
			{
				name: "Has no attribute key",
				image: "image-url",
				sku: "sku-4",
				prices: [
					{
						amount: 26,
						type: "List",
						currencyLocale: "en-US",
						currencyCode: "USD",
					},
				],
			},
		]);
		const { container } = render(
			<ProductAssortmentCarousel customFields={{ headerText: "Header" }} />
		);
		expect(container.querySelectorAll("a")[0]).toHaveAttribute("href", mockUrl);
		expect(container.querySelectorAll("a")[1]).toHaveAttribute("href", "#");
		expect(container.querySelectorAll("a")[2]).toHaveAttribute("href", "#");
		expect(container.querySelectorAll("a")[3]).toHaveAttribute("href", "#");
	});
});
