import React from "react";
import { mount, shallow } from "enzyme";
import Signup from "./default";
import useIdentity from "../../components/Identity";

jest.mock("fusion:properties", () => jest.fn(() => ({})));

jest.mock("../../components/Identity");

describe("With unintialized identity", () => {
	it("renders nothing if identity not initialized", () => {
		useIdentity.mockImplementation(() => ({ isInitialized: false }));

		const wrapper = shallow(<Signup customFields={{ redirectURL: "" }} />);
		expect(wrapper.html()).toBe(null);
	});
});

describe("With initialized identity", () => {
	it("renders something", () => {
		useIdentity.mockImplementation(() => ({ isInitialized: true }));

		const wrapper = mount(
			<Signup customFields={{ redirectURL: "/sign-up", redirectToPreviousPage: true }} />
		);

		expect(wrapper.find("input.xpmedia-form-field-input").at(0).prop("autoComplete")).toBe("off");
		expect(wrapper.find("input.xpmedia-form-field-input").at(1).prop("autoComplete")).toBe(
			"new-password"
		);
		expect(wrapper.find("input.xpmedia-form-field-input").at(2).prop("autoComplete")).toBe(
			"new-password"
		);

		expect(wrapper.html()).toBeTruthy();
	});
});
