import React from "react";
import { mount } from "enzyme";
import { useContent } from "fusion:content";
import { isServerSide } from "@wpmedia/arc-themes-components";
import SmallPromo from "./default";

const { default: mockData } = require("./mock-data");

jest.mock("@wpmedia/arc-themes-components", () => {
	const original = jest.requireActual("@wpmedia/arc-themes-components");
	return {
		...original,
		isServerSide: jest.fn(),
	};
});

jest.mock("@wpmedia/engine-theme-sdk", () => ({
	Image: () => <div />,
	LazyLoad: ({ children }) => <>{children}</>,
}));

jest.mock("fusion:themes", () => jest.fn(() => ({})));
jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		fallbackImage: "placeholder.jpg",
	}))
);
jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({})),
}));
jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => mockData),
	useEditableContent: jest.fn(() => ({
		editableContent: () => ({ contentEditable: "true" }),
		searchableField: () => {},
	})),
}));

const config = {
	itemContentConfig: { contentService: "ans-item", contentConfiguration: {} },
	showHeadline: true,
	showImage: true,
};

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		arcSite: "the-sun",
		id: "testId",
	})),
	useComponentContext: jest.fn(() => ({
		registerSuccessEvent: () => ({}),
	})),
}));

describe("the small promo feature", () => {
	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	it("should have article container class with component class", () => {
		const wrapper = mount(<SmallPromo customFields={config} />);
		expect(wrapper.find("article.b-small-promo")).toHaveLength(1);
	});

	it("should have two link elements by default", () => {
		const wrapper = mount(<SmallPromo customFields={config} />);
		expect(wrapper.find("a")).toHaveLength(2);
	});

	it("should link the headline to the current site website_url ANS property", () => {
		const url = mockData.websites["the-sun"].website_url;
		const wrapper = mount(<SmallPromo customFields={config} />);
		expect(wrapper.find("a.c-link").first()).toHaveProp("href", url);
	});

	it("should link the image to the current site website_url ANS property", () => {
		const url = mockData.websites["the-sun"].website_url;
		const wrapper = mount(<SmallPromo customFields={config} />);
		expect(wrapper.find("a").at(1)).toHaveProp("href", url);
	});

	it("should have one img when show image is true", () => {
		const wrapper = mount(<SmallPromo customFields={config} />);
		expect(wrapper.find("Image")).toHaveLength(1);
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
		const wrapper = mount(<SmallPromo customFields={noImgConfig} />);
		expect(wrapper.find("Image")).toHaveLength(0);
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
		const wrapper = mount(<SmallPromo customFields={noHeadlineConfig} />);
		expect(wrapper.find("a")).toHaveLength(1);
	});

	it("returns null if null content", () => {
		const myConfig = {
			showHeadline: true,
			showImage: true,
			imageRatio: "4:3",
			imageOverrideURL: "overrideImage.jpg",
		};

		useContent.mockReturnValueOnce(undefined);
		const wrapper = mount(<SmallPromo customFields={myConfig} />);
		expect(wrapper).toEqual({});
		wrapper.unmount();
	});
});

describe("the small promo feature on server side", () => {
	isServerSide.mockImplementation(() => ({ mockedValue: true }));

	it("renders nothing server side with lazyLoad enabled", () => {
		const updatedConfig = {
			...config,
			lazyLoad: true,
		};

		const wrapper = mount(<SmallPromo customFields={updatedConfig} />);
		expect(wrapper.html()).toBe(null);
	});
});
