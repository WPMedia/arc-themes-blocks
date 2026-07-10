import validateURL from "./validate-redirect-url";

describe("validateURL()", () => {
	it("returns null when nothing is passed", () => {
		const result = validateURL();
		expect(result).toBeNull();
	});

	it("reutrns URL when it is a page on the current site", () => {
		const url = "/redirect-here";
		const result = validateURL(url);

		expect(result).toBe('http://localhost/redirect-here');
	});

	it("returns the root URL when potentially unsafe", () => {
		const url = "https://www.unkown.com/redirect-here";
		const result = validateURL(url);

		expect(result).toBe("/");
	});

	it("returns concats contextPath if defined", () => {
		const url = "/redirect-here/";
		const result = validateURL(url);

		expect(result).toBe('http://localhost/redirect-here/');
	});

	it("returns pathname when URL resolves to root /", () => {
		const result = validateURL("/");
		expect(result).toBe("/");
	});

	it("returns sessionStorage redirect when stored and valid on URL parse error", () => {
		sessionStorage.setItem("ArcXP_redirectUrl", "/stored-path");
		// Passing an object causes URL constructor to throw
		const result = validateURL({ toString: () => { throw new Error("bad"); } });
		expect(result).toBe("/stored-path");
		sessionStorage.removeItem("ArcXP_redirectUrl");
	});

	it("returns / and sets sessionStorage when no stored redirect and URL parse error", () => {
		sessionStorage.removeItem("ArcXP_redirectUrl");
		// Passing an object causes URL constructor to throw, no stored redirect
		const result = validateURL({ toString: () => { throw new Error("bad"); } });
		expect(result).toBe("/");
		expect(sessionStorage.getItem("ArcXP_redirectUrl")).toBe("/");
	});
});
