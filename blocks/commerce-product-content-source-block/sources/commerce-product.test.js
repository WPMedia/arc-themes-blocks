import contentSource from "./commerce-product";

jest.mock("fusion:environment", () => ({
	CONTENT_BASE: "",
}));

jest.mock("axios", () => ({
	__esModule: true,
	default: jest.fn((data) => Promise.resolve({ data })),
}));

describe("Test Commerce Product content source", () => {
	it("should build the correct url", async () => {
		const key = {
			"arc-site": "arc-site",
			sku: "test-sku",
		};
		const contentSourceRequest = await contentSource.fetch(key);

		expect(contentSourceRequest.url).toEqual(
			`/product/api/v1/product/sku/test-sku?website=${key["arc-site"]}`
		);
	});

	it("should tansform data", () => {
		const key = {
			"arc-site": "arc-site",
			sku: "test-sku",
		};
		const dataTransform = contentSource.transform(key);

		expect(dataTransform).toEqual(key);
	});
});
