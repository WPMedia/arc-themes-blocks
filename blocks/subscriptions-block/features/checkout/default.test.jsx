import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useIdentity } from "@wpmedia/arc-themes-components";
import Checkout from "./default";

jest.mock("./_children/BillingAddress", () => () => <div>Billing Address</div>);

const assignMock = jest.fn(() => "checkoutURL");
delete window.location;
window.location = { assign: assignMock, href: "checkoutURL" };

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
			getUserProfile: jest.fn(async () => {})
		},
	})),
	usePhrases: jest.fn(() => ({
		t: jest.fn((phrase => phrase))
	})),
	useSales: jest.fn(() => ({
		isInitialized: true,
		Sales: {
			getCart: jest.fn(async() => {})
		}
	})),
	useRecaptcha: jest.fn(async() => ({
		isRecaptchaEnabled: false
	}))
}));

describe("Checkout Feature", () => {
	afterEach(() => {
		assignMock.mockClear();
	})
	it("redirects user to login url when user is not logged in", async () => {

		render(
			<Checkout
				customFields={{
					loginURL: "/login-url/",
				}}
			/>,
		);

		await waitFor(() => expect(window.location.href).toBe("/login-url/?redirect=checkoutURL"));
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
				getUserProfile: jest.fn(async () => {})
			},
		}));

		render(
			<Checkout
				customFields={{
					offerURL: "/offer-url/"
				}}
			/>,
		);
		expect(await screen.findByText("Billing Address")).toBeInTheDocument();
	});
});