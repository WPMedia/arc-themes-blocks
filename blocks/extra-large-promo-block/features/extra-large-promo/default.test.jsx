import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { useContent } from "fusion:content";

import ExtraLargePromo from "./default";

import mockData from "./mock-data";
import mockDataSponsoredVideo from "./mock-data-sponsored";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => true),
	LazyLoad: ({ children }) => children,
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
		render(<ExtraLargePromo customFields={config} />);
		expect(screen.queryByTestId("extra-large-promo")).toBeNull();
	});

	it("should return null if no show flag is true", () => {
		const config = {};
		render(<ExtraLargePromo customFields={config} />);
		expect(screen.queryByTestId("extra-large-promo")).toBeNull();
	});

	it("should return an overline if showOverline is true", () => {
		const config = {
			showOverline: true,
		};
		render(<ExtraLargePromo customFields={config} />);
		expect(screen.getByRole("link", { name: "Premium" })).not.toBeNull();
	});

	it("should overline text be an editable field", () => {
		const arcSite = "dagen"; // using default website

		const config = {
			showOverline: true,
		};
		render(<ExtraLargePromo customFields={config} />);

		let overline = mockData?.websites[arcSite]?.website_section?.name;

		if (mockData.owner?.sponsored) {
			overline = mockData.label.basic.text;
		} else if (mockData?.label?.basic?.display) {
			overline = mockData?.label?.basic?.text;
		}

		if (overline) {
			expect(screen.getByText(overline)).toHaveAttribute("contenteditable", "true");
		}
	});

	it("should return a headline if showHeadline is true", () => {
		const config = {
			showHeadline: true,
		};
		render(<ExtraLargePromo customFields={config} />);
		expect(screen.getByRole("heading", { name: config.headline })).not.toBeNull();
	});

	it("should headline be an editable field", () => {
		const config = {
			showHeadline: true,
		};
		render(<ExtraLargePromo customFields={config} />);

		expect(screen.getByRole("heading", { name: mockData.headlines.basic })).toHaveAttribute(
			"contenteditable",
		);
	});

	it("should description be an editable field", () => {
		const config = {
			showDescription: true,
		};
		render(<ExtraLargePromo customFields={config} />);

		expect(screen.getByText(mockData.description.basic)).toHaveAttribute("contenteditable");
	});

	it("should return a image if showImage is true", () => {
		const config = {
			imageOverrideURL: "#",
			imageRatio: "4:3",
			showImage: true,
			imageOverrideAuth: JSON.stringify({
				auth: {
					2: "75f6b4c64c7889dc8eadf6a328999d522be2e2397c7b9a5a0704f6d9afa60fcf",
				},
			}),
		};
		render(<ExtraLargePromo customFields={config} />);
		expect(screen.getByRole("img", { name: config.headline })).not.toBeNull();
	});

	it("should return a fallback image if showImage is true and imageUrl is not valid", () => {
		const config = {
			imageRatio: "4:3",
			showImage: true,
		};
		render(<ExtraLargePromo customFields={config} />);
		expect(screen.getByRole("img", { name: config.headline })).not.toBeNull();
	});

	it("should make a blank call to the signing-service if the image is from PhotoCenter and has an Auth value", () => {
		const config = {
			imageOverrideAuth: "test hash",
			imageOverrideURL: "test_id=123",
			imageOverrideId: "123",
			imageRatio: "4:3",
			showImage: true,
		};
		render(<ExtraLargePromo customFields={config} />);
		expect(useContent).toHaveBeenCalledWith({});
	});

	it("should make a call to the signing-service if the image is from PhotoCenter but does not have an Auth value", () => {
		const config = {
			imageOverrideAuth: "",
			imageOverrideURL: "test_id=123",
			imageOverrideId: "123",
			imageRatio: "4:3",
			showImage: true,
		};
		render(<ExtraLargePromo customFields={config} />);
		expect(useContent).toHaveBeenCalledWith({
			source: "signing-service",
			query: { id: "test_id=123" },
		});
	});

	it("should make a call to the signing-service if the image is not from PhotoCenter", () => {
		const config = {
			imageOverrideAuth: "",
			imageOverrideURL: "test_id=123",
			imageOverrideId: "abc",
			imageRatio: "4:3",
			showImage: true,
		};
		render(<ExtraLargePromo customFields={config} />);
		expect(useContent).toHaveBeenCalledWith({
			source: "signing-service",
			query: { id: "test_id=123" },
		});
	});

	it("should return a description if showDescription is true", () => {
		const config = {
			showDescription: true,
		};
		render(<ExtraLargePromo customFields={config} />);
		expect(
			screen.getByText("Why does August seem hotter? Maybe it comes from weariness."),
		).not.toBeNull();
	});

	it("should return a byline if showByline is true", () => {
		const config = {
			showByline: true,
		};
		render(<ExtraLargePromo customFields={config} />);
		expect(
			screen.getByText(
				"global.by-text Example Author1, Example Author2, global.and-text Example Author3",
			),
		).toBeInTheDocument();
	});

	it("should return a byline if showDate is true", () => {
		const config = {
			showDate: true,
		};
		render(<ExtraLargePromo customFields={config} />);
		expect(screen.getByText("January 30, 2020", { exact: false })).not.toBeNull();
	});

	it("should returned a sponsored overline if it's sponsored content", () => {
		useContent.mockReturnValueOnce(mockDataSponsoredVideo);
		const config = {
			showOverline: true,
		};
		render(<ExtraLargePromo customFields={config} />);
		expect(screen.getByText("Sponsored")).not.toBeNull();
	});

	it("should return a video if playVideoInPlace is true and video content available", () => {
		useContent.mockReturnValueOnce(mockDataSponsoredVideo);
		const config = {
			playVideoInPlace: true,
			showImage: true,
		};
		render(<ExtraLargePromo customFields={config} />);
		expect(screen.getByText("video embed")).not.toBeNull();
	});
});
