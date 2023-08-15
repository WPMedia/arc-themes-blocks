import validateURL from "./validate-redirect-url";

describe("validateURL()", () => {
	it("returns null when nothing is passed", () => {
		const result = validateURL();
		expect(result).toBeNull();
	});

	it("reutrns URL when it is a page on the current site", () => {
		const url = "/redirect-here";
		const result = validateURL(url);
		expect(result).toBe(url);
	});

	it("reutrns the root URL when potentially unsafe", () => {
		const url = "https://www.unkown.com/redirect-here";
		const result = validateURL(url);
		expect(result).toBe("/");
	});
});
