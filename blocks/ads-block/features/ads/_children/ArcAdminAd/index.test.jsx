import React from "react";
import { mount } from "enzyme";
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
	it("renders in admin with ad name", () => {
		const wrapper = mount(<ArcAdminAd {...defaults.props} isAdmin />);
		expect(wrapper).toBeDefined();
		const container = wrapper.find("div.b-ads-block--admin");
		expect(container).toHaveLength(1);
		const adNameEl = container.find("p").at(0);
		expect(adNameEl).toHaveLength(1);
		expect(adNameEl.text()).toEqual("test-ad-name");
	});

	it("renders in admin with no ad name", () => {
		const adProps = {
			...defaults.props,
			isAdmin: true,
			adType: undefined,
		};
		const wrapper = mount(<ArcAdminAd {...adProps} />);
		expect(wrapper).toBeDefined();
		const container = wrapper.find("div.b-ads-block--admin");
		expect(container).toHaveLength(1);
		const adNameEl = container.find("p").at(0);

		expect(adNameEl.text()).toEqual("Ad Name N/A");
	});

	it("renders nothing when outside admin", () => {
		const wrapper = mount(<ArcAdminAd {...defaults.props} isAdmin={false} />);
		expect(wrapper).toBeDefined();
		expect(wrapper.find("div.b-ads-block--admin")).toHaveLength(0);
	});
});
