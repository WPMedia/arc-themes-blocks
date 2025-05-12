import formatURL from "./index";

describe("Format url should add a slash on the end of a link if", () => {
	it("it is an internal url without an ending slash", () => {
		const linkWithoutEndingSlash = "/test";

		expect(formatURL(linkWithoutEndingSlash)).toStrictEqual(`${linkWithoutEndingSlash}/`);
	});
});

describe("Format url should not add a slash at the end if", () => {
	it("hash params", () => {
		const linkWithHashParams = "/test/page#section";
		expect(formatURL(linkWithHashParams)).toStrictEqual(linkWithHashParams);
	});

	it("it has extension .html", () => {
		const linkWithHtmlExtension = "/entertaiment/page.html";
		expect(formatURL(linkWithHtmlExtension)).toStrictEqual(linkWithHtmlExtension);
	});

	it("is a mailto link", () => {
		const mailToLink = "mailto:readers@washpost.com";
		expect(formatURL(mailToLink)).toStrictEqual(mailToLink);
	});

	it("it is with query params", () => {
		const linkWithQuery = "/test?query=a";

		expect(formatURL(linkWithQuery)).toStrictEqual(linkWithQuery);
	});

	it("it already has one", () => {
		const linkWithSlash = "/test/";

		expect(formatURL(linkWithSlash)).toStrictEqual(linkWithSlash);
	});

	it("handles nulls", () => {
		expect(formatURL(null)).toStrictEqual("");
	});

	it("handles undefined", () => {
		expect(formatURL(undefined)).toStrictEqual("");
	});
});
