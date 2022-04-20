import React from "react";
import { mount } from "enzyme";

import HTML from "./html";

describe("the article body raw_html component", () => {
	it("should not render raw_html when it is not provided with the necessary data", () => {
		const rawHTML = {
			_id: "44CZ46VGIBBOZAZH4OXB4ND4U4",
		};

		const wrapper = mount(<HTML id={rawHTML._id} content={rawHTML.content} />);
		expect(wrapper.html()).toBe(null);
	});

	it("should render raw_html when it is provided with the necessary data", () => {
		const rawHTML = {
			_id: "44CZ46VGIBBOZAZH4OXB4ND4U4",
			content: "<p>Some HTML</p>",
		};

		const wrapper = mount(<HTML id={rawHTML._id} content={rawHTML.content} />);
		expect(wrapper.html()).toMatch(rawHTML.content);
	});
});
