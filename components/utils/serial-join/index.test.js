import { render } from "@testing-library/react";

import serialJoin from ".";

describe("serial join utility function", () => {
	it("should return nothing if nothing passed in", () => {
		const { container } = render(serialJoin());
		expect(container).toBeEmptyDOMElement();
	});
	it("should return nothing if empty array passed in", () => {
		const { container } = render(serialJoin([]));
		expect(container).toBeEmptyDOMElement();
	});
	it("should return nothing if null", () => {
		const { container } = render(serialJoin([null]));
		expect(container).toBeEmptyDOMElement();
	});
	it("should return nothing if undefined value passed in", () => {
		const { container } = render(serialJoin([undefined]));
		expect(container).toBeEmptyDOMElement();
	});
	it("should return properly formatted for a single item", () => {
		const { container } = render(serialJoin(["one"]));
		expect(container.textContent).toBe("one");
	});
	it("should return properly formatted for two items", () => {
		const { container } = render(serialJoin(["one", "two"]));
		expect(container.textContent).toBe("one and two");
	});
	it("should return properly formatted for three items", () => {
		const { container } = render(serialJoin(["one", "two", "three"]));
		expect(container.textContent).toBe("one, two, and three");
	});
	it("should return properly formatted for three items for custom conjunction", () => {
		const { container } = render(serialJoin(["one", "two", "three"], "or"));
		expect(container.textContent).toBe("one, two, or three");
	});
	it("should return properly formatted for three items for custom delimiter", () => {
		const { container } = render(serialJoin(["one", "two", "three"], undefined, "/"));
		expect(container.textContent).toBe("one/ two/ and three");
	});
	it("should return properly formatted for three items for custom spacer", () => {
		const { container } = render(serialJoin(["one", "two", "three"], undefined, undefined, ""));
		expect(container.textContent).toBe("one,two,andthree");
	});
	it("should not render inappropriate values", () => {
		const { container } = render(serialJoin([[], "one", null, "two", undefined, "three", {}]));
		expect(container.textContent).toBe("one, two, and three");
	});
});
