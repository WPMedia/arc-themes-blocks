import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";

import { useFusionContext } from "fusion:context";

import Paywall from "./default";
import usePaywall from "../../components/usePaywall";

jest.mock("../../components/usePaywall");
jest.mock("../../components/PaywallOffer", () => () => <div data-testid="paywall-offer" />);
jest.mock("../../components/RegwallOffer", () => () => <div data-testid="regwall-offer" />);

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => false),
}));

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({ isAdmin: false })),
}));

const customFields = {
	adminViewState: "hide",
	displayMode: "",
	campaignCode: "default",
	linkText: "Log In.",
	linkUrl: "/account/login",
	payActionText: "Subscribe",
	payActionUrl: "/offer/",
	payReasonPrompt: "Pay Reason",
	registerActionText: "Register",
	registerActionUrl: "/account/signup/",
	registerHeaderText: "Register Now",
	registerSubHeaderText: "to gain access",
	registerReasonPrompt: "Register Reason",
};

describe("The Paywall feature", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders PaywallOffer when isPaywalled is true and isRegisterwalled is false", () => {
		usePaywall.mockReturnValue({ isPaywalled: true, isRegisterwalled: false, isLoggedIn: false });
		render(<Paywall customFields={customFields} />);
		expect(screen.getByTestId("paywall-offer")).not.toBeNull();
		expect(screen.queryByTestId("regwall-offer")).toBeNull();
	});

	it("renders RegwallOffer when isRegisterwalled is true", () => {
		usePaywall.mockReturnValue({ isPaywalled: true, isRegisterwalled: true, isLoggedIn: false });
		render(<Paywall customFields={customFields} />);
		expect(screen.getByTestId("regwall-offer")).not.toBeNull();
		expect(screen.queryByTestId("paywall-offer")).toBeNull();
	});

	it("renders nothing when neither isPaywalled nor isRegisterwalled", () => {
		usePaywall.mockReturnValue({ isPaywalled: false, isRegisterwalled: false, isLoggedIn: false });
		const { container } = render(<Paywall customFields={customFields} />);
		expect(container).toBeEmptyDOMElement();
	});

	it("renders RegwallOffer when isAdmin and adminViewState is showRegwall", () => {
		useFusionContext.mockReturnValue({ isAdmin: true });
		usePaywall.mockReturnValue({ isPaywalled: false, isRegisterwalled: false, isLoggedIn: false });
		render(<Paywall customFields={{ ...customFields, adminViewState: "showRegwall" }} />);
		expect(screen.getByTestId("regwall-offer")).not.toBeNull();
	});

	it("renders PaywallOffer when isAdmin and adminViewState is showPaywall", () => {
		useFusionContext.mockReturnValue({ isAdmin: true });
		usePaywall.mockReturnValue({ isPaywalled: false, isRegisterwalled: false, isLoggedIn: false });
		render(<Paywall customFields={{ ...customFields, adminViewState: "showPaywall" }} />);
		expect(screen.getByTestId("paywall-offer")).not.toBeNull();
	});

	it("renders nothing when isAdmin and adminViewState is hide", () => {
		useFusionContext.mockReturnValue({ isAdmin: true });
		usePaywall.mockReturnValue({ isPaywalled: false, isRegisterwalled: false, isLoggedIn: false });
		const { container } = render(<Paywall customFields={{ ...customFields, adminViewState: "hide" }} />);
		expect(container).toBeEmptyDOMElement();
	});
});
