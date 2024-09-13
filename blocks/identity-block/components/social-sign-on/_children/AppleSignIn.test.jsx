import React from "react";
import { render, screen } from "@testing-library/react";
import { useFusionContext } from "fusion:context";

import AppleSignIn from "./AppleSignIn";

const SITE_PROPS_MOCK = {
	breakpoints: {
		small: 0,
		medium: 768,
		large: 992,
	},
	websiteAdPath: "news",
	dfpId: 701,
};

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	Icon: () => <div data-testid="Apple-icon" />,
}));

const mockInitAppleSignOn = jest.fn();
const mockInitiateOIDCMock = jest.fn();

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	Icon: () => <div data-testid="Apple-icon" />,
	useIdentity: () => {
		const Identity = {
			initiateOIDC: mockInitiateOIDCMock,
			initAppleSignOn: mockInitAppleSignOn,
		};
		return { Identity };
	},
}));

describe("Identity Social Login Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		useFusionContext.mockReturnValue({
			isAdmin: true,
			siteProperties: SITE_PROPS_MOCK,
		});
	});

	it("renders Apple button for signIn", () => {
		render(<AppleSignIn socialSignOnIn="Login" />);
		expect(screen.getByText("identity-block.social-signOn-apple-login")).not.toBeNull();
	});

	it("renders Apple button for signUp", () => {
		render(<AppleSignIn socialSignOnIn="SignUp" />);
		expect(screen.getByText("identity-block.social-signOn-apple-signUp")).not.toBeNull();
	});

	it("triggers Identity.initiateOIDC when using Apple OIDC is used", () => {
		render(<AppleSignIn socialSignOnIn="Login" oidcClients={[{ clientId: 'appleoidc', protocol: 'Apple' }]} appleClientId='appleoidc' />);
		screen.getByText("identity-block.social-signOn-apple-login").click();
		expect(mockInitiateOIDCMock).toHaveBeenCalled();
	});

	it("triggers Identity.initAppleSignOn when using Apple v1 sign on is used", () => {
		render(<AppleSignIn socialSignOnIn="Login" />);
		screen.getByText("identity-block.social-signOn-apple-login").click();
		expect(mockInitAppleSignOn).toHaveBeenCalled();
	});

	it("triggers Identity.initAppleSignOn when clientId is not available in OIDC client list", () => {
		render(<AppleSignIn socialSignOnIn="Login" oidcClients={[{ clientId: 'appleoidc', protocol: 'Apple' }]} appleClientId='noappleoidc' />);
		screen.getByText("identity-block.social-signOn-apple-login").click();
		expect(mockInitAppleSignOn).toHaveBeenCalled();
	});

	it("triggers Identity.initAppleSignOn when clientId is not a protocol: 'Apple'", () => {
		render(<AppleSignIn socialSignOnIn="Login" oidcClients={[{ clientId: 'appleoidc', protocol: 'Default' }]} appleClientId='appleoidc' />);
		screen.getByText("identity-block.social-signOn-apple-login").click();
		expect(mockInitAppleSignOn).toHaveBeenCalled();
	});
});
