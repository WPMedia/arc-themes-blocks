import React from "react";
import { mount } from "enzyme";
import {
	Grid,
	MediaItem,
	Heading,
	Overline,
	Attribution,
	Paragraph,
	Link,
} from "@wpmedia/arc-themes-components";
import LargeManualPromo from "./default";

jest.mock("@wpmedia/engine-theme-sdk", () => ({
	Image: () => <div />,
	LazyLoad: ({ children }) => <>{children}</>,
	formatURL: jest.fn((input) => input.toString()),
}));

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => true),
}));

jest.mock("fusion:themes", () => jest.fn(() => ({})));
jest.mock("fusion:properties", () => jest.fn(() => ({})));
jest.mock("fusion:properties", () => jest.fn(() => ({})));
jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({})),
	useComponentContext: jest.fn(() => ({
		registerSuccessEvent: () => ({}),
	})),
}));

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => ({})),
	useEditableContent: jest.fn(() => ({
		searchableField: () => {},
	})),
}));

const config = {
	showOverline: true,
	showHeadline: true,
	showImage: true,
	showDescription: true,
	headline: "This is the headline",
	description: "This is the description",
	overline: "overline",
	overlineURL: "www.google.com",
	imageURL: "www.google.com/fake.png",
	linkURL: "www.google.com",
};

describe("the large promo feature", () => {
	afterEach(() => {
		jest.resetModules();
	});

	beforeEach(() => {
		jest.mock("fusion:context", () => ({
			useFusionContext: jest.fn(() => ({
				arcSite: "the-sun",
				id: "testId",
			})),
		}));
	});

	it("should return null if lazyLoad on the server and not in the admin", () => {
		const updatedConfig = {
			...config,
			lazyLoad: true,
		};
		const wrapper = mount(<LargeManualPromo customFields={updatedConfig} />);
		expect(wrapper.html()).toBe(null);
	});

	it("should have 1 container Grid component", () => {
		const wrapper = mount(<LargeManualPromo customFields={config} />);
		expect(wrapper.find(Grid)).toHaveLength(1);
	});

	it("should render MediaItem component when showImage is true", () => {
		const wrapper = mount(<LargeManualPromo customFields={config} />);
		expect(wrapper.find(MediaItem)).toHaveLength(1);
	});

	it("should render Overline component when showOverline is true", () => {
		const wrapper = mount(<LargeManualPromo customFields={config} />);
		expect(wrapper.find(Overline)).toHaveLength(1);
	});

	it("should render Heading component when showHeadline is true", () => {
		const wrapper = mount(<LargeManualPromo customFields={config} />);
		expect(wrapper.find(Heading)).toHaveLength(1);
	});

	it("should render Heading inside the Link component when linkURL is provided", () => {
		const wrapper = mount(<LargeManualPromo customFields={config} />);
		expect(wrapper.find(Heading)).toHaveLength(1);
		expect(wrapper.find(Link)).toHaveLength(1);
	});

	it("should render Paragraph component when showDescription is true", () => {
		const wrapper = mount(<LargeManualPromo customFields={config} />);
		expect(wrapper.find(Paragraph)).toHaveLength(1);
	});

	it("should render Attribution component", () => {
		const wrapper = mount(<LargeManualPromo customFields={config} />);
		expect(wrapper.find(Attribution)).toHaveLength(1);
	});
});
