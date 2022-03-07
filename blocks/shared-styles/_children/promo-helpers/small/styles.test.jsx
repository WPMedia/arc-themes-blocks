import SmallPromoStyles from "./styles";

describe("return class name based on the image position", () => {
	it("return for default", () => {
		const result = SmallPromoStyles();
		expect(result).toEqual("margin-md-top");
	});

	it("return blank string if nothing found for arguments", () => {
		const result = SmallPromoStyles("bottom", "");
		expect(result).toEqual("");
	});
});
