import React from "react";
import { render, screen } from "@testing-library/react";
import { useContent } from "fusion:content";

import ExtraLargePromo from "./default";

import mockData from "./mock-data";
import mockDataSponsoredVideo from "./mock-data-sponsored";

jest.mock("@wpmedia/engine-theme-sdk", () => ({
	extractVideoEmbedFromStory: jest.fn(() => "video url"),
	localizeDateTime: jest.fn(() => "2000-01-01T00:00:00Z"),
	LazyLoad: ({ children }) => <>{children}</>,
}));

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => true),
	Video: () => "video embed",
}));

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => mockData),
	useEditableContent: jest.fn(() => ({
		editableContent: () => ({ contentEditable: "true" }),
		searchableField: () => {},
	})),
}));

describe("the extra large promo feature", () => {
	it("should return null if lazyLoad on the server and not in the admin", () => {
		const config = {
			lazyLoad: true,
		};
		const { container } = render(<ExtraLargePromo customFields={config} />);
		expect(container.firstChild).toBe(null);
	});

	it("should return null if no show flag is true", () => {
		const config = {};
		const { container } = render(<ExtraLargePromo customFields={config} />);
		expect(container.firstChild).toBeNull();
	});

	it("should return an overline if showOverline is true", () => {
		const config = {
			showOverline: true,
		};
		render(<ExtraLargePromo customFields={config} />);
		expect(screen.queryByRole("link", { name: "Premium" })).not.toBeNull();
	});

	it("should return a headline if showHeadline is true", () => {
		const config = {
			showHeadline: true,
		};
		render(<ExtraLargePromo customFields={config} />);
		expect(screen.queryByRole("heading", { name: config.headline })).not.toBeNull();
	});

	it("should return a image if showImage is true", () => {
		const config = {
			imageOverrideURL: "#",
			imageRatio: "4:3",
			showImage: true,
		};
		render(<ExtraLargePromo customFields={config} />);
		expect(screen.queryByRole("img", { name: config.headline })).not.toBeNull();
	});

	it("should return a fallback image if showImage is trueand imageUrl is not valid", () => {
		const config = {
			imageRatio: "4:3",
			showImage: true,
		};
		render(<ExtraLargePromo customFields={config} />);
		expect(screen.queryByRole("img", { name: config.headline })).not.toBeNull();
	});

	it("should return a description if showDescription is true", () => {
		const config = {
			showDescription: true,
		};
		render(<ExtraLargePromo customFields={config} />);
		expect(
			screen.queryByText("Why does August seem hotter? Maybe it comes from weariness.")
		).not.toBeNull();
	});

	it("should return a byline if showByline is true", () => {
		const config = {
			showByline: true,
		};
		const { getByText } = render(<ExtraLargePromo customFields={config} />);
		expect(
			getByText("global.by-text Example Author1, Example Author2, global.and-text Example Author3")
		).not.toBeNull();
	});

	it("should return a byline if showDate is true", () => {
		const config = {
			showDate: true,
		};
		render(<ExtraLargePromo customFields={config} />);
		expect(screen.queryByText("2000-01-01T00:00:00Z")).not.toBeNull();
	});

	it("should returned a sponsored overline if it's sponsored content", () => {
		useContent.mockReturnValueOnce(mockDataSponsoredVideo);
		const config = {
			showOverline: true,
		};
		render(<ExtraLargePromo customFields={config} />);
		expect(screen.queryByText("Sponsored")).not.toBeNull();
	});

	it("should return a video if playVideoInPlace is true and video content available", () => {
		useContent.mockReturnValueOnce(mockDataSponsoredVideo);
		const config = {
			playVideoInPlace: true,
			showImage: true,
		};
		render(<ExtraLargePromo customFields={config} />);
		expect(screen.queryByText("video embed")).not.toBeNull();
	});
});
