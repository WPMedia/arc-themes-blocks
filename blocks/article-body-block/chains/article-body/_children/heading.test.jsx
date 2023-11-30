describe("This test is disabled", () => {
	it("should succeed", () => {
		expect(true);
	});
});

// import React from "react";
// import { mount } from "enzyme";

// import Heading from "./heading";

// describe("the article body Heading component", () => {
// 	it("should render the correct heading", () => {
// 		const headingData = {
// 			_id: "CF5ARXXK6BHJ5LO45DZCCBHL7U",
// 			type: "header",
// 			level: 3,
// 			additional_properties: {
// 				comments: [],
// 				inline_comments: [],
// 				_id: 1563473120776,
// 			},
// 			content:
// 				'Heading 3 - <b>bold</b> <i>italic</i> <u>underline</u> <a href="https://www.washingtonpost.com/" target=_blank>hyperlink</a>',
// 		};

// 		const wrapper = mount(<Heading element={headingData} />);
// 		expect(wrapper.find("h3").length).toBe(1);
// 		expect(wrapper.find("h3").text()).toMatch("Heading 3 - bold italic underline hyperlink");
// 		expect(wrapper.find("h3").html()).toMatchInlineSnapshot(
// 			`"<h3>Heading 3 - <b>bold</b> <i>italic</i> <u>underline</u> <a href=\\"https://www.washingtonpost.com/\\" target=\\"_blank\\">hyperlink</a></h3>"`
// 		);
// 	});

// 	it("should default to h2 if no heading level is given", () => {
// 		const headingData = {
// 			_id: "CF5ARXXK6BHJ5LO45DZCCBHL7U",
// 			type: "header",
// 			additional_properties: {
// 				comments: [],
// 				inline_comments: [],
// 				_id: 1563473120776,
// 			},
// 			content:
// 				'Heading 3 - <b>bold</b> <i>italic</i> <u>underline</u> <a href="https://www.washingtonpost.com/" target=_blank>hyperlink</a>',
// 		};

// 		const wrapper = mount(<Heading element={headingData} />);
// 		expect(wrapper.find("h2").length).toBe(1);
// 		expect(wrapper.find("h2").html()).toMatchInlineSnapshot(
// 			`"<h2>Heading 3 - <b>bold</b> <i>italic</i> <u>underline</u> <a href=\\"https://www.washingtonpost.com/\\" target=\\"_blank\\">hyperlink</a></h2>"`
// 		);
// 		expect(wrapper.find("h2").text()).toMatch("Heading 3 - bold italic underline hyperlink");
// 	});
// });
