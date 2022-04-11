import contentSource from "./algolia-assortment";

describe("Algolia Assortment content source", () => {
	it("should transform data", () => {
		const key = {
			"arc-site": "arc-site",
			input: "test-input",
		};
		const dataTransform = contentSource.transform(key);

		expect(dataTransform).toEqual(key);
	});
});
