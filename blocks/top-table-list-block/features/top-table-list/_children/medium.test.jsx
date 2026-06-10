import React from "react";
import { render, screen } from "@testing-library/react";
import mockData from "../../../mock-data";

import Medium from "./medium";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => true),
	LazyLoad: ({ children }) => children,
	Video: () => "video embed",
	getPromoType: jest.fn((element) => element?.type || null),
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

	it("should show bottom border when showBottomBorderMD is undefined (default true)", () => {
		// showBottomBorderMD not passed — typeof undefined branch resolves to true
		const config = { showHeadlineMD: true };
		const { container } = render(<Medium element={mockData} customFields={config} />);
		expect(container.querySelector("hr")).not.toBeNull();
	});

	it("should not show bottom border when showBottomBorderMD is false", () => {
		const config = { showHeadlineMD: true, showBottomBorderMD: false };
		const { container } = render(<Medium element={mockData} customFields={config} />);
		expect(container.querySelector("hr")).toBeNull();
	});

	it("should not format date when display_date is invalid", () => {
		const elementNoDate = { ...mockData, display_date: "not-a-date" };
		const config = { showDateMD: true };
		render(<Medium element={elementNoDate} customFields={config} />);
		// A DateComponent should still be rendered but with empty dateString
		expect(screen.queryByText("January 30, 2020", { exact: false })).toBeNull();
	});

	it("should render icon label when element type is gallery", () => {
		const galleryElement = { ...mockData, type: "gallery" };
		const config = { showImageMD: true };
		const { container } = render(<Medium element={galleryElement} customFields={config} />);
		expect(container.querySelector(".b-top-table-list-medium__icon_label")).not.toBeNull();
	});
});
