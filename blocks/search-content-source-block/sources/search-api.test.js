import axios from "axios";

import contentSource from "./search-api";

jest.mock("fusion:environment", () => ({
	CONTENT_BASE: "https://content.base",
	searchKey: "ABCDEF",
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

expect.extend({
	stringContainingAll: (string, arrayOfStrings) =>
		arrayOfStrings.every((currentString) => string.includes(currentString))
			? {
					pass: true,
					message: `expected ${string} not to contain any of ${JSON.stringify(arrayOfStrings)}`,
			  }
			: {
					pass: false,
					message: `expected ${string} to contain all of ${JSON.stringify(arrayOfStrings)}`,
			  },
});

describe("the search content source block", () => {
	it("should use the proper param types", () => {
		expect(contentSource.params).toEqual([
			{
				displayName: "_id",
				name: "_id",
				type: "text",
			},
			{
				displayName: "page",
				name: "page",
				type: "text",
			},
			{
				displayName: "query",
				name: "query",
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

	describe("when a query is provided", () => {
		beforeEach(() => {
			axios.mockClear();
		});

		it("should build the correct url", async () => {
			const contentSourceFetch = await contentSource.fetch(
				{
					query: "test",
					"arc-site": "the-sun",
				},
				{ cachedCall: () => {} }
			);

			expect(contentSourceFetch.request.url.hostname).toEqual("search.arcpublishing.com");
			expect(contentSourceFetch.request.url.pathname).toEqual("/search");
			expect(contentSourceFetch.request.url.searchObject).toEqual(
				expect.objectContaining({
					key: "ABCDEF",
					page: "1",
					q: "test",
					website_id: "the-sun",
				})
			);
		});

		it("should encode the query value", async () => {
			await contentSource.fetch(
				{
					query: "vidèo",
					"arc-site": "the-sun",
				},
				{ cachedCall: () => {} }
			);

			expect(axios).toHaveBeenCalledWith(
				expect.objectContaining({
					url: expect.stringContainingAll(["q=vid%C3%A8o", "website_id=the-sun"]),
				})
			);
		});
	});

	describe("when a page number is provided", () => {
		it("should build the a url with the provided page number", async () => {
			const contentSourceFetch = await contentSource.fetch(
				{
					page: "3",
					query: "test",
					"arc-site": "the-sun",
				},
				{ cachedCall: () => {} }
			);

			expect(contentSourceFetch.request.url.searchObject).toEqual(
				expect.objectContaining({
					key: "ABCDEF",
					page: "3",
					q: "test",
					website_id: "the-sun",
				})
			);
		});
	});

	describe("when a query is NOT provided", () => {
		it("should not build a url", async () => {
			const contentSourceFetch = await contentSource.fetch(
				{
					page: "3",
					"arc-site": "the-sun",
				},
				{ cachedCall: () => {} }
			);

			expect(contentSourceFetch.request?.url).toBeUndefined();
		});
	});

	describe("when a site is not provided", () => {
		it("should not build a url with a website_url", async () => {
			const contentSourceFetch = await contentSource.fetch(
				{
					query: "test",
				},
				{ cachedCall: () => {} }
			);

			expect(contentSourceFetch.request.url.searchObject).toEqual(
				expect.objectContaining({
					key: "ABCDEF",
					page: "1",
					q: "test",
				})
			);
		});
	});
});
