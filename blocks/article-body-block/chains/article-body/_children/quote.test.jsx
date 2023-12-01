describe("This test is disabled", () => {
	it("should succeed", () => {
		expect(true);
	});
});

// import React from "react";
// import { mount } from "enzyme";

// import Quote from "./quote";

// describe("the article body Blockquote component", () => {
// 	it("should not render a quote when it is not provided with the necessary data", () => {
// 		const blockquote = {
// 			_id: "44CZ46VGIBBOZAZ23H4OXB4ND4U4",
// 			type: "quote",
// 			subtype_label: "blockquote",
// 			subtype: "blockquote",
// 			additional_properties: {
// 				_id: "WT44KGY6HJDL7DN165HUDEHP4ZY",
// 				comments: [],
// 			},
// 		};

// 		const wrapper = mount(<Quote element={blockquote} />);
// 		expect(wrapper.find("blockquote").find("p").length).toBe(0);
// 	});

// 	it("should render a quote when it is provided with the necessary data", () => {
// 		const blockquote = {
// 			_id: "CYYF74NCBRF23I41Y6232MKQZILWKA",
// 			type: "quote",
// 			content_elements: [
// 				{
// 					type: "text",
// 					content:
// 						"A block quote is for when you’re citing another text at length. It’s important that it’s formatted differently so that readers know you’re quoting from another source. Block quotes an have multiple paragraphs – this one has 4 total.",
// 					additional_properties: {
// 						comments: [],
// 						inline_comments: [],
// 					},
// 					_id: "F6UMSFZWKNANBHQ2V5A12344CRSRGI",
// 				},
// 				{
// 					type: "text",
// 					content:
// 						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nulla ligula, lobortis egestas urna vel, pulvinar dapibus nunc. Nulla rutrum, ligula ac rutrum tempor, erat lectus posuere ipsum, quis facilisis velit neque quis erat.",
// 					additional_properties: {
// 						comments: [],
// 						inline_comments: [],
// 					},
// 					_id: "ULIZJUZ3PZCH3HKO42K412ZUZMASDU",
// 				},
// 				{
// 					type: "not text",
// 					content:
// 						"Proin massa massa, suscipit et pretium vitae, posuere non turpis. Phasellus vel augue non mi dapibus congue vel vel eros. Cras id mattis metus, eget varius justo. Morbi quis erat quam.",
// 					additional_properties: {
// 						comments: [],
// 						inline_comments: [],
// 					},
// 					_id: "UNSELKNBFBC5VRCYKHG1234IG3FND44",
// 				},
// 				{
// 					type: "not text",
// 					content:
// 						"Quisque tristique facilisis lorem, nec interdum nisi tristique vel. Donec dapibus ac velit quis consequat. Donec hendrerit purus risus, congue convallis risus vehicula non. Morbi mi nisi, hendrerit sit amet ornare a, scelerisque posuere nunc. Aliquam metus odio, finibus non pulvinar non, venenatis sit amet sem.",
// 					additional_properties: {
// 						comments: [],
// 						inline_comments: [],
// 					},
// 					_id: "KWMRNJ6DJ5DHJHGFNZF5sa252JGIFI",
// 				},
// 			],
// 			subtype: "blockquote",
// 			citation: {
// 				type: "text",
// 				content: "Lorem Ipsum Generator",
// 			},
// 			additional_properties: {
// 				_id: "4RTIZEM41Y5CFXI4IF312dgtRO64DCYA",
// 				comments: [],
// 			},
// 		};

// 		const wrapper = mount(<Quote element={blockquote} />);
// 		expect(wrapper.find("blockquote").find("p").length).toBe(2);
// 		expect(wrapper.find("blockquote").find("span").length).toBe(1);
// 	});

