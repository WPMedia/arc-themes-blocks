// eslint-disable-next-line max-classes-per-file
import React from "react";
import { mount } from "enzyme";

const mockPhrases = {
	"global.gallery-expand-button": "Expand",
	"global.gallery-page-count-text": "%{current} of %{total}",
	"global.gallery-autoplay-button": "Autoplay",
	"global.gallery-pause-autoplay-button": "Pause autoplay",
};

jest.mock("fusion:themes", () => jest.fn(() => ({})));

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		fallbackImage: "placeholder.jpg",
		resizerURL: "https://fake.cdn.com/resizer",
		galleryCubeClicks: 5,
	}))
);

jest.mock("fusion:context", () => ({
	useAppContext: jest.fn(() => ({})),
	useFusionContext: jest.fn(() => ({})),
}));

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => []),
}));

jest.mock("@wpmedia/engine-theme-sdk", () => ({
	Gallery: function Gallery() {
		return <div />;
	},
	LazyLoad: ({ children }) => <>{children}</>,
	isServerSide: () => true,
}));

jest.mock("fusion:intl", () => ({
	__esModule: true,
	default: jest.fn(() => ({ t: jest.fn((phrase) => mockPhrases[phrase]) })),
}));

describe("gallery feature block - lazy load", () => {
	it("should not return on server side with lazy load true", () => {
		const { default: GalleryFeature } = require("./default");
		const wrapper = mount(<GalleryFeature customFields={{ lazyLoad: true }} />);

		expect(wrapper.html()).toBe(null);
	});
});

describe("gallery feature block - no custom fields", () => {
	beforeEach(() => {
		jest.mock("fusion:context", () => ({
			useAppContext: jest.fn(() => ({})),
			useFusionContext: jest.fn(() => ({
				arcSite: "the-sun",
			})),
		}));

		jest.mock("fusion:content", () => ({
			useContent: jest.fn(() => []),
		}));
	});

	it("should render the global content gallery", () => {
		const { default: GalleryFeature } = require("./default");
		const wrapper = mount(<GalleryFeature />);
		expect(wrapper.find("Gallery").props().ansHeadline).toEqual("");
		expect(wrapper.find("Gallery").props().galleryElements).toStrictEqual([]);
		expect(wrapper.find("Gallery").props().interstitialClicks).toStrictEqual(5);
	});
});

describe("gallery feature block - globalContent", () => {
	beforeEach(() => {
		jest.mock("fusion:properties", () =>
			jest.fn(() => ({
				fallbackImage: "placeholder.jpg",
				resizerURL: "https://fake.cdn.com/resizer",
			}))
		);

		jest.mock("fusion:context", () => ({
			useAppContext: jest.fn(() => ({
				globalContent: {
					content_elements: [
						{
							caption: "my cool global content caption",
							subtitle: "my cool global content subtitle",
						},
					],
					_id: "shdsjdhs73e34",
					headlines: {
						basic: "This is a global content headline",
					},
				},
			})),
			useFusionContext: jest.fn(() => ({
				arcSite: "the-sun",
			})),
		}));

		jest.mock("fusion:content", () => ({
			useContent: jest.fn(() => []),
		}));
	});

	it("should render the global content gallery", () => {
		const { default: GalleryFeature } = require("./default");
		const wrapper = mount(<GalleryFeature customFields={{ inheritGlobalContent: true }} />);

		expect(wrapper.find("Gallery").props().ansHeadline).toEqual(
			"This is a global content headline"
		);
		expect(wrapper.find("Gallery").props().galleryElements).toStrictEqual([
			{
				caption: "my cool global content caption",
				subtitle: "my cool global content subtitle",
			},
		]);
		expect(wrapper.find("Gallery").props().interstitialClicks).toStrictEqual(NaN);
	});
});

describe("gallery feature block - contentConfig", () => {
	beforeEach(() => {
		jest.mock("fusion:context", () => ({
			useAppContext: jest.fn(() => ({})),
			useFusionContext: jest.fn(() => ({
				arcSite: "the-sun",
			})),
		}));
	});

	it("should render the content source gallery", () => {
		jest.mock("fusion:content", () => ({
			useContent: jest.fn(() => ({
				content_elements: [
					{
						caption: "my cool caption",
						subtitle: "my cool subtitle",
					},
				],
				_id: "shdsjdhs73e34",
				headlines: {
					basic: "This is a headline",
				},
			})),
		}));
		const { default: GalleryFeature } = require("./default");
		const wrapper = mount(
			<GalleryFeature
				customFields={{
					galleryContentConfig: {
						contentService: "cool-api",
						contentConfigValues: "cool-config",
					},
				}}
			/>
		);
		expect(wrapper.find("Gallery").props().ansHeadline).toEqual("This is a headline");
		expect(wrapper.find("Gallery").props().pageCountPhrase).toBeInstanceOf(Function);
		expect(wrapper.find("Gallery").props().galleryElements).toStrictEqual([
			{
				caption: "my cool caption",
				subtitle: "my cool subtitle",
			},
		]);
	});

	it("should have blank headline if ansHeadline missing", () => {
		jest.mock("fusion:content", () => ({
			useContent: jest.fn(() => ({
				content_elements: [
					{
						caption: "my cool caption",
						subtitle: "my cool subtitle",
					},
				],
				_id: "shdsjdhs73e34",
			})),
		}));
		const { default: GalleryFeature } = require("./default");
		const wrapper = mount(
			<GalleryFeature
				customFields={{
					galleryContentConfig: {
						contentService: "cool-api",
						contentConfigValues: "cool-config",
					},
				}}
			/>
		);
		expect(wrapper.find("Gallery").props().ansHeadline).toEqual("");
		expect(wrapper.find("Gallery").props().galleryElements).toStrictEqual([
			{
				caption: "my cool caption",
				subtitle: "my cool subtitle",
			},
		]);
	});

	it("should have blank ansId if missing", () => {
		jest.mock("fusion:content", () => ({
			useContent: jest.fn(() => ({
				content_elements: [
					{
						caption: "my cool caption",
						subtitle: "my cool subtitle",
					},
				],
			})),
		}));
		const { default: GalleryFeature } = require("./default");
		const wrapper = mount(
			<GalleryFeature
				customFields={{
					galleryContentConfig: {
						contentService: "cool-api",
						contentConfigValues: "cool-config",
					},
				}}
			/>
		);
		expect(wrapper.find("Gallery").props().ansId).toEqual("");
		expect(wrapper.find("Gallery").props().ansHeadline).toEqual("");
		expect(wrapper.find("Gallery").props().galleryElements).toStrictEqual([
			{
				caption: "my cool caption",
				subtitle: "my cool subtitle",
			},
		]);
	});

	it("should have no gallery elements if no content_elements", () => {
		jest.mock("fusion:content", () => ({
			useContent: jest.fn(() => []),
		}));
		const { default: GalleryFeature } = require("./default");
		const wrapper = mount(
			<GalleryFeature
				customFields={{
					galleryContentConfig: {
						contentService: "cool-api",
						contentConfigValues: "cool-config",
					},
				}}
			/>
		);
		expect(wrapper.find("Gallery").props().ansId).toEqual("");
		expect(wrapper.find("Gallery").props().ansHeadline).toEqual("");
		expect(wrapper.find("Gallery").props().galleryElements).toStrictEqual([]);
	});
});
