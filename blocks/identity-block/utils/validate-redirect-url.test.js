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

	it("generates url from allowed domains", () => {
		Object.defineProperty(window, "location", {
			writable: true,
			value: {
				origin: 'http://allowed-domain.com',
			}
		});

		const url = "/redirect-here/";
		const allowedDomains = ['http://allowed-domain.com'];

		const result = validateURL(url, allowedDomains);
		expect(result).toBe('http://allowed-domain.com/redirect-here/');
	});

	it("generates url from allowed domains from external website", () => {
		Object.defineProperty(window, "location", {
			writable: true,
			value: {
				origin: 'http://allowed-domain.com',
			}
		});

		const url = "https://external-page.com/redirect";
		const allowedDomains = ['https://external-page.com/redirect'];

		const result = validateURL(url, allowedDomains);
		expect(result).toBe('https://external-page.com/redirect');
	});
});
