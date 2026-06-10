import axios from "axios";
import contentSource from "./content-api-collections";

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

describe("the collections content source block", () => {
	it("should use the proper param types", () => {
		expect(contentSource.params).toEqual([
			{
				displayName: "_id",
				name: "_id",
				type: "text",
			},
			{
				displayName: "content_alias",
				name: "content_alias",
				type: "text",
			},
			{
				displayName: "from",
				name: "from",
				type: "text",
			},
			{
				displayName: "getNext",
				name: "getNext",
				type: "text",
			},
			{
				displayName: "size",
				name: "size",
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

	it("should be associated with the ans-feed schema", () => {
		expect(contentSource.schemaName).toEqual("ans-feed");
	});

	describe("when an id and website are provided", () => {
		it("should build the correct url", async () => {
			const contentSourceFetch = await contentSource.fetch(
				{
					_id: "test",
					content_alias: "test",
					website: "the-sun",
					from: "20",
					size: "0",
					"arc-site": "the-sun",
				},
				{ cachedCall: () => {} }
			);

			expect(contentSourceFetch.request.url.pathname).toEqual("/content/v4/collections");
			expect(contentSourceFetch.request.url.searchObject).toEqual(
				expect.objectContaining({
					_id: "test",
					from: "20",
					published: "true",
					size: "0",
					website: "the-sun",
				})
			);
		});
	});

	describe("when a from is provided", () => {
		it("should build the correct url with a from", async () => {
			const contentSourceFetch = await contentSource.fetch(
				{
					_id: "test",
					content_alias: "test",
					website: "the-sun",
					from: "20",
					"arc-site": "the-sun",
				},
				{ cachedCall: () => {} }
			);

			expect(contentSourceFetch.request.url.pathname).toEqual("/content/v4/collections");
			expect(contentSourceFetch.request.url.searchObject).toEqual(
				expect.objectContaining({
					_id: "test",
					from: "20",
					published: "true",
					website: "the-sun",
				})
			);
		});
	});

	describe("when a from is NOT provided", () => {
		it("should build the correct url without a from", async () => {
			const contentSourceFetch = await contentSource.fetch(
				{
					_id: "test",
					content_alias: "test",
					website: "the-sun",
					"arc-site": "the-sun",
				},
				{ cachedCall: () => {} }
			);

			expect(contentSourceFetch.request.url.pathname).toEqual("/content/v4/collections");
			expect(contentSourceFetch.request.url.searchObject).toEqual(
				expect.objectContaining({
					_id: "test",
					published: "true",
					website: "the-sun",
				})
			);
		});
	});

	describe("when a size is provided", () => {
		it("should build the correct url without a size", async () => {
			const contentSourceFetch = await contentSource.fetch(
				{
					_id: "test",
					content_alias: "test",
					website: "the-sun",
					size: "0",
					"arc-site": "the-sun",
				},
				{ cachedCall: () => {} }
			);

			expect(contentSourceFetch.request.url.pathname).toEqual("/content/v4/collections");
			expect(contentSourceFetch.request.url.searchObject).toEqual(
				expect.objectContaining({
					_id: "test",
					published: "true",
					size: "0",
					website: "the-sun",
				})
			);
		});
	});

	describe("when a size is provided and over 20", () => {
		it("should build the correct url without a size of 20", async () => {
			const contentSourceFetch = await contentSource.fetch(
				{
					_id: "test",
					size: "40",
				},
				{ cachedCall: () => {} }
			);

			expect(contentSourceFetch.request.url.pathname).toEqual("/content/v4/collections");
			expect(contentSourceFetch.request.url.searchObject).toEqual(
				expect.objectContaining({
					_id: "test",
					published: "true",
					size: "20",
				})
			);
		});
	});

	describe("when a size is NOT provided", () => {
		it("should build the correct url without a size", async () => {
			const contentSourceFetch = await contentSource.fetch(
				{
					_id: "test",
					content_alias: "test",
					website: "the-sun",
					"arc-site": "the-sun",
				},
				{ cachedCall: () => {} }
			);

			expect(contentSourceFetch.request.url.pathname).toEqual("/content/v4/collections");
			expect(contentSourceFetch.request.url.searchObject).toEqual(
				expect.objectContaining({
					_id: "test",
					published: "true",
					website: "the-sun",
				})
			);
		});
	});

	describe("when an id is NOT provided but a content alias is provided", () => {
		it("should build the correct url with a content alias", async () => {
			const contentSourceFetch = await contentSource.fetch(
				{
					content_alias: "test_alias",
					website: "the-sun",
					from: "20",
					size: "0",
					"arc-site": "the-sun",
				},
				{ cachedCall: () => {} }
			);

			expect(contentSourceFetch.request.url.pathname).toEqual("/content/v4/collections");
			expect(contentSourceFetch.request.url.searchObject).toEqual(
				expect.objectContaining({
					content_alias: "test_alias",
					from: "20",
					published: "true",
					website: "the-sun",
					size: "0",
				})
			);
		});
	});

	describe("when a website is NOT provided", () => {
		it("should not build a url with a website", async () => {
			const contentSourceFetch = await contentSource.fetch(
				{ _id: "test" },
				{ cachedCall: () => {} }
			);

			expect(contentSourceFetch.request.url.pathname).toEqual("/content/v4/collections");
			expect(contentSourceFetch.request.url.searchObject).toEqual(
				expect.objectContaining({
					_id: "test",
					published: "true",
				})
			);
		});
	});

	describe("when an id and website are NOT provided", () => {
		it("should not build a url with an id and website", async () => {
			const contentSourceFetch = await contentSource.fetch({}, { cachedCall: () => {} });

			expect(contentSourceFetch.request.url.pathname).toEqual("/content/v4/collections");
			expect(contentSourceFetch.request.url.searchObject).toEqual(
				expect.objectContaining({
					content_alias: "undefined",
					published: "true",
				})
			);
		});
	});

	describe("when an getNext is provided", () => {
		it("should request the next set of data and concatenate it to the content_elements array", async () => {
			const contentSourceFetch = await contentSource.fetch(
				{
					_id: "test",
					content_alias: "test",
					website: "the-sun",
					from: "0",
					size: "20",
					"arc-site": "the-sun",
					getNext: "true",
				},
				{ cachedCall: () => {} }
			);

			// the mock will return one item per request
			expect(contentSourceFetch.content_elements.length).toEqual(2);
			expect(contentSourceFetch.content_elements[0].url.searchObject).toEqual(
				expect.objectContaining({
					_id: "test",
					from: "0",
					published: "true",
					website: "the-sun",
					size: "20",
				})
			);
			expect(contentSourceFetch.content_elements[1].url.searchObject).toEqual(
				expect.objectContaining({
					_id: "test",
					from: "20",
					published: "true",
					website: "the-sun",
					size: "20",
				})
			);
		});
	});

	describe("when there are no content_elements", () => {
		it("should not return content_elements", async () => {
			axios.mockImplementation(() => Promise.resolve({ data: {} }));
			const contentSourceFetch = await contentSource.fetch(
				{
					_id: "test",
					content_alias: "test",
					website: "the-sun",
					from: "0",
					size: "20",
					"arc-site": "the-sun",
					getNext: "true",
				},
				{ cachedCall: () => {} }
			);
			expect(contentSourceFetch?.content_elements).toBeUndefined();
			axios.mockReset();
		});
	});

	describe("when getNext is true but first response has no content_elements", () => {
		it("should concatenate using next content_elements when data has none", async () => {
			let callCount = 0;
			axios.mockImplementation((request) => {
				callCount += 1;
				const requestUrl = new URL(request.url);
				const url = {
					hostname: requestUrl.hostname,
					pathname: requestUrl.pathname,
					searchObject: Object.fromEntries(requestUrl.searchParams),
				};
				// First call: no content_elements; second call: has content_elements
				const data =
					callCount === 1
						? { request: { ...request, url } }
						: { content_elements: [{ url }], request: { ...request, url } };
				return Promise.resolve({ data });
			});

			const contentSourceFetch = await contentSource.fetch(
				{
					_id: "test",
					"arc-site": "the-sun",
					from: "0",
					size: "20",
					getNext: "true",
				},
				{ cachedCall: () => {} }
			);

			// data has no content_elements so || [] fallback is used; next has one item
			expect(contentSourceFetch.content_elements.length).toBe(1);
			axios.mockReset();
		});
	});

	describe("when getNext is true but second response has no content_elements", () => {
		it("should concatenate using data content_elements when next has none", async () => {
			let callCount = 0;
			axios.mockImplementation((request) => {
				callCount += 1;
				const requestUrl = new URL(request.url);
				const url = {
					hostname: requestUrl.hostname,
					pathname: requestUrl.pathname,
					searchObject: Object.fromEntries(requestUrl.searchParams),
				};
				// First call: has content_elements; second call: no content_elements
				const data =
					callCount === 1
						? { content_elements: [{ url }], request: { ...request, url } }
						: { request: { ...request, url } };
				return Promise.resolve({ data });
			});

			const contentSourceFetch = await contentSource.fetch(
				{
					_id: "test",
					"arc-site": "the-sun",
					from: "0",
					size: "20",
					getNext: "true",
				},
				{ cachedCall: () => {} }
			);

			// data has one content_element; next has none so || [] fallback is used
			expect(contentSourceFetch.content_elements.length).toBe(1);
			axios.mockReset();
		});
	});
});
