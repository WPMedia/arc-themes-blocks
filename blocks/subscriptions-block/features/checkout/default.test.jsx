import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useIdentity } from "@wpmedia/arc-themes-components";
import Checkout from "./default";

import useCartOrderDetail from "../../components/useCartOrderDetail";

jest.mock("../../components/useCartOrderDetail");

jest.mock("./_children/BillingAddress", () => () => <div>Billing Address</div>);

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
			isLoggedIn: jest.fn(async () => false),
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
		},
	})),
	useRecaptcha: jest.fn(async () => ({
		isRecaptchaEnabled: false,
	})),
	Link: ({ href, children }) => <a href={href}>{children}</a>,
	Stack: ({ children }) => <div>{children}</div>,
	Heading: ({ dangerouslySetInnerHTML, children }) =>
		dangerouslySetInnerHTML ? (
			<h1 dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
		) : (
			<div>{children}</div>
		),
	Button: ({ onClick, actionText, ariaLabel }) => (
		<button type="submit" onClick={onClick} aria-label={ariaLabel}>
			<span dangerouslySetInnerHTML={{ __html: actionText }} />
		</button>
	),
	Divider: () => <div>-----</div>,
}));

describe("Checkout Feature", () => {
	afterEach(() => {
		assignMock.mockClear();
	});
	it("Redirects user to login url when user is not logged in", async () => {
		useCartOrderDetail.mockImplementation(() => ({
			isFetching: false,
			isFetchingCartOrder: false,
			isLoggedIn: false,
			cartDetail: undefined,
			orderDetail: undefined,
		}));

		render(
			<Checkout
				customFields={{
					loginURL: "/login-url/",
					checkoutURL: "/checkout/",
					offerURL: '/offer-url/'
				}}
			/>,
		);

		const windowLocation = window.location.href;
		await waitFor(() => expect(windowLocation).toBe("/login-url/?redirect=/login-url/?redirect=checkoutURL"));
	});

	it("show billing address card when user is logged in", async () => {
		useIdentity.mockImplementation(() => ({
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
		}));

		render(
			<Checkout
				customFields={{
					offerURL: "/offer-url/",
				}}
			/>,
		);
		expect(await screen.findByText("2. checkout-block.billingAddress")).toBeInTheDocument();
	});

	it("Redirects user to offer url when cart is empty and user isLoggedIn", async() =>{
		useCartOrderDetail.mockImplementation(() => ({
			isFetching: false,
			isFetchingCartOrder: false,
			isLoggedIn: true,
			cartDetail: undefined,
			orderDetail: undefined,
		}));

		render(
			<Checkout
				customFields={{
					loginURL: "/login-url/",
					checkoutURL: "/checkout/",
					offerURL: '/offer-url/'
				}}
			/>,
		);

		const windowLocation = window.location.href;
		await waitFor(() => expect(windowLocation).toBe("/offer-url/?redirect=/offer-url/?redirect=undefined"));
	});
});
