import React from "react";
import { mount } from "enzyme";
import getThemeStyle from "fusion:themes";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import mockData, { oneListItem } from "./mock-data";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => true),
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

jest.mock("fusion:themes", () => jest.fn(() => ({})));

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		fallbackImage: "placeholder.jpg",
	}))
);

jest.mock("@wpmedia/engine-theme-sdk", () => ({
	LazyLoad: ({ children }) => <>{children}</>,
	localizeDate: jest.fn(() => "date"),
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

		const { default: CardList } = require("./default");
		const wrapper = mount(<CardList customFields={customFields} />);
		expect(wrapper.html()).toBe(null);
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

		const { default: CardList } = require("./default");
		const wrapper = mount(<CardList customFields={customFields} />);
		expect(wrapper.find(".card-list-container").length).toEqual(1);
		expect(wrapper.find("article.card-list-item").length).toEqual(8);
	});

	it("should only render amout of stories based on displayAmount", () => {
		const listContentConfig = {
			contentConfigValues: {
				offset: "0",
				query: "type:story",
				size: "30",
			},
			contentService: "story-feed-query",
		};
		const customFields = { listContentConfig, displayAmount: 5 };

		const { default: CardList } = require("./default");
		const wrapper = mount(<CardList customFields={customFields} />);
		expect(wrapper.find(".card-list-container").length).toEqual(1);
		expect(wrapper.find("article.card-list-item").length).toEqual(4);
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

		const { default: CardList } = require("./default");
		const wrapper = mount(<CardList customFields={customFields} />);

		expect(wrapper.find(".card-list-headline").text()).toBe("2nd Story Title");
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

		const { default: CardList } = require("./default");
		jest.mock("fusion:context", () => ({
			useFusionContext: jest.fn(() => ({
				arcSite: "the-mercury",
				deployment: jest.fn(() => {}),
			})),
		}));
		useContent.mockReturnValueOnce(null);
		useContent.mockReturnValueOnce(oneListItem);
		const wrapper = mount(<CardList customFields={customFields} />);
		expect(wrapper.find(".card-list-container").length).toEqual(1);
		expect(wrapper.find("article.card-list-item").length).toEqual(5);
		expect(wrapper.find("article.list-item-simple").length).toEqual(1);
	});

	describe("renders the main list item correctly", () => {
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
		const { default: CardList } = require("./default");
		getThemeStyle.mockImplementation(() => ({
			"primary-font-family": "Papyrus",
		}));

		useContent.mockReturnValueOnce(null);
		useContent.mockReturnValueOnce(oneListItem);
		const wrapper = mount(<CardList customFields={customFields} />);

		it("should have one parent wrapper", () => {
			expect(wrapper.find(".card-list-container").length).toEqual(1);
		});

		it("should render a title with the right text", () => {
			expect(wrapper.find(".card-list-title").first().text()).toEqual("Test Title");
		});

		it("should render two anchor tags - one around image one for the title", () => {
			expect(wrapper.find("article.list-item-simple").find(".list-anchor").length).toEqual(2);
			expect(wrapper.find(".card-list--link-container").find("Image").length).toEqual(1);
		});

		it("should render one image wrapped in an anchor tag", () => {
			expect(
				wrapper.find("article.list-item-simple").find(".list-anchor").find("Image").length
			).toEqual(1);
		});

		it("should render an anchor ", () => {
			expect(
				wrapper.find("article.list-item-simple").find(".list-anchor").at(0).find("a").length
			).toEqual(1);
		});

		it("should render an anchor and an image with the correct url", () => {
			const anchors = wrapper.find("article.list-item-simple").find(".list-anchor");
			expect(anchors.at(0).prop("href")).toEqual("/this/is/the/correct/url");
			expect(anchors.at(1).prop("href")).toEqual("/this/is/the/correct/url");
		});

		it("should render an anchor and an image with alt text", () => {
			expect(
				wrapper.find("article.list-item-simple").find(".list-anchor").find("Image").prop("alt")
			).toEqual("Article with a YouTube embed in it");
		});

		it("should render an overline", () => {
			expect(wrapper.find("Overline").length).toEqual(1);
		});

		it("should render a main headline", () => {
			expect(wrapper.find(".card-list-headline").text()).toBe("Article with a YouTube embed in it");
		});

		it("should render an author and a publish date section", () => {
			expect(wrapper.find("article.list-item-simple").find(".author-date").length).toEqual(1);
		});

		it("should render a byline", () => {
			expect(wrapper.find(".author-date").find("Byline").length).toEqual(1);
		});

		it("should render a separator", () => {
			expect(wrapper.find("Byline").prop("separator")).toEqual(true);
		});

		it("should render a publish date", () => {
			expect(wrapper.find(".author-date").length).toEqual(1);
		});

		it("should not add the line divider", () => {
			expect(wrapper.find("article.list-item-simple--divider").length).toEqual(0);
		});
	});

	describe("render one list item correctly", () => {
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
		const { default: CardList } = require("./default");

		const wrapper = mount(<CardList customFields={customFields} />);

		it("should render one parent wrapper", () => {
			expect(wrapper.find(".card-list-container").length).toEqual(1);
		});

		it("should render a parent for headline and a description", () => {
			expect(wrapper.find("article.card-list-item").length).toEqual(8);
		});

		it("should render a headline", () => {
			expect(wrapper.find("article.card-list-item").find("a.headline-list-anchor").length).toEqual(
				8
			);
			expect(
				wrapper.find("article.card-list-item").find("a.headline-list-anchor").find(".headline-text")
					.length
			).toEqual(8);
			expect(
				wrapper
					.find("article.card-list-item")
					.find("a.headline-list-anchor")
					.find(".headline-text")
					.first()
					.text()
			).toEqual("2nd Story Title");
			expect(
				wrapper.find("article.card-list-item").find(".headline-list-anchor").at(0).prop("href")
			).toEqual("/this/is/the/correct/url");
		});
	});

	describe("should not render overline if websites.artSite.website_section is missing", () => {
		const listContentConfig = {
			contentConfigValues: {
				offset: "0",
				query: "type:story",
				size: "1",
			},
			contentService: "story-feed-query",
		};
		const customFields = { listContentConfig };
		const { default: CardList } = require("./default");

		const wrapper = mount(<CardList customFields={customFields} />);

		it("should not render overline", () => {
			expect(wrapper.find(".overline").length).toBe(0);
		});
		it("should render headline", () => {
			expect(wrapper.find(".card-list-headline").length).toBe(1);
		});
		it("should render author-date", () => {
			expect(wrapper.find(".author-date").length).toBe(1);
		});
		it("should render image", () => {
			expect(wrapper.find("article.list-item-simple Image").length).toBe(1);
		});
	});
});
