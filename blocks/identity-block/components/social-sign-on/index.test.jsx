import React from "react";
import { mount, shallow } from "enzyme";
import SocialSignOn from "./index";
import useIdentity from "../identity";

jest.mock("../identity");

describe("Subscriptions Social Login Component", () => {
	it("renders nothing if config settings are false", () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			isLoggedIn: () => false,
			Identity: {
				configOptions: {
					googleClientId: false,
					facebookAppId: false,
				},
				initGoogleLogin: () => {},
				initFacebookLogin: () => {},
				initializeFacebook: () => {},
			},
		}));

		const wrapper = shallow(<SocialSignOn onError={() => null} redirectURL="#" />);
		// don't render any facebook stuff, only show wrapper
		expect(wrapper.html()).toBe('<section class="xpmedia-social-signin-wrapper"></section>');
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
				initGoogleLogin: () => {},
				initFacebookLogin: () => {},
				initializeFacebook: () => {},
			},
		}));

		const wrapper = mount(<SocialSignOn onError={() => null} redirectURL="#" />);
		expect(wrapper.find("#google-sign-in-button")).toHaveLength(1);
		expect(wrapper.find(".fb-login-button")).toHaveLength(0);
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
				initGoogleLogin: () => {},
				initFacebookLogin: () => {},
				initializeFacebook: () => {},
			},
		}));

		const wrapper = mount(<SocialSignOn onError={() => null} redirectURL="#" />);
		expect(wrapper.find("#google-sign-in-button")).toHaveLength(0);
		expect(wrapper.find(".fb-login-button")).toHaveLength(1);
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
				initGoogleLogin: () => {},
				initFacebookLogin: () => {},
				initializeFacebook: () => {},
				configOptions: {
					googleClientId: true,
					facebookAppId: true,
				},
			},
		}));

		const wrapper = mount(<SocialSignOn onError={() => null} redirectURL="#" />);
		expect(wrapper.html()).not.toBe(null);
	});

	it("renders placeholders for Google and Facebook sign-in buttons", () => {
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
				initGoogleLogin: jest.fn(async () =>
					Promise.resolve({
						init: true,
					})
				),
				initializeFacebook: jest.fn(async () =>
					Promise.resolve({
						init: true,
					})
				),
				configOptions: {
					googleClientId: true,
					facebookAppId: true,
				},
			},
		}));
		const wrapper = mount(<SocialSignOn onError={() => null} redirectURL="#" />);
		expect(wrapper.find("#google-sign-in-button")).toHaveLength(1);
		expect(wrapper.find(".fb-login-button")).toHaveLength(1);
	});
});
