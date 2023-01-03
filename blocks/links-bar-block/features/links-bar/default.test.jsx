/* eslint-disable no-irregular-whitespace */
import React from "react";
import { shallow, mount } from "enzyme";

jest.mock("fusion:themes", () => jest.fn(() => ({})));

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		fallbackImage: "placeholder.jpg",
	}))
);

jest.mock("fusion:intl", () => ({
	__esModule: true,
	default: jest.fn((locale) => ({
		t: jest.fn((phrase) => require("../../intl.json")[phrase][locale]),
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

	it("should be a nav element", () => {
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
		const wrapper = mount(<LinksBar customFields={{ navigationConfig: "links" }} />);

		expect(wrapper.find("nav")).toBeTruthy();
	});

	it("should not have separator when only one link", () => {
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
		const wrapper = shallow(<LinksBar customFields={{ navigationConfig: "links" }} />);

		expect(wrapper.html()).toMatchInlineSnapshot(
			`"<nav aria-label=\\"More Links\\" class=\\"c-stack b-links-bar\\" data-style-direction=\\"row\\" data-style-justification=\\"center\\" data-style-alignment=\\"unset\\" data-style-inline=\\"false\\" data-style-wrap=\\"wrap\\"><a class=\\"c-link\\" href=\\"id_1\\">test link 1</a></nav><hr class=\\"c-divider\\"/>"`
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
						node_type: "link",
						url: "/",
						display_name: "Link Text",
					},
				],
			})),
		}));
		const wrapper = shallow(<LinksBar customFields={{ navigationConfig: "links" }} />);

		expect(wrapper.html()).toMatchInlineSnapshot(
			`"<nav aria-label=\\"More Links\\" class=\\"c-stack b-links-bar\\" data-style-direction=\\"row\\" data-style-justification=\\"center\\" data-style-alignment=\\"unset\\" data-style-inline=\\"false\\" data-style-wrap=\\"wrap\\"><a class=\\"c-link\\" href=\\"id_1\\">test link 1</a><span class=\\"c-separator\\"></span><a class=\\"c-link\\" href=\\"id_2\\">test link 2</a><span class=\\"c-separator\\"></span><a class=\\"c-link\\" href=\\"/\\">Link Text</a></nav><hr class=\\"c-divider\\"/>"`
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
		const wrapper = mount(<LinksBar customFields={{ navigationConfig: "links" }} />);
		expect(wrapper.find(".b-links-bar a:not([target])")).toHaveLength(3);
		expect(wrapper.find('.b-links-bar a[target="_blank"]')).toHaveLength(1);
	});

	it("should have no menu item if no content is returned", () => {
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
		const { default: LinksBar } = require("./default");
		const wrapper = shallow(<LinksBar customFields={{ navigationConfig: "links" }} />);

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
				],
			})),
		}));
		const { default: LinksBar } = require("./default");
		const wrapper = shallow(<LinksBar customFields={{ navigationConfig: "links" }} />);

		expect(wrapper.find("Stack").props()).toHaveProperty("aria-label", "More Links");
	});

	it("should render the block with the default aria-label if custom field is empty", () => {
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
		const { default: LinksBar } = require("./default");
		const wrapper = shallow(
			<LinksBar customFields={{ navigationConfig: "links", ariaLabel: "" }} />
		);

		expect(wrapper.find("Stack").props()).toHaveProperty("aria-label", "More Links");
	});

	it("should render the block with the custom aria-label", () => {
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
		const { default: LinksBar } = require("./default");
		const wrapper = shallow(
			<LinksBar customFields={{ navigationConfig: "links", ariaLabel: "Links" }} />
		);

		expect(wrapper.find("Stack").props()).toHaveProperty("aria-label", "Links");
	});
});
