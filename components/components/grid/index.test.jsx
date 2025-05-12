import { render, screen } from "@testing-library/react";

import Grid from ".";

describe("Grid", () => {
	it("should render string child", () => {
		render(<Grid>Hello World</Grid>);
		expect(screen.queryByText("Hello World")).not.toBeNull();
	});

	it("should render additional classes", () => {
		const ORIGINAL_CLASSES = "c-grid";
		const ADDITIONAL_CLASSES = "additionalClass1 additionalClass2";
		render(<Grid className={ADDITIONAL_CLASSES}>Hello World</Grid>);
		const element = screen.queryByText("Hello World");
		expect(element).toHaveClass(ADDITIONAL_CLASSES);
		expect(element).toHaveClass(ORIGINAL_CLASSES);
	});
});
