import { mockProductData } from "./mock-data";

import contentSource from "./commerce-product";

jest.mock("fusion:environment", () => ({
	CONTENT_BASE: "",
}));

jest.mock("axios", () => ({
	__esModule: true,
	default: jest.fn((data) => Promise.resolve({ data })),
}));

describe("Test Commerce Product content source", () => {
	/* We can delete this once we replace mock data with API call */
	it("will return mock data", () => {
		const key = {
			"arc-site": "arc-site",
			slug: "test-slug",
		};
		const contentSourceRequest = contentSource.fetch(key);

		expect(contentSourceRequest).toMatchObject(mockProductData);
	});

	xit("should build the correct url", async () => {
		const key = {
			"arc-site": "arc-site",
			slug: "test-slug",
		};
		const contentSourceRequest = await contentSource.fetch(key);

		expect(contentSourceRequest.url).toEqual(
			`/-- API - ENDPOINT URI HERE --?website=${key["arc-site"]}`
		);
	});

	it("should tansform data", () => {
		const key = {
			"arc-site": "arc-site",
			slug: "test-slug",
		};
		const dataTransform = contentSource.transform(key);

		expect(dataTransform).toEqual(key);
	});
});
