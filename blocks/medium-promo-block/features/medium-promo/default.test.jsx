import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { useContent } from "fusion:content";

import MediumPromo from "./default";

import mockData from "./mock-data";

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

		expect(screen.queryByRole("heading", { name: mockData.headlines.basic })).not.toBeNull();
	});

	it("should headline be an editable field", () => {
		const config = {
			showHeadline: true,
		};
		render(<MediumPromo customFields={config} />);

		expect(screen.queryByRole("heading", { name: mockData.headlines.basic })).toHaveAttribute(
			"contenteditable",
		);
	});

	it("should description be an editable field", () => {
		const config = {
			showDescription: true,
		};
		render(<MediumPromo customFields={config} />);

		expect(screen.queryByText(mockData.description.basic)).toHaveAttribute("contenteditable");
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

	it("should make a blank call to the signing-service if the image is from PhotoCenter and has an Auth value", () => {
		const config = {
			imageOverrideAuth: "test hash",
			imageOverrideURL: "test_id=123",
			imageOverrideId: "123",
			imageRatio: "4:3",
			showImage: true,
		};
		render(<MediumPromo customFields={config} />);
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
		render(<MediumPromo customFields={config} />);
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
		render(<MediumPromo customFields={config} />);
		expect(useContent).toHaveBeenCalledWith({
			source: "signing-service",
			query: { id: "test_id=123" },
		});
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
			screen.queryByText("Why does August seem hotter? Maybe it comes from weariness."),
		).not.toBeNull();
	});

	it("should display a byline if showByline is true", () => {
		const config = {
			showByline: true,
		};
		const { getByText } = render(<MediumPromo customFields={config} />);
		expect(
			getByText("global.by-text Example Author1, Example Author2, global.and-text Example Author3"),
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
