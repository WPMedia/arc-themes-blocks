import calculateAspectRatio from ".";

describe("calculateAspectRatio", () => {
	it("return aspect ratio based on width and height ", () => {
		expect(calculateAspectRatio({ aspectRatio: "16:9", width: 1600, height: 900 })).toMatchObject({
			height: 900,
			width: 1600,
		});
	});

	it("returns aspect ratio based on ansImage width", () => {
		expect(
			calculateAspectRatio({ aspectRatio: "16:9", width: 800, ansImage: { width: 1600 } })
		).toMatchObject({
			height: 900,
			width: 1600,
		});
	});

	it("returns aspect ratio based on width", () => {
		expect(calculateAspectRatio({ aspectRatio: "16:9", width: 1610 })).toMatchObject({
			height: 905,
			width: 1610,
		});
	});

	it("returns aspect ratio based on height", () => {
		expect(calculateAspectRatio({ aspectRatio: "16:9", height: 1600 })).toMatchObject({
			height: 1600,
			width: 2844,
		});
	});

	it("returns only width", () => {
		expect(calculateAspectRatio({ width: 1600 })).toMatchObject({ width: 1600 });
	});

	it("returns only height", () => {
		expect(calculateAspectRatio({ height: 1600 })).toMatchObject({ height: 1600 });
	});

	it("returns empty object if no width or height", () => {
		expect(calculateAspectRatio({ aspectRatio: "16:9" })).toMatchObject({});
	});
});
