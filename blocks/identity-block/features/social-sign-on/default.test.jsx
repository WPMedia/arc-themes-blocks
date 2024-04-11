import React from "react";
import { render, screen } from "@testing-library/react";
import { useIdentity } from "@wpmedia/arc-themes-components";
import SocialSignOn from "../../components/social-sign-on";
import SocialSignOnBlock from "./default";

jest.mock("fusion:properties", () => jest.fn(() => ({})));

jest.mock("../../components/social-sign-on");
jest.mock("@wpmedia/arc-themes-components");

const defaultCustomFields = {
	redirectURL: "",
	redirectToPreviousPage: true,
};

const mockIdentity = {
	apiOrigin: "http://origin/",
	getConfig: jest.fn(() => ({})),
};

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	useIdentity: jest.fn(() => ({
		isInitialized: true,
		Identity: {
			...mockIdentity,
		},
	})),
}));

describe("Subscriptions Social Login Feature", () => {
	SocialSignOn.mockImplementation(() => <div />);

	it("renders nothing if identity not initialized", () => {
		useIdentity.mockImplementation(() => ({ isInitialized: false }));

		render(<SocialSignOnBlock customFields={defaultCustomFields} />);
		expect(screen.queryByTestId("social-sign-on-container")).toBeNull();
	});
	it("renders", async () => {
		useIdentity.mockImplementation(() => ({ isInitialized: true }));

		render(<SocialSignOnBlock customFields={defaultCustomFields} />);
		const element = await screen.findByTestId("social-sign-on-container");
		expect(element).not.toBeNull();
	});
	it("shows an error", () => {
		SocialSignOn.mockImplementation(({ onError }) => {
			onError();
			return <div />;
		});
		render(<SocialSignOnBlock customFields={defaultCustomFields} />);
		expect(screen.getByText("identity-block.login-form-error"));
	});
});
