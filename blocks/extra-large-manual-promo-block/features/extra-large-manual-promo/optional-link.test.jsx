import React from "react";
import { render, screen } from "@testing-library/react";
import OptionalLink from "./optional-link";

jest.mock("fusion:context", () => ({
	useComponentContext: jest.fn(() => ({
		registerSuccessEvent: () => ({}),
	})),
}));

describe("the extra large promo feature - OptionalLink", () => {
	it("should return the children if there is no url", () => {
		const { container } = render(
			<OptionalLink>
				<div>child node</div>
			</OptionalLink>
		);
		expect(container.firstChild).toBe(screen.getByText("child node"));
	});

	it("should return the link containing the children if there is a url", () => {
		const { container } = render(
			<OptionalLink href="#">
				<div>child node</div>
			</OptionalLink>
		);
		expect(container.firstChild).toBe(screen.getByRole("link"));
	});
});
