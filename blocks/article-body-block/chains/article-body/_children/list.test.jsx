import React from "react";
import { mount } from "enzyme";

import List from "./list";

describe("the article body List component", () => {
	it("should render unordered list correctly", () => {
		const listContent = {
			type: "list",
			list_type: "unordered",
			items: [
				{
					type: "text",
					content: "Indented under 2",
					_id: "IOY3SN76GVFI3MUDN3PX4V32AA",
				},
				{
					type: "text",
					content: "Another thing indented under 2",
					_id: "MX643WWQPZCYZHTZYMHCIML6SU",
				},
			],
			_id: "PSQTOBXAGZGKNOSBMOAUJ6EYSA",
		};

		const wrapper = mount(<List listType={listContent.list_type} listItems={listContent.items} />);
		expect(wrapper.find("ul").length).toBe(1);
		expect(wrapper.find("ul").childAt(0).html()).toMatchInlineSnapshot(
			`"<li>Indented under 2</li>"`
		);
		expect(wrapper.find("ul").childAt(1).html()).toMatchInlineSnapshot(
			`"<li>Another thing indented under 2</li>"`
		);
	});

	it("should render ordered list correctly", () => {
		const listContent = {
			type: "list",
			list_type: "ordered",
			items: [
				{
					type: "text",
					content: "Indented under 2",
					_id: "OWQEXQT6N5BTPF2CDZYVND6IAQ",
				},
				{
					type: "text",
					content: "Another thing indented under 2",
					_id: "UG52XTXHHRDN5KUPKCGTKE4NMM",
				},
			],
			_id: "FLXZDZLOFRGNLMALFGLJGLDPAM",
		};

		const wrapper = mount(<List listType={listContent.list_type} listItems={listContent.items} />);
		expect(wrapper.find("ol").length).toBe(1);
		expect(wrapper.find("ol").childAt(0).html()).toMatchInlineSnapshot(
			`"<li>Indented under 2</li>"`
		);
		expect(wrapper.find("ol").childAt(1).html()).toMatchInlineSnapshot(
			`"<li>Another thing indented under 2</li>"`
		);
	});

	it("should render nested list correctly", () => {
		const listContent = {
			type: "list",
			list_type: "ordered",
			items: [
				{
					type: "list",
					list_type: "unordered",
					items: [
						{
							type: "text",
							content: "Indented under 2",
							_id: "IOY3SN76GVFI3MUDN3PX4V32AA",
						},
						{
							type: "text",
							content: "Another thing indented under 2",
							_id: "MX643WWQPZCYZHTZYMHCIML6SU",
						},
					],
					_id: "PSQTOBXAGZGKNOSBMOAUJ6EYSA",
				},
				{
					type: "text",
					content: "Another thing indented under 3",
					_id: "UG52XTXHHRDN5KUPKCGTKE4NMM",
				},
			],
			_id: "FLXZDZLOFRGNLMALFGLJGLDPAM",
		};

		const wrapper = mount(<List listType={listContent.list_type} listItems={listContent.items} />);
		expect(wrapper.find("ol").length).toBe(1);
		expect(wrapper.children().find("ul").length).toBe(1);
		expect(wrapper.children().find("li").length).toBe(3);
		expect(wrapper.find("ul").childAt(0).html()).toMatchInlineSnapshot(
			`"<li>Indented under 2</li>"`
		);
		expect(wrapper.find("ul").childAt(1).html()).toMatchInlineSnapshot(
			`"<li>Another thing indented under 2</li>"`
		);
		expect(wrapper.find("ol").childAt(1).html()).toMatchInlineSnapshot(
			`"<li>Another thing indented under 3</li>"`
		);
	});
});
