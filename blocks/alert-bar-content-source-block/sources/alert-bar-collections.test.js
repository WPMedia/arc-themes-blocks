import contentSource from "./alert-bar-collections";

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
		if (request.url.includes("referent")) {
			return Promise.resolve({
				data: {
					content_elements: [{ _id: "valid" }, { referent: "ignoreMe" }],
				},
			});
		}

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
		expect(contentSource.params).toEqual([
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
				"arc-site": "the-site",
			},
			{ cachedCall: () => {} }
		);

		expect(contentSourceFetch.request.url.hostname).toEqual("content.base");
		expect(contentSourceFetch.request.url.pathname).toEqual("/content/v4/collections");
		expect(contentSourceFetch.request.url.searchObject).toEqual(
			expect.objectContaining({
				content_alias: "alert-bar",
				from: "0",
				published: "true",
				size: "1",
				website: "the-site",
			})
		);
	});

	it("should build the correct url when the site is not passed", async () => {
		const contentSourceFetch = await contentSource.fetch({}, { cachedCall: () => {} });

		expect(contentSourceFetch.request.url.searchObject).toEqual(
			expect.objectContaining({
				content_alias: "alert-bar",
				from: "0",
				published: "true",
				size: "1",
			})
		);
	});

	it("should remove the referent (unpublished) values", async () => {
		expect(
			await contentSource.fetch(
				{
					"arc-site": "referent-site",
				},
				{ cachedCall: () => {} }
			)
		).toEqual({
			content_elements: [{ _id: "valid" }],
		});
	});
});
