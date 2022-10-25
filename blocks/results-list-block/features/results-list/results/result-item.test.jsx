import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ResultItem from "./result-item";
import mockData from "./mock-data";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	Overline: () => <div>Overline Text</div>,
	Date: () => <div>2021-01-01T00:01:00Z</div>,
	formatAuthors: jest.fn().mockReturnValue("Byline Sample Text - 123"),
	formatURL: jest.fn().mockReturnValue("https://www.google.com"),
}));

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => mockData),
	useEditableContent: jest.fn(() => ({
		editableContent: () => ({ contentEditable: "true" }),
		searchableField: () => {},
	})),
}));

jest.mock("fusion:context", () => ({
	useComponentContext: jest.fn(() => ({
		registerSuccessEvent: jest.fn(),
	})),
}));

const fallbackImage = "http://test/resources/fallback.jpg";

const imageProperties = {
	smallWidth: 158,
	smallHeight: 89,
	mediumWidth: 274,
	mediumHeight: 154,
	largeWidth: 274,
	largeHeight: 154,
	primaryLogoAlt: "logo alt",
	breakpoints: {},
	resizerURL: "https://resizer.me",
};

const element = {
	description: { basic: "Description 1" },
	display_date: "2021-01-01T00:01:00Z",
	headlines: { basic: "Test headline 1" },
	websites: {
		"the-sun": {
			website_url: "https://the-sun/1",
			website_section: {
				_id: "www.url.com",
				name: "Section",
			},
		},
	},
	credits: {
		by: "Matthew Roach",
	},
	_id: "element_1",
	overline: "Overline Text",
	overlineURL: "https://www.google.com",
};

describe("Result parts", () => {
	it("should show byline if showByline", () => {
		const { unmount } = render(
			<ResultItem
				arcSite="the-sun"
				element={element}
				imageProperties={imageProperties}
				targetFallbackImage={fallbackImage}
				placeholderResizedImageOptions={{}}
				showByline
			/>
		);

		expect(screen.getAllByText(/Byline Sample Text - 123/i)).toHaveLength(1);

		unmount();
	});

	it("should show the date if showDate", () => {
		const { unmount } = render(
			<ResultItem
				arcSite="the-sun"
				element={element}
				imageProperties={imageProperties}
				targetFallbackImage={fallbackImage}
				placeholderResizedImageOptions={{}}
				showDate
			/>
		);

		expect(screen.getAllByText(/2021-01-01T00:01:00Z/i)).toHaveLength(1);

		unmount();
	});

	it("should show the description if showDescription", () => {
		const { unmount } = render(
			<ResultItem
				arcSite="the-sun"
				element={element}
				imageProperties={imageProperties}
				targetFallbackImage={fallbackImage}
				placeholderResizedImageOptions={{}}
				showDescription
			/>
		);

		expect(screen.getAllByText(/Description 1/i)).toHaveLength(1);

		unmount();
	});

	it("should not show the description if there is no description", () => {
		const { unmount } = render(
			<ResultItem
				arcSite="the-sun"
				element={{
					...element,
					description: undefined,
				}}
				imageProperties={imageProperties}
				targetFallbackImage={fallbackImage}
				placeholderResizedImageOptions={{}}
				showDescription
			/>
		);

		expect(screen.queryAllByText(/Font Sample Text - 123/i)).toHaveLength(0);

		unmount();
	});

	it("should show headline if showHeadline", () => {
		const { unmount } = render(
			<ResultItem
				arcSite="the-sun"
				element={element}
				imageProperties={imageProperties}
				targetFallbackImage={fallbackImage}
				placeholderResizedImageOptions={{}}
				showHeadline
			/>
		);

		expect(screen.getAllByText(/test headline/i)).toHaveLength(1);

		unmount();
	});

	it("should show overline if showItemOverline", () => {
		const { unmount } = render(
			<ResultItem
				arcSite="the-sun"
				element={element}
				imageProperties={imageProperties}
				targetFallbackImage={fallbackImage}
				placeholderResizedImageOptions={{}}
				showItemOverline
			/>
		);
		expect(screen.getByText(/Overline Text/i)).toBeInTheDocument();

		unmount();
	});

	it("should not show the headline if there is no headline", () => {
		const { unmount } = render(
			<ResultItem
				arcSite="the-sun"
				element={{
					...element,
					headlines: undefined,
				}}
				imageProperties={imageProperties}
				targetFallbackImage={fallbackImage}
				placeholderResizedImageOptions={{}}
				showDescription
			/>
		);

		expect(screen.queryAllByText(/test headline/i)).toHaveLength(0);

		unmount();
	});

	it("should show the image if showImage", () => {
		const { unmount } = render(
			<ResultItem
				arcSite="the-sun"
				element={element}
				imageProperties={imageProperties}
				targetFallbackImage={fallbackImage}
				placeholderResizedImageOptions={{}}
				showImage
			/>
		);

		expect(screen.getAllByAltText(/logo alt/i)).toHaveLength(1);

		unmount();
	});

	it("should show the image if imageUrl extracted from the element", () => {
		const { unmount } = render(
			<ResultItem
				arcSite="the-sun"
				element={{
					...element,
					promo_items: {
						basic: {
							type: "image",
							url: "http://test/resources/promo.jpg",
						},
					},
				}}
				imageProperties={imageProperties}
				targetFallbackImage={fallbackImage}
				placeholderResizedImageOptions={{}}
				showImage
			/>
		);

		expect(screen.getAllByAltText(/Test headline 1/i)).toHaveLength(1);

		unmount();
	});
});
