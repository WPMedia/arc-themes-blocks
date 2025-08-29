import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import mockConsole from "jest-mock-console";

import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import { isServerSide } from "@wpmedia/arc-themes-components";

import mockData from "./mock-data";
import NumberedList from "./default";

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		fallbackImage: "placeholder.jpg",
		primaryLogoAlt: "test",
		resizerURL: "http://url.com/",
	})),
);

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => mockData),
}));

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(),
	LazyLoad: ({ children }) => children,
}));

const listContentConfig = {
	contentConfigValues: {
		offset: "0",
		query: "type:story",
		size: "30",
	},
	contentService: "story-feed-query",
};

describe("The numbered-list-block", () => {
	let restoreConsole;
	afterAll(() => {
		restoreConsole?.();
	});
	beforeAll(() => {
		restoreConsole = mockConsole();
	});
	beforeEach(() => {
		useFusionContext.mockReturnValue({
			arcSite: "the-sun",
			contextPath: "pf",
			pagebuilderURL: jest.fn((x) => x),
			isAdmin: false,
		});
	});

	describe("render a list of numbered-list-items", () => {
		it("should render null if isServerSide and lazyLoad enabled", () => {
			const customFields = {
				listContentConfig,
				showHeadline: true,
				showImage: true,
				lazyLoad: true,
			};
			isServerSide.mockReturnValue(true);

			render(<NumberedList customFields={customFields} />);
			// Expect nothing rendered: first item number is absent
			expect(screen.queryByText("1")).toBeNull();
		});

		it("should render in Admin with lazyLoad enabled", () => {
			const customFields = {
				listContentConfig,
				showHeadline: true,
				showImage: true,
				lazyLoad: true,
			};

			useFusionContext.mockReturnValue({
				arcSite: "the-sun",
				pagebuilderURL: jest.fn((x) => x),
				isAdmin: true,
			});

			render(<NumberedList customFields={customFields} />);
			// Presence check with getBy*
			expect(screen.getByText("1")).toBeInTheDocument();
		});

		it("should render list item with headline, image and a number", () => {
			const customFields = {
				lazyLoad: false,
			};

			const { unmount } = render(<NumberedList customFields={customFields} />);

			expect(screen.getByText("1")).toBeInTheDocument();
			expect(screen.getByText("Article with only promo_items.basic")).toBeInTheDocument();
			const images = screen.getAllByRole("img", { hidden: true });
			expect(images.length).toBeGreaterThan(0);

			unmount();
		});

		it("should not show headline", () => {
			const customFields = {
				listContentConfig,
				showHeadline: false,
				showImage: true,
			};

			const { unmount } = render(<NumberedList customFields={customFields} />);

			expect(screen.getByText("1")).toBeInTheDocument();
			expect(screen.queryByText("Article with only promo_items.basic")).not.toBeInTheDocument();

			unmount();
		});

		it("should not show image", () => {
			const customFields = {
				listContentConfig,
				showHeadline: true,
				showImage: false,
			};

			const { unmount } = render(<NumberedList customFields={customFields} />);

			expect(screen.getByText("1")).toBeInTheDocument();
			expect(screen.getByText("Article with only promo_items.basic")).toBeInTheDocument();
			const image = screen.queryAllByRole("img", { hidden: true });
			expect(image.length).toBe(0);

			unmount();
		});

		it("should render a placeholder image", () => {
			const customFields = {
				listContentConfig,
				showHeadline: true,
				showImage: true,
			};

			const { unmount } = render(<NumberedList customFields={customFields} />);
			expect(screen.getByText("1")).toBeInTheDocument();
			const imgs = screen.getAllByRole("img", { hidden: true });
			expect(imgs.some((img) => img.getAttribute("src") === "pf/placeholder.jpg")).toBe(true);

			unmount();
		});

		it("should render a title from custom field", () => {
			const customFields = {
				title: "Numbered List Title",
				listContentConfig,
				showHeadline: true,
				showImage: true,
			};

			const { unmount } = render(<NumberedList customFields={customFields} />);

			expect(screen.getByText("Numbered List Title")).toBeInTheDocument();

			unmount();
		});

		it("should render elements only for arcSite", () => {
			const customFields = {
				listContentConfig,
				showHeadline: true,
				showImage: true,
			};

			useFusionContext.mockReturnValue({
				arcSite: "dagen",
				pagebuilderURL: jest.fn(() => {}),
			});

			const { unmount } = render(<NumberedList customFields={customFields} />);
			expect(screen.getByText("Article with only promo_items.basic")).toBeInTheDocument();
			expect(screen.queryByText("Story with video as the Lead Art")).not.toBeInTheDocument();
			unmount();
		});
	});

	describe("not render list items", () => {
		it("should render no list if no list items present", () => {
			useContent.mockReturnValue({});

			const customFields = {
				listContentConfig,
				showHeadline: true,
				showImage: true,
				lazyLoad: false,
			};

			const { unmount } = render(<NumberedList customFields={customFields} />);

			expect(screen.queryByText("Article with a YouTube embed in it")).not.toBeInTheDocument();
			expect(screen.queryByText("Story with video as the Lead Art")).not.toBeInTheDocument();

			unmount();
		});
	});
});
