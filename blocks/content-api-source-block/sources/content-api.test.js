import contentApi from "./content-api";

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

describe("the content api source block", () => {
	it("should use the proper param types", () => {
		expect(contentApi.params).toEqual({
			_id: "text",
			"arc-site": "text",
			website_url: "text",
		});
	});

	describe("when a site is provided", () => {
		it('should include the "website" query param with the value', async () => {
			const contentSourceFetch = await contentApi.fetch(
				{
					"arc-site": "wapo",
					website_url: "/aaaa/bccccd/",
				},
				{ cachedCall: () => {} }
			);

			expect(contentSourceFetch.request.url.pathname).toEqual("/content/v4/");
			expect(contentSourceFetch.request.url.searchObject).toEqual(
				expect.objectContaining({
					website: "wapo",
					website_url: "/aaaa/bccccd/",
				})
			);
		});
	});

	describe("when a site is NOT provided but a website url is ", () => {
		it('should NOT include the "website" query param', async () => {
			const contentSourceFetch = await contentApi.fetch(
				{
					website_url: "/aaaa/bccccd/",
				},
				{ cachedCall: () => {} }
			);

			expect(contentSourceFetch.request.url.pathname).toEqual("/content/v4/");
			expect(contentSourceFetch.request.url.searchObject).toEqual(
				expect.objectContaining({
					website_url: "/aaaa/bccccd/",
				})
			);
		});
	});

	describe("when an _id is provided", () => {
		it("should set the _id query param", async () => {
			const contentSourceFetch = await contentApi.fetch(
				{
					_id: "myid",
				},
				{ cachedCall: () => {} }
			);

			expect(contentSourceFetch.request.url.pathname).toEqual("/content/v4/");
			expect(contentSourceFetch.request.url.searchObject).toEqual(
				expect.objectContaining({
					_id: "myid",
				})
			);
		});
	});

	describe("when an _id and website_url are both provided", () => {
		it("should set the _id query param", async () => {
			const contentSourceFetch = await contentApi.fetch(
				{
					_id: "myid",
					website_url: "/aaaa/eeeeee/",
				},
				{ cachedCall: () => {} }
			);

			expect(contentSourceFetch.request.url.pathname).toEqual("/content/v4/");
			expect(contentSourceFetch.request.url.searchObject).toEqual(
				expect.objectContaining({
					_id: "myid",
					website_url: "/aaaa/eeeeee/",
				})
			);
		});
	});

	describe("when a website url is and an id are NOT provided", () => {
		it("should have an undefined website_url", async () => {
			const contentSourceFetch = await contentApi.fetch({}, { cachedCall: () => {} });

			expect(contentSourceFetch.request.url.pathname).toEqual("/content/v4/");
			expect(contentSourceFetch.request.url.searchObject).toEqual(
				expect.objectContaining({
					website_url: "undefined",
				})
			);
		});
	});
});
