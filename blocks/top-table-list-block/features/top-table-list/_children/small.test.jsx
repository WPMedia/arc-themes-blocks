import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useFusionContext } from "fusion:context";
import { useContent } from "fusion:content";
import Small from "./small";

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({ arcSite: "the-sun" })),
}));

jest.mock("fusion:content", () => ({
	useContent: jest.fn(),
	useEditableContent: jest.fn(() => ({
		editableContent: () => ({ contentEditable: "true" }),
		searchableField: () => ({}),
	})),
}));

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
}));

const baseConfig = {
	showHeadlineSM: true,
	showImageSM: true,
	showBottomBorderSM: true,
	imagePositionSM: "right",
};

const elementWithImage = {
	headlines: { basic: "title" },
	promo_items: {
		basic: { _id: "123", type: "image", url: "pic.jpg", auth: { 2: "ABC" } },
	},
	websites: { "the-sun": { website_url: "https://arcxp.com" } },
};

const elementEmpty = {
	headlines: { basic: "" },
	promo_items: {},
	websites: { "the-sun": { website_url: "https://arcxp.com" } },
};

describe("small promo block", () => {
	it("renders an image and headline when both are provided", () => {
		const { container } = render(<Small element={elementWithImage} customFields={baseConfig} />);
		// Image is inside an assistiveHidden link, so query via DOM
		expect(container.querySelector("img")).toBeInTheDocument();
		expect(screen.getByRole("heading")).toHaveTextContent("title");
	});

	it("renders a separator when showBottomBorderSM is true", () => {
		const { container } = render(<Small element={elementWithImage} customFields={baseConfig} />);
		expect(container.querySelector("hr")).toBeInTheDocument();
	});

	it("renders a placeholder image but no heading when headline is empty", () => {
		const { container } = render(<Small element={elementEmpty} customFields={baseConfig} />);
		expect(container.querySelector("img")).toBeInTheDocument();
		expect(screen.queryByRole("heading")).not.toBeInTheDocument();
	});

	it("renders only the headline when showImageSM is false", () => {
		const { container } = render(
			<Small element={elementWithImage} customFields={{ ...baseConfig, showImageSM: false }} />,
		);
		expect(screen.getByRole("heading")).toHaveTextContent("title");
		expect(container.querySelector("img")).not.toBeInTheDocument();
	});

	it("renders only the image when showHeadlineSM is false", () => {
		const { container } = render(
			<Small element={elementWithImage} customFields={{ ...baseConfig, showHeadlineSM: false }} />,
		);
		expect(container.querySelector("img")).toBeInTheDocument();
		expect(screen.queryByRole("heading")).not.toBeInTheDocument();
	});

	it("does not render a separator when showBottomBorderSM is false", () => {
		const { container } = render(
			<Small
				element={elementWithImage}
				customFields={{ ...baseConfig, showBottomBorderSM: false }}
			/>,
		);
		expect(container.querySelector("hr")).not.toBeInTheDocument();
	});
});
