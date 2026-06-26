import { verifyJSON, ARCXP_CART, STRIPEINTENTS, PAYPAL } from "./constants";

describe("verifyJSON", () => {
	it("parses valid JSON and returns the result", () => {
		expect(verifyJSON('{"key":"value"}')).toEqual({ key: "value" });
	});

	it("returns false for invalid JSON", () => {
		expect(verifyJSON("not-valid-json")).toBe(false);
	});

	it("returns false for empty string", () => {
		expect(verifyJSON("")).toBe(false);
	});
});

describe("constants", () => {
	it("exports expected string constants", () => {
		expect(ARCXP_CART).toBe("ArcXP_cart");
		expect(STRIPEINTENTS).toBe("StripeIntents");
		expect(PAYPAL).toBe("PayPal");
	});
});
