import React from "react";
import { mount } from "enzyme";
import MenuWidgets from "./menu-widgets";

jest.mock("fusion:properties", () => jest.fn(() => ({})));

describe("With basic selections", () => {
	const customFieldSelections = {
		leftComponentDesktop1: "search",
		leftComponentDesktop2: "menu",
		leftComponentMobile1: "menu",
		menuComponentMobile1: "search",
	};
	it("should render a search widget in the sections menu on mobile", () => {
		const wrapper = mount(
			<MenuWidgets customFields={customFieldSelections} menuButtonClickAction={() => {}} />
		);

		const container = wrapper.find(".nav-menu");
		expect(container.find(".nav-components--mobile").find(".nav-search")).toHaveLength(1);
	});

	it("should render nothing in the sections menu on desktop", () => {
		const wrapper = mount(
			<MenuWidgets customFields={customFieldSelections} menuButtonClickAction={() => {}} />
		);
		const container = wrapper.find(".nav-menu");
		const widgetList = container.find(".nav-components--desktop > WidgetList");
		expect(widgetList).toHaveLength(1);
		expect(widgetList.children()).toHaveLength(0);
	});
});
