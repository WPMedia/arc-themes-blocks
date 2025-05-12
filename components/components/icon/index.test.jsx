import { render, screen } from "@testing-library/react";

import * as Icons from "./icons";

import Icon from ".";

describe("Icon", () => {
	it("should render Icon", () => {
		const { container } = render(<Icon name="User" />);
		expect(container.querySelectorAll("svg")).toHaveLength(1);
	});

	it("should allow pass through of props", () => {
		const { container } = render(<Icon name="User" id="custom-id" />);
		expect(container.querySelectorAll("svg")).toHaveLength(1);
		expect(container.querySelector(".c-icon")).toHaveAttribute("id", "custom-id");
	});

	it("should render Icon with title when context is image", () => {
		render(<Icon name="User" context="image" title="Icon Title" />);

		expect(screen.getByTitle("Icon Title")).not.toBeNull();
	});

	it("should render icon", () => {
		Object.keys(Icons).forEach((key) => {
			const { container } = render(<Icon name={key} />);
			expect(container.querySelectorAll("svg")).toHaveLength(1);
		});
	});

	it("should render Icon with title and description when context is image", () => {
		render(<Icon name="User" context="image" title="Icon Title" description="Des" />);

		expect(screen.getByTitle("Icon Title")).not.toBeNull();
		expect(screen.getByText("Des")).not.toBeNull();
	});

	it("should render additional classes", () => {
		const ORIGINAL_CLASSES = "c-icon";
		const ADDITIONAL_CLASSES = "additionalClass1 additionalClass2";
		const { container } = render(<Icon className={ADDITIONAL_CLASSES} name="User" />);

		const element = container.querySelectorAll("svg")[0];
		expect(element).toHaveClass(ADDITIONAL_CLASSES);
		expect(element).toHaveClass(ORIGINAL_CLASSES);
	});
});
