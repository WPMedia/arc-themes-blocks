import testImageURL from "../../resources/camera.jpg";

const PRICING_ARRAY_ONLY_LIST = [
	{
		id: null,
		currencyCode: "USD",
		currencyDisplayFormat: "symbol",
		currencyLocale: "en-US",
		prices: [
			{
				id: 70076,
				type: "List",
				amount: 26,
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
				id: 70076,
				type: "List",
				amount: 26,
			},
			{
				id: 70076,
				type: "Sale",
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
				id: 70076,
				type: "List",
				amount: 26,
			},
			{
				id: 70076,
				type: "Sale",
				amount: 16,
			},
		],
		schema: {},
	},
];

// eslint-disable-next-line import/prefer-default-export
export const algoliaProductMock = [
	{
		name: "Item 1",
		image: testImageURL,
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
		image: testImageURL,
		sku: "sku-2",
		pricing: PRICING_ARRAY_DIFFERENT_LIST_SALE,
	},
	{
		name: "Item 3",
		image: testImageURL,
		sku: "sku-3",
		pricing: PRICING_ARRAY_ONLY_LIST,
	},
	{
		image: testImageURL,
		sku: "sku-4",
		pricing: PRICING_ARRAY_ONLY_LIST,
	},
	{
		image: testImageURL,
		sku: "sku-5",
		pricing: PRICING_ARRAY_ONLY_LIST,
	},
	{
		name: "Item 6",
		image: testImageURL,
		sku: "sku-6",
		pricing: PRICING_ARRAY_SAME_LIST_SALE,
	},
];
