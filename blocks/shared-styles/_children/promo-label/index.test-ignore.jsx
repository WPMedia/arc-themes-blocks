import React from "react";
import { mount } from "enzyme";
import getProperties from "fusion:properties";
import { useFusionContext } from "fusion:context";
import getThemeStyle from "fusion:themes";
import getTranslatedPhrases from "fusion:intl";
import PromoLabel, { getLabelText } from "./index";

describe("the promo label", () => {
	beforeAll(() => {
		useFusionContext.mockReturnValue({ arcSite: "the-sun" });
		getProperties.mockReturnValue({ locale: "en" });
		getThemeStyle.mockReturnValue({ "primary-color": "#ff0000" });
	});

	jest.mock("fusion:intl", () => ({
		__esModule: true,
		default: jest.fn((locale) => ({
			t: jest.fn((phrase) => require("../../../intl.json")[phrase][locale]),
		})),
	}));

	afterAll(() => {
		jest.resetModules();
	});

	it("should not render when the promo type is missing", () => {
		const wrapper = mount(<PromoLabel />);
		expect(wrapper.find("div.promo-label").length).toBe(0);
		wrapper.unmount();
	});

	it('should not render when the promo type is "other"', () => {
		const wrapper = mount(<PromoLabel type="other" />);
		expect(wrapper.find("div.promo-label").length).toBe(0);
		wrapper.unmount();
	});

	it('should render when type is "video"', () => {
		getTranslatedPhrases.mockReturnValue({
			t: jest.fn().mockReturnValue("Video"),
		});
		const wrapper = mount(<PromoLabel type="Video" />);
		expect(wrapper.find("div.promo-label").length).toBe(1);
		expect(wrapper.find("div.promo-label span").text()).toBe("Video");
		wrapper.unmount();
	});

	it('should render when type is "gallery"', () => {
		getTranslatedPhrases.mockReturnValue({
			t: jest.fn().mockReturnValue("Gallery"),
		});
		const wrapper = mount(<PromoLabel type="Gallery" />);
		expect(wrapper.find("div.promo-label").length).toBe(1);
		expect(wrapper.find("div.promo-label span").text()).toBe("Gallery");
		wrapper.unmount();
	});

	it("should be rendered using the color of the site", () => {
		const wrapper = mount(<PromoLabel type="Video" />);
		expect(wrapper.find("StyledComponent").at(0).prop("primaryColor")).toEqual("#ff0000");
		expect(wrapper.find("PlayIcon").length).toBe(1);
		wrapper.unmount();
	});

	it('should render only the Play icon when the label is Video and size is "small"', () => {
		const wrapper = mount(<PromoLabel type="Video" size="small" />);
		expect(wrapper.find("div.promo-label").length).toBe(1);
		expect(wrapper.find("div.promo-label span").length).toBe(0);
		expect(wrapper.find("PlayIcon").length).toBe(1);
		wrapper.unmount();
	});

	it('should render only the Camera icon when the label is Gallery and size is "small"', () => {
		const wrapper = mount(<PromoLabel type="Gallery" size="small" />);
		expect(wrapper.find("div.promo-label").length).toBe(1);
		expect(wrapper.find("div.promo-label span").length).toBe(0);
		expect(wrapper.find("CameraIcon").length).toBe(1);
		wrapper.unmount();
	});

	it('should render small and using the color of the site when size is "small"', () => {
		const wrapper = mount(<PromoLabel type="Gallery" size="small" />);
		expect(wrapper.find("StyledComponent").at(0).prop("primaryColor")).toEqual("#ff0000");
		expect(wrapper.find("div.promo-label span").length).toBe(0);
		expect(wrapper.find("CameraIcon").length).toBe(1);
		wrapper.unmount();
	});

	it("should not render an icon if label type is not recognized", () => {
		const wrapper = mount(<PromoLabel type="PromoType" />);
		expect(wrapper.find("div.promo-label").length).toBe(1);
		expect(wrapper.find("div.promo-label span").text()).toBe("");
		expect(wrapper.find("Icon").html()).toBeFalsy();
		wrapper.unmount();
	});

	it("getLabelText should return null if no phrases passed ", () => {
		const result = getLabelText(null, "type");
		expect(result).toBe(null);
	});

	it("getLabelText should return null if no type passed ", () => {
		const result = getLabelText({}, null);
		expect(result).toBe(null);
	});

	it("getLabelText should return null if type is not gallery nor video ", () => {
		const result = getLabelText({}, "other");
		expect(result).toBe(null);
	});

	it('should not render icon when the promo type not "other", "Video", or "Gallery"', () => {
		const wrapper = mount(<PromoLabel type="none" />);
		expect(wrapper.find("div.promo-label").length).toBe(1);
		expect(wrapper.find("CameraIcon").length).toEqual(0);
		expect(wrapper.find("PlayIcon").length).toEqual(0);
		wrapper.unmount();
	});
});
