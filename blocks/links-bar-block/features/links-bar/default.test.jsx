import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useContent } from "fusion:content";
import LinksBar from "./default";

jest.mock("fusion:content", () => ({
	useContent: jest.fn(),
}));

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({ arcSite: "the-sun", id: "testId" })),
}));

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	usePhrases: jest.fn(() => ({ t: (key) => key })),
}));

const twoLinks = [
	{ _id: "id_1", name: "test link 1" },
	{ _id: "id_2", name: "test link 2" },
];

describe("the links bar feature", () => {
	beforeEach(() => {
		useContent.mockReturnValue({ children: twoLinks });
	});

	it("renders a nav landmark", () => {
		render(<LinksBar customFields={{ navigationConfig: "links" }} />);
		expect(screen.getByRole("navigation")).toBeInTheDocument();
	});

	it("renders links matching the number of children returned", () => {
		const fourLinks = [
			{ _id: "id_1", name: "test link 1" },
			{ _id: "id_2", name: "test link 2" },
			{ _id: "id_3", node_type: "link", url: "/", display_name: "Link Text" },
			{ _id: "id_4", node_type: "link", url: "http://arcpublishing.com", display_name: "External" },
		];
		useContent.mockReturnValue({ children: fourLinks });

		render(<LinksBar customFields={{ navigationConfig: "links" }} />);

		expect(screen.getAllByRole("link")).toHaveLength(4);
	});

	it("opens external links in a new tab", () => {
		const links = [{ _id: "id_1", node_type: "link", url: "http://arcpublishing.com", display_name: "External" }];
		useContent.mockReturnValue({ children: links });

		render(<LinksBar customFields={{ navigationConfig: "links" }} />);

		const externalLink = screen.getByRole("link", { name: /external/i });
		expect(externalLink).toHaveAttribute("target", "_blank");
	});

	it("does not add target=_blank to internal links", () => {
		const links = [{ _id: "id_1", name: "test link 1" }];
		useContent.mockReturnValue({ children: links });

		render(<LinksBar customFields={{ navigationConfig: "links" }} />);

		const link = screen.getByRole("link");
		expect(link).not.toHaveAttribute("target", "_blank");
	});

	it("renders nothing when useContent returns no children", () => {
		useContent.mockReturnValue(null);

		const { container } = render(<LinksBar customFields={{ navigationConfig: "links" }} />);

		expect(container).toBeEmptyDOMElement();
	});

	it("uses the default aria-label when none is provided", () => {
		render(<LinksBar customFields={{ navigationConfig: "links" }} />);
		expect(screen.getByRole("navigation")).toHaveAttribute(
			"aria-label",
			"links-bar-block.element-aria-label",
		);
	});

	it("uses a custom aria-label when provided", () => {
		render(<LinksBar customFields={{ navigationConfig: "links", ariaLabel: "Links" }} />);
		expect(screen.getByRole("navigation")).toHaveAttribute("aria-label", "Links");
	});

	it("falls back to the default aria-label when the custom field is an empty string", () => {
		render(<LinksBar customFields={{ navigationConfig: "links", ariaLabel: "" }} />);
		expect(screen.getByRole("navigation")).toHaveAttribute(
			"aria-label",
			"links-bar-block.element-aria-label",
		);
	});
});
