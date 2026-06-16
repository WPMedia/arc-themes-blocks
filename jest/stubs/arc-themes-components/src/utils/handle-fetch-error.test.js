const { handleFetchError } = require("./handle-fetch-error");

describe("handleFetchError", () => {
	it("re-throws the provided error", () => {
		const error = new Error("Network error");
		expect(() => handleFetchError(error)).toThrow("Network error");
	});

	it("throws the exact error object", () => {
		const error = new Error("fetch failed");
		expect(() => handleFetchError(error)).toThrow(error);
	});
});
