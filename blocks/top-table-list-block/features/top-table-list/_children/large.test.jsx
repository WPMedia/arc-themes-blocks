import React from "react";
import { render, screen } from "@testing-library/react";
import mockData from "../../../mock-data";

import Large from "./large";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => false),
	LazyLoad: ({ children }) => children,
}));

describe("Large Promo", () => {
	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	it("should render complete promo", () => {
		render(
			<Large
				element={mockData}
				customFields={{
					showBylineLG: true,
					showDateLG: true,
					showDescriptionLG: true,
					showHeadlineLG: true,
					showImageLG: true,
					showOverlineLG: true,
				}}
			/>,
		);

		expect(screen.queryByText(mockData.label.basic.text)).not.toBeNull();
		expect(screen.queryByText(mockData.headlines.basic)).not.toBeNull();
		expect(screen.queryByText(mockData.description.basic)).not.toBeNull();
		expect(screen.queryByText("January 30, 2020", { exact: false })).not.toBeNull();
		expect(screen.queryByRole("img")).not.toBeNull();
	});

	it("should not render overline", () => {
		render(
			<Large
				element={mockData}
				customFields={{
					showBylineLG: true,
					showDateLG: true,
					showDescriptionLG: true,
					showHeadlineLG: true,
					showImageLG: true,
					showOverlineLG: false,
				}}
			/>,
		);
		expect(screen.queryByText(mockData.label.basic.text)).toBeNull();
		expect(screen.queryByText(mockData.headlines.basic)).not.toBeNull();
		expect(screen.queryByText(mockData.description.basic)).not.toBeNull();
		expect(screen.queryByText("January 30, 2020", { exact: false })).not.toBeNull();
		expect(screen.queryByRole("img")).not.toBeNull();
	});

	it("should not render date", () => {
		render(
			<Large
				element={mockData}
				customFields={{
					showBylineLG: true,
					showDateLG: false,
					showDescriptionLG: true,
					showHeadlineLG: true,
					showImageLG: true,
					showOverlineLG: false,
				}}
			/>,
		);
		expect(screen.queryByText(mockData.label.basic.text)).toBeNull();
		expect(screen.queryByText(mockData.headlines.basic)).not.toBeNull();
		expect(screen.queryByText(mockData.description.basic)).not.toBeNull();
		expect(screen.queryByText("January 30, 2020", { exact: false })).toBeNull();
		expect(screen.queryByRole("img")).not.toBeNull();
	});

	it("should not render byline", () => {
		render(
			<Large
				element={mockData}
				customFields={{
					showBylineLG: false,
					showDateLG: true,
					showDescriptionLG: true,
					showHeadlineLG: true,
					showImageLG: true,
					showOverlineLG: true,
				}}
			/>,
		);
		expect(screen.queryByText(mockData.label.basic.text)).not.toBeNull();
		expect(screen.queryByText(mockData.headlines.basic)).not.toBeNull();
		expect(screen.queryByText(mockData.description.basic)).not.toBeNull();
		expect(screen.queryByText("January 30, 2020", { exact: false })).not.toBeNull();
		expect(screen.queryByRole("img")).not.toBeNull();
	});

	it("should not render headline", () => {
		render(
			<Large
				element={mockData}
				customFields={{
					showBylineLG: true,
					showDateLG: true,
					showDescriptionLG: true,
					showHeadlineLG: false,
					showImageLG: true,
					showOverlineLG: true,
				}}
			/>,
		);
		expect(screen.queryByText(mockData.label.basic.text)).not.toBeNull();
		expect(screen.queryByText(mockData.headlines.basic)).toBeNull();
		expect(screen.queryByText(mockData.description.basic)).not.toBeNull();
		expect(screen.queryByText("January 30, 2020", { exact: false })).not.toBeNull();
		expect(screen.queryByRole("img")).not.toBeNull();
	});

	it("should not render description", () => {
		render(
			<Large
				element={mockData}
				customFields={{
					showBylineLG: true,
					showDateLG: true,
					showDescriptionLG: false,
					showHeadlineLG: true,
					showImageLG: true,
					showOverlineLG: true,
				}}
			/>,
		);
		expect(screen.queryByText(mockData.label.basic.text)).not.toBeNull();
		expect(screen.queryByText(mockData.headlines.basic)).not.toBeNull();
		expect(screen.queryByText(mockData.description.basic)).toBeNull();
		expect(screen.queryByText("January 30, 2020", { exact: false })).not.toBeNull();
		expect(screen.queryByRole("img")).not.toBeNull();
	});

	it("should only render Image", () => {
		render(
			<Large
				element={mockData}
				customFields={{
					showImageLG: true,
				}}
			/>,
		);
		expect(screen.queryByText(mockData.label.basic.text)).toBeNull();
		expect(screen.queryByText(mockData.headlines.basic)).toBeNull();
		expect(screen.queryByText(mockData.description.basic)).toBeNull();
		expect(screen.queryByText("January 30, 2020", { exact: false })).toBeNull();
		expect(screen.queryByRole("img")).not.toBeNull();
	});

	it('should not render Image if "showImage" is false', () => {
		render(
			<Large
				element={mockData}
				customFields={{
					showImageLG: false,
				}}
			/>,
		);

		expect(screen.queryByRole("img")).toBeNull();
	});

	it("should not render sponsored content for overline", () => {
		const modifiedData = { ...mockData };
		modifiedData.owner = {
			sponsored: true,
		};
		modifiedData.label = {};
		render(
			<Large
				element={modifiedData}
				customFields={{
					showBylineLG: true,
					showDateLG: true,
					showDescriptionLG: false,
					showHeadlineLG: true,
					showImageLG: false,
					showOverlineLG: true,
				}}
			/>,
		);
		expect(screen.queryByText(mockData.label.basic.text)).toBeNull();
		expect(screen.queryByText("global.sponsored-content")).not.toBeNull();
		expect(screen.queryByText(mockData.headlines.basic)).not.toBeNull();
		expect(screen.queryByText(mockData.description.basic)).toBeNull();
		expect(screen.queryByText("January 30, 2020", { exact: false })).not.toBeNull();
	});

	it("should render image icon label", () => {
		const modifiedData = { ...mockData };
		modifiedData.type = "gallery";
		const { container } = render(
			<Large
				element={modifiedData}
				customFields={{
					showImageLG: true,
					playVideoInPlaceLG: false,
				}}
			/>,
		);
		expect(container.querySelector(".b-top-table-list-large__icon_label")).not.toBeNull();
	});

	it("should render video player media when 'playVideoInPlace' prop is passed", () => {
		const modifiedData = { ...mockData };
		modifiedData.type = "story";
		modifiedData.promo_items = {
			lead_art: {
				type: "video",
				embed_html: `<div class="powa">embed</div>`,
			},
		};
		const { container } = render(
			<Large
				element={modifiedData}
				customFields={{
					showImageLG: true,
					playVideoInPlaceLG: true,
				}}
			/>,
		);
		expect(container.querySelector(".c-video__frame")).not.toBeNull();
	});

	it("renders with default showBottomBorder when showBottomBorderLG is undefined", () => {
		// showBottomBorderLG not passed — typeof undefined resolves to true
		const { container } = render(
			<Large element={mockData} customFields={{ showHeadlineLG: true }} />,
		);
		expect(container.querySelector("hr")).not.toBeNull();
	});

	it("does not render bottom border when showBottomBorderLG is false", () => {
		const { container } = render(
			<Large
				element={mockData}
				customFields={{ showHeadlineLG: true, showBottomBorderLG: false }}
			/>,
		);
		expect(container.querySelector("hr")).toBeNull();
	});

	it("uses empty string for displayDate when display_date is invalid", () => {
		const elementBadDate = { ...mockData, display_date: "not-a-date" };
		render(
			<Large
				element={elementBadDate}
				customFields={{ showDateLG: true, showHeadlineLG: true }}
			/>,
		);
		// Date parsed to "" — the date component is rendered but without January text
		expect(screen.queryByText("January 30, 2020", { exact: false })).toBeNull();
	});

	it("uses label overline text when labelDisplay is true", () => {
		const elementWithLabel = { ...mockData, owner: { sponsored: false } };
		// mockData already has label.basic.display = true so this exercises the labelDisplay branch
		render(
			<Large
				element={elementWithLabel}
				customFields={{ showOverlineLG: true, showHeadlineLG: true }}
			/>,
		);
		expect(screen.queryByText("Premium")).not.toBeNull();
	});

	it("does not render overline text stack when only image shown", () => {
		render(
			<Large
				element={mockData}
				customFields={{ showImageLG: true, showOverlineLG: false }}
			/>,
		);
		// No overline, no text stack — just image
		expect(screen.queryByText("Premium")).toBeNull();
	});

	it("renders attribution with only date when credits.by is empty", () => {
		const elementNoAuthors = { ...mockData, credits: { by: [] } };
		render(
			<Large
				element={elementNoAuthors}
				customFields={{ showBylineLG: true, showDateLG: true, showHeadlineLG: true }}
			/>,
		);
		// Byline absent (no authors), but date should still show
		expect(screen.queryByText("January 30, 2020", { exact: false })).not.toBeNull();
	});
});
