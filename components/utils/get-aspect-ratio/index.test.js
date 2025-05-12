import getAspectRatio from "./index";

describe("should correctly calculate the aspect ratio given a width and height", () => {
	it("should correctly evaluate and simplify the aspect ratio to 1:2", () => {
		const width = 250;
		const height = 500;
		const aspectRatio = getAspectRatio(width, height);
		expect(aspectRatio).toEqual("1:2");
	});

	it("should correctly evaluate and simplify the aspect ratio to 1:1", () => {
		const width = 999;
		const height = 999;
		const aspectRatio = getAspectRatio(width, height);
		expect(aspectRatio).toEqual("1:1");
	});

	it("should correctly evaluate and simplify the aspect ratio to 4:3", () => {
		const width = 960;
		const height = 720;
		const aspectRatio = getAspectRatio(width, height);
		expect(aspectRatio).toEqual("4:3");
	});

	it("does not incorrectly simplify a 1 x 1 content item's aspect ratio", () => {
		const width = 1;
		const height = 1;
		const aspectRatio = getAspectRatio(width, height);
		expect(aspectRatio).toEqual("1:1");
	});

	it("does not incorrectly simplify a 13 x 5 content item's aspect ratio", () => {
		const width = 13;
		const height = 5;
		const aspectRatio = getAspectRatio(width, height);
		expect(aspectRatio).toEqual("13:5");
	});

	it("does not incorrectly simplify a 33 x 100 content item's aspect ratio", () => {
		const width = 33;
		const height = 100;
		const aspectRatio = getAspectRatio(width, height);
		expect(aspectRatio).toEqual("33:100");
	});

	it("returns undefined if zero is passed in for the height", () => {
		const width = 21;
		const height = 0;
		const aspectRatio = getAspectRatio(width, height);
		expect(aspectRatio).toEqual(undefined);
	});
});
