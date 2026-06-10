import React from "react";
import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useIdentity } from "@wpmedia/arc-themes-components";
import usePaymentOptions from "../../../../components/usePaymentOptions";

import PaymentInfo from ".";

jest.mock("@stripe/react-stripe-js", () => {
	const R = require("react");
	return {
		Elements: ({ children }) => R.createElement("div", { "data-testid": "stripe-elements" }, children),
		useElements: jest.fn(() => ({ getElement: jest.fn(() => null) })),
		CardNumberElement: () => R.createElement("div", { "data-testid": "card-number" }),
		CardExpiryElement: () => R.createElement("div", { "data-testid": "card-expiry" }),
		CardCvcElement: () => R.createElement("div", { "data-testid": "card-cvc" }),
	};
});

jest.mock("@stripe/stripe-js", () => ({
	loadStripe: jest.fn(() => Promise.resolve({ id: "stripe-instance" })),
}));

jest.mock("../../../../components/useSales", () =>
	jest.fn(() => ({
		Sales: {
			getCart: jest.fn(() => Promise.resolve({ items: [] })),
			initializePayment: jest.fn(() => Promise.resolve({ parameter1: "secret", parameter2: "pk_test" })),
		},
		isInitialized: true,
	})),
);

jest.mock("../../../../components/usePaymentOptions", () =>
	jest.fn(() => ({
		stripeIntents: { paymentMethodID: "pm_test" },
		paypal: null,
		error: null,
	})),
);

jest.mock("../../../../components/PaymentForm", () => {
	const R = require("react");
	return { __esModule: true, default: () => R.createElement("div", { "data-testid": "payment-form" }) };
});

jest.mock("../../../../components/PayPal", () => {
	const R = require("react");
	return { __esModule: true, default: () => R.createElement("div", { "data-testid": "paypal" }) };
});

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	useIdentity: jest.fn(),
}));

const defaultProps = {
	successURL: "/success/",
	className: "b-checkout",
	stripeIntentsID: 1234,
	isInitialized: false,
};

describe("PaymentInfo", () => {
	beforeEach(() => {
		useIdentity.mockReturnValue({
			Identity: { isLoggedIn: jest.fn(() => Promise.resolve(true)) },
			isInitialized: true,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders the payment info container", async () => {
		await act(async () => {
			render(<PaymentInfo {...defaultProps} />);
		});
		expect(document.querySelector(".b-checkout__payment-info")).not.toBeNull();
	});

	it("renders the form heading", async () => {
		await act(async () => {
			render(<PaymentInfo {...defaultProps} />);
		});
		expect(screen.getByText("subscriptions-block.credit-card-information")).not.toBeNull();
	});

	it("does not render PayPal when paypal is null", async () => {
		await act(async () => {
			render(<PaymentInfo {...defaultProps} />);
		});
		expect(screen.queryByTestId("paypal")).toBeNull();
	});

	it("renders error message when payment options error occurs", async () => {
		usePaymentOptions.mockReturnValueOnce({
			stripeIntents: null,
			paypal: null,
			error: "Payment configuration error",
		});
		await act(async () => {
			render(<PaymentInfo {...defaultProps} />);
		});
		expect(screen.getByRole("alert")).not.toBeNull();
	});

	it("does not render Stripe Elements when stripe is not initialized", async () => {
		await act(async () => {
			render(<PaymentInfo {...defaultProps} />);
		});
		// stripeInstance starts null so Stripe Elements shouldn't appear initially
		expect(screen.queryByTestId("stripe-elements")).toBeNull();
	});

	it("renders for payment method update", async () => {
		await act(async () => {
			render(<PaymentInfo {...defaultProps} isPaymentMethodUpdate />);
		});
		expect(document.querySelector(".b-checkout__payment-info")).not.toBeNull();
	});
});
