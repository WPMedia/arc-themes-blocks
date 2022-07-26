import testImageURL from "../../resources/camera.jpg";

// eslint-disable-next-line import/prefer-default-export
export const algoliaProductMock = [
	{
		name: "Item 1",
		image: testImageURL,
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
		image: testImageURL,
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
		image: testImageURL,
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
		image: testImageURL,
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
	{
		image: testImageURL,
		sku: "sku-5",
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
		name: "Item 6",
		image: testImageURL,
		sku: "sku-6",
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
	},
];
