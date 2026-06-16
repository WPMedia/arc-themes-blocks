import getItemDetails from "./itemDetails";

const originalFetch = global.fetch;

const samplePricingStrategy = {
	pricingStrategy: {
		name: "Monthly Plan",
		description: "<p>$10/month</p>",
		summary: "<p>Pay monthly</p>",
		rates: [{ amount: "10.00", billingFrequency: "Month" }],
		taxInclusive: false,
	},
};

const sampleProduct = {
	description: "<p>Access to all content</p>",
	attributes: [
		{ id: "feat1", value: "<p>Feature 1</p>" },
		{ id: "feat2", value: "<p>Feature 2</p>" },
	],
};

describe("getItemDetails", () => {
	beforeEach(() => {
		global.fetch = jest.fn((url) => {
			if (url.includes("paymentInfo")) {
				return Promise.resolve({ json: () => Promise.resolve(samplePricingStrategy) });
			}
			return Promise.resolve({ json: () => Promise.resolve(sampleProduct) });
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
		global.fetch = originalFetch;
	});

	it("enriches items with pricing strategy data", async () => {
		const items = [{ priceCode: "ABC123", sku: "premium" }];
		const result = await getItemDetails("https://api.example.com", items);
		expect(result[0].priceName).toBe("Monthly Plan");
		expect(result[0].priceDescription).toBe("<p>$10/month</p>");
	});

	it("enriches items with product data", async () => {
		const items = [{ priceCode: "ABC123", sku: "premium" }];
		const result = await getItemDetails("https://api.example.com", items);
		expect(result[0].productDescription).toBe("<p>Access to all content</p>");
		expect(result[0].productAttributes).toHaveLength(2);
		expect(result[0].productAttributes[0].featureText).toBe("<p>Feature 1</p>");
	});

	it("handles product with empty attributes array", async () => {
		global.fetch = jest.fn((url) => {
			if (url.includes("paymentInfo")) {
				return Promise.resolve({ json: () => Promise.resolve(samplePricingStrategy) });
			}
			return Promise.resolve({
				json: () => Promise.resolve({ description: "<p>desc</p>", attributes: [] }),
			});
		});
		const items = [{ priceCode: "ABC123", sku: "premium" }];
		const result = await getItemDetails("https://api.example.com", items);
		expect(result[0].productAttributes).toEqual([]);
	});

	it("handles product with undefined attributes", async () => {
		global.fetch = jest.fn((url) => {
			if (url.includes("paymentInfo")) {
				return Promise.resolve({ json: () => Promise.resolve(samplePricingStrategy) });
			}
			return Promise.resolve({
				json: () => Promise.resolve({ description: "<p>desc</p>" }),
			});
		});
		const items = [{ priceCode: "ABC123", sku: "premium" }];
		const result = await getItemDetails("https://api.example.com", items);
		expect(result[0].productAttributes).toEqual([]);
	});

	it("handles multiple items", async () => {
		const items = [
			{ priceCode: "ABC123", sku: "premium" },
			{ priceCode: "DEF456", sku: "basic" },
		];
		const result = await getItemDetails("https://api.example.com", items);
		expect(result).toHaveLength(2);
	});
});
