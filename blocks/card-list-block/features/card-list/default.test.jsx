import React from "react";
import { mount } from "enzyme";
import getThemeStyle from "fusion:themes";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import mockData, { oneListItem, oneListItemDisplayLabel, twoListItemNoSiteUrl } from "./mock-data";
import CardList from "./default";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => true),
	formatUrl: jest.fn((url) => url.toString()),
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

		const wrapper = mount(<CardList customFields={customFields} />);
		expect(wrapper.html()).toBe(null);
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
		useContent.mockReturnValueOnce(null);

		const wrapper = mount(<CardList customFields={customFields} />);

		expect(wrapper.find("Stack.b-card-list__secondary-item").length).toEqual(0);
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

		const wrapper = mount(<CardList customFields={customFields} />);
		expect(wrapper.find("Stack.b-card-list__secondary-item").length).toEqual(8);
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

		const wrapper = mount(<CardList customFields={customFields} />);
		expect(wrapper.find("Stack.b-card-list__secondary-item").length).toEqual(4);
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

		const wrapper = mount(<CardList customFields={customFields} />);

		expect(wrapper.find("Stack.b-card-list__main-item-text-container .c-heading").text()).toBe(
			"2nd Story Title"
		);
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
		useContent.mockReturnValueOnce(null);
		useContent.mockReturnValueOnce(oneListItem);
		const wrapper = mount(<CardList customFields={customFields} />);
		expect(wrapper.find("Stack.b-card-list").length).toEqual(1);
		expect(wrapper.find("Stack.b-card-list__secondary-item").length).toEqual(0);
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

		getThemeStyle.mockImplementation(() => ({
			"primary-font-family": "Papyrus",
		}));

		useContent.mockReturnValueOnce(null);
		useContent.mockReturnValueOnce(oneListItem);
		const wrapper = mount(<CardList customFields={customFields} />);

		it("should have one parent wrapper", () => {
			expect(wrapper.find("Stack.b-card-list").length).toEqual(1);
		});

		it("should render a title with the right text", () => {
			expect(wrapper.find(".b-card-list__title").first().text()).toEqual("Test Title");
		});

		it("should render two anchor tags - one around image one for the title", () => {
			expect(wrapper.find(".b-card-list__main-item-image-link").length).toEqual(2);
			expect(wrapper.find(".b-card-list__main-item-image-link").find("Image").length).toEqual(1);
		});

		it("should render one image wrapped in an anchor tag", () => {
			expect(wrapper.find(".b-card-list__main-item-image-link Image").length).toEqual(1);
		});

		it("should render an anchor ", () => {
			expect(wrapper.find(".b-card-list__main-item-image-link").at(0).find("a").length).toEqual(1);
		});

		it("should render an anchor and an image with the correct url", () => {
			const anchors = wrapper.find(".c-link");
			expect(anchors.at(0).prop("href")).toEqual("/this/is/the/correct/url");
			expect(anchors.at(1).prop("href")).toEqual("/this/is/the/correct/url");
		});

		it("should render an anchor and an image with alt text", () => {
			expect(wrapper.find(".b-card-list__main-item-image-link").find("Image").prop("alt")).toEqual(
				"Article with a YouTube embed in it"
			);
		});

		it("should render an overline", () => {
			expect(wrapper.find(".c-overline").length).toEqual(1);
		});

		it("should render a main headline", () => {
			expect(wrapper.find(".b-card-list__main-item-text-container Heading").text()).toBe(
				"Article with a YouTube embed in it"
			);
		});

		it("should render a byline", () => {
			expect(wrapper.find(".c-attribution").length).toEqual(1);
		});

		it("should render a separator", () => {
			expect(wrapper.find(".c-separator").length).toEqual(1);
		});

		it("should render a publish date", () => {
			expect(wrapper.find(".c-date").length).toEqual(1);
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

		const wrapper = mount(<CardList customFields={customFields} />);

		it("should render one parent wrapper", () => {
			expect(wrapper.find("Stack.b-card-list").length).toEqual(1);
		});

		it("should render a parent for headline and a description", () => {
			expect(wrapper.find("Stack.b-card-list__secondary-item").length).toEqual(8);
		});

		it("should render a headline", () => {
			expect(wrapper.find(".b-card-list__secondary-item-heading-link .c-heading").length).toEqual(
				8
			);

			expect(wrapper.find(".b-card-list__secondary-item-heading-link").first().text()).toEqual(
				"2nd Story Title"
			);
			expect(wrapper.find(".b-card-list__secondary-item-heading-link").at(0).prop("href")).toEqual(
				"/this/is/the/correct/url"
			);
		});
	});

	describe("render one list item with display label overline", () => {
		useContent.mockReturnValueOnce(null);
		useContent.mockReturnValueOnce(oneListItemDisplayLabel);

		const wrapper = mount(<CardList customFields={{}} />);

		it("should render an overline using the label data if sourceContent.label.display is true and there is no owner", () => {
			expect(wrapper.find(".c-overline").text()).toEqual("Display Label");
		});
	});

	describe("render one list item without a secondary item for a bad site website_url", () => {
		useContent.mockReturnValueOnce(null);
		useContent.mockReturnValueOnce(twoListItemNoSiteUrl);

		const wrapper = mount(<CardList customFields={{}} />);

		it("should render an overline using the label data if sourceContent.label.display is true and there is no owner", () => {
			expect(wrapper.find(".b-card-list__secondary-item")).not.toExist();
		});
	});
});
