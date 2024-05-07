import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Payment from "./index";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const paypal = {
	paymentMethodType: 10,
	paymentMethodID: 4339,
};

const customFields = {
	loginURL: "/account/login/",
	offerURL: "/offer/",
	successURL: "/success/",
};

const order = {
	email: "checkoutTest@gmail.com",
	orderNumber: "DPY0JRVDX0LIHOYO",
	orderType: "Parent",
	phone: "NA",
	status: "Pending",
	subtotal: 20,
	total: 20,
	totalTax: 0,
	shipping: 0,
	items: [
		{
			sku: "test",
			quantity: 1,
			shortDescription: "<p>test-1</p>",
			name: "test product",
			price: 20,
			tax: 0,
			subtotal: 20,
			total: 20,
			priceCode: "YLE801",
			eventId: null,
			ownerClientId: null,
			attributes: [],
			gift: false,
			priceName: "test price",
			priceDescription: "<p>this is the description section</p>",
			priceSummary: "<p>summary price</p>",
			taxInclusive: true,
			productDescription: "<p>test-1</p>",
		},
	],
	payments: [],
	billingAddress: {
		line1: "Prol Manuel Lopez Cotilla 869",
		line2: null,
		locality: "tlaquepaque",
		region: "Jalisco",
		country: "MX",
		postal: "45610",
	},
	currency: "USD",
	orderDate: 1715095775000,
	orderID: 192041,
	clientID: "01038844-815c-4dd1-8050-e4028091bba6",
};

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
    useIdentity: jest.fn(() => ({
		isInitialized: true,
		Identity: {
            apiOrigin: "http://origin/",
			isLoggedIn: jest.fn(() => true),
		},
	})),
    useSales: jest.fn(() => ({
		isInitialized: true,
        Sales: {
            apiOrigin: "http://origin/",
        }
	})),
	usePhrases: jest.fn(() => ({
		t: jest.fn((phrase) => phrase),
	})),
	Input: ({ key, name, label }) => (
		<>
			<input key={key} id={name} name={name} />{" "}
			<label name="name" htmlFor={name}>
				{label}
			</label>
		</>
	),
	Stack: ({ children }) => <div>{children}</div>,
	Button: ({ onClick, ariaLabel, children }) => (
		<button type="submit" onClick={onClick} aria-label={ariaLabel}>
			<span>{children}</span>
		</button>
	),
	Icon: ({ name }) => <div data-testid={name} />,
}));

describe("Payment component", () => {
	it("renders Payment component, only PayPal", async () => {
		render(
			<Payment
				paypal={paypal}
				customFields={customFields}
				paymentOptionSelected="PayPal"
				order={order}
			/>,
		);
		expect(screen.queryByTestId("PayPal")).not.toBeNull();
	});

	it("renders Payment component, paypal & stripeIntents", async () => {

        jest.mock("@stripe/stripe-js", () => ({
            loadStripe: jest.fn().mockResolvedValue({
              elements: jest.fn(),
            }),
          }));

		jest.mock("./index", () => ({
			StripeIntentsOptions: () => (
				<div data-testid="stripe-intents-options">Stripe Intents Options</div>
			),
		}));

		render(
			<Elements stripe={stripePromise}>
				<Payment
					stripeInstance={{}}
					paypal={paypal}
					customFields={customFields}
					paymentOptionSelected="PayPal"
					order={order}
				/>
			</Elements>,
		);
		expect(screen.getByText("checkout-block.payment-type.creditDebitCard")).not.toBeNull();
        expect(screen.queryByTestId("PayPal")).not.toBeNull();
	});

    it("renders review component, if click on continue", async () => {
        const setIsOpenMock = jest.fn();
        const setIsCompleteMock = jest.fn();

		render(
			<Payment
				paypal={paypal}
				customFields={customFields}
				paymentOptionSelected="PayPal"
				order={order}
                setIsComplete={setIsCompleteMock}
                setIsOpen={setIsOpenMock}
			/>,
		);

		expect(screen.queryByTestId("PayPal")).not.toBeNull();

        const button = screen.getByText('checkout-block.continue');
        fireEvent.click(button);

        await waitFor(() => expect(setIsOpenMock).toHaveBeenCalled());
	});
});
