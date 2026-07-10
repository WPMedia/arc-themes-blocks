import unescapeHTML from "./unescape-html";

describe("unescapeHTML", () => {
	it("returns null for undefined input", () => {
		expect(unescapeHTML(undefined)).toBeNull();
	});

	it("returns null for null input", () => {
		expect(unescapeHTML(null)).toBeNull();
	});

	it("returns null for empty string", () => {
		expect(unescapeHTML("")).toBeNull();
	});

	it("unescapes &amp;", () => {
		expect(unescapeHTML("Tom &amp; Jerry")).toBe("Tom & Jerry");
	});

	it("unescapes &lt; and &gt;", () => {
		expect(unescapeHTML("&lt;div&gt;")).toBe("<div>");
	});

	it("unescapes &quot;", () => {
		expect(unescapeHTML('say &quot;hello&quot;')).toBe('say "hello"');
	});

	it("unescapes &#039;", () => {
		expect(unescapeHTML("it&#039;s")).toBe("it's");
	});

	it("returns plain string unchanged", () => {
		expect(unescapeHTML("hello world")).toBe("hello world");
	});
});
