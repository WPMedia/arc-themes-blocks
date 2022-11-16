import React from "react";
import { mount } from "enzyme";

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		fallbackImage: "placeholder.jpg",
	}))
);

jest.mock("@wpmedia/engine-theme-sdk", () => ({
	LazyLoad: ({ children }) => <>{children}</>,
	isServerSide: () => true,
}));

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
	imagePositionSM: "right",
};

xdescribe("Top Table List", () => {
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
			<TopTableList customFields={updatedConfig} deployment={jest.fn((path) => path)} />
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
			<TopTableList customFields={config} deployment={jest.fn((path) => path)} />
		);

		expect(wrapper.text()).toBe("");
		expect(wrapper.find(".b-top-table-list").children().length).toBe(0);
	});

	it("does not render content item with incomplete data", () => {
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
		expect(wrapper.find(".b-top-table-list-small-container").length).toBe(0);
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
								_id: "123",
								auth: {
									2: "abc",
								},
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
			<TopTableList customFields={smConfig} deployment={jest.fn((path) => path)} />
		);

		expect(wrapper.find(".top-table-list-small-container").length).toBe(1);
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
								_id: "123",
								auth: {
									2: "abc",
								},
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
			<TopTableList customFields={xlConfig} deployment={jest.fn((path) => path)} />
		);

		expect(wrapper.find(".b-top-table-list-extra_large-container").length).toBe(1);
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
								_id: "123",
								auth: {
									2: "abc",
								},
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
			<TopTableList customFields={config} deployment={jest.fn((path) => path)} />
		);

		expect(wrapper.find(".b-top-table-list").children().length).toBe(0);
	});
});
