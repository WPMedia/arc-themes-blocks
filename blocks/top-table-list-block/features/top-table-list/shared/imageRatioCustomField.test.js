import imageRatioCustomField from "./imageRatioCustomField";

describe("imageRatioCustomField", () => {
	it("returns an object with the element key", () => {
		const result = imageRatioCustomField("imageRatio", "Image Settings", "16:9");
		expect(result).toHaveProperty("imageRatio");
	});

	it("prop type is defined on the returned field", () => {
		const result = imageRatioCustomField("imageRatioMD", "Medium Settings", "3:2");
		expect(result.imageRatioMD).toBeDefined();
	});

	it("uses the provided element name as the key", () => {
		const result = imageRatioCustomField("myRatio", "My Group", "4:3");
		expect(Object.keys(result)).toEqual(["myRatio"]);
	});
});
