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

	it("should not render if lazyLoad on the server and not in the admin", () => {
		const config = {
			lazyLoad: true,
		};
		render(<MediumPromo customFields={config} />);
		expect(screen.queryByRole("article")).not.toBeInTheDocument();
	});

	it("should not render if none of the show... flags are true", () => {
		const config = {};
		render(<MediumPromo customFields={config} />);
		expect(screen.queryByRole("article")).not.toBeInTheDocument();
	});

	it("should display a headline if showHeadline is true", () => {
		const config = {
			showHeadline: true,
		};
		render(<MediumPromo customFields={config} />);

		expect(screen.getByRole("heading", { name: mockData.headlines.basic })).not.toBeNull();
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
		expect(screen.getByRole("img", { name: config.headline })).not.toBeNull();
	});

	it("should display a description if showDescription is true", () => {
		const config = {
			showDescription: true,
		};
		render(<MediumPromo customFields={config} />);
		expect(
			screen.getByText("Why does August seem hotter? Maybe it comes from weariness."),
		).not.toBeNull();
	});

	it("should display a byline if showByline is true", () => {
		const config = {
			showByline: true,
		};
		render(<MediumPromo customFields={config} />);
		expect(
			screen.getByText(
				"global.by-text Example Author1, Example Author2, global.and-text Example Author3",
			),
		).not.toBeNull();
	});

	it("should display a date if showDate is true", () => {
		const config = {
			showDate: true,
		};
		render(<MediumPromo customFields={config} />);
		expect(screen.getByText("January 30, 2020", { exact: false })).not.toBeNull();
	});

	it("falls back to parsed imageOverrideAuth when signing service returns nothing", () => {
		useContent.mockReturnValueOnce(mockData).mockReturnValueOnce(null);
		render(
			<MediumPromo
				customFields={{
					showImage: true,
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
			<MediumPromo
				customFields={{
					showImage: true,
					showHeadline: true,
					imageOverrideURL: "https://example.com/image.jpg",
				}}
			/>,
		);
		expect(screen.getByText(mockData.headlines.basic)).not.toBeNull();
	});

	it("should use content config values when itemContentConfig has contentConfigValues", () => {
		render(
			<MediumPromo
				customFields={{
					itemContentConfig: {
						contentService: "ans-item",
						contentConfigValues: { _id: "test-id" },
					},
					showHeadline: true,
				}}
			/>,
		);
		expect(screen.getByRole("heading", { name: mockData.headlines.basic })).not.toBeNull();
	});

	it("should render with editableDescription fallback when content has no description", () => {
		useContent.mockReturnValueOnce({ ...mockData, description: undefined });
		render(
			<MediumPromo
				customFields={{
					showHeadline: true,
					showDescription: true,
				}}
			/>,
		);
		expect(screen.getByRole("heading", { name: mockData.headlines.basic })).not.toBeNull();
	});

	it("should render with editableHeading fallback when content has no headlines basic", () => {
		useContent.mockReturnValueOnce({ ...mockData, headlines: undefined });
		render(
			<MediumPromo
				customFields={{
					showHeadline: false,
					showDescription: true,
				}}
			/>,
		);
		expect(screen.getByText(mockData.description.basic)).not.toBeNull();
	});

	it("should use ansImage for imageParams when no imageOverrideURL", () => {
		render(
			<MediumPromo
				customFields={{
					showImage: true,
					imageRatio: "4:3",
					showHeadline: true,
				}}
			/>,
		);
		expect(screen.getByRole("img")).not.toBeNull();
	});

	it("should use resized imageOverrideId when imageOverrideURL contains imageOverrideId", () => {
		useContent.mockReturnValueOnce(mockData);
		render(
			<MediumPromo
				customFields={{
					showImage: true,
					imageRatio: "4:3",
					imageOverrideURL: "https://example.com/abc123/image.jpg",
					imageOverrideId: "abc123",
					imageOverrideAuth: '{"2":"token"}',
				}}
			/>,
		);
		expect(screen.getByRole("img")).not.toBeNull();
	});

	it("should render label icon when content type is gallery", () => {
		useContent.mockReturnValueOnce({ ...mockData, type: "gallery" });
		render(
			<MediumPromo
				customFields={{
					showImage: true,
					imageRatio: "4:3",
					showHeadline: true,
				}}
			/>,
		);
		expect(screen.getByRole("img")).not.toBeNull();
	});

	it("should render label icon when content type is video", () => {
		useContent.mockReturnValueOnce({ ...mockData, type: "video" });
		render(
			<MediumPromo
				customFields={{
					showImage: true,
					imageRatio: "4:3",
					showHeadline: true,
				}}
			/>,
		);
		expect(screen.getByRole("img")).not.toBeNull();
	});

	it("should render only date when hasAuthors is falsy", () => {
		useContent.mockReturnValueOnce({ ...mockData, credits: { by: [] } });
		render(
			<MediumPromo
				customFields={{
					showByline: true,
					showDate: true,
				}}
			/>,
		);
		expect(screen.getByText("January 30, 2020", { exact: false })).not.toBeNull();
	});

	it("should render only authors when showDate is false", () => {
		render(
			<MediumPromo
				customFields={{
					showByline: true,
					showDate: false,
				}}
			/>,
		);
		expect(screen.getByText(/Example Author1/)).not.toBeNull();
	});
});
