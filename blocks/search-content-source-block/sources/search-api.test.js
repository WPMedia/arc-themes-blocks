import contentSource from "./search-api";

describe("the search content source block", () => {
	it("should use the proper param types", () => {
		expect(contentSource.params).toEqual({
			query: "text",
			page: "text",
		});
	});

	describe("when a query is provided", () => {
		it("should build the correct url", () => {
			const url = contentSource.resolve({
				query: "test",
				"arc-site": "the-sun",
			});
			expect(url).toEqual(
				"https://search.arcpublishing.com/search?&q=test&page=1&website_id=the-sun&key=ABCDEF"
			);
		});

		it("should encode the query value", () => {
			const url = contentSource.resolve({
				query: "vidèo",
				"arc-site": "the-sun",
			});
			expect(url).toEqual(
				"https://search.arcpublishing.com/search?&q=vid%C3%A8o&page=1&website_id=the-sun&key=ABCDEF"
			);
		});
	});

	describe("when a page number is provided", () => {
		it("should build the a url with the provided page number", () => {
			const url = contentSource.resolve({
				query: "test",
				page: "3",
				"arc-site": "the-sun",
			});
			expect(url).toEqual(
				"https://search.arcpublishing.com/search?&q=test&page=3&website_id=the-sun&key=ABCDEF"
			);
		});
	});

	describe("when a query is NOT provided", () => {
		it("should not build a url", () => {
			const url = contentSource.resolve({
				page: "3",
				"arc-site": "the-sun",
			});
			expect(url).toEqual("");
		});
	});

	describe("when a site is not provided", () => {
		it("should not build a url with a website_url", () => {
			const url = contentSource.resolve({ query: "test" });
			expect(url).toEqual("https://search.arcpublishing.com/search?&q=test&page=1&key=ABCDEF");
		});
	});
});
