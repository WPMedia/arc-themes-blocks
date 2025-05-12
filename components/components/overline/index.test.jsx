import { render, screen } from "@testing-library/react";

import Overline from ".";

const OVERLINE_LINK = "./test-link";
const OVERLINE_TEXT = "Hello World";

describe("Overline", () => {
	it("should render string child", () => {
		render(<Overline>{OVERLINE_TEXT}</Overline>);
		expect(screen.queryByText(OVERLINE_TEXT)).not.toBeNull();
	});

	it("should allow pass through of props", () => {
		render(<Overline id="custom-id">{OVERLINE_TEXT}</Overline>);
		expect(screen.queryByText(OVERLINE_TEXT)).toHaveAttribute("id", "custom-id");
	});

	it("should render string child as a link", () => {
		render(<Overline href={OVERLINE_LINK}>{OVERLINE_TEXT}</Overline>);
		expect(screen.queryByText(OVERLINE_TEXT)).toHaveAttribute("href", OVERLINE_LINK);
	});

	it("should render additional classes", () => {
		const ORIGINAL_CLASSES = "c-overline";
		const ADDITIONAL_CLASSES = "additionalClass1 additionalClass2";
		render(<Overline className={ADDITIONAL_CLASSES}>{OVERLINE_TEXT}</Overline>);
		const element = screen.queryByText(OVERLINE_TEXT);
		expect(element).toHaveClass(ADDITIONAL_CLASSES);
		expect(element).toHaveClass(ORIGINAL_CLASSES);
	});

	it("should render additional classes as a link", () => {
		const ORIGINAL_CLASSES = "c-overline";
		const ADDITIONAL_CLASSES = "additionalClass1 additionalClass2";
		render(
			<Overline className={ADDITIONAL_CLASSES} href={OVERLINE_LINK}>
				{OVERLINE_TEXT}
			</Overline>
		);
		const element = screen.queryByText(OVERLINE_TEXT);
		expect(element).toHaveAttribute("href", OVERLINE_LINK);
		expect(element).toHaveClass(ADDITIONAL_CLASSES);
		expect(element).toHaveClass(ORIGINAL_CLASSES);
	});
});
