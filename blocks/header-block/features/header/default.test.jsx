import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./default";

jest.mock("@wpmedia/arc-themes-components", () => ({
	Heading: ({ children, className }) => <h2 className={className}>{children}</h2>,
	HeadingSection: ({ children }) => <div>{children}</div>,
}));

describe("The header block", () => {
	it("renders the provided text", () => {
		render(<Header customFields={{ text: "Header", size: "Extra Large" }} />);
		expect(screen.getByText("Header")).toBeInTheDocument();
	});

	it("applies extra-large modifier for Extra Large size", () => {
		render(<Header customFields={{ text: "Extra Large Header", size: "Extra Large" }} />);
		expect(screen.getByRole("heading")).toHaveClass("b-header--extra-large");
	});

	it("applies large modifier for Large size", () => {
		render(<Header customFields={{ text: "Large Header", size: "Large" }} />);
		expect(screen.getByRole("heading")).toHaveClass("b-header--large");
	});

	it("applies medium modifier for Medium size", () => {
		render(<Header customFields={{ text: "Medium Header", size: "Medium" }} />);
		expect(screen.getByRole("heading")).toHaveClass("b-header--medium");
	});

	it("applies small modifier for Small size", () => {
		render(<Header customFields={{ text: "Small Header", size: "Small" }} />);
		expect(screen.getByRole("heading")).toHaveClass("b-header--small");
	});

	it("defaults to medium modifier when size is empty", () => {
		render(<Header customFields={{ text: "Header", size: "" }} />);
		expect(screen.getByRole("heading")).toHaveClass("b-header--medium");
	});

	it("renders an empty heading when text is empty", () => {
		render(<Header customFields={{ text: "", size: "" }} />);
		expect(screen.getByRole("heading")).toHaveClass("b-header--medium");
		expect(screen.getByRole("heading").textContent).toBe("");
	});

	it("falls back gracefully when no customFields are provided", () => {
		render(<Header />);
		expect(screen.getByRole("heading")).toHaveClass("b-header--medium");
	});
});
