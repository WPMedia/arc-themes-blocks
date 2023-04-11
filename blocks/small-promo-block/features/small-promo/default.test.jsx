import React from "react";
import { render, screen } from "@testing-library/react";
import { useContent } from "fusion:content";
import { isServerSide } from "@wpmedia/arc-themes-components";

import SmallPromo from "./default";

import mockData from "./mock-data";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => true),
	LazyLoad: ({ children }) => <>{children}</>,
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
	}))
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
		expect(container.firstChild).toBe(null);
	});

	it("should return null if none of the show... flags are true", () => {
		const config = {};
		const { container } = render(<SmallPromo customFields={config} />);
		expect(container.firstChild).toBeNull();
	});

	it("should return null on server-side render from PageBuilder Editor when lazyload is true", () => {
		const config = {
			itemContentConfig: { contentService: "ans-item", contentConfigValues: { test: 123 } },
			showHeadline: true,
		};
		isServerSide.mockImplementationOnce(() => true);
		const { container } = render(<SmallPromo customFields={{ ...config, lazyLoad: true }} />);
		expect(container.firstChild).toBeNull();
	});

	it("should display a headline if showHeadline is true", () => {
		const config = {
			itemContentConfig: { contentService: "ans-item", contentConfigValues: { test: 123 } },
			showHeadline: true,
		};
		render(<SmallPromo customFields={config} />);

		expect(screen.queryByRole("heading", { name: config.headline })).not.toBeNull();
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
		expect(screen.queryByRole("img", { name: config.headline })).not.toBeNull();
	});

	it("should display a fallback image if showImage and no content", () => {
		const config = {
			itemContentConfig: { contentService: "ans-item", contentConfigValues: { test: 123 } },
			imageRatio: "4:3",
			showImage: true,
		};
		useContent.mockReturnValueOnce(null);
		render(<SmallPromo customFields={config} />);
		expect(screen.queryByRole("img", { name: config.headline })).not.toBeNull();
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
		expect(screen.queryByRole("img", { name: config.headline })).not.toBeNull();
	});
});
