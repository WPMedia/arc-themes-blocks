import React from "react";
import { render, screen } from "@testing-library/react";
import SocialSignOn from "../../components/social-sign-on";
import { useIdentity } from "@wpmedia/arc-themes-components";
import SocialSignOnBlock from "./default";

jest.mock("fusion:properties", () => jest.fn(() => ({})));

jest.mock("../../components/social-sign-on");
jest.mock("@wpmedia/arc-themes-components");

const defaultCustomFields = {
	redirectURL: "",
	redirectToPreviousPage: true,
};

describe("Subscriptions Social Login Feature", () => {
	SocialSignOn.mockImplementation(() => <div />);

	it("renders nothing if identity not initialized", () => {
		useIdentity.mockImplementation(() => ({ isInitialized: false }));

		render(<SocialSignOnBlock customFields={defaultCustomFields} />);
		expect(screen.queryByTestId("social-sign-on-container")).toBeNull();
	});
	it("renders", () => {
		useIdentity.mockImplementation(() => ({ isInitialized: true }));

		render(<SocialSignOnBlock customFields={defaultCustomFields} />);
		expect(screen.queryByTestId("social-sign-on-container")).not.toBeNull();
	});
	it("shows an error", () => {
		SocialSignOn.mockImplementation(({ onError }) => {
			onError();
			return <div />;
		});
		render(<SocialSignOnBlock customFields={defaultCustomFields} />);
		expect(screen.getByText("identity-block.login-form-error")).not.toBeNull();
	});
});
