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
				content_elements: [{ url }],
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

	it("should build the correct url", async () => {
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

	it("should build the correct url with only hierarchy", async () => {
		const contentSourceFetch = await contentSource.fetch(
			{
				hierarchy: "footer",
				"arc-site": "the-site",
			},
			{ cachedCall: () => {} }
		);

		expect(contentSourceFetch.request.url.searchObject).toEqual(
			expect.objectContaining({
				hierarchy: "footer",
			})
		);
	});

	it("should build the correct url with only sectionId", async () => {
		const contentSourceFetch = await contentSource.fetch(
			{
				sectionId: "/sports",
				"arc-site": "the-site",
			},
			{ cachedCall: () => {} }
		);

		expect(contentSourceFetch.request.url.searchObject).toEqual(
			expect.objectContaining({
				_id: "/sports",
			})
		);
	});

	it("should build the correct url without anything", async () => {
		const contentSourceFetch = await contentSource.fetch(
			{
				"arc-site": "the-site",
			},
			{ cachedCall: () => {} }
		);

		expect(contentSourceFetch.request.url.searchObject).toEqual({});
	});

	it("when a hierarchy and sectionId are provided it should return data", () => {
		const data = contentSource.transform(
			{ _id: "/" },
			{ hierarchy: "hierarchy", sectionId: "/sectionId" }
		);

		expect(data._id).toEqual("/");
	});

	it("when a hierarchy is provided and no sectionId", () => {
		const data = contentSource.transform(
			{ _id: "/" },
			{ hierarchy: "links-bar", uri: "/test/test" }
		);

		expect(data._id).toEqual("/");
	});

	it("when a hierarchy is not provided and sectionId is provided that matches the API data then the data is returned", () => {
		const data = contentSource.transform(
			{ _id: "/sectionId" },
			{ hierarchy: "", sectionId: "/sectionId" }
		);

		expect(data._id).toEqual("/sectionId");
	});

	it("when a hierarchy is not provided and sectionId is provided that does not match the API data a 404 is thrown", async () => {
		await expect(() =>
			contentSource.transform({ _id: "/" }, { hierarchy: "", sectionId: "/sectionId" })
		).rejects.toEqual(new Error("Not found"));
	});

	it("when a uri does not match section a 404 is thrown", async () => {
		await expect(() =>
			contentSource.transform({ _id: "/" }, { hierarchy: "", sectionId: "/sectionId", uri: "/" })
		).rejects.toEqual(new Error("Not found"));
	});

	it("when uri and section match return data", () => {
		const data = contentSource.transform(
			{ _id: "/sectionId" },
			{ hierarchy: "hierarchy", sectionId: "/sectionId", uri: "/sectionId" }
		);

		expect(data._id).toEqual("/sectionId");
	});
});
