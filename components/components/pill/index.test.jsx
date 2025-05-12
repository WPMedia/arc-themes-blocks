import { render, screen } from "@testing-library/react";

import Pill from ".";

const PILL_LINK = "./test-link";
const PILL_TEXT = "Hello World";

describe("Pill", () => {
	it("should render string child", () => {
		render(<Pill>{PILL_TEXT}</Pill>);
		expect(screen.queryByText(PILL_TEXT)).not.toBeNull();
	});

	it("should allow pass through of props", () => {
		render(<Pill id="custom-id">{PILL_TEXT}</Pill>);
		expect(screen.queryByText(PILL_TEXT)).toHaveAttribute("id", "custom-id");
	});

	it("should render string child as a link", () => {
		render(<Pill href={PILL_LINK}>{PILL_TEXT}</Pill>);
		expect(screen.queryByText(PILL_TEXT)).toHaveAttribute("href", PILL_LINK);
	});

	it("should render additional classes", () => {
		const ORIGINAL_CLASSES = "c-pill";
		const ADDITIONAL_CLASSES = "additionalClass1 additionalClass2";
		render(<Pill className={ADDITIONAL_CLASSES}>{PILL_TEXT}</Pill>);
		const element = screen.queryByText(PILL_TEXT);
		expect(element).toHaveClass(ADDITIONAL_CLASSES);
		expect(element).toHaveClass(ORIGINAL_CLASSES);
	});

	it("should render additional classes as a link", () => {
		const ORIGINAL_CLASSES = "c-pill";
		const ADDITIONAL_CLASSES = "additionalClass1 additionalClass2";
		render(
			<Pill className={ADDITIONAL_CLASSES} href={PILL_LINK}>
				{PILL_TEXT}
			</Pill>
		);
		const element = screen.queryByText(PILL_TEXT);
		expect(element).toHaveAttribute("href", PILL_LINK);
		expect(element).toHaveClass(ADDITIONAL_CLASSES);
		expect(element).toHaveClass(ORIGINAL_CLASSES);
	});
});
