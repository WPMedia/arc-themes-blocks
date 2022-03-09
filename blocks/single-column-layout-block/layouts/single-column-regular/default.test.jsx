import React from "react";
import { mount } from "enzyme";
import SingleColumnRegular from "./default";

const testText = "Single Column Regular Layout";

describe("Single Column Regular Layout", () => {
	describe("when it is first rendered", () => {
		it("should render a header when the first child is provided", () => {
			const wrapper = mount(
				<SingleColumnRegular>
					<h1>{testText}</h1>
				</SingleColumnRegular>
			);
			expect(wrapper.find("header h1").html()).toBe(`<h1>${testText}</h1>`);
			expect(wrapper.find("section")).not.toExist();
			expect(wrapper.find("footer")).not.toExist();
		});

		it("should render a header and main content when two children are provided", () => {
			const wrapper = mount(
				<SingleColumnRegular>
					<></>
					<p>{testText}</p>
				</SingleColumnRegular>
			);
			expect(wrapper.find("header")).toExist();
			expect(wrapper.find("section p").html()).toBe(`<p>${testText}</p>`);
			expect(wrapper.find("footer")).not.toExist();
		});

		it("should render a footer when three children are provided", () => {
			const wrapper = mount(
				<SingleColumnRegular>
					<></>
					<></>
					<div>{testText}</div>
				</SingleColumnRegular>
			);
			expect(wrapper.find("header")).toExist();
			expect(wrapper.find("section")).toExist();
			expect(wrapper.find("footer div").html()).toBe(`<div>${testText}</div>`);
		});

		it("should render null when null is the child", () => {
			const wrapper = mount(<SingleColumnRegular>{null}</SingleColumnRegular>);

			expect(wrapper.text()).toBe("");
			expect(wrapper.html()).toBe(null);
		});

		it("should render null when no child", () => {
			const wrapper = mount(<SingleColumnRegular />);

			expect(wrapper.text()).toBe("");
			expect(wrapper.html()).toBe(null);
		});
	});
});
