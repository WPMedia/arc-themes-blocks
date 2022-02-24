import checkObjectEmpty from "./checkObjectEmpty";

describe("checkObjectEmpty", () => {
	test("it should return false if the object is not empty", () => {
		const input = { id: 1, url: "https://www.url1.dev" };

		expect(checkObjectEmpty(input)).toEqual(false);
	});
	test("it should return true if the object is not null but empty", () => {
		const input = {};

		expect(checkObjectEmpty(input)).toEqual(true);
	});
});
