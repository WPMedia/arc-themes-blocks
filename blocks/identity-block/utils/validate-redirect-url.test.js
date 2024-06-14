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

	it("returns url with /pf if location.pathname has /pf", () => {
		Object.defineProperty(window, "location", {
			writable: true,
			value: {
				origin: 'http://localhost',
				href: 'http://localhost',
				search: '',
				pathname: '/pf/account/'
			}
		});

		const url = "/account/";
		const result = validateURL(url);

		expect(result).toBe('http://localhost/pf/account/');
	});
});
