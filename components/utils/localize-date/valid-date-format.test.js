import isValidDateFormatString from "./valid-date-format";

describe("Date format validater", () => {
	it("allows a date with valid %{letter} format", () => {
		expect(isValidDateFormatString("%d")).toBe(true);
	});
	it("allows a date format with a %{letter}fff letters after", () => {
		// will return '1fffff'
		expect(isValidDateFormatString("%dffff")).toBe(true);
	});
	it("allows a date format with many %{letter}%{letter} valid options", () => {
		expect(isValidDateFormatString("%d%d")).toBe(true);
	});
	it("disallows a date format that is null", () => {
		expect(isValidDateFormatString(null)).toBe(false);
	});
	it("disallows a date format that is undefined", () => {
		expect(isValidDateFormatString(undefined)).toBe(false);
	});
	it("does not pass a date format with only a %{number}", () => {
		expect(isValidDateFormatString("%5")).toBe(false);
	});
});
