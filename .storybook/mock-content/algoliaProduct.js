const IMAGE_OBJECT = {
	alt_text: "",
	_id: "EM5DTGYGABDJZODV7YVFOC2DOM",
	auth: {
		2: "75f6b4c64c7889dc8eadf6a328999d522be2e2397c7b9a5a0704f6d9afa60fcf",
	},
	url: "https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/EM5DTGYGABDJZODV7YVFOC2DOM.jpeg",
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

// eslint-disable-next-line import/prefer-default-export
export const algoliaProductMock = [
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
	{
		schema: FEATURED_IMAGE_SCHEMA,
		sku: "sku-5",
		pricing: PRICING_ARRAY_ONLY_LIST,
	},
	{
		name: "Item 6",
		schema: FEATURED_IMAGE_SCHEMA,
		sku: "sku-6",
		pricing: PRICING_ARRAY_SAME_LIST_SALE,
	},
];
