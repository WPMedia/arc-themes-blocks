import contentSource from "./search-api";

jest.mock("fusion:environment", () => ({
	CONTENT_BASE: "https://content.base",
	searchKey: "ABCDEF",
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

describe("the search content source block", () => {
	it("should use the proper param types", () => {
		expect(contentSource.params).toEqual({
			_id: "text",
			"arc-site": "text",
			page: "text",
			query: "text",
		});
	});

	describe("when a query is provided", () => {
		it("should build the correct url", async () => {
			const contentSourceFetch = await contentSource.fetch(
				{
					query: "test",
					"arc-site": "the-sun",
				},
				{ cachedCall: () => {} }
			);

			expect(contentSourceFetch.request.url.hostname).toEqual("search.arcpublishing.com");
			expect(contentSourceFetch.request.url.pathname).toEqual("/search");
			expect(contentSourceFetch.request.url.searchObject).toEqual(
				expect.objectContaining({
					key: "ABCDEF",
					page: "1",
					q: "test",
					website_id: "the-sun",
				})
			);
		});

		it("should encode the query value", async () => {
			const contentSourceFetch = await contentSource.fetch(
				{
					query: "vidèo",
					"arc-site": "the-sun",
				},
				{ cachedCall: () => {} }
			);

			expect(contentSourceFetch.request.url.searchObject).toEqual(
				expect.objectContaining({
					key: "ABCDEF",
					page: "1",
					q: "vid%C3%A8o",
					website_id: "the-sun",
				})
			);
		});
	});

	describe("when a page number is provided", () => {
		it("should build the a url with the provided page number", async () => {
			const contentSourceFetch = await contentSource.fetch(
				{
					page: "3",
					query: "test",
					"arc-site": "the-sun",
				},
				{ cachedCall: () => {} }
			);

			expect(contentSourceFetch.request.url.searchObject).toEqual(
				expect.objectContaining({
					key: "ABCDEF",
					page: "3",
					q: "test",
					website_id: "the-sun",
				})
			);
		});
	});

	describe("when a query is NOT provided", () => {
		it("should not build a url", async () => {
			const contentSourceFetch = await contentSource.fetch(
				{
					page: "3",
					"arc-site": "the-sun",
				},
				{ cachedCall: () => {} }
			);

			expect(contentSourceFetch.request?.url).toBeUndefined();
		});
	});

	describe("when a site is not provided", () => {
		it("should not build a url with a website_url", async () => {
			const contentSourceFetch = await contentSource.fetch(
				{
					query: "test",
				},
				{ cachedCall: () => {} }
			);

			expect(contentSourceFetch.request.url.searchObject).toEqual(
				expect.objectContaining({
					key: "ABCDEF",
					page: "1",
					q: "test",
				})
			);
		});
	});
});
