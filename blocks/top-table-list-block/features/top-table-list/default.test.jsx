import React from "react";
import { mount } from "enzyme";
import { RIGHT } from "./shared/imagePositionConstants";

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		fallbackImage: "placeholder.jpg",
	}))
);
jest.mock("fusion:themes", () => jest.fn(() => ({})));
jest.mock("@wpmedia/engine-theme-sdk", () => ({
	LazyLoad: ({ children }) => <>{children}</>,
	isServerSide: () => true,
}));
jest.mock(
	"./_children/conditional-story-item",
	() =>
		function ConditionalStoryItem() {
			return <div />;
		}
);

const config = {
	showOverlineXL: true,
	showHeadlineXL: true,
	showImageXL: true,
	showDescriptionXL: true,
	showBylineXL: true,
	showDateXL: true,
	showOverlineLG: true,
	showHeadlineLG: true,
	showImageLG: true,
	showDescriptionLG: true,
	showBylineLG: true,
	showDateLG: true,
	showHeadlineMD: true,
	showImageMD: true,
	showDescriptionMD: true,
	showBylineMD: true,
	showDateMD: true,
	showHeadlineSM: true,
	showImageSM: true,
	imagePositionSM: RIGHT,
};

describe("top table list", () => {
	afterEach(() => {
		jest.resetModules();
	});

	it("renders nothing server side with lazyLoad enabled", () => {
		const updatedConfig = {
			...config,
			lazyLoad: true,
		};
		const { default: TopTableList } = require("./default");
		TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});

		const wrapper = mount(
			<TopTableList customFields={updatedConfig} arcSite="" deployment={jest.fn((path) => path)} />
		);
		expect(wrapper.html()).toBe(null);
		expect(TopTableList.prototype.fetchContent).toHaveBeenCalled();
	});

	it("renders null if no content", () => {
		const { default: TopTableList } = require("./default");
		TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});

		jest.mock("fusion:context", () => ({
			useFusionContext: jest.fn(() => ({
				arcSite: "the-sun",
			})),
		}));

		jest.mock("fusion:content", () => ({
			useContent: jest.fn(),
		}));
		const wrapper = mount(
			<TopTableList customFields={config} arcSite="" deployment={jest.fn((path) => path)} />
		);

		expect(wrapper.text()).toBe("");
		expect(wrapper.find(".top-table-list-container").children().length).toBe(0);
	});

	it("renders one content item with incomplete data", () => {
		const { default: TopTableList } = require("./default");
		TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});

		jest.mock("fusion:content", () => ({
			useContent: jest.fn(() => ({
				content_elements: [
					{
						_id: "kjdfh",
						websites: {
							"the-sun": {
								website_url: "url",
							},
						},
					},
				],
			})),
		}));

		const smConfig = {
			...config,
			small: 1,
			showImageSM: true,
			imageRatioSM: "4:3",
		};
		const wrapper = mount(
			<TopTableList
				customFields={smConfig}
				arcSite="the-sun"
				deployment={jest.fn((path) => path)}
			/>
		);
		expect(wrapper.find(".top-table-list-container").children().length).toBe(1);
	});

	it("renders one content item with complete data", () => {
		const { default: TopTableList } = require("./default");
		TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});

		jest.mock("fusion:content", () => ({
			useContent: jest.fn(() => ({
				content_elements: [
					{
						_id: "kjdfh",
						promo_items: {
							basic: {
								type: "image",
								url: "url",
							},
						},
						headlines: {
							basic: "Basic Headline",
						},
						description: {
							basic: "Basic description",
						},
						credits: {
							by: ["Bob Woodward"],
						},
						websites: {
							"the-sun": {
								website_url: "url",
							},
						},
					},
				],
			})),
		}));

		const smConfig = {
			...config,
			small: 1,
			showImageSM: true,
			imageRatioSM: "4:3",
		};
		const wrapper = mount(
			<TopTableList customFields={smConfig} arcSite="" deployment={jest.fn((path) => path)} />
		);

		expect(wrapper.find(".top-table-list-container").children().length).toBe(1);
	});

	it("renders content with offset override custom field set", () => {
		const { default: TopTableList } = require("./default");
		TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});

		jest.mock("fusion:content", () => ({
			useContent: jest.fn(() => ({
				content_elements: [
					{
						_id: "kjdfh",
						promo_items: {
							basic: {
								type: "image",
								url: "url",
							},
						},
						headlines: {
							basic: "Basic Headline",
						},
						description: {
							basic: "Basic description",
						},
						credits: {
							by: ["Bob Woodward"],
						},
						websites: {
							"the-sun": {
								website_url: "url",
							},
						},
					},
					{
						_id: "abcde",
						promo_items: {
							basic: {
								type: "image",
								url: "url",
							},
						},
						headlines: {
							basic: "Alt Headline",
						},
						description: {
							basic: "Alt description",
						},
						credits: {
							by: ["John Doe"],
						},
						websites: {
							"the-sun": {
								website_url: "url",
							},
						},
					},
				],
			})),
		}));

		const smConfig = {
			...config,
			small: 1,
			showImageSM: true,
			imageRatioSM: "4:3",
			offsetOverride: 1,
		};
		const wrapper = mount(
			<TopTableList customFields={smConfig} arcSite="" deployment={jest.fn((path) => path)} />
		);
		const container = wrapper.find(".top-table-list-container");
		expect(container.children().length).toBe(1);
		const storyItem = container.find("ConditionalStoryItem");
		expect(storyItem).toHaveLength(1);
	});

	it("renders content only for the arcSite", () => {
		const { default: TopTableList } = require("./default");
		TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});

		jest.mock("fusion:context", () => ({
			useFusionContext: jest.fn(() => ({
				arcSite: "the-sun",
			})),
		}));

		jest.mock("fusion:content", () => ({
			useContent: jest.fn(() => ({
				content_elements: [
					{
						_id: "kjdfh",
						promo_items: {
							basic: {
								type: "image",
								url: "url",
							},
						},
						headlines: {
							basic: "Basic Headline",
						},
						description: {
							basic: "Basic description",
						},
						credits: {
							by: ["Bob Woodward"],
						},
						websites: {
							"the-prophet": {
								website_url: "url",
							},
							"the-sun": {
								website_url: "url",
							},
						},
					},
				],
			})),
		}));

		const xlConfig = {
			...config,
			extraLarge: 1,
			showImageXL: true,
			showHeadlineXL: true,
			imageRatioXL: "3:2",
		};
		const wrapper = mount(
			<TopTableList customFields={xlConfig} arcSite="" deployment={jest.fn((path) => path)} />
		);

		expect(wrapper.find(".top-table-list-container").children().length).toBe(1);
	});

	it("renders no content if arcSite not found", () => {
		const { default: TopTableList } = require("./default");
		TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});

		jest.mock("fusion:context", () => ({
			useFusionContext: jest.fn(() => ({
				arcSite: "daily-telegraph",
			})),
		}));

		jest.mock("fusion:content", () => ({
			useContent: jest.fn(() => ({
				content_elements: [
					{
						_id: "kjdfh",
						promo_items: {
							basic: {
								type: "image",
								url: "url",
							},
						},
						headlines: {
							basic: "Basic Headline",
						},
						description: {
							basic: "Basic description",
						},
						credits: {
							by: ["Bob Woodward"],
						},
						websites: {
							"the-prophet": {
								website_url: "url",
							},
							"the-sun": {
								website_url: "url",
							},
						},
					},
				],
			})),
		}));

		const wrapper = mount(
			<TopTableList customFields={config} arcSite="" deployment={jest.fn((path) => path)} />
		);

		expect(wrapper.find(".top-table-list-container").children().length).toBe(0);
	});
});

