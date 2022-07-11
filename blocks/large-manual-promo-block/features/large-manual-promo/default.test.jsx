import React from "react";
import { mount } from "enzyme";
import {
	Grid,
	MediaItem,
	Heading,
	Overline,
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
		expect(wrapper.find(Grid)).toHaveLength(2);
	});

	it("should render MediaItem component when showImage is true", () => {
		const wrapper = mount(<LargeManualPromo customFields={config} />);
		expect(wrapper.find(MediaItem)).toHaveLength(1);
	});

	it("should render Overline component when showOverline is true", () => {
		const wrapper = mount(<LargeManualPromo customFields={config} />);
		expect(wrapper.find(Overline)).toHaveLength(1);
	});

	it("should render Overline component without href when showOverline is true and overlineURL prop is not provided", () => {
		const wrapper = mount(<LargeManualPromo customFields={{ ...config, overlineURL: "" }} />);
		const overline = wrapper.find(Overline);
		expect(overline).toHaveLength(1);
		expect(overline.props().href).toBeUndefined();
	});

	it("should render Heading component when showHeadline is true", () => {
		const wrapper = mount(<LargeManualPromo customFields={config} />);
		expect(wrapper.find(Heading)).toHaveLength(1);
	});

	it("should render Link component inside the Header component when linkURL is provided", () => {
		const wrapper = mount(<LargeManualPromo customFields={config} />);
		expect(wrapper.find(Heading)).toHaveLength(1);
		expect(wrapper.find(Link)).toHaveLength(2);
	});

	it("should not render Link inside the Header component when linkURL is not provided", () => {
		const wrapper = mount(<LargeManualPromo customFields={{ ...config, linkURL: "" }} />);
		expect(wrapper.find(Heading)).toHaveLength(1);
		expect(wrapper.find(Link)).toHaveLength(0);
	});

	it("should render Paragraph component when showDescription is true", () => {
		const wrapper = mount(<LargeManualPromo customFields={config} />);
		expect(wrapper.find(Paragraph)).toHaveLength(1);
	});

	it("should not render Overline, Header, MediaItem when corresponding show props are false", () => {
		const wrapper = mount(
			<LargeManualPromo
				customFields={{
					...config,
					showImage: false,
					showDescription: false,
					showHeadline: false,
					showOverline: false,
				}}
			/>
		);
		expect(wrapper.find(Heading)).toHaveLength(0);
		expect(wrapper.find(Overline)).toHaveLength(0);
		expect(wrapper.find(Paragraph)).toHaveLength(0);
		expect(wrapper.find(MediaItem)).toHaveLength(0);
	});
});
