import contentSource from "./tags-api";

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
					Payload: [],
					request: {
						...request,
						url,
					},
				},
			});
		}

		return Promise.resolve({
			data: {
				Payload: [{ slug: "/foo" }],
				request: {
					...request,
					url,
				},
			},
		});
	}),
}));

describe("the tags content source block", () => {
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
				slug: "dogs",
			},
			{ cachedCall: () => {} }
		);

		expect(contentSourceFetch.request.url.hostname).toEqual("content.base");
		expect(contentSourceFetch.request.url.pathname).toEqual("/tags/v2/slugs");
		expect(contentSourceFetch.request.url.searchObject).toEqual(
			expect.objectContaining({ slugs: "dogs" })
		);
	});

	it("should build the correct url without the slug", async () => {
		const contentSourceFetch = await contentSource.fetch({}, { cachedCall: () => {} });

		expect(contentSourceFetch.request.url.searchObject).toEqual(
			expect.objectContaining({ slugs: "" })
		);
	});

	it("must return an error if api returns nothing", async () => {
		await expect(
			contentSource.fetch(
				{
					slug: "404Mode",
				},
				{ cachedCall: () => {} }
			)
		).rejects.toEqual(new Error("An error occured creating the request."));
	});
});
