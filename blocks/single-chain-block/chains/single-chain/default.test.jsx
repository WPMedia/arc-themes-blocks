import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SingleChain from "./default";

jest.mock("@wpmedia/arc-themes-components", () => ({
	Heading: ({ children, className }) => <h2 className={className}>{children}</h2>,
	HeadingSection: ({ children }) => <div>{children}</div>,
	Stack: ({ children, className }) => <div className={className}>{children}</div>,
}));

describe("single chain", () => {
	it("renders children content", () => {
		render(
			<SingleChain>
				<p>one chainz</p>
			</SingleChain>,
		);
		expect(screen.getByText("one chainz")).toBeInTheDocument();
	});

	it("renders null when the only child is null", () => {
		const { container } = render(<SingleChain>{null}</SingleChain>);
		expect(container).toBeEmptyDOMElement();
	});

	it("renders null when no children are provided", () => {
		const { container } = render(<SingleChain />);
		expect(container).toBeEmptyDOMElement();
	});

	it("renders a heading from the custom field", () => {
		render(<SingleChain customFields={{ heading: "Single Chain Heading" }} />);
		expect(screen.getByRole("heading")).toHaveTextContent("Single Chain Heading");
	});

	it("renders both the heading and children when provided together", () => {
		render(
			<SingleChain customFields={{ heading: "Single Chain Heading" }}>
				<p>Test</p>
			</SingleChain>,
		);
		expect(screen.getByRole("heading")).toHaveTextContent("Single Chain Heading");
		expect(screen.getByText("Test")).toBeInTheDocument();
	});

	it("does not render a heading when the heading field is an empty string", () => {
		render(
			<SingleChain customFields={{ heading: "" }}>
				<p>Test</p>
			</SingleChain>,
		);
		expect(screen.queryByRole("heading")).not.toBeInTheDocument();
		expect(screen.getByText("Test")).toBeInTheDocument();
	});
});
