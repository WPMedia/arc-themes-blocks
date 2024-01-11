import React from "react";
import { render } from "@testing-library/react";
import isUrl from "is-url";

import { isServerSide } from "@wpmedia/arc-themes-components";

import PaywallOffer from ".";
import usePaywall from "../usePaywall";
import useOffer from "../useOffer";

jest.mock("@wpmedia/arc-themes-components", () => ({
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
		render(
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
		expect(screen.html()).toBe(null);
		isServerSide.mockReset();
	});

	it("renders with correct markup", () => {
		render(
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

		expect(screen.getByText("Subscribe to continue reading.")).not.toBeNull();
		expect(screen.getByText("Already a subscriber?")).not.toBeNull();
		expect(screen.getByText("Log In.").closest("a")).toHaveAttribute("href", "/account/login");

		expect(screen.getByText("this the offer title")).not.toBeNull();
		expect(screen.getByText("this the offer subtitle")).not.toBeNull();
		expect(screen.getByText("Subscribe")).not.toBeNull();
		expect(screen.getByText("Subscribe").closest("a")).toHaveAttribute(
			"href",
			"/offer/?campaign=defaultish"
		);
	});

	it("renders campaignCode if its a url", () => {
		isUrl.mockReturnValue(true);
		render(
			<PaywallOffer
				actionText="Subscribe"
				actionUrl="/offer/"
				campaignCode="./"
				usePortal={false}
			/>
		);
		expect(screen.getByText("Subscribe")).not.toBeNull();
		expect(screen.getByText("Subscribe").closest("a")).toHaveAttribute(
			"href",
			"/offer/?campaign=./"
		);
		isUrl.mockReset();
	});

	it("renders without a query param if campaignCode is not passed", () => {
		isUrl.mockReturnValue(true);
		render(<PaywallOffer actionText="Subscribe" actionUrl="/offer/" usePortal={false} />);
		expect(screen.getByRole("button")).not.toBeNull();
		expect(screen.getByText("Subscribe")).not.toBeNull();
		expect(screen.getByRole("button").toHaveAttribute("href", "/offer/"));
		isUrl.mockReset();
	});
});
