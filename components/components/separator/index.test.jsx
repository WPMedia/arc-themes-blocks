import { render } from "@testing-library/react";

import Separator from ".";

describe("Separator", () => {
	it("should render base class with base text", () => {
		const { container } = render(<Separator />);
		const renderedSeparator = container.querySelector(".c-separator");
		expect(renderedSeparator).not.toBeNull();
	});

	it("should allow pass through of props", () => {
		const { container } = render(<Separator id="custom-id" />);
		const renderedSeparator = container.querySelector(".c-separator");

		expect(renderedSeparator).toHaveAttribute("id", "custom-id");
	});

	it("should render additional class", () => {
		const ORIGINAL_CLASSES = "c-separator";
		const ADDITIONAL_CLASS = "additionalClass1";
		const { container } = render(<Separator className={ADDITIONAL_CLASS} />);
		expect(container.querySelector(`.${ORIGINAL_CLASSES}`)).not.toBeNull();
		expect(container.querySelector(`.${ADDITIONAL_CLASS}`)).not.toBeNull();
	});

	it("should render custom separator string", () => {
		const { container } = render(<Separator separatorString="🚨" />);
		const renderedSeparator = container.querySelector(".c-separator");
		expect(renderedSeparator).not.toBeNull();
	});
});
