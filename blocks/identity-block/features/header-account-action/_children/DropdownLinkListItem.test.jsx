import React from "react";
import { mount } from "enzyme";

import DropdownLinkListItem from "./DropDownLinkListItem";

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		arcSite: "dagen",
	})),
}));

it("renders list item text and href", () => {
	const wrapper = mount(<DropdownLinkListItem href="http://www.google.com" text="Google" />);
	expect(wrapper.find("a").text()).toEqual("Google");
	expect(wrapper.find("a").prop("href")).toEqual("http://www.google.com");
});
