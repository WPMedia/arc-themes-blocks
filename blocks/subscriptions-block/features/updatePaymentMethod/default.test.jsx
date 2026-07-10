import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useIdentity } from "@wpmedia/arc-themes-components";

import UpdatePaymentMethod from "./default";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	useIdentity: jest.fn(),
}));

jest.mock("../checkout/_children/PaymentInfo", () => {
	const R = require("react");
	return {
		__esModule: true,
		default: (props) =>
			R.createElement("div", { "data-testid": "payment-info", ...props }),
	};
});

const defaultCustomFields = {
	loginUrl: "/account/login/",
	successURL: "/account/",
	stripeIntentsID: 1234,
};

describe("UpdatePaymentMethod", () => {
	beforeEach(() => {
		useIdentity.mockReturnValue({
			Identity: { isLoggedIn: jest.fn(() => Promise.resolve(true)) },
			isInitialized: true,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders PaymentInfo component", async () => {
		render(<UpdatePaymentMethod customFields={defaultCustomFields} />);
		expect(await screen.findByTestId("payment-info")).not.toBeNull();
	});

	it("passes stripeIntentsID and successUpdateURL to PaymentInfo", async () => {
		render(<UpdatePaymentMethod customFields={defaultCustomFields} />);
		const paymentInfo = await screen.findByTestId("payment-info");
		expect(paymentInfo).toHaveAttribute("stripeIntentsID", "1234");
		expect(paymentInfo).toHaveAttribute("successUpdateURL", "/account/");
	});

	it("passes isPaymentMethodUpdate flag to PaymentInfo", async () => {
		render(<UpdatePaymentMethod customFields={defaultCustomFields} />);
		expect(await screen.findByTestId("payment-info")).toHaveAttribute("isPaymentMethodUpdate", "true");
	});

	it("redirects to login when user is not logged in", async () => {
		const isLoggedIn = jest.fn(() => Promise.resolve(false));
		useIdentity.mockReturnValue({
			Identity: { isLoggedIn },
			isInitialized: true,
		});
		const originalLocation = window.location;
		delete window.location;
		window.location = { href: "https://example.com/update-payment", pathname: "/update-payment" };

		render(<UpdatePaymentMethod customFields={defaultCustomFields} />);
		await waitFor(() => expect(window.location.href).toContain("/account/login/"));

		window.location = originalLocation;
	});

	it("does not redirect when user is logged in", async () => {
		const originalHref = "https://example.com/page";
		const originalLocation = window.location;
		delete window.location;
		window.location = { href: originalHref, pathname: "/page" };

		render(<UpdatePaymentMethod customFields={defaultCustomFields} />);
		await waitFor(() => expect(window.location.href).toBe(originalHref));

		window.location = originalLocation;
	});
});
