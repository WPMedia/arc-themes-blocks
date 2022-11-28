import React from "react";
import { render, screen } from "@testing-library/react";

import MediumPromo from "./default";

import mockData from "./mock-data";

jest.mock("@wpmedia/engine-theme-sdk", () => ({
	...jest.requireActual("@wpmedia/engine-theme-sdk"),
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

describe("the medium promo feature", () => {
	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	it("should return null if lazyLoad on the server and not in the admin", () => {
		const config = {
			lazyLoad: true,
		};
		const { container } = render(<MediumPromo customFields={config} />);
		expect(container.firstChild).toBe(null);
	});

	it("should return null if none of the show... flags are true", () => {
		const config = {};
		const { container } = render(<MediumPromo customFields={config} />);
		expect(container.firstChild).toBeNull();
	});

	it("should display a headline if showHeadline is true", () => {
		const config = {
			showHeadline: true,
		};
		render(<MediumPromo customFields={config} />);

		expect(screen.queryByRole("heading", { name: config.headline })).not.toBeNull();
	});

	it("should display an image if showImage is true", () => {
		const config = {
			imageOverrideURL: "test.jpg",
			imageRatio: "4:3",
			showImage: true,
		};
		render(<MediumPromo customFields={config} />);
		expect(screen.queryByRole("img", { name: config.headline })).not.toBeNull();
	});

	it("should display a fallback image if showImage is true and imageUrl is not valid", () => {
		const config = {
			imageRatio: "4:3",
			showImage: true,
		};
		render(<MediumPromo customFields={config} />);
		expect(screen.queryByRole("img", { name: config.headline })).not.toBeNull();
	});

	it("should display a description if showDescription is true", () => {
		const config = {
			showDescription: true,
		};
		render(<MediumPromo customFields={config} />);
		expect(
			screen.queryByText("Why does August seem hotter? Maybe it comes from weariness.")
		).not.toBeNull();
	});

	it("should display a byline if showByline is true", () => {
		const config = {
			showByline: true,
		};
		const { getByText } = render(<MediumPromo customFields={config} />);
		expect(
			getByText("global.by-text Example Author1, Example Author2, global.and-text Example Author3")
		).not.toBeNull();
	});

	it("should display a date if showDate is true", () => {
		const config = {
			showDate: true,
		};
		render(<MediumPromo customFields={config} />);
		expect(screen.queryByText("January 30, 2020", { exact: false })).not.toBeNull();
	});
});
