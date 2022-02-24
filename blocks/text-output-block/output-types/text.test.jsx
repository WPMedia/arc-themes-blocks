/**
 * this is for mocking node env
 * will not have window attribute, testing ssr
 * https://jestjs.io/docs/en/configuration.html#testenvironment-string
 * @jest-environment node
 */
import React from "react";
import { shallow } from "enzyme";
import TextOutputType from "./text";

describe("the text output type", () => {
	it("should render", () => {
		const wrapper = shallow(<TextOutputType />);
		expect(wrapper).toBeDefined();
	});

	describe("renders a page", () => {
		const wrapper = shallow(<TextOutputType>hello world</TextOutputType>);

		it("should render the childs plain", () => {
			expect(wrapper.text()).toEqual("hello world");
		});
	});
});
