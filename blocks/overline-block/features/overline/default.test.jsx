import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useFusionContext } from "fusion:context";
import Overline from "./default";

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(),
}));

jest.mock("fusion:content", () => ({
	useEditableContent: jest.fn(() => ({ editableContent: jest.fn(() => ({})) })),
}));

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	usePhrases: jest.fn(() => ({ t: (key) => key })),
}));

const baseContext = {
	arcSite: "site",
	globalContent: {
		_id: "12345",
		websites: {
			site: { website_section: { _id: "/news", name: "News" } },
		},
	},
};

describe("overline feature", () => {
	describe("when website_section content is present", () => {
		beforeEach(() => {
			useFusionContext.mockReturnValue(baseContext);
		});

		it("renders a link with the b-overline class", () => {
			render(<Overline />);
			expect(screen.getByRole("link")).toHaveClass("b-overline");
		});

		it("renders the section name as link text", () => {
			render(<Overline />);
			expect(screen.getByText("News")).toBeInTheDocument();
		});
	});

	describe("when label.basic.display is true with a url", () => {
		it("displays the label text and links to the label url", () => {
			useFusionContext.mockReturnValue({
				...baseContext,
				globalContent: {
					...baseContext.globalContent,
					label: { basic: { display: true, text: "EXCLUSIVE", url: "/exclusive" } },
				},
			});
			render(<Overline />);
			expect(screen.getByText("EXCLUSIVE")).toBeInTheDocument();
			expect(screen.getByRole("link")).toBeInTheDocument();
		});
	});

	describe("when label.basic.url is missing", () => {
		it("renders the label text without a link", () => {
			useFusionContext.mockReturnValue({
				...baseContext,
				globalContent: {
					...baseContext.globalContent,
					label: { basic: { display: true, text: "EXCLUSIVE" } },
				},
			});
			render(<Overline />);
			expect(screen.getByText("EXCLUSIVE")).toBeInTheDocument();
			expect(screen.queryByRole("link")).not.toBeInTheDocument();
		});
	});

	describe("when label.basic.url is an empty string", () => {
		it("renders the label text without a link", () => {
			useFusionContext.mockReturnValue({
				...baseContext,
				globalContent: {
					...baseContext.globalContent,
					label: { basic: { display: true, text: "EXCLUSIVE", url: "" } },
				},
			});
			render(<Overline />);
			expect(screen.getByText("EXCLUSIVE")).toBeInTheDocument();
			expect(screen.queryByRole("link")).not.toBeInTheDocument();
		});
	});

	describe("when label.basic.display is false", () => {
		it("falls back to the website section name", () => {
			useFusionContext.mockReturnValue({
				...baseContext,
				globalContent: {
					...baseContext.globalContent,
					label: { basic: { display: false, text: "EXCLUSIVE", url: "/exclusive/" } },
				},
			});
			render(<Overline />);
			expect(screen.getByText("News")).toBeInTheDocument();
		});
	});

	describe("when globalContent is not present", () => {
		it("renders nothing", () => {
			useFusionContext.mockReturnValue({});
			const { container } = render(<Overline />);
			expect(container).toBeEmptyDOMElement();
		});
	});
});
