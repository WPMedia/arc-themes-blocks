import React from "react";
import { mount } from "enzyme";
import Item from "./item";

const BLOCK_CLASS_NAME = "b-checkout";

describe("Cart Item", () => {
	it("renders name, description and additional info", () => {
		const props = {
			name: "Name",
			description: "Item description",
			additionalInfo: "Some addtional information for an item",
		};
		const wrapper = mount(<Item className={BLOCK_CLASS_NAME} {...props} />);

		expect(wrapper.find(".b-checkout__cart-item").exists()).toBe(true);
		expect(wrapper.find(".b-checkout__cart-item--name").text()).toBe(props.name);
		expect(wrapper.find(".b-checkout__cart-item--description").text()).toBe(props.description);
		expect(wrapper.find(".b-checkout__cart-item--info").text()).toBe(props.additionalInfo);
	});

	it("renders name, description", () => {
		const props = {
			name: "Name",
			description: "Item description",
		};
		const wrapper = mount(<Item className={BLOCK_CLASS_NAME} {...props} />);

		expect(wrapper.find(".b-checkout__cart-item").exists()).toBe(true);
		expect(wrapper.find(".b-checkout__cart-item--name").text()).toBe(props.name);
		expect(wrapper.find(".b-checkout__cart-item--description").text()).toBe(props.description);
		expect(wrapper.find(".b-checkout__cart-item--info").exists()).toBe(false);
	});

	it("renders name only", () => {
		const props = {
			name: "Name",
		};
		const wrapper = mount(<Item className={BLOCK_CLASS_NAME} {...props} />);

		expect(wrapper.find(".b-checkout__cart-item").exists()).toBe(true);
		expect(wrapper.find(".b-checkout__cart-item--name").text()).toBe(props.name);
		expect(wrapper.find(".b-checkout__cart-item--description").exists()).toBe(false);
		expect(wrapper.find(".b-checkout__cart-item--info").exists()).toBe(false);
	});
});