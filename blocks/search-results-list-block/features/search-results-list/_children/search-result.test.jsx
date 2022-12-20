/* eslint-disable prefer-arrow-callback, camelcase, dot-notation  */
import React from "react";
import { render, screen } from "@testing-library/react";

import SearchResult from "./search-result";

const singleListItem = {
	credits: {
		by: [],
	},
	description: { basic: "Basic Description 1" },
	headlines: { basic: "Basic Headline Text" },
	promo_items: {
		basic: {
			_id: "QQUBBHAFJRDH7IVNHAI4IBEQVY",
			auth: {
				2: "ea391c022766c61dfadf9c6778efa43a8c31b87db157dc7d5db888562ff3150e",
			},
			type: "image",
			url: "https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/QQUBBHAFJRDH7IVNHAI4IBEQVY.jpg",
		},
	},
	websites: {
		"test-site": {
			website_url: "https://test.url",
		},
	},
};

const singleItemWithoutDescription = {
	credits: {
		by: [
			{
				type: "author",
				name: "Test Author",
				url: "#",
			},
		],
	},
	display_date: "2022-01-01T00:00:00.000Z",
	headlines: { basic: "Basic Headline Text" },
	websites: {
		"test-site": {
			website_url: "https://test.url",
		},
	},
};

describe("The search results", () => {
	describe("renders one list item correctly", () => {
		const fullElements = {
			showHeadline: true,
			showOverline: true,
			showImage: true,
			showDescription: true,
			showByline: true,
			showDate: true,
		};

		it("should render one list item as its child", () => {
			render(
				<SearchResult
					className="test"
					content={singleListItem}
					arcSite="test-site"
					promoElements={fullElements}
				/>
			);
			expect(screen.getAllByRole("article").length).toBe(1);
		});

		it("should render a image, headline/link, and description", () => {
			render(
				<SearchResult
					className="test"
					content={singleListItem}
					arcSite="test-site"
					promoElements={fullElements}
				/>
			);

			expect(screen.getByRole("figure")).toBeDefined();
			expect(
				screen.getByRole("heading", { description: "Basic Headline Text", exact: false })
			).toBeDefined();
			expect(
				screen.getByRole("link", { description: "Basic Headline Text", exact: false })
			).toBeDefined();
			expect(screen.getByText("Basic Description 1", { exact: false })).toBeDefined();
			expect(screen.queryByRole("link", { name: "Test Author" })).toBe(null);
			expect(screen.queryByText("January", { exact: false })).toBe(null);
		});

		it("should not render an image if showImage is false", () => {
			render(
				<SearchResult
					className="test"
					content={singleListItem}
					arcSite="test-site"
					promoElements={{ ...fullElements, showImage: false }}
				/>
			);

			expect(screen.queryByRole("figure")).toBe(null);
		});

		it("should not render a headline if showHeadline is false", () => {
			render(
				<SearchResult
					className="test"
					content={singleListItem}
					arcSite="test-site"
					promoElements={{ ...fullElements, showHeadline: false }}
				/>
			);

			expect(
				screen.queryByRole("heading", { description: "Basic Headline Text", exact: false })
			).toBe(null);
		});

		it("should not render a description if showDescription is false", () => {
			render(
				<SearchResult
					className="test"
					content={singleListItem}
					arcSite="test-site"
					promoElements={{ ...fullElements, showDescription: false }}
				/>
			);

			expect(screen.queryByText("Basic Description 1", { exact: false })).toBe(null);
		});
	});

	describe("renders one list item correctly when description is missing", () => {
		const fullElements = {
			showHeadline: true,
			showImage: true,
			showDescription: true,
			showByline: true,
			showDate: true,
		};

		it("should render a image, headline, author, and no description", () => {
			render(
				<SearchResult
					className="test"
					content={singleItemWithoutDescription}
					arcSite="test-site"
					promoElements={fullElements}
				/>
			);

			expect(screen.getByRole("figure")).toBeDefined();
			expect(
				screen.getByRole("heading", { description: "Basic Headline Text", exact: false })
			).toBeDefined();
			expect(screen.queryByText("Basic Description 1")).toBe(null);
			expect(screen.getByRole("link", { name: "Test Author" })).toBeDefined();
			expect(screen.getByText("January", { exact: false })).toBeDefined();
		});

		it("should not render an image if showImage is false", () => {
			render(
				<SearchResult
					className="test"
					content={singleListItem}
					arcSite="test-site"
					promoElements={{ ...fullElements, showImage: false }}
				/>
			);

			expect(screen.queryByRole("figure")).toBe(null);
		});

		it("should not render a headline if showHeadline is false", () => {
			render(
				<SearchResult
					className="test"
					content={singleListItem}
					arcSite="test-site"
					promoElements={{ ...fullElements, showHeadline: false }}
				/>
			);

			expect(
				screen.queryByRole("heading", { description: "Basic Headline Text", exact: false })
			).toBe(null);
		});

		it("should not render an author if showByline is false", () => {
			render(
				<SearchResult
					className="test"
					content={singleListItem}
					arcSite="test-site"
					promoElements={{ ...fullElements, showByline: false }}
				/>
			);

			expect(screen.queryByRole("link", { name: "Test Author" })).toBe(null);
		});

		it("should not render a date if showDate is false", () => {
			render(
				<SearchResult
					className="test"
					content={singleItemWithoutDescription}
					arcSite="test-site"
					promoElements={{ ...fullElements, showDate: false }}
				/>
			);

			expect(screen.queryByText("January", { exact: false })).toBe(null);
		});
	});
});
