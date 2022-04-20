import React from "react";
import { mount } from "enzyme";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import VideoPromo from "./default";

jest.mock("@wpmedia/engine-theme-sdk", () => ({
	Video: (props) => <div id="video" data-props={props} />,
}));
jest.mock("fusion:themes", () =>
	jest.fn(() => ({
		"primary-font-family": "primary",
		"secondary-font-family": "secondary",
	}))
);
jest.mock("fusion:properties", () => jest.fn(() => ({})));
jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => ({
		_id: "video-uuid",
	})),
}));
jest.mock("fusion:environment", () => ({
	videoOrg: "org",
	videoEnv: "env",
}));

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		arcSite: "the-sun",
		globalContent: {
			_id: "global-content-id",
			type: "video",
			version: "0.10.2",
			headlines: {
				basic: "global content headline",
			},
			description: {
				basic: "global content description",
			},
		},
	})),
}));

describe("the video promo feature", () => {
	let config;

	afterEach(() => {
		jest.resetModules();
	});

	beforeEach(() => {
		config = {
			itemContentConfig: {
				contentService: "ans-item",
				contentConfiguration: {},
			},
			title: "Title",
			description: "Description",
			inheritGlobalContent: false,
			autoplay: false,
			playthrough: false,
			shrinkToFit: false,
			viewportPercentage: 75,
		};
	});

	it("should have show title, description, and video with default configs", () => {
		const wrapper = mount(<VideoPromo customFields={config} />);
		expect(wrapper.find("h2").text()).toBe("Title");
		expect(wrapper.find("p").text()).toBe("Description");
		const video = wrapper.find("#video").at(0);
		expect(video.prop("data-props")).toEqual({
			uuid: "video-uuid",
			autoplay: false,
			org: "org",
			env: "env",
			playthrough: false,
			shrinkToFit: false,
			viewportPercentage: 75,
		});
	});

	it("should have show title, description, alert badge, and video with default configs", () => {
		config.alertBadge = "testing alert badge video label";
		const wrapper = mount(<VideoPromo customFields={config} />);
		expect(wrapper.find("h2").text()).toBe("Title");
		expect(wrapper.find("p").text()).toBe("Description");
		expect(wrapper.find("span").text()).toBe("testing alert badge video label");
		const video = wrapper.find("#video").at(0);
		expect(video.prop("data-props")).toEqual({
			uuid: "video-uuid",
			autoplay: false,
			org: "org",
			env: "env",
			playthrough: false,
			shrinkToFit: false,
			viewportPercentage: 75,
		});
	});

	it("should NOT show alert badge while its customfield is emtpy", () => {
		config.alertBadge = "";
		const wrapper = mount(<VideoPromo customFields={config} />);
		expect(wrapper.find("span").length).toEqual(0);
	});

	it("should have show title, description, and video with autoplay", () => {
		config.autoplay = true;
		const wrapper = mount(<VideoPromo customFields={config} />);
		expect(wrapper.find("h2").text()).toBe("Title");
		expect(wrapper.find("p").text()).toBe("Description");
		const video = wrapper.find("#video").at(0);
		expect(video.prop("data-props")).toEqual({
			uuid: "video-uuid",
			autoplay: true,
			org: "org",
			env: "env",
			playthrough: false,
			shrinkToFit: false,
			viewportPercentage: 75,
		});
	});

	it("should use globalContent for video while inherit global content is checked in customfields", () => {
		config.inheritGlobalContent = true;
		const wrapper = mount(<VideoPromo customFields={config} />);
		expect(wrapper.find("h2").text()).toBe("Title");
		expect(wrapper.find("p").text()).toBe("Description");
		const video = wrapper.find("#video").at(0);
		expect(video.prop("data-props")).toEqual({
			uuid: "global-content-id",
			autoplay: false,
			org: "org",
			env: "env",
			playthrough: false,
			shrinkToFit: false,
			viewportPercentage: 75,
		});
	});

	it("should use custom content if inheritGlobalContent is set to false", () => {
		config.inheritGlobalContent = false;
		const wrapper = mount(<VideoPromo customFields={config} />);
		expect(wrapper.find("h2").text()).toBe("Title");
		expect(wrapper.find("p").text()).toBe("Description");
		const video = wrapper.find("#video").at(0);
		expect(video.prop("data-props")).toEqual({
			uuid: "video-uuid",
			autoplay: false,
			org: "org",
			env: "env",
			playthrough: false,
			shrinkToFit: false,
			viewportPercentage: 75,
		});
	});

	it("should playthrough video", () => {
		config.playthrough = true;
		const wrapper = mount(<VideoPromo customFields={config} />);
		expect(wrapper.find("h2").text()).toBe("Title");
		expect(wrapper.find("p").text()).toBe("Description");
		const video = wrapper.find("#video").at(0);
		expect(video.prop("data-props")).toEqual({
			uuid: "video-uuid",
			autoplay: false,
			org: "org",
			env: "env",
			playthrough: true,
			shrinkToFit: false,
			viewportPercentage: 75,
		});
	});

	it("should not playthrough video", () => {
		config.playthrough = false;
		const wrapper = mount(<VideoPromo customFields={config} />);
		expect(wrapper.find("h2").text()).toBe("Title");
		expect(wrapper.find("p").text()).toBe("Description");
		const video = wrapper.find("#video").at(0);
		expect(video.prop("data-props")).toEqual({
			uuid: "video-uuid",
			autoplay: false,
			org: "org",
			env: "env",
			playthrough: false,
			shrinkToFit: false,
			viewportPercentage: 75,
		});
	});

	it("should be empty render while no content available", () => {
		useContent.mockReturnValueOnce(undefined);

		const wrapper = mount(<VideoPromo customFields={config} />);
		expect(wrapper.isEmptyRender()).toBe(true);
	});

	it("should not render while globalContent is empty while inheritGlobalContent is true", () => {
		const mockConfig = {
			itemContentConfig: {
				contentService: "ans-item",
				contentConfiguration: {},
				contentConfigValues: {},
			},
			title: "Title",
			description: "Description",
			inheritGlobalContent: false,
		};
		useFusionContext.mockClear();

		useFusionContext.mockReturnValue({});
		useContent.mockReturnValueOnce(undefined);

		config.inheritGlobalContent = true;

		const wrapper = mount(<VideoPromo customFields={mockConfig} />);
		expect(wrapper.isEmptyRender()).toBe(true);
	});

	it("no video render if global promo item is not video ", () => {
		const mockConfig = {
			itemContentConfig: {},
			title: "Title",
			description: "Description",
		};
		useFusionContext.mockClear();
		config.inheritGlobalContent = false;

		useContent.mockReturnValue({});
		useFusionContext.mockReturnValue({});

		const wrapper = mount(<VideoPromo customFields={mockConfig} />);
		expect(wrapper.isEmptyRender()).toBe(true);
	});
});
