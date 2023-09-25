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
		if (request.url.includes("404Mode")) {
			return Promise.resolve({
				data: {
					authors: [],
					request: {
						...request,
						url,
					},
				},
			});
		}
		return Promise.resolve({
			data: {
				authors: [{ _id: "test-author" }],
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
		expect(contentSource.params).toEqual([
			{
				displayName: "slug",
				name: "slug",
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

	it("should throw a 404 if no authors are returned", async () => {
		await expect(
			contentSource.fetch(
				{
					slug: "404Mode",
				},
				{ cachedCall: () => {} }
			)
		).rejects.toEqual(new Error("Not found"));
	});
});