describe("top table list overline rules", () => {
	beforeAll(() => {
		jest.mock("fusion:properties", () =>
			jest.fn(() => ({
				fallbackImage: "placeholder.jpg",
			}))
		);
		jest.mock("fusion:context", () => ({
			useFusionContext: jest.fn(() => ({
				arcSite: "the-sun",
			})),
		}));
		jest.mock("fusion:themes", () => jest.fn(() => ({})));
		jest.mock("fusion:properties", () =>
			jest.fn(() => ({
				resizerUrl: "https://resizer.com",
			}))
		);
	});
	afterAll(() => {
		jest.resetModules();
	});

	it("must render overline from label", () => {
		const { default: TopTableList } = require("./default");
		TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
		const localConfig = Object.assign(config, {
			extraLarge: 1,
			large: 0,
			medium: 0,
			small: 0,
		});

		jest.mock("fusion:content", () => ({
			useContent: jest.fn(() => ({
				content_elements: [
					{
						_id: "kjdfh",
						headlines: {
							basic: "Basic Headline",
						},
						description: {
							basic: "Basic description",
						},
						credits: {
							by: ["Bob Woodward"],
						},
						websites: {
							"the-sun": {
								website_url: "url",
							},
						},
						label: {
							basic: {
								display: true,
								text: "The Label",
								url: "https://example.com",
							},
						},
					},
				],
			})),
			useEditableContent: jest.fn(() => ({
				editableContent: jest.fn(() => ({})),
			})),
		}));

		const wrapper = mount(
			<TopTableList customFields={localConfig} arcSite="" deployment={jest.fn((path) => path)} />
		);

		const ele = wrapper.find(".top-table-list-container").find("ConditionalStoryItem");
		expect(ele).toHaveLength(1);
	});

	it("must render overline from section", () => {
		const { default: TopTableList } = require("./default");
		TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
		const localConfig = Object.assign(config, {
			extraLarge: 1,
			large: 0,
			medium: 0,
			small: 0,
		});

		jest.mock("fusion:content", () => ({
			useContent: jest.fn(() => ({
				content_elements: [
					{
						_id: "kjdfh",
						headlines: {
							basic: "Basic Headline",
						},
						description: {
							basic: "Basic description",
						},
						credits: {
							by: ["Bob Woodward"],
						},
						websites: {
							"the-sun": {
								website_url: "url",
								website_section: {
									_id: "/the_url",
									name: "The Section",
								},
							},
						},
					},
				],
			})),
			useEditableContent: jest.fn(() => ({
				editableContent: jest.fn(() => ({})),
			})),
		}));

		const wrapper = mount(
			<TopTableList customFields={localConfig} arcSite="" deployment={jest.fn((path) => path)} />
		);

		const ele = wrapper.find(".top-table-list-container").find("ConditionalStoryItem");
		expect(ele).toHaveLength(1);
	});

	it("must prioritize overline from label if has section too", () => {
		const { default: TopTableList } = require("./default");
		TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
		const localConfig = Object.assign(config, {
			extraLarge: 1,
			large: 0,
			medium: 0,
			small: 0,
		});

		jest.mock("fusion:content", () => ({
			useContent: jest.fn(() => ({
				content_elements: [
					{
						_id: "kjdfh",
						headlines: {
							basic: "Basic Headline",
						},
						description: {
							basic: "Basic description",
						},
						credits: {
							by: ["Bob Woodward"],
						},
						label: {
							basic: {
								display: true,
								text: "The Label",
								url: "https://example.com",
							},
						},
						websites: {
							"the-sun": {
								website_url: "url",
								website_section: {
									_id: "/the_url",
									name: "The Section",
								},
							},
						},
					},
				],
			})),
			useEditableContent: jest.fn(() => ({
				editableContent: jest.fn(() => ({})),
			})),
		}));

		const wrapper = mount(
			<TopTableList customFields={localConfig} arcSite="" deployment={jest.fn((path) => path)} />
		);

		const ele = wrapper.find(".top-table-list-container").find("ConditionalStoryItem");
		expect(ele).toHaveLength(1);
	});
});
