import { render } from "@testing-library/react";

import Divider from ".";

describe("Divider", () => {
	it("should render hr tag", () => {
		const { container } = render(<Divider />);
		expect(container.getElementsByTagName("hr")).not.toBeNull();
	});

	it("should render additional classes", () => {
		const ORIGINAL_CLASSES = "c-divider";
		const ADDITIONAL_CLASSES = "additionalClass1";
		const { container } = render(<Divider className={ADDITIONAL_CLASSES} />);
		const element = container.getElementsByTagName("hr")[0];
		expect(element.classList.contains(ORIGINAL_CLASSES)).toBe(true);
		expect(element.classList.contains(ADDITIONAL_CLASSES)).toBe(true);
	});

	it("should have  arial-hidden as true if assistiveHidden prop is passed", () => {
		const { container } = render(<Divider assistiveHidden />);
		const element = container.getElementsByTagName("hr")[0];
		expect(element.getAttribute("aria-hidden")).toBe("true");
	});
});
