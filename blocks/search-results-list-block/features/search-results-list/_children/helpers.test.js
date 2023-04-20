import { resolveDefaultPromoElements } from "./helpers";

describe("Search Results List - Helpers", () => {
	it("should return all true for undefined values", () => {
		expect(resolveDefaultPromoElements()).toMatchObject({
			showByline: true,
			showDate: true,
			showDescription: true,
			showHeadline: true,
			showImage: true,
		});
	});

	it("should not override explicit values", () => {
		expect(
			resolveDefaultPromoElements({
				showByline: false,
				showDate: "true",
			})
		).toMatchObject({
			showByline: false,
			showDate: "true",
			showDescription: true,
			showHeadline: true,
			showImage: true,
		});
	});
});
