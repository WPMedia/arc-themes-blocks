import React from "react";
import { mount } from "enzyme";
import GridList from ".";

describe("GridList", () => {
	it("renders nothing when no children", () => {
		const wrapper = mount(<GridList />);

		expect(wrapper.html()).toBe(null);
	});

	it("renders one child", () => {
		const wrapper = mount(
			<GridList>
				<div />
			</GridList>
		);

		expect(wrapper.find(".xpmedia-subscription-grid-list").exists()).toBe(true);
		expect(wrapper.find(".xpmedia-subscription-grid-list--1").exists()).toBe(true);
	});

	it("renders three children", () => {
		const wrapper = mount(
			<GridList>
				<div />
				<div />
				<div />
			</GridList>
		);

		expect(wrapper.find(".xpmedia-subscription-grid-list").exists()).toBe(true);
		expect(wrapper.find(".xpmedia-subscription-grid-list--4").exists()).toBe(false);
	});

	it("renders four children", () => {
		const wrapper = mount(
			<GridList>
				<div />
				<div />
				<div />
				<div />
			</GridList>
		);

		expect(wrapper.find(".xpmedia-subscription-grid-list").exists()).toBe(true);
		expect(wrapper.find(".xpmedia-subscription-grid-list--4").exists()).toBe(true);
	});

	it("renders five children", () => {
		const wrapper = mount(
			<GridList>
				<div />
				<div />
				<div />
				<div />
				<div />
			</GridList>
		);

		expect(wrapper.find(".xpmedia-subscription-grid-list").exists()).toBe(true);
		expect(wrapper.find(".xpmedia-subscription-grid-list--5").exists()).toBe(true);
	});
});
