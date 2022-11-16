import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ResultItem from "./result-item";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	usePhrases: jest.fn().mockReturnValue({
		t: jest.fn().mockReturnValue("Sample phrases"),
	}),
}));

jest.mock("fusion:content", () => ({
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
		by: [
			{
				name: "Matthew Roach",
			},
		],
	},
	_id: "element_1",
	overline: {
		basic: {
			display: true,
			text: "Overline Text",
			url: "https://www.google.com",
		},
	},
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

		expect(screen.getAllByText(/Sample phrases/i)).toHaveLength(1);

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

		expect(screen.getAllByText(/January 01, 2021 at 12:01 am UTC/i)).toHaveLength(1);

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
				targetFallbackImage={fallbackImage}
				// placeholderResizedImageOptions={{}}
				showImage
			/>
		);
		const imageSrc = screen.getByAltText(/Test headline 1/i);
		expect(imageSrc.src).toBe("http://test/resources/fallback.jpg");

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
