import getFocalFromANS from "./index";

const mockImageWithFocal = {
	_id: "P3V3THIJPVGUBLRIIYWKFHZTKA",
	type: "image",
	url: "foo.jpg",
	focal_point: {
		x: "159",
		y: "823",
	},
};

const mockImageWithIncompleteFocalX = {
	_id: "P3V3THIJPVGUBLRIIYWKFHZTKA",
	type: "image",
	url: "foo.jpg",
	focal_point: {
		x: "159",
	},
};

const mockImageWithIncompleteFocalY = {
	_id: "P3V3THIJPVGUBLRIIYWKFHZTKA",
	type: "image",
	url: "foo.jpg",
	focal_point: {
		y: "823",
	},
};

const mockImageWithoutFocal = {
	_id: "GH3BDATX7FBZ7DSPPZFD5DPFJM",
	type: "image",
	url: "bar.jpg",
};

describe("getImageFromANS()", () => {
	it("returns the default value", () => {
		const value = getFocalFromANS(null);
		expect(value).toEqual({ smart: true });
	});

	it("returns the focal point", () => {
		const value = getFocalFromANS(mockImageWithFocal);
		expect(value).toEqual({ focal: "159,823" });
	});

	it("returns the default value when image has no focal point", () => {
		const value = getFocalFromANS(mockImageWithoutFocal);
		expect(value).toEqual({ smart: true });
	});

	it("returns the default value when image has only the x focal point", () => {
		const value = getFocalFromANS(mockImageWithIncompleteFocalX);
		expect(value).toEqual({ smart: true });
	});

	it("returns the default value when image has only the y focal point", () => {
		const value = getFocalFromANS(mockImageWithIncompleteFocalY);
		expect(value).toEqual({ smart: true });
	});
});
