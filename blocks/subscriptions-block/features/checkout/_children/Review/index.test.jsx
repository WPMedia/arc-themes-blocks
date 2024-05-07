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

const paymentMethod = {
	id: "pm_1PDx3jCB9PxBy8pMGcjOoS0x",
	object: "payment_method",
	allow_redisplay: "unspecified",
	billing_details: {
		address: {
			city: null,
			country: "MX",
			line1: null,
			line2: null,
			postal_code: "45610",
			state: null,
		},
		email: null,
		name: "lau",
		phone: null,
	},
	card: {
		brand: "visa",
		checks: {
			address_line1_check: null,
			address_postal_code_check: null,
			cvc_check: null,
		},
		country: "US",
		display_brand: "visa",
		exp_month: 12,
		exp_year: 2032,
		funding: "credit",
		generated_from: null,
		last4: "4242",
		networks: {
			available: ["visa"],
			preferred: null,
		},
		three_d_secure_usage: {
			supported: true,
		},
		wallet: null,
	},
	created: 1715123071,
	customer: null,
	livemode: false,
	radar_options: {},
	type: "card",
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

let href = "";
delete window.location;
window.location = {
	set href(value) {
		href = value;
	},
	get href() {
		return href;
	},
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

	test("renders Review component when StripeIntents is selected total > 0", async() => {
		const mockElements = {
			create: jest.fn(),
			getElement: jest.fn(),
		};

		useElements.mockImplementation(() => mockElements);

		const mockStripe = {
			createPaymentMethod: jest.fn(),
			createToken: jest.fn(),
			confirmCardPayment: jest.fn(() => ({ paymentIntent: { id: "123" } })),
			confirmCardSetup: jest.fn(() => ({ setupIntent: { id: "123" } })),
		};

		useStripe.mockImplementation(() => mockStripe);

		const setIsOpenMock = jest.fn();
		const setIsCompleteMock = jest.fn();
		const setCaptchaError = jest.fn();

		render(
			<ReviewOrder
				stripeInstance={{}}
				order={order}
				paymentOptions={paymentOptions}
				paymentMethod={paymentMethod}
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

		await waitFor(() => {
			expect(window.location.href).toBe(customFields.successURL);
		});
	});

	test("renders Review component when StripeIntents is selected total = 0", async() => {
		const mockElements = {
			create: jest.fn(),
			getElement: jest.fn(),
		};

		useElements.mockImplementation(() => mockElements);

		const mockStripe = {
			createPaymentMethod: jest.fn(),
			createToken: jest.fn(),
			confirmCardPayment: jest.fn(() => ({ paymentIntent: { id: "123" } })),
			confirmCardSetup: jest.fn(() => ({ setupIntent: { id: "123" } })),
		};

		useStripe.mockImplementation(() => mockStripe);

		const setIsOpenMock = jest.fn();
		const setIsCompleteMock = jest.fn();
		const setCaptchaError = jest.fn();

		render(
			<ReviewOrder
				stripeInstance={{}}
				order={{...order, total: 0}}
				paymentOptions={paymentOptions}
				paymentMethod={paymentMethod}
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

		await waitFor(() => {
			expect(window.location.href).toBe(customFields.successURL);
		});
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

	it("renders applePay googlePay button", () => {
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
				paymentOptionSelected="ApplePay"
				customFields={customFields}
				setIsComplete={setIsCompleteMock}
				setIsOpen={setIsOpenMock}
				setCaptchaError={setCaptchaError}
			/>,
		);
		expect(screen.getByText("Order Information")).toBeInTheDocument();
		expect(screen.getByText("Renewal Information")).toBeInTheDocument();
		expect(screen.getByText("subscriptions-block.terms-sales-service-text")).toBeInTheDocument();

		expect(screen.getByTestId("ApplePay-payment-request-button")).toBeInTheDocument();
	});
});
