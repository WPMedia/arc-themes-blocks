import { render, screen } from "@testing-library/react";

import Badge from ".";

const BADGE_TEXT = "Hello World";
describe("Badge", () => {
	it("Should render string child.", () => {
		render(<Badge>{BADGE_TEXT}</Badge>);
		expect(screen.getByText(BADGE_TEXT)).not.toBeNull();
	});

	it("should allow pass through of props", () => {
		render(<Badge id="custom-id">{BADGE_TEXT}</Badge>);
		expect(screen.queryByText(BADGE_TEXT)).toHaveAttribute("id", "custom-id");
	});

	it("should render additional classes", () => {
		const ORIGINAL_CLASSES = "c-badge";
		const ADDITIONAL_CLASSES = "additionalClass1 additionalClass2";
		render(<Badge className={ADDITIONAL_CLASSES}>{BADGE_TEXT}</Badge>);
		const element = screen.queryByText(BADGE_TEXT);
		expect(element).toHaveClass(ADDITIONAL_CLASSES);
		expect(element).toHaveClass(ORIGINAL_CLASSES);
	});

	it("should use the 'default' className when no variant is indicated.", () => {
		const DEFAULT_CLASS = "c-badge--default";
		render(<Badge>{BADGE_TEXT}</Badge>);
		const element = screen.queryByText(BADGE_TEXT);
		expect(element).toHaveClass(DEFAULT_CLASS);
	});

	it("should use a variant's respective className.", () => {
		const variant = "success";
		const SUCCESS_CLASS = "c-badge--success";
		render(<Badge variant={variant}>{BADGE_TEXT}</Badge>);
		const element = screen.queryByText(BADGE_TEXT);
		expect(element).toHaveClass(SUCCESS_CLASS);
	});
});
