/* eslint-disable no-irregular-whitespace */
import React from "react";
import { shallow, mount } from "enzyme";

jest.mock("fusion:themes", () => jest.fn(() => ({})));

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		locale: "en",
	}))
);
jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		arcSite: "dagen",
	})),
}));

describe("the links bar feature for the default output type", () => {
	afterEach(() => {
		jest.resetModules();
	});

	beforeEach(() => {
		jest.mock("fusion:context", () => ({
			useFusionContext: jest.fn(() => ({
				arcSite: "the-sun",
				id: "testId",
			})),
		}));
	});

	it("should not have separator only one link", () => {
		const { default: LinksBar } = require("./default");
		jest.mock("fusion:content", () => ({
			useContent: jest.fn(() => ({
				children: [
					{
						_id: "id_1",
						name: "test link 1",
					},
				],
			})),
		}));
		const wrapper = shallow(
			<LinksBar
				blockClassName="b-header-nav-chain"
				customFields={{ navigationConfig: "links" }}
				showHorizontalSeperatorDots
			/>
		);

		expect(wrapper.html()).toMatchInlineSnapshot(
			`"<nav aria-label=\\"header-nav-chain-block.links-element-aria-label\\" class=\\"c-stack b-header-nav-chain__links-list\\" data-style-direction=\\"horizontal\\" data-style-justification=\\"start\\" data-style-alignment=\\"center\\" data-style-inline=\\"false\\" data-style-wrap=\\"wrap\\"><span class=\\"b-header-nav-chain__links-list-item\\"><a class=\\"c-link\\" href=\\"id_1\\">test link 1</a></span></nav>"`
		);
	});

	it("should have separator when more than one link", () => {
		const { default: LinksBar } = require("./default");
		jest.mock("fusion:content", () => ({
			useContent: jest.fn(() => ({
				children: [
					{
						_id: "id_1",
						name: "test link 1",
					},
					{
						_id: "id_2",
						name: "test link 2",
					},
					{
						_id: "id_3",
						name: "test link 3",
					},
				],
			})),
		}));
		const wrapper = shallow(
			<LinksBar
				blockClassName="b-header-nav-chain"
				customFields={{ navigationConfig: "links" }}
				showHorizontalSeperatorDots
			/>
		);

		expect(wrapper.html()).toMatchInlineSnapshot(
			`"<nav aria-label=\\"header-nav-chain-block.links-element-aria-label\\" class=\\"c-stack b-header-nav-chain__links-list\\" data-style-direction=\\"horizontal\\" data-style-justification=\\"start\\" data-style-alignment=\\"center\\" data-style-inline=\\"false\\" data-style-wrap=\\"wrap\\"><span class=\\"b-header-nav-chain__links-list-item\\"><a class=\\"c-link\\" href=\\"id_1\\">test link 1</a></span><span class=\\"b-header-nav-chain__links-list-item\\"><span class=\\"c-separator\\"></span><a class=\\"c-link\\" href=\\"id_2\\">test link 2</a></span><span class=\\"b-header-nav-chain__links-list-item\\"><span class=\\"c-separator\\"></span><a class=\\"c-link\\" href=\\"id_3\\">test link 3</a></span></nav>"`
		);
	});

	it("should not have separator when more than one link and showHorizontalSeperatorDots is false", () => {
		const { default: LinksBar } = require("./default");
		jest.mock("fusion:content", () => ({
			useContent: jest.fn(() => ({
				children: [
					{
						_id: "id_1",
						name: "test link 1",
					},
					{
						_id: "id_2",
						name: "test link 2",
					},
				],
			})),
		}));
		const wrapper = shallow(
			<LinksBar
				blockClassName="b-header-nav-chain"
				customFields={{ navigationConfig: "links" }}
				showHorizontalSeperatorDots={false}
			/>
		);

		expect(wrapper.html()).toMatchInlineSnapshot(
			`"<nav aria-label=\\"header-nav-chain-block.links-element-aria-label\\" class=\\"c-stack b-header-nav-chain__links-list\\" data-style-direction=\\"horizontal\\" data-style-justification=\\"start\\" data-style-alignment=\\"center\\" data-style-inline=\\"false\\" data-style-wrap=\\"wrap\\"><span class=\\"b-header-nav-chain__links-list-item\\"><a class=\\"c-link\\" href=\\"id_1\\">test link 1</a></span><span class=\\"b-header-nav-chain__links-list-item\\"><a class=\\"c-link\\" href=\\"id_2\\">test link 2</a></span></nav>"`
		);
	});

	it("should contain the equal number of links between input and output", () => {
		const { default: LinksBar } = require("./default");
		jest.mock("fusion:content", () => ({
			useContent: jest.fn(() => ({
				children: [
					{
						_id: "id_1",
						name: "test link 1",
					},
					{
						_id: "id_2",
						name: "test link 2",
					},
					{
						_id: "id_3",
						node_type: "link",
						url: "/",
						display_name: "Link Text",
					},
					{
						_id: "id_4",
						node_type: "link",
						url: "http://arcpublishing.com",
						display_name: "Link Text",
					},
				],
			})),
		}));
		const wrapper = mount(
			<LinksBar blockClassName="b-header-nav-chain" customFields={{ navigationConfig: "links" }} />
		);

		expect(wrapper.find("span.b-header-nav-chain__links-list-item")).toHaveLength(4);
		expect(wrapper.find("span.b-header-nav-chain__links-list-item a:not([target])")).toHaveLength(
			3
		);
		expect(
			wrapper.find('span.b-header-nav-chain__links-list-item a[target="_blank"]')
		).toHaveLength(1);
	});

	it("should have no menu item if no content is returned", () => {
		jest.mock("fusion:content", () => ({
			useContent: jest.fn(() => ({
				children: [],
			})),
		}));
		const { default: LinksBar } = require("./default");
		const wrapper = shallow(
			<LinksBar blockClassName="b-header-nav-chain" customFields={{ navigationConfig: "links" }} />
		);

		expect(wrapper.find("nav > span")).toHaveLength(0);
	});

	it("should render the block with the default aria-label", () => {
		jest.mock("fusion:content", () => ({
			useContent: jest.fn(() => ({
				children: [
					{
						_id: "id_1",
						name: "test link 1",
					},
					{
						_id: "id_2",
						name: "test link 2",
					},
					{
						_id: "id_3",
						node_type: "link",
						url: "/",
						display_name: "Link Text",
					},
					{
						_id: "id_4",
						node_type: "link",
						url: "http://arcpublishing.com",
						display_name: "Link Text",
					},
				],
			})),
		}));
		const { default: LinksBar } = require("./default");
		const wrapper = shallow(<LinksBar blockClassName="b-header-nav-chain" />);
		expect(wrapper.find(".b-header-nav-chain__links-list").props()).toHaveProperty(
			"aria-label",
			"header-nav-chain-block.links-element-aria-label"
		);
	});

	it("should render the block with the custom aria-label", () => {
		jest.mock("fusion:content", () => ({
			useContent: jest.fn(() => ({
				children: [
					{
						_id: "id_1",
						name: "test link 1",
					},
					{
						_id: "id_2",
						name: "test link 2",
					},
					{
						_id: "id_3",
						node_type: "link",
						url: "/",
						display_name: "Link Text",
					},
					{
						_id: "id_4",
						node_type: "link",
						url: "http://arcpublishing.com",
						display_name: "Link Text",
					},
				],
			})),
		}));
		const { default: LinksBar } = require("./default");
		const wrapper = shallow(<LinksBar blockClassName="b-header-nav-chain" ariaLabel="Links" />);

		expect(wrapper.find(".b-header-nav-chain__links-list").props()).toHaveProperty(
			"aria-label",
			"Links"
		);
	});
});
