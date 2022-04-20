import getProperties from "fusion:properties";

import contentSource from "./author-api";

describe("the author api content source block", () => {
	it("should use the proper param types", () => {
		expect(contentSource.params).toEqual({
			slug: "text",
		});
	});

	describe("when a slug is provided", () => {
		it("should build the correct url", () => {
			const url = contentSource.resolve({ slug: "sara-carothers" });

			expect(url).toEqual("/author/v2/author-service?slug=sara-carothers");
		});
	});

	describe("when a slug is NOT provided", () => {
		it("should not build a url with a slug", () => {
			const url = contentSource.resolve({ slug: "" });

			expect(url).toEqual("/author/v2/author-service?slug=");
		});
	});

	describe(".transform", () => {
		beforeEach(() => {
			getProperties.mockImplementation(() => ({
				breakpoints: [
					{
						device: "mobile",
						width: 420,
					},
					{
						device: "tablet",
						width: 768,
					},
					{
						device: "desktop",
						width: 992,
					},
				],
				aspectRatios: ["16:9"],
				imageWidths: [158],
				resizerURL: "https://fake.cdn.com/resizer",
			}));
		});

		it("should return object with blank authors array", () => {
			// as far as I know we can always assume an empty obj for query
			expect(contentSource.transform(null, {})).toEqual({ authors: [] });
		});

		it("should return author with resized params populated", () => {
			const authors = [
				{
					firstName: "Marty",
					lastName: "McFly",
					image:
						"https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg",
				},
			];

			const expectedAuthors = [
				{
					...authors[0],
					resized_params: { "158x89": undefined },
				},
			];

			expect(contentSource.transform({ authors }, { "arc-site": "abc123" })).toEqual({
				authors: expectedAuthors,
			});
		});

		it("should return author even if author has no image", () => {
			const authors = [
				{
					firstName: "Marty",
					lastName: "McFly",
					image: "",
				},
			];

			const expectedAuthors = [
				{
					...authors[0],
					resized_params: {},
				},
			];

			expect(contentSource.transform({ authors }, { "arc-site": "abc123" })).toEqual({
				authors: expectedAuthors,
			});
		});
	});
});
