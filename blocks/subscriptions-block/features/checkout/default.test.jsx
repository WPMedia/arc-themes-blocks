import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useIdentity, useSales } from "@wpmedia/arc-themes-components";
import Checkout from "./default";

import useCartOrderDetail from "../../components/useCartOrderDetail";
import * as usePaymentOptionsModule from "../../components/usePaymentOptions";
import * as usePayPalPaymentRedirectModule from "../../components/usePayPalPaymentRedirect";

jest.mock("../../components/useCartOrderDetail");

jest.mock("./_children/BillingAddress", () => () => <div>Billing Address</div>);
jest.mock("./_children/PaymentReview", () => () => <div>Payment Review</div>);

const assignMock = jest.fn(() => "checkoutURL");
delete window.location;
window.location = { assign: assignMock, href: "checkoutURL" };

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		api: {
			identity: {
				origin: "https://corecomponents-arc-demo-3-prod.api.cdn.arcpublishing.com",
			},
			retail: {
				origin: "https://corecomponents-arc-demo-3-prod.api.cdn.arcpublishing.com",
				endpoint: "/retail/public/v1/offer/live/",
			},
		},
	})),
);

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	useIdentity: jest.fn(() => ({
		getSignedInIdentity: jest.fn(
			(user) =>
				user?.identities?.reduce((prev, current) =>
					prev.lastLoginDate > current.lastLoginDate ? prev : current,
				) || null,
		),
		Identity: {
			isLoggedIn: jest.fn(async () => true),
			getUserProfile: jest.fn(async () => {}),
		},
	})),
	usePhrases: jest.fn(() => ({
		t: jest.fn((phrase) => phrase),
	})),
	useSales: jest.fn(() => ({
		isInitialized: true,
		Sales: {
			getCart: jest.fn(async () => {}),
			getPaymentOptions: jest.fn().mockResolvedValue([
                { paymentMethodID: 4336, paymentMethodType: 18 },
                { paymentMethodID: 4339, paymentMethodType: 10 },
                { paymentMethodID: 4340, paymentMethodType: 18 },
            ]),
		},
	})),
	useRecaptcha: jest.fn(async () => ({
		isRecaptchaEnabled: false,
	})),
}));

