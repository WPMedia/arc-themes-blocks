import React from "react";
import { mount } from "enzyme";
import { useFusionContext } from "fusion:context";
import ArcAdminAd from "./index";

const defaults = {
	props: {
		adClass: "test-ad-class",
		adType: "test-ad-name",
		slotName: "test-slot-name",
		dimensions: [
			[1, 1],
			[1, 1],
			[1, 1],
		],
	},
};

describe("<ArcAdminAd>", () => {
	beforeEach(() => {
		useFusionContext.mockClear();
	});

	it("renders in admin with ad name", () => {
		useFusionContext.mockReturnValueOnce({ isAdmin: true });
		const wrapper = mount(<ArcAdminAd {...defaults.props} />);
		expect(wrapper).toBeDefined();
		const container = wrapper.find(".pb-ad-admin");
		expect(container).toHaveLength(1);
		const adNameEl = container.find(".ad_name");
		expect(adNameEl).toHaveLength(1);
		expect(adNameEl.text()).toEqual("test-ad-name");
	});

	it("renders in admin with no ad name", () => {
		useFusionContext.mockReturnValueOnce({ isAdmin: true });
		const adProps = {
			...defaults.props,
			adType: undefined,
		};
		const wrapper = mount(<ArcAdminAd {...adProps} />);
		expect(wrapper).toBeDefined();
		const container = wrapper.find(".pb-ad-admin");
		expect(container).toHaveLength(1);
		const adNameEl = container.find(".ad_name");
		expect(adNameEl).toHaveLength(1);
		expect(adNameEl.text()).toEqual("Ad Name N/A");
	});

	it("renders nothing when outside admin", () => {
		useFusionContext.mockReturnValueOnce({ isAdmin: false });
		const wrapper = mount(<ArcAdminAd {...defaults.props} />);
		expect(wrapper).toBeDefined();
		expect(wrapper.find(".pb-ad-admin")).toHaveLength(0);
	});
});
