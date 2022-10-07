import ratiosFor from "./ratiosFor";

describe("validates arithmatic for ratios", () => {
	describe("validate parameters", () => {
		it("if size is missing, must use XL", () => {
			const ratios = ratiosFor();
			expect(ratios.smallWidth).toBe(400);
			expect(ratios.smallHeight).toBe(300);
			expect(ratios.mediumWidth).toBe(600);
			expect(ratios.mediumHeight).toBe(450);
			expect(ratios.largeWidth).toBe(800);
			expect(ratios.largeHeight).toBe(600);
		});

		it("if size not found, must use XL", () => {
			const ratios = ratiosFor("DUMMY");
			expect(ratios.smallWidth).toBe(400);
			expect(ratios.smallHeight).toBe(300);
			expect(ratios.mediumWidth).toBe(600);
			expect(ratios.mediumHeight).toBe(450);
			expect(ratios.largeWidth).toBe(800);
			expect(ratios.largeHeight).toBe(600);
		});

		it("if ratioValue invalid use defaultRatio", () => {
			const ratios = ratiosFor("XL", 999);
			expect(ratios.smallWidth).toBe(400);
			expect(ratios.smallHeight).toBe(300);
			expect(ratios.mediumWidth).toBe(600);
			expect(ratios.mediumHeight).toBe(450);
			expect(ratios.largeWidth).toBe(800);
			expect(ratios.largeHeight).toBe(600);
		});
	});

	describe("must generate default values for each size", () => {
		it("default values for XL", () => {
			const ratios = ratiosFor("XL");
			expect(ratios.smallWidth).toBe(400);
			expect(ratios.smallHeight).toBe(300);
			expect(ratios.mediumWidth).toBe(600);
			expect(ratios.mediumHeight).toBe(450);
			expect(ratios.largeWidth).toBe(800);
			expect(ratios.largeHeight).toBe(600);
		});

		it("default values for LG", () => {
			const ratios = ratiosFor("LG");
			expect(ratios.smallWidth).toMatchInlineSnapshot("600");
			expect(ratios.smallHeight).toMatchInlineSnapshot("450");
			expect(ratios.mediumWidth).toMatchInlineSnapshot("800");
			expect(ratios.mediumHeight).toMatchInlineSnapshot("600");
			expect(ratios.largeWidth).toMatchInlineSnapshot("600");
			expect(ratios.largeHeight).toMatchInlineSnapshot("450");
		});

		it("default values for MD", () => {
			const ratios = ratiosFor("MD");
			expect(ratios.smallWidth).toMatchInlineSnapshot("600");
			expect(ratios.smallHeight).toMatchInlineSnapshot("338");
			expect(ratios.mediumWidth).toMatchInlineSnapshot("800");
			expect(ratios.mediumHeight).toMatchInlineSnapshot("450");
			expect(ratios.largeWidth).toMatchInlineSnapshot("400");
			expect(ratios.largeHeight).toMatchInlineSnapshot("225");
		});

		it("default values for SM", () => {
			const ratios = ratiosFor("SM");
			expect(ratios.smallWidth).toBe(600);
			expect(ratios.smallHeight).toBe(400);
			expect(ratios.mediumWidth).toBe(800);
			expect(ratios.mediumHeight).toBe(533);
			expect(ratios.largeWidth).toBe(600);
			expect(ratios.largeHeight).toBe(400);
		});
	});

	describe("each size can be overwritten", () => {
		it("XL on 16:9", () => {
			const ratios = ratiosFor("XL", "16:9");
			expect(ratios.smallWidth).toBe(400);
			expect(ratios.smallHeight).toBe(225);
			expect(ratios.mediumWidth).toBe(600);
			expect(ratios.mediumHeight).toBe(338);
			expect(ratios.largeWidth).toBe(800);
			expect(ratios.largeHeight).toBe(450);
		});
		it("XL on 4:3", () => {
			const ratios = ratiosFor("XL", "4:3");
			expect(ratios.smallWidth).toBe(400);
			expect(ratios.smallHeight).toBe(300);
			expect(ratios.mediumWidth).toBe(600);
			expect(ratios.mediumHeight).toBe(450);
			expect(ratios.largeWidth).toBe(800);
			expect(ratios.largeHeight).toBe(600);
		});
		it("XL on 3:2", () => {
			const ratios = ratiosFor("XL", "3:2");
			expect(ratios.smallWidth).toBe(400);
			expect(ratios.smallHeight).toBe(267);
			expect(ratios.mediumWidth).toBe(600);
			expect(ratios.mediumHeight).toBe(400);
			expect(ratios.largeWidth).toBe(800);
			expect(ratios.largeHeight).toBe(533);
		});

		it("LG on 16:9", () => {
			const ratios = ratiosFor("LG", "16:9");
			expect(ratios.smallWidth).toMatchInlineSnapshot("600");
			expect(ratios.smallHeight).toMatchInlineSnapshot("338");
			expect(ratios.smallWidth).toMatchInlineSnapshot("600");
			expect(ratios.smallHeight).toMatchInlineSnapshot("338");
			expect(ratios.largeWidth).toMatchInlineSnapshot("600");
			expect(ratios.largeHeight).toMatchInlineSnapshot(`338`);
		});
		it("LG on 4:3", () => {
			const ratios = ratiosFor("LG", "4:3");
			expect(ratios.smallWidth).toMatchInlineSnapshot("600");
			expect(ratios.smallHeight).toMatchInlineSnapshot("450");
			expect(ratios.mediumWidth).toMatchInlineSnapshot("800");
			expect(ratios.mediumHeight).toMatchInlineSnapshot("600");
			expect(ratios.largeWidth).toMatchInlineSnapshot("600");
			expect(ratios.largeHeight).toMatchInlineSnapshot("450");
		});
		it("LG on 3:2", () => {
			const ratios = ratiosFor("LG", "3:2");
			expect(ratios.smallWidth).toMatchInlineSnapshot("600");
			expect(ratios.smallHeight).toMatchInlineSnapshot("400");
			expect(ratios.mediumWidth).toMatchInlineSnapshot("800");
			expect(ratios.mediumHeight).toMatchInlineSnapshot("533");
			expect(ratios.largeWidth).toMatchInlineSnapshot("600");
			expect(ratios.largeHeight).toMatchInlineSnapshot(`400`);
		});

		it("MD on 16:9", () => {
			const ratios = ratiosFor("MD", "16:9");
			expect(ratios.smallWidth).toMatchInlineSnapshot("600");
			expect(ratios.smallHeight).toMatchInlineSnapshot("338");
			expect(ratios.smallWidth).toMatchInlineSnapshot("600");
			expect(ratios.smallHeight).toMatchInlineSnapshot("338");
			expect(ratios.largeWidth).toMatchInlineSnapshot("400");
			expect(ratios.largeHeight).toMatchInlineSnapshot("225");
		});
		it("MD on 4:3", () => {
			const ratios = ratiosFor("MD", "4:3");
			expect(ratios.smallWidth).toMatchInlineSnapshot("600");
			expect(ratios.smallHeight).toMatchInlineSnapshot("450");
			expect(ratios.mediumWidth).toMatchInlineSnapshot("800");
			expect(ratios.mediumHeight).toMatchInlineSnapshot("600");
			expect(ratios.largeWidth).toMatchInlineSnapshot("400");
			expect(ratios.largeHeight).toMatchInlineSnapshot("300");
		});
		it("MD on 3:2", () => {
			const ratios = ratiosFor("MD", "3:2");
			expect(ratios.smallWidth).toMatchInlineSnapshot("600");
			expect(ratios.smallHeight).toMatchInlineSnapshot("400");
			expect(ratios.mediumWidth).toMatchInlineSnapshot("800");
			expect(ratios.mediumHeight).toMatchInlineSnapshot("533");
			expect(ratios.largeWidth).toMatchInlineSnapshot("400");
			expect(ratios.largeHeight).toMatchInlineSnapshot("267");
		});

		it("SM on 16:9", () => {
			const ratios = ratiosFor("SM", "16:9");
			expect(ratios.smallWidth).toBe(600);
			expect(ratios.smallHeight).toBe(338);
			expect(ratios.mediumWidth).toBe(800);
			expect(ratios.mediumHeight).toBe(450);
			expect(ratios.largeWidth).toBe(600);
			expect(ratios.largeHeight).toBe(338);
		});
		it("SM on 4:3", () => {
			const ratios = ratiosFor("SM", "4:3");
			expect(ratios.smallWidth).toBe(600);
			expect(ratios.smallHeight).toBe(450);
			expect(ratios.mediumWidth).toBe(800);
			expect(ratios.mediumHeight).toBe(600);
			expect(ratios.largeWidth).toBe(600);
			expect(ratios.largeHeight).toBe(450);
		});
		it("SM on 3:2", () => {
			const ratios = ratiosFor("SM", "3:2");
			expect(ratios.smallWidth).toBe(600);
			expect(ratios.smallHeight).toBe(400);
			expect(ratios.mediumWidth).toBe(800);
			expect(ratios.mediumHeight).toBe(533);
			expect(ratios.largeWidth).toBe(600);
			expect(ratios.largeHeight).toBe(400);
		});
	});
});
