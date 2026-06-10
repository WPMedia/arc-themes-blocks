import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import mockData from "../../../mock-data";

import ExtraLarge from "./extra-large";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => true),
	Video: () => "video embed",
	getPromoType: jest.fn((element) => element?.type || null),
}));

describe("the extra large promo feature", () => {
	it("should return null if no show flag is true", () => {
		const config = {};
		const { container } = render(<ExtraLarge element={mockData} customFields={config} />);
		expect(container).toBeEmptyDOMElement();
	});

	it("should return an overline if showOverline is true", () => {
		const config = {
			showOverlineXL: true,
		};
		render(<ExtraLarge element={mockData} customFields={config} />);
		expect(screen.getByRole("link", { name: "Premium" })).not.toBeNull();
	});

	it("should return a headline if showHeadline is true", () => {
		const config = {
			showHeadlineXL: true,
		};
		render(<ExtraLarge element={mockData} customFields={config} />);
		expect(screen.getByRole("heading", { name: config.headline })).not.toBeNull();
	});

	it("should return a image if showImage is true", () => {
		const config = {
			imageRatioXL: "4:3",
			showImageXL: true,
		};
		render(<ExtraLarge element={mockData} customFields={config} />);
		expect(screen.getByRole("img", { name: config.headline })).not.toBeNull();
	});

	it("should return a fallback image if showImage is true and imageUrl is not valid", () => {
		const config = {
			imageRatio: "4:3",
			showImageXL: true,
		};
		render(<ExtraLarge element={mockData} customFields={config} />);
		expect(screen.getByRole("img", { name: config.headline })).not.toBeNull();
	});

	it("should return a description if showDescription is true", () => {
		const config = {
			showDescriptionXL: true,
		};
		render(<ExtraLarge element={mockData} customFields={config} />);
		expect(
			screen.getByText("Why does August seem hotter? Maybe it comes from weariness.")
		).not.toBeNull();
	});

	it("should return a byline if showByline is true", () => {
		const config = {
			showBylineXL: true,
		};
		render(<ExtraLarge element={mockData} customFields={config} />);
		expect(
			screen.getByText("global.by-text Example Author1, Example Author2, global.and-text Example Author3")
		).not.toBeNull();
	});

	it("should return a byline if showDate is true", () => {
		const config = {
			showDateXL: true,
		};
		render(<ExtraLarge element={mockData} customFields={config} />);
		expect(screen.getByText("January 30, 2020", { exact: false })).not.toBeNull();
	});

	it("should returned a sponsored overline if it's sponsored content", () => {
		const modifiedData = { ...mockData };
		modifiedData.owner = {
			sponsored: true,
		};
		modifiedData.label = {};
		const config = {
			showOverlineXL: true,
		};
		render(<ExtraLarge element={modifiedData} customFields={config} />);
		expect(screen.getByText("global.sponsored-content")).not.toBeNull();
	});

	it("should return a video if playVideoInPlace is true and video content available", () => {
		const modifiedData = { ...mockData };
		modifiedData.type = "story";
		modifiedData.promo_items = {
			lead_art: {
				type: "video",
				embed_html: "embed",
			},
		};
		const config = {
			playVideoInPlaceXL: true,
			showImageXL: true,
		};
		render(<ExtraLarge element={modifiedData} customFields={config} />);
		expect(screen.getByText("video embed")).not.toBeNull();
	});

	it("should not render bottom border when showBottomBorderXL is false", () => {
		const config = { showHeadlineXL: true, showBottomBorderXL: false };
		const { container } = render(<ExtraLarge element={mockData} customFields={config} />);
		expect(container.querySelector("hr")).toBeNull();
	});

	it("should render bottom border when showBottomBorderXL is undefined", () => {
		const config = { showHeadlineXL: true };
		const { container } = render(<ExtraLarge element={mockData} customFields={config} />);
		expect(container.querySelector("hr")).not.toBeNull();
	});

	it("should use empty formattedDate when display_date is invalid", () => {
		const elementBadDate = { ...mockData, display_date: "not-a-date" };
		const config = { showDateXL: true, showHeadlineXL: true };
		render(<ExtraLarge element={elementBadDate} customFields={config} />);
		expect(screen.queryByText("January 30, 2020", { exact: false })).toBeNull();
	});

	it("should use label for overline when labelDisplay is true and not sponsored", () => {
		// mockData has label.basic.display = true, owner is not sponsored
		const elementWithLabel = { ...mockData, owner: { sponsored: false } };
		const config = { showOverlineXL: true };
		render(<ExtraLarge element={elementWithLabel} customFields={config} />);
		// Label text "Premium" should be shown via shouldUseLabel path
		expect(screen.getByText("Premium")).not.toBeNull();
	});

	it("should use fallback image when element has no ANS image", () => {
		const elementNoImage = { ...mockData, promo_items: {} };
		const config = { showImageXL: true };
		const { container } = render(
			<ExtraLarge element={elementNoImage} customFields={config} fallbackImage="/fallback.jpg" />,
		);
		const img = container.querySelector("img");
		expect(img).not.toBeNull();
		expect(img.src).toContain("fallback");
	});

	it("should render icon label when element type is gallery", () => {
		const galleryElement = { ...mockData, type: "gallery" };
		const config = { showImageXL: true };
		const { container } = render(<ExtraLarge element={galleryElement} customFields={config} />);
		expect(container.querySelector(".b-top-table-list-xl__icon_label")).not.toBeNull();
	});
});
