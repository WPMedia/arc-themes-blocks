import React from "react";
import { render } from "@testing-library/react";

import { isServerSide } from "@wpmedia/arc-themes-components";


import RegwallOffer from ".";

jest.mock("@wpmedia/arc-themes-components", () => ({
	__esModule: true,
	isServerSide: jest.fn(() => false),
}));

jest.mock("is-url", () => ({
	__esModule: true,
	default: jest.fn(() => false),
}));

/**
 * Below I pass usePortal to false that will in return
 * pass this down to the Subscription Overlay.
 * This boolean prevents ReactDOM.createPortal from being used.
 * Just checking with isServerSide doesn't work.  Jest and Enzyme
 * still have poor support for ReactDOM.createPortal, so we need a way
 * to conditionally render ReactDOM.createPortal.
 */
describe("The RegwallOffer component ", () => {
	it("returns null if serverSide", () => {
		isServerSide.mockReturnValue(true);
		render(
			<RegwallOffer
				actionText="Subscribe"
				actionUrl="/account/signup"
				headlineText="Headline"
				linkPrompt="Already a subscriber?"
				linkText="Log In."
				linkUrl="/account/login"
				reasonPrompt="Subscribe to continue reading."
				subheadlineText="Subheadline"
				usePortal={false}
			/>
		);
		expect(screen.html()).toBe(null);
		isServerSide.mockReset();
	});

	it("renders with correct markup", () => {
		const wrapper = render(
			<RegwallOffer
				actionText="Subscribe"
				actionUrl="/account/signup"
				headlineText="Headline"
				linkPrompt="Already a subscriber?"
				linkText="Log In."
				linkUrl="/account/login"
				reasonPrompt="Subscribe to continue reading."
				subheadlineText="Subheadline"
				usePortal={false}
			/>
		);

        expect(screen.getByText("Subscribe to continue reading.")).not.toBeNull();
        expect(screen.getByText("Already a subscriber?")).not.toBeNull();
        expect(screen.getByText('Log In.').closest('a')).toHaveAttribute('href', '/account/login');

        expect(screen.getByText("Headline")).not.toBeNull();
        expect(screen.getByText("Subheadline")).not.toBeNull();
        expect(screen.getByText('Subscribe').closest('a')).toHaveAttribute('href', '/account/signup');
	});
});