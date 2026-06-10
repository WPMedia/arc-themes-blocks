import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
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
	getPromoType: jest.fn((element) => element?.type || null),
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

	it("renders a separator when showBottomBorderSM is undefined (default true)", () => {
		const { showBottomBorderSM: _, ...configWithoutBorder } = baseConfig;
		render(<Small element={elementWithImage} customFields={configWithoutBorder} />);
		expect(screen.getByRole("separator")).toBeInTheDocument();
	});

	it("renders an icon label when element type is gallery", () => {
		const galleryElement = { ...elementWithImage, type: "gallery" };
		const { container } = render(<Small element={galleryElement} customFields={baseConfig} />);
		// eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
		expect(container.querySelector(".b-top-table-list-small__icon_label")).toBeInTheDocument();
	});

	it("places image before heading when imagePosition is left", () => {
		const { container } = render(
			<Small element={elementWithImage} customFields={{ ...baseConfig, imagePositionSM: "left" }} />,
		);
		// eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
		const article = container.querySelector("article");
		// eslint-disable-next-line testing-library/no-node-access
		const children = Array.from(article.childNodes);
		// Image link comes before heading when position is left/above
		// eslint-disable-next-line testing-library/no-node-access
		const imgIdx = children.findIndex((n) => n.querySelector && n.querySelector("img"));
		const headingIdx = children.findIndex((n) => n.tagName === "H2" || (n.querySelector && n.querySelector("h2")));
		expect(imgIdx).toBeLessThan(headingIdx);
	});

	it("applies no position class when showImageSM or showHeadlineSM is false", () => {
		const { container } = render(
			<Small
				element={elementWithImage}
				customFields={{ ...baseConfig, showImageSM: false }}
			/>,
		);
		// eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
		const article = container.querySelector("article");
		expect(article.className).not.toContain("--right");
	});
});
