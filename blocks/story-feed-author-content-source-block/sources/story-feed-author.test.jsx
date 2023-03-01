import contentSource from "./story-feed-author";

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

describe("story-feed-author-content-source-block", () => {
	it("should use the proper param types", () => {
		expect(contentSource.params).toEqual([
			{
				displayName: "authorSlug",
				name: "authorSlug",
				type: "text",
			},
			{
				displayName: "feedOffset",
				name: "feedOffset",
				type: "number",
			},
			{
				displayName: "feedSize",
				name: "feedSize",
				type: "number",
			},
			{
				default: "2",
				displayName: "Themes Version",
				name: "themes",
				type: "text",
			},
		]);
	});

	it("should build the correct url", async () => {
		const contentSourceFetch = await contentSource.fetch(
			{
				authorSlug: "slug",
				feedOffset: 4,
				feedSize: 3,
				"arc-site": "the-site",
			},
			{ cachedCall: () => {} }
		);

		expect(contentSourceFetch.request.url.hostname).toEqual("content.base");
		expect(contentSourceFetch.request.url.pathname).toEqual("/content/v4/search/published");
		expect(contentSourceFetch.request.url.searchObject).toEqual(
			expect.objectContaining({
				from: "4",
				q: 'credits.by.slug:"slug"',
				sort: "display_date:desc",
				size: "3",
				website: "the-site",
			})
		);
	});

	it("should default size to 8 and offset to 0", async () => {
		const contentSourceFetch = await contentSource.fetch(
			{
				authorSlug: "slug",
				"arc-site": "the-site",
			},
			{ cachedCall: () => {} }
		);

		expect(contentSourceFetch.request.url.searchObject).toEqual(
			expect.objectContaining({
				from: "0",
				q: 'credits.by.slug:"slug"',
				sort: "display_date:desc",
				size: "8",
				website: "the-site",
			})
		);
	});
});
