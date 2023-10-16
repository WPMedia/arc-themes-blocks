import React from "react";
import { useFusionContext } from "fusion:context";
import { render, screen } from "@testing-library/react";
import ArcAd from "./default";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	LazyLoad: ({ children, enabled, renderPlaceholder }) =>
		enabled ? renderPlaceholder() : children,
}));

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
			render(<ArcAd {...AD_PROPS_MOCK} />);
			expect(screen.getByText("cube")).not.toBeNull();
			expect(screen.queryByText(/ads-block.ad-label/)).toBeNull();
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
				render(<ArcAd {...AD_PROPS_MOCK} />);
				expect(screen.getByText(/ads-block.ad-label/)).not.toBeNull();
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
				render(<ArcAd {...adProps} />);
				expect(screen.getByTestId("lazy-load-placeholder")).not.toBeNull();
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
			const wrapper = mount(<ArcAd {...adProps} />);
			const adContainer = wrapper.find("div.b-ads-block > div");
			expect(adContainer).toHaveLength(1);
			expect(adContainer.prop("style").maxWidth).toBeDefined();
			expect(adContainer.prop("style").minHeight).toBe(null);
		});

		it("renders with height and width", () => {
			const wrapper = mount(<ArcAd {...AD_PROPS_MOCK} />);
			const adContainer = wrapper.find("div.b-ads-block > div");
			expect(adContainer).toHaveLength(1);
			expect(adContainer.prop("style").maxWidth).toBeDefined();
			expect(adContainer.prop("style").minHeight).not.toBe(null);
		});
	});

	describe("Advertisement Label", () => {
		it("renders no advertisement label when disabled", () => {
			const adProps = {
				...AD_PROPS_MOCK,
				customFields: {
					displayAdLabel: false,
				},
			};
			const wrapper = mount(<ArcAd {...adProps} />);
			const container = wrapper.find("div.b-ads-block");
			expect(container).toHaveLength(1);
			expect(container.text()).toEqual("");
		});

		it("renders advertisement label when enabled", () => {
			const wrapper = mount(<ArcAd {...AD_PROPS_MOCK} />);
			const container = wrapper.find("div.b-ads-block");
			expect(container).toHaveLength(1);
			expect(container.text()).toEqual("ads-block.ad-label");
		});
	});
});
