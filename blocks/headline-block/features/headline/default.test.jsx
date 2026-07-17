import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useFusionContext } from "fusion:context";
import HeadlineContainer from "./default";

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(),
}));

describe("the headline feature", () => {
	it("renders an h1 with b-headline class when headline content is present", () => {
		useFusionContext.mockReturnValue({
			globalContent: { headlines: { basic: "headline for our story" } },
			arcSite: "the-sun",
		});
		render(<HeadlineContainer />);
		expect(screen.getByRole("heading", { level: 1 })).toHaveClass("b-headline");
	});

	it("renders the headline text", () => {
		useFusionContext.mockReturnValue({
			globalContent: { headlines: { basic: "headline for our story" } },
			arcSite: "the-sun",
		});
		render(<HeadlineContainer />);
		expect(screen.getByRole("heading")).toHaveTextContent("headline for our story");
	});

	it("renders nothing when headline content is not present", () => {
		useFusionContext.mockReturnValue({ globalContent: {}, arcSite: "the-sun" });
		const { container } = render(<HeadlineContainer />);
		expect(container).toBeEmptyDOMElement();
	});

	it("renders nothing when globalContent is missing", () => {
		useFusionContext.mockReturnValue({});
		const { container } = render(<HeadlineContainer />);
		expect(container).toBeEmptyDOMElement();
	});
});
