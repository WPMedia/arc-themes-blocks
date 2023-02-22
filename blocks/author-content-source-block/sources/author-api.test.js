import contentSource from "./author-api";

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

describe("the author api content source block", () => {
	it("should use the proper param types", () => {
		expect(contentSource.params).toEqual({
			slug: "text",
		});
	});

	it("should build the correct url", async () => {
		const contentSourceFetch = await contentSource.fetch(
			{
				slug: "slug",
				"arc-site": "the-site",
			},
			{ cachedCall: () => {} }
		);

		expect(contentSourceFetch.request.url.hostname).toEqual("content.base");
		expect(contentSourceFetch.request.url.pathname).toEqual("/author/v2/author-service");
		expect(contentSourceFetch.request.url.searchObject).toEqual(
			expect.objectContaining({ slug: "slug" })
		);
	});
});
