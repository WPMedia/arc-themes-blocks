import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Small from "./small";

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({ arcSite: "the-sun" })),
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
		render(<Small element={elementWithImage} customFields={baseConfig} />);
		expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
		expect(screen.getByRole("heading")).toHaveTextContent("title");
	});

	it("renders a separator when showBottomBorderSM is true", () => {
		render(<Small element={elementWithImage} customFields={baseConfig} />);
		expect(screen.getByRole("separator")).toBeInTheDocument();
	});

	it("renders a placeholder image but no heading when headline is empty", () => {
		const { container } = render(<Small element={elementEmpty} customFields={baseConfig} />);
		// Placeholder images render with alt="" (decorative) so they have role "none", not "img"
		// eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
		expect(container.querySelector("img")).toBeInTheDocument();
		expect(screen.queryByRole("heading")).not.toBeInTheDocument();
	});

	it("renders only the headline when showImageSM is false", () => {
		render(<Small element={elementWithImage} customFields={{ ...baseConfig, showImageSM: false }} />);
		expect(screen.getByRole("heading")).toHaveTextContent("title");
		expect(screen.queryByRole("img", { hidden: true })).not.toBeInTheDocument();
	});

	it("renders only the image when showHeadlineSM is false", () => {
		render(
			<Small element={elementWithImage} customFields={{ ...baseConfig, showHeadlineSM: false }} />,
		);
		expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
		expect(screen.queryByRole("heading")).not.toBeInTheDocument();
	});

	it("does not render a separator when showBottomBorderSM is false", () => {
		render(
			<Small
				element={elementWithImage}
				customFields={{ ...baseConfig, showBottomBorderSM: false }}
			/>,
		);
		expect(screen.queryByRole("separator")).not.toBeInTheDocument();
	});
});
