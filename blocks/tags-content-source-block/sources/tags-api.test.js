import contentSource from "./tags-api";

describe("the tags content source block", () => {
	it("should use the proper param types", () => {
		expect(contentSource.params).toEqual({
			slug: "text",
		});
	});

	describe("when a slug is provided", () => {
		it("should build the correct url", () => {
			const url = contentSource.resolve({ slug: "dogs" });

			expect(url).toEqual("/tags/v2/slugs?slugs=dogs");
		});
	});

	describe("when a slug is NOT provided", () => {
		it("should not build a url with a slug", () => {
			const url = contentSource.resolve({ slug: "" });

			expect(url).toEqual("/tags/v2/slugs?slugs=");
		});
	});
});

describe("the transform", () => {
	const error = new Error("Not found");
	error.statusCode = 404;

	it("must return the original data if something found", () => {
		const data = {
			StatusCode: 200,
			Payload: [
				{
					slug: "/foo",
				},
			],
		};
		expect(contentSource.transform({ ...data })).toEqual(data);
	});

	it("must throw error if api returns nothing", () => {
		expect(() => contentSource.transform()).toThrow(error);
	});

	it("must throw error if api returns empty", () => {
		expect(() => contentSource.transform({})).toThrow(error);
	});

	it("must throw error if slug not found", () => {
		const data = {
			StatusCode: 200,
			Payload: [null],
		};
		expect(() => {
			contentSource.transform({ ...data });
		}).toThrow(error);
	});

	it("must return data if one of the slugs returns data", () => {
		const data = {
			StatusCode: 200,
			Payload: [
				null,
				{
					slug: "/bar",
				},
				null,
			],
		};
		expect(contentSource.transform({ ...data })).toEqual(data);
	});
});
