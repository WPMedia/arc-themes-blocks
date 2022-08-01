import React from "react";
import { useFusionContext } from "fusion:context";
import { shallow, mount } from "enzyme";
import ArcAd from "./default";

const SITE_PROPS_MOCK = {
	breakpoints: {
		small: 0,
		medium: 768,
		large: 992,
	},
	websiteAdPath: "news",
	dfpId: 701,
};

const AD_PROPS_MOCK = {
	collection: "features",
	type: "Common/ArcAd",
	id: "0fPdGkcOqEoaWyN",
	customFields: {
		adType: "300x250",
		displayAdLabel: true,
		lazyLoad: false,
		reserveSpace: true,
	},
	displayProperties: {},
	variants: {},
	children: [],
};

describe("<ArcAd>", () => {
	describe("PageBuilder Admin", () => {
		beforeEach(() => {
			jest.clearAllMocks();
			useFusionContext.mockReturnValue({
				isAdmin: true,
				siteProperties: SITE_PROPS_MOCK,
			});
		});

		it("renders no ad unit in admin dashboard", () => {
			const wrapper = shallow(<ArcAd {...AD_PROPS_MOCK} />);
			expect(wrapper).toBeDefined();
			const arcAdminAd = wrapper.find(".arcad-feature .arcad-container > ArcAdminAd");
			expect(arcAdminAd.prop("adClass")).toEqual(AD_PROPS_MOCK.customFields.adType);
			expect(arcAdminAd.prop("adType")).toEqual("cube");
			expect(arcAdminAd.prop("slotName")).toEqual("news");
			expect(typeof arcAdminAd.prop("dimensions")).toEqual("object");
			expect(wrapper.find("AdUnit")).toHaveLength(0);
		});
	});

	describe("Published Page Rendering", () => {
		beforeEach(() => {
			jest.clearAllMocks();
			useFusionContext.mockReturnValue({
				isAdmin: false,
				siteProperties: SITE_PROPS_MOCK,
			});
		});

		describe("when lazy loading is disabled", () => {
			it("renders ad unit with disabled lazy-load container", () => {
				const wrapper = mount(<ArcAd {...AD_PROPS_MOCK} />);
				expect(wrapper).toBeDefined();
				const lazyLoaderEl = wrapper.find("div.arcad-feature LazyLoad");
				expect(lazyLoaderEl).toHaveLength(1);
				expect(lazyLoaderEl.prop("enabled")).toBe(false);
				const adUnitEl = lazyLoaderEl.find("AdUnit");
				expect(adUnitEl).toHaveLength(1);
				expect(typeof adUnitEl.prop("adConfig")).toEqual("object");
				expect(typeof adUnitEl.prop("featureConfig")).toEqual("object");
			});
		});

		describe("when lazy loading is enabled", () => {
			it("renders with enabled lazy-load container", () => {
				const adProps = {
					...AD_PROPS_MOCK,
					customFields: {
						lazyLoad: true,
					},
				};
				const wrapper = mount(<ArcAd {...adProps} />);
				expect(wrapper).toBeDefined();
				const lazyLoaderEl = wrapper.find("div.arcad-feature LazyLoad");
				expect(lazyLoaderEl).toHaveLength(1);
				expect(lazyLoaderEl.prop("enabled")).toBe(true);
			});

			it("renders with ad unit inside lazy-load container", () => {
				const adProps = {
					...AD_PROPS_MOCK,
					customFields: {
						lazyLoad: true,
					},
				};
				const wrapper = shallow(<ArcAd {...adProps} />);
				expect(wrapper).toBeDefined();
				const adUnitEl = wrapper.find(".arcad-feature LazyLoad AdUnit");
				expect(adUnitEl).toHaveLength(1);
				expect(typeof adUnitEl.prop("adConfig")).toEqual("object");
				expect(typeof adUnitEl.prop("featureConfig")).toEqual("object");
			});
		});
	});

	describe("Reserve Space", () => {
		it("renders with width only", () => {
			const adProps = {
				...AD_PROPS_MOCK,
				customFields: {
					reserveSpace: false,
				},
			};
			const wrapper = shallow(<ArcAd {...adProps} />);
			const container = wrapper.find(".arcad-container");
			expect(container).toHaveLength(1);
			expect(container.prop("style").maxWidth).toBeDefined();
			expect(container.prop("style").minHeight).toBe(null);
		});

		it("renders with height and width", () => {
			const wrapper = shallow(<ArcAd {...AD_PROPS_MOCK} />);
			const container = wrapper.find(".arcad-container");
			expect(container).toHaveLength(1);
			expect(container.prop("style").maxWidth).toBeDefined();
			expect(container.prop("style").minHeight).not.toBe(null);
		});
	});

	describe("Advertisement Label", () => {
		it.todo("renders no advertisement label when disabled", () => {
			const adProps = {
				...AD_PROPS_MOCK,
				customFields: {
					displayAdLabel: false,
				},
			};
			const wrapper = shallow(<ArcAd {...adProps} />);
			const container = wrapper.find(".arcad-feature");
			expect(container).toHaveLength(1);
			expect(container.prop("displayAdLabel")).toBe(false);
			expect(container.prop("adLabel")).toEqual("ads-block.ad-label");
		});

		it.todo("renders advertisement label when enabled", () => {
			const wrapper = shallow(<ArcAd {...AD_PROPS_MOCK} />);
			const container = wrapper.find(".arcad-feature");
			expect(container).toHaveLength(1);
			expect(container.prop("displayAdLabel")).toBe(true);
			expect(container.prop("adLabel")).toEqual("ads-block.ad-label");
		});

		// todo: dangerously set for advertisement label?
		it.todo("renders custom advertisement label", () => {
			const advertisementLabel =
				"Advertisement / <a href='http://example.com' target='_blank'>Advertisement</a>";
			useFusionContext.mockReturnValue({
				siteProperties: {
					...SITE_PROPS_MOCK,
					advertisementLabel,
				},
			});
			const wrapper = shallow(<ArcAd {...AD_PROPS_MOCK} />);
			const container = wrapper.find(".arcad-feature");
			expect(container).toHaveLength(1);
			expect(container.prop("displayAdLabel")).toBe(true);
			expect(container.prop("adLabel")).toEqual(advertisementLabel);
		});
	});
});
