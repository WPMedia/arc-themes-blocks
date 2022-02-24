import React from "react";
import { render } from "enzyme";
import isUrl from "is-url";

import { isServerSide } from "@wpmedia/engine-theme-sdk";

import PaywallOffer from ".";
import usePaywall from "../usePaywall";
import useOffer from "../useOffer";

jest.mock("@wpmedia/engine-theme-sdk", () => ({
	__esModule: true,
	isServerSide: jest.fn(() => false),
}));

jest.mock("is-url", () => ({
	__esModule: true,
	default: jest.fn(() => false),
}));

jest.mock("../../components/useOffer");
jest.mock("../../../identity-block");
jest.mock("../../components/usePaywall");

useOffer.mockReturnValue({
	offer: {
		pageTitle: "this the offer title",
		pageSubTitle: "this the offer subtitle",
	},
	fetchOffer: () => ({
		pageTitle: "this the offer title",
		pageSubTitle: "this the offer subtitle",
	}),
});

usePaywall.mockReturnValue({
	campaignCode: "default",
	isPaywalled: true,
	isRegisterwalled: false,
});

/**
 * Below I pass usePortal to false that will in return
 * pass this down to the Subscription Overlay.
 * This boolean prevents ReactDOM.createPortal from being used.
 * Just checking with isServerSide doesn't work.  Jest and Enzyme
 * still have poor support for ReactDOM.createPortal, so we need a way
 * to conditionally render ReactDOM.createPortal.
 */
describe("The PaywallOffer component ", () => {
	it("returns null if serverSide", () => {
		isServerSide.mockReturnValue(true);
		const wrapper = render(
			<PaywallOffer
				actionText="Subscribe"
				actionUrl="/offer/"
				campaignCode="defaultish"
				linkPrompt="Already a subscriber?"
				linkText="Log In."
				linkUrl="/account/login"
				reasonPrompt="Subscribe to continue reading."
				usePortal={false}
			/>
		);
		expect(wrapper.html()).toBe(null);
		isServerSide.mockReset();
	});

	it("renders with correct markup", () => {
		const wrapper = render(
			<PaywallOffer
				actionText="Subscribe"
				actionUrl="/offer/"
				campaignCode="defaultish"
				linkPrompt="Already a subscriber?"
				linkText="Log In."
				linkUrl="/account/login"
				reasonPrompt="Subscribe to continue reading."
				usePortal={false}
			/>
		);
		expect(wrapper.find(".xpmedia-subscription-dialog-reason-prompt").text()).toEqual(
			"Subscribe to continue reading."
		);
		expect(wrapper.find(".xpmedia-subscription-dialog-link-prompt-pre-link").text()).toEqual(
			"Already a subscriber?"
		);
		expect(wrapper.find(".xpmedia-subscription-dialog-link-prompt-link").text()).toEqual("Log In.");
		expect(wrapper.find(".xpmedia-subscription-dialog-link-prompt-link").prop("href")).toEqual(
			"/account/login"
		);
		expect(wrapper.find(".xpmedia-subscription-dialog-headline").text()).toEqual(
			"this the offer title"
		);
		expect(wrapper.find(".xpmedia-subscription-dialog-subheadline").text()).toEqual(
			"this the offer subtitle"
		);
		expect(wrapper.find(".xpmedia-button").text()).toEqual("Subscribe");
		expect(wrapper.find(".xpmedia-button").prop("href")).toEqual("/offer/?campaign=defaultish");
	});

	it("renders campaignCode if its a url", () => {
		isUrl.mockReturnValue(true);
		const wrapper = render(
			<PaywallOffer
				actionText="Subscribe"
				actionUrl="/offer/"
				campaignCode="./"
				usePortal={false}
			/>
		);
		expect(wrapper.find(".xpmedia-button").text()).toEqual("Subscribe");
		expect(wrapper.find(".xpmedia-button").prop("href")).toEqual("/offer/?campaign=./");
		isUrl.mockReset();
	});

	it("renders without a query param if campaignCode is not passed", () => {
		isUrl.mockReturnValue(true);
		const wrapper = render(
			<PaywallOffer actionText="Subscribe" actionUrl="/offer/" usePortal={false} />
		);
		expect(wrapper.find(".xpmedia-button").text()).toEqual("Subscribe");
		expect(wrapper.find(".xpmedia-button").prop("href")).toEqual("/offer/");
		isUrl.mockReset();
	});
});
