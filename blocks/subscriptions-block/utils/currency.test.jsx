import currency from "./currency";

describe("Currency", () => {
	it("returns currency symbol based on name", () => {
		expect(currency("USD")).toBe("$");
	});

	it("returns null if currency is not supported", () => {
		expect(currency("HKD")).toBe(null);
	});
});