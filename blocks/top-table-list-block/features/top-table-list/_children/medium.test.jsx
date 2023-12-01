import React from "react";
import { render, screen } from "@testing-library/react";
import mockData from "../../../mock-data";

import Medium from "./medium";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => true),
	LazyLoad: ({ children }) => children,
	Video: () => "video embed",
}));

describe("the medium promo feature", () => {
	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	it("should return null if none of the show... flags are true", () => {
		const config = {};
		const { container } = render(<Medium element={mockData} customFields={config} />);
		expect(container.firstChild).toBeNull();
	});

	it("should display a headline if showHeadline is true", () => {
		const config = {
			showHeadlineMD: true,
		};
		render(<Medium element={mockData} customFields={config} />);

		expect(screen.queryByRole("heading", { name: config.headline })).not.toBeNull();
	});

	it("should display an image if showImage is true", () => {
		const config = {
			imageRatioMD: "4:3",
			showImageMD: true,
		};
		render(<Medium element={mockData} customFields={config} />);
		expect(screen.queryByRole("img", { name: config.headline })).not.toBeNull();
	});

	it("should display a fallback image if showImage is true and imageUrl is not valid", () => {
		const config = {
			imageRatioMD: "4:3",
			showImageMD: true,
		};
		render(<Medium element={mockData} customFields={config} />);
		expect(screen.queryByRole("img", { name: config.headline })).not.toBeNull();
	});

	it("should display a description if showDescription is true", () => {
		const config = {
			showDescriptionMD: true,
		};
		render(<Medium element={mockData} customFields={config} />);
		expect(
			screen.queryByText("Why does August seem hotter? Maybe it comes from weariness."),
		).not.toBeNull();
	});

	it("should display a byline if showByline is true", () => {
		const config = {
			showBylineMD: true,
		};
		const { getByText } = render(<Medium element={mockData} customFields={config} />);
		expect(
			getByText("global.by-text Example Author1, Example Author2, global.and-text Example Author3"),
		).not.toBeNull();
	});

	it("should display a date if showDate is true", () => {
		const config = {
			showDateMD: true,
		};
		render(<Medium element={mockData} customFields={config} />);
		expect(screen.queryByText("January 30, 2020", { exact: false })).not.toBeNull();
	});
});
