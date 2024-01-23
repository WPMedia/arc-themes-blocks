import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import { localizeDateTime } from "@wpmedia/arc-themes-components";
import mockData, { oneListItem, oneListItemDisplayLabel, twoListItemNoSiteUrl } from "./mock-data";
import CardList from "./default";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => true),
	LazyLoad: ({ children }) => children,
	localizeDateTime: jest.fn(() => "date"),
}));

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => mockData),
}));

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		id: "",
		arcSite: "the-sun",
		deployment: jest.fn(() => {}),
	})),
}));

describe("Card list", () => {
	it("should render null if isServerSide and lazyLoad enabled", () => {
		const listContentConfig = {
			contentConfigValues: {
				offset: "0",
				query: "type:story",
				size: "30",
			},
			contentService: "story-feed-query",
		};
		const customFields = {
			listContentConfig,
			lazyLoad: true,
		};

		useFusionContext.mockReturnValueOnce({
			id: "",
			arcSite: "the-sun",
			deployment: jest.fn(() => {}),
		});

		const { container } = render(<CardList customFields={customFields} />);
		expect(container).toBeEmptyDOMElement();
	});

	it("it should not render anything if no list of stories", () => {
		const listContentConfig = {
			contentConfigValues: {
				offset: "0",
				query: "type:story",
				size: "10",
			},
			contentService: "fake-service",
		};
		const customFields = {
			listContentConfig,
			offsetOverride: 100,
		};
		useContent.mockReturnValueOnce(null);

		render(<CardList customFields={customFields} />);

		expect(screen.queryByRole("article")).toBeNull();
	});

	it("should render a list of stories", () => {
		const listContentConfig = {
			contentConfigValues: {
				offset: "0",
				query: "type:story",
				size: "30",
			},
			contentService: "story-feed-query",
		};
		const customFields = { listContentConfig };

		render(<CardList customFields={customFields} />);
		expect(screen.getAllByRole("article").length).toEqual(9);
	});

	it("should only render amount of stories based on displayAmount", () => {
		const listContentConfig = {
			contentConfigValues: {
				offset: "0",
				query: "type:story",
				size: "30",
			},
			contentService: "story-feed-query",
		};
		const customFields = { listContentConfig, displayAmount: 5 };

		render(<CardList customFields={customFields} />);
		expect(screen.getAllByRole("article").length).toEqual(5);
	});

	it("should render first item based on offsetOverride", () => {
		const listContentConfig = {
			contentConfigValues: {
				offset: "0",
				query: "type:story",
				size: "30",
			},
			contentService: "story-feed-query",
		};
		const customFields = { listContentConfig, offsetOverride: 1 };

		render(<CardList customFields={customFields} />);

		expect(screen.getByText("2nd Story Title")).not.toBeNull();
	});

	it("should render a list of stories only for the arcSite", () => {
		const listContentConfig = {
			contentConfigValues: {
				offset: "0",
				query: "type:story",
				size: "30",
			},
			contentService: "story-feed-query",
		};
		const customFields = { listContentConfig };

		jest.mock("fusion:context", () => ({
			useFusionContext: jest.fn(() => ({
				arcSite: "the-mercury",
				deployment: jest.fn(() => {}),
			})),
		}));
		useContent.mockReturnValueOnce(oneListItem);
		render(<CardList customFields={customFields} />);
		expect(screen.getAllByRole("article").length).toEqual(1);
	});

	describe("renders the main list item correctly", () => {
		const setup = () => {
			const listContentConfig = {
				contentConfigValues: {
					offset: "0",
					query: "type:story",
					size: "1",
				},
				contentService: "story-feed-query",
			};
			const title = "Test Title";
			const customFields = { listContentConfig, title };
	
			useContent.mockReturnValueOnce(oneListItem);
			render(<CardList customFields={customFields} />);
		};
		

		it("should render a title with the right text", () => {
			setup();
			expect(screen.getByText("Test Title")).not.toBeNull();
		});

		it("should render anchor tags", () => {
			setup();
			const links = screen.getAllByRole("link");
			expect(links.length).toEqual(2);
			expect(links[0]).toHaveAttribute("href", "/this/is/the/correct/url");
		});

		it("should render one image", () => {
			setup();
			expect(screen.getByRole("img", {hidden: true})).not.toBeNull();
		});

		it("should render an overline", () => {
			setup();
			expect(screen.getByText("global.sponsored-content")).not.toBeNull();
		});

		it("should render a main headline", () => {
			setup();
			expect(screen.getByText("Article with a YouTube embed in it")).not.toBeNull();
		});

		it("should render a byline", () => {
			setup();
			expect(screen.getByText("global.by-text")).not.toBeNull();
		});

		it("should render a separator", () => {
			setup();
			expect(screen.getByTestId("card-list-separator")).not.toBeNull();
		});

		it("should render a publish date", () => {
			setup();
			expect(screen.getByText("date")).not.toBeNull();
		});

		it("should use default date format", () => {
			setup();
			expect(localizeDateTime).toHaveBeenLastCalledWith("2019-12-18T17:09:22.308Z", "%B %d, %Y at %l:%M%p %Z", "en", "GMT");
		});

		it("should use custom date format", () => {
			getProperties.mockReturnValueOnce({
				locale: "en",
				fallbackImage: "placeholder.jpg",
				resizerURL: "http://url.com/",
				dateLocalization: {
					language: "fr",
					timeZone: "CET",
					dateTimeFormat: "%d-%m-%Y at %l:%M%p %Z",
				},
			})
			setup();
			expect(localizeDateTime).toHaveBeenLastCalledWith("2019-12-18T17:09:22.308Z", "%d-%m-%Y at %l:%M%p %Z", "fr", "CET");
		});
	});

	it("should render an overline using the label data if sourceContent.label.display is true and there is no owner", () => {
		useContent.mockReturnValueOnce(oneListItemDisplayLabel);
		render(<CardList customFields={{}} />);
		expect(screen.getByText("Display Label")).not.toBeNull();
	});

	it("render one list item without a secondary item for a bad site website_url", () => {
		useContent.mockReturnValueOnce(twoListItemNoSiteUrl);
		render(<CardList customFields={{}} />);
		expect(screen.getAllByRole("article").length).toEqual(1);
	});
});
