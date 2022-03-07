import React from "react";
import { mount } from "enzyme";
import Button from ".";
import { BUTTON_SIZES, BUTTON_TYPES, BUTTON_STYLES } from "../..";

it("renders medium button by default", () => {
	const wrapper = mount(<Button />);

	expect(wrapper.find("button").prop("className")).toContain("xpmedia-button--medium");
});

it("renders large button if buttonSize is large", () => {
	const wrapper = mount(<Button buttonSize={BUTTON_SIZES.LARGE} />);

	expect(wrapper.find("button").prop("className")).toContain("xpmedia-button--large");
});

it("renders small button if buttonSize is small", () => {
	const wrapper = mount(<Button buttonSize={BUTTON_SIZES.SMALL} />);

	expect(wrapper.find("button").prop("className")).toContain("xpmedia-button--small");
});

it("renders button as primary reverse", () => {
	const wrapper = mount(<Button buttonStyle={BUTTON_STYLES.PRIMARY_REVERSE} />);

	expect(wrapper.find("button").prop("className")).toContain(
		"xpmedia-button xpmedia-button--medium"
	);
});

it("renders button as secondary", () => {
	const wrapper = mount(<Button buttonStyle={BUTTON_STYLES.SECONDARY} />);

	expect(wrapper.find("button").prop("className")).toContain(
		"xpmedia-button xpmedia-button--medium"
	);
});

it("renders button as secondary reverse", () => {
	const wrapper = mount(<Button buttonStyle={BUTTON_STYLES.SECONDARY_REVERSE} />);

	expect(wrapper.find("button").prop("className")).toContain(
		"xpmedia-button xpmedia-button--medium"
	);
});

it("renders button text using HTML", () => {
	const wrapper = mount(<Button isHTMLText text="<span>Button Text</span>" />);

	expect(wrapper.find("button span").text()).toBe("Button Text");
});

it("renders a label and a found user icon for buttonType", () => {
	const wrapper = mount(
		<Button buttonType={BUTTON_TYPES.LABEL_AND_ICON} text="Hello button and icon" iconType="user" />
	);

	expect(wrapper.find(".xpmedia-button--left-icon-container").exists()).toBe(true);
	expect(wrapper.find("svg")).toHaveLength(1);
});

it("renders a label and a found user icon for buttonType", () => {
	const wrapper = mount(
		<Button
			buttonType={BUTTON_TYPES.LABEL_AND_ICON}
			text="Hello button and icon"
			iconType="something else"
		/>
	);

	expect(wrapper.find(".xpmedia-button--left-icon-container").exists()).toBe(true);
	expect(wrapper.find("svg")).toHaveLength(0);
	expect(wrapper.text()).toEqual("Hello button and icon");
});

it("renders only icon for buttonType", () => {
	const wrapper = mount(
		<Button
			buttonType={BUTTON_TYPES.ICON_ONLY}
			iconType="user"
			text="Do not show this text"
			ariaLabel="User icon here"
		/>
	);

	expect(wrapper.find("svg")).toHaveLength(1);
	expect(wrapper.text()).toEqual("");
});

it("renders with classname full width", () => {
	const wrapper = mount(<Button fullWidth />);

	expect(wrapper.find("button").prop("className")).toContain("xpmedia-button--full-width");
});

it("shows text if no aria label as aria label", () => {
	const wrapper = mount(
		<Button text="Show this as aria label" buttonType={BUTTON_TYPES.ICON_ONLY} />
	);

	expect(wrapper.find("button").prop("aria-label")).toEqual("Show this as aria label");
});

it("renders label and two icons", () => {
	const wrapper = mount(
		<Button
			buttonType={BUTTON_TYPES.LABEL_AND_TWO_ICONS}
			text="Hello button and two icons"
			iconType="user"
			secondaryIconType="user"
		/>
	);

	expect(wrapper.find(".xpmedia-button--left-icon-container").length).toBe(1);
	expect(wrapper.find(".xpmedia-button--right-icon-container").length).toBe(1);
	expect(wrapper.find("svg")).toHaveLength(2);
});

it("renders label and right icon", () => {
	const wrapper = mount(
		<Button
			buttonType={BUTTON_TYPES.LABEL_AND_RIGHT_ICON}
			buttonStyle={BUTTON_STYLES.PRIMARY}
			text="Hello button and right icon"
			iconType="user"
		/>
	);

	expect(wrapper.find(".xpmedia-button--right-icon-container").length).toBe(1);
	expect(wrapper.find(".xpmedia-button--left-icon-container").length).toBe(0);
	expect(wrapper.find("svg")).toHaveLength(1);
});

it("defaults to button type", () => {
	const wrapper = mount(<Button />);

	expect(wrapper.find("button").prop("type")).toEqual("button");
});

it("Uses specified type for button", () => {
	const wrapper = mount(<Button type="submit" />);

	expect(wrapper.find("button").prop("type")).toEqual("submit");
});

it("passes in additional classes", () => {
	const wrapper = mount(<Button additionalClassNames="my-custom-class" />);
	expect(wrapper.find("button").prop("className")).toContain("my-custom-class");
});
