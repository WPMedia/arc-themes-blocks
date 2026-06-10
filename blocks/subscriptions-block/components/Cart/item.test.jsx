import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Item from "./item";

describe("Cart Item", () => {
	it("renders item name", () => {
		render(<Item name="Premium Monthly" className="b-checkout" />);
		expect(screen.getByText("Premium Monthly")).not.toBeNull();
	});

	it("renders item description when provided", () => {
		render(<Item name="Premium Monthly" description="$10/month" className="b-checkout" />);
		expect(screen.getByTestId("cart-item-description")).not.toBeNull();
	});

	it("does not render description element when not provided", () => {
		render(<Item name="Premium Monthly" className="b-checkout" />);
		expect(screen.queryByTestId("cart-item-description")).toBeNull();
	});

	it("renders additionalInfo when provided", () => {
		render(
			<Item name="Due Today" description="$10" additionalInfo="+ tax" className="b-checkout" />,
		);
		expect(screen.getByText("+ tax")).not.toBeNull();
	});

	it("does not render additionalInfo when not provided", () => {
		render(<Item name="Premium Monthly" className="b-checkout" />);
		expect(screen.queryByTestId("cart-item-info")).toBeNull();
	});
});
