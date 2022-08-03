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
	it("renders with ad name", () => {
		const wrapper = mount(<ArcAdminAd {...defaults.props} />);
		expect(wrapper).toBeDefined();
		const container = wrapper.find("div.b-ads-block--admin");
		expect(container).toHaveLength(1);
		const adNameEl = container.find("p").at(0);
		expect(adNameEl).toHaveLength(1);
		expect(adNameEl.text()).toEqual("test-ad-name");
	});

	it("renders with default ad name", () => {
		const adProps = {
			...defaults.props,
			adType: undefined,
		};
		const wrapper = mount(<ArcAdminAd {...adProps} />);
		expect(wrapper).toBeDefined();
		const container = wrapper.find("div.b-ads-block--admin");
		expect(container).toHaveLength(1);
		const adNameEl = container.find("p").at(0);

		expect(adNameEl.text()).toEqual("Ad Name N/A");
	});
});
