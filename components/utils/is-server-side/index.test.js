import isServerSide from ".";

describe("isServerSide", () => {
	it("should return true is window object is undefined", () => {
		const windowSpy = jest.spyOn(global, "window", "get");
		windowSpy.mockImplementationOnce(() => undefined);
		expect(isServerSide()).toBe(true);
	});

	it("should return false is window object is not undefined", () => {
		expect(isServerSide()).toBe(false);
	});
});
