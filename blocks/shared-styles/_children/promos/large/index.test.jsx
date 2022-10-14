import React from "react";
import { mount } from "enzyme";
import { extractVideoEmbedFromStory } from "@wpmedia/engine-theme-sdk";
import LargePromoPresentation from "./index";

const { default: mockData } = require("./mock-data");

jest.mock("@wpmedia/engine-theme-sdk", () => ({
	Image: () => <div />,
	localizeDateTime: jest.fn(() => new Date().toDateString()),
	extractVideoEmbedFromStory: jest.fn(() => '<div class="video-embed"></div>'),
	VideoPlayer: ({ embedHTML, id }) => (
		<div dangerouslySetInnerHTML={{ __html: embedHTML }} id={`video-${id}`} />
	),
	LazyLoad: ({ children }) => <>{children}</>,
	isServerSide: () => true,
	formatURL: jest.fn((input) => input.toString()),
}));

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		fallbackImage: "placeholder.jpg",
	}))
);

const config = {
	showHeadline: true,
	showImage: true,
	showOverline: false,
};

const mockFusionContext = {
	arcSite: "the-sun",
};

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => mockFusionContext),
	useComponentContext: jest.fn(() => ({})),
}));

jest.mock("fusion:content", () => ({
	// PromoImage should be mocked so we don't have to mock useContent...
	useContent: jest.fn(() => mockData),
	useEditableContent: jest.fn(() => ({
		editableContent: () => ({ contentEditable: "true" }),
		searchableField: () => {},
	})),
}));

