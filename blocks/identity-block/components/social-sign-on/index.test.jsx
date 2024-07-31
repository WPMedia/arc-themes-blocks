import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useIdentity, usePhrases } from "@wpmedia/arc-themes-components";
import SocialSignOn from "./index";
import { GoogleSignInProvider } from "./utils/googleContext";

const mockButton = jest.fn();

jest.mock('@wpmedia/arc-themes-components', () => ({
	...jest.requireActual('@wpmedia/arc-themes-components'),
	Button: (props) => mockButton(props),
	useIdentity: jest.fn(),
	usePhrases: jest.fn()
  }));

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
		// don't render any button
		expect(screen.queryByTestId("fb-login-button")).not.toBeInTheDocument();
		expect(screen.queryByTestId("google-sign-in-button")).not.toBeInTheDocument();
		expect(screen.queryByTestId("apple-btn")).not.toBeInTheDocument();
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

		expect(screen.getByTestId("fb-login-button")).toBeInTheDocument();
		expect(screen.getByTestId("google-sign-in-button")).toBeInTheDocument();
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

describe("Identity Social Login Component - Google Button", () => {
	beforeEach(() => {
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
	});
	it("renders only Google (default) button", () => {
		render(
			<GoogleSignInProvider>
				<SocialSignOn onError={() => null} redirectURL="#" customButtons={false} />
			</GoogleSignInProvider>,
		);

		expect(screen.getByTestId("google-sign-in-button")).toBeInTheDocument();
		expect(screen.queryByTestId("fb-login-button")).not.toBeInTheDocument();
	});

	it("renders only Google (custom) button", () => {
		mockButton.mockImplementation(() => <div data-testid="custom-google-sign-in-button" />);

		render(
			<GoogleSignInProvider>
				<SocialSignOn onError={() => null} redirectURL="#" customButtons />
			</GoogleSignInProvider>,
		);

		expect(screen.getByTestId("custom-google-sign-in-button")).toBeInTheDocument();
		expect(screen.queryByTestId("fb-login-button")).not.toBeInTheDocument();
	});
});

describe("Identity Social Login Component - Facebook Button", () => {

	beforeEach(() => {
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
	});
	it("renders only Facebook (default) button", () => {

		render(
			<GoogleSignInProvider>
				<SocialSignOn onError={() => null} redirectURL="#" />
			</GoogleSignInProvider>,
		);

		expect(screen.getByTestId("fb-login-button")).toBeInTheDocument();
		expect(screen.queryByTestId("google-sign-in-button")).not.toBeInTheDocument();
	});

	it("renders only Facebook (custom) button", () => {
		mockButton.mockImplementation(() => <div data-testid="custom-facebook-btn" />);

		render(
			<GoogleSignInProvider>
				<SocialSignOn onError={() => null} redirectURL="#" customButtons />
			</GoogleSignInProvider>,
		);

		expect(screen.getByTestId("custom-facebook-btn")).toBeInTheDocument();
		expect(screen.queryByTestId("google-sign-in-button")).not.toBeInTheDocument();
	});
});
