import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import { isServerSide } from "@wpmedia/arc-themes-components";

import SimpleList from "./default";

const mockData = {
	content_elements: [
		{
			promo_items: {
				basic: {
					_id: "7P2OXUXGHNAIVHEHPC2STWGEEI",
					auth: {
						2: "0034d20d12780c22adc5fc4d6c8b7dc5d42933e4939e15a18c40600600136670",
					},
					type: "image",
					url: "something.jpg",
				},
			},
			headlines: {
				basic: "Video Test",
				mobile: "",
				native: "",
				print: "",
				tablet: "",
			},
			_id: "UK662DYK6VF5XCY7KNZ25XB3QQ",
			websites: {
				"the-sun": {
					website_section: {
						_id: "/arts",
					},
					website_url: "/arts/url",
				},
			},
		},
		{
			promo_items: {
				basic: {
					_id: "7P2OXUXGHNAIVHEHPC2STWGEEI",
					auth: {
						2: "0034d20d12780c22adc5fc4d6c8b7dc5d42933e4939e15a18c40600600136670",
					},
					type: "image",
					url: "something2.jpg",
				},
			},
			headlines: {
				basic: "Video Test #2",
				mobile: "",
				native: "",
				print: "",
				tablet: "",
			},
			_id: "UK662DYK6VF5XCY7KNZ25XB3QQ",
			websites: {
				dagen: {
					website_section: {
						_id: "/arts",
					},
					website_url: "/arts/url",
				},
			},
		},
		{
			headlines: {
				basic: "Title",
			},
			_id: "kdfjkdjfkldjf",
			websites: {
				"the-sun": {
					website_section: {
						_id: "/arts",
					},
					website_url: "/arts/url",
				},
			},
		},
	],
};

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => mockData),
}));

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(),
	LazyLoad: ({ children }) => <>{children}</>,
}));

const listContentConfig = {
	contentConfigValues: {
		offset: "0",
		query: "type:story",
		size: "30",
	},
	contentService: "story-feed-query",
};

describe("The simple-list-block", () => {
	beforeEach(() => {
		useFusionContext.mockReturnValue({
			arcSite: "the-sun",
			contextPath: "pf",
			deployment: jest.fn((x) => x),
			isAdmin: false,
		});
	});

	describe("render a list of simple-list-items", () => {
		it("should render null if isServerSide and lazyLoad enabled", () => {
			const customFields = {
				listContentConfig,
				showHeadline: true,
				showImage: true,
				lazyLoad: true,
			};
			isServerSide.mockReturnValue(true);

			const { container } = render(<SimpleList customFields={customFields} />);
			expect(container.firstChild).toBeNull();
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
				deployment: jest.fn((x) => x),
				isAdmin: true,
			});

			const { container } = render(<SimpleList customFields={customFields} />);
			expect(container.firstChild).not.toBeNull();
		});

		it("should render list item with headline, image and a number", () => {
			const customFields = {
				lazyLoad: false,
			};

			const { unmount } = render(<SimpleList customFields={customFields} />);

			expect(screen.getByText("Video Test")).toBeInTheDocument();
			const image = screen.queryAllByRole("img", { hidden: true });
			expect(image).toBeTruthy();

			unmount();
		});

		it("should not show headline", () => {
			const customFields = {
				listContentConfig,
				showHeadline: false,
				showImage: true,
			};

			const { unmount } = render(<SimpleList customFields={customFields} />);

			expect(screen.queryByText("Video Test")).not.toBeInTheDocument();

			unmount();
		});

		it("should not show image", () => {
			const customFields = {
				listContentConfig,
				showHeadline: true,
				showImage: false,
			};

			const { unmount } = render(<SimpleList customFields={customFields} />);

			expect(screen.queryByText("Video Test")).toBeInTheDocument();
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

			const { unmount } = render(<SimpleList customFields={customFields} />);
			const image = document.querySelectorAll("img[src='pf/placeholder.jpg']");
			expect(image.length).toBeTruthy();

			unmount();
		});

		it("should render a title from custom field", () => {
			const customFields = {
				title: "Simple List Title",
				listContentConfig,
				showHeadline: true,
				showImage: true,
			};

			const { unmount } = render(<SimpleList customFields={customFields} />);

			expect(screen.queryByText("Simple List Title")).toBeInTheDocument();

			unmount();
		});

		it("should render elements only for arcSite", () => {
			const customFields = {
				listContentConfig,
				showHeadline: true,
				showImage: true,
			};

			useFusionContext.mockReturnValue({
				arcSite: "the-sun",
				deployment: jest.fn(() => {}),
			});

			const { unmount } = render(<SimpleList customFields={customFields} />);
			expect(screen.queryByText("Video Test")).toBeInTheDocument();
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

			const { unmount } = render(<SimpleList customFields={customFields} />);

			expect(screen.queryByText("Article with a YouTube embed in it")).not.toBeInTheDocument();
			expect(screen.queryByText("Story with video as the Lead Art")).not.toBeInTheDocument();

			unmount();
		});
	});
});
