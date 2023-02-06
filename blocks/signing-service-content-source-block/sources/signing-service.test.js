import contentSource from "./signing-service";

jest.mock("fusion:environment", () => ({
	CONTENT_BASE: "",
	SIGNING_SERVICE_DEFAULT_APP: "resizer",
	SIGNING_SERVICE_DEFAULT_VERSION: 1,
}));

jest.mock("axios", () => ({
	__esModule: true,
	default: jest.fn((data) => Promise.resolve({ data })),
}));

describe("Test Signing Service content source", () => {
	it("should build the correct url", async () => {
		const key = {
			id: "test-id",
		};
		const contentSourceRequest = await contentSource.fetch(key);

		expect(contentSourceRequest.url).toEqual(`/signing-service/v2/sign/resizer/1?value=test-id`);
	});
});
