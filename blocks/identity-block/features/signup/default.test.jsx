import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useIdentity } from "@wpmedia/arc-themes-components";
import Signup, {definedMessageByCode}  from "./default";

jest.mock("@arc-publishing/sdk-identity", () => ({
	__esModule: true,
	default: {
		apiOrigin: "http://origin/",
		options: jest.fn(),
	},
}));

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		api: {
			identity: {
				origin: "https://corecomponents-arc-demo-3-prod.api.cdn.arcpublishing.com",
			}
		},
	})),
);

const mockLogin = jest.fn(() => Promise.resolve());
const mockIdentity = {
	apiOrigin: "http://origin/",
	isLoggedIn: jest.fn(() => false),
	getConfig: jest.fn(() => ({})),
	login: mockLogin,
};

const mockSales = {
	getConfig: jest.fn(() => {}),
};

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	useIdentity: jest.fn(() => ({
		isInitialized: true,
		Identity: {
			...mockIdentity,
		},
	})),
	useSales: jest.fn(() => ({
		isInitialized: true,
		Sales: {
			...mockSales,
		},
	})),
	// Button: ({onClick}) => <button onClick={onClick}>Click me</button>,
	BotChallengeProtection: ({ challengeIn= 'signup' }) => <div data-testid={`reCapctha-${challengeIn}`} />
}));

describe("With unintialized identity", () => {
	it("renders nothing if identity not initialized", () => {
		useIdentity.mockImplementation(() => ({ isInitialized: false }));

		render(<Signup customFields={{ redirectURL: "" }} />);
		expect(screen.queryByRole("form")).toBeNull();
	});
});

describe("With initialized identity", () => {
	it("passes this file", () => {
		expect(true);
	});

	it("renders something", () => {
		useIdentity.mockImplementation(() => ({ isInitialized: true }));
		render(<Signup customFields={{ redirectURL: "/sign-up", redirectToPreviousPage: true }} />);

		expect(screen.getByRole("form")).not.toBeNull();
		expect(screen.getByLabelText("identity-block.email-label")).not.toBeNull();
		expect(screen.getByLabelText("identity-block.password")).not.toBeNull();
		expect(screen.getByLabelText("identity-block.confirm-password")).not.toBeNull();
	});

	it("submits the form", async () => {
		const signUpMock = jest.fn(() => Promise.resolve());
		useIdentity.mockImplementation(
			jest.fn(() => ({
				Identity: {
					getConfig: jest.fn(() => Promise.resolve()),
					signUp: signUpMock,
				},
				isInitialized: true,
			})),
		);
		render(<Signup customFields={{ redirectURL: "/sign-up", redirectToPreviousPage: true }} />);

		await waitFor(() => expect(screen.getByLabelText("identity-block.email-label")));
		fireEvent.change(screen.getByLabelText("identity-block.email-label"), {
			target: { value: "email@test.com" },
		});
		await waitFor(() => expect(screen.getByLabelText("identity-block.password")));
		fireEvent.change(screen.getByLabelText("identity-block.password"), {
			target: { value: "thisIsMyPassword" },
		});
		await waitFor(() => expect(screen.getByLabelText("identity-block.confirm-password")));
		fireEvent.change(screen.getByLabelText("identity-block.confirm-password"), {
			target: { value: "thisIsMyPassword" },
		});

		await waitFor(() => expect(screen.getByRole("button")));
		fireEvent.click(screen.getByRole("button"));
	
		await waitFor(() => {
			expect(signUpMock).toHaveBeenCalled();
		});
	});

	it("rejects the form", async () => {
		const signUpMock = jest.fn(() => Promise.reject({code: 0})); // eslint-disable-line
		useIdentity.mockImplementation(
			jest.fn(() => ({
				Identity: {
					getConfig: jest.fn(() => Promise.resolve()),
					signUp: signUpMock,
				},
				isInitialized: true,
			}))
		);
		render(<Signup customFields={{ redirectURL: "/sign-up", redirectToPreviousPage: true }} />);

		expect(screen.queryByTestId("signup-form-error")).toBeNull();

		await waitFor(() => expect(screen.getByLabelText("identity-block.email-label")));
		fireEvent.change(screen.getByLabelText("identity-block.email-label"), {
			target: { value: "email-already-exists@test.com" },
		});

		await waitFor(() => expect(screen.getByLabelText("identity-block.password")));
		fireEvent.change(screen.getByLabelText("identity-block.password"), {
			target: { value: "thisIsMyPassword" },
		});

		await waitFor(() => expect(screen.getByLabelText("identity-block.confirm-password")));
		fireEvent.change(screen.getByLabelText("identity-block.confirm-password"), {
			target: { value: "thisIsMyPassword" },
		});

		fireEvent.click(screen.getByRole("button"));

		await waitFor(() => {
			expect(signUpMock).toHaveBeenCalled();
		});

		expect(screen.getByTestId("signup-form-error")).not.toBeNull();
	});
});

describe("Define message by code", () => {
	it("returns generic message if code doesn't exist", () => {
		const result = definedMessageByCode("123");
		expect(result).toEqual("identity-block.login-form-error.invalid-email-password");
	});

	it("returns generic message if code is undefined", () => {
		const result = definedMessageByCode();
		expect(result).toEqual("identity-block.login-form-error.invalid-email-password");
	});

	it("return message if code exists", () => {
		const result = definedMessageByCode('010122');
		expect(result).toEqual("identity-block.login-form-error.captcha-token-invalid");
	});
});
