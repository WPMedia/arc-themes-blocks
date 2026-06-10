import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { isServerSide } from "@wpmedia/arc-themes-components";
import RegwallOffer from ".";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => false),
}));

jest.mock("../SubscriptionOverlay", () => {
	const React = require("react");
	const SubscriptionOverlayMock = ({ children }) =>
		React.createElement("div", { "data-testid": "subscription-overlay" }, children);
	return { __esModule: true, default: SubscriptionOverlayMock };
});

jest.mock("../SubscriptionDialog", () => {
	const React = require("react");
	const SubscriptionDialogMock = (props) =>
		React.createElement("div", { "data-testid": "subscription-dialog", ...props });
	return { __esModule: true, default: SubscriptionDialogMock };
});

const defaultProps = {
	actionText: "Subscribe",
	actionUrl: "/account/signup",
	headlineText: "Register Now",
	linkPrompt: "Already a subscriber?",
	linkText: "Log In",
	linkUrl: "/account/login",
	reasonPrompt: "Register to continue reading.",
	subheadlineText: "Subheadline",
	usePortal: false,
	className: "b-paywall",
};

describe("RegwallOffer", () => {
	beforeEach(() => {
		isServerSide.mockReturnValue(false);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("returns null when server-side", () => {
		isServerSide.mockReturnValue(true);
		const { container } = render(<RegwallOffer {...defaultProps} />);
		expect(container.firstChild).toBeNull();
	});

	it("renders the overlay wrapper when client-side", () => {
		render(<RegwallOffer {...defaultProps} />);
		expect(screen.getByTestId("subscription-overlay")).not.toBeNull();
	});

	it("renders the dialog with correct props", () => {
		render(<RegwallOffer {...defaultProps} />);
		const dialog = screen.getByTestId("subscription-dialog");
		expect(dialog).not.toBeNull();
	});

	it("passes headlineText as headline to SubscriptionDialog", () => {
		render(<RegwallOffer {...defaultProps} />);
		expect(screen.getByTestId("subscription-dialog")).toHaveAttribute("headline", "Register Now");
	});

	it("passes linkUrl to SubscriptionDialog", () => {
		render(<RegwallOffer {...defaultProps} />);
		expect(screen.getByTestId("subscription-dialog")).toHaveAttribute("linkurl", "/account/login");
	});
});
