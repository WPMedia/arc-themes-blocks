import React from "react";

import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useIdentity, usePhrases } from "@wpmedia/arc-themes-components";
import useSales from "../../components/useSales";
import Checkout from "./default";

jest.mock("@wpmedia/arc-themes-components");
jest.mock("../../components/useSales");

const assignMock = jest.fn(() => "checkoutURL");
delete window.location;
window.location = { assign: assignMock, href: "checkoutURL" };

describe("Checkout Feature", () => {
	afterEach(() => {
		assignMock.mockClear();
	})
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

		usePhrases.mockImplementation(() => ({
			t: jest.fn((phrase => phrase))
		}))

		useSales.mockReturnValue({
			Sales: {},
		});

		await act(async () => {
					render(
						<Checkout
							customFields={{
								offerURL: "/offer-url/"
							}}
						/>,
					);
				});
		expect(screen.getByText("Billing Address Placeholder")).not.toBeNull();
	});
	it("redirects user to login url when user is not logged in", async () => {
		useIdentity.mockImplementation(() => ({
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
		}));

		usePhrases.mockImplementation(() => ({
			t: jest.fn((phrase => phrase))
		}))

		useSales.mockReturnValue({
			Sales: {},
		});

		await act(async () => {
					render(
						<Checkout
							customFields={{
								loginURL: "/login-url/",
							}}
						/>,
					);
				});
		expect(screen.getByText("Account Placeholder")).not.toBeNull();
		expect(window.location.href).toBe("/login-url/?redirect=checkoutURL");
	});
});