import React from "react";

import { mount } from "enzyme";
import GridList from ".";

const BLOCK_CLASS_NAME = "b-offer";

describe("GridList", () => {
	it("renders nothing when no children", () => {
		const wrapper = mount(<GridList />);

		expect(wrapper.html()).toBe(null);
	});

	it("renders one child", () => {
		const wrapper = mount(
			<GridList className={BLOCK_CLASS_NAME}>
				<div />
			</GridList>
		);

		expect(wrapper.find(".b-offer__grid-list").exists()).toBe(true);
		expect(wrapper.find(".b-offer__grid-list--1").exists()).toBe(true);
	});

	it("renders three children", () => {
		const wrapper = mount(
			<GridList className={BLOCK_CLASS_NAME}>
				<div />
				<div />
				<div />
			</GridList>
		);

		expect(wrapper.find(".b-offer__grid-list").exists()).toBe(true);
		expect(wrapper.find(".b-offer__grid-list--3").exists()).toBe(true);
	});

	it("renders four children", () => {
		const wrapper = mount(
			<GridList className={BLOCK_CLASS_NAME}>
				<div />
				<div />
				<div />
				<div />
			</GridList>
		);

		expect(wrapper.find(".b-offer__grid-list").exists()).toBe(true);
		expect(wrapper.find(".b-offer__grid-list--4").exists()).toBe(true);
	});

	it("renders five children", () => {
		const wrapper = mount(
			<GridList className={BLOCK_CLASS_NAME}>
				<div />
				<div />
				<div />
				<div />
				<div />
			</GridList>
		);

		expect(wrapper.find(".b-offer__grid-list").exists()).toBe(true);
		expect(wrapper.find(".b-offer__grid-list--5").exists()).toBe(true);
	});
});
