import contentSource from "./schema-item";

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
				data: null,
			});
		}
		return Promise.resolve({
			data: {
				_id: "test-doc",
				type: "story",
				request: {
					...request,
					url,
				},
			},
		});
	}),
}));

describe("the custom schema item content source block", () => {
	it("should use the proper param types", () => {
		expect(contentSource.params).toEqual([
			{
				displayName: "Document ID",
				name: "id",
				type: "text",
			},
			{
				displayName: "Website URL",
				name: "website_url",
				type: "text",
			},
			{
				displayName: "Schema Name",
				name: "schemaName",
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

	it("should use the proper schema name", () => {
		expect(contentSource.schemaName).toEqual("ans-item");
	});

	it("should have the correct ttl", () => {
		expect(contentSource.ttl).toEqual(300);
	});

	describe("when id and schemaName are provided with arc-site", () => {
		it("should build the correct url", async () => {
			const contentSourceFetch = await contentSource.fetch(
				{
					id: "ABC123",
					schemaName: "my-schema",
					"arc-site": "the-site",
				},
				{ cachedCall: () => {} }
			);

			expect(contentSourceFetch.request.url.pathname).toEqual(
				"/content/v5/search/schemas/by-id/"
			);
			expect(contentSourceFetch.request.url.searchObject).toEqual(
				expect.objectContaining({
					id: "ABC123",
					schema_name: "my-schema",
					website: "the-site",
				})
			);
		});
	});

	describe("when arc-site is not provided", () => {
		it("should fall back to arcSite from context", async () => {
			const contentSourceFetch = await contentSource.fetch(
				{
					id: "ABC123",
					schemaName: "my-schema",
				},
				{ cachedCall: () => {}, arcSite: "context-site" }
			);

			expect(contentSourceFetch.request.url.searchObject).toEqual(
				expect.objectContaining({
					website: "context-site",
				})
			);
		});
	});

	describe("when website_url and schemaName are provided with arc-site", () => {
		it("should build the correct by-url url", async () => {
			const contentSourceFetch = await contentSource.fetch(
				{
					website_url: "/2020/01/17/this-is-a-story/",
					schemaName: "my-schema",
					"arc-site": "the-site",
				},
				{ cachedCall: () => {} }
			);

			expect(contentSourceFetch.request.url.pathname).toEqual(
				"/content/v5/search/schemas/by-url/"
			);
			expect(contentSourceFetch.request.url.searchObject).toEqual(
				expect.objectContaining({
					url: "/2020/01/17/this-is-a-story/",
					schema_name: "my-schema",
					website: "the-site",
				})
			);
		});
	});

	describe("when both id and website_url are provided", () => {
		it("should prefer the by-id lookup", async () => {
			const contentSourceFetch = await contentSource.fetch(
				{
					id: "ABC123",
					website_url: "/2020/01/17/this-is-a-story/",
					schemaName: "my-schema",
					"arc-site": "the-site",
				},
				{ cachedCall: () => {} }
			);

			expect(contentSourceFetch.request.url.pathname).toEqual(
				"/content/v5/search/schemas/by-id/"
			);
			expect(contentSourceFetch.request.url.searchObject).toEqual(
				expect.objectContaining({
					id: "ABC123",
				})
			);
			expect(contentSourceFetch.request.url.searchObject).not.toHaveProperty("url");
		});
	});

	describe("when neither id nor website_url is provided", () => {
		it("should return empty string", async () => {
			const contentSourceFetch = await contentSource.fetch(
				{
					schemaName: "my-schema",
					"arc-site": "the-site",
				},
				{ cachedCall: () => {} }
			);

			expect(contentSourceFetch).toEqual("");
		});
	});

	describe("when schemaName is not provided", () => {
		it("should return empty string", async () => {
			const contentSourceFetch = await contentSource.fetch(
				{
					id: "ABC123",
					"arc-site": "the-site",
				},
				{ cachedCall: () => {} }
			);

			expect(contentSourceFetch).toEqual("");
		});
	});

	describe("when no site is available from either source", () => {
		it("should return empty string", async () => {
			const contentSourceFetch = await contentSource.fetch(
				{
					id: "ABC123",
					schemaName: "my-schema",
				},
				{ cachedCall: () => {} }
			);

			expect(contentSourceFetch).toEqual("");
		});
	});

	describe("when document is not found", () => {
		it("should throw a 404 error", async () => {
			await expect(
				contentSource.fetch(
					{
						id: "404Mode",
						schemaName: "my-schema",
						"arc-site": "the-site",
					},
					{ cachedCall: () => {} }
				)
			).rejects.toEqual(new Error("Document not found"));
		});
	});

	it("should trim whitespace from id and schemaName", async () => {
		const contentSourceFetch = await contentSource.fetch(
			{
				id: "  ABC123  ",
				schemaName: "  my-schema  ",
				"arc-site": "the-site",
			},
			{ cachedCall: () => {} }
		);

		expect(contentSourceFetch.request.url.searchObject).toEqual(
			expect.objectContaining({
				id: "ABC123",
				schema_name: "my-schema",
			})
		);
	});
});
