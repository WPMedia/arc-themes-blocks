import React from "react";
import { mount, shallow } from "enzyme";

import SocialEditableSection from "./SocialEditableSection";
import useSocialSignIn from "../../../components/SocialSignOn/utils/useSocialSignIn";

jest.mock("../../../components/SocialSignOn/utils/useSocialSignIn");

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		locale: "en",
	}))
);

jest.mock("fusion:intl", () => ({
	__esModule: true,
	default: jest.fn(() => ({ t: jest.fn((phrase) => phrase) })),
}));

describe("SocialEditableSection", () => {
	it("should render facebook and google with google and facebook app id", () => {
		useSocialSignIn.mockImplementation(() => ({
			facebookAppId: "123",
			googleClientId: "456",
		}));

		const wrapper = shallow(<SocialEditableSection />);
		expect(wrapper.find("FacebookSignIn")).toHaveLength(1);
		expect(wrapper.find("GoogleSignIn")).toHaveLength(1);
	});
	it("should not render facebook and google without id", () => {
		useSocialSignIn.mockImplementation(() => ({
			facebookAppId: "",
			googleClientId: "",
		}));

		const wrapper = shallow(<SocialEditableSection />);
		expect(wrapper.find("FacebookSignIn")).toHaveLength(0);
		expect(wrapper.find("GoogleSignIn")).toHaveLength(0);
	});
	it("should render facebook only with google no id", () => {
		useSocialSignIn.mockImplementation(() => ({
			facebookAppId: "123",
			googleClientId: "",
		}));

		const wrapper = mount(<SocialEditableSection />);
		expect(wrapper.find("FacebookSignIn")).toHaveLength(1);
		expect(wrapper.find("GoogleSignIn")).toHaveLength(0);
	});

	it("should show text based on hasGoogle and hasFacebook props", () => {
		useSocialSignIn.mockImplementation(() => ({
			isFacebookInitialized: true,
			isGoogleInitialized: true,
			facebookAppId: "123",
			googleClientId: "456",
		}));

		const wrapper = mount(<SocialEditableSection hasFacebook hasGoogle hasPasswordAccount />);
		expect(wrapper.find("span").at(0).text()).toEqual("identity-block.connect-account ");
	});
});
