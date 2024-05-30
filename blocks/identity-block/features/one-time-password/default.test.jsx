import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useIdentity } from "@wpmedia/arc-themes-components";
import OneTimePassword from "./default";

const mockSubmitForm = jest.fn(() => Promise.resolve());
const mockIdentity = {
	requestOTALink: mockSubmitForm,
};

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	useIdentity: jest.fn(() => ({
		isInitialized: false,
		Identity: {
			...mockIdentity,
		},
	})),
	BotChallengeProtection: ({ challengeIn = "magicLink" }) => (
		<div data-testid={`reCapctha-${challengeIn}`} />
	),
}));
jest.mock("fusion:properties", () => jest.fn(() => ({})));

const customFields = {
	loggedInPageLocation: "/account/",
};

describe("Identity One Time Password Request Form - Arc Block", () => {
	beforeEach(() => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity: {
				...mockIdentity,
			},
		}));
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("Renders", () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: false,
			Identity: {
				...mockIdentity,
			},
		}));

		render(<OneTimePassword customFields={customFields} />);

		expect(screen.queryAllByRole("form").length).toEqual(0);
	});

	it("Does not render if Identity isn't initialized", () => {
		render(<OneTimePassword customFields={customFields} />);

		expect(screen.queryAllByRole("form").length).toEqual(1);
		expect(screen.getByTestId("reCapctha-magicLink")).toBeTruthy();
	});

	it("Should be able submit form", async () => {
		render(<OneTimePassword customFields={customFields} />);

		await waitFor(() => expect(screen.getByLabelText("identity-block.email-label")));
		fireEvent.change(screen.getByLabelText("identity-block.email-label"), {
			target: { value: "email@test.com" },
		});

		await waitFor(() => expect(screen.getByRole("button")));
		fireEvent.click(screen.getByRole("button"));

		await waitFor(() => expect(mockSubmitForm).toHaveBeenCalled());
		await waitFor(() => expect(screen.getByText("identity-block.ota-success-heading")));
		await waitFor(() => expect(screen.getByText("identity-block.ota-success-body")));
	});

	it("Form submission handles 130001 error", async () => {
		const error = new Error("Captcha token invalid");
		error.code = "130001";

		const errorMessage = jest.fn(() => Promise.reject(error));

		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity: {
				...mockIdentity,
				requestOTALink: errorMessage,
			},
		}));

		render(<OneTimePassword customFields={customFields} />);

		await waitFor(() => expect(screen.getByLabelText("identity-block.email-label")));
		fireEvent.change(screen.getByLabelText("identity-block.email-label"), {
			target: { value: "email@test.com" },
		});

		await waitFor(() => expect(screen.getByRole("button")));
		fireEvent.click(screen.getByRole("button"));

		await waitFor(() => expect(errorMessage).toHaveBeenCalled());
	});

	it("Form submission handle other errors", async () => {
		const error = new Error("Fake error");
		error.code = "30001";

		const errorMessage = jest.fn(() => Promise.reject(error));

		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity: {
				...mockIdentity,
				requestOTALink: errorMessage,
			},
		}));

		render(<OneTimePassword customFields={customFields} />);

		await waitFor(() => expect(screen.getByLabelText("identity-block.email-label")));
		fireEvent.change(screen.getByLabelText("identity-block.email-label"), {
			target: { value: "email@test.com" },
		});

		await waitFor(() => expect(screen.getByRole("button")));
		fireEvent.click(screen.getByRole("button"));

		await waitFor(() => expect(errorMessage).toHaveBeenCalled());
	});

	it("Should redeem the nonce", async () => {
		delete window.location;
		window.location = {
			href: "http://localhost/onetimeaccess/?ota_nonce=123",
		};

		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity: {
				...mockIdentity,
				redeemOTALink: jest.fn(() => Promise.resolve()),
			},
		}));

		render(<OneTimePassword customFields={customFields} />);
		expect(window.location.href).toBe('http://localhost/onetimeaccess/?ota_nonce=123');

		await waitFor(() => expect(window.location.href).toBe(`${customFields.loggedInPageLocation}`));
	});

	it("Should fail when trying to redeem the nonce", async () => {
		delete window.location;
		window.location = {
			href: "http://localhost/onetimeaccess/?ota_nonce=123",
		};

		const error = new Error("Fake error");
		error.code = "300040";

		const errorMessage = jest.fn(() => Promise.reject(error));

		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity: {
				...mockIdentity,
				redeemOTALink: errorMessage,
			},
		}));

		render(<OneTimePassword customFields={customFields} />);

		expect(await screen.findByText("identity-block.ota-ivalid-login-link")).not.toBeNull();
		expect(await screen.findByText("identity-block.ota-ivalid-login-link-subheadline")).not.toBeNull();
	});
});
