import React from "react";
import { render, screen } from "@testing-library/react";

import SocialEditableSection from "./SocialEditableSection";
import useSocialSignIn from "../../../components/social-sign-on/utils/useSocialSignIn";

jest.mock("../../../components/social-sign-on/utils/useSocialSignIn");

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		locale: "en",
	}))
);

jest.mock("fusion:intl", () => ({
	__esModule: true,
	default: jest.fn((locale) => ({
		t: jest.fn((phrase) => require("../../../intl.json")[phrase][locale]),
	})),
}));

describe("SocialEditableSection", () => {
	it("should render facebook and google with google and facebook app id", () => {
		useSocialSignIn.mockImplementation(() => ({
			facebookAppId: "123",
			googleClientId: "456",
		}));

		render(<SocialEditableSection />);
		expect(screen.getAllByText("Connect %{platform}")).toHaveLength(2);
	});
	it("should not render facebook and google without id", () => {
		useSocialSignIn.mockImplementation(() => ({
			facebookAppId: "",
			googleClientId: "",
		}));

		render(<SocialEditableSection />);
		expect(screen.queryAllByText("Connect %{platform}")).toHaveLength(0);
	});
	it("should render facebook only with google no id", () => {
		useSocialSignIn.mockImplementation(() => ({
			facebookAppId: "123",
			googleClientId: "",
		}));

		render(<SocialEditableSection />);
		expect(screen.getAllByText("Connect %{platform}")).toHaveLength(1);
	});

	it("should show text based on hasGoogle and hasFacebook props", () => {
		useSocialSignIn.mockImplementation(() => ({
			isFacebookInitialized: true,
			isGoogleInitialized: true,
			facebookAppId: "123",
			googleClientId: "456",
		}));

		render(<SocialEditableSection hasFacebook hasGoogle hasPasswordAccount />);
		expect(screen.getAllByText(/Connected/i)).toHaveLength(2);
	});
});
