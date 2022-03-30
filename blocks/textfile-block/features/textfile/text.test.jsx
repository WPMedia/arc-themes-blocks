import React from "react";
import { mount } from "enzyme";
import TextFile from "./text";

const simple = "User-agent: *\nAllow: /\n\nSitemap: http://www.example.com/sitemap.xml";

describe("the textfile block", () => {
	it("should render the simple text", () => {
		const wrapper = mount(<TextFile customFields={{ Text: simple }} />);
		expect(wrapper.html()).toEqual(simple);
	});

	it("should not render anything when no data is given", () => {
		const wrapper = mount(<TextFile />);
		expect(wrapper.find(TextFile).children()).toHaveLength(0);
	});

	it("should not render anything when Text missing", () => {
		const wrapper = mount(<TextFile customFields={{}} />);
		expect(wrapper.find(TextFile).children()).toHaveLength(0);
	});

	it("should not render anything when Text is empty", () => {
		const wrapper = mount(<TextFile customFields={{ Text: "" }} />);
		expect(wrapper.find(TextFile).children()).toHaveLength(0);
	});
});
