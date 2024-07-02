import React from "react";
import { render, screen } from "@testing-library/react";

import SocialEditableSection from "./SocialEditableSection";
import useSocialSignIn from "../../../components/social-sign-on/utils/useSocialSignIn";

jest.mock("../../../components/social-sign-on/utils/useSocialSignIn");

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		locale: "en",
	})),
);

jest.mock("fusion:intl", () => ({
	__esModule: true,
	default: jest.fn((locale) => ({
		t: jest.fn((phrase) => require("../../../intl.json")[phrase][locale]),
	})),
}));

describe("SocialEditableSection", () => {
	it("should render facebook and google with google and facebook app id", () => {
		const setUpdateIdentitiesMock = jest.fn();
		useSocialSignIn.mockImplementation(() => ({
			facebookAppId: "123",
			googleClientId: "456",
		}));

		render(<SocialEditableSection  setUpdateIdentities={setUpdateIdentitiesMock}/>);
		expect(screen.getAllByText("Connect")).toHaveLength(2);
	});
	it("should not render facebook and google without id", () => {
		const setUpdateIdentitiesMock = jest.fn();
		useSocialSignIn.mockImplementation(() => ({
			facebookAppId: "",
			googleClientId: "",
		}));

		render(<SocialEditableSection setUpdateIdentities={setUpdateIdentitiesMock}/>);
		expect(screen.queryAllByText("Connect %{platform}")).toHaveLength(0);
	});
	it("should render facebook only with google no id", () => {
		const setUpdateIdentitiesMock = jest.fn();
		useSocialSignIn.mockImplementation(() => ({
			facebookAppId: "123",
			googleClientId: "",
		}));

		render(<SocialEditableSection setUpdateIdentities={setUpdateIdentitiesMock}/>);
		expect(screen.getAllByText("Connect")).toHaveLength(1);
	});

	it("should show text based on hasGoogle and hasFacebook props", () => {
		const setUpdateIdentitiesMock = jest.fn();
		useSocialSignIn.mockImplementation(() => ({
			isFacebookInitialized: true,
			isGoogleInitialized: true,
			facebookAppId: "123",
			googleClientId: "456",
			setUpdateIdentities: setUpdateIdentitiesMock,
		}));

		render(<SocialEditableSection hasFacebook hasGoogle hasPasswordAccount setUpdateIdentities={setUpdateIdentitiesMock} />);
		expect(screen.getAllByText(/Connected/i)).toHaveLength(2);
	});
});
