import appendURLParams from "./append-url-params";

describe("appendURLParams", () => {
	it("returns the URL unchanged when params array is empty", () => {
		expect(appendURLParams("/page/", [])).toBe("/page/");
	});

	it("appends a single param with ? when URL has no query string", () => {
		expect(appendURLParams("/page/", [{ key: "value" }])).toBe("/page/?key=value");
	});

	it("appends params with & when URL already has a query string", () => {
		expect(appendURLParams("/page/?existing=1", [{ key: "value" }])).toBe(
			"/page/?existing=1&key=value",
		);
	});

	it("appends multiple params joined with &", () => {
		const result = appendURLParams("/page/", [{ foo: "bar" }, { baz: "qux" }]);
		expect(result).toBe("/page/?foo=bar&baz=qux");
	});
});
