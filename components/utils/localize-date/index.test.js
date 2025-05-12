import { localizeDate, localizeDateTime } from ".";

describe("localizeDate()", () => {
	// supported locale and timezone if no blocks.json found
	it("returns us east expected output with at", () => {
		expect(localizeDate("2000-01-02T01:00:00.000Z", "%B %d, %Y", "en", "America/New_York")).toEqual(
			"January 01, 2000"
		);
	});

	// unsupported locale and timezone if no blocks.json found
	// TODO: Restore test once we can use Node.js 18 and Intl.supportedValuesOf() in all environments.
	it.skip("returns American english language and utc date for timezone not found", () => {
		expect(localizeDate("2000-01-02T01:00:00.000Z", "%B %d, %Y", "wrong_LANG", "Incorrect/Zone")).toEqual(
			"January 02, 2000"
		);
	});

	it("returns empty when no date is passed in", () => {
		expect(localizeDate()).toEqual("");
	});

	it("uses the default format if invalid", () => {
		expect(localizeDate("2000-01-02T01:00:00.000Z", "    ")).toEqual("January 01, 2000");
	});
});

describe("localizeDateTime()", () => {
	// supported locale and timezone if no blocks.json found
	it("returns us east expected output with at", () => {
		expect(
			localizeDateTime("2000-01-02T01:00:00.000Z", "%B %d, %Y at %l:%M %P %Z", "en", "America/New_York")
		).toEqual("January 01, 2000 at 8:00 pm EST");
	});

	// unsupported locale and timezone if no blocks.json found
	// TODO: Restore test once we can use Node.js 18 and Intl.supportedValuesOf() in all environments.
	it.skip("returns American english language and utc date for timezone not found", () => {
		expect(
			localizeDateTime("2000-01-02T01:00:00.000Z", "%B %d, %Y %l:%M %P %Z", "wrong_LANG", "Incorrect/Zone")
		).toEqual("January 02, 2000  1:00 am UTC");
	});

	// supported locale if no blocks.json found
	// unsupported timezone if no blocks.json found
	// TODO: Restore test once we can use Node.js 18 and Intl.supportedValuesOf() in all environments.
	it.skip("returns correct Korean language for locale ko but falls back to UTC", () => {
		expect(
			localizeDateTime("2000-01-02T01:00:00.000Z", "%B %d, %Y %l:%M %P %Z", "ko", "Incorrect/Zone")
		).toEqual("1월 02, 2000  1:00 오전 UTC");
	});

	// supported timezone by default if no blocks.json found
	// supported language en to show am/pm
	// Pacific/Auckland GMT+13
	it("supports Auckland timezone", () => {
		expect(
			localizeDateTime("2000-01-02T01:00:00.000Z", "%B %d, %Y %l:%M %P %Z", "en", "Pacific/Auckland")
		).toEqual("January 02, 2000 2:00 pm GMT+13");
	});

	// supported timezone by default if no blocks.json found
	// paris (GMT+1)
	it("supports Paris timezone", () => {
		expect(
			localizeDateTime("2000-01-02T01:00:00.000Z", "%B %d, %Y %l:%M %P %Z", "en", "Europe/Paris")
		).toEqual("January 02, 2000 2:00 am GMT+1");
	});

	it("handles french meridiems", () => {
		expect(
			localizeDateTime("2000-01-02T01:00:00.000Z", "%B %d, %Y %l:%M %P %Z", "fr", "Europe/Paris")
		).toEqual("janvier 02, 2000 2:00 am UTC+1");
	});

	it("handles spanish meridiems", () => {
		expect(
			localizeDateTime("2000-01-02T13:00:00.000Z", "%B %d, %Y %l:%M %P %Z", "es", "Europe/Paris")
		).toEqual("enero 02, 2000 2:00 p. m. CET");
	});

	it("returns empty when no date is passed in", () => {
		expect(localizeDateTime()).toEqual("");
	});

	it("uses the default format if invalid", () => {
		expect(localizeDateTime("2000-01-02T01:00:00.000Z", "   ")).toEqual("January 01, 2000 at 8:00PM EST");
	});

	it("returns Swedish locale", () => {
		expect(
			localizeDateTime("2000-01-02T01:00:00.000Z", "%B %d, %Y at %l:%M%p %Z", "sv", "America/New_York")
		).toEqual("januari 01, 2000 at 8:00em GMT−5");
	});

	it("returns Norwegian locale", () => {
		expect(
			localizeDateTime("2000-01-02T01:00:00.000Z", "%B %d, %Y at %l:%M%p %Z", "no", "America/New_York")
		).toEqual("januar 01, 2000 at 8:00p.m. EST");
	});

	it("returns German locale", () => {
		expect(
			localizeDateTime("2000-01-02T01:00:00.000Z", "%B %d, %Y at %l:%M%p %Z", "de", "America/New_York")
		).toEqual("Januar 01, 2000 at 8:00PM GMT-5");
	});

	it("returns Japanese locale", () => {
		expect(
			localizeDateTime("2000-01-02T01:00:00.000Z", "%B月%d日 %Y年 %l:%M%p %Z", "ja", "America/New_York")
		).toEqual("1月01日 2000年 8:00午後 GMT-5");
	});

	it("returns Portuguese locale", () => {
		expect(
			localizeDateTime("2000-01-02T01:00:00.000Z", "%B %d, %Y at %l:%M%p %Z", "pt", "America/New_York")
		).toEqual("janeiro 01, 2000 at 8:00da tarde GMT-5");
	});

	it("uses alternate formats", () => {
		expect(
			localizeDateTime("2000-01-02T01:00:00.000Z", "%a %b %d, %y at %I:%M %p %z", "en", "America/New_York")
		).toEqual("Sat Jan 01, 00 at 08:00 PM Eastern Standard Time");
		expect(
			localizeDateTime("2000-01-02T01:00:00.000Z", "%A %h %d, %y at %l:%M %P %Z", "en", "America/New_York")
		).toEqual("Saturday Jan 01, 00 at 8:00 pm EST");
		expect(
			localizeDateTime("2000-01-02T01:00:00.000Z", "%m-%d-%Y at %H:%M:%S %Z", "en", "America/New_York")
		).toEqual("01-01-2000 at 20:00:00 EST");
	});

	it("replaces unsupported tokens with an empty string, keeping the rest of the format intact", () => {
		expect(
			localizeDateTime("2000-01-02T01:00:00.000Z", "%B %d, %Y %vat %l:%M %P %Z", "en", "America/New_York")
		).toEqual("January 01, 2000 at 8:00 pm EST");
	})
});
