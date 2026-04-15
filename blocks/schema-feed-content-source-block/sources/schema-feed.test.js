import contentSource from "./schema-feed";

jest.mock("fusion:environment", () => ({
	CONTENT_BASE: "https://content.base",
	ARC_ACCESS_TOKEN: "test-token",
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
				content_elements: [{ type: "schema" }],
				request: {
					...request,
					url,
				},
			},
		});
	}),
}));

describe("the schema-feed content source block", () => {
	it("should use the proper param types", () => {
		expect(contentSource.params).toEqual([
			{
				displayName: "Schema Name",
				name: "schemaName",
				type: "text",
			},
			{
				displayName: "Sort By",
				name: "sortBy",
				type: "text",
			},
			{
				displayName: "Query",
				name: "query",
				type: "text",
			},
			{
				displayName: "Size",
				name: "size",
				type: "number",
				default: 25,
			},
			{
				displayName: "Page",
				name: "page",
				type: "number",
				default: 1,
			},
		]);
	});

	it("should export ttl of 300", () => {
		expect(contentSource.ttl).toEqual(300);
	});

	describe("when schemaName and arc-site are provided", () => {
		it("should build the correct url with query params", async () => {
			const result = await contentSource.fetch(
				{
					schemaName: "my-schema",
					"arc-site": "site1",
					size: 10,
					page: 2,
				},
				{ arcSite: "fallback" },
			);

			expect(result.request.url.pathname).toEqual("/content/v5/search/schemas/");
			expect(result.request.url.searchObject).toEqual(
				expect.objectContaining({
					schema_name: "my-schema",
					website: "site1",
					size: "10",
					page: "2",
				}),
			);
		});
	});

	describe("when arc-site is not provided but arcSite context is", () => {
		it("should fall back to arcSite from context", async () => {
			const result = await contentSource.fetch(
				{
					schemaName: "my-schema",
				},
				{ arcSite: "fallback-site" },
			);

			expect(result.request.url.searchObject).toEqual(
				expect.objectContaining({
					website: "fallback-site",
				}),
			);
		});
	});

	describe("when sortBy is provided", () => {
		it("should include sort param with hardcoded desc direction", async () => {
			const result = await contentSource.fetch(
				{
					schemaName: "my-schema",
					sortBy: "publish_date",
					"arc-site": "site1",
				},
				{ arcSite: "" },
			);

			expect(result.request.url.searchObject).toEqual(
				expect.objectContaining({
					sort: "publish_date:desc",
				}),
			);
		});
	});

	describe("when query is provided", () => {
		it("should include q param", async () => {
			const result = await contentSource.fetch(
				{
					schemaName: "my-schema",
					query: 'schema_content.venv.status:"CONFIRMED"',
					"arc-site": "site1",
				},
				{ arcSite: "" },
			);

			expect(result.request.url.searchObject).toEqual(
				expect.objectContaining({
					q: 'schema_content.venv.status:"CONFIRMED"',
				}),
			);
		});
	});

	describe("when query is not provided", () => {
		it("should not include q param", async () => {
			const result = await contentSource.fetch(
				{
					schemaName: "my-schema",
					"arc-site": "site1",
				},
				{ arcSite: "" },
			);

			expect(result.request.url.searchObject).not.toHaveProperty("q");
		});
	});

	describe("when sortBy is not provided", () => {
		it("should not include sort param", async () => {
			const result = await contentSource.fetch(
				{
					schemaName: "my-schema",
					"arc-site": "site1",
				},
				{ arcSite: "" },
			);

			expect(result.request.url.searchObject).not.toHaveProperty("sort");
		});
	});

	describe("when schemaName is missing", () => {
		it("should return empty string", async () => {
			const result = await contentSource.fetch({}, { arcSite: "site1" });

			expect(result).toEqual("");
		});
	});

	describe("when both website and arcSite are missing", () => {
		it("should return empty string", async () => {
			const result = await contentSource.fetch({ schemaName: "my-schema" }, {});

			expect(result).toEqual("");
		});
	});

	describe("default values", () => {
		it("should use size=25 and page=1 when not specified", async () => {
			const result = await contentSource.fetch(
				{
					schemaName: "my-schema",
					"arc-site": "site1",
				},
				{ arcSite: "" },
			);

			expect(result.request.url.searchObject).toEqual(
				expect.objectContaining({
					size: "25",
					page: "1",
				}),
			);
		});
	});

});
