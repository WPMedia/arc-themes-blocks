import React from "react";
import { shallow } from "enzyme";

describe("Given Overline Block", () => {
	it("should return an Overline element", () => {
		const { default: Overline } = require("./default");
		const wrapper = shallow(<Overline />);
		expect(wrapper.find("Overline").length).toEqual(1);
	});
});
