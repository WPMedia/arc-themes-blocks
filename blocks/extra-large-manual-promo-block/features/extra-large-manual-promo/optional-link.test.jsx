import React from "react";
import { render, screen } from "@testing-library/react";
import OptionalLink from "./optional-link";

jest.mock("fusion:context", () => ({
	useComponentContext: jest.fn(() => ({
		registerSuccessEvent: () => ({}),
	})),
}));

describe("the extra large promo feature - OptionalLink", () => {
	it("should return null if lazyLoad on the server and not in the admin", () => {
		const { container } = render(
			<OptionalLink>
				<div>child node</div>
			</OptionalLink>
		);
		expect(container.firstChild).toBe(screen.getByText("child node"));
	});

	it("should return null if lazyLoad on the server and not in the admin", () => {
		const { container } = render(
			<OptionalLink href="#">
				<div>child node</div>
			</OptionalLink>
		);
		expect(container.firstChild).toBe(screen.getByRole("link"));
	});
});