describe("Checkout Feature", () => {
	afterEach(() => {
		assignMock.mockClear();
	});

	it("Redirects user to login url when user is not logged in", async () => {
		useCartOrderDetail.mockImplementation(() => ({
			isFetching: false,
			isFetchingCartOrder: false,
			cartDetail: undefined,
			orderDetail: undefined,
		}));

		useIdentity.mockReturnValue({
			Identity: {
				isLoggedIn: jest.fn(async () => false),
				getUserProfile: jest.fn(async () => {}),
			},
		});

		const checkoutURL = 'checkout'
		window.location.href = checkoutURL

		render(
			<Checkout
				customFields={{
					loginURL: "/login-url/",
					offerURL: '/offer-url/'
				}}
			/>,
		);

		await waitFor(() => expect(window.location.href).toBe(`/login-url/?redirect=${checkoutURL}`));
	});

	it("Redirects user to offer URL when cart is empty and user isLoggedIn", async () => {
	
		useCartOrderDetail.mockImplementation(() => ({
			isLoggedIn: true
		}));

		const checkoutURL = 'checkout'
		window.location.href = checkoutURL

		render(
			<Checkout
			customFields={{
				loginURL: "/login-url/",
				offerURL: '/offer-url/'
			}}
			/>,
		);

		await waitFor(() => {
			expect(window.location.href).toBe("/offer-url/?redirect=undefined");
		});
	});

	it("show billing address card when user is logged in and cart is returned from hook", async () => {
		const cart = {
			total: 20,
			subtotal: 20,
			tax: 0,
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
				},
			],
			currency: "USD",
			taxSupported: true,
		};

		useSales.mockImplementation(()=>({
			Sales: {
				getCart: jest.fn(() => cart),
			}
		}));

		render(
			<Checkout
				customFields={{
					offerURL: "/offer-url/",
				}}
			/>,
		);
		expect(await screen.findByText("Billing Address")).toBeInTheDocument();
	});

	it("returns null when isCheckingPaypal is true", () => {
		jest
			.spyOn(usePayPalPaymentRedirectModule, "default")
			.mockReturnValue({ error: undefined, isCheckingPaypal: true });

		useCartOrderDetail.mockReturnValue({
			isFetching: false,
			isFetchingCartOrder: false,
			isLoggedIn: false,
			cartDetail: undefined,
			orderDetail: undefined,
		});

		const { container } = render(
			<Checkout
				customFields={{
					loginURL: "/login-url/",
					offerURL: "/offer-url/",
					successURL: "/success/",
				}}
			/>,
		);

		expect(container).toBeEmptyDOMElement();
	});

	it("sets user to false when getUserProfile rejects", async () => {
		jest
			.spyOn(usePaymentOptionsModule, "default")
			.mockReturnValue({ stripeIntents: undefined, paypal: undefined, error: undefined, isFetching: false });

		jest
			.spyOn(usePayPalPaymentRedirectModule, "default")
			.mockReturnValue({ error: undefined, isCheckingPaypal: false });

		const cartWithItems = { items: [{ sku: "test", priceCode: "A", quantity: 1 }] };

		useCartOrderDetail.mockReturnValue({
			isFetching: false,
			isFetchingCartOrder: false,
			isLoggedIn: true,
			cartDetail: cartWithItems,
			orderDetail: undefined,
		});

		useIdentity.mockReturnValue({
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				getUserProfile: jest.fn(() => Promise.reject(new Error("profile error"))),
				logout: jest.fn(() => Promise.resolve()),
			},
		});

		render(
			<Checkout
				customFields={{
					loginURL: "/login-url/",
					offerURL: "/offer-url/",
				}}
			/>,
		);

		// Component should render without crashing after getUserProfile rejects
		await screen.findByText("Billing Address");
	});

	it("sets state from orderDetail when orderDetail has items", async () => {
		jest
			.spyOn(usePaymentOptionsModule, "default")
			.mockReturnValue({ stripeIntents: undefined, paypal: undefined, error: undefined, isFetching: false });

		jest
			.spyOn(usePayPalPaymentRedirectModule, "default")
			.mockReturnValue({ error: undefined, isCheckingPaypal: false });

		const orderDetail = {
			orderNumber: "ORD123",
			items: [{ sku: "test", priceCode: "A", quantity: 1 }],
			billingAddress: { line1: "123 Main St", country: "US" },
		};

		useCartOrderDetail.mockReturnValue({
			isFetching: false,
			isFetchingCartOrder: false,
			isLoggedIn: true,
			cartDetail: undefined,
			orderDetail,
		});

		render(
			<Checkout
				customFields={{
					loginURL: "/login-url/",
					offerURL: "/offer-url/",
				}}
			/>,
		);

		await screen.findByText("Payment Review");
	});

	it("sets error state when errorPaypal is returned", async () => {
		jest
			.spyOn(usePaymentOptionsModule, "default")
			.mockReturnValue({ stripeIntents: undefined, paypal: undefined, error: undefined, isFetching: false });

		jest
			.spyOn(usePayPalPaymentRedirectModule, "default")
			.mockReturnValue({ error: new Error("PayPal error"), isCheckingPaypal: false });

		const cartWithItems = { items: [{ sku: "test", priceCode: "A", quantity: 1 }] };

		useCartOrderDetail.mockReturnValue({
			isFetching: false,
			isFetchingCartOrder: false,
			isLoggedIn: true,
			cartDetail: cartWithItems,
			orderDetail: undefined,
		});

		render(
			<Checkout
				customFields={{
					loginURL: "/login-url/",
					offerURL: "/offer-url/",
				}}
			/>,
		);

		await screen.findByText("Billing Address");
	});

	it("calls Identity.logout when account edit button is clicked", async () => {
		jest
			.spyOn(usePaymentOptionsModule, "default")
			.mockReturnValue({ stripeIntents: undefined, paypal: undefined, error: undefined, isFetching: false });

		jest
			.spyOn(usePayPalPaymentRedirectModule, "default")
			.mockReturnValue({ error: undefined, isCheckingPaypal: false });

		const logoutMock = jest.fn(() => Promise.resolve());

		useIdentity.mockReturnValue({
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				getUserProfile: jest.fn(async () => ({ firstName: "Jane", email: "jane@test.com" })),
				logout: logoutMock,
			},
		});

		const cartWithItems = { items: [{ sku: "test", priceCode: "A", quantity: 1 }] };

		useCartOrderDetail.mockReturnValue({
			isFetching: false,
			isFetchingCartOrder: false,
			isLoggedIn: true,
			cartDetail: cartWithItems,
			orderDetail: undefined,
		});

		window.location.href = "checkout";

		render(
			<Checkout
				customFields={{
					loginURL: "/login-url/",
					offerURL: "/offer-url/",
				}}
			/>,
		);

		await screen.findByText("Billing Address");

		// Find the account edit button (first button rendered)
		const editButtons = screen.getAllByText("checkout-block.edit");
		fireEvent.click(editButtons[0]);

		await waitFor(() => expect(logoutMock).toHaveBeenCalled());
	});

	it("renders checkout UI container when payment options and cart order are ready", async () => {
		jest
			.spyOn(usePaymentOptionsModule, "default")
			.mockReturnValue({ stripeIntents: undefined, paypal: undefined, error: undefined, isFetching: false });

		jest
			.spyOn(usePayPalPaymentRedirectModule, "default")
			.mockReturnValue({ error: undefined, isCheckingPaypal: false });

		const cartWithItems = { items: [{ sku: "test", priceCode: "A", quantity: 1 }] };

		useCartOrderDetail.mockReturnValue({
			isFetching: false,
			isFetchingCartOrder: false,
			isLoggedIn: true,
			cartDetail: cartWithItems,
			orderDetail: undefined,
		});

		const { container } = render(
			<Checkout
				customFields={{
					loginURL: "/login-url/",
					offerURL: "/offer-url/",
				}}
			/>,
		);

		expect(container).not.toBeEmptyDOMElement();
	});

	it("renders payment review when orderDetail has items and payment options ready", async () => {
		jest
			.spyOn(usePaymentOptionsModule, "default")
			.mockReturnValue({ stripeIntents: undefined, paypal: undefined, error: undefined, isFetching: false });

		jest
			.spyOn(usePayPalPaymentRedirectModule, "default")
			.mockReturnValue({ error: undefined, isCheckingPaypal: false });

		const orderDetail = {
			orderNumber: "ORD123",
			items: [{ sku: "test", priceCode: "A", quantity: 1 }],
			billingAddress: { line1: "123 Main St", country: "US" },
		};

		useCartOrderDetail.mockReturnValue({
			isFetching: false,
			isFetchingCartOrder: false,
			isLoggedIn: true,
			cartDetail: undefined,
			orderDetail,
		});

		render(
			<Checkout
				customFields={{
					loginURL: "/login-url/",
					offerURL: "/offer-url/",
				}}
			/>,
		);

		await screen.findByText("Payment Review");
	});
});
