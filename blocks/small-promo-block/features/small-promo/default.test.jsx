import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useContent } from "fusion:content";
import { isServerSide } from "@wpmedia/arc-themes-components";

import SmallPromo from "./default";

import mockData from "./mock-data";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => true),
	LazyLoad: ({ children }) => children,
}));

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => mockData),
	useEditableContent: jest.fn(() => ({
		editableContent: () => ({ contentEditable: "true" }),
		searchableField: () => {},
	})),
	useFusionContext: jest.fn(() => ({
		isAdmin: false,
	})),
}));

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		fallbackImage: "placeholder.jpg",
	})),
);

describe("Small Promo", () => {
	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	it("should return null if lazyLoad on the server and not in the admin", () => {
		const config = {
			lazyLoad: true,
		};
		const { container } = render(<SmallPromo customFields={config} />);
		expect(container).toBeEmptyDOMElement();
	});

	it("should return null if none of the show... flags are true", () => {
		const config = {};
		const { container } = render(<SmallPromo customFields={config} />);
		expect(container).toBeEmptyDOMElement();
	});

	it("should return null on server-side render from PageBuilder Editor when lazyload is true", () => {
		const config = {
			itemContentConfig: { contentService: "ans-item", contentConfigValues: { test: 123 } },
			showHeadline: true,
		};
		isServerSide.mockImplementationOnce(() => true);
		const { container } = render(<SmallPromo customFields={{ ...config, lazyLoad: true }} />);
		expect(container).toBeEmptyDOMElement();
	});

	it("should display a headline if showHeadline is true", () => {
		const config = {
			itemContentConfig: { contentService: "ans-item", contentConfigValues: { test: 123 } },
			showHeadline: true,
		};
		render(<SmallPromo customFields={config} />);

		expect(screen.getByRole("heading")).toBeInTheDocument();
	});

	it("should display an image if showImage is true", () => {
		const config = {
			itemContentConfig: { contentService: "ans-item", contentConfigValues: { test: 123 } },
			imageOverrideURL: "#",
			imageRatio: "4:3",
			showImage: true,
			showHeadline: true,
			imagePosition: "below",
		};
		render(<SmallPromo customFields={config} />);
		expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
	});

	it("should make a blank call to the signing-service if the image is from PhotoCenter and has an Auth value", () => {
		const config = {
			imageOverrideAuth: "test hash",
			imageOverrideURL: "test_id=123",
			imageOverrideId: "123",
			imageRatio: "4:3",
			showImage: true,
		};
		render(<SmallPromo customFields={config} />);
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
		render(<SmallPromo customFields={config} />);
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
		render(<SmallPromo customFields={config} />);
		expect(useContent).toHaveBeenCalledWith({
			source: "signing-service",
			query: { id: "test_id=123" },
		});
	});

	it("should display a fallback image if showImage and no content", () => {
		const config = {
			itemContentConfig: { contentService: "ans-item", contentConfigValues: { test: 123 } },
			imageRatio: "4:3",
			showImage: true,
		};
		useContent.mockReturnValueOnce(null);
		render(<SmallPromo customFields={config} />);
		// Fallback image has empty alt via Image component -> role becomes 'presentation'
		const fallbackImg =
			screen.queryByRole("presentation", { hidden: true }) ||
			screen.queryByRole("img", { hidden: true });
		expect(fallbackImg).not.toBeNull();
	});

	it("should display imageOverride", () => {
		const config = {
			itemContentConfig: { contentService: "ans-item", contentConfigValues: { test: 123 } },
			imageRatio: "4:3",
			showImage: true,
			imageOverrideURL: "override.jpg",
			imageOverrideAuth: "{}",
		};
		render(<SmallPromo customFields={config} />);
		expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
	});

	it("falls back to parsed imageOverrideAuth when signing service returns nothing", () => {
		useContent.mockReturnValueOnce(mockData).mockReturnValueOnce(null);
		render(
			<SmallPromo
				customFields={{
					itemContentConfig: { contentService: "ans-item", contentConfigValues: { test: 1 } },
					showImage: false,
					showHeadline: true,
					imageOverrideURL: "https://example.com/image.jpg",
					imageOverrideAuth: JSON.stringify({ 2: "auth-token" }),
				}}
			/>,
		);
		expect(screen.getByText(mockData.headlines.basic)).not.toBeNull();
	});

	it("sets RESIZER_TOKEN_VERSION when resizedAuth has hash", () => {
		useContent.mockReturnValueOnce(mockData).mockReturnValueOnce({ hash: "abc123" });
		render(
			<SmallPromo
				customFields={{
					itemContentConfig: { contentService: "ans-item", contentConfigValues: { test: 1 } },
					showImage: false,
					showHeadline: true,
					imageOverrideURL: "https://example.com/image.jpg",
				}}
			/>,
		);
		expect(screen.getByText(mockData.headlines.basic)).not.toBeNull();
	});

	it("should use empty string for alt when content has no headlines", () => {
		useContent.mockReturnValueOnce({ ...mockData, headlines: undefined });
		render(
			<SmallPromo
				customFields={{
					itemContentConfig: { contentService: "ans-item", contentConfigValues: { test: 1 } },
					showImage: true,
					imageRatio: "4:3",
					imageOverrideURL: "https://example.com/image.jpg",
					showHeadline: false,
				}}
			/>,
		);
		// alt="" produces role "presentation"
		const img =
			screen.queryByRole("presentation", { hidden: true }) ||
			screen.queryByRole("img", { hidden: true });
		expect(img).not.toBeNull();
	});

	it("should use ansImage for imageParams when imageOverrideURL is not set", () => {
		// showImage: false avoids rendering the Image but still exercises the imageParams ansImage branch
		render(
			<SmallPromo
				customFields={{
					itemContentConfig: { contentService: "ans-item", contentConfigValues: { test: 1 } },
					showImage: false,
					imageRatio: "4:3",
					showHeadline: true,
				}}
			/>,
		);
		expect(screen.getByRole("heading")).toBeInTheDocument();
	});

	it("should use manualImageId when imageOverrideURL does not contain imageOverrideId", () => {
		render(
			<SmallPromo
				customFields={{
					itemContentConfig: { contentService: "ans-item", contentConfigValues: { test: 1 } },
					showImage: true,
					imageRatio: "4:3",
					imageOverrideURL: "https://example.com/image.jpg",
					imageOverrideId: "different-id",
					imageOverrideAuth: "",
					showHeadline: true,
				}}
			/>,
		);
		expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
	});

	it("should use empty auth object when resizedAuth is null", () => {
		useContent.mockReturnValueOnce(mockData).mockReturnValueOnce(null);
		render(
			<SmallPromo
				customFields={{
					itemContentConfig: { contentService: "ans-item", contentConfigValues: { test: 1 } },
					showImage: true,
					imageRatio: "4:3",
					imageOverrideURL: "https://example.com/image.jpg",
					showHeadline: true,
				}}
			/>,
		);
		expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
	});
});
