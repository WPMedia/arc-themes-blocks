import contentSource from "./algolia-assortment";

describe("Algolia Assortment content source", () => {
	it("should build the correct url", () => {
		const key = {
			"arc-site": "arc-site",
			input: "test-input",
		};
		const url = contentSource.resolve(key);

		expect(url).toEqual(`${key["arc-site"]}-${key.input}`);
	});

	it("should transform data", () => {
		const key = {
			"arc-site": "arc-site",
			input: "test-input",
		};
		const dataTransform = contentSource.transform(key);

		expect(dataTransform).toEqual(key);
	});
});
