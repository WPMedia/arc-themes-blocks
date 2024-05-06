import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { SummaryAccount, SummaryBillingAddress, SummaryPayment } from "./Summary";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	Paragraph: ({ children }) => <p>{children}</p>,
	usePhrases: jest.fn(() => ({
		t: jest.fn((phrase) => phrase),
	})),
}));

jest.mock("../PaymentIcons", () => ({ type }) => (
	<div data-testid="payment-icon-mock">{`${type}-icon`}</div>
));

const MockPaymentIcon = () => <div>Payment icon</div>;

describe("Summary component", () => {
	it("Summary account", async () => {
		render(<SummaryAccount account={{ email: "jennylopez@email.com" }} />);
		expect(screen.getByText("jennylopez@email.com")).toHaveTextContent("jennylopez@email.com");
	});

	it("Summary billing address", async () => {
		const billingAddress = {
			line1: "1234 Street",
			locality: "Brooklyn",
			country: "US",
			postal: "11209",
			region: "NY",
		};
		render(<SummaryBillingAddress billingAddress={billingAddress} />);
		expect(screen.getByText(`${billingAddress?.line1}`)).toHaveTextContent("1234 Street");
		expect(screen.getByText("Brooklyn,")).toBeInTheDocument();
		expect(screen.getByText("NY,")).toBeInTheDocument();
		expect(screen.getByText("11209,")).toBeInTheDocument();
		expect(screen.getByText("US")).toBeInTheDocument();
	});

	it("Summary payment", async () => {
		jest.mock("../PaymentIcons", () => MockPaymentIcon);

		const paymentDetails = {
			paymentOptionSelected: "StripeIntents",
			card: {
				brand: "visa",
				last4: "4242",
				exp_year: "2030",
				exp_month: "12",
			},
		};

		render(<SummaryPayment paymentDetails={paymentDetails} />);

		expect(screen.getByTestId("payment-icon-mock")).not.toBeNull();
		expect(screen.getByText("visa")).toBeInTheDocument();
		expect(screen.getByText("4242")).toBeInTheDocument();

		const brand = paymentDetails?.card?.brand;
		expect(screen.getByText(brand)).toBeInTheDocument();
		expect(screen.getByText(`checkout-block.expires 12/2030`)).toBeInTheDocument();
	});

	it("Summary payment with paymentOption different to StripeIntents", async () => {
		jest.mock("../PaymentIcons", () => MockPaymentIcon);

		const paymentDetails = {
			paymentOptionSelected: "PayPal",
		};

		render(<SummaryPayment paymentDetails={paymentDetails} />);

		expect(screen.getByTestId("payment-icon-mock")).not.toBeNull();
	});
});
