import React from "react";
import { ProductInformationDisplay } from "./features/product-information/default";

// for more info on storybook and using the component explorer
// https://storybook.js.org/
export default {
	title: "Blocks/Product Information",
	parameters: {
		chromatic: { viewports: [320, 1200] },
		cssVariables: {
			theme: "commerce",
		},
	},
};

const mockPrice = {
	currencyCode: "USD",
	currencyDisplayFormat: "symbol",
	currencyLocale: "en-US",
	schema: {},
	prices: [
		{
			type: "List",
			amount: "59.00",
		},
		{
			type: "Sale",
			amount: "49.00",
		},
	],
};

const mockSamePrice = {
	currencyCode: "USD",
	currencyDisplayFormat: "symbol",
	currencyLocale: "en-US",
	schema: {},
	prices: [
		{
			type: "List",
			amount: "49.00",
		},
		{
			type: "Sale",
			amount: "49.00",
		},
	],
};

const mockListPrice = {
	currencyCode: "USD",
	currencyDisplayFormat: "symbol",
	currencyLocale: "en-US",
	schema: {},
	prices: [
		{
			type: "List",
			amount: "59.00",
		},
	],
};
const mockData = {
	name: "Crocker Sandals",
	pricing: [mockPrice],
};

export const TitleAndPricing = () => <ProductInformationDisplay data={mockData} />;

export const TitleOnly = () => <ProductInformationDisplay data={{ name: "Crocker Sandals" }} />;

export const ListsPriceOnly = () => (
	<ProductInformationDisplay data={{ pricing: [mockListPrice] }} />
);

export const saleAndListPriceSame = () => (
	<ProductInformationDisplay data={{ pricing: [mockSamePrice] }} />
);
