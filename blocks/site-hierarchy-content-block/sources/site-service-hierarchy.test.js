import contentSource from "./site-service-hierarchy";

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
				_id: "/sports",
				request: {
					...request,
					url,
				},
			},
		});
	}),
}));

describe("the site-service-hierarchy content source block", () => {
	it("should use the proper param types", () => {
		expect(contentSource.params).toEqual({
			hierarchy: "text",
			sectionId: "text",
		});
	});

	it("should return the correct data", async () => {
		const contentSourceFetch = await contentSource.fetch(
			{
				hierarchy: "footer",
				sectionId: "/sports",
				"arc-site": "the-site",
			},
			{ cachedCall: () => {} }
		);

		expect(contentSourceFetch.request.url.hostname).toEqual("content.base");
		expect(contentSourceFetch.request.url.pathname).toEqual("/site/v3/navigation/the-site");
		expect(contentSourceFetch.request.url.searchObject).toEqual(
			expect.objectContaining({
				hierarchy: "footer",
				_id: "/sports",
			})
		);
	});

	it("should return data if only hierarchy is provided", async () => {
		const contentSourceFetch = await contentSource.fetch(
			{
				hierarchy: "footer",
				"arc-site": "the-site",
			},
			{ cachedCall: () => {} }
		);

		expect(contentSourceFetch.request.url.pathname).toEqual("/site/v3/navigation/the-site");
		expect(contentSourceFetch.request.url.searchObject).toEqual(
			expect.objectContaining({
				hierarchy: "footer",
			})
		);
	});

	it("should throw a 404 if only sectionId is provided", async () => {
		const contentSourceFetch = await contentSource.fetch(
			{
				sectionId: "/sports",
				"arc-site": "the-site",
			},
			{ cachedCall: () => {} }
		);

		expect(contentSourceFetch.request.url.pathname).toEqual("/site/v3/navigation/the-site");
		expect(contentSourceFetch.request.url.searchObject).toEqual(
			expect.objectContaining({
				_id: "/sports",
			})
		);
	});

	it("should throw a 404 when a hierarchy is provided and sectionId is provided that does not match the API data", async () => {
		await expect(() =>
			contentSource.fetch({ hierarchy: "", sectionId: "/sectionIdTest" })
		).rejects.toEqual(new Error("Not found"));
	});
});
