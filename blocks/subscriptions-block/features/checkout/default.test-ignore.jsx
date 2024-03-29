import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { act } from "react-dom/test-utils";
import { useIdentity } from "@wpmedia/arc-themes-components";
import useSales from "../../components/useSales";

import Checkout from "./default";

jest.mock("@wpmedia/arc-themes-components");

jest.mock("../../components/useSales");

jest.mock("fusion:properties", () => jest.fn(() => ({ api: { retail: { origin: "" } } })));

jest.mock("fusion:intl", () => ({
	__esModule: true,
	default: jest.fn(() => ({ t: jest.fn((phrase) => phrase) })),
}));

describe("Checkout Feature", () => {
	it("renders link, cart and contact info", () => {
		useIdentity.mockImplementation(() => ({
			getSignedInIdentity: jest.fn(
				(user) =>
					user?.identities?.reduce((prev, current) =>
						prev.lastLoginDate > current.lastLoginDate ? prev : current,
					) || null,
			),
			Identity: {
				isLoggedIn: jest.fn(async () => false),
			},
		}));

		useSales.mockReturnValue({
			Sales: {},
		});

		render(
			<Checkout
				customFields={{
					offerURL: "/offer-url/",
				}}
			/>,
		);

		expect(screen.getByText("Select from one of our offers").closest("a")).toHaveAttribute(
			"href",
			"/offer-url/",
		);

		const contactInfo = screen.getByText("checkout-block.contact-info");
		expect(contactInfo).not.toBeNull();
	});

	it("Renders PaymentInfo after creating an order", async () => {
		const userProfile = Promise.resolve({
			email: "email@email.com",
			firstName: "first name",
			lastName: "last name",
		});
		const updateUserProfileMock = jest.fn();

		useIdentity.mockImplementation(() => ({
			getSignedInIdentity: jest.fn(
				(user) =>
					user?.identities?.reduce((prev, current) =>
						prev.lastLoginDate > current.lastLoginDate ? prev : current,
					) || null,
			),
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				getUserProfile: jest.fn(() => userProfile),
				updateUserProfile: updateUserProfileMock,
			},
		}));

		const createNewOrderMock = Promise.resolve({ orderNumber: 1 });
		const getPaymentOptionsMock = Promise.resolve([{ paymentMethodID: 11 }]);
		const initializePaymentMock = Promise.resolve({});

		useSales.mockReturnValue({
			Sales: {
				getCart: jest.fn(async () => Promise.resolve({})),
				createNewOrder: jest.fn(() => createNewOrderMock),
				getPaymentOptions: jest.fn(() => getPaymentOptionsMock),
				initializePayment: jest.fn(() => initializePaymentMock),
			},
		});

		await act(async () => {
			render(
				<Checkout
					customFields={{
						offerURL: "/offer-url/",
					}}
				/>,
			);
		});
		await userProfile;

		const contactInfo = screen.getByText("checkout-block.contact-info");
		const email = screen.getByLabelText("checkout-block.email");
		const firstName = screen.getByLabelText("checkout-block.first-name");
		const lastName = screen.getByLabelText("checkout-block.last-name");
		const country = screen.getByLabelText("checkout-block.country");

		expect(contactInfo).not.toBeNull();
		expect(country).toBeInTheDocument();
		fireEvent.change(country, { target: { value: "US" } });

		await act(async () => {
			fireEvent.click(screen.getByRole("button"));
			await initializePaymentMock;
		});

		expect(updateUserProfileMock).toHaveBeenCalled();

		expect(country).not.toBeInTheDocument();
		expect(email).not.toBeInTheDocument();
		expect(firstName).not.toBeInTheDocument();
		expect(lastName).not.toBeInTheDocument();
	});
});
