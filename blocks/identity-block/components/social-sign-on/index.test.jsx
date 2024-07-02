import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { useIdentity, usePhrases } from "@wpmedia/arc-themes-components";
import SocialSignOn from "./index";
import { GoogleSignInProvider } from "./utils/googleContext";

jest.mock("@wpmedia/arc-themes-components");

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
		usePhrases.mockImplementation(() => ({
			t: jest
				.fn()
				.mockReturnValue(
					"Sign-in prompt was suppressed by the user or dismissed. Please try again later or use another sign-in method.",
				),
		}));
		render(
			<GoogleSignInProvider>
				<SocialSignOn />
			</GoogleSignInProvider>,
		);
		// don't render any facebook stuff, only show wrapper
		const genericElements = screen.getAllByRole("generic");
		expect(genericElements.length).toBe(1);
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
		usePhrases.mockImplementation(() => ({
			t: jest
				.fn()
				.mockReturnValue(
					"Sign-in prompt was suppressed by the user or dismissed. Please try again later or use another sign-in method.",
				),
		}));

		render(
			<GoogleSignInProvider>
				<SocialSignOn onError={() => null} redirectURL="#" customButtons={false}/>
			</GoogleSignInProvider>,
		);

		expect(screen.getByTestId('google-sign-in-button')).toBeInTheDocument();
		expect(screen.queryByTestId('fb-login-button')).not.toBeInTheDocument();
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

		render(
			<GoogleSignInProvider>
				<SocialSignOn onError={() => null} redirectURL="#" />
			</GoogleSignInProvider>,
		);

		expect(screen.getByTestId('fb-login-button')).toBeInTheDocument();
		expect(screen.queryByTestId('google-sign-in-button')).not.toBeInTheDocument();
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
					}),
				),
				initFacebookLogin: () => {},
				initializeFacebook: () => {},
				isLoggedIn: jest.fn(() => false),
			},
		}));

		render(
			<GoogleSignInProvider>
				<SocialSignOn onError={() => null} redirectURL="#" />
			</GoogleSignInProvider>,
		);

		expect(screen.getByTestId('fb-login-button')).toBeInTheDocument();
		expect(screen.getByTestId('google-sign-in-button')).toBeInTheDocument();
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
			</GoogleSignInProvider>,
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
			</GoogleSignInProvider>,
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
		usePhrases.mockImplementation(() => ({
			t: jest
				.fn()
				.mockReturnValue(
					"Sign-in prompt was suppressed by the user or dismissed. Please try again later or use another sign-in method.",
				),
		}));

		render(
			<GoogleSignInProvider>
				<SocialSignOn onError={onErrorMock} redirectURL="#" />
			</GoogleSignInProvider>,
		);
		window.onFacebookSignOn();
		expect(onErrorMock).toHaveBeenCalled();
	});
});
