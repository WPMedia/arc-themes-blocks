import React from "react";
import { render, screen } from "@testing-library/react";
import SocialSignOn from "./index";
import useIdentity from "../identity";
import { GoogleSignInProvider } from "./utils/googleContext";

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
		render(
			<GoogleSignInProvider>
				<SocialSignOn />
			</GoogleSignInProvider>
		);
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

		const { container } = render(
			<GoogleSignInProvider>
				<SocialSignOn onError={() => null} redirectURL="#" />
			</GoogleSignInProvider>
		);

		expect(container.querySelector("#google-sign-in-button")).not.toBeNull();
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

		const { container } = render(
			<GoogleSignInProvider>
				<SocialSignOn onError={() => null} redirectURL="#" />
			</GoogleSignInProvider>
		);

		expect(container.querySelector("#google-sign-in-button")).toBeNull();
		expect(container.querySelector(".fb-login-button")).not.toBeNull();
	});

	it("renders", () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			isLoggedIn: () => true,
			Identity: {
				configOptions: {
					googleClientId: true,
					facebookAppId: true,
				},
				getConfig: jest.fn(() =>
					Promise.resolve({
						signinRecaptcha: false,
						recaptchaSiteKey: "6LdXKVQcAAAAAO2tv3GdUbSK-1vcgujX6cP0IgF_",
					})
				),
				initFacebookLogin: () => {},
				initializeFacebook: () => {},
				isLoggedIn: jest.fn(() => false),
			},
		}));

		const { container } = render(
			<GoogleSignInProvider>
				<SocialSignOn onError={() => null} redirectURL="#" />
			</GoogleSignInProvider>
		);

		expect(container.querySelector("#google-sign-in-button")).not.toBeNull();
		expect(container.querySelector(".fb-login-button")).not.toBeNull();
	});

	it("calls getConfig if the options are missing", () => {
		const getConfigMock = jest.fn(() => Promise.resolve());
		useIdentity.mockImplementation(() => ({
			Identity: {
				getConfig: getConfigMock,
				initFacebookLogin: () => {},
				initializeFacebook: () => {},
				isLoggedIn: jest.fn(() => false),
			},
			isInitialized: true,
			isLoggedIn: () => true,
		}));

		render(
			<GoogleSignInProvider>
				<SocialSignOn onError={() => null} redirectURL="#" />
			</GoogleSignInProvider>
		);

		expect(getConfigMock).toHaveBeenCalled();
	});

	it("calls facebookSignOn", () => {
		const facebookSignOnMock = jest.fn(() => Promise.resolve());
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			isLoggedIn: () => true,
			Identity: {
				configOptions: {
					googleClientId: true,
					facebookAppId: true,
				},
				facebookSignOn: facebookSignOnMock,
				getConfig: () => {},
				initFacebookLogin: () => {},
				initializeFacebook: () => {},
				isLoggedIn: jest.fn(() => false),
			},
		}));

		render(
			<GoogleSignInProvider>
				<SocialSignOn onError={() => null} redirectURL="#" />
			</GoogleSignInProvider>
		);
		window.onFacebookSignOn();
		expect(facebookSignOnMock).toHaveBeenCalled();
	});

	it("calls onError when login fails", () => {
		const facebookSignOnMock = jest.fn(() => {
			throw new Error();
		});
		const onErrorMock = jest.fn();
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			isLoggedIn: () => true,
			Identity: {
				configOptions: {
					googleClientId: true,
					facebookAppId: true,
				},
				facebookSignOn: facebookSignOnMock,
				getConfig: () => {},
				initFacebookLogin: () => {},
				initializeFacebook: () => {},
				isLoggedIn: jest.fn(() => false),
			},
		}));

		render(
			<GoogleSignInProvider>
				<SocialSignOn onError={onErrorMock} redirectURL="#" />
			</GoogleSignInProvider>
		);
		window.onFacebookSignOn();
		expect(onErrorMock).toHaveBeenCalled();
	});
});
