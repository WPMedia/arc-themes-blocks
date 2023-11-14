import React from "react";
import { render } from "@testing-library/react";
import Item from "./item";

const BLOCK_CLASS_NAME = "b-checkout";

describe("Cart Item", () => {
	it("renders name, description and additional info", () => {
		const props = {
			name: "Name",
			description: "Item description",
			additionalInfo: "Some addtional information for an item",
		};
		render(<Item className={BLOCK_CLASS_NAME} {...props} />);

		expect(screen.getByText(props.name)).not.toBeNull();
		expect(screen.getByText(props.description)).not.toBeNull();
		expect(screen.getByText(props.additionalInfo)).not.toBeNull();
	});

	it("renders name, description", () => {
		const props = {
			name: "Name",
			description: "Item description",
		};
		render(<Item className={BLOCK_CLASS_NAME} {...props} />);

		expect(screen.getByText(props.name)).not.toBeNull();
		expect(screen.getByText(props.description)).not.toBeNull();
		expect(screen.getByText(props.additionalInfo)).toBeNull();
	});

	it("renders name only", () => {
		const props = {
			name: "Name",
		};
		const wrapper = mount(<Item className={BLOCK_CLASS_NAME} {...props} />);

		expect(screen.getByText(props.name)).not.toBeNull();
		expect(screen.getByText(props.description)).toBeNull();
		expect(screen.getByText(props.additionalInfo)).toBeNull();
	});
});