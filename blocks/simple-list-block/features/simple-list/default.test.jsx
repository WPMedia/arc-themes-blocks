import React from "react";
import { mount } from "enzyme";
import { useFusionContext } from "fusion:context";
import { useContent } from "fusion:content";
import { isServerSide } from "@wpmedia/arc-themes-components";
import SimpleList from "./default";

const mockOutput = {
	content_elements: [
		{
			promo_items: {
				basic: {
					type: "image",
					url: "something.jpg",
					resized_params: {
						"274x183": "",
					},
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
					type: "image",
					url: "something2.jpg",
					resized_params: {
						"274x183": "",
					},
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
	useContent: jest.fn(() => mockOutput),
	useFusionContext: jest.fn(() => {}),
}));

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		arcSite: "the-sun",
		customFields: {
			elementPlacement: { 1: 2, 2: 1 },
		},
		deployment: jest.fn(() => {}),
	})),
}));

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		websiteDomain: "",
		fallbackImage: "/resources/placeholder.jpg",
		resizerURL: "resizer",
	}))
);

jest.mock("fusion:themes", () => jest.fn(() => ({})));

jest.mock("@wpmedia/engine-theme-sdk", () => ({
	LazyLoad: ({ children }) => <>{children}</>,
}));

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(),
}));

jest.mock(
	"./_children/story-item",
	() =>
		function StoryItem() {
			return <div />;
		}
);

describe("Simple list", () => {
	it("should show title if there is a title provided", () => {
		const testText = "List Over Here";

		const customFields = {
			title: testText,
			lazyLoad: false,
		};

		const wrapper = mount(<SimpleList customFields={customFields} />);

		expect(wrapper.find("Heading").first().text()).toBe(testText);
	});

	it("should show no title if there is no title provided", () => {
		const wrapper = mount(<SimpleList customFields={{ lazyLoad: false }} />);

		expect(wrapper.find(".b-simple-list__title").length).toBe(0);
	});

	it("should fetch an array of data when content service is provided", () => {
		const customFields = {
			lazyLoad: false,
			listContentConfig: {
				contentService: "something",
				contentConfigValues: {
					query: "",
				},
			},
		};

		const wrapper = mount(<SimpleList customFields={customFields} arcSite="the-sun" />);

		expect(wrapper.find("StoryItem").length).toBe(2);
	});

	it("should render content only for the arcSite", () => {
		const wrapper = mount(<SimpleList arcSite="the-sun" customFields={{ lazyLoad: false }} />);

		expect(wrapper.find("StoryItem")).toHaveLength(2);
	});

	it("should not render items when no data provided", () => {
		const customFields = {
			lazyLoad: false,
			listContentConfig: {
				contentService: "something",
				contentConfigValues: {
					query: "",
				},
			},
		};

		useContent.mockReturnValueOnce(null);

		const wrapper = mount(<SimpleList customFields={customFields} arcSite="the-sun" />);

		expect(wrapper.find("StoryItem").length).toBe(0);
	});

	it("should render null if isServerSide and lazyLoad enabled", () => {
		const customFields = {
			lazyLoad: true,
		};
		isServerSide.mockReturnValue(true);
		useFusionContext.mockReturnValueOnce({
			arcSite: "the-sun",
			deployment: jest.fn((x) => x),
			isAdmin: false,
		});

		const wrapper = mount(<SimpleList customFields={customFields} />);
		expect(wrapper).toBeEmptyRender();
	});
});