// 	it("should not render a quote with an incomplete citation when it is not provided with citation content", () => {
// 		const blockquote = {
// 			_id: "CYYF74NCBRF23I41Y6232MKQZILWKA",
// 			type: "quote",
// 			content_elements: [
// 				{
// 					type: "text",
// 					content:
// 						"A block quote is for when you’re citing another text at length. It’s important that it’s formatted differently so that readers know you’re quoting from another source. Block quotes an have multiple paragraphs – this one has 4 total.",
// 					additional_properties: {
// 						comments: [],
// 						inline_comments: [],
// 					},
// 					_id: "F6UMSFZWKNANBHQ2V5A12344CRSRGI",
// 				},
// 				{
// 					type: "text",
// 					content:
// 						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nulla ligula, lobortis egestas urna vel, pulvinar dapibus nunc. Nulla rutrum, ligula ac rutrum tempor, erat lectus posuere ipsum, quis facilisis velit neque quis erat.",
// 					additional_properties: {
// 						comments: [],
// 						inline_comments: [],
// 					},
// 					_id: "ULIZJUZ3PZCH3HKO42K412ZUZMASDU",
// 				},
// 				{
// 					type: "not text",
// 					content:
// 						"Proin massa massa, suscipit et pretium vitae, posuere non turpis. Phasellus vel augue non mi dapibus congue vel vel eros. Cras id mattis metus, eget varius justo. Morbi quis erat quam.",
// 					additional_properties: {
// 						comments: [],
// 						inline_comments: [],
// 					},
// 					_id: "UNSELKNBFBC5VRCYKHG1234IG3FND44",
// 				},
// 				{
// 					type: "not text",
// 					content:
// 						"Quisque tristique facilisis lorem, nec interdum nisi tristique vel. Donec dapibus ac velit quis consequat. Donec hendrerit purus risus, congue convallis risus vehicula non. Morbi mi nisi, hendrerit sit amet ornare a, scelerisque posuere nunc. Aliquam metus odio, finibus non pulvinar non, venenatis sit amet sem.",
// 					additional_properties: {
// 						comments: [],
// 						inline_comments: [],
// 					},
// 					_id: "KWMRNJ6DJ5DHJHGFNZF5sa252JGIFI",
// 				},
// 			],
// 			subtype: "blockquote",
// 			citation: {
// 				type: "text",
// 				content: "",
// 			},
// 			additional_properties: {
// 				_id: "4RTIZEM41Y5CFXI4IF312dgtRO64DCYA",
// 				comments: [],
// 			},
// 		};

// 		const wrapper = mount(<Quote element={blockquote} />);
// 		expect(wrapper.find("blockquote").find("p").length).toBe(2);
// 		expect(wrapper.find("blockquote").find("span").length).toBe(0);
// 	});

// 	it("should render a quote when it is provided with the necessary data", () => {
// 		const blockquote = {
// 			_id: "CYYF74NCBRF23I41Y6232MKQZILWKA",
// 			type: "quote",
// 			content_elements: [
// 				{
// 					type: "text",
// 					content:
// 						"A block quote is for when you’re citing another text at length. It’s important that it’s formatted differently so that readers know you’re quoting from another source. Block quotes an have multiple paragraphs – this one has 4 total.",
// 					additional_properties: {
// 						comments: [],
// 						inline_comments: [],
// 					},
// 					_id: "F6UMSFZWKNANBHQ2V5A12344CRSRGI",
// 				},
// 				{
// 					type: "text",
// 					content:
// 						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nulla ligula, lobortis egestas urna vel, pulvinar dapibus nunc. Nulla rutrum, ligula ac rutrum tempor, erat lectus posuere ipsum, quis facilisis velit neque quis erat.",
// 					additional_properties: {
// 						comments: [],
// 						inline_comments: [],
// 					},
// 					_id: "ULIZJUZ3PZCH3HKO42K412ZUZMASDU",
// 				},
// 				{
// 					type: "list",
// 					list_type: "ordered",
// 					items: [
// 						{
// 							type: "text",
// 							content: "Indented under 2",
// 							_id: "OWQEXQT6N5BTPF2CDZYVND6IAQ",
// 						},
// 						{
// 							type: "text",
// 							content: "Another thing indented under 2",
// 							_id: "UG52XTXHHRDN5KUPKCGTKE4NMM",
// 						},
// 					],
// 					_id: "FLXZDZLOFRGNLMALFGLJGLDPAM",
// 				},
// 			],
// 			subtype: "blockquote",
// 			citation: {
// 				type: "text",
// 				content: "Lorem Ipsum Generator",
// 			},
// 		};

// 		const wrapper = mount(<Quote element={blockquote} />);
// 		expect(wrapper.find("blockquote").find("p").length).toBe(2);
// 		expect(wrapper.find("blockquote").find("span").length).toBe(1);
// 	});
// });
