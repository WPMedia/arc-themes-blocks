import formatCredit from ".";

describe("format credit util", () => {
	it("should return empty string if undefined", () => {
		expect(formatCredit()).toBe("");
	});
	it("should return empty string if null", () => {
		expect(formatCredit(null)).toBe("");
	});
	it("should return empty string if empty object", () => {
		expect(formatCredit({})).toBe("");
	});
	it("should return only the affiliation if empty byline array ", () => {
		expect(formatCredit({ by: [], affiliation: [{ name: "Stock Photo" }] })).toBe("(Stock Photo)");
	});
	it("should return an empty string if empty byline array and empty affiliation array", () => {
		expect(formatCredit({ by: [], affiliation: [] })).toBe("");
	});
	it("should return only byline if empty affiliation and one byline", () => {
		expect(formatCredit({ by: [{ name: "Joe Doe" }], affiliation: [] })).toBe("(Joe Doe)");
	});
	it("should return many bylines and many affiliations", () => {
		expect(
			formatCredit({
				by: [{ name: "Joe Doe" }, { name: "Jane Doe" }],
				affiliation: [{ name: "Stock Photo" }, { name: "Another Stock Photo" }],
			})
		).toBe("(Joe Doe, Jane Doe/Stock Photo, Another Stock Photo)");
	});
});
