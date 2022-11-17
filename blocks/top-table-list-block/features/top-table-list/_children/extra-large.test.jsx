import React from "react";
import { render, screen } from "@testing-library/react";
import mockData from "../../../mock-data";

import ExtraLarge from "./extra-large";

jest.mock("@wpmedia/engine-theme-sdk", () => ({
	...jest.requireActual("@wpmedia/engine-theme-sdk"),
}));

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => true),
	Video: () => "video embed",
}));

describe("the extra large promo feature", () => {
	it("should return null if no show flag is true", () => {
		const config = {};
		const { container } = render(<ExtraLarge element={mockData} customFields={config} />);
		expect(container.firstChild).toBeNull();
	});

	it("should return an overline if showOverline is true", () => {
		const config = {
			showOverlineXL: true,
		};
		render(<ExtraLarge element={mockData} customFields={config} />);
		expect(screen.queryByRole("link", { name: "Premium" })).not.toBeNull();
	});

	it("should return a headline if showHeadline is true", () => {
		const config = {
			showHeadlineXL: true,
		};
		render(<ExtraLarge element={mockData} customFields={config} />);
		expect(screen.queryByRole("heading", { name: config.headline })).not.toBeNull();
	});

	it("should return a image if showImage is true", () => {
		const config = {
			imageRatioXL: "4:3",
			showImageXL: true,
		};
		render(<ExtraLarge element={mockData} customFields={config} />);
		expect(screen.queryByRole("img", { name: config.headline })).not.toBeNull();
	});

	it("should return a fallback image if showImage is true and imageUrl is not valid", () => {
		const config = {
			imageRatio: "4:3",
			showImageXL: true,
		};
		render(<ExtraLarge element={mockData} customFields={config} />);
		expect(screen.queryByRole("img", { name: config.headline })).not.toBeNull();
	});

	it("should return a description if showDescription is true", () => {
		const config = {
			showDescriptionXL: true,
		};
		render(<ExtraLarge element={mockData} customFields={config} />);
		expect(
			screen.queryByText("Why does August seem hotter? Maybe it comes from weariness.")
		).not.toBeNull();
	});

	it("should return a byline if showByline is true", () => {
		const config = {
			showBylineXL: true,
		};
		const { getByText } = render(<ExtraLarge element={mockData} customFields={config} />);
		expect(
			getByText("global.by-text Example Author1, Example Author2, global.and-text Example Author3")
		).not.toBeNull();
	});

	it("should return a byline if showDate is true", () => {
		const config = {
			showDateXL: true,
		};
		render(<ExtraLarge element={mockData} customFields={config} />);
		expect(screen.queryByText("January 30, 2020", { exact: false })).not.toBeNull();
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
		expect(screen.queryByText("global.sponsored-content")).not.toBeNull();
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
		expect(screen.queryByText("video embed")).not.toBeNull();
	});
});
