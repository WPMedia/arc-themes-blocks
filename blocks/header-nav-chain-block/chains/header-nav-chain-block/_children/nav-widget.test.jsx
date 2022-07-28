import React from "react";
import { shallow, mount } from "enzyme";
import NavWidget from "./nav-widget";
import SearchBox from "./search-box";
import QuerylySearch from "./queryly-search";
import { WIDGET_CONFIG, PLACEMENT_AREAS } from "../nav-helper";

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		navColor: "light",
		locale: "somelocale",
	}))
);
jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		arcSite: "dagen",
	})),
}));

describe("<NavWidget/>", () => {
	it('renders null when type "none"', () => {
		const wrapper = mount(<NavWidget type="none" />);
		expect(wrapper).toBeDefined();
		expect(wrapper.isEmptyRender()).toBe(true);
	});

	it('renders nav widget - arc search w/ "nav-bar" placement', () => {
		const placement = PLACEMENT_AREAS.NAV_BAR;
		const cfg = WIDGET_CONFIG[placement];
		const wrapper = shallow(<NavWidget type="search" placement={placement} />);
		expect(wrapper).toHaveLength(1);
		const searchWidget = wrapper.find(SearchBox);
		expect(searchWidget).toHaveLength(1);
		expect(searchWidget.prop("iconSize")).toEqual(cfg?.iconSize);
		expect(searchWidget.prop("placeholderText")).toEqual("header-nav-chain-block.search-text");
		expect(searchWidget.prop("alwaysOpen")).toEqual(cfg.expandSearch);
	});

	it('renders nav widget - arc search w/ "section-menu" placement', () => {
		const placement = PLACEMENT_AREAS.SECTION_MENU;
		const cfg = WIDGET_CONFIG[placement];
		const wrapper = shallow(<NavWidget type="search" placement={placement} />);
		expect(wrapper).toHaveLength(1);
		const searchWidget = wrapper.find(SearchBox);
		expect(searchWidget).toHaveLength(1);
		expect(searchWidget.prop("iconSize")).toEqual(cfg?.iconSize);
		expect(searchWidget.prop("placeholderText")).toEqual("header-nav-chain-block.search-text");
		expect(searchWidget.prop("alwaysOpen")).toEqual(cfg.expandSearch);
	});

	it('renders nav widget - queryly search w/ "nav-bar" placement', () => {
		const wrapper = shallow(<NavWidget type="queryly" placement={PLACEMENT_AREAS.NAV_BAR} />);
		expect(wrapper).toHaveLength(1);
		const querylyWidget = wrapper.find(QuerylySearch);
		expect(querylyWidget).toHaveLength(1);
	});

	it('renders nav widget - queryly search w/ "section-menu" placement', () => {
		const wrapper = shallow(<NavWidget type="queryly" placement={PLACEMENT_AREAS.SECTION_MENU} />);
		expect(wrapper).toHaveLength(1);
		const querylyWidget = wrapper.find(QuerylySearch);
		expect(querylyWidget).toHaveLength(1);
	});

	it("renders nav widget - section menu", () => {
		const menuButtonClick = jest.fn(() => {});
		const wrapper = mount(<NavWidget type="menu" menuButtonClickAction={menuButtonClick} />);

		expect(wrapper).toHaveLength(1);
		const menuWidget = wrapper.find("button");
		expect(menuWidget).toHaveLength(1);
		expect(menuWidget.prop("onClick")).toEqual(menuButtonClick);
	});

	it("renders nav widget - section menu with svg and container text, with desktop breakpoint", () => {
		const menuButtonClick = jest.fn(() => {});
		const wrapper = mount(
			<NavWidget type="menu" menuButtonClickAction={menuButtonClick} breakpoint="desktop" />
		);

		const menuWidget = wrapper.find("button");
		expect(menuWidget.text()).toBe("header-nav-chain-block.sections-button");
		expect(menuWidget.find("Icon").length).toBe(1);
		expect(menuWidget.find("svg")).toHaveLength(1);
	});

	it("renders nav widget - custom with child component", () => {
		const ChildComponent = () => <div>something</div>;
		const wrapper = mount(
			<NavWidget
				type="custom"
				position={1}
				// eslint-disable-next-line react/no-children-prop
				children={[<ChildComponent key="child-test" />]}
			/>
		);
		expect(wrapper).toBeDefined();
		expect(wrapper.isEmptyRender()).toBe(false);
		expect(wrapper.contains(<ChildComponent />)).toBe(true);
	});

	it("renders nav widget - custom without child component", () => {
		const wrapper = mount(<NavWidget type="custom" position={1} />);
		expect(wrapper).toBeDefined();
		expect(wrapper.isEmptyRender()).toBe(true);
		expect(wrapper.children()).toHaveLength(0);
	});
});