describe("the large promo presentational component", () => {
	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	it("should have two link elements by default", () => {
		const wrapper = mount(<LargePromoPresentation {...config} content={mockData} />);
		expect(wrapper.find("a")).toHaveLength(2);
		wrapper.unmount();
	});

	it("should link the headline to the current site website_url ANS property", () => {
		const url = mockData.websites["the-sun"].website_url;
		const wrapper = mount(<LargePromoPresentation {...config} content={mockData} />);
		expect(wrapper.find("a.lg-promo-headline")).toHaveProp("href", url);
		wrapper.unmount();
	});

	it("should link the image to the current site website_url ANS property", () => {
		const url = mockData.websites["the-sun"].website_url;
		const wrapper = mount(<LargePromoPresentation {...config} content={mockData} />);
		expect(wrapper.find("a").at(1)).toHaveProp("href", url);
		wrapper.unmount();
	});

	it("should have one img when show image is true", () => {
		const wrapper = mount(<LargePromoPresentation {...config} content={mockData} />);
		expect(wrapper.find("Image")).toHaveLength(1);
		wrapper.unmount();
	});

	it("should have one img when show image is true with 4:3 default ratio", () => {
		const wrapper = mount(<LargePromoPresentation {...config} content={mockData} />);
		expect(wrapper.find("Image")).toHaveLength(1);
		expect(wrapper.find("Image").prop("largeHeight")).toBe(450);
		expect(wrapper.find("Image").prop("largeWidth")).toBe(600);
	});

	it("should accept a 16:9 image ratio", () => {
		const myConfig = { ...config, imageRatio: "16:9" };
		const wrapper = mount(<LargePromoPresentation {...myConfig} content={mockData} />);
		expect(wrapper.find("Image")).toHaveLength(1);
		expect(wrapper.find("Image").prop("largeHeight")).toBe(338);
		expect(wrapper.find("Image").prop("largeWidth")).toBe(600);
	});

	it("should accept a 3:2 image ratio", () => {
		const myConfig = { ...config, imageRatio: "3:2" };
		const wrapper = mount(<LargePromoPresentation {...myConfig} content={mockData} />);
		expect(wrapper.find("Image")).toHaveLength(1);
		expect(wrapper.find("Image").prop("largeHeight")).toBe(400);
		expect(wrapper.find("Image").prop("largeWidth")).toBe(600);
	});

	it("Headline div should have class .col-md-xl-6 when show image is true", () => {
		const wrapper = mount(<LargePromoPresentation {...config} content={mockData} />);
		expect(wrapper.find(".col-md-xl-6")).toHaveLength(2);
		wrapper.unmount();
	});

	it("should have no Image when show image is false", () => {
		const noImgConfig = {
			itemContentConfig: {
				contentService: "ans-item",
				contentConfiguration: {},
			},
			showHeadline: true,
			showImage: false,
		};
		const wrapper = mount(<LargePromoPresentation customFields={noImgConfig} content={mockData} />);
		expect(wrapper.find("Image")).toHaveLength(0);
		wrapper.unmount();
	});

	it("should have no headline when show headline is false", () => {
		const noImgConfig = {
			itemContentConfig: {
				contentService: "ans-item",
				contentConfiguration: {},
			},
			showHeadline: false,
		};
		const wrapper = mount(<LargePromoPresentation customFields={noImgConfig} content={mockData} />);
		expect(wrapper.find(".lg-promo-headline")).toHaveLength(0);
		wrapper.unmount();
	});

	it("headline div should have class .col-sm-xl-12 when show image is false", () => {
		const noImgConfig = {
			itemContentConfig: {
				contentService: "ans-item",
				contentConfiguration: {},
			},
			showHeadline: true,
			showImage: false,
		};
		const wrapper = mount(<LargePromoPresentation {...noImgConfig} content={mockData} />);
		expect(wrapper.find(".col-sm-xl-12")).toHaveLength(1);
		wrapper.unmount();
	});

	it("should only be one link when showHeadline is false and show image is true", () => {
		const noHeadlineConfig = {
			itemContentConfig: {
				contentService: "ans-item",
				contentConfiguration: {},
			},
			showHeadline: false,
			showImage: true,
		};
		const wrapper = mount(<LargePromoPresentation {...noHeadlineConfig} content={mockData} />);
		expect(wrapper.find("a")).toHaveLength(1);
		wrapper.unmount();
	});

	it("should have by default an 4:3 image ratio", () => {
		const wrapper = mount(<LargePromoPresentation {...config} content={mockData} />);
		const img = wrapper.find("Image");
		expect(img.prop("largeHeight")).toBe(450);
		expect(img.prop("largeWidth")).toBe(600);
		wrapper.unmount();
	});

	it("should accept a 16:9 ratio", () => {
		const myConfig = { ...config, imageRatio: "16:9" };
		const wrapper = mount(<LargePromoPresentation {...myConfig} content={mockData} />);
		const img = wrapper.find("Image");
		expect(img.prop("largeHeight")).toBe(338);
		expect(img.prop("largeWidth")).toBe(600);
		wrapper.unmount();
	});

	it("should accept a 3:2 ratio", () => {
		const myConfig = { ...config, imageRatio: "3:2" };
		const wrapper = mount(<LargePromoPresentation {...myConfig} content={mockData} />);
		const img = wrapper.find("Image");
		expect(img.prop("largeHeight")).toBe(400);
		expect(img.prop("largeWidth")).toBe(600);
		wrapper.unmount();
	});

	it("should accept a 4:3 ratio", () => {
		const myConfig = { ...config, imageRatio: "4:3" };
		const wrapper = mount(<LargePromoPresentation {...myConfig} content={mockData} />);
		const img = wrapper.find("Image");
		expect(img.prop("largeHeight")).toBe(450);
		expect(img.prop("largeWidth")).toBe(600);
		wrapper.unmount();
	});

	it("show ALL options if enabled", () => {
		const myConfig = {
			showHeadline: true,
			showImage: true,
			imageRatio: "4:3",
			showOverline: true,
			showDescription: true,
			showByline: true,
			showDate: true,
		};

		const wrapper = mount(
			<LargePromoPresentation {...myConfig} arcSite="dagen" content={mockData} />
		);

		expect(wrapper.find("Overline").length).toBe(1);
		expect(wrapper.find(".lg-promo-headline").exists()).toBe(true);
		expect(wrapper.find(".description-text").length).toBe(5);
		expect(wrapper.find("Byline").length).toBe(1);
		expect(wrapper.find("PromoDate").length).toBe(1);
		expect(wrapper.find("Image").length).toBe(1);

		wrapper.unmount();
	});

	it("show ALL options if enabled", () => {
		const myConfig = {
			showHeadline: true,
			showImage: false,
			imageRatio: "4:3",
			showOverline: false,
			showDescription: false,
			showByline: false,
			showDate: false,
		};

		const wrapper = mount(<LargePromoPresentation {...myConfig} arcSite="dagen" />);

		expect(wrapper.find("Overline").length).toBe(0);
		expect(wrapper.find("HeadlineText").length).toBe(0);
		expect(wrapper.find("DescriptionText").length).toBe(0);
		expect(wrapper.find("Byline").length).toBe(0);
		expect(wrapper.find("PromoDate").length).toBe(0);
		expect(wrapper.find("Image").length).toBe(0);
		wrapper.unmount();
	});

	it("show placeholder image if no image URL", () => {
		const myConfig = {
			showHeadline: true,
			showImage: true,
			imageRatio: "4:3",
		};

		const wrapper = mount(<LargePromoPresentation {...myConfig} arcSite="dagen" />);

		expect(wrapper.find("PlaceholderImage").length).toBe(1);
		expect(wrapper.find("Image").length).toBe(0);
		wrapper.unmount();
	});

	it("show image override if provided in custom fields", () => {
		const myConfig = {
			showHeadline: true,
			showImage: true,
			imageRatio: "4:3",
			imageOverrideURL: "overrideImage.jpg",
		};

		const wrapper = mount(
			<LargePromoPresentation {...myConfig} arcSite="dagen" content={mockData} />
		);

		const image = wrapper.find("Image");
		expect(image.length).toBe(1);
		expect(image.props().url).toEqual("overrideImage.jpg");
		wrapper.unmount();
	});

	it("returns null if null content", () => {
		const myConfig = {
			showHeadline: true,
			showImage: true,
			imageRatio: "4:3",
			imageOverrideURL: "overrideImage.jpg",
		};
		const wrapper = mount(<LargePromoPresentation {...myConfig} arcSite="dagen" />);
		expect(wrapper).toEqual({});
		wrapper.unmount();
	});

	it("uses websiteSection for overline if there is no content.label.basic", () => {
		const myConfig = {
			showHeadline: true,
			showOverline: true,
			content: {
				websites: {
					"the-sun": {
						website_section: { _id: "the-sun-ID", name: "the-sun-name" },
					},
				},
			},
		};

		const wrapper = mount(<LargePromoPresentation {...myConfig} />);

		const wrapperOverline = wrapper.find("Overline");
		expect(wrapperOverline.length).toBe(1);
		expect(wrapperOverline.find("a.overline").text()).toEqual("the-sun-name");
		wrapper.unmount();
	});

	it("should only be one link when showOverline and showHeadline is false and show image is true", () => {
		const noHeadlineConfig = {
			showOverline: false,
			showHeadline: false,
			showImage: true,
			showDescription: true,
			headline: "This is the headline",
			description: "This is the description",
			overline: "overline",
			overlineURL: "www.google.com",
			imageURL: "www.google.com/fake.png",
			linkURL: "www.google.com",
		};
		const wrapper = mount(<LargePromoPresentation {...noHeadlineConfig} content={mockData} />);
		expect(wrapper.find("a")).toHaveLength(1);
	});

	it("should have one line separator", () => {
		const wrapper = mount(<LargePromoPresentation {...config} content={mockData} />);
		expect(wrapper.find("hr")).toHaveLength(1);
	});

	describe('when "playVideoInPlace" custom field is "true"', () => {
		describe('when ANS content type is "story"', () => {
			it("should render Image when no video found in ANS lead art", () => {
				extractVideoEmbedFromStory.mockReturnValueOnce(undefined);
				const wrapper = mount(
					<LargePromoPresentation {...config} content={mockData} playVideoInPlace />
				);
				expect(wrapper.find("Image")).toHaveLength(1);
				wrapper.unmount();
			});

			it("should render VideoPlayer when video exists in ANS lead art", () => {
				const wrapper = mount(
					<LargePromoPresentation {...config} playVideoInPlace content={mockData} />
				);
				expect(wrapper.find("Image")).toHaveLength(0);
				expect(wrapper.find("VideoPlayer")).toHaveLength(1);
				wrapper.unmount();
			});
		});

		describe('when ANS content type is "video"', () => {
			it("should render Image when no video embed found in ANS", () => {
				extractVideoEmbedFromStory.mockReturnValueOnce(undefined);
				const wrapper = mount(
					<LargePromoPresentation {...config} playVideoInPlace content={mockData} />
				);
				expect(wrapper.find("Image")).toHaveLength(1);
				wrapper.unmount();
			});

			it("should render VideoPlayer when video embed exists in ANS", () => {
				const wrapper = mount(
					<LargePromoPresentation {...config} playVideoInPlace content={mockData} />
				);
				expect(wrapper.find("Image")).toHaveLength(0);
				expect(wrapper.find("VideoPlayer")).toHaveLength(1);
				wrapper.unmount();
			});
		});
	});
});
