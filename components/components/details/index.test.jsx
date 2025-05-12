import { render, screen } from "@testing-library/react";

import Details from ".";

describe("Details", () => {
	it("should render summary and children", () => {
		render(<Details summary="Summary">Hello World</Details>);
		expect(screen.queryByText("Summary")).not.toBeNull();
		expect(screen.queryByText("Hello World")).not.toBeNull();
	});

	it("should render additional classes", () => {
		const ORIGINAL_CLASSES = "c-details";
		const ADDITIONAL_CLASSES = "additionalClass1 additionalClass2";
		const { container } = render(
			<Details className={ADDITIONAL_CLASSES} summary="Summary">
				Hello World
			</Details>,
		);
		const element = container.querySelector("details");
		expect(element).toHaveClass(ADDITIONAL_CLASSES);
		expect(element).toHaveClass(ORIGINAL_CLASSES);
	});

	it("should render with custom Icon", () => {
		render(
			<Details summary="Summary" icon={<>Icon</>} iconPlacement="left">
				Hello World
			</Details>,
		);
		expect(screen.queryByText("Summary")).not.toBeNull();
		expect(screen.queryByText("Hello World")).not.toBeNull();
		expect(screen.queryByText("Icon")).not.toBeNull();
	});

	it("should render children as HTML", () => {
		const childMockHTML = "Hello<br />World \u00F7";
		const { container } = render(
			<Details summary="Summary" icon={<>Icon</>} iconPlacement="left" childrenHTML>
				{childMockHTML}
			</Details>,
		);

		expect(screen.queryByText("Summary")).not.toBeNull();
		expect(screen.queryByText("Icon")).not.toBeNull();

		const element = container.querySelector("details > div");
		expect(element.outerHTML).toMatchInlineSnapshot(
			`"<div class="c-details__content">Hello<br>World ÷</div>"`,
		);
	});
});
