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

jest.mock("@wpmedia/engine-theme-sdk", () => ({
	formatURL: jest.fn((input) => input.toString()),
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
		const wrapper = shallow(<LinksBar customFields={{ navigationConfig: "links" }} />);

		expect(wrapper.children().at(0).type()).toBe("nav");
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
			`"<nav class=\\"b-links-bar\\" aria-label=\\"More Links\\"><span class=\\"b-links-bar__menu\\"><a class=\\"c-link b-links-bar__menu-link\\" href=\\"id_1\\">test link 1</a></span></nav><hr/>"`
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
			`"<nav class=\\"b-links-bar\\" aria-label=\\"More Links\\"><span class=\\"b-links-bar__menu\\"><a class=\\"c-link b-links-bar__menu-link\\" href=\\"id_1\\">test link 1</a>  •  </span><span class=\\"b-links-bar__menu\\"><a class=\\"c-link b-links-bar__menu-link\\" href=\\"id_2\\">test link 2</a>  •  </span><span class=\\"b-links-bar__menu\\"><a class=\\"c-link b-links-bar__menu-link\\" href=\\"/\\" rel=\\"noreferrer\\" target=\\"_blank\\">Link Text<span class=\\"visually-hidden\\">Opens in new window</span></a></span></nav><hr/>"`
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
		expect(wrapper.find(".b-links-bar__menu")).toHaveLength(4);
		expect(wrapper.find(".b-links-bar a:not([target])")).toHaveLength(2);
		expect(wrapper.find('.b-links-bar a[target="_blank"]')).toHaveLength(2);
	});

	it("should have no menu item if no content is returned", () => {
		jest.mock("fusion:content", () => ({
			useContent: jest.fn(() => ({
				children: [],
			})),
		}));
		const { default: LinksBar } = require("./default");
		const wrapper = shallow(<LinksBar customFields={{ navigationConfig: "links" }} />);

		expect(wrapper.find("nav > span")).toHaveLength(0);
	});

	it("should render the block with the default aria-label", () => {
		jest.mock("fusion:content", () => ({
			useContent: jest.fn(() => ({
				children: [],
			})),
		}));
		const { default: LinksBar } = require("./default");
		const wrapper = shallow(<LinksBar customFields={{ navigationConfig: "links" }} />);

		expect(wrapper.find("nav").props()).toHaveProperty("aria-label", "More Links");
	});

	it("should render the block with the default aria-label if custom field is empty", () => {
		jest.mock("fusion:content", () => ({
			useContent: jest.fn(() => ({
				children: [],
			})),
		}));
		const { default: LinksBar } = require("./default");
		const wrapper = shallow(
			<LinksBar customFields={{ navigationConfig: "links", ariaLabel: "" }} />
		);

		expect(wrapper.find("nav").props()).toHaveProperty("aria-label", "More Links");
	});

	it("should render the block with the custom aria-label", () => {
		jest.mock("fusion:content", () => ({
			useContent: jest.fn(() => ({
				children: [],
			})),
		}));
		const { default: LinksBar } = require("./default");
		const wrapper = shallow(
			<LinksBar customFields={{ navigationConfig: "links", ariaLabel: "Links" }} />
		);

		expect(wrapper.find("nav").props()).toHaveProperty("aria-label", "Links");
	});
});
