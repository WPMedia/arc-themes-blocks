import contentSource from "./content-api-unpublished";

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

describe("the unpublished content source block", () => {
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

	describe("when an id is provided", () => {
		it("should build the correct url", async () => {
			const contentSourceFetch = await contentSource.fetch(
				{
					_id: "test",
					"arc-site": "bbbbb-ccccc",
				},
				{ cachedCall: () => {} }
			);

			expect(contentSourceFetch.request.url.pathname).toEqual("/content/v4/");
			expect(contentSourceFetch.request.url.searchObject).toEqual(
				expect.objectContaining({
					_id: "test",
					published: "false",
					website: "bbbbb-ccccc",
				})
			);
		});
	});

	describe("when an id and website are NOT provided", () => {
		it("should not build a url with an id and website", async () => {
			const contentSourceFetch = await contentSource.fetch({}, { cachedCall: () => {} });

			expect(contentSourceFetch.request.url.pathname).toEqual("/content/v4/");
			expect(contentSourceFetch.request.url.searchObject).toEqual(
				expect.objectContaining({
					_id: "undefined",
					published: "false",
					website: "undefined",
				})
			);
		});
	});
});
