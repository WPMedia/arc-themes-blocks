import currency from "./currency";

describe("Currency", () => {
	it("returns currency symbol based on name", () => {
		expect(currency("USD")).toBe("$");
	});

	it.each([
		["AUD", "A$"],
		["ARS", "$"],
		["ZAR", "R"],
	])("returns the symbol for %s", (code, symbol) => {
		expect(currency(code)).toBe(symbol);
	});

	it("returns null if currency is not supported", () => {
		expect(currency("HKD")).toBe(null);
	});
});
