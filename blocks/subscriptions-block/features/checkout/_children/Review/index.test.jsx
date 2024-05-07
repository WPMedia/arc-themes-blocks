import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useElements, useStripe } from "@stripe/react-stripe-js";

import ReviewOrder from "./index";

jest.mock("@stripe/react-stripe-js", () => ({
	Elements: ({ children }) => <div>{children}</div>,
}));

jest.mock("@stripe/stripe-js", () => ({
	loadStripe: jest.fn(() => Promise.resolve({})),
}));

jest.mock("@stripe/react-stripe-js", () => ({
	useElements: jest.fn(),
	useStripe: jest.fn(),
}));

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	useIdentity: jest.fn(() => ({
		Identity: {
			isLoggedIn: jest.fn(async () => false),
		},
	})),
	useSales: jest.fn(() => ({
		isInitialized: true,
		Sales: {
			finalizePayment: jest.fn(async () => {}),
			initializePayment: jest.fn(async () => {}),
		},
	})),
	usePhrases: jest.fn(() => ({
		t: jest.fn((phrase) => phrase),
	})),
	Paragraph: ({ dangerouslySetInnerHTML }) => (
		<div dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
	),
	Stack: ({ children }) => <div>{children}</div>,
	Button: ({ onClick, children }) => (
		<button type="submit" onClick={onClick}>
			<span>{children}</span>
		</button>
	),
	Heading: ({ dangerouslySetInnerHTML, children }) =>
		dangerouslySetInnerHTML ? (
			<h1 dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
		) : (
			<div>{children}</div>
		),
	Icon: ({ name }) => <div data-testid={name} />,
}));

const paymentOptions = {
	stripeIntents: {
		paymentMethodType: 18,
		paymentMethodID: 4336,
	},
	paypal: {
		paymentMethodType: 10,
		paymentMethodID: 4339,
	},
};

const customFields = {
	loginURL: "/account/login/",
	offerURL: "/offer/",
	successURL: "/success/",
	termsOfSaleURL: "/terms-of-sale/",
	termsOfServiceURL: "/terms-of-service/",
	titleApplePayGooglePay: "Arc XP",
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

jest.mock("../../../../components/OrderInformation", () => () => <div>Order Information</div>);
jest.mock("../../../../components/RenewalInformation", () => () => <div>Renewal Information</div>);
describe("Payment Review component", () => {
	test("renders Review component when PayPal is selected", () => {
		render(
			<ReviewOrder
				paymentOptions={paymentOptions}
				paymentOptionSelected="PayPal"
				customFields={customFields}
			/>,
		);
		expect(screen.getByText("Order Information")).toBeInTheDocument();
		expect(screen.getByText("Renewal Information")).toBeInTheDocument();
		expect(screen.getByText("subscriptions-block.terms-sales-service-text")).toBeInTheDocument();
		expect(screen.getByRole("button")).not.toBeNull();
	});

	test("renders Review component when StripeIntents is selected", () => {
		const mockElements = {
			create: jest.fn(),
			getElement: jest.fn(),
		};

		useElements.mockImplementation(() => mockElements);

		const mockStripe = {
			createPaymentMethod: jest.fn(),
			createToken: jest.fn(),
		};

		useStripe.mockImplementation(() => mockStripe);

			const setIsOpenMock = jest.fn();
			const setIsCompleteMock = jest.fn();
			const setCaptchaError = jest.fn();

		render(
			<ReviewOrder
				stripeInstance={{}}
				paymentOptions={paymentOptions}
				paymentOptionSelected="StripeIntents"
				customFields={customFields}
				setIsComplete={setIsCompleteMock}
				setIsOpen={setIsOpenMock}
				setCaptchaError={setCaptchaError}
			/>,
		);
		expect(screen.getByText("Order Information")).toBeInTheDocument();
		expect(screen.getByText("Renewal Information")).toBeInTheDocument();
		expect(screen.getByText("subscriptions-block.terms-sales-service-text")).toBeInTheDocument();
		expect(screen.getByRole("button")).not.toBeNull();

		const button = screen.getByText("subscriptions-block.submit-payment");
		fireEvent.click(button);
	});

	it("clicks on continue - paypal selected", async () => {
		const setIsOpenMock = jest.fn();
		const setIsCompleteMock = jest.fn();
		const setCaptchaError = jest.fn();

		render(
			<ReviewOrder
				paymentOptions={paymentOptions}
				paymentOptionSelected="PayPal"
				customFields={customFields}
				order={order}
				setIsComplete={setIsCompleteMock}
				setIsOpen={setIsOpenMock}
				setCaptchaError={setCaptchaError}
			/>,
		);

		const button = screen.getByText("subscriptions-block.submit-payment-paypal");
		fireEvent.click(button);

		await waitFor(() => expect(setCaptchaError).toHaveBeenCalled());
	});
});
