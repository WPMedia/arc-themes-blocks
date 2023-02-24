import contentSource from "./related-content";

jest.mock("fusion:environment", () => ({
	CONTENT_BASE: "https://content.base",
}));

jest.mock("axios", () => ({
	__esModule: true,
	default: jest.fn((request) => {
		const requestUrl = new URL(request.url);
		const url = {
			hostname: requestUrl.hostname,
			pathname: requestUrl.pathname,
			searchObject: Object.fromEntries(requestUrl.searchParams),
		};
		return Promise.resolve({
			data: {
				content_elements: [{ url }],
				request: {
					...request,
					url,
				},
			},
		});
	}),
}));

describe("the related-content content source block", () => {
	it("should use the proper param types", () => {
		expect(contentSource.params).toEqual([
			{
				displayName: "_id",
				name: "_id",
				type: "text",
			},
			{
				default: "2",
				displayName: "Themes Version",
				name: "themes",
				type: "text",
			},
		]);
	});

	it("should use the proper schema", () => {
		expect(contentSource.schemaName).toEqual("ans-feed");
	});

	it("should build the correct url", async () => {
		const contentSourceFetch = await contentSource.fetch(
			{
				_id: "test",
				"arc-site": "bbbbb-ccccc",
			},
			{ cachedCall: () => {} }
		);

		expect(contentSourceFetch.request.url.pathname).toEqual("/content/v4/related-content");
		expect(contentSourceFetch.request.url.searchObject).toEqual(
			expect.objectContaining({
				_id: "test",
				website: "bbbbb-ccccc",
			})
		);
	});

	it("should not build an url with missing id param", async () => {
		const contentSourceFetch = await contentSource.fetch(
			{
				_id: "test",
			},
			{ cachedCall: () => {} }
		);

		expect(contentSourceFetch.request?.url).toBeUndefined();
	});

	it("should not build an url with missing website param", async () => {
		const contentSourceFetch = await contentSource.fetch(
			{
				"arc-site": "test",
			},
			{ cachedCall: () => {} }
		);

		expect(contentSourceFetch.request?.url).toBeUndefined();
	});
});
