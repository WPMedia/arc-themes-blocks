import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import DropdownLinkListItem from "./DropDownLinkListItem";

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		arcSite: "dagen",
	})),
}));

it("renders list item text and href", () => {
	render(<DropdownLinkListItem href="http://www.google.com" text="Google" />);
	expect(screen.getByRole("link")).toHaveTextContent("Google");
	expect(screen.getByRole("link")).toHaveAttribute("href", "http://www.google.com");
});
