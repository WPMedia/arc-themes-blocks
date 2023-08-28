import React from "react";
import { render, screen } from "@testing-library/react";
import SocialSignOn from "./index";
import useIdentity from "../identity";

jest.mock("../identity");

describe("Identity Social Login Component", () => {
	it("renders nothing if config settings are false", () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			isLoggedIn: () => false,
			Identity: {
				configOptions: {
					googleClientId: false,
					facebookAppId: false,
				},
				initFacebookLogin: () => {},
				initializeFacebook: () => {},
			},
		}));

		render(<SocialSignOn onError={() => null} redirectURL="#" />);
		// don't render any facebook stuff, only show wrapper
		expect(screen.getByRole("generic")).not.toBeNull();
	});

	it("renders only Google button", () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			isLoggedIn: () => false,
			Identity: {
				configOptions: {
					googleClientId: true,
					facebookAppId: false,
				},
				initFacebookLogin: () => {},
				initializeFacebook: () => {},
			},
		}));

		const { container } = render(<SocialSignOn onError={() => null} redirectURL="#" />);
		// Yes this is testing implementation, but it is all we have since the
		// third party buttons will only actually render client side in a browser.
		expect(container.querySelector("#arc-siwg-button")).not.toBeNull();
		expect(container.querySelector(".fb-login-button")).toBeNull();
	});

	it("renders only Facebook button", () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			isLoggedIn: () => false,
			Identity: {
				configOptions: {
					googleClientId: false,
					facebookAppId: true,
				},
				initFacebookLogin: () => {},
				initializeFacebook: () => {},
			},
		}));

		const { container } = render(<SocialSignOn onError={() => null} redirectURL="#" />);

		expect(container.querySelector("#arc-siwg-button")).toBeNull();
		expect(container.querySelector(".fb-login-button")).not.toBeNull();
	});

	it("renders", () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			isLoggedIn: () => true,
			Identity: {
				isLoggedIn: jest.fn(async () => false),
				getConfig: jest.fn(async () =>
					Promise.resolve({
						signinRecaptcha: false,
						recaptchaSiteKey: "6LdXKVQcAAAAAO2tv3GdUbSK-1vcgujX6cP0IgF_",
					})
				),
				initFacebookLogin: () => {},
				initializeFacebook: () => {},
				configOptions: {
					googleClientId: true,
					facebookAppId: true,
				},
			},
		}));

		const { container } = render(<SocialSignOn onError={() => null} redirectURL="#" />);

		expect(container.querySelector("#arc-siwg-button")).not.toBeNull();
		expect(container.querySelector(".fb-login-button")).not.toBeNull();
	});
});
