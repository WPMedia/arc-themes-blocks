import React from "react";
import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { isServerSide } from "@wpmedia/arc-themes-components";
import PaywallOffer from ".";
import useOffer from "../useOffer";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => false),
}));

jest.mock("is-url", () => ({
	__esModule: true,
	default: jest.fn(() => false),
}));

jest.mock("../useOffer");

jest.mock("../SubscriptionOverlay", () => ({
	__esModule: true,
	default: ({ children }) =>
		React.createElement("div", { "data-testid": "subscription-overlay" }, children),
}));

jest.mock("../SubscriptionDialog", () => ({
	__esModule: true,
	default: ({ actionUrl, reasonPrompt, headline }) =>
		React.createElement(
			"div",
			{ "data-testid": "subscription-dialog" },
			React.createElement("a", { href: actionUrl }, "Subscribe"),
			reasonPrompt ? React.createElement("span", null, reasonPrompt) : null,
			headline ? React.createElement("span", null, headline) : null,
		),
}));

const sampleOffer = {
	pageTitle: "Offer Title",
	pageSubTitle: "Offer Subtitle",
};

const defaultProps = {
	actionText: "Subscribe",
	actionUrl: "/offer/",
	campaignCode: "testcampaign",
	linkText: "Log In",
	linkUrl: "/account/login",
	reasonPrompt: "Subscribe to continue reading.",
	usePortal: false,
	className: "b-paywall",
};

describe("PaywallOffer", () => {
	beforeEach(() => {
		isServerSide.mockReturnValue(false);
		useOffer.mockReturnValue({
			offer: sampleOffer,
			fetchOffer: jest.fn(() => Promise.resolve(sampleOffer)),
			isFetching: false,
		});
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("returns null when server-side", async () => {
		isServerSide.mockReturnValue(true);
		const { container } = render(<PaywallOffer {...defaultProps} />);
		expect(container.firstChild).toBeNull();
	});

	it("returns null when offer is not available", async () => {
		useOffer.mockReturnValue({
			offer: null,
			fetchOffer: jest.fn(() => Promise.resolve(null)),
			isFetching: true,
		});
		const { container } = render(<PaywallOffer {...defaultProps} campaignCode={undefined} />);
		expect(container.firstChild).toBeNull();
	});

	it("renders the overlay when offer is available", async () => {
		await act(async () => {
			render(<PaywallOffer {...defaultProps} />);
		});
		expect(screen.getByTestId("subscription-overlay")).not.toBeNull();
	});

	it("renders the dialog inside the overlay", async () => {
		await act(async () => {
			render(<PaywallOffer {...defaultProps} />);
		});
		expect(screen.getByTestId("subscription-dialog")).not.toBeNull();
	});

	it("builds action URL with campaign code query param", async () => {
		await act(async () => {
			render(<PaywallOffer {...defaultProps} />);
		});
		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "/offer/?campaign=testcampaign");
	});

	it("uses bare actionUrl when campaignCode is default or absent", async () => {
		await act(async () => {
			render(<PaywallOffer {...defaultProps} campaignCode="default" />);
		});
		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "/offer/");
	});

	it("displays offer headline", async () => {
		await act(async () => {
			render(<PaywallOffer {...defaultProps} />);
		});
		expect(screen.getByText("Offer Title")).not.toBeNull();
	});
});
