import React from "react";
import { mount } from "enzyme";
import { useFusionContext } from "fusion:context";

import HeaderAccountAction from "./default";
import useIdentity from "../../components/Identity";

jest.mock("../../components/Identity", () => ({
	__esModule: true,
	default: jest.fn(() => ({ isInitialized: true, isLoggedIn: true })),
}));

jest.mock("fusion:properties", () => jest.fn(() => ({})));

describe("Subscriptions HeaderAccountAction", () => {
	it("renders", () => {
		useFusionContext.mockReturnValueOnce({
			arcSite: "arcxp",
		});
		const wrapper = mount(
			<HeaderAccountAction customFields={{ loginURL: "", createAccountURL: "" }} />
		);

		expect(wrapper.html()).not.toBe(null);
	});

	it("should not render if not initialized", () => {
		useIdentity.mockReturnValueOnce(() => ({
			isInitialized: false,
			isLoggedIn: true,
		}));
		useFusionContext.mockReturnValueOnce({
			arcSite: "arcxp",
		});
		const wrapper = mount(
			<HeaderAccountAction customFields={{ loginURL: "", createAccountURL: "" }} />
		);

		expect(wrapper.html()).toBe(null);
	});

	it("shows sign in url and create account url", () => {
		useFusionContext.mockReturnValueOnce({
			arcSite: "arcxp",
		});

		const wrapper = mount(
			<HeaderAccountAction
				customFields={{
					loginURL: "https://www.google.com",
					createAccountURL: "https://www.google.com",
				}}
			/>
		);

		expect(wrapper.html()).not.toBe(null);
		expect(wrapper.find("div.xpmedia-subs-header--desktop-header")).toHaveLength(1);
	});

	it("toggles the submenu when clicking on the mobile header button", () => {
		useFusionContext.mockReturnValueOnce({
			arcSite: "arcxp",
		});

		const wrapper = mount(
			<HeaderAccountAction
				customFields={{
					loginURL: "https://www.google.com",
					createAccountURL: "https://www.google.com",
				}}
			/>
		);

		wrapper.find(".xpmedia-subs-header--mobile-header button").simulate("click");
		expect(wrapper.find(".xpmedia-subs-header-dropdown--open").length).toBe(1);

		wrapper.find(".xpmedia-subs-header--mobile-header button").simulate("click");
		expect(wrapper.find(".xpmedia-subs-header-dropdown--open").length).toBe(0);
	});
});
